import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV, SITE } from '../site';
import { useRdv } from './rdv-context';
import logo from '../assets/logo-nge.png';

export function Logo({ alt = `Logo ${SITE.name}` }: { alt?: string }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
      <img src={logo} alt={alt} width={29} height={25} className="h-[25px] w-[29px] object-contain" />
    </span>
  );
}

export const Navbar = () => {
  const { openRdv } = useRdv();
  const { pathname } = useLocation();
  // Le menu mobile est lié à la page où il a été ouvert : il se referme de lui-même en changeant de page.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-white/10 bg-navy/90 px-[clamp(20px,5vw,72px)] py-3.5 backdrop-blur-[14px]">
      <Link to="/" className="flex items-center gap-3 text-white no-underline" aria-label={`${SITE.name}, accueil`}>
        <Logo alt="" />
        <span className="text-[19px] font-extrabold tracking-[-0.01em]">{SITE.name}</span>
      </Link>

      <nav aria-label="Navigation principale" className="hidden flex-wrap items-center gap-x-7 text-[15px] font-medium min-[901px]:flex">
        {NAV.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `py-2.5 no-underline transition-colors ${isActive ? 'border-b-2 border-sun text-white' : 'border-b-2 border-transparent text-mist hover:text-white'}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-navy-edge bg-transparent text-white min-[901px]:hidden"
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
        <button
          type="button"
          onClick={openRdv}
          aria-label="Prendre rendez-vous"
          className="arrow-btn inline-flex min-h-12 items-center gap-3 rounded-full border-0 bg-sun pl-5 pr-[5px] text-[15px] font-bold text-navy max-[520px]:pl-[5px]"
        >
          <span className="max-[520px]:hidden">Prendre rendez-vous</span>
          <span className="arrow flex h-[38px] w-[38px] items-center justify-center rounded-full bg-navy text-sun">
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.4} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-[1_1_100%] flex-col overflow-hidden border-t border-navy-line text-xl font-bold min-[901px]:hidden"
          >
            {[{ to: '/', label: 'Accueil' }, ...NAV].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={({ isActive }) => `py-3 no-underline ${isActive ? 'text-sun' : 'text-white'}`}
              >
                {l.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
