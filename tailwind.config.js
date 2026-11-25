/** Couleur thémable : « rgb(var(--c-x) / alpha) » pour garder les modificateurs d'opacité (bg-navy/80…). */
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Couleurs pilotées par des variables CSS (src/themes.css) : chaque thème (NGE, Noël…)
      // redéfinit les mêmes variables. Les noms de jetons restent ceux de la charte NGE :
      // navy = fond sombre, sun = accent principal, sky = accent secondaire, royal = accent profond.
      colors: {
        navy: {
          DEFAULT: c("navy"),
          800: c("navy-800"),
          900: c("navy-900"),
          line: c("navy-line"),
          edge: c("navy-edge"),
        },
        sun: { DEFAULT: c("sun"), soft: c("sun-soft"), deep: c("sun-deep") },
        "on-sun": c("on-sun"), // texte posé sur l'accent principal
        // Grands bandeaux d'appel (calendrier, « Prenons rendez-vous »…)
        band: { DEFAULT: c("band"), line: c("band-line") },
        "on-band": c("on-band"),
        sky: { DEFAULT: c("sky"), soft: c("sky-soft") },
        royal: c("royal"),
        ice: { DEFAULT: c("ice"), 2: c("ice-2"), 3: c("ice-3"), pale: c("ice-pale") },
        ink: { DEFAULT: c("ink"), muted: c("ink-muted") },
        mist: { DEFAULT: c("mist"), 2: c("mist-2"), 3: c("mist-3"), 4: c("mist-4") },
        field: c("field"),
        gold: c("gold"), // touches décoratives de saison
        rule: { DEFAULT: c("rule"), strong: c("rule-strong") }, // filets sur fond clair
      },
      fontFamily: {
        sans: ['"Figtree Variable"', "Figtree", '"Segoe UI"', "Arial", "sans-serif"],
      },
      fontWeight: { heavy: "850" },
      letterSpacing: { tightest: "-0.045em", tighter2: "-0.035em" },
      maxWidth: { site: "1216px", wide: "1280px" },
      borderRadius: { card: "26px", panel: "32px" },
      keyframes: {
        rise: { from: { transform: "translateY(108%)" }, to: { transform: "none" } },
        fade: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        veil: { from: { opacity: "0" }, to: { opacity: "1" } },
        modal: { from: { opacity: "0", transform: "translateY(24px) scale(.98)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        rise: "rise 1s cubic-bezier(.16,1,.3,1) both",
        fade: "fade .9s cubic-bezier(.16,1,.3,1) both",
        marquee: "marquee 60s linear infinite",
        "marquee-fast": "marquee 40s linear infinite",
        veil: "veil .3s ease both",
        modal: "modal .5s cubic-bezier(.16,1,.3,1) both",
      },
      transitionTimingFunction: { out: "cubic-bezier(.16,1,.3,1)" },
    },
  },
  plugins: [],
};
