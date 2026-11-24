import { SITE, SITE_URL } from './site';
import { FAQ, SERVICES } from './data/content';
import { ARTICLES, articleBySlug } from './data/articles';
import type { Article } from './data/articles';
import ogImage from './assets/photos/equipe-reunion.webp';
import logo from './assets/logo-nge.png';

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Nom court pour le fil d'Ariane */
  crumb: string;
  noindex?: boolean;
  /** Présent sur les pages d'article. */
  article?: Article;
};

// Titles ≤ 60 caractères et descriptions ≤ 155 caractères, rédigés pour la requête locale
// « cabinet comptable Libreville » et ses variantes (expert-comptable Gabon, paie, fiscalité…).
export const PAGES: Record<string, PageMeta> = {
  '/': {
    path: '/',
    crumb: 'Accueil',
    title: 'Cabinet comptable à Libreville | N.G.E Consulting',
    description:
      'Comptabilité SYSCOHADA, fiscalité, paie CNSS/CNAMGS et création d’entreprise au Gabon. Un conseiller dédié à Libreville. Premier échange de 30 minutes.',
  },
  '/expertises': {
    path: '/expertises',
    crumb: 'Nos expertises',
    title: 'Comptabilité, fiscalité, paie au Gabon | N.G.E',
    description:
      'Tenue comptable SYSCOHADA, déclarations fiscales, paie et CNSS, création d’entreprise à l’ANPI, tableaux de bord : cinq métiers, un seul interlocuteur.',
  },
  '/cabinet': {
    path: '/cabinet',
    crumb: 'Le cabinet',
    title: 'Le cabinet N.G.E Consulting à Libreville',
    description:
      'Un cabinet de gestion comptable, fiscale et sociale installé à Nombakélé, Libreville. Notre mission, nos engagements et l’équipe qui suit votre dossier.',
  },
  '/vos-besoins': {
    path: '/vos-besoins',
    crumb: 'Vos besoins',
    title: 'Créateur, TPE ou PME : quel accompagnement ? | N.G.E',
    description:
      'Vous lancez votre activité, gérez une TPE ou une PME en croissance au Gabon ? Partez de votre situation, nous vous orientons vers le bon accompagnement.',
  },
  '/ressources': {
    path: '/ressources',
    crumb: 'Ressources',
    title: 'Guides fiscalité, paie et création au Gabon | N.G.E',
    description:
      'Facture électronique 2026, calendrier fiscal, obligations CNSS et CNAMGS, création au guichet unique de l’ANPI : nos fiches pour mieux gérer votre entreprise.',
  },
  '/contact': {
    path: '/contact',
    crumb: 'Contact',
    title: 'Contact et rendez-vous | N.G.E Consulting Libreville',
    description:
      'Appelez le +241 11 76 29 55, écrivez-nous ou réservez un créneau de 30 minutes, au cabinet à Nombakélé, en visio ou par téléphone. Réponse sous un jour ouvré.',
  },
  '/404': {
    path: '/404',
    crumb: 'Page introuvable',
    title: 'Page introuvable | N.G.E Consulting',
    description: 'Cette page n’existe pas ou a été déplacée.',
    noindex: true,
  },
};

export const ROUTES = [...Object.keys(PAGES).filter((p) => p !== '/404'), ...ARTICLES.map((a) => a.path)];

function articleMeta(a: Article): PageMeta {
  const suffix = ' | N.G.E Consulting';
  return {
    path: a.path,
    crumb: a.title,
    title: a.title.length + suffix.length <= 70 ? a.title + suffix : a.title,
    description: a.summary,
    article: a,
  };
}

export function metaFor(pathname: string): PageMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const m = clean.match(/^\/ressources\/([^/]+)$/);
  if (m) {
    const a = articleBySlug(m[1]);
    return a ? articleMeta(a) : PAGES['/404'];
  }
  return PAGES[clean] ?? PAGES['/404'];
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const siteOrigin = SITE_URL.startsWith('http') ? new URL(SITE_URL).origin : SITE_URL;
const abs = (p: string) => {
  if (p.startsWith('http')) return p;
  if (basePath && p.startsWith(basePath + '/')) return siteOrigin + p;
  return SITE_URL + p;
};

