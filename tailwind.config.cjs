/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ekis: '#ff2217',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        francois: ['Francois One', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
