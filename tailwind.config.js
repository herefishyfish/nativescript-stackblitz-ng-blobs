/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{css,xml,html,vue,svelte,ts,tsx}'],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        fleece: '#f1eece',
        fleeceDark: '#8b8171',
        pink: {
          100: '#fbc8cd',
          300: '#f397ab',
        },
        orange: {
          100: '#fad0b0',
          300: '#fdac84',
        },
        yellow: {
          100: '#f8e2a6',
          300: '#fad041',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disables browser-specific resets
  },
};
