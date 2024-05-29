/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
      'manz': {
        '50': '#f9fcea',
        '100': '#f0f8c9',
        '200': '#e5f296',
        '300': '#e2ee75',
        '400': '#d9e32c',
        '500': '#d0d31f',
        '600': '#b6ac18',
        '700': '#917f17',
        '800': '#79651a',
        '900': '#67531c',
        '950': '#3c2d0c',
    },
  }
    },
  },
  plugins: [],
}

