import { useState } from 'react';
import { Search } from 'lucide-react';
import { ArrowButton, SplitTitle } from '../components/ui';
import { ParallaxBand, RevealWords } from '../components/effects';
import { useRdv } from '../components/rdv-context';
import { ARTICLE_CATS, ARTICLES, GUIDES } from '../data/content';
import featured from '../assets/photos/libreville-commerce.webp';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';

export default function Ressources() {
  const { openRdv } = useRdv();
  const [cat, setCat] = useState(0);
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const list = ARTICLES.filter(
    (a) => (cat === 0 || a.cat === ARTICLE_CATS[cat]) && (!q || `${a.title} ${a.summary} ${a.cat}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <section className={`${X} pb-[clamp(48px,6vw,80px)] pt-[clamp(56px,8vw,112px)]`}>
        <div className={`${wrap} flex flex-col gap-[clamp(28px,4vw,48px)]`}>
          <SplitTitle strong="Comprendre vos obligations" light="pour mieux gérer votre entreprise." className="max-w-[1100px] text-[clamp(42px,6vw,92px)] leading-[0.94]" />
          <label className="fade-d1 flex max-w-[720px] items-center gap-4 border-b-2 border-mist-3 pb-2 focus-within:border-sun">
            <Search aria-hidden="true" size={28} strokeWidth={2} className="flex-none text-mist-3" />
            <span className="sr-only">Rechercher un article</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="TVA, CNSS, statuts, bilan…"
              className="min-h-14 min-w-0 flex-auto border-0 bg-transparent text-[clamp(22px,2.4vw,32px)] font-semibold text-white outline-none placeholder:text-mist-3/60"
            />
          </label>
          <div role="group" aria-label="Filtrer par thème" className="fade-d2 flex flex-wrap gap-x-7 gap-y-2">
            {ARTICLE_CATS.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-pressed={i === cat}
                onClick={() => setCat(i)}
                className={`sweep-link min-h-11 border-0 bg-transparent p-0 text-base font-bold transition-colors ${i === cat ? 'text-sun' : 'text-mist hover:text-white'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ParallaxBand src={featured} alt="Clients en caisse dans un supermarché de Libreville, drapeaux du Gabon au premier plan" veil="bg-gradient-to-t from-navy via-navy/80 to-navy/20" className={`${X} pb-[clamp(56px,8vw,96px)] pt-[clamp(140px,20vw,280px)]`}>
        <article className={`${wrap} flex flex-col gap-5`}>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-sun">À la une · Fiscalité</span>
          <RevealWords text="Facture électronique : ce que la loi de finances 2026 change pour votre entreprise." className="m-0 max-w-[1000px] text-[clamp(32px,4.4vw,66px)] font-heavy leading-[1] tracking-tightest" />
          <p className="m-0 max-w-[640px] text-lg text-mist">
            Qui est concerné, ce qu’est une facture normalisée, et pourquoi elle conditionne la déduction de vos charges et la récupération de la TVA.
          </p>
          <span className="text-sm text-mist-3">[Date de publication] — [Auteur]</span>
        </article>
      </ParallaxBand>

      <section className={`bg-white ${X} py-[clamp(64px,9vw,128px)] text-navy`}>
        <div className={`${wrap} flex flex-col gap-8`}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="m-0 text-[clamp(30px,3.4vw,48px)] font-extrabold leading-none tracking-tighter2">{cat === 0 ? 'Tous les articles' : ARTICLE_CATS[cat]}</h2>
            <span className="text-[15px] tabular-nums text-ink-muted" aria-live="polite">{list.length} {list.length > 1 ? 'articles' : 'article'}</span>
          </div>
          {list.length > 0 ? (
            <ol className="m-0 list-none border-t-2 border-navy p-0">
              {list.map((a) => (
                <li key={a.title} className="group grid gap-x-10 gap-y-2 border-b border-[#D5DEE8] py-7 transition-[padding] duration-500 ease-out hover:pl-3 md:grid-cols-[160px_1.3fr_1fr]">
                  <span className="text-sm font-bold uppercase tracking-[0.14em] text-royal">{a.cat}</span>
                  <h3 className="m-0 text-[clamp(22px,2.2vw,30px)] font-extrabold leading-[1.15] tracking-[-0.02em] group-hover:underline group-hover:decoration-sky group-hover:decoration-2 group-hover:underline-offset-[6px]">{a.title}</h3>
                  <p className="m-0 text-base text-ink">
                    {a.summary} <span className="block pt-2 text-[13px] text-ink-muted">[Date] — [Auteur]</span>
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex flex-col items-start gap-3 border-t-2 border-navy pt-8">
              <span className="text-[clamp(24px,2.4vw,34px)] font-extrabold">Aucun article ne correspond à votre recherche.</span>
              <span className="text-lg text-ink">Essayez un autre mot ou un autre thème, ou posez directement votre question à un conseiller.</span>
              <button type="button" onClick={() => { setCat(0); setQuery(''); }} className="sweep-link min-h-11 border-0 bg-transparent p-0 text-base font-bold text-navy">
                Afficher tous les articles
              </button>
            </div>
          )}
          <p className="m-0 text-[13px] text-ink-muted">Sujets proposés pour le lancement. Chaque article sera rédigé, daté et vérifié au regard des textes en vigueur avant publication.</p>
        </div>
      </section>

      <section className={`bg-ice ${X} py-[clamp(64px,9vw,128px)] text-navy`}>
        <div className={`${wrap} grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[1fr_1.3fr]`}>
          <div className="flex flex-col gap-4">
            <RevealWords text="Des guides à garder sous la main." className="m-0 text-[clamp(34px,4.2vw,62px)] font-extrabold leading-none tracking-tighter2" />
            <p className="m-0 max-w-[440px] text-[17px] text-ink">Des fiches pratiques à télécharger, pour préparer vos échéances et vos rendez-vous.</p>
          </div>
          <ul className="m-0 list-none border-t-2 border-navy p-0">
            {GUIDES.map((g) => (
              <li key={g.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[#BFD3E3] py-6">
                <span className="text-[clamp(20px,2vw,26px)] font-extrabold tracking-[-0.015em]">{g.title}</span>
                {/* [À fournir] : fichier PDF. */}
                <span className="text-sm text-ink-muted">{g.meta} · bientôt disponible</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`bg-sun ${X} py-[clamp(64px,9vw,128px)] text-navy`}>
        <div className={`${wrap} flex flex-col items-start gap-8`}>
          <RevealWords text="Une question sur votre situation ? Un conseiller vous répond." className="m-0 max-w-[1000px] text-[clamp(36px,5vw,76px)] font-heavy leading-[0.98] tracking-tightest" />
          <ArrowButton tone="navy" onClick={openRdv}>Prendre rendez-vous</ArrowButton>
        </div>
      </section>
    </>
  );
}
