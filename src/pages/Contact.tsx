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
        <span className="break-words text-lg font-extrabold">{children}</span>
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
      <section className="bg-navy px-[clamp(20px,5vw,72px)] pb-[clamp(120px,14vw,180px)] pt-[clamp(48px,7vw,88px)]">
        <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-end gap-x-16 gap-y-6">
          <SplitTitle strong="Parlons de" light="votre besoin." className="text-[clamp(44px,6vw,84px)]" />
          <p className="fade-d1 m-0 max-w-[460px] text-lg text-mist">
            Écrivez-nous, appelez-nous ou réservez directement un créneau. Un conseiller vous répond sous un jour ouvré.
          </p>
        </div>
      </section>

      <section className="bg-white px-[clamp(16px,3vw,40px)] pb-[clamp(56px,8vw,104px)] text-navy">
        <div className="relative mx-auto -mt-[clamp(80px,10vw,140px)] grid max-w-wide grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-4">
          <div className="rounded-panel bg-white p-[clamp(22px,3.4vw,40px)] shadow-[0_30px_70px_rgba(4,14,28,0.18)]">
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
                className="flex flex-col gap-[22px]"
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

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3.5 rounded-panel bg-sun p-[clamp(22px,3.4vw,36px)]">
              <h2 className="m-0 text-[clamp(24px,2.4vw,30px)] font-extrabold leading-[1.1] tracking-[-0.02em]">Vous préférez choisir votre créneau ?</h2>
              <p className="m-0 text-base">Réservez un premier échange de trente minutes, au cabinet, en visioconférence ou par téléphone.</p>
              <ArrowButton tone="navy" size="md" onClick={openRdv} className="self-start">Prendre rendez-vous</ArrowButton>
            </div>
            <address className="flex flex-col rounded-panel bg-navy px-[clamp(22px,3vw,32px)] py-2 not-italic text-white">
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
              className="min-h-[220px] rounded-panel bg-ice text-ink"
            />
          </div>
        </div>
      </section>
    </>
  );
}
