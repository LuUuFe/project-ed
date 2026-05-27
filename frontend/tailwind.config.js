/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        bg:      '#0e0e10',
        surface: '#18181c',
        border:  '#2a2a32',
        accent:  '#f0c040',
        danger:  '#e05a2b',
        success: '#4ecb71',
      }
    }
  },
  plugins: []
}
