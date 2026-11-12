// Prérendu statique (SSG) : génère un HTML complet par page après `vite build`.
// Ainsi Google, Bing et les robots IA (qui n'exécutent souvent pas le JavaScript) lisent
// le contenu, les balises <head> et les données structurées dès la première requête.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const { render, ROUTES, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

const page = (url) => {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

for (const route of ROUTES) {
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(route));
  console.log('  prérendu', route);
}
// Page 404 (noindex) servie par l'hébergeur pour toute URL inconnue.
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));

const today = new Date().toISOString().slice(0, 10);
const loc = (r) => SITE_URL + (r === '/' ? '/' : r);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map(
    (r) => `  <url><loc>${loc(r)}</loc><lastmod>${today}</lastmod></url>`,
  ).join('\n')}\n</urlset>\n`,
);

// Robots : tout est public. Les robots IA de recherche/citation sont explicitement autorisés.
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\n# Moteurs de réponse IA (citation et navigation à la demande)\nUser-agent: OAI-SearchBot\nUser-agent: ChatGPT-User\nUser-agent: Claude-SearchBot\nUser-agent: Claude-User\nUser-agent: PerplexityBot\nUser-agent: Perplexity-User\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

// llms.txt : sans effet mesuré sur Google, mais utile aux agents IA pour comprendre le site.
fs.writeFileSync(
  path.join(dist, 'llms.txt'),
  `# N.G.E Consulting

> Cabinet de gestion comptable, fiscale, sociale et administrative à Libreville (Gabon), pour les créateurs d'entreprise, TPE et PME. Comptabilité SYSCOHADA, fiscalité gabonaise, paie CNSS/CNAMGS, création d'entreprise au guichet unique de l'ANPI.

Contact : +241 11 76 29 55 · ngeconsulting.gabon@gmail.com · BP 13149, Nombakélé, Libreville.

## Pages
- [Accueil](${loc('/')}): présentation, calendrier fiscal type, questions fréquentes
- [Nos expertises](${loc('/expertises')}): comptabilité, fiscalité, paie, création d'entreprise, conseil et pilotage
- [Le cabinet](${loc('/cabinet')}): mission, vision, engagements, équipe
- [Vos besoins](${loc('/vos-besoins')}): accompagnement selon le profil (créateur, TPE, PME)
- [Ressources](${loc('/ressources')}): articles et guides pratiques
- [Contact](${loc('/contact')}): coordonnées et prise de rendez-vous
`,
);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`  ${ROUTES.length} pages + 404, sitemap.xml, robots.txt, llms.txt → dist/ (site : ${SITE_URL})`);
