// Accueil « édition de Noël » : le design « D2 — Édition de Noël », traité dans le style
// typographique de la refonte 2 (texte sur fond, peu de cartes). Activé par le thème (src/theme.ts).
import { Link } from 'react-router-dom';
import { ArrowButton } from '../components/ui';
import { useRdv } from '../components/rdv-context';
import { Bulbs, LogoGift, Snow, Star } from '../components/season';
import { PeelTree } from '../components/sapins';
import sapinPhoto from '../assets/photos/sapin-lumieres.webp';
import { ACTIVE_THEME } from '../active-theme';
import { Calendar, Checklist, ContactCta, Expertises, Faq, OrgsMarquee, Reads, SituationSwitcher, Testimonial } from './Home';
import { NOEL_CHECKS, NOEL_DEADLINES, NOEL_FAQ, NOEL_LETTER, NOEL_READS, NOEL_SITUATIONS, NOEL_VERDICTS } from '../data/noel';

const X = 'px-[clamp(20px,5vw,72px)]';
const wrap = 'mx-auto max-w-site';

function HeroNoel() {
  const { openRdv } = useRdv();
  return (
    <section className={`relative overflow-hidden ${X} pb-[clamp(45px,5.9vw,83px)] pt-[clamp(76px,7.6vw,110px)]`}>
      <Bulbs />
      <Snow count={26} />
      <Star twinkle className="absolute left-[8%] top-28 h-[18px] w-[18px] text-sun" />
      <Star twinkle delay={1.2} className="absolute left-[46%] top-20 h-3 w-3 text-white" />
      <Star twinkle delay={2.1} className="absolute bottom-20 left-[62%] h-3.5 w-3.5 text-sun" />
      {!ACTIVE_THEME.trees && (
        <LogoGift tails className="pointer-events-none absolute -right-[110px] bottom-[-60px] h-[min(64vw,500px)] w-[min(66vw,520px)] opacity-40 lg:-right-[60px] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:opacity-100" />
      )}
      <div className={`relative ${wrap} ${ACTIVE_THEME.trees ? 'grid items-center gap-[clamp(32px,4vw,64px)] lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
      <div className="flex flex-col gap-[clamp(24px,3.2vw,38px)]">
        <p className="fade-d1 m-0 flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-sky">
          <Star className="h-3 w-3 text-sun" />
          Édition de fin d’année
        </p>
        <h1 className="m-0 max-w-[880px] text-[clamp(42px,5.7vw,87px)] leading-[0.94] tracking-[-0.045em]">
          <span className="line-mask">
            <span className="font-heavy">Bouclez l’année</span>
          </span>{' '}
          <span className="line-mask">
            <span className="font-heavy">l’esprit <span className="outline-text text-sun">léger.</span></span>
          </span>{' '}
          <span className="line-mask">
            <span className="font-light text-mist-2 [animation-delay:.28s]">Nous veillons sur vos chiffres.</span>
          </span>
        </h1>
        <p className="fade-d2 m-0 max-w-[520px] text-[clamp(18px,1.5vw,19px)] text-mist">
          Clôture de l’exercice, paie de décembre, échéances de janvier : nous préparons votre fin d’année pour que vous profitiez des fêtes. Toute l’équipe N.G.E vous souhaite un joyeux Noël.
        </p>
        <div className="fade-d2 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ArrowButton onClick={openRdv}>Préparer ma clôture</ArrowButton>
          <Link to="/contact" className="sweep-link pb-1 text-[15px] font-semibold text-white">Écrire sur WhatsApp</Link>
        </div>
      </div>
      {ACTIVE_THEME.trees && (
        <div className="fade-d2 relative h-[clamp(340px,62vw,560px)] overflow-hidden rounded-panel shadow-[0_40px_90px_rgb(var(--c-shadow)/0.55)] lg:h-auto lg:max-h-[620px]">
          <PeelTree slice className="block h-full w-full lg:h-auto" />
        </div>
      )}
      </div>
    </section>
  );
}

/** Le mot de fin d'année : une lettre, nouée d'un ruban rouge. */
function Letter() {
  if (ACTIVE_THEME.trees) return <LetterSapin />;
  return (
    <section id="voeux" className={`bg-ice ${X} pb-[clamp(50px,6.5vw,94px)] text-navy`}>
      <div className={`${wrap} relative border-t border-rule-strong pt-[clamp(45px,5.2vw,73px)]`}>
        <div aria-hidden="true" className="absolute bottom-0 right-[clamp(8px,6vw,96px)] top-0 w-3.5 bg-sun" />
        <svg aria-hidden="true" viewBox="0 0 64 44" className="absolute right-[calc(clamp(8px,6vw,96px)-25px)] top-[clamp(24px,3vw,40px)] h-11 w-16">
          <g fill="none" className="stroke-sun-deep" strokeWidth="5" strokeLinecap="round">
            <ellipse cx="20" cy="16" rx="15" ry="9" transform="rotate(18 20 16)" />
            <ellipse cx="44" cy="16" rx="15" ry="9" transform="rotate(-18 44 16)" />
            <path d="M28 26 L20 42 M36 26 L44 42" />
          </g>
          <circle cx="32" cy="24" r="7" className="fill-sun" />
        </svg>
        <div className="flex max-w-[720px] flex-col gap-5 pr-16">
          <h2 className="m-0 text-[clamp(30px,3.4vw,52px)] font-extrabold leading-none tracking-tighter2">
            Le mot de <span className="outline-text">fin d’année.</span>
          </h2>
          <p className="m-0 text-lg font-semibold">{NOEL_LETTER.greeting}</p>
          {NOEL_LETTER.paragraphs.map((p) => (
            <p key={p} className="m-0 text-[17px] leading-[1.7] text-ink">{p}</p>
          ))}
          <p className="m-0 flex flex-col pt-2">
            <span className="text-lg font-extrabold">{NOEL_LETTER.signature}</span>
            <span className="text-[15px] text-ink-muted">{NOEL_LETTER.role}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Variante « sapin » du mot de fin d'année : texte sur feutre vert, filet doré, petits sapins. */
function LetterSapin() {
  return (
    <section id="voeux" className={`felt relative overflow-hidden bg-navy-800 ${X} py-[clamp(56px,7vw,104px)]`}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1fr_auto]`}>
        <div className="flex max-w-[720px] flex-col gap-5">
          <p className="m-0 text-sm font-bold uppercase tracking-[0.2em] text-gold">Joyeux Noël</p>
          <h2 className="m-0 text-[clamp(30px,3.4vw,52px)] font-extrabold leading-none tracking-tighter2">
            Le mot de <span className="outline-text text-sun">fin d’année.</span>
          </h2>
          <div aria-hidden="true" className="flex max-w-[360px] items-center gap-3 text-gold">
            <span className="h-px flex-1 bg-gold/60" />
            <Star className="h-3.5 w-3.5" />
            <span className="h-px flex-1 bg-gold/60" />
          </div>
          <p className="m-0 text-lg font-semibold">{NOEL_LETTER.greeting}</p>
          {NOEL_LETTER.paragraphs.map((p) => (
            <p key={p} className="m-0 text-[17px] leading-[1.7] text-mist">{p}</p>
          ))}
          <p className="m-0 flex flex-col pt-2">
            <span className="text-lg font-extrabold">{NOEL_LETTER.signature}</span>
            <span className="text-[15px] text-mist-3">{NOEL_LETTER.role}</span>
          </p>
        </div>
        <img
          src={sapinPhoto}
          alt="Grand sapin de Noël illuminé, décoré de boules rouges et d’une étoile"
          loading="lazy"
          width={1600}
          height={1067}
          className="aspect-[4/5] w-full rounded-panel object-cover object-[50%_60%] shadow-[0_40px_90px_rgb(var(--c-shadow)/0.55)] lg:w-[420px]"
        />
      </div>
    </section>
  );
}

