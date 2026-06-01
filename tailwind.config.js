module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#c9a24a',
        gold2: '#b08f3e',
        sitebg: '#080808',
        charcoal: '#0b0b0b'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
