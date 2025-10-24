/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9E7FFF',
        secondary: '#38bdf8',
        accent: '#f472b6',
        background: '#0F172A',
        surface: '#1E293B',
        'surface-light': '#334155',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(158, 127, 255, 0.5), 0 0 10px rgba(158, 127, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(158, 127, 255, 0.8), 0 0 30px rgba(158, 127, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