export default function HomeNoel() {
  return (
    <>
      <HeroNoel />
      <OrgsMarquee />
      <Calendar
        title="Les fêtes passent vite. Les échéances, elles, reviennent en janvier."
        text="Nous les suivons pour vous pendant que vous profitez des vôtres."
        items={NOEL_DEADLINES}
        note="Dates indicatives tirées de la loi de finances 2026 et des pratiques déclaratives courantes, à valider par le cabinet avant publication."
      />
      <SituationSwitcher items={NOEL_SITUATIONS} />
      <Expertises />
      <Checklist
        id="checklist"
        title="Votre check-list avant de fermer pour les fêtes."
        intro="Quatre points à régler avant le 31 décembre pour une clôture sans surprise. Cochez ce qui est déjà fait."
        items={NOEL_CHECKS}
        verdicts={NOEL_VERDICTS}
        note="Liste indicative, à adapter à votre activité avec le cabinet."
      />
      <Letter />
      <Testimonial />
      <Faq title="Les questions de fin d’année." intro="Vous ne trouvez pas la vôtre ? Écrivez-nous, un conseiller vous répond sous un jour ouvré, fêtes comprises." items={NOEL_FAQ} />
      <Reads title="À lire avant le 31 décembre." slugs={NOEL_READS} />
      <div className="relative">
        <Snow count={12} seed={5} className="z-[1]" />
        <ContactCta
          title="Et si nous préparions la nouvelle année ensemble ?"
          text="Réservez dès maintenant un premier échange en décembre ou en janvier, pour démarrer l’année avec des comptes à jour."
        />
      </div>
    </>
  );
}
