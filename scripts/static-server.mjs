import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json',
};

/** A bounded preview with no application-route fallback. The caller owns its lifecycle. */
export async function serveDirectory(directory, prefix = '/preview/') {
  const root = resolve(directory);
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
      const path = resolve(root, pathname.slice(prefix.length) || 'index.html');
      if (!path.startsWith(root + sep) || !(await stat(path)).isFile()) {
        response.writeHead(404).end(); return;
      }
      response.writeHead(200, { 'Content-Type': mimeTypes[extname(path)] || 'application/octet-stream' });
      response.end(await readFile(path));
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((done, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', done); });
  return {
    url: `http://127.0.0.1:${server.address().port}${prefix}`,
    close: () => new Promise((done, reject) => server.close((error) => error ? reject(error) : done())),
  };
}
