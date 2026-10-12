import { REQUESTED_WITH } from '../constants/config.js?v=57';

export class RequestFailed extends Error {
  constructor(status, code, key) {
    super(code || `HTTP ${status}`);
    this.status = status;
    this.code = code;
    this.key = key;
  }
}

function csrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.content || document.querySelector('input[name="_token"]')?.value || '';
}

async function send(url, init) {
  const headers = new Headers(init.headers || {});
  headers.set(REQUESTED_WITH[0], REQUESTED_WITH[1]);
  headers.set('accept', 'application/json');
  const response = await fetch(url, { credentials: 'same-origin', ...init, headers });
  const body = response.headers.get('content-type')?.includes('json') ? await response.json() : null;
  if (!response.ok) throw new RequestFailed(response.status, body?.error, body?.message);
  return body;
}

export const getJson = (url, options = {}) => send(url, { ...options, method: 'GET' });

export function postJson(url, data, keepalive = false, options = {}) {
  return send(url, { ...options, method: 'POST', keepalive, headers: { 'content-type': 'application/json', 'x-csrf-token': csrfToken() }, body: JSON.stringify(data ?? {}) });
}

export function postForm(form) {
  return send(form.action, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)) });
}
