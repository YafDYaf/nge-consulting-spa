import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { RdvModal } from './RdvModal';
import { RdvContext } from './rdv-context';
import { SeasonRibbon } from './season';
import { metaFor } from '../seo';
import { SITE_URL } from '../site';

/** Met à jour title, description et canonical lors de la navigation côté client.
 *  Le HTML prérendu contient déjà ces balises : ceci ne sert qu'aux changements de page dans la SPA. */
function useRouteHead(pathname: string) {
  useEffect(() => {
    const meta = metaFor(pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_URL + (meta.path === '/' ? '/' : meta.path));
  }, [pathname]);
}

/** Remonte en haut à chaque page, ou défile jusqu'à l'ancre (#fiscalite…). */
function useScrollManager(pathname: string, hash: string) {
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export function Layout() {
  const { pathname, hash } = useLocation();
  const [rdv, setRdv] = useState(false);
  const openRdv = useCallback(() => setRdv(true), []);
  const closeRdv = useCallback(() => setRdv(false), []);
  const api = useMemo(() => ({ openRdv }), [openRdv]);

  useRouteHead(pathname);
  useScrollManager(pathname, hash);

  return (
    <RdvContext.Provider value={api}>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:h-auto focus:w-auto focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:font-bold focus:text-on-sun">
        Aller au contenu
      </a>
      <div className="relative overflow-x-clip bg-navy leading-[1.55] text-white">
        <SeasonRibbon />
        <Navbar />
        <main id="contenu">
          <Outlet />
        </main>
        <Footer />
      </div>
      <RdvModal open={rdv} onClose={closeRdv} />
    </RdvContext.Provider>
  );
}
