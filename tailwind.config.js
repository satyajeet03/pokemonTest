// tailwind.config.js

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      boxShadow: ['hover', 'focus'],
    },
  },
  plugins: [],
};
