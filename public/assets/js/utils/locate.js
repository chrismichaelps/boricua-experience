import { GEO } from '../constants/config.js?v=43';

export function requestLocation(signal, geolocation = navigator.geolocation) {
  return new Promise((resolve, reject) => {
    let settled = false, attempt = 0;
    const finish = (error, position) => {
      if (settled) return;
      settled = true; clearTimeout(timer); signal?.removeEventListener('abort', cancel);
      if (error) reject(error); else resolve(position);
    };
    const cancel = () => finish(new DOMException('Aborted', 'AbortError'));
    const timer = setTimeout(() => finish({code:3}), GEO.deadlineMs);
    const start = () => {
      const current = ++attempt;
      const failed = error => {
        if (settled || current !== attempt) return;
        if (error.code !== 1 && current === 1) start(); else finish({code:error.code === 1 ? 1 : error.code === 3 ? 3 : 2});
      };
      try {
        geolocation.getCurrentPosition(position => {
          if (settled || current !== attempt) return;
          const {latitude:lat,longitude:lng,accuracy} = position.coords || {};
          if (![lat,lng,accuracy].every(Number.isFinite) || Math.abs(lat)>90 || Math.abs(lng)>180 || accuracy<0) { failed({code:2}); return; }
          finish(null, position);
        }, failed, current === 1 ? GEO.precise : GEO.balanced);
      } catch { failed({code:2}); }
    };
    if (signal?.aborted) { cancel(); return; }
    signal?.addEventListener('abort', cancel, {once:true});
    if (!geolocation) { finish({code:0}); return; }
    start();
  });
}
