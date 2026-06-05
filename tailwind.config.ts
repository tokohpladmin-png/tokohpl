import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif']
      },
      colors: {
        hpl: {
          paper: '#faf8f5',
          cream: '#f2ede5',
          warm: '#ede8e1',
          ink: '#1a1714',
          muted: '#6b6159',
          line: '#e4ddd4',
          gold: '#a8763e',
          sand: '#d4c9b8',
          50: '#faf8f5',
          100: '#f2ede5',
          200: '#e4ddd4',
          300: '#cec4b6',
          400: '#b5a794',
          500: '#9d8e7c',
          600: '#7d6e5f',
          700: '#5e5149',
          800: '#3e3630',
          900: '#1a1714',
        }
      },
      boxShadow: {
        luxury: '0 32px 96px rgba(26, 23, 20, 0.09)',
        card: '0 4px 24px rgba(26, 23, 20, 0.07)',
        'card-hover': '0 16px 48px rgba(26, 23, 20, 0.12)',
      },
    }
  },
  plugins: []
};

export default config;
