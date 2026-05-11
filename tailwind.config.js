/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17231f',
        moss: '#2f5b45',
        sage: '#86a58a',
        pearl: '#f8f5ef',
        shell: '#efe4d1',
        copper: '#b96f43',
        plum: '#65384d',
        rose: '#d9a8a0',
        gold: '#d6a95b',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 22px 70px rgba(23, 35, 31, 0.16)',
        lift: '0 18px 42px rgba(23, 35, 31, 0.18)',
      },
      backgroundImage: {
        'linen-texture':
          'linear-gradient(135deg, rgba(248,245,239,1), rgba(239,228,209,0.78) 48%, rgba(248,245,239,1))',
      },
    },
  },
  plugins: [],
}
