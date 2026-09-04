/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brand: { 
          950: '#091413',
          800: '#285A48',
          500: '#408A71',
          200: '#B0E4CC',
        },
        finance: { 
          forest: '#1F4D2C',  
          medium: '#3F8A4D',  
          bright: '#4CAF50',  
          pale: '#EAF3E8',    
          orange: '#D9834A',  
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};