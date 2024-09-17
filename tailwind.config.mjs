/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#00a896",
          accent: "#c70039",
        },
      },
      {
        black: {
          ...require("daisyui/src/theming/themes")["black"],
          primary: "#00a896",
          accent: "#c70039",
          warning: '#ffbe00',
          error: '#ff5861',
          info: '#00b6ff',
          success: '#00a96e'
        },
      }
    ],
  },
  darkMode: ['class', '[data-theme="black"]']
}
