import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { DEFAULT_THEME, THEMES, isThemeId } from './src/theme'

// Thème de saison choisi au build : VITE_THEME=nge|noel (voir src/theme.ts et src/themes.css).
const theme = isThemeId(process.env.VITE_THEME) ? process.env.VITE_THEME : DEFAULT_THEME

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  define: { 'import.meta.env.VITE_THEME': JSON.stringify(theme) },
  plugins: [
    react(),
    {
      name: 'nge-theme',
      transformIndexHtml: (html) =>
        html
          .replace('<html lang="fr-GA">', `<html lang="fr-GA" data-theme="${theme}">`)
          .replace(/<meta name="theme-color" content="[^"]*" \/>/, `<meta name="theme-color" content="${THEMES[theme].themeColor}" />`),
    },
  ],
})
