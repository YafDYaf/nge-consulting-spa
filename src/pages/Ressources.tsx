import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Search } from 'lucide-react';
import { ArrowButton, Pill, SplitTitle } from '../components/ui';
import { useRdv } from '../components/rdv-context';
import { GUIDES } from '../data/content';
import { ARTICLE_CATEGORIES as ARTICLE_CATS, ARTICLES, CATEGORY_STYLE, articleBySlug } from '../data/articles';
import featured from '../assets/photos/libreville-commerce.webp';

const X = 'px-[clamp(20px,5vw,72px)]';

export default function Ressources() {
  const { openRdv } = useRdv();
  const [cat, setCat] = useState(0);
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const list = ARTICLES.filter(
    (a) =>
      (cat === 0 || a.category === ARTICLE_CATS[cat]) &&
      (!q || `${a.title} ${a.intro} ${a.category} ${a.blocks.map((b) => b.text).join(' ')}`.toLowerCase().includes(q)),
  );
  // Article mis en avant : le calendrier fiscal (évoque aussi E-Fact).
  const top = articleBySlug('preparer-son-calendrier-fiscal') ?? ARTICLES[0];

  return (
    <>
      <section className={`bg-navy ${X} pb-[clamp(40px,5vw,64px)] pt-[clamp(48px,7vw,88px)]`}>
        <div className="mx-auto flex max-w-site flex-col gap-[clamp(24px,3vw,36px)]">
          <SplitTitle strong="Comprendre vos obligations" light="pour mieux gérer votre entreprise." className="max-w-[980px] text-[clamp(40px,5.4vw,76px)]" />
          <label className="fade-d1 flex min-h-[60px] max-w-[620px] items-center gap-3 rounded-full bg-white pl-5 pr-2 text-navy">
            <Search aria-hidden="true" size={20} strokeWidth={2.2} />
            <span className="sr-only">Rechercher un article</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher : TVA, CNSS, statuts, bilan…"
              className="min-h-14 min-w-0 flex-auto border-0 bg-transparent text-[17px] text-navy outline-offset-[-3px]"
            />
          </label>
          <div role="group" aria-label="Filtrer par thème" className="fade-d2 flex flex-wrap gap-2">
            {ARTICLE_CATS.map((c, i) => (
              <Pill key={c} variant="dark" pressed={i === cat} onClick={() => setCat(i)}>{c}</Pill>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white text-navy">
        <section className={`${X} pt-[clamp(40px,6vw,72px)]`}>
          <Link to={top.path} className="lift mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] overflow-hidden rounded-panel bg-sun text-navy no-underline">
            <img
              src={featured}
              alt="Clients en caisse dans un supermarché de Libreville, drapeaux du Gabon au premier plan"
              loading="lazy"
              decoding="async"
              width={1400}
              height={933}
              className="h-full min-h-[clamp(220px,28vw,380px)] w-full object-cover"
            />
            <div className="flex flex-col gap-4 p-[clamp(24px,4vw,48px)]">
              <span className="text-[15px] font-bold">À la une, {top.category.toLowerCase()}</span>
              <h2 className="m-0 text-[clamp(28px,3.2vw,42px)] font-extrabold leading-[1.08] tracking-[-0.03em]">{top.title}</h2>
              <p className="m-0 text-[17px]">{top.summary}</p>
              <span className="mt-auto text-sm font-bold underline underline-offset-4">Lire l’article · {top.readingMinutes} min</span>
            </div>
          </Link>
        </section>

        <section className={`${X} pb-[clamp(56px,8vw,104px)] pt-[clamp(40px,6vw,72px)]`}>
          <div className="mx-auto flex max-w-site flex-col gap-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className="m-0 text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{cat === 0 ? 'Tous les articles' : ARTICLE_CATS[cat]}</h2>
              <span className="text-[15px] text-ink-muted" aria-live="polite">{list.length} {list.length > 1 ? 'articles' : 'article'}</span>
            </div>
            {list.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-5">
                {list.map((a) => (
                  <Link key={a.slug} to={a.path} className="lift flex flex-col overflow-hidden rounded-card border border-[#E1E9F1] bg-ice-pale text-navy no-underline">
                    <div className="box-border flex h-[150px] items-end p-4" style={{ background: CATEGORY_STYLE[a.category]?.tone ?? '#E4F1F8' }}>
                      <span className="inline-flex min-h-[30px] items-center rounded-full bg-white px-3 text-[13px] font-bold">{a.category}</span>
                    </div>
                    <div className="flex flex-auto flex-col gap-2.5 p-[22px]">
                      <h3 className="m-0 text-xl font-extrabold leading-[1.25] tracking-[-0.015em]">{a.title}</h3>
                      <p className="m-0 text-[15px] text-ink">{a.summary}</p>
                      <span className="mt-auto pt-2 text-[13px] font-bold text-royal">Lire · {a.readingMinutes} min</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start gap-3 rounded-card bg-ice-pale p-8">
                <span className="text-xl font-extrabold">Aucun article ne correspond à votre recherche.</span>
                <span className="text-base text-ink">Essayez un autre mot ou un autre thème, ou posez directement votre question à un conseiller.</span>
                <button type="button" onClick={() => { setCat(0); setQuery(''); }} className="min-h-12 rounded-full border-0 bg-navy px-[22px] text-[15px] font-bold text-white">
                  Afficher tous les articles
                </button>
              </div>
            )}
            <p className="m-0 text-[13px] text-ink-muted">Articles d’information générale. Les règles évoluent : faites vérifier votre situation avant toute décision.</p>
          </div>
        </section>

        <section className={`bg-ice ${X} py-[clamp(56px,8vw,104px)]`}>
          <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
            <div className="flex flex-col gap-4">
              <h2 className="m-0 text-[clamp(32px,3.8vw,52px)] font-extrabold leading-[1.02] tracking-tighter2">Des guides à garder sous la main.</h2>
              <p className="m-0 max-w-[440px] text-[17px] text-ink">Des fiches pratiques à télécharger, pour préparer vos échéances et vos rendez-vous.</p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {GUIDES.map((g) => (
                <li key={g.title} className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-[22px] bg-white px-[22px] py-5">
                  <div className="flex flex-[1_1_300px] items-center gap-4">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] bg-navy text-sun">
                      <FileText aria-hidden="true" size={22} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[17px] font-extrabold">{g.title}</span>
                      <span className="text-sm text-ink-muted">{g.meta}</span>
                    </span>
                  </div>
                  {/* [À fournir] : fichier PDF. Bouton inactif tant que le guide n’existe pas. */}
                  <button type="button" disabled title="Guide en préparation" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border-[1.5px] border-navy bg-transparent px-[18px] text-[15px] font-bold text-navy disabled:opacity-60">
                    <Download aria-hidden="true" size={16} strokeWidth={2.2} />
                    Bientôt disponible
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-[clamp(16px,3vw,40px)] py-[clamp(40px,6vw,72px)]">
          <div className="mx-auto box-border flex max-w-wide flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-panel bg-navy p-[clamp(28px,5vw,56px)] text-white">
            <span className="flex-[1_1_420px] text-[clamp(24px,2.8vw,36px)] font-extrabold leading-[1.1] tracking-[-0.025em]">Une question sur votre situation ? Un conseiller vous répond.</span>
            <ArrowButton onClick={openRdv}>Prendre rendez-vous</ArrowButton>
          </div>
        </section>
      </div>
    </>
  );
}
