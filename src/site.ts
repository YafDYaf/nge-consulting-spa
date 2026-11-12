// Informations du cabinet, réutilisées par les pages, le pied de page et les données structurées.
// [À confirmer] : le nom de domaine définitif. Il se règle aussi via VITE_SITE_URL au build.
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://www.ngeconsulting.ga';

export const SITE = {
  name: 'N.G.E Consulting',
  legalName: 'N.G.E Consulting',
  tagline: 'Votre partenaire pour une gestion sereine.',
  phone: '+241 11 76 29 55',
  phoneHref: 'tel:+24111762955',
  email: 'ngeconsulting.gabon@gmail.com',
  address: {
    postal: 'BP 13149',
    locality: 'Libreville',
    district: 'Nombakélé',
    country: 'GA',
    full: 'BP 13149, Nombakélé, Libreville',
  },
  // Les fiches sociales ne sont pas connues : laisser vide plutôt qu'inventer.
  sameAs: [] as string[],
};

export const NAV = [
  { to: '/expertises', label: 'Nos expertises' },
  { to: '/cabinet', label: 'Le cabinet' },
  { to: '/vos-besoins', label: 'Vos besoins' },
  { to: '/ressources', label: 'Ressources' },
  { to: '/contact', label: 'Contact' },
] as const;
