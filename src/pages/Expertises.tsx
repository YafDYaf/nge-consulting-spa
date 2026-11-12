import { Fragment } from 'react';
import { ArrowButton, SplitTitle } from '../components/ui';
import { OutlineNumber, ParallaxBand, RevealWords } from '../components/effects';
import { useRdv } from '../components/rdv-context';
import { MISSION_STEPS, SERVICES } from '../data/content';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';

export default function Expertises() {
  const { openRdv } = useRdv();
  return (
    <>
      <section className={`${X} pb-[clamp(39px,5.2vw,68px)] pt-[clamp(39px,5.2vw,73px)]`}>
        <div className={`${wrap} flex flex-col gap-[clamp(24px,3.2vw,38px)]`}>
          <SplitTitle strong="Cinq métiers," light="un seul interlocuteur." className="text-[clamp(38px,5vw,76px)] leading-[0.92]" />
          <div className="fade-d1 grid items-end gap-8 md:grid-cols-[minmax(0,560px)_1fr]">
            <p className="m-0 text-[15px] text-mist">
              Vos comptes, vos impôts, vos salariés et vos projets suivis par la même équipe. Choisissez une expertise pour voir ce que nous faisons concrètement.
            </p>
            <nav aria-label="Aller à une expertise" className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
              {SERVICES.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="sweep-link pb-1 text-base font-bold text-white">
                  <span className="mr-2 text-sky">{String(i + 1).padStart(2, '0')}</span>
                  {s.short}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <Fragment key={s.id}>
          <ParallaxBand src={s.photo} alt={s.photoAlt} veil="bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" className={`${X} py-[clamp(62px,7.8vw,117px)]`}>
            <div id={s.id} className={`${wrap} scroll-mt-24`}>
              <div className="flex max-w-[860px] flex-col gap-6">
                <OutlineNumber className="text-[clamp(51px,5.4vw,82px)] text-sun">{String(i + 1).padStart(2, '0')}</OutlineNumber>
                <RevealWords text={s.title} className="m-0 text-[clamp(32px,3.8vw,57px)] font-heavy leading-[0.95] tracking-tightest" />
                <p className="m-0 max-w-[640px] text-[clamp(18px,1.6vw,22px)] font-medium leading-[1.3] text-mist-2">{s.headline}</p>
              </div>
            </div>
          </ParallaxBand>
          <section className={`bg-white ${X} py-[clamp(39px,5.2vw,68px)] text-navy`}>
            <div className={`${wrap} flex flex-col gap-[clamp(28px,3.2vw,42px)]`}>
              <p className="m-0 max-w-[900px] text-[clamp(20px,1.8vw,25px)] font-medium leading-[1.4] tracking-[-0.01em]">{s.intro}</p>
              <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {s.groups.map((g) => (
                  <div key={g.title} className="flex flex-col gap-4 border-t-2 border-navy pt-5">
                    <h3 className="m-0 text-xl font-extrabold tracking-[-0.015em]">{g.title}</h3>
                    <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[16px] text-ink">
                      {g.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span aria-hidden="true" className="text-royal">—</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-[#D5DEE8] pt-8">
                <p className="m-0 max-w-[560px] text-[15px] text-ink">
                  <strong className="text-navy">Pour qui :</strong> {s.who}
                </p>
                <ArrowButton tone="navy" size="md" onClick={openRdv}>{s.cta}</ArrowButton>
              </div>
              {s.toConfirm && <p className="m-0 text-[13px] text-ink-muted">Offre proposée dans le cahier de contenu, à publier seulement si le cabinet la confirme.</p>}
            </div>
          </section>
        </Fragment>
      ))}

      <section className={`${X} py-[clamp(50px,6.5vw,94px)]`}>
        <div className={`${wrap} flex flex-col gap-[clamp(28px,3.2vw,42px)]`}>
          <RevealWords text="Comment se déroule une mission." className="m-0 max-w-[900px] text-[clamp(29px,3.1vw,46px)] font-extrabold leading-none tracking-tighter2" />
          <ol className="m-0 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {MISSION_STEPS.map((m, i) => (
              <li key={m.title} className="flex flex-col gap-3">
                <OutlineNumber className="text-[clamp(58px,5.4vw,82px)] text-sun">{String(i + 1).padStart(2, '0')}</OutlineNumber>
                <h3 className="m-0 text-lg font-extrabold">{m.title}</h3>
                <span className="text-base text-mist">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`bg-sun ${X} py-[clamp(45px,5.9vw,83px)] text-navy`}>
        <div className={`${wrap} flex flex-col items-start gap-8`}>
          <RevealWords text="Vous hésitez entre plusieurs expertises ? Parlons-en trente minutes." className="m-0 max-w-[1000px] text-[clamp(29px,3.4vw,52px)] font-heavy leading-[0.98] tracking-tightest" />
          <ArrowButton tone="navy" onClick={openRdv}>Prendre rendez-vous</ArrowButton>
        </div>
      </section>
    </>
  );
}
