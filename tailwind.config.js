/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F05A22',
          'orange-hover': '#E04810',
          'orange-light': '#FF7844',
          umber: '#5C2208',
          'umber-dark': '#3D1504',
          terracotta: '#782E0E',
          cream: '#FFF4EE',
          sand: '#FAECE4'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Caveat"', 'cursive']
      },
      boxShadow: {
        'brand': '0 20px 40px -15px rgba(240, 90, 34, 0.25)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}
