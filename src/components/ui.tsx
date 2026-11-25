import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Camera } from 'lucide-react';

/** Bouton pilule avec pastille fléchée qui pivote au survol (signature du design). */
export function ArrowButton({
  children,
  tone = 'sun',
  size = 'lg',
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'sun' | 'navy'; size?: 'md' | 'lg' }) {
  const base = tone === 'sun' ? 'bg-sun text-on-sun' : 'bg-navy text-white';
  const dot = tone === 'sun' ? 'bg-navy text-sun' : 'bg-sun text-on-sun';
  const dims = size === 'lg' ? 'min-h-[52px] pl-[22px] pr-[6px] text-[15px]' : 'min-h-12 pl-5 pr-[5px] text-sm';
  const dotDims = size === 'lg' ? 'h-10 w-10' : 'h-[38px] w-[38px]';
  return (
    <button
      type="button"
      className={`arrow-btn inline-flex items-center gap-3.5 rounded-full border-0 font-bold ${base} ${dims} ${className}`}
      {...rest}
    >
      {children}
      <span className={`arrow flex items-center justify-center rounded-full ${dot} ${dotDims}`}>
        <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2.4} />
      </span>
    </button>
  );
}

export function GhostLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-[58px] items-center gap-2.5 rounded-full border-[1.5px] border-navy-edge px-6 text-base font-semibold text-white no-underline transition-colors hover:border-white ${className}`}
    >
      {children}
    </Link>
  );
}

/** Titre de page en deux lignes : la première grasse, la seconde fine et claire. */
export function SplitTitle({ strong, light, className = '' }: { strong: string; light: string; className?: string }) {
  return (
    <h1 className={`m-0 leading-[0.98] tracking-[-0.04em] ${className}`}>
      <span className="line-mask">
        <span className="font-heavy">{strong}</span>
      </span>{' '}
      <span className="line-mask">
        <span className="font-light text-mist-2">{light}</span>
      </span>
    </h1>
  );
}

export function CheckItem({ children, color = 'text-royal' }: { children: ReactNode; color?: string }) {
  return (
    <li className="flex items-start gap-3 text-base">
      <Check aria-hidden="true" size={18} strokeWidth={2.4} className={`mt-1 flex-none ${color}`} />
      <span>{children}</span>
    </li>
  );
}

/** Pilule de choix (aria-pressed) utilisée dans les formulaires et filtres. */
export function Pill({
  pressed,
  onClick,
  children,
  variant = 'light',
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
  variant?: 'light' | 'dark';
}) {
  const cls =
    variant === 'light'
      ? pressed
        ? 'border-navy bg-navy text-white'
        : 'border-field bg-white text-navy hover:border-navy'
      : pressed
        ? 'border-sun bg-sun text-on-sun'
        : 'border-navy-edge bg-transparent text-white hover:border-white';
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`swap min-h-[46px] rounded-full border-[1.5px] px-[18px] text-[15px] font-bold ${cls}`}
    >
      {children}
    </button>
  );
}

/** Image de remplacement quand une photo réelle doit être fournie par le cabinet. */
export function PhotoPlaceholder({ title, note, className = '' }: { title: string; note: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 p-6 text-center ${className}`}>
      <Camera aria-hidden="true" size={34} strokeWidth={1.5} />
      <span className="text-[15px] font-bold">{title}</span>
      <span className="max-w-[320px] text-sm">{note}</span>
    </div>
  );
}
