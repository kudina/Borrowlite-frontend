module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
  "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
],
  theme: {
    fontFamily: {
      primary: 'Playfair Display',
      body: 'Work Sans',
      text: ["Quicksand"],
      subtext: ["Questrial"],
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '3rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      gridTemplateColumns: {
        12: "10rem 1fr",
        13: "0 1fr",
      },
      content: {
        about: 'url("/src/assets/img/outline-text/about.svg")',
        portfolio: 'url("/src/assets/img/outline-text/portfolio.svg")',
        services: 'url("/src/assets/img/outline-text/services.svg")',
        testimonials: 'url("/src/assets/img/outline-text/testimonials.svg")',
        contact: 'url("/src/assets/img/outline-text/contact.svg")',
      },
      colors: {
        primary: '#050402',
        secondary: '#1C1D24',
        tertiary: '#131419',
        herotext: '#450acc',
        cgray: '#86888C',
        danger: '#B70404',
        white:'#FFFFFF',
        orange: "#339900",
        black: "#000000",
        grey: "#FCFCFC",
        deepGrey: "#86888C",
        barGrey: "#F8F8F8",
        textBlack: "#35383F",
        textGrey: "#5D6065",
        blue: "#0AAAAA",

        accent: {
          DEFAULT: '#339900',
          hover: '#925a2b',
        },
        paragraph: '#878e99',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tw-elements/dist/plugin.cjs")
     // ...
  ],
  darkMode: "class"
};
