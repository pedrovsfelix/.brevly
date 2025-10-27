import { theme as defaultTheme } from 'tailwindcss/defaultConfig';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {

    extend: {

      colors: {
        'primary': {
          DEFAULT: '#2C46B1',
          'dark': '#2C4091',
        },

        'gray': {
          '100': '#F9F9FB',
          '200': '#E4E6EC',
          '300': '#CDCFD5',
          '400': '#74798B',
          '500': '#4D505C',
          '600': '#1F2025',
        },

        'white': '#FFFFFF',
        'danger': '#B12C4D',
      },

      fontSize: {
        'xs': '10px',
        'sm': '12px',
        'md': '14px',
        'lg': '18px',
        'xl': '24px',
      },

      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}