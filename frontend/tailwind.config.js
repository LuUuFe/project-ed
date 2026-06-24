/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d0d12',
        surface: '#181820',
        border: '#2a2a35',
        accent: '#f0c040',
        success: '#4cd964',
        danger: '#ff6b6b',
        'orange-100': '#ffd9b3',
        'green-100': '#b8f0c0',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.4)',
        glow: '0 0 30px rgba(240,192,64,0.15)',
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out',
        popIn: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
}