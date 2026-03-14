/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        beige: { DEFAULT:"#F5F0E8", alt:"#EDE8DF", card:"#FFFFFF", border:"#DDD5C8" },
        blue:  { DEFAULT:"#224c87", dark:"#224c87", light:"#3B82F6", soft:"#EFF6FF", tint:"#DBEAFE" },
        "blue-DEFAULT": "#224c87",
        ink:   { DEFAULT:"#1C1917", mid:"#44403C", light:"#78716C", faint:"#919090" },
        red:   { DEFAULT: "#da3832" },
        grey:  { DEFAULT: "#919090" },
      },
      fontFamily: {
        display: ["'Montserrat'","Arial","Verdana","sans-serif"],
        body:    ["'Montserrat'","Arial","Verdana","sans-serif"],
        mono:    ["'JetBrains Mono'","monospace"],
      },
    },
  },
  plugins: [],
};
