/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        feexaro: {
          navy: '#041f39',
          'navy-dark': '#021426',
          'navy-light': '#0b2e52',
          blue: '#008cf0',
          'blue-hover': '#0075cc',
          'blue-light': '#e5f3fd',
          gray: '#5a6872',
          'gray-light': '#8a99a6',
          surface: '#e9eef2',
          'surface-light': '#f4f7f9',
          border: '#d6e0e7',
        }
      },
      fontFamily: {
        heading: ['"Public Sans"', 'system-ui', 'sans-serif'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '25px',
        'pill': '20px',
      },
      boxShadow: {
        'feexaro': '0 15px 40px -10px rgba(4, 31, 57, 0.08)',
        'feexaro-hover': '0 20px 50px -10px rgba(4, 31, 57, 0.14)',
        'blue-glow': '0 10px 25px -5px rgba(0, 140, 240, 0.3)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
