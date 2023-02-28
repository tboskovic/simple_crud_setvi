/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gray-bg': '#F8F9FA',
        'gray-bg-1': '#E9ECEF',
        'gray-dark': '#495057',
        'blue-hover': "#1C7ED6",
      },
    },
  },
  plugins: [],
}
