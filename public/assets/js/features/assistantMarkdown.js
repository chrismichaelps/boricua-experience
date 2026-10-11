import { marked } from '../vendor/marked-18.1.0.js';

function render(parent, tokens, allowed, depth = 0) {
  if (depth > 16) return;
  for (const token of tokens) {
    if (token.type === 'space') continue;
    let node;
    switch (token.type) {
      case 'heading': node = document.createElement('h' + Math.min(4, Math.max(3, token.depth))); break;
      case 'paragraph': node = document.createElement('p'); break;
      case 'strong': node = document.createElement('strong'); break;
      case 'em': node = document.createElement('em'); break;
      case 'del': node = document.createElement('del'); break;
      case 'blockquote': node = document.createElement('blockquote'); break;
      case 'codespan': node = document.createElement('code'); node.textContent = token.text; parent.append(node); continue;
      case 'code': {
        node = document.createElement('pre'); const code = document.createElement('code'); code.textContent = token.text; node.append(code); parent.append(node); continue;
      }
      case 'list': {
        node = document.createElement(token.ordered ? 'ol' : 'ul');
        if (token.ordered && Number.isInteger(token.start)) node.start = token.start;
        for (const item of token.items) {
          const li = document.createElement('li');
          if (item.task) { const check = document.createElement('input'); check.type = 'checkbox'; check.disabled = true; check.checked = item.checked; li.append(check); }
          render(li, item.tokens || [], allowed, depth + 1); node.append(li);
        }
        parent.append(node); continue;
      }
      case 'table': {
        const wrap = document.createElement('div'); wrap.className = 'assistant-table'; node = document.createElement('table');
        const head = document.createElement('thead'), row = document.createElement('tr');
        for (const cell of token.header) { const th = document.createElement('th'); render(th, cell.tokens || [], allowed, depth + 1); row.append(th); } head.append(row); node.append(head);
        const body = document.createElement('tbody');
        for (const cells of token.rows) { const tr = document.createElement('tr'); for (const cell of cells) { const td = document.createElement('td'); render(td, cell.tokens || [], allowed, depth + 1); tr.append(td); } body.append(tr); }
        node.append(body); wrap.append(node); parent.append(wrap); continue;
      }
      case 'link':
        node = document.createElement(allowed.has(token.href) ? 'a' : 'span'); if (allowed.has(token.href)) node.href = token.href; break;
      case 'br': parent.append(document.createElement('br')); continue;
      case 'hr': parent.append(document.createElement('hr')); continue;
      case 'text':
        if (token.tokens) { render(parent, token.tokens, allowed, depth + 1); continue; }
        parent.append(document.createTextNode(token.text || '')); continue;
      default:
        // Raw HTML, remote images and unknown extensions remain plain text.
        parent.append(document.createTextNode(token.raw || token.text || '')); continue;
    }
    if (token.tokens) render(node, token.tokens, allowed, depth + 1); else node.textContent = token.text || '';
    parent.append(node);
  }
}

export function renderMarkdown(target, text, links = []) {
  const fragment = document.createDocumentFragment();
  const allowed = new Set(links.filter(link => /^\/e\/[a-z0-9-]+$/.test(link)));
  try { render(fragment, marked.lexer(text.slice(0, 6000), { gfm: true }), allowed); }
  catch { fragment.append(document.createTextNode(text.slice(0, 6000))); }
  target.replaceChildren(fragment);
}
