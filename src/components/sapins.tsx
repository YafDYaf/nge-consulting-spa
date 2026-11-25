// Sapins « tissu découpé » : une étoffe rouge fendue et retroussée qui laisse voir un feutre vert.
// L'étoffe est dessinée en SVG ; sous elle, une vraie photo de branches de sapin (Unsplash, voir CREDITS.md).
// Utilisé par le thème « noel-sapin ».
import { useId } from 'react';
import branches from '../assets/photos/sapin-branches.webp';

/** Points d'une étoile à cinq branches. */
function starPoints(cx: number, cy: number, R: number, r: number) {
  return Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    return `${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}

const RED = '#A51B2D';
const RED_DARK = '#6B0F1C';
const RED_LIGHT = '#D23446';
const GREEN = '#2E6B3C';
const GREEN_DARK = '#173F23';
const GOLD = '#E8B84A';

// Rabat gauche : retroussé vers l'extérieur depuis la charnière (le bord du sapin), enroulé en bas.
const FLAP = 'M300,205 C215,285 105,365 38,432 C8,466 12,536 56,558 C88,573 104,552 92,534 L116,540 Z';
const ROLL = 'M38,432 C8,466 12,536 56,558 C34,534 30,480 58,448 Z';

/** Grand sapin : l'étoffe rouge fendue laisse voir un vrai sapin illuminé, par la fente et par l'étoile découpée. */
export function PeelTree({ className = '', slice = false }: { className?: string; slice?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const u = (name: string) => `url(#${id}${name})`;
  const star = starPoints(300, 140, 38, 16);
  const mirror = 'matrix(-1 0 0 1 600 0)';
  // L'étoffe : tout sauf la fente du sapin et l'étoile découpée (règle evenodd).
  const fabric = `M0,0 H600 V550 H490 L300,205 L110,550 H0 Z M${star.replace(/ /g, ' L')} Z`;
  return (
    <svg viewBox="0 0 600 720" preserveAspectRatio={slice ? 'xMidYMin slice' : 'xMidYMid meet'} aria-hidden="true" className={className}>
      <defs>
        <pattern id={`${id}weave`} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill={RED} />
          <circle cx="1.5" cy="1.5" r="1.25" fill="#000" opacity="0.2" />
          <circle cx="4.5" cy="4.5" r="1.25" fill="#fff" opacity="0.06" />
        </pattern>
        <radialGradient id={`${id}felt`} cx="50%" cy="62%" r="62%">
          <stop offset="0" stopColor={GREEN} />
          <stop offset="1" stopColor={GREEN_DARK} />
        </radialGradient>
        <linearGradient id={`${id}flap`} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0" stopColor={RED_DARK} />
          <stop offset="0.45" stopColor={RED} />
          <stop offset="1" stopColor={RED_LIGHT} />
        </linearGradient>
        <filter id={`${id}blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${id}noise`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id={`${id}star`}>
          <polygon points={star} />
        </clipPath>
        <clipPath id={`${id}tree`}>
          <path d="M300,205 L110,550 L0,550 L0,720 L600,720 L600,550 L490,550 Z" />
        </clipPath>
        <clipPath id={`${id}open`}>
          <path d="M300,205 L110,550 L0,550 L0,720 L600,720 L600,550 L490,550 Z" />
          <polygon points={star} />
        </clipPath>
      </defs>

      {/* Sous l'étoffe : le vrai sapin (photo), légèrement teinté pour rester dans le vert */}
      <rect width="600" height="720" fill={u('felt')} />
      <g clipPath={u('open')}>
        <image href={branches} x="0" y="40" width="600" height="700" preserveAspectRatio="xMidYMid slice" />
        <rect width="600" height="720" fill={GREEN_DARK} opacity="0.18" />
      </g>
      <path d={fabric} fillRule="evenodd" fill={u('weave')} />

      {/* Ombre portée par l'étoffe sur le feutre */}
      <g clipPath={u('tree')} opacity="0.55">
        <path d="M300,205 L110,550 L0,550 L0,566 L128,566 L300,232 L472,566 L600,566 L600,550 L490,550 Z" fill="#000" filter={u('blur')} />
      </g>

      {/* Étoile découpée : on voit le sapin, avec une ombre intérieure */}
      <g clipPath={u('star')}>
        <polygon points={star} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="8" transform="translate(2 3)" />
      </g>

      {/* Rabats retroussés, gauche puis droit */}
      {[undefined, mirror].map((t, i) => (
        <g key={i} transform={t}>
          <path d={FLAP} fill="#000" opacity="0.4" transform="translate(-8 10)" filter={u('blur')} />
          <path d={FLAP} fill={u('flap')} />
          <path d={ROLL} fill={RED_DARK} opacity="0.85" />
          <path d="M300,205 C215,285 105,365 38,432" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />
        </g>
      ))}

      {/* Baies et paillettes */}
      {[
        [418, 600, 9],
        [70, 668, 13],
      ].map(([cx, cy, r]) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r={r} fill="#C8202F" />
          <circle cx={cx - r * 0.35} cy={cy - r * 0.35} r={r * 0.3} fill="#fff" opacity="0.55" />
        </g>
      ))}
      {[
        [470, 140, 2.2],
        [520, 230, 1.6],
        [120, 250, 1.8],
        [160, 120, 1.4],
        [440, 330, 1.5],
        [560, 420, 2],
        [40, 380, 1.6],
        [540, 640, 1.8],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={GOLD} className="twinkle" style={{ animationDelay: `${(i * 0.45).toFixed(2)}s`, transformOrigin: `${cx}px ${cy}px` }} />
      ))}

      {/* Grain du tissu */}
      <path d={fabric} fillRule="evenodd" filter={u('noise')} opacity="0.16" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  );
}