/** Entité principale : le cabinet (AccountingService est un sous-type de LocalBusiness). */
function organization() {
  return {
    '@type': 'AccountingService',
    '@id': `${SITE_URL}/#cabinet`,
    name: SITE.name,
    url: SITE_URL + '/',
    logo: abs(logo),
    image: abs(ogImage),
    description:
      'Cabinet de gestion comptable, fiscale, sociale et administrative pour les entreprises et entrepreneurs installés au Gabon.',
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      postOfficeBoxNumber: SITE.address.postal,
      streetAddress: SITE.address.district,
      addressLocality: SITE.address.locality,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'Country', name: 'Gabon' },
    knowsAbout: ['SYSCOHADA', 'Fiscalité gabonaise', 'Paie', 'CNSS', 'CNAMGS', 'Création d’entreprise', 'Facture électronique'],
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

export function jsonLdFor(meta: PageMeta): object[] {
  if (meta.noindex) return [];
  const graph: object[] = [
    organization(),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      url: SITE_URL + '/',
      name: SITE.name,
      inLanguage: 'fr-GA',
      publisher: { '@id': `${SITE_URL}/#cabinet` },
    },
    {
      '@type': 'WebPage',
      '@id': abs(meta.path) + '#page',
      url: abs(meta.path),
      name: meta.title,
      description: meta.description,
      inLanguage: 'fr-GA',
      isPartOf: { '@id': `${SITE_URL}/#site` },
      about: { '@id': `${SITE_URL}/#cabinet` },
    },
  ];
  if (meta.path !== '/') {
    const trail = meta.article
      ? [
          { name: 'Ressources', item: abs('/ressources') },
          { name: meta.crumb, item: abs(meta.path) },
        ]
      : [{ name: meta.crumb, item: abs(meta.path) }];
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Accueil', item: SITE_URL + '/' }, ...trail].map((t, i) => ({ '@type': 'ListItem', position: i + 1, ...t })),
    });
  }
  if (meta.article) {
    const a = meta.article;
    // [À compléter] : datePublished / dateModified dès que les dates de publication sont fixées.
    graph.push({
      '@type': 'Article',
      '@id': abs(a.path) + '#article',
      headline: a.title,
      description: a.summary,
      image: abs(a.photo),
      articleSection: a.category,
      inLanguage: 'fr-GA',
      mainEntityOfPage: { '@id': abs(a.path) + '#page' },
      author: { '@id': `${SITE_URL}/#cabinet` },
      publisher: { '@id': `${SITE_URL}/#cabinet` },
      ...(a.sources.length ? { citation: a.sources } : {}),
    });
  }
  if (meta.path === '/expertises') {
    SERVICES.forEach((s) =>
      graph.push({
        '@type': 'Service',
        '@id': `${SITE_URL}/expertises#${s.id}`,
        name: s.title,
        description: s.intro,
        provider: { '@id': `${SITE_URL}/#cabinet` },
        areaServed: { '@type': 'Country', name: 'Gabon' },
      }),
    );
  }
  if (meta.path === '/') {
    // La FAQ est visible sur la page : le balisage reste correct même sans résultat enrichi (supprimé en 2026).
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQ.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.answer.replace(/\s*\[.*?\]/g, '') },
      })),
    });
  }
  return [{ '@context': 'https://schema.org', '@graph': graph }];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Balises <head> injectées dans le HTML prérendu de chaque page. */
export function headTags(meta: PageMeta): string {
  const url = abs(meta.path === '/404' ? '/' : meta.path);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    meta.noindex
      ? `<meta name="robots" content="noindex">`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`,
    meta.noindex ? '' : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${meta.article ? 'article' : 'website'}">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${abs(meta.article?.photo ?? ogImage)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    ...jsonLdFor(meta).map(
      (j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  return tags.filter(Boolean).join('\n    ');
}
