/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 30px 60px rgba(0,62,92,.04)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
