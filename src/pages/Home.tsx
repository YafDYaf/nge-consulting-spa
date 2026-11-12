import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ArrowButton } from '../components/ui';
import { IndexRow, OutlineNumber, ParallaxBand, RevealWords, ScrollFillText } from '../components/effects';
import { useRdv } from '../components/rdv-context';
import { DEADLINES, EINVOICE_CHECKS, FAQ, METHOD, ORGS, REVIEWS, SERVICES, SITUATIONS } from '../data/content';
import { SITE } from '../site';
import logo from '../assets/logo-nge.png';
import teamPhoto from '../assets/photos/equipe-reunion.webp';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';

function Hero() {
  const { openRdv } = useRdv();
  return (
    <section className={`relative overflow-hidden ${X} pb-[clamp(64px,9vw,128px)] pt-[clamp(56px,8vw,112px)]`}>
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12vw] top-1/2 h-[min(70vw,720px)] w-[min(80vw,820px)] -translate-y-1/2 object-contain opacity-[0.12] mix-blend-screen"
      />
      <div className={`relative ${wrap} flex flex-col gap-[clamp(28px,4vw,48px)]`}>
        <p className="fade-d1 m-0 text-sm font-bold uppercase tracking-[0.2em] text-sky">Cabinet comptable · Libreville, Gabon</p>
        <h1 className="m-0 text-[clamp(52px,8.4vw,128px)] leading-[0.92] tracking-[-0.045em]">
          <span className="line-mask">
            <span className="font-heavy">La maîtrise</span>
          </span>{' '}
          <span className="line-mask">
            <span className="font-heavy">de vos chiffres.</span>
          </span>{' '}
          <span className="line-mask">
            <span className="outline-text font-heavy text-mist-2 [animation-delay:.28s]">La confiance</span>
          </span>{' '}
          <span className="line-mask">
            <span className="font-light text-mist-2 [animation-delay:.36s]">dans vos décisions.</span>
          </span>
        </h1>
        <div className="fade-d2 grid items-end gap-8 md:grid-cols-[minmax(0,480px)_auto] md:justify-between">
          <p className="m-0 text-[clamp(18px,1.6vw,21px)] text-mist">
            Comptabilité, fiscalité, paie et création d’entreprise pour les dirigeants installés au Gabon. Un conseiller dédié, à Libreville, qui connaît votre dossier.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ArrowButton onClick={openRdv} className="text-[17px]">Parler à un conseiller</ArrowButton>
            <Link to="/contact" className="sweep-link pb-1 text-[17px] font-semibold text-white">Écrire sur WhatsApp</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Bandeau des institutions en grandes lettres creuses. */
function OrgsMarquee() {
  const items = [...ORGS, ...ORGS];
  return (
    <section aria-label="Administrations et référentiels" className="overflow-hidden border-y border-navy-line py-[clamp(18px,2.4vw,30px)]">
      <div className="marquee-track animate-marquee gap-[clamp(32px,4vw,64px)] whitespace-nowrap text-[clamp(40px,6vw,88px)] font-heavy leading-none tracking-[-0.04em] text-mist-3">
        {items.map((o, i) => (
          <span key={i} aria-hidden={i >= ORGS.length || undefined} className={i % 2 ? 'text-sky' : 'outline-text'}>
            {o}
          </span>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className={`${X} py-[clamp(72px,11vw,160px)]`}>
      <div className={wrap}>
        <ScrollFillText
          className="m-0 max-w-[1100px] text-[clamp(30px,4.2vw,62px)] font-bold leading-[1.12] tracking-[-0.03em]"
          text="Une seule équipe pour vos comptes, vos impôts et vos salariés. Vous n’avez plus à coordonner plusieurs prestataires : un interlocuteur à Libreville connaît votre dossier, vos échéances et vos chiffres."
        />
      </div>
    </section>
  );
}

function Calendar() {
  return (
    <section id="calendrier" className={`bg-sun ${X} py-[clamp(64px,9vw,128px)] text-navy`}>
      <div className={`${wrap} flex flex-col gap-[clamp(36px,5vw,64px)]`}>
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <RevealWords text="L’année d’une entreprise au Gabon tient dans quelques dates." className="m-0 text-[clamp(34px,4.6vw,68px)] font-extrabold leading-[1] tracking-tighter2" />
          <p className="m-0 max-w-[380px] text-lg">Nous les suivons pour vous, et vous prévenons par e-mail ou WhatsApp avant chacune d’elles.</p>
        </div>
        <dl className="m-0 grid border-t-2 border-navy sm:grid-cols-2 lg:grid-cols-4">
          {DEADLINES.map((d) => (
            <div key={d.when} className="scroll-pop flex flex-col gap-2 border-b border-sun-deep py-7 pr-6 lg:border-b-0">
              <dt className="text-[clamp(44px,5vw,72px)] font-heavy leading-none tracking-tightest">{d.when}</dt>
              <dd className="m-0 flex flex-col gap-1.5">
                <span className="text-base font-bold">{d.rule}</span>
                <span className="text-[15px] text-[#2A3442]">{d.what}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="m-0 text-[13px] text-[#3A3200]">
          Calendrier type d’une PME soumise à la TVA et employeur. Dates indicatives tirées de la loi de finances 2026, à valider par le cabinet avant publication.
        </p>
      </div>
    </section>
  );
}

function SituationSwitcher() {
  const { openRdv } = useRdv();
  const [picked, setPicked] = useState(0);
  const cur = SITUATIONS[picked];
  return (
    <section id="besoins" className={`swap ${X} py-[clamp(72px,10vw,144px)]`} style={{ background: cur.bg, color: cur.fg }}>
      <div className={`${wrap} flex flex-col gap-[clamp(32px,5vw,56px)]`}>
        <div className="flex flex-col gap-6">
          <h2 className="m-0 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Où en est votre entreprise ?</h2>
          <div role="group" aria-label="Choisissez votre situation" className="flex flex-wrap gap-x-8 gap-y-3">
            {SITUATIONS.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={i === picked}
                onClick={() => setPicked(i)}
                className={`sweep-link border-0 bg-transparent p-0 pb-1 text-[clamp(17px,1.5vw,20px)] font-bold text-inherit transition-opacity ${i === picked ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div aria-live="polite" className="min-h-[clamp(200px,22vw,300px)]">
          <AnimatePresence mode="wait">
            <motion.p
              key={picked}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="m-0 max-w-[1050px] text-[clamp(28px,3.6vw,54px)] font-semibold leading-[1.15] tracking-[-0.025em]"
            >
              {cur.text}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-6" style={{ borderColor: cur.fg }}>
          <span className="text-base">
            Ce qui vous aidera : <strong>{cur.service}</strong>
          </span>
          <button type="button" onClick={openRdv} className="sweep-link border-0 bg-transparent p-0 pb-1 text-lg font-extrabold text-inherit">
            {cur.cta} →
          </button>
        </div>
      </div>
    </section>
  );
}

function Expertises() {
  return (
    <section id="expertises" className={`${X} py-[clamp(72px,10vw,144px)]`}>
      <div className={`${wrap} flex flex-col gap-[clamp(32px,5vw,56px)]`}>
        <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
          <RevealWords text="Ce que nous prenons en charge." className="m-0 text-[clamp(38px,5vw,76px)] font-extrabold leading-none tracking-tighter2" />
          <p className="m-0 max-w-[420px] text-[17px] text-mist">Cinq métiers, un seul interlocuteur. Survolez une ligne, ouvrez celle qui vous concerne.</p>
        </div>
        <nav aria-label="Nos expertises" className="border-t border-navy-line">
          {SERVICES.map((s, i) => (
            <IndexRow key={s.id} to={`/expertises#${s.id}`} index={String(i + 1).padStart(2, '0')} title={s.title} text={s.teaser} />
          ))}
        </nav>
      </div>
    </section>
  );
}

function EInvoiceCheck() {
  const [done, setDone] = useState([false, false, false, false]);
  const n = done.filter(Boolean).length;
  const text =
    n === 4
      ? 'Vous êtes bien organisé. Nous pouvons vérifier les détails avec vous.'
      : n >= 2
        ? 'Vous êtes sur la bonne voie. Il reste quelques points à sécuriser.'
        : 'Commençons par le début : un échange de trente minutes suffit pour faire le point.';
  return (
    <section id="facture" className={`bg-ice ${X} py-[clamp(72px,10vw,144px)] text-navy`}>
      <div className={`${wrap} grid items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[1fr_1.1fr]`}>
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <RevealWords text="Facture électronique : êtes-vous prêt ?" className="m-0 text-[clamp(34px,4.2vw,62px)] font-extrabold leading-none tracking-tighter2" />
          <p className="m-0 max-w-[500px] text-[17px] text-ink">
            La loi de finances 2026 généralise la facture électronique normalisée. Sans elle, une charge peut ne plus être déductible et la TVA ne plus être récupérable. Cochez ce qui est déjà en place chez vous.
          </p>
          <div aria-live="polite" className="flex items-end gap-5">
            <span className="text-[clamp(96px,12vw,180px)] font-heavy leading-[0.8] tracking-tightest">
              {n}
              <OutlineNumber className="text-royal">/4</OutlineNumber>
            </span>
            <span className="max-w-[260px] pb-2 text-base font-semibold">{text}</span>
          </div>
          <p className="m-0 text-[13px] text-ink">Contenu à valider par le cabinet au regard des textes officiels.</p>
        </div>
        <ul className="m-0 list-none border-t-2 border-navy p-0">
          {EINVOICE_CHECKS.map((label, i) => (
            <li key={label} className="border-b border-[#BFD3E3]">
              <label className="group flex cursor-pointer items-start gap-5 py-7">
                <input
                  type="checkbox"
                  checked={done[i]}
                  onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                  className="mt-1.5 h-6 w-6 flex-none accent-navy"
                />
                <span className={`text-[clamp(19px,1.8vw,24px)] font-semibold leading-snug transition-colors duration-500 ${done[i] ? 'text-navy' : 'text-ink-muted group-hover:text-navy'}`}>{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="methode" className={`bg-ice ${X} pb-[clamp(72px,10vw,144px)] text-navy`}>
      <div className={`${wrap} flex flex-col gap-[clamp(40px,5vw,64px)] border-t border-[#BFD3E3] pt-[clamp(64px,8vw,112px)]`}>
        <RevealWords text="Du premier rendez-vous au suivi mensuel." className="m-0 max-w-[900px] text-[clamp(34px,4.2vw,62px)] font-extrabold leading-none tracking-tighter2" />
        <ol className="m-0 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((m, i) => (
            <li key={m.title} className="flex flex-col gap-3">
              <OutlineNumber className="text-[clamp(72px,8vw,120px)] text-navy">{String(i + 1).padStart(2, '0')}</OutlineNumber>
              <h3 className="m-0 text-2xl font-extrabold">{m.title}</h3>
              <span className="text-base text-ink">{m.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonial() {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  return (
    <section id="avis" className={`${X} py-[clamp(72px,10vw,144px)]`}>
      <div className={`${wrap} flex flex-col gap-10`}>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="m-0 text-sm font-bold uppercase tracking-[0.2em] text-sky">Ce que disent les dirigeants que nous accompagnons</h2>
          <span className="text-sm text-mist-3">Témoignages à recueillir auprès de clients réels, avec leur accord écrit.</span>
        </div>
        <figure className="m-0 flex flex-col gap-10" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.5 }}
              className="m-0 min-h-[3.4em] max-w-[1100px] text-[clamp(30px,4.4vw,66px)] font-light leading-[1.1] tracking-[-0.03em]"
            >
              <span aria-hidden="true" className="text-sun">« </span>
              {r.quote}
              <span aria-hidden="true" className="text-sun"> »</span>
            </motion.blockquote>
          </AnimatePresence>
          <figcaption className="flex flex-wrap items-center justify-between gap-6 border-t border-navy-line pt-6">
            <span className="flex flex-col">
              <span className="text-lg font-extrabold">{r.name}</span>
              <span className="text-[15px] text-mist">{r.role}</span>
            </span>
            <span className="flex items-center gap-6 text-[15px] font-bold">
              <span className="tabular-nums text-mist-3">{String(i + 1).padStart(2, '0')} / {String(REVIEWS.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => setI((i + REVIEWS.length - 1) % REVIEWS.length)} className="sweep-link min-h-11 border-0 bg-transparent p-0 text-white">
                Précédent
              </button>
              <button type="button" onClick={() => setI((i + 1) % REVIEWS.length)} className="sweep-link min-h-11 border-0 bg-transparent p-0 text-white">
                Suivant
              </button>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="questions" className={`bg-white ${X} py-[clamp(72px,10vw,144px)] text-navy`}>
      <div className={`${wrap} grid items-start gap-x-20 gap-y-10 lg:grid-cols-[1fr_1.4fr]`}>
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <RevealWords text="Les questions qu’on nous pose." className="m-0 text-[clamp(34px,4.2vw,62px)] font-extrabold leading-none tracking-tighter2" />
          <p className="m-0 max-w-[380px] text-[17px] text-ink">Vous ne trouvez pas la vôtre ? Écrivez-nous, un conseiller vous répond sous un jour ouvré.</p>
          <Link to="/contact" className="sweep-link self-start pb-1 text-lg font-extrabold text-navy">Poser ma question →</Link>
        </div>
        <div className="border-t-2 border-navy">
          {FAQ.map((q, i) => (
            <details key={q.question} open={i === 0} className="group border-b border-[#D5DEE8]">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 text-[clamp(19px,1.7vw,23px)] font-bold [&::-webkit-details-marker]:hidden">
                <h3 className="m-0 text-inherit">{q.question}</h3>
                <Plus aria-hidden="true" size={26} className="flex-none transition-transform duration-500 group-open:rotate-45" />
              </summary>
              <p className="m-0 max-w-[640px] pb-7 text-[17px] text-ink">{q.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reads() {
  const reads = [
    { cat: 'Fiscalité', title: 'Facture électronique : ce que la loi de finances 2026 change pour vous' },
    { cat: 'Création', title: 'Créer sa société au guichet unique de l’ANPI : le dossier à préparer' },
    { cat: 'Paie', title: 'Premier salarié : vos obligations auprès de la CNSS et de la CNAMGS' },
  ];
  return (
    <section id="ressources" className={`bg-white ${X} pb-[clamp(72px,10vw,144px)] text-navy`}>
      <div className={`${wrap} flex flex-col gap-8`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <RevealWords text="À lire avant votre prochaine échéance." className="m-0 text-[clamp(30px,3.6vw,52px)] font-extrabold leading-none tracking-tighter2" />
          <Link to="/ressources" className="sweep-link pb-1 text-base font-bold text-navy">Tous les conseils</Link>
        </div>
        <nav aria-label="Articles à la une" className="border-t border-[#C9D9E6]">
          {reads.map((r) => (
            <IndexRow key={r.title} tone="light" to="/ressources" index={r.cat} title={r.title} />
          ))}
        </nav>
      </div>
    </section>
  );
}

function ContactCta() {
  const { openRdv } = useRdv();
  return (
    <ParallaxBand src={teamPhoto} alt="Équipe en réunion dans un bureau lumineux" veil="bg-navy/80" className={`${X} py-[clamp(96px,14vw,200px)]`}>
      <div className={`${wrap} flex flex-col gap-10`}>
        <RevealWords as="h2" text="Et si nous parlions de votre entreprise ?" className="m-0 max-w-[1000px] text-[clamp(44px,7vw,112px)] font-heavy leading-[0.94] tracking-tightest" />
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <ArrowButton onClick={openRdv}>Prendre rendez-vous</ArrowButton>
          <Link to="/contact" className="sweep-link pb-1 text-lg font-semibold text-white">Demander un devis</Link>
        </div>
        <address className="flex flex-wrap gap-x-10 gap-y-2 text-lg not-italic text-mist">
          <a href={SITE.phoneHref} className="sweep-link text-white">{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className="sweep-link break-all text-white">{SITE.email}</a>
          <span>{SITE.address.full}</span>
        </address>
      </div>
    </ParallaxBand>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <OrgsMarquee />
      <Manifesto />
      <Calendar />
      <SituationSwitcher />
      <Expertises />
      <EInvoiceCheck />
      <Method />
      <Testimonial />
      <Faq />
      <Reads />
      <ContactCta />
    </>
  );
}
