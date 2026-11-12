import { useState } from 'react';
import { ArrowButton, SplitTitle } from '../components/ui';
import { RevealWords } from '../components/effects';
import { useRdv } from '../components/rdv-context';
import { SITE } from '../site';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';
const SITUATIONS = ['J’ai une entreprise', 'Je crée mon entreprise', 'Autre situation'];
const CHANNELS = [
  { label: 'Par téléphone', field: 'Votre numéro de téléphone', type: 'tel', ph: '+241', phrase: 'par téléphone' },
  { label: 'Par e-mail', field: 'Votre adresse e-mail', type: 'email', ph: 'nom@entreprise.ga', phrase: 'par e-mail' },
  { label: 'Par WhatsApp', field: 'Votre numéro WhatsApp', type: 'tel', ph: '+241', phrase: 'sur WhatsApp' },
];
const fieldLabel = 'flex flex-col gap-2 text-sm font-bold uppercase tracking-[0.16em] text-ink-muted';
const field = 'line-input normal-case tracking-normal text-navy';

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

export default function Contact() {
  const { openRdv } = useRdv();
  const [sit, setSit] = useState(0);
  const [ch, setCh] = useState(0);
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  const cfg = CHANNELS[ch];
  const firstName = name.trim().split(' ')[0];

  return (
    <>
      <section className={`${X} pb-[clamp(39px,5.2vw,68px)] pt-[clamp(39px,5.2vw,73px)]`}>
        <div className={`${wrap} flex flex-col gap-[clamp(28px,3.9vw,52px)]`}>
          <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[1.2fr_1fr]">
            <SplitTitle strong="Parlons de" light="votre besoin." className="text-[clamp(42px,5.4vw,84px)] leading-[0.92]" />
            <p className="fade-d1 m-0 max-w-[460px] text-base text-mist">
              Écrivez-nous, appelez-nous ou réservez directement un créneau. Un conseiller vous répond sous un jour ouvré.
            </p>
          </div>
          {/* Coordonnées en très grand : le numéro est l'appel à l'action principal. */}
          <address className="fade-d2 flex flex-col border-t border-navy-line not-italic">
            <a href={SITE.phoneHref} className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-navy-line py-5 text-white no-underline">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky">Téléphone</span>
              <span className="text-[clamp(27px,3.8vw,57px)] font-heavy leading-none tracking-tightest transition-colors duration-500 group-hover:text-sun">{SITE.phone}</span>
            </a>
            <a href={`mailto:${SITE.email}`} className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-navy-line py-5 text-white no-underline">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky">E-mail</span>
              <span className="break-all text-[clamp(18px,2.2vw,33px)] font-extrabold leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-sun">{SITE.email}</span>
            </a>
            <div className="grid gap-x-10 gap-y-4 py-5 text-base md:grid-cols-3">
              <span className="flex flex-col"><span className="text-sm font-bold uppercase tracking-[0.2em] text-sky">Bureaux</span>{SITE.address.full}</span>
              <span className="flex flex-col"><span className="text-sm font-bold uppercase tracking-[0.2em] text-sky">WhatsApp</span>[Numéro WhatsApp professionnel]</span>
              <span className="flex flex-col"><span className="text-sm font-bold uppercase tracking-[0.2em] text-sky">Horaires</span>[Du lundi au vendredi, horaires à confirmer]</span>
            </div>
          </address>
        </div>
      </section>

      <section className={`bg-sun ${X} py-[clamp(39px,5.2vw,68px)] text-navy`}>
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-8`}>
          <RevealWords text="Vous préférez choisir votre créneau ?" className="m-0 max-w-[760px] text-[clamp(27px,3.1vw,46px)] font-heavy leading-[0.98] tracking-tightest" />
          <div className="flex flex-col items-start gap-4">
            <p className="m-0 max-w-[400px] text-[15px]">Réservez un premier échange de trente minutes, au cabinet, en visioconférence ou par téléphone.</p>
            <ArrowButton tone="navy" onClick={openRdv}>Prendre rendez-vous</ArrowButton>
          </div>
        </div>
      </section>

      <section className={`bg-white ${X} py-[clamp(50px,6.5vw,94px)] text-navy`}>
        <div className={`${wrap} grid items-start gap-[clamp(28px,3.9vw,62px)] lg:grid-cols-[1fr_1.3fr]`}>
          <RevealWords text="Ou écrivez-nous directement." className="m-0 text-[clamp(27px,2.9vw,42px)] font-extrabold leading-none tracking-tighter2 lg:sticky lg:top-28" />
          {sent ? (
            <div className="flex flex-col items-start gap-4 border-t-2 border-navy pt-8">
              <span className="text-[clamp(26px,2.3vw,33px)] font-heavy leading-none tracking-tightest">Demande envoyée{firstName ? `, ${firstName}` : ''}.</span>
              <span className="text-base text-ink">Un conseiller vous recontacte {cfg.phrase} sous un jour ouvré.</span>
              <button type="button" onClick={() => { setSent(false); setName(''); }} className="sweep-link min-h-11 border-0 bg-transparent p-0 text-base font-bold text-royal">
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form
              className="flex flex-col gap-9 border-t-2 border-navy pt-8"
              onSubmit={(e) => {
                e.preventDefault();
                // [À brancher] : envoi réel (Formspree, Resend, API du cabinet…).
                setSent(true);
              }}
            >
              <Choice label="Votre situation" items={SITUATIONS} value={sit} onChange={setSit} />
              <label className={fieldLabel}>
                Votre besoin principal
                <select className={field}>
                  <option>Comptabilité</option>
                  <option>Fiscalité et déclarations</option>
                  <option>Paie et gestion sociale</option>
                  <option>Création d’entreprise</option>
                  <option>Conseil et pilotage</option>
                  <option>Demande de devis</option>
                  <option>Autre demande</option>
                </select>
              </label>
              <label className={fieldLabel}>
                Votre nom ou votre entreprise
                <input required type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
              </label>
              <Choice label="Comment préférez-vous être contacté ?" items={CHANNELS.map((c) => c.label)} value={ch} onChange={setCh} />
              <label className={fieldLabel}>
                {cfg.field}
                <input required key={cfg.type} type={cfg.type} placeholder={cfg.ph} className={field} />
              </label>
              <label className={fieldLabel}>
                Quelques précisions (facultatif)
                <textarea rows={3} placeholder="Votre activité, votre nombre de salariés, l’échéance qui vous préoccupe…" className={`${field} resize-y py-2`} />
              </label>
              <label className="flex items-start gap-3 text-[14px] text-ink">
                <input required type="checkbox" className="mt-0.5 h-5 w-5 flex-none accent-navy" />
                J’accepte que N.G.E Consulting utilise ces informations pour répondre à ma demande.
              </label>
              <ArrowButton type="submit" tone="navy" className="self-start">Envoyer ma demande</ArrowButton>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
