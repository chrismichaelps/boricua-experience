import { STORAGE } from '../constants/config.js?v=80';

/** Rings the bell once when the unread count has grown since this browser last saw it. */
export function bell(link) {
  const unread = Number(link.dataset.unread || 0);
  let seen = 0;
  try { seen = Number(localStorage.getItem(STORAGE.unreadKey) || 0); } catch { /* storage unavailable */ }
  if (unread > seen) link.classList.add('is-ringing');
  try { localStorage.setItem(STORAGE.unreadKey, String(unread)); } catch { /* storage unavailable */ }
}
