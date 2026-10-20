// The cover photograph a creator chose on the publishing form waits in this browser until the
// listing exists and its cover page sends it. It is kept for a few hours at most and only here.
const DATABASE = 'bx-cover';
const STORE = 'staged';
const KEY = 'pending';
const KEEP_MS = 6 * 60 * 60 * 1000;

function open() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function run(mode, work) {
  const db = await open();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, mode);
      const request = work(transaction.objectStore(STORE));
      transaction.oncomplete = () => resolve(request?.result);
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
}

export function stage(blob, now = Date.now()) {
  return run('readwrite', (store) => store.put({ blob, at: now }, KEY));
}

export function clear() {
  return run('readwrite', (store) => store.delete(KEY)).catch(() => {});
}

// The staged photograph, or null when there is none, it is too old, or storage is unavailable.
export async function staged(now = Date.now()) {
  try {
    const found = await run('readonly', (store) => store.get(KEY));
    if (!found?.blob || now - found.at > KEEP_MS) return null;
    return found.blob;
  } catch {
    return null;
  }
}
