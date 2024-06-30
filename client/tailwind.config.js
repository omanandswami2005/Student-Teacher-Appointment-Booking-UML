// tailwind.config.js
export default {
  darkMode: 'class', // or 'media' if you prefer automatic dark mode based on user's OS preference
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ],
};
