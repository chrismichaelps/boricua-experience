import { renderMarkdown } from './assistantMarkdown.js?v=57';

export async function consumeChat(stream, receive) {
  const reader = stream.getReader(), decoder = new TextDecoder();
  let pending = '', complete = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      pending += done ? decoder.decode() : decoder.decode(value, { stream: true });
      if (pending.length > 32000) throw new Error('assistant_unavailable');
      let end;
      while ((end = pending.indexOf('\n\n')) >= 0) {
        const block = pending.slice(0, end); pending = pending.slice(end + 2);
        const event = block.split('\n').find(line => line.startsWith('event: '))?.slice(7);
        const raw = block.split('\n').filter(line => line.startsWith('data: ')).map(line => line.slice(6)).join('\n');
        if (!event || !raw) continue;
        const data = JSON.parse(raw);
        if (event === 'error') throw new Error(data.error || 'assistant_unavailable');
        receive(event, data);
        if (event === 'done') complete = true;
      }
      if (done) break;
    }
    if (!complete) throw new Error('assistant_unavailable');
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}

export function sourceImage(value, origin) {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value, origin);
    if (url.username || url.password) return '';
    if (url.origin === origin && /^\/assets\/(covers|img)\/[a-z0-9._-]+\.(svg|webp|png|jpe?g)$/i.test(url.pathname)) return url.href;
    if (url.protocol === 'https:' && url.hostname.endsWith('.supabase.co') && url.pathname.startsWith('/storage/v1/object/public/')) return url.href;
  } catch {}
  return '';
}

