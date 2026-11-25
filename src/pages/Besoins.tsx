import { useState } from 'react';
import { ArrowButton, SplitTitle } from '../components/ui';
import { ParallaxBand, RevealWords } from '../components/effects';
import { useRdv } from '../components/rdv-context';
import { ADVICE_BY_NEED, PROFILES } from '../data/content';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';
const PROFILE_PILLS = ['Créateur ou porteur de projet', 'TPE', 'PME'];
const NEED_PILLS = ['Comptabilité', 'Fiscalité', 'Paie', 'Création', 'Pilotage'];
const PREFIX = ['Pour un projet en création : ', 'Pour une TPE : ', 'Pour une PME : '];

function Choice({ items, value, onChange, label }: { items: string[]; value: number; onChange: (i: number) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-3">
      <span className="text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">{label}</span>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {items.map((l, i) => (
          <button
            key={l}
            type="button"
            aria-pressed={i === value}
            onClick={() => onChange(i)}
            className={`sweep-link min-h-11 border-0 bg-transparent p-0 text-base font-bold transition-colors ${i === value ? 'text-navy' : 'text-ink-muted hover:text-navy'}`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Besoins() {
  const { openRdv } = useRdv();
  const [prof, setProf] = useState(0);
  const [need, setNeed] = useState(0);
  const [sent, setSent] = useState(false);
  const advice = ADVICE_BY_NEED[need];

  return (
    <>
      <section className={`${X} pb-[clamp(39px,5.2vw,68px)] pt-[clamp(39px,5.2vw,73px)]`}>
        <div className={`${wrap} grid items-end gap-x-16 gap-y-6 lg:grid-cols-[1.4fr_1fr]`}>
          <SplitTitle strong="Partez de votre situation," light="pas de notre jargon." className="text-[clamp(35px,4.4vw,65px)] leading-[0.94]" />
          <p className="fade-d1 m-0 max-w-[480px] text-base text-mist">
            Vous n’avez pas besoin de savoir quel service demander. Dites-nous où en est votre entreprise, nous vous orientons.
          </p>
        </div>
      </section>

      {PROFILES.map((p, i) => (
        <ParallaxBand
          key={p.title}
          src={p.photo}
          alt={p.photoAlt}
          veil={i % 2 ? 'bg-gradient-to-l from-navy/95 via-navy/80 to-navy/30' : 'bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30'}
          className={`${X} py-[clamp(62px,7.8vw,114px)]`}
        >
          <div className={`${wrap} flex ${i % 2 ? 'justify-end' : ''}`}>
            <article className="flex max-w-[680px] flex-col gap-5">
              <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: p.bg === 'rgb(var(--c-ice))' ? 'rgb(var(--c-sky-soft))' : p.bg }}>
                Profil {String(i + 1).padStart(2, '0')}
              </span>
              <RevealWords text={p.title} className="m-0 text-[clamp(32px,3.7vw,54px)] font-heavy leading-[0.95] tracking-tightest" />
              <p className="m-0 text-[clamp(20px,1.7vw,24px)] font-semibold leading-[1.3]">{p.question}</p>
              <p className="m-0 text-[15px] text-mist">{p.text}</p>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-[15px]">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span aria-hidden="true" className="text-sun">—</span>
                    {it}
                  </li>
                ))}
              </ul>
              <ArrowButton size="md" onClick={openRdv} className="mt-3 self-start">{p.cta}</ArrowButton>
            </article>
          </div>
        </ParallaxBand>
      ))}

      <section className={`bg-white ${X} py-[clamp(50px,6.5vw,94px)] text-navy`}>
        <div className={`${wrap} grid items-start gap-[clamp(28px,3.9vw,62px)] lg:grid-cols-[1fr_1.1fr]`}>
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <RevealWords text="Trouvons le bon accompagnement." className="m-0 text-[clamp(27px,2.9vw,42px)] font-extrabold leading-none tracking-tighter2" />
            <p className="m-0 max-w-[460px] text-[15px] text-ink">Trois questions, et un conseiller vous recontacte avec une première proposition adaptée.</p>
            <div aria-live="polite" className="flex flex-col gap-2 border-l-0 border-t-2 border-navy pt-5">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">Ce que nous vous conseillons</span>
              <span className="text-[clamp(23px,2.1vw,29px)] font-extrabold leading-[1.1] tracking-[-0.02em]">{advice.title}</span>
              <span className="text-[15px] text-ink">{PREFIX[prof] + advice.text}</span>
            </div>
          </div>
          {sent ? (
            <div className="flex flex-col items-start gap-4 border-t-2 border-navy pt-8">
              <span className="text-[clamp(26px,2.3vw,33px)] font-heavy leading-none tracking-tightest">Demande envoyée.</span>
              <span className="text-base text-ink">Un conseiller vous recontacte sous un jour ouvré pour vous présenter une première proposition.</span>
              <button type="button" onClick={() => setSent(false)} className="sweep-link min-h-11 border-0 bg-transparent p-0 text-base font-bold text-royal">
                Faire une autre demande
              </button>
            </div>
          ) : (
            <form
              className="flex flex-col gap-9 border-t-2 border-navy pt-8"
              onSubmit={(e) => {
                e.preventDefault();
                // [À brancher] : service d’envoi des demandes.
                setSent(true);
              }}
            >
              <Choice label="Vous êtes" items={PROFILE_PILLS} value={prof} onChange={setProf} />
              <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">
                Votre secteur d’activité
                <select className="line-input normal-case tracking-normal text-navy">
                  <option>Commerce et distribution</option>
                  <option>Services aux entreprises</option>
                  <option>BTP et immobilier</option>
                  <option>Transport et logistique</option>
                  <option>Restauration et hôtellerie</option>
                  <option>Bois, mines et industrie</option>
                  <option>Autre secteur</option>
                </select>
              </label>
              <Choice label="Votre besoin principal" items={NEED_PILLS} value={need} onChange={setNeed} />
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Nom ou entreprise
                  <input required type="text" autoComplete="organization" className="line-input normal-case tracking-normal text-navy" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Téléphone ou WhatsApp
                  <input required type="tel" autoComplete="tel" placeholder="+241" className="line-input normal-case tracking-normal text-navy" />
                </label>
              </div>
              <ArrowButton type="submit" tone="navy" className="self-start">Recevoir une proposition</ArrowButton>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
