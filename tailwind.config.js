module.exports = {
  content: ["./app/**/*.{html,ejs}"],
  theme: {
    screens: {
      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1790px",
      // => @media (min-width: 1790px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        xl: "171px",
      },
    },
    extend: {
      colors: {
        primary: "#215F78",
        secondary: "#E99170",
        secondary02: "#F2EFEF",
        gray01: "#5C5C5C",
        gray02: "#8B8B8B",
        gray03: "#ADACAD",
      },
      backgroundImage: {
        "banner-bg": "url('/assets/images/banner-bg.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
