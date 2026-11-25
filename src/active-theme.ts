import { THEMES, isThemeId, DEFAULT_THEME } from './theme';

/** Thème actif, fixé au build par vite.config.ts (VITE_THEME). */
export const ACTIVE_THEME_ID = isThemeId(import.meta.env.VITE_THEME) ? import.meta.env.VITE_THEME : DEFAULT_THEME;
export const ACTIVE_THEME = THEMES[ACTIVE_THEME_ID];
