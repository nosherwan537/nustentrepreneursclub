/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue: '#3E8191',
        customGreen: '#3E9191',
        footerColor: '#314C68',
        'purple': {
          400: '#a346ff',
          500: '#8522e4',
          600: '#6a1cb6',
          700: '#52158d',
          800: '#3b0e66',
          900: '#2a0a4a',
          950: '#10001C',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #1E0034 0%, #10001C 50%, #000000 100%)',
      },
    },
  },
  plugins: [],
};
