/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#040406',
          900: '#08080c',
          850: '#0c0d12',
          800: '#12131a',
          700: '#1b1d27',
          600: '#262937',
        },
        hot: {
          500: '#ff4400',
          orange: '#ff5500',
          amber: '#ff7700',
          glow: '#ff9933',
        },
        laser: '#00e5ff',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-hot': '0 0 35px -5px rgba(255, 85, 0, 0.35)',
        'glow-hot-lg': '0 0 60px -10px rgba(255, 85, 0, 0.45)',
        'laser-glow': '0 0 25px -5px rgba(0, 229, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
