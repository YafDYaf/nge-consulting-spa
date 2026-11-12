import { Link } from 'react-router-dom';
import { NAV, SITE } from '../site';
import { SERVICES } from '../data/content';
import { Logo } from './Navbar';

export const Footer = () => (
  <footer className="bg-navy-900 px-[clamp(20px,5vw,72px)] pb-7 pt-[clamp(48px,6vw,72px)] text-[15px] text-mist-4">
    <div className="mx-auto grid max-w-site grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-9">
      <div className="flex flex-col gap-3.5">
        <Link to="/" className="flex items-center gap-3 text-white no-underline">
          <Logo alt="" />
          <span className="text-[19px] font-extrabold">{SITE.name}</span>
        </Link>
        <span>{SITE.tagline}</span>
      </div>
      <nav aria-label="Pages du site" className="flex flex-col gap-1">
        <span className="pb-1.5 font-extrabold text-white">Le site</span>
        {NAV.map((l) => (
          <Link key={l.to} to={l.to} className="py-1.5 text-mist-4 no-underline hover:text-white">
            {l.label}
          </Link>
        ))}
      </nav>
      <nav aria-label="Nos expertises" className="flex flex-col gap-1">
        <span className="pb-1.5 font-extrabold text-white">Expertises</span>
        {SERVICES.slice(0, 4).map((s) => (
          <Link key={s.id} to={`/expertises#${s.id}`} className="py-1.5 text-mist-4 no-underline hover:text-white">
            {s.short}
          </Link>
        ))}
      </nav>
      <address className="flex flex-col gap-2.5 not-italic">
        <span className="pb-0.5 font-extrabold text-white">Nous joindre</span>
        <a href={SITE.phoneHref} className="text-mist-4 no-underline hover:text-white">{SITE.phone}</a>
        <a href={`mailto:${SITE.email}`} className="break-all text-mist-4 no-underline hover:text-white">{SITE.email}</a>
        <span>{SITE.address.full}</span>
      </address>
    </div>
    <div className="mx-auto mt-12 flex max-w-site flex-wrap justify-between gap-x-8 gap-y-3 border-t border-navy-line pt-6 text-sm">
      <span>© {new Date().getFullYear()} {SITE.name}</span>
      {/* [À créer] : pages Mentions légales, Politique de confidentialité et Cookies. */}
      <span>Libreville, Gabon</span>
    </div>
  </footer>
);
