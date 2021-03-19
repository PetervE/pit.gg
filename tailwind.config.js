module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["Helvetica", "Arial", "sans-serif"],
        display: ["Oswald", "sans-serif"],
      },
    },
  },
  variants: {
    animation: ["responsive", "motion-safe", "motion-reduce"],
    extend: {
      textOpacity: ["dark"],
    },
  },
  plugins: [],
};
