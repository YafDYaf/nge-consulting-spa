import { Fragment, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/** Mots qui montent un à un quand le bloc entre à l'écran. Le texte complet reste dans le HTML. */
export function RevealWords({ text, className = '', as: Tag = 'h2', delay = 0 }: { text: string; className?: string; as?: 'h1' | 'h2' | 'h3' | 'p'; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.045 }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}

function FillWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-none">
      {word}{' '}
    </motion.span>
  );
}

/** Paragraphe dont les mots s'allument au fil du défilement. */
export function ScrollFillText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <FillWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

/** Bande pleine largeur avec photo en parallaxe et voile coloré : le texte se pose directement sur l'image. */
export function ParallaxBand({
  src,
  alt,
  children,
  veil = 'bg-navy/75',
  className = '',
}: {
  src: string;
  alt: string;
  children: ReactNode;
  veil?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%']);
  return (
    <section ref={ref} className={`relative isolate overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y }}
        className="absolute inset-x-0 -top-[15%] -z-20 h-[130%] w-full object-cover"
      />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${veil}`} />
      {children}
    </section>
  );
}

/** Ligne d'index : numéro, titre, résumé. Un aplat balaie la ligne au survol. */
export function IndexRow({
  to,
  index,
  title,
  text,
  tone = 'dark',
  onClick,
}: {
  to?: string;
  index?: string;
  title: string;
  text?: string;
  tone?: 'dark' | 'light';
  onClick?: () => void;
}) {
  const line = tone === 'dark' ? 'border-navy-line' : 'border-[#C9D9E6]';
  const sweep = tone === 'dark' ? 'before:bg-sun' : 'before:bg-navy';
  const hoverText = tone === 'dark' ? 'group-hover:text-navy' : 'group-hover:text-white';
  const sub = tone === 'dark' ? 'text-mist' : 'text-ink';
  const inner = (
    <>
      {index && <span className={`text-[15px] font-bold tabular-nums opacity-70 transition-colors duration-500 ${hoverText}`}>{index}</span>}
      <span className={`text-[clamp(21px,2.3vw,33px)] font-extrabold leading-[1.05] tracking-[-0.03em] transition-[color,transform] duration-500 ease-out group-hover:translate-x-3 ${text ? '' : 'md:col-span-2'} ${hoverText}`}>
        {title}
      </span>
      {text && <span className={`max-w-[440px] text-[15px] max-md:col-span-3 max-md:row-start-2 transition-colors duration-500 ${sub} ${hoverText}`}>{text}</span>}
      <ArrowUpRight aria-hidden="true" size={22} className={`justify-self-end transition-[transform,color] duration-500 group-hover:rotate-45 ${hoverText}`} />
    </>
  );
  const cls = `group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-2 border-b ${line} py-[clamp(17px,2.1vw,26px)] no-underline before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:ease-out hover:before:scale-y-100 ${sweep} md:grid-cols-[52px_1.1fr_1fr_auto] [&>*]:px-[clamp(8px,1.5vw,20px)]`;
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${cls} w-full border-x-0 border-t-0 bg-transparent text-left text-inherit`}>
        {inner}
      </button>
    );
  }
  return (
    <Link to={to ?? '#'} className={`${cls} text-inherit`}>
      {inner}
    </Link>
  );
}

/** Nombre géant en contour (texte creux). */
export function OutlineNumber({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`outline-text font-heavy leading-none tracking-tightest ${className}`}>{children}</span>;
}
