import { createServer, request } from 'node:http';
import assistant from '../server/assistant.mjs';

// The local proxy reproduces Vercel's separate streaming route; Pudu keeps every other route.
const port = Number(process.env.BORICUA_CHAT_PORT || 8080);
createServer((req, res) => {
  if (req.url?.split('?')[0] === '/api/chat') { assistant(req, res); return; }
  const upstream = request({ hostname: '127.0.0.1', port: 8082, path: req.url, method: req.method, headers: req.headers }, response => {
    res.writeHead(response.statusCode, response.headers); response.pipe(res);
  });
  upstream.on('error', () => { res.statusCode = 503; res.end('Development server is starting.'); });
  req.on('aborted', () => upstream.destroy());
  req.pipe(upstream);
}).listen(port, '127.0.0.1', () => console.log(`Boricua development proxy: http://localhost:${port}`));
