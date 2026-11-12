import { useState } from 'react';
import { Check } from 'lucide-react';
import { ArrowButton, CheckItem, Pill, SplitTitle } from '../components/ui';
import { inputCls, labelCls } from '../components/form-styles';
import { useRdv } from '../components/rdv-context';
import { ADVICE_BY_NEED, PROFILES } from '../data/content';

const PROFILE_PILLS = ['Créateur ou porteur de projet', 'TPE', 'PME'];
const NEED_PILLS = ['Comptabilité', 'Fiscalité', 'Paie', 'Création', 'Pilotage'];
const PREFIX = ['Pour un projet en création : ', 'Pour une TPE : ', 'Pour une PME : '];

export default function Besoins() {
  const { openRdv } = useRdv();
  const [prof, setProf] = useState(0);
  const [need, setNeed] = useState(0);
  const [sent, setSent] = useState(false);
  const advice = ADVICE_BY_NEED[need];

  return (
    <>
      <section className="bg-navy px-[clamp(20px,5vw,72px)] pb-[clamp(48px,6vw,80px)] pt-[clamp(48px,7vw,88px)]">
        <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-end gap-x-16 gap-y-6">
          <SplitTitle strong="Partez de votre situation," light="pas de notre jargon." className="text-[clamp(42px,5.6vw,80px)]" />
          <p className="fade-d1 m-0 max-w-[480px] text-lg text-mist">
            Vous n’avez pas besoin de savoir quel service demander. Dites-nous où en est votre entreprise, nous vous orientons.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white px-[clamp(16px,3vw,40px)] pt-[clamp(40px,6vw,80px)] text-navy">
        {PROFILES.map((p) => (
          <article
            key={p.title}
            className="mx-auto box-border grid w-full max-w-wide grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-stretch gap-[clamp(24px,4vw,48px)] rounded-panel p-[clamp(20px,3vw,32px)]"
            style={{ background: p.bg }}
          >
            <img src={p.photo} alt={p.photoAlt} loading="lazy" decoding="async" width={1200} height={800} className="h-full min-h-[clamp(220px,26vw,340px)] w-full rounded-3xl object-cover" />
            <div className="flex flex-col gap-4 px-[clamp(0px,1vw,16px)] py-[clamp(4px,1vw,16px)]">
              <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.02] tracking-tighter2">{p.title}</h2>
              <p className="m-0 text-[clamp(18px,1.6vw,21px)] font-semibold leading-[1.4]">{p.question}</p>
              <p className="m-0 text-base opacity-90">{p.text}</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {p.items.map((it) => <CheckItem key={it} color="text-navy">{it}</CheckItem>)}
              </ul>
              <ArrowButton tone="navy" size="md" onClick={openRdv} className="mt-auto self-start">{p.cta}</ArrowButton>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-white px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,104px)] text-navy">
        <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-[clamp(32px,5vw,64px)]">
          <div className="flex flex-col gap-[18px]">
            <h2 className="m-0 text-[clamp(32px,3.8vw,52px)] font-extrabold leading-[1.02] tracking-tighter2">Trouvons le bon accompagnement.</h2>
            <p className="m-0 max-w-[460px] text-[17px] text-ink">Trois questions, et un conseiller vous recontacte avec une première proposition adaptée.</p>
            <div className="flex flex-col gap-2 rounded-3xl bg-ice px-[26px] py-6" aria-live="polite">
              <span className="text-sm font-bold text-ink-muted">Ce que nous vous conseillons</span>
              <span className="text-2xl font-extrabold leading-[1.2] tracking-[-0.02em]">{advice.title}</span>
              <span className="text-base text-ink">{PREFIX[prof] + advice.text}</span>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-[28px] border-[1.5px] border-[#D5DEE8] p-[clamp(22px,3vw,36px)]">
            {sent ? (
              <div className="flex flex-col items-start gap-3.5 py-3">
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-sun">
                  <Check aria-hidden="true" size={28} strokeWidth={2.4} />
                </span>
                <span className="text-[26px] font-extrabold tracking-[-0.02em]">Demande envoyée</span>
                <span className="text-base text-ink">Un conseiller vous recontacte sous un jour ouvré pour vous présenter une première proposition.</span>
                <button type="button" onClick={() => setSent(false)} className="min-h-11 border-0 bg-transparent p-0 text-[15px] font-bold text-royal underline underline-offset-4">
                  Faire une autre demande
                </button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  // [À brancher] : service d’envoi des demandes.
                  setSent(true);
                }}
              >
                <div role="group" aria-label="Votre profil" className="flex flex-col gap-2.5">
                  <span className="text-base font-extrabold">Vous êtes</span>
                  <div className="flex flex-wrap gap-2">
                    {PROFILE_PILLS.map((l, i) => <Pill key={l} pressed={i === prof} onClick={() => setProf(i)}>{l}</Pill>)}
                  </div>
                </div>
                <label className={labelCls}>
                  Votre secteur d’activité
                  <select className={inputCls}>
                    <option>Commerce et distribution</option>
                    <option>Services aux entreprises</option>
                    <option>BTP et immobilier</option>
                    <option>Transport et logistique</option>
                    <option>Restauration et hôtellerie</option>
                    <option>Bois, mines et industrie</option>
                    <option>Autre secteur</option>
                  </select>
                </label>
                <div role="group" aria-label="Votre besoin principal" className="flex flex-col gap-2.5">
                  <span className="text-base font-extrabold">Votre besoin principal</span>
                  <div className="flex flex-wrap gap-2">
                    {NEED_PILLS.map((l, i) => <Pill key={l} pressed={i === need} onClick={() => setNeed(i)}>{l}</Pill>)}
                  </div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
                  <label className={labelCls}>
                    Nom ou entreprise
                    <input required type="text" autoComplete="organization" className={inputCls} />
                  </label>
                  <label className={labelCls}>
                    Téléphone ou WhatsApp
                    <input required type="tel" autoComplete="tel" placeholder="+241" className={inputCls} />
                  </label>
                </div>
                <button type="submit" className="min-h-14 rounded-full border-0 bg-navy text-base font-bold text-white">Recevoir une proposition</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
