// Éléments de saison, tous pilotés par le thème actif (src/theme.ts).
// Avec le thème « nge », aucun ne s'affiche et le logo reste l'image d'origine.
import { useId } from 'react';
import { ACTIVE_THEME } from '../active-theme';

/** Pseudo-aléatoire déterministe : même rendu au prérendu et à l'hydratation. */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const flakes = (count: number, seed: number) =>
  Array.from({ length: count }, (_, i) => ({
    left: rand(i + seed, 1) * 100,
    size: 3 + rand(i + seed, 2) * 4,
    duration: 11 + rand(i + seed, 3) * 10,
    delay: -rand(i + seed, 4) * 18,
    drift: (rand(i + seed, 5) - 0.5) * 60,
    opacity: 0.35 + rand(i + seed, 6) * 0.5,
  }));

/** Neige légère dans le bloc parent (qui doit être en position relative). */
export function Snow({ count = 24, seed = 0, className = '' }: { count?: number; seed?: number; className?: string }) {
  if (ACTIVE_THEME.decor !== 'snow') return null;
  return (
    <div aria-hidden="true" className={`snowfield pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {flakes(count, seed).map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ['--drift' as string]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

const BULB_TONES = ['bg-sun text-sun', 'bg-white text-white', 'bg-sky text-sky'];

/** Guirlande lumineuse accrochée en haut d'une section. */
export function Bulbs({ count = 26 }: { count?: number }) {
  if (ACTIVE_THEME.decor !== 'snow') return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex h-11 justify-between border-t-[1.5px] border-navy-edge px-[2%]">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`flex-col items-center ${i % 2 ? 'hidden sm:flex' : 'flex'}`}>
          <span className={`w-px bg-navy-edge ${i % 4 < 2 ? 'h-2' : 'h-4'}`} />
          <span
            className={`bulb h-[11px] w-2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] ${BULB_TONES[i % 3]}`}
            style={{ animationDelay: `${((i * 0.37) % 2.6).toFixed(2)}s` }}
          />
        </span>
      ))}
    </div>
  );
}

/** Étoile à quatre branches (scintille si `twinkle`). */
export function Star({ className = '', twinkle = false, delay = 0 }: { className?: string; twinkle?: boolean; delay?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-current ${twinkle ? 'twinkle' : ''} ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      <path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" />
    </svg>
  );
}

/** Logo NGE redessiné en cadeau : le cube noué d'un ruban et d'un nœud à la couleur d'accent du thème. */
export function LogoGift({ className = '', label, tails = false }: { className?: string; label?: string; tails?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const top = 'M100 12 L172 50 L100 88 L28 50 Z';
  const left = 'M22 66 L92 103 L92 182 L22 145 Z';
  const right = 'M108 103 L178 66 L178 145 L108 182 Z';
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg viewBox="0 0 200 192" className={className} {...a11y}>
      <defs>
        <clipPath id={`${id}t`}><path d={top} /></clipPath>
        <clipPath id={`${id}l`}><path d={left} /></clipPath>
        <clipPath id={`${id}r`}><path d={right} /></clipPath>
      </defs>
      <g strokeWidth="6" strokeLinejoin="round">
        <path d={top} fill="#344358" stroke="#344358" />
        <path d={left} className="fill-sky stroke-sky" />
        <path d={right} className="fill-royal stroke-royal" />
      </g>
      <g className="stroke-sun" strokeWidth="10">
        <path clipPath={`url(#${id}t)`} d="M64 31 L136 69 M136 31 L64 69" />
        <path clipPath={`url(#${id}l)`} d="M57 70 L57 180 M12 100 L102 148" />
        <path clipPath={`url(#${id}r)`} d="M143 70 L143 180 M98 148 L188 100" />
      </g>
      <g fill="none" className="stroke-sun" strokeWidth="7" strokeLinecap="round">
        <ellipse cx="85" cy="38" rx="16" ry="9" transform="rotate(22 85 38)" />
        <ellipse cx="115" cy="38" rx="16" ry="9" transform="rotate(-22 115 38)" />
        {tails && <path d="M96 52 L86 68 M104 52 L114 68" />}
      </g>
      <circle cx="100" cy="48" r="8" className="fill-sun" />
    </svg>
  );
}

/** Logo du thème : le cadeau en saison, sinon l'image d'origine. */
export function SeasonLogo({ fallback, className = '', alt = '', tails = false }: { fallback: string; className?: string; alt?: string; tails?: boolean }) {
  if (ACTIVE_THEME.logo === 'gift') return <LogoGift className={className} label={alt || undefined} tails={tails} />;
  return <img src={fallback} alt={alt} aria-hidden={alt ? undefined : true} className={className} />;
}

/** Bandeau de saison au-dessus de l'en-tête. */
export function SeasonRibbon() {
  if (!ACTIVE_THEME.ribbon) return null;
  return (
    <div className="relative z-[2] flex items-center justify-center gap-2.5 bg-band px-5 py-2.5 text-center text-[13px] font-semibold leading-snug text-on-band sm:text-sm">
      <Star className="h-3.5 w-3.5 flex-none" />
      <span>{ACTIVE_THEME.ribbon}</span>
    </div>
  );
}

/** Guirlande : fine frise aux couleurs du thème. */
export function Garland({ className = '' }: { className?: string }) {
  if (!ACTIVE_THEME.decor) return null;
  return <div aria-hidden="true" className={`garland ${className}`} />;
}
