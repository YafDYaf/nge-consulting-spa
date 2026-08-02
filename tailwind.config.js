/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Cette ligne est CRUCIALE : elle dit à Tailwind de scanner tous les sous-dossiers de src
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f172a",    // Bleu nuit
          primary: "#3b82f6", // Bleu roi
          light: "#f8fafc"    // Blanc cassé
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Optionnel : pour une police plus propre
      }
    },
  },
  plugins: [],
}