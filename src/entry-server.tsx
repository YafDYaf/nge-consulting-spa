/* eslint-disable react-refresh/only-export-components -- module serveur, jamais rechargé à chaud */
// Point d'entrée du prérendu (exécuté au build par scripts/prerender.mjs, jamais dans le navigateur).
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { headTags, metaFor, ROUTES } from './seo';
import { SITE_URL } from './site';
import { ARTICLES } from './data/articles';

export { ROUTES, SITE_URL, ARTICLES };

export function render(url: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const location = base + (url.startsWith('/') ? url : `/${url}`);
  const html = renderToString(
    <StrictMode>
      <StaticRouter basename={import.meta.env.BASE_URL} location={location}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, head: headTags(metaFor(url)) };
}
