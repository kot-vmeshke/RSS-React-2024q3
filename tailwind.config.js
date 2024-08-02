/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'color-text': '#000000',
      'color-bg-dark': '#d9d9d9',
      'color-bg-medium': '#ebebeb',
      'color-bg-light': '#ffffff',
      'dark-color-text': '#ffffff',
      'dark-color-bg-dark': '#5c5c5c',
      'dark-color-bg-medium': '#4d4c4c',
      'dark-color-bg-light': '#1f1f1f',
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
  darkMode: 'selector',
};