export function assistant(root) {
  const dialog = root.querySelector('dialog'), launch = root.querySelector('.assistant-launch');
  if (!dialog?.showModal) return;
  const form = root.querySelector('form'), input = root.querySelector('textarea');
  const thread = root.querySelector('.assistant-thread'), status = root.querySelector('.assistant-status');
  const voice = root.querySelector('[data-assistant="voice"]'), intro = thread.firstElementChild.cloneNode(true);
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  let controller, active = false, recording, history = [], ticket = 0, returnFocus, listening = false, frame;
  const announce = (key = '') => { status.textContent = root.dataset[key] || ''; status.hidden = !key; };
  let speakingButton = null, speakingUtterance = null;
  const stopAudio = () => { const previous = speakingButton; speakingButton = null; speakingUtterance = null; window.speechSynthesis?.cancel(); if(previous) { previous.textContent=root.dataset.listen;previous.setAttribute('aria-pressed','false'); } };
  const stopVoice = () => { listening = false; const previous = recording; recording = null; previous?.abort(); voice?.setAttribute('aria-pressed', 'false'); voice?.setAttribute('aria-label', root.dataset.voice); };
  const submit = form?.querySelector('[type="submit"]');
  const ready = () => { active = false; if (submit) { submit.disabled = false; submit.textContent = '↑'; submit.setAttribute('aria-label', root.dataset.send); submit.classList.remove('is-streaming'); } };
  const close = () => {
    ticket++; controller?.abort(); stopVoice(); stopAudio(); cancelAnimationFrame(frame); frame = null;
    ready(); announce();
    dialog.close(); returnFocus?.focus({ preventScroll: true });
  };
  const fit = () => { if (dialog.open) dialog.style.height = Math.min(innerWidth < 700 ? Infinity : 860, (window.visualViewport?.height || innerHeight) - (innerWidth < 700 ? 12 : 64)) + 'px'; };
  window.visualViewport?.addEventListener('resize', fit);
  launch.hidden = false;
  launch.addEventListener('click', () => {
    returnFocus = document.activeElement;
    dialog.showModal(); fit();
    document.dispatchEvent(new CustomEvent('bx:assistant-open', { detail: { dialog } }));
    (input || root.querySelector('.assistant-controls a'))?.focus({ preventScroll: true });
  });
  root.querySelector('[data-assistant="close"]').addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } });
  addEventListener('pagehide', close);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopVoice(); });
  if (!form) return;
  if (!Speech) { voice.disabled = true; voice.title = root.dataset.unsupported; }
  voice.addEventListener('click', () => {
    if (listening) { recording?.stop(); return; }
    if (!Speech) { announce('unsupported'); return; }
    stopAudio();
    const recognition = new Speech(); recording = recognition; recognition.lang = document.documentElement.lang.startsWith('en') ? 'en-US' : 'es-PR'; recognition.interimResults = true;
    const prefix = input.value.trim();
    recognition.onresult = event => {
      if (recording !== recognition || !listening || !dialog.open) return;
      const transcript = [...event.results].map(result => result[0].transcript).join(' ');
      input.value = [prefix, transcript].filter(Boolean).join(' ').slice(0, 1200);
    };
    recognition.onerror = () => { if (recording !== recognition) return; stopVoice(); announce('voiceError'); };
    recognition.onend = () => { if (recording !== recognition) return; stopVoice(); if (status.textContent === root.dataset.listening) announce(); };
    try {
      listening = true; recording.start(); voice.setAttribute('aria-pressed', 'true'); voice.setAttribute('aria-label', root.dataset.stopVoice); announce('listening');
    } catch { stopVoice(); announce('voiceError'); }
  });
  root.querySelector('[data-assistant="reset"]').addEventListener('click', () => {
    ticket++; controller?.abort(); stopVoice(); stopAudio(); cancelAnimationFrame(frame); frame = null; history = []; thread.replaceChildren(intro.cloneNode(true)); input.value = ''; announce(); ready(); input.focus();
  });
  input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); form.requestSubmit(); } });
  const stopResponse = () => { ticket++; controller?.abort(); cancelAnimationFrame(frame); frame = null; announce(); ready(); };
  submit.addEventListener('click', event => { if (active) { event.preventDefault(); stopResponse(); } });
  thread.addEventListener('click', event => { const prompt = event.target.closest('[data-assistant-prompt]'); if (!active && prompt && thread.contains(prompt)) { input.value = prompt.dataset.assistantPrompt; input.focus(); } });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (active) { stopResponse(); return; }
    const message = input.value.trim();
    if (!message || message.length > 1200) return;
    stopVoice(); stopAudio();
    const current = ++ticket; controller?.abort(); controller = new AbortController();
    const requestController = controller;
    const timer = setTimeout(() => requestController.abort(), 95000);
    active = true; submit.textContent = '■'; submit.setAttribute('aria-label', root.dataset.stop); submit.classList.add('is-streaming');
    const question = document.createElement('p'); question.className = 'assistant-question'; question.textContent = message; thread.querySelector('.assistant-welcome')?.remove(); thread.append(question);
    const reply = document.createElement('div'); reply.className = 'assistant-answer'; thread.append(reply); question.scrollIntoView({ block: 'end' });
    let answer = '', sourceSection;
    const paint = () => { frame = null; renderMarkdown(reply, answer); if (thread.scrollHeight - thread.scrollTop - thread.clientHeight < 180) reply.scrollIntoView({ block: 'end' }); };
    announce('busy');
    try {
      const response = await fetch('/api/chat', { method: 'POST', credentials: 'same-origin', signal: requestController.signal,
        headers: { 'content-type': 'application/json', 'x-requested-with': 'boricua', accept: 'text/event-stream', 'x-csrf-token': document.querySelector('meta[name="csrf-token"]')?.content || '' },
        body: JSON.stringify({ message, history: history.slice(-6) }) });
      if (!response.ok || !response.body) { const detail = await response.json().catch(() => ({})); throw new Error(detail.error || 'assistant_unavailable'); }
      await consumeChat(response.body, (eventName, data) => {
        if (current !== ticket) return;
        if (eventName === 'status') announce(({thinking:'thinking',searching:'busy',reading:'reading',preferences:'preferences'})[data.state] || 'busy');
        if (eventName === 'delta' && typeof data.text === 'string') {
          answer += data.text; if (answer.length > 6000) throw new Error('assistant_unavailable');
          announce(); if (!frame) frame = requestAnimationFrame(paint);
        }
        if (eventName === 'sources' && Array.isArray(data.items) && data.items.length) {
          sourceSection ||= document.createElement('section'); sourceSection.className = 'assistant-sources';
          const heading = document.createElement('h3'); heading.textContent = root.dataset.sources;
          const grid = document.createElement('div'); grid.className = 'assistant-result-grid';
          for (const source of data.items.slice(0, 12)) {
            if (!/^\/e\/[a-z0-9-]+$/.test(source.href)) continue;
            const link = document.createElement('a'); link.href = source.href;
            const image = sourceImage(source.image, location.origin);
            if (image) { const img = document.createElement('img'); img.src = image; img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); link.append(img); }
            const body = document.createElement('div'), title = document.createElement('strong'); title.textContent = source.title;
            const town = document.createElement('span'); town.textContent = [source.town,source.category].filter(Boolean).join(' · ');
            body.append(title, town); link.append(body); grid.append(link);
          }
          sourceSection.replaceChildren(heading,grid); if (!sourceSection.parentNode) thread.append(sourceSection);
        }
      });
      if (current !== ticket) return;
      cancelAnimationFrame(frame); paint();
      history.push({ role: 'user', content: message }, { role: 'assistant', content: answer.slice(0, 1200) }); history = history.slice(-6);
      input.value = ''; announce();
      if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
        const listen = document.createElement('button'); listen.type = 'button'; listen.className = 'assistant-listen'; listen.textContent = root.dataset.listen;
        listen.setAttribute('aria-pressed','false');
        listen.addEventListener('click', () => {
          if(speakingButton===listen) { stopAudio();return; }
          stopVoice();stopAudio();const speech=new SpeechSynthesisUtterance(answer.replace(/[*#`]/g,''));speech.lang=document.documentElement.lang.startsWith('en')?'en-US':'es-PR';
          speakingButton=listen;speakingUtterance=speech;listen.textContent=root.dataset.stopAudio;listen.setAttribute('aria-pressed','true');
          const finish=()=>{if(speakingUtterance===speech) {speakingButton=null;speakingUtterance=null;listen.textContent=root.dataset.listen;listen.setAttribute('aria-pressed','false');}};
          speech.onend=finish;speech.onerror=()=>{if(speakingUtterance!==speech)return;finish();announce('audioError');};
          try {window.speechSynthesis.speak(speech);}catch{finish();announce('audioError');}
        });
        thread.append(listen);
      }
    } catch (error) {
      if (current === ticket) { if (!answer) reply.remove(); else { cancelAnimationFrame(frame); paint(); } announce(error.message === 'assistant_limit' ? 'limit' : 'error'); }
    } finally { clearTimeout(timer); if (current === ticket) ready(); }
  });
}
