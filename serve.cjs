const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2'
};
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/' || u === '') u = '/index.html';
  const p = path.resolve(ROOT, '.' + u);
  if (!p.startsWith(ROOT)) { res.writeHead(403); res.end('403'); return; }
  fs.readFile(p, (e, d) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(p).toLowerCase()] || 'application/octet-stream' });
    res.end(d);
  });
}).listen(8321, () => console.log('serving on http://localhost:8321'));
