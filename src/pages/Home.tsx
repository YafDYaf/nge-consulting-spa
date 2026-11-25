import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ArrowButton } from '../components/ui';
import { IndexRow, OutlineNumber, ParallaxBand, RevealWords, ScrollFillText } from '../components/effects';
import { useRdv } from '../components/rdv-context';
import { DEADLINES, EINVOICE_CHECKS, FAQ, METHOD, ORGS, REVIEWS, SERVICES, SITUATIONS, type Situation } from '../data/content';
import { SITE } from '../site';
import { articleBySlug } from '../data/articles';
import logo from '../assets/logo-nge.png';
import teamPhoto from '../assets/photos/equipe-reunion.webp';
import { SeasonLogo } from '../components/season';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';

function Hero() {
  const { openRdv } = useRdv();
  return (
    <section className={`relative overflow-hidden ${X} pb-[clamp(45px,5.9vw,83px)] pt-[clamp(39px,5.2vw,73px)]`}>
      <SeasonLogo fallback={logo} tails className="pointer-events-none absolute -right-[12vw] top-1/2 h-[min(56vw,540px)] w-[min(64vw,620px)] -translate-y-1/2 object-contain opacity-[0.12] mix-blend-screen" />
      <div className={`relative ${wrap} flex flex-col gap-[clamp(24px,3.2vw,38px)]`}>
        <p className="fade-d1 m-0 text-sm font-bold uppercase tracking-[0.2em] text-sky">Cabinet comptable · Libreville, Gabon</p>
        <h1 className="m-0 text-[clamp(42px,5.7vw,87px)] leading-[0.92] tracking-[-0.045em]">
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
          <p className="m-0 text-[clamp(18px,1.5vw,19px)] text-mist">
            Comptabilité, fiscalité, paie et création d’entreprise pour les dirigeants installés au Gabon. Un conseiller dédié, à Libreville, qui connaît votre dossier.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ArrowButton onClick={openRdv}>Parler à un conseiller</ArrowButton>
            <Link to="/contact" className="sweep-link pb-1 text-[15px] font-semibold text-white">Écrire sur WhatsApp</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Bandeau des institutions en grandes lettres creuses. */
export function OrgsMarquee() {
  const items = [...ORGS, ...ORGS];
  return (
    <section aria-label="Administrations et référentiels" className="overflow-hidden border-y border-navy-line py-[clamp(15px,1.9vw,24px)]">
      <div className="marquee-track animate-marquee gap-[clamp(22px,2.6vw,42px)] whitespace-nowrap text-[clamp(32px,4.1vw,60px)] font-heavy leading-none tracking-[-0.04em] text-mist-3">
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
    <section className={`${X} py-[clamp(50px,7.2vw,104px)]`}>
      <div className={wrap}>
        <ScrollFillText
          className="m-0 max-w-[1100px] text-[clamp(24px,2.9vw,42px)] font-bold leading-[1.12] tracking-[-0.03em]"
          text="Une seule équipe pour vos comptes, vos impôts et vos salariés. Vous n’avez plus à coordonner plusieurs prestataires : un interlocuteur à Libreville connaît votre dossier, vos échéances et vos chiffres."
        />
      </div>
    </section>
  );
}

export function Calendar({
  title = 'L’année d’une entreprise au Gabon tient dans quelques dates.',
  text = 'Nous les suivons pour vous, et vous prévenons par e-mail ou WhatsApp avant chacune d’elles.',
  items = DEADLINES,
  note = 'Calendrier type d’une PME soumise à la TVA et employeur. Dates indicatives tirées de la loi de finances 2026, à valider par le cabinet avant publication.',
}: { title?: string; text?: string; items?: { when: string; rule: string; what: string }[]; note?: string }) {
  return (
    <section id="calendrier" className={`bg-band ${X} py-[clamp(45px,5.9vw,83px)] text-on-band`}>
      <div className={`${wrap} flex flex-col gap-[clamp(25px,3.2vw,42px)]`}>
        <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <RevealWords text={title} className="m-0 text-[clamp(27px,3.1vw,46px)] font-extrabold leading-[1] tracking-tighter2" />
          <p className="m-0 max-w-[380px] text-base">{text}</p>
        </div>
        <dl className="m-0 grid border-t-2 border-on-band sm:grid-cols-2 lg:grid-cols-4">
          {items.map((d) => (
            <div key={d.when} className="scroll-pop flex flex-col gap-2 border-b border-band-line py-5 pr-6 lg:border-b-0">
              <dt className="text-[clamp(35px,3.4vw,49px)] font-heavy leading-none tracking-tightest">{d.when}</dt>
              <dd className="m-0 flex flex-col gap-1.5">
                <span className="text-base font-bold">{d.rule}</span>
                <span className="text-[15px] text-on-band/90">{d.what}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="m-0 text-[13px] text-on-band/80">
          {note}
        </p>
      </div>
    </section>
  );
}

export function SituationSwitcher({ items = SITUATIONS }: { items?: Situation[] }) {
  const { openRdv } = useRdv();
  const [picked, setPicked] = useState(0);
  const cur = items[picked];
  return (
    <section id="besoins" className={`swap ${X} py-[clamp(50px,6.5vw,94px)]`} style={{ background: cur.bg, color: cur.fg }}>
      <div className={`${wrap} flex flex-col gap-[clamp(22px,3.2vw,36px)]`}>
        <div className="flex flex-col gap-6">
          <h2 className="m-0 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Où en est votre entreprise ?</h2>
          <div role="group" aria-label="Choisissez votre situation" className="flex flex-wrap gap-x-8 gap-y-3">
            {items.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={i === picked}
                onClick={() => setPicked(i)}
                className={`sweep-link border-0 bg-transparent p-0 pb-1 text-[clamp(17px,1.4vw,18px)] font-bold text-inherit transition-opacity ${i === picked ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
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
              className="m-0 max-w-[1050px] text-[clamp(22px,2.4vw,37px)] font-semibold leading-[1.15] tracking-[-0.025em]"
            >
              {cur.text}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-6" style={{ borderColor: cur.fg }}>
          <span className="text-base">
            Ce qui vous aidera : <strong>{cur.service}</strong>
          </span>
          <button type="button" onClick={openRdv} className="sweep-link border-0 bg-transparent p-0 pb-1 text-base font-extrabold text-inherit">
            {cur.cta} →
          </button>
        </div>
      </div>
    </section>
  );
}

export function Expertises() {
  return (
    <section id="expertises" className={`${X} py-[clamp(50px,6.5vw,94px)]`}>
      <div className={`${wrap} flex flex-col gap-[clamp(22px,3.2vw,36px)]`}>
        <div className="grid items-end gap-6 md:grid-cols-[1.3fr_1fr]">
          <RevealWords text="Ce que nous prenons en charge." className="m-0 text-[clamp(30px,3.4vw,52px)] font-extrabold leading-none tracking-tighter2" />
          <p className="m-0 max-w-[420px] text-[15px] text-mist">Cinq métiers, un seul interlocuteur. Survolez une ligne, ouvrez celle qui vous concerne.</p>
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

type ChecklistProps = {
  id?: string;
  title?: string;
  intro?: string;
  items?: string[];
  /** Messages pour : tout coché, au moins la moitié, moins. */
  verdicts?: [string, string, string];
  note?: string;
};

export function Checklist({
  id = 'facture',
  title = 'Facture électronique : êtes-vous prêt ?',
  intro = 'La loi de finances 2026 généralise la facture électronique normalisée. Sans elle, une charge peut ne plus être déductible et la TVA ne plus être récupérable. Cochez ce qui est déjà en place chez vous.',
  items = EINVOICE_CHECKS,
  verdicts = [
    'Vous êtes bien organisé. Nous pouvons vérifier les détails avec vous.',
    'Vous êtes sur la bonne voie. Il reste quelques points à sécuriser.',
    'Commençons par le début : un échange de trente minutes suffit pour faire le point.',
  ],
  note = 'Contenu à valider par le cabinet au regard des textes officiels.',
}: ChecklistProps) {
  const [done, setDone] = useState(() => items.map(() => false));
  const n = done.filter(Boolean).length;
  const text = n === items.length ? verdicts[0] : n >= items.length / 2 ? verdicts[1] : verdicts[2];
  return (
    <section id={id} className={`bg-ice ${X} py-[clamp(50px,6.5vw,94px)] text-navy`}>
      <div className={`${wrap} grid items-start gap-[clamp(28px,3.9vw,62px)] lg:grid-cols-[1fr_1.1fr]`}>
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <RevealWords text={title} className="m-0 text-[clamp(27px,2.9vw,42px)] font-extrabold leading-none tracking-tighter2" />
          <p className="m-0 max-w-[500px] text-[15px] text-ink">{intro}</p>
          <div aria-live="polite" className="flex items-end gap-5">
            <span className="text-[clamp(77px,8.2vw,122px)] font-heavy leading-[0.8] tracking-tightest">
              {n}
              <OutlineNumber className="text-royal">/{items.length}</OutlineNumber>
            </span>
            <span className="max-w-[260px] pb-2 text-base font-semibold">{text}</span>
          </div>
          <p className="m-0 text-[13px] text-ink">{note}</p>
        </div>
        <ul className="m-0 list-none border-t-2 border-navy p-0">
          {items.map((label, i) => (
            <li key={label} className="border-b border-rule-strong">
              <label className="group flex cursor-pointer items-start gap-5 py-5">
                <input
                  type="checkbox"
                  checked={done[i]}
                  onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                  className="mt-1.5 h-6 w-6 flex-none accent-navy"
                />
                <span className={`text-[clamp(19px,1.7vw,22px)] font-semibold leading-snug transition-colors duration-500 ${done[i] ? 'text-navy' : 'text-ink-muted group-hover:text-navy'}`}>{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Method() {
  return (
    <section id="methode" className={`bg-ice ${X} pb-[clamp(50px,6.5vw,94px)] text-navy`}>
      <div className={`${wrap} flex flex-col gap-[clamp(28px,3.2vw,42px)] border-t border-rule-strong pt-[clamp(45px,5.2vw,73px)]`}>
        <RevealWords text="Du premier rendez-vous au suivi mensuel." className="m-0 max-w-[900px] text-[clamp(27px,2.9vw,42px)] font-extrabold leading-none tracking-tighter2" />
        <ol className="m-0 grid list-none gap-x-10 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((m, i) => (
            <li key={m.title} className="flex flex-col gap-3">
              <OutlineNumber className="text-[clamp(58px,5.4vw,82px)] text-navy">{String(i + 1).padStart(2, '0')}</OutlineNumber>
              <h3 className="m-0 text-xl font-extrabold">{m.title}</h3>
              <span className="text-base text-ink">{m.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonial() {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  return (
    <section id="avis" className={`${X} py-[clamp(50px,6.5vw,94px)]`}>
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
              className="m-0 min-h-[3.4em] max-w-[1100px] text-[clamp(24px,3vw,45px)] font-light leading-[1.1] tracking-[-0.03em]"
            >
              <span aria-hidden="true" className="text-sun">« </span>
              {r.quote}
              <span aria-hidden="true" className="text-sun"> »</span>
            </motion.blockquote>
          </AnimatePresence>
          <figcaption className="flex flex-wrap items-center justify-between gap-6 border-t border-navy-line pt-6">
            <span className="flex flex-col">
              <span className="text-base font-extrabold">{r.name}</span>
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

export function Faq({
  title = 'Les questions qu’on nous pose.',
  intro = 'Vous ne trouvez pas la vôtre ? Écrivez-nous, un conseiller vous répond sous un jour ouvré.',
  items = FAQ,
}: { title?: string; intro?: string; items?: { question: string; answer: string }[] }) {
  return (
    <section id="questions" className={`bg-white ${X} py-[clamp(50px,6.5vw,94px)] text-navy`}>
      <div className={`${wrap} grid items-start gap-x-20 gap-y-10 lg:grid-cols-[1fr_1.4fr]`}>
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <RevealWords text={title} className="m-0 text-[clamp(27px,2.9vw,42px)] font-extrabold leading-none tracking-tighter2" />
          <p className="m-0 max-w-[380px] text-[15px] text-ink">{intro}</p>
          <Link to="/contact" className="sweep-link self-start pb-1 text-base font-extrabold text-navy">Poser ma question →</Link>
        </div>
        <div className="border-t-2 border-navy">
          {items.map((q, i) => (
            <details key={q.question} open={i === 0} className="group border-b border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[clamp(19px,1.6vw,21px)] font-bold [&::-webkit-details-marker]:hidden">
                <h3 className="m-0 text-inherit">{q.question}</h3>
                <Plus aria-hidden="true" size={26} className="flex-none transition-transform duration-500 group-open:rotate-45" />
              </summary>
              <p className="m-0 max-w-[640px] pb-7 text-[15px] text-ink">{q.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reads({
  title = 'À lire avant votre prochaine échéance.',
  slugs = ['preparer-son-calendrier-fiscal', 'creer-son-entreprise-au-gabon', 'paie-obligations-cnss-cnamgs-employeurs'],
}: { title?: string; slugs?: string[] }) {
  const reads = slugs
    .map((slug) => articleBySlug(slug))
    .filter((a) => a !== undefined);
  return (
    <section id="ressources" className={`bg-white ${X} pb-[clamp(50px,6.5vw,94px)] text-navy`}>
      <div className={`${wrap} flex flex-col gap-8`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <RevealWords text={title} className="m-0 text-[clamp(24px,2.4vw,35px)] font-extrabold leading-none tracking-tighter2" />
          <Link to="/ressources" className="sweep-link pb-1 text-base font-bold text-navy">Tous les conseils</Link>
        </div>
        <nav aria-label="Articles à la une" className="border-t border-field">
          {reads.map((r, i) => (
            <IndexRow key={r.slug} tone="light" to={r.path} index={String(i + 1).padStart(2, '0')} title={r.title} text={`${r.category} · ${r.readingMinutes} min de lecture`} />
          ))}
        </nav>
      </div>
    </section>
  );
}

export function ContactCta({
  title = 'Et si nous parlions de votre entreprise ?',
  text,
}: { title?: string; text?: string }) {
  const { openRdv } = useRdv();
  return (
    <ParallaxBand src={teamPhoto} alt="Équipe en réunion dans un bureau lumineux" veil="bg-navy/80" className={`${X} py-[clamp(67px,9.1vw,130px)]`}>
      <div className={`${wrap} flex flex-col gap-10`}>
        <RevealWords as="h2" text={title} className="m-0 max-w-[1000px] text-[clamp(35px,4.8vw,76px)] font-heavy leading-[0.94] tracking-tightest" />
        {text && <p className="m-0 max-w-[560px] text-[clamp(17px,1.4vw,19px)] text-mist">{text}</p>}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <ArrowButton onClick={openRdv}>Prendre rendez-vous</ArrowButton>
          <Link to="/contact" className="sweep-link pb-1 text-base font-semibold text-white">Demander un devis</Link>
        </div>
        <address className="flex flex-wrap gap-x-10 gap-y-2 text-base not-italic text-mist">
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
      <Checklist />
      <Method />
      <Testimonial />
      <Faq />
      <Reads />
      <ContactCta />
    </>
  );
}
