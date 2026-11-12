import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { IndexRow } from '../components/effects';
import { ArrowButton } from '../components/ui';
import { useRdv } from '../components/rdv-context';
import { articleBySlug, CATEGORY_STYLE, inlineParts, relatedArticles } from '../data/articles';
import NotFound from './NotFound';

const X = 'px-5 sm:px-8 xl:px-[clamp(32px,5vw,72px)]';

function Inline({ text }: { text: string }) {
  return (
    <>
      {inlineParts(text).map((p, i) => (p.bold ? <strong key={i}>{p.text}</strong> : <Fragment key={i}>{p.text}</Fragment>))}
    </>
  );
}

const anchor = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default function Article() {
  const { slug = '' } = useParams();
  const { openRdv } = useRdv();
  const a = articleBySlug(slug);
  if (!a) return <NotFound />;
  const sections = a.blocks.filter((b) => b.type === 'h2');
  const related = relatedArticles(a);

  return (
    <article>
      <header className={`bg-navy ${X} pb-[clamp(96px,12vw,150px)] pt-[clamp(32px,5vw,64px)]`}>
        <div className="mx-auto flex max-w-[960px] flex-col gap-6">
          <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-sm text-mist-3">
            <Link to="/ressources" className="inline-flex items-center gap-1.5 text-mist no-underline hover:text-white">
              <ArrowLeft aria-hidden="true" size={15} /> Ressources
            </Link>
            <span aria-hidden="true">/</span>
            <span>{a.category}</span>
          </nav>
          <span className="self-start rounded-full px-3.5 py-1 text-[13px] font-bold text-navy" style={{ background: CATEGORY_STYLE[a.category]?.tone ?? '#E4F1F8' }}>
            {a.category}
          </span>
          <h1 className="m-0 text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.04] tracking-[-0.035em]">{a.title}</h1>
          <p className="m-0 max-w-[760px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-mist">{a.intro}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mist-3">
            <span>Par l’équipe N.G.E Consulting</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden="true" size={15} /> {a.readingMinutes} min de lecture
            </span>
          </div>
        </div>
      </header>

      <div className={`bg-white ${X} pb-[clamp(56px,8vw,104px)] text-navy`}>
        <img
          src={a.photo}
          alt=""
          width={1200}
          height={800}
          className="relative mx-auto -mt-[clamp(64px,9vw,110px)] block aspect-[16/10] w-full max-w-[1100px] object-[50%_30%] sm:aspect-[21/9] rounded-[28px] object-cover shadow-[0_30px_70px_rgba(4,14,28,0.18)]"
        />

        <div className="mx-auto mt-[clamp(40px,6vw,72px)] grid max-w-[1100px] gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav aria-label="Sommaire" className="sticky top-28 flex flex-col gap-1 border-l-2 border-ice-2 pl-5">
              <span className="pb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Sommaire</span>
              {sections.map((s) => (
                <a key={s.text} href={`#${anchor(s.text)}`} className="py-1 text-sm leading-snug text-ink no-underline hover:text-royal">
                  {s.text}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex max-w-[720px] flex-col">
            <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-ink">
              {a.blocks.map((b, i) =>
                b.type === 'h2' ? (
                  <h2 key={i} id={anchor(b.text)} className="m-0 scroll-mt-24 pt-6 text-[clamp(22px,2.2vw,28px)] font-extrabold leading-tight tracking-[-0.02em] text-navy">
                    {b.text}
                  </h2>
                ) : (
                  <p key={i} className="m-0">
                    <Inline text={b.text} />
                  </p>
                ),
              )}
            </div>

            <aside className="mt-12 flex flex-col gap-5 rounded-[28px] bg-navy p-7 text-white sm:p-9">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky">N.G.E Consulting</span>
              <p className="m-0 text-[clamp(22px,2.4vw,30px)] font-extrabold leading-[1.15] tracking-[-0.02em]">{a.cta}</p>
              <ArrowButton onClick={openRdv} className="self-start">Prendre rendez-vous</ArrowButton>
            </aside>

            {a.sources.length > 0 && (
              <div className="mt-10 border-t border-[#D5DEE8] pt-6">
                <h2 className="m-0 pb-3 text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">Sources officielles</h2>
                <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
                  {a.sources.map((s) => (
                    <li key={s}>
                      <a href={s} target="_blank" rel="noopener" className="break-all text-royal underline underline-offset-4">
                        {s.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="m-0 pt-4 text-[13px] text-ink-muted">
                  Article d’information générale : les règles évoluent, faites vérifier votre situation par un professionnel avant toute décision.
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mx-auto mt-[clamp(56px,8vw,96px)] flex max-w-[1100px] flex-col gap-6 border-t border-[#D5DEE8] pt-10">
          <h2 className="m-0 text-[clamp(24px,2.6vw,34px)] font-extrabold tracking-[-0.025em]">À lire aussi</h2>
          <nav aria-label="Articles liés" className="border-t-2 border-navy">
            {related.map((r, i) => (
              <IndexRow key={r.slug} tone="light" to={r.path} index={String(i + 1).padStart(2, '0')} title={r.title} text={`${r.category} · ${r.readingMinutes} min`} />
            ))}
          </nav>
        </section>
      </div>
    </article>
  );
}
