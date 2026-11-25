import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Mail, Menu, Phone, X } from 'lucide-react';
import { NAV, SITE } from '../site';
import { useRdv } from './rdv-context';
import logo from '../assets/logo-nge.png';
import { SeasonLogo } from './season';

export function Logo({ alt = `Logo ${SITE.name}`, size = 'md' }: { alt?: string; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const img = size === 'sm' ? 'h-[21px] w-[24px]' : 'h-[25px] w-[29px]';
  return (
    <span className={`flex flex-none items-center justify-center rounded-full bg-white ${box}`}>
      <SeasonLogo fallback={logo} alt={alt} className={`object-contain ${img}`} />
    </span>
  );
}

// Le menu complet s'affiche à partir de 1180 px ; en dessous, le bouton menu prend le relais.
export const Navbar = () => {
  const { openRdv } = useRdv();
  const { pathname } = useLocation();
  // Le menu est lié à la page où il a été ouvert : il se referme de lui-même en changeant de page.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  // Bloque le défilement de la page et ferme avec Échap quand le menu est ouvert.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 backdrop-blur-[14px]">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[72px] xl:px-[clamp(32px,5vw,72px)]">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 text-white no-underline" aria-label={`${SITE.name}, accueil`}>
          <Logo alt="" size="sm" />
          <span className="truncate text-[17px] font-extrabold tracking-[-0.01em]">{SITE.name}</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-[15px] font-medium min-[1180px]:flex">
          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `border-b-2 py-2 no-underline transition-colors ${isActive ? 'border-sun text-white' : 'border-transparent text-mist hover:text-white'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2">
          <button
            type="button"
            onClick={openRdv}
            className="arrow-btn hidden min-h-11 items-center gap-2.5 rounded-full border-0 bg-sun pl-[18px] pr-1 text-sm font-bold text-on-sun sm:inline-flex"
          >
            Prendre rendez-vous
            <span className="arrow flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sun">
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2.4} />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-navy-edge bg-transparent text-white transition-colors hover:border-white min-[1180px]:hidden"
          >
            {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>
    </header>

      {/* Hors du <header> : son flou (backdrop-filter) confinerait un élément fixe à sa propre hauteur. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-navy px-5 pb-8 pt-4 sm:px-8 lg:top-[72px] min-[1180px]:hidden"
          >
            <nav aria-label="Menu mobile" className="flex flex-col">
              {[{ to: '/', label: 'Accueil' }, ...NAV].map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                  <NavLink
                    to={l.to}
                    end
                    onClick={close}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-navy-line py-4 text-[22px] font-bold no-underline ${isActive ? 'text-sun' : 'text-white'}`
                    }
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden="true" size={18} className="opacity-50" />
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-5 pt-8">
              <button
                type="button"
                onClick={() => {
                  close();
                  openRdv();
                }}
                className="min-h-[52px] w-full rounded-full border-0 bg-sun text-base font-bold text-on-sun"
              >
                Prendre rendez-vous
              </button>
              <div className="flex flex-col gap-2 text-[15px] text-mist">
                <a href={SITE.phoneHref} className="flex items-center gap-2.5 text-mist no-underline">
                  <Phone aria-hidden="true" size={16} /> {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 break-all text-mist no-underline">
                  <Mail aria-hidden="true" size={16} /> {SITE.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
