/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#252820',
        olive: '#3f4b2b',
        moss: '#53603b',
        sage: '#8d9877',
        pearl: '#fbf8f1',
        cream: '#f4efe5',
        shell: '#e9dfcf',
        linen: '#fffdf8',
        tan: '#c6a66c',
        clay: '#a96f4c',
        smoke: '#6f7168',
        gold: '#c6a66c',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(63, 75, 43, 0.08)',
        lift: '0 20px 60px rgba(63, 75, 43, 0.12)',
      },
      backgroundImage: {
        'linen-texture':
          'linear-gradient(135deg, rgba(251,248,241,1), rgba(244,239,229,0.84) 48%, rgba(255,253,248,1))',
      },
    },
  },
  plugins: [],
}
