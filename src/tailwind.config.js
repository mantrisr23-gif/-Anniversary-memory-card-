/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: '#F5E9DA',
        cream: '#FFF6EE',
        aged: '#E7D7C3',
        dusty: '#D8C3A5',
        romance: '#D8A7B1',
        nostalgia: '#B08968',
        comfort: '#A8B5A2',
        sadness: '#6D7B8D',
        night: '#2F3A56',
        warmth: '#E6B17E',
        ink: {
          light: '#5C5248',
          DEFAULT: '#4A403A',
          dark: '#3B322C',
        }
      },
    },
  },
