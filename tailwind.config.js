/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neonCyan: '#00f2fe',
        neonPurple: '#4facfe',
        neonPink: '#ff007f',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 242, 254, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}