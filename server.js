const http = require('http');
const https = require('https');
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let t = req.url.slice(1);
  if (!t) { res.end('ok'); return; }
  if (!t.startsWith('http')) t = 'https://' + t;
  try {
    const u = new URL(t);
    const m = u.protocol === 'https:' ? https : http;
    m.get({ hostname: u.hostname, path: u.pathname + u.search, headers: { 'User-Agent': 'Mozilla/5.0', Host: u.hostname } }, r => {
      const h = Object.assign({}, r.headers);
      delete h['x-frame-options'];
      delete h['content-security-policy'];
      h['access-control-allow-origin'] = '*';
      res.writeHead(r.statusCode, h);
      r.pipe(res);
    }).on('error', e => { res.end('err:' + e.message); });
  } catch(e) { res.end('bad url'); }
});
server.listen(8080, () => console.log('OK'));
