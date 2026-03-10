/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        panel: '#1e293b',
        accent: '#06b6d4'
      }
    }
  },
  plugins: []
};
