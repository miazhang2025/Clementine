module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        theme: 'var(--color-theme)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}