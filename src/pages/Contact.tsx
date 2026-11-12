import { useState } from 'react';
import { Check, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { ArrowButton, Pill, PhotoPlaceholder, SplitTitle } from '../components/ui';
import { inputCls, labelCls } from '../components/form-styles';
import { useRdv } from '../components/rdv-context';
import { SITE } from '../site';

const SITUATIONS = ['J’ai une entreprise', 'Je crée mon entreprise', 'Autre situation'];
const CHANNELS = [
  { label: 'Par téléphone', field: 'Votre numéro de téléphone', type: 'tel', ph: '+241', phrase: 'par téléphone' },
  { label: 'Par e-mail', field: 'Votre adresse e-mail', type: 'email', ph: 'nom@entreprise.ga', phrase: 'par e-mail' },
  { label: 'Par WhatsApp', field: 'Votre numéro WhatsApp', type: 'tel', ph: '+241', phrase: 'sur WhatsApp' },
];

function Row({ icon, label, children, href, last }: { icon: ReactNode; label: string; children: ReactNode; href?: string; last?: boolean }) {
  const body = (
    <>
      <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full bg-navy-800 text-sun">{icon}</span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm text-mist-2">{label}</span>
        <span className="break-words text-base font-extrabold sm:text-lg">{children}</span>
      </span>
    </>
  );
  const cls = `flex items-center gap-4 py-[18px] text-white no-underline ${last ? '' : 'border-b border-navy-line'}`;
  return href ? <a href={href} className={cls}>{body}</a> : <div className={cls}>{body}</div>;
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
      <section className="bg-navy px-5 pb-[clamp(104px,12vw,160px)] pt-[clamp(40px,6vw,80px)] sm:px-8 xl:px-[clamp(32px,5vw,72px)]">
        <div className="mx-auto grid max-w-site grid-cols-[minmax(0,1fr)] items-end gap-x-16 gap-y-5 lg:grid-cols-2">
          <SplitTitle strong="Parlons de" light="votre besoin." className="text-[clamp(40px,5.4vw,76px)]" />
          <p className="fade-d1 m-0 max-w-[460px] text-base text-mist sm:text-lg">
            Écrivez-nous, appelez-nous ou réservez directement un créneau. Un conseiller vous répond sous un jour ouvré.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 pb-[clamp(56px,8vw,104px)] text-navy sm:px-8 xl:px-10">
        <div className="relative mx-auto -mt-[clamp(72px,9vw,120px)] grid max-w-wide grid-cols-[minmax(0,1fr)] items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-6">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_70px_rgba(4,14,28,0.18)] sm:p-9 lg:rounded-panel lg:p-10">
            {sent ? (
              <div className="flex flex-col items-start gap-3.5 py-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sun">
                  <Check aria-hidden="true" size={30} strokeWidth={2.4} />
                </span>
                <h2 className="m-0 text-[clamp(26px,2.6vw,34px)] font-extrabold leading-[1.05] tracking-[-0.025em]">
                  Demande envoyée{firstName ? `, ${firstName}` : ''}
                </h2>
                <p className="m-0 max-w-[460px] text-[17px] text-ink">Un conseiller vous recontacte {cfg.phrase} sous un jour ouvré.</p>
                <button type="button" onClick={() => { setSent(false); setName(''); }} className="min-h-11 border-0 bg-transparent p-0 text-[15px] font-bold text-royal underline underline-offset-4">
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  // [À brancher] : envoi réel (Formspree, Resend, API du cabinet…).
                  setSent(true);
                }}
              >
                <h2 className="m-0 text-[clamp(26px,2.6vw,34px)] font-extrabold leading-[1.05] tracking-[-0.025em]">Votre demande</h2>
                <div role="group" aria-label="Votre situation" className="flex flex-col gap-2.5">
                  <span className="text-[15px] font-extrabold">Votre situation</span>
                  <div className="flex flex-wrap gap-2">
                    {SITUATIONS.map((l, i) => <Pill key={l} pressed={i === sit} onClick={() => setSit(i)}>{l}</Pill>)}
                  </div>
                </div>
                <label className={labelCls}>
                  Votre besoin principal
                  <select className={inputCls}>
                    <option>Comptabilité</option>
                    <option>Fiscalité et déclarations</option>
                    <option>Paie et gestion sociale</option>
                    <option>Création d’entreprise</option>
                    <option>Conseil et pilotage</option>
                    <option>Demande de devis</option>
                    <option>Autre demande</option>
                  </select>
                </label>
                <label className={labelCls}>
                  Votre nom ou votre entreprise
                  <input required type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                </label>
                <div role="group" aria-label="Comment préférez-vous être contacté ?" className="flex flex-col gap-2.5">
                  <span className="text-[15px] font-extrabold">Comment préférez-vous être contacté ?</span>
                  <div className="flex flex-wrap gap-2">
                    {CHANNELS.map((c, i) => <Pill key={c.label} pressed={i === ch} onClick={() => setCh(i)}>{c.label}</Pill>)}
                  </div>
                </div>
                <label className={labelCls}>
                  {cfg.field}
                  <input required key={cfg.type} type={cfg.type} placeholder={cfg.ph} className={inputCls} />
                </label>
                <label className={labelCls}>
                  Quelques précisions (facultatif)
                  <textarea rows={4} placeholder="Votre activité, votre nombre de salariés, l’échéance qui vous préoccupe…" className={`${inputCls} resize-y py-3`} />
                </label>
                <label className="flex items-start gap-2.5 text-[13px] text-ink">
                  <input required type="checkbox" className="mt-px h-5 w-5 flex-none accent-navy" />
                  J’accepte que N.G.E Consulting utilise ces informations pour répondre à ma demande.
                </label>
                <button type="submit" className="min-h-[58px] rounded-full border-0 bg-navy text-base font-bold text-white">Envoyer ma demande</button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-5 lg:gap-6">
            <div className="flex flex-col gap-3.5 rounded-[28px] bg-sun p-6 sm:p-9 lg:rounded-panel">
              <h2 className="m-0 text-[clamp(24px,2.4vw,30px)] font-extrabold leading-[1.1] tracking-[-0.02em]">Vous préférez choisir votre créneau ?</h2>
              <p className="m-0 text-base">Réservez un premier échange de trente minutes, au cabinet, en visioconférence ou par téléphone.</p>
              <ArrowButton tone="navy" size="md" onClick={openRdv} className="self-start">Prendre rendez-vous</ArrowButton>
            </div>
            <address className="flex flex-col rounded-[28px] bg-navy px-6 py-2 not-italic text-white sm:px-9 lg:rounded-panel">
              <Row icon={<Phone aria-hidden="true" size={20} />} label="Téléphone" href={SITE.phoneHref}>{SITE.phone}</Row>
              <Row icon={<Mail aria-hidden="true" size={20} />} label="E-mail" href={`mailto:${SITE.email}`}>{SITE.email}</Row>
              <Row icon={<MessageCircle aria-hidden="true" size={20} />} label="WhatsApp">[Numéro WhatsApp professionnel]</Row>
              <Row icon={<MapPin aria-hidden="true" size={20} />} label="Bureaux">{SITE.address.full}</Row>
              <Row icon={<Clock aria-hidden="true" size={20} />} label="Horaires" last>[Du lundi au vendredi, horaires à confirmer]</Row>
            </address>
            {/* [À intégrer] : carte (Google Maps ou OpenStreetMap) une fois l'adresse exacte confirmée. */}
            <PhotoPlaceholder
              title="Carte du quartier Nombakélé"
              note="À intégrer une fois l’adresse exacte du cabinet confirmée."
              className="min-h-[200px] rounded-[28px] bg-ice text-ink lg:rounded-panel"
            />
          </div>
        </div>
      </section>
    </>
  );
}
