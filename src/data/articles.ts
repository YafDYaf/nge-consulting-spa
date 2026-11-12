// Articles du blog, lus depuis content/articles/*.md au moment du build.
// Pour ajouter un article : déposer un fichier « NN-mon-slug.md » dans ce dossier, au même format
// (# Titre, **Catégorie : …**, paragraphes, ## sections, ligne d'appel **N.G.E CONSULTING — …**, ligne Sources).
import photoCreation from '../assets/photos/creation.webp';
import photoComptabilite from '../assets/photos/comptabilite.webp';
import photoFiscalite from '../assets/photos/fiscalite.webp';
import photoPaie from '../assets/photos/paie.webp';
import photoConseil from '../assets/photos/conseil.webp';
import photoEquipe from '../assets/photos/equipe-reunion.webp';

export type Block = { type: 'h2'; text: string } | { type: 'p'; text: string };

export type Article = {
  slug: string;
  path: string;
  title: string;
  category: string;
  intro: string;
  /** Résumé court (≤ 155 caractères) pour les cartes et la meta description. */
  summary: string;
  blocks: Block[];
  cta: string;
  sources: string[];
  readingMinutes: number;
  photo: string;
};

export const CATEGORY_STYLE: Record<string, { tone: string; photo: string }> = {
  Entrepreneuriat: { tone: '#E4F1F8', photo: photoCreation },
  Comptabilité: { tone: '#C8DCEA', photo: photoComptabilite },
  Fiscalité: { tone: '#FCD116', photo: photoFiscalite },
  'Paie & social': { tone: '#01AAF2', photo: photoPaie },
  Gestion: { tone: '#B9C9D9', photo: photoConseil },
  Accompagnement: { tone: '#D9E6F0', photo: photoEquipe },
};

const files = import.meta.glob('../../content/articles/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function shorten(text: string, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

function parse(file: string, raw: string): Article {
  const slug = file.split('/').pop()!.replace(/\.md$/, '').replace(/^\d+-/, '');
  const lines = raw.replace(/\r/g, '').split('\n');
  let title = '';
  let category = '';
  let cta = '';
  let sources: string[] = [];
  const intro: string[] = [];
  const blocks: Block[] = [];

  for (const line of lines.map((l) => l.trim()).filter(Boolean)) {
    if (line.startsWith('# ')) title = line.slice(2).trim();
    else if (/^\*\*Catégorie\s*:/i.test(line)) category = line.replace(/^\*\*Catégorie\s*:\s*/i, '').replace(/\*\*$/, '').trim();
    else if (/^\*\*N\.G\.E CONSULTING/i.test(line)) cta = line.replace(/^\*\*N\.G\.E CONSULTING\s*[—-]\s*/i, '').replace(/\*\*$/, '').trim();
    else if (/^(Sources?|Références?)\s*:/i.test(line))
      sources = line.replace(/^[^:]+:\s*/, '').split(';').map((s) => s.trim()).filter(Boolean);
    else if (line.startsWith('## ')) blocks.push({ type: 'h2', text: line.slice(3).trim() });
    else if (blocks.length === 0) intro.push(line);
    else blocks.push({ type: 'p', text: line });
  }

  const words = raw.split(/\s+/).length;
  const introText = intro.join(' ');
  return {
    slug,
    path: `/ressources/${slug}`,
    title,
    category,
    intro: introText,
    summary: shorten(introText),
    blocks,
    cta,
    sources,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    photo: (CATEGORY_STYLE[category] ?? CATEGORY_STYLE.Accompagnement).photo,
  };
}

export const ARTICLES: Article[] = Object.keys(files)
  .sort()
  .map((f) => parse(f, files[f]));

export const ARTICLE_CATEGORIES = ['Tous les thèmes', ...Array.from(new Set(ARTICLES.map((a) => a.category)))];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/** Articles de la même catégorie d'abord, puis les suivants. */
export function relatedArticles(a: Article, n = 3) {
  const others = ARTICLES.filter((x) => x.slug !== a.slug);
  return [...others.filter((x) => x.category === a.category), ...others.filter((x) => x.category !== a.category)].slice(0, n);
}

/** Texte avec **gras** → segments à rendre. */
export function inlineParts(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((s) => (s.startsWith('**') ? { bold: true, text: s.slice(2, -2) } : { bold: false, text: s }));
}
