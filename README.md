# N.G.E Consulting — site vitrine

Site du cabinet N.G.E Consulting (Libreville, Gabon). React 19 + Vite + Tailwind + React Router, prérendu statique au build.

## Commandes

```bash
npm run dev       # développement (rendu client)
npm run build     # build + prérendu HTML de chaque page, sitemap.xml, robots.txt, llms.txt
npm run preview   # sert dist/ en local
```

Le domaine utilisé pour les canonical, le sitemap et les données structurées se règle avec
`VITE_SITE_URL=https://www.exemple.ga npm run build` (par défaut `https://www.ngeconsulting.ga`, à confirmer).

## Structure

- `src/pages/` — une page par route (Accueil, Expertises, Cabinet, Vos besoins, Ressources, Contact)
- `src/data/content.ts` — tous les textes éditoriaux
- `src/seo.ts` — title, meta description et JSON-LD par page (à garder aligné avec `src/App.tsx`)
- `src/site.ts` — coordonnées du cabinet
- `scripts/prerender.mjs` — génère le HTML de chaque page après le build (lisible sans JavaScript par Google et les robots IA)

## À compléter par le cabinet

Les mentions entre crochets `[ ]` dans le site : témoignages réels, équipe, numéro WhatsApp, horaires,
dates de publication, guides PDF, pages légales. Les formulaires simulent l'envoi : à brancher sur un service
(Formspree, Resend, agenda en ligne…). Crédits photos : `src/assets/photos/CREDITS.md`.

## Thèmes de saison

Les couleurs passent par des variables CSS (`src/themes.css`) : chaque thème redéfinit les mêmes jetons (`navy`, `sun`, `sky`, `band`…), et les classes Tailwind ne changent pas.
Le registre `src/theme.ts` rattache à chaque thème son logo, sa page d'accueil, son décor et son bandeau.

| Thème | Rendu |
|---|---|
| `nge` | Charte d'origine : bleu nuit, jaune, bleu ciel |
| `noel` (par défaut sur cette branche) | Bleus de la charte, jaune remplacé par du rouge, logo cadeau, neige, guirlande, accueil de fin d'année (`src/pages/HomeNoel.tsx`) |
| `noel-sapin` | Variante vert sapin et rouge |

Le thème se choisit au build : `VITE_THEME=nge npm run build`. Plus tard, l'espace admin n'aura qu'à fournir cet identifiant.
