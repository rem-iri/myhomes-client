const { guessProductionMode } = require('@ngneat/tailwind');
const colors = require('tailwindcss/colors');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  mode: 'jit',
  important: ':root', // or true
  prefix: '',
  important: true,
  purge: {
    // enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1440px'
    },
    colors: {
      primary: '#58B57D',
      accent: '#EE5E36',
      warn: '#FDE300',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.amber,
      orange: '#F29F05',
    },
    textShadow: {
      default: '0 10px 10px rgba(0, 0, 0, 0.5)',}
  },
  variants: {
    extend: { }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
