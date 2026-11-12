import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, MessageCircle } from 'lucide-react';
import { ArrowButton, GhostLink } from '../components/ui';
import { useRdv } from '../components/rdv-context';
import { DEADLINES, EINVOICE_CHECKS, FAQ, METHOD, ORGS, REVIEWS, SITUATIONS } from '../data/content';
import { SITE } from '../site';
import logo from '../assets/logo-nge.png';

const sectionX = 'px-[clamp(20px,5vw,72px)]';
const h2 = 'm-0 font-extrabold leading-none tracking-tighter2';

function Hero() {
  const { openRdv } = useRdv();
  return (
    <section className={`relative overflow-hidden ${sectionX} pb-[clamp(56px,8vw,112px)] pt-[clamp(48px,7vw,88px)]`}>
      <div className="relative mx-auto max-w-site">
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-[70px] -bottom-[60px] h-[210px] w-[240px] object-contain opacity-20 sm:-right-[120px] sm:-bottom-[70px] sm:h-[330px] sm:w-[380px] sm:opacity-35 xl:-right-[180px] xl:bottom-auto xl:-top-[30px] xl:h-[480px] xl:w-[560px] xl:opacity-90"
        />
        <div className="relative z-[1] flex max-w-[860px] flex-col gap-[clamp(24px,3vw,36px)]">
          <h1 className="m-0 text-[clamp(48px,6.4vw,92px)] leading-[0.98] tracking-[-0.04em]">
            <span className="line-mask">
              <span className="font-heavy">La maîtrise de vos chiffres.</span>
            </span>{' '}
            <span className="line-mask">
              <span className="font-light text-mist-2">La confiance dans vos décisions.</span>
            </span>
          </h1>
          <p className="fade-d1 m-0 max-w-[480px] text-[19px] text-mist">
            Comptabilité, fiscalité, paie et création d’entreprise pour les dirigeants installés au Gabon. Un conseiller dédié, à Libreville, qui connaît votre dossier.
          </p>
          <div className="fade-d2 flex flex-wrap gap-3">
            <ArrowButton onClick={openRdv} className="text-[17px]">Parler à un conseiller</ArrowButton>
            {/* [À confirmer] : numéro WhatsApp professionnel. En attendant, le lien mène à la page Contact. */}
            <GhostLink to="/contact">
              <MessageCircle aria-hidden="true" size={20} />
              Écrire sur WhatsApp
            </GhostLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrgsMarquee() {
  const items = [...ORGS, ...ORGS, ...ORGS, ...ORGS];
  return (
    <section aria-label="Administrations et référentiels" className="overflow-hidden border-y border-navy-line py-[22px]">
      <div className="marquee-track animate-marquee-fast gap-14 whitespace-nowrap text-xl font-semibold text-mist-3">
        {items.map((o, i) => (
          <span key={i} className="inline-flex items-center gap-14" aria-hidden={i >= ORGS.length || undefined}>
            {o}
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky" />
          </span>
        ))}
      </div>
    </section>
  );
}

function Calendar() {
  return (
    <section id="calendrier" className="px-[clamp(16px,3vw,40px)] pt-[clamp(56px,8vw,104px)]">
      <div className="mx-auto max-w-wide overflow-hidden rounded-panel bg-sun text-navy">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 px-[clamp(24px,4vw,56px)] pb-7 pt-12">
          <h2 className="m-0 max-w-[660px] text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
            L’année d’une entreprise au Gabon tient dans quelques dates.
          </h2>
          <p className="m-0 max-w-[360px] text-base">Nous les suivons pour vous, et vous prévenons par e-mail ou WhatsApp avant chacune d’elles.</p>
        </div>
        <div className="bg-sun-soft px-[clamp(24px,4vw,56px)] py-3.5 text-base font-bold">Calendrier type d’une PME soumise à la TVA et employeur</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] px-[clamp(12px,3vw,44px)] pb-9 pt-4">
          {DEADLINES.map((d, i) => (
            <div key={d.when} className={`scroll-pop flex flex-col gap-2.5 border-l border-sun-deep px-[18px] py-6 ${i === DEADLINES.length - 1 ? 'border-r' : ''}`}>
              <span className="text-[clamp(40px,4.6vw,58px)] font-heavy leading-none tracking-tightest">{d.when}</span>
              <span className="text-base font-bold">{d.rule}</span>
              <span className="text-[15px] text-[#2A3442]">{d.what}</span>
            </div>
          ))}
        </div>
        <p className="m-0 px-[clamp(24px,4vw,56px)] pb-8 text-[13px] text-[#3A3200]">
          Dates indicatives tirées de la loi de finances 2026 et des pratiques déclaratives courantes, à valider par le cabinet avant publication.
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
    <section id="besoins" className="px-[clamp(16px,3vw,40px)] pt-[clamp(56px,8vw,104px)]">
      <div
        className="swap mx-auto box-border flex max-w-wide flex-col gap-10 rounded-panel border-[1.5px] p-[clamp(28px,5vw,64px)]"
        style={{ background: cur.bg, color: cur.fg, borderColor: cur.line }}
      >
        <div className="flex flex-col gap-5">
          <h2 className={`${h2} text-[clamp(32px,3.8vw,54px)]`}>Où en est votre entreprise ?</h2>
          <div role="group" aria-label="Choisissez votre situation" className="flex flex-wrap gap-2.5">
            {SITUATIONS.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={i === picked}
                onClick={() => setPicked(i)}
                className="swap min-h-12 rounded-full border-[1.5px] px-5 text-[15px] font-bold"
                style={{ borderColor: cur.fg, background: i === picked ? cur.fg : 'transparent', color: i === picked ? cur.bg : cur.fg }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-end gap-x-14 gap-y-6" aria-live="polite">
          <p className="m-0 max-w-[620px] text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.28] tracking-[-0.015em]">{cur.text}</p>
          <div className="flex flex-col items-start gap-3.5">
            <span className="text-base">
              Ce qui vous aidera : <strong>{cur.service}</strong>
            </span>
            <button
              type="button"
              onClick={openRdv}
              className="swap inline-flex min-h-14 items-center rounded-full border-0 px-[26px] text-base font-bold"
              style={{ background: cur.fg, color: cur.bg }}
            >
              {cur.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpertiseBento() {
  const small = 'lift flex flex-col gap-3 rounded-card p-[30px] no-underline';
  return (
    <section id="expertises" className={`${sectionX} pb-[clamp(56px,8vw,104px)] pt-[clamp(64px,8vw,112px)]`}>
      <div className="mx-auto flex max-w-site flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <h2 className={`${h2} max-w-[640px] text-[clamp(34px,4vw,58px)]`}>Ce que nous prenons en charge.</h2>
          <p className="m-0 max-w-[420px] text-[17px] text-mist">Une seule équipe pour vos comptes, vos impôts et vos salariés. Vous n’avez plus à coordonner plusieurs prestataires.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
          <Link to="/expertises#comptabilite" className="lift row-span-2 flex min-h-[clamp(300px,32vw,420px)] flex-col gap-4 rounded-card bg-white p-[clamp(26px,3vw,36px)] text-navy no-underline">
            <ClipboardList aria-hidden="true" size={44} strokeWidth={1.5} className="text-royal" />
            <h3 className="m-0 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]">Comptabilité &amp; suivi financier</h3>
            <span className="max-w-[380px] text-[17px] text-ink">Tenue, révision et préparation des états financiers selon le SYSCOHADA. Des synthèses que vous pouvez lire et utiliser pour décider.</span>
            <span className="mt-auto text-base font-bold underline decoration-sky decoration-2 underline-offset-[5px]">Voir la comptabilité</span>
          </Link>
          <Link to="/expertises#fiscalite" className={`${small} bg-sky text-navy`}>
            <h3 className="m-0 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">Fiscalité &amp; déclarations</h3>
            <span className="text-base">TVA, patente, impôt sur les résultats : préparés à l’avance, pas la veille.</span>
          </Link>
          <Link to="/expertises#paie" className={`${small} bg-navy-800 text-white`}>
            <h3 className="m-0 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">Paie &amp; gestion sociale</h3>
            <span className="text-base text-mist">Bulletins de salaire, CNSS, CNAMGS et suivi administratif de vos salariés.</span>
          </Link>
          <Link to="/expertises#creation" className={`${small} bg-navy-800 text-white`}>
            <h3 className="m-0 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">Création d’entreprise</h3>
            <span className="text-base text-mist">Statuts, dossier au guichet unique de l’ANPI et premiers outils de gestion.</span>
          </Link>
          <Link to="/expertises#conseil" className={`${small} border-[1.5px] border-[#3D5876] text-white`}>
            <h3 className="m-0 text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">Conseil &amp; pilotage</h3>
            <span className="text-base text-mist">Budgets, trésorerie et tableaux de bord, si votre activité le demande.</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function EInvoiceCheck() {
  const [done, setDone] = useState([false, false, false, false]);
  const n = done.filter(Boolean).length;
  let text = 'Commençons par le début : un échange de trente minutes suffit pour faire le point.';
  let bg = '#FFFFFF';
  if (n === 4) {
    text = 'Vous êtes bien organisé. Nous pouvons vérifier les détails avec vous.';
    bg = '#CDEFD9';
  } else if (n >= 2) {
    text = 'Vous êtes sur la bonne voie. Il reste quelques points à sécuriser.';
    bg = '#FCD116';
  }
  return (
    <section id="facture" className={`rounded-t-[40px] bg-ice ${sectionX} py-[clamp(56px,8vw,104px)] text-navy`}>
      <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-12">
        <div className="flex flex-col gap-[18px]">
          <h2 className={`${h2} text-[clamp(32px,3.8vw,54px)]`}>Facture électronique : êtes-vous prêt ?</h2>
          <p className="m-0 max-w-[500px] text-[17px] text-ink">
            La loi de finances 2026 généralise la facture électronique normalisée. Sans elle, une charge peut ne plus être déductible et la TVA ne plus être récupérable. Cochez ce qui est déjà en place chez vous.
          </p>
          <div className="swap flex flex-col gap-1.5 rounded-[22px] px-[26px] py-6" style={{ background: bg }} aria-live="polite">
            <span className="text-[44px] font-heavy leading-none tracking-tightest">{n} sur 4</span>
            <span className="text-base font-semibold">{text}</span>
          </div>
          <p className="m-0 text-[13px] text-ink">Contenu à valider par le cabinet au regard des textes officiels.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {EINVOICE_CHECKS.map((label, i) => (
            <label
              key={label}
              className={`swap flex cursor-pointer items-start gap-4 rounded-[20px] border-2 px-[22px] py-5 ${done[i] ? 'border-sky bg-white' : 'border-field bg-[#F4F9FC]'}`}
            >
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                className="mt-0.5 h-[22px] w-[22px] flex-none accent-navy"
              />
              <span className="text-base font-semibold">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="methode" className={`bg-ice ${sectionX} pb-[clamp(56px,8vw,104px)] text-navy`}>
      <div className="mx-auto flex max-w-site flex-col gap-14 border-t border-[#BFD3E3] pt-[clamp(56px,7vw,96px)]">
        <h2 className={`${h2} max-w-[760px] text-[clamp(34px,4vw,56px)]`}>Du premier rendez-vous au suivi mensuel.</h2>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-8 p-0">
          {METHOD.map((m, i) => (
            <li key={m.title} className="flex flex-col gap-3.5">
              <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-navy text-xl font-extrabold text-sun">{i + 1}</span>
              <h3 className="m-0 text-[22px] font-extrabold">{m.title}</h3>
              <span className="text-base text-ink">{m.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Reviews() {
  const items = [...REVIEWS, ...REVIEWS];
  return (
    <section id="avis" className="overflow-hidden pb-[clamp(96px,12vw,160px)] pt-[clamp(64px,8vw,112px)]">
      <div className={`mx-auto mb-12 flex max-w-site flex-wrap items-end justify-between gap-x-12 gap-y-4 ${sectionX}`}>
        <h2 className={`${h2} max-w-[620px] text-[clamp(34px,4vw,58px)]`}>Ce que disent les dirigeants que nous accompagnons.</h2>
        <p className="m-0 max-w-[380px] text-[15px] text-mist-3">Témoignages à recueillir auprès de clients réels, avec leur accord écrit. Survolez pour mettre en pause.</p>
      </div>
      <div className="marquee-track animate-marquee gap-5 px-5">
        {items.map((r, i) => (
          <figure
            key={i}
            aria-hidden={i >= REVIEWS.length || undefined}
            className="m-0 box-border flex min-h-[280px] flex-[0_0_min(380px,80vw)] flex-col justify-between gap-7 rounded-card p-[30px]"
            style={{ background: r.bg, color: r.fg }}
          >
            <svg aria-hidden="true" width="36" height="28" viewBox="0 0 36 28" fill={r.mark}>
              <path d="M0 28V16C0 7 5 1.5 14 0l1.6 4C10.4 5.6 8 9 8 13h7v15H0zm20 0V16c0-9 5-14.5 14-16l1.6 4C30.4 5.6 28 9 28 13h7v15H20z" />
            </svg>
            <blockquote className="m-0 text-lg font-medium leading-normal">{r.quote}</blockquote>
            <figcaption className="flex items-center gap-3.5">
              <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full text-[15px] font-extrabold" style={{ background: r.mark, color: r.bg }}>
                {r.initials}
              </span>
              <span className="flex flex-col">
                <span className="text-base font-extrabold">{r.name}</span>
                <span className="text-sm opacity-85">{r.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="questions" className={`rounded-t-[40px] bg-white ${sectionX} py-[clamp(56px,8vw,104px)] text-navy`}>
      <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-start gap-x-20 gap-y-10">
        <div className="flex flex-col gap-[18px]">
          <h2 className={`${h2} text-[clamp(34px,4vw,56px)]`}>Les questions qu’on nous pose.</h2>
          <p className="m-0 max-w-[380px] text-[17px] text-ink">Vous ne trouvez pas la vôtre ? Écrivez-nous, un conseiller vous répond sous un jour ouvré.</p>
          <Link to="/contact" className="inline-flex min-h-[52px] items-center self-start rounded-full bg-navy px-6 text-base font-bold text-white no-underline">
            Poser ma question
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {FAQ.map((q, i) => {
            const isOpen = i === open;
            return (
              <div key={q.question} className={`swap rounded-[20px] ${isOpen ? 'bg-ice' : 'bg-[#F4F7FA]'}`}>
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-5 border-0 bg-transparent px-[22px] py-[18px] text-left text-[17px] font-bold text-navy"
                  >
                    <span>{q.question}</span>
                    <span aria-hidden="true" className={`flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full text-xl font-semibold ${isOpen ? 'bg-navy text-sun' : 'bg-white text-navy'}`}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                {/* La réponse reste dans le HTML (masquée) pour être lisible par les moteurs et les IA. */}
                <p id={`faq-${i}`} hidden={!isOpen} className="m-0 max-w-[620px] px-[22px] pb-[22px] text-base text-ink">
                  {q.answer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ResourcesTeaser() {
  const cards = [
    { cat: 'Fiscalité', title: 'Facture électronique : ce que la loi de finances 2026 change pour vous', cls: 'bg-sun text-navy', catCls: '' },
    { cat: 'Création', title: 'Créer sa société au guichet unique de l’ANPI : le dossier à préparer', cls: 'bg-ice text-navy', catCls: '' },
    { cat: 'Paie', title: 'Premier salarié : vos obligations auprès de la CNSS et de la CNAMGS', cls: 'bg-navy text-white', catCls: 'text-sky-soft' },
  ];
  return (
    <section id="ressources" className={`bg-white ${sectionX} pb-[clamp(56px,8vw,104px)] text-navy`}>
      <div className="mx-auto flex max-w-site flex-col gap-9 border-t border-[#D5DEE8] pt-[clamp(56px,7vw,96px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 className={`${h2} text-[clamp(34px,4vw,56px)]`}>À lire avant votre prochaine échéance.</h2>
          <Link to="/ressources" className="inline-flex min-h-12 items-center text-base font-bold text-navy underline decoration-sky decoration-2 underline-offset-[6px]">
            Tous les conseils
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {cards.map((c) => (
            <Link key={c.title} to="/ressources" className={`lift box-border flex min-h-[260px] flex-col gap-3.5 rounded-card p-7 no-underline ${c.cls}`}>
              <span className={`text-sm font-bold ${c.catCls}`}>{c.cat}</span>
              <h3 className="m-0 text-2xl font-extrabold leading-[1.2] tracking-[-0.02em]">{c.title}</h3>
              <span className="mt-auto text-sm opacity-80">[Date de publication]</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta() {
  const { openRdv } = useRdv();
  return (
    <section id="contact" className="bg-white px-[clamp(16px,3vw,40px)] pb-10 text-navy">
      <div className="relative mx-auto box-border grid max-w-wide grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] items-center gap-10 overflow-hidden rounded-[36px] bg-navy p-[clamp(36px,6vw,80px)] text-white">
        <img src={logo} alt="" aria-hidden="true" className="absolute -bottom-[70px] -right-[60px] h-[260px] w-[300px] object-contain opacity-35" />
        <h2 className="relative m-0 text-[clamp(38px,5vw,72px)] font-heavy leading-[0.96] tracking-tightest">Et si nous parlions de votre entreprise ?</h2>
        <div className="relative flex flex-col gap-[22px]">
          <div className="flex flex-wrap gap-3">
            <ArrowButton onClick={openRdv}>Prendre rendez-vous</ArrowButton>
            <GhostLink to="/contact">Demander un devis</GhostLink>
          </div>
          <div className="flex flex-col gap-1 text-[17px] text-mist">
            <a href={SITE.phoneHref} className="text-mist no-underline hover:text-white">{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="break-all text-mist no-underline hover:text-white">{SITE.email}</a>
            <span>{SITE.address.full}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <OrgsMarquee />
      <Calendar />
      <SituationSwitcher />
      <ExpertiseBento />
      <EInvoiceCheck />
      <Method />
      <Reviews />
      <Faq />
      <ResourcesTeaser />
      <ContactCta />
    </>
  );
}
