import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F2EDE4',
          300: '#E8DFD0',
        },
        ochre: {
          DEFAULT: '#C5A880',
          dark: '#A4865E',
          light: '#DDC7A8',
          accent: '#B89366',
        },
        charcoal: {
          DEFAULT: '#12161F',
          dark: '#0C0F15',
          light: '#1B212D',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', '"Playfair Display"', '"Bodoni MT"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
