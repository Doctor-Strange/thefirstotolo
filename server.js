const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware');

const nextI18next = require('./src/i18n');

const port = process.env.PORT || 8080;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const { parse } = require('url');
const { join } = require('path');

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  /* Car Links */
  server.get('/car/:id', (req, res) => {
    const { query, params } = req;

    return app.render(req, res, '/car', { ...query, id: params.id });
  });

  /* User Links */
  server.get('/([@]):id', (req, res) => {
    const { query, params } = req;

    return app.render(req, res, '/profile', { ...query, id: params.id });
  });


  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res);
    }
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`);
})();
