/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette N.G.E Consulting (design « D2 »)
        navy: {
          DEFAULT: "#0E2238", // fond principal
          800: "#1B3653", // surfaces sur fond nuit
          900: "#0A1A2C", // pied de page
          line: "#22395A", // filets sur fond nuit
          edge: "#4A6684", // contours de boutons
        },
        sun: { DEFAULT: "#FCD116", soft: "#FDE57A", deep: "#C7A400" },
        sky: { DEFAULT: "#01AAF2", soft: "#7FD6FA" },
        royal: "#1C5FA4",
        ice: { DEFAULT: "#E4F1F8", 2: "#D9E6F0", 3: "#C8DCEA", pale: "#F4F8FB" },
        ink: { DEFAULT: "#33475E", muted: "#4D6079" },
        mist: { DEFAULT: "#D3DEEA", 2: "#CFE4F2", 3: "#A9BDD2", 4: "#B6C6D8" },
        field: "#C9D9E6",
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
