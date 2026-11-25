// Registre des thèmes. Module sans dépendance : il est lu aussi par vite.config.ts.
// Aujourd'hui le thème se choisit au build (VITE_THEME=nge|noel|noel-sapin, « noel-sapin » par défaut sur cette branche).
// Plus tard, l'espace admin n'aura qu'à fournir cet identifiant : couleurs (src/themes.css),
// logo, page d'accueil, décor et bandeau de saison sont tous rattachés ici.

export type ThemeId = 'nge' | 'noel' | 'noel-sapin';

export type Theme = {
  label: string;
  /** Couleur de la barre du navigateur mobile (meta theme-color). */
  themeColor: string;
  /** Période indicative, pour un futur basculement automatique selon la date. */
  period?: string;
  /** Décor de saison : neige, guirlande lumineuse, étoiles (voir components/season.tsx). */
  decor?: 'snow';
  /** Logo de saison : « gift » = le cube NGE noué d'un ruban. */
  logo?: 'gift';
  /** Page d'accueil de saison (pages/HomeNoel.tsx). */
  home?: 'noel';
  /** Bandeau de saison au-dessus de l'en-tête. */
  ribbon?: string;
  /** Sapins « tissu découpé » dans l'accueil de Noël (components/sapins.tsx). */
  trees?: boolean;
};

const NOEL = {
  period: '1er décembre – 6 janvier',
  decor: 'snow',
  logo: 'gift',
  home: 'noel',
  // [À confirmer] : dates et horaires réels de la permanence du cabinet.
  ribbon: 'Pendant les fêtes, le cabinet reste joignable. Permanence du [date] au [date], de [heure] à [heure].',
} as const;

export const THEMES: Record<ThemeId, Theme> = {
  nge: { label: 'Charte N.G.E Consulting', themeColor: '#0E2238' },
  // Bleus de la charte, le jaune remplacé par du rouge.
  noel: { label: 'Noël (bleu et rouge)', themeColor: '#0E2238', ...NOEL },
  // Variante vert sapin et rouge, gardée pour l'espace admin.
  'noel-sapin': { label: 'Noël (sapin et rouge)', themeColor: '#0F2B21', ...NOEL, trees: true },
};

export const DEFAULT_THEME: ThemeId = 'noel-sapin';

export const isThemeId = (v: unknown): v is ThemeId => typeof v === 'string' && v in THEMES;
