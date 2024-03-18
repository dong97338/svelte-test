/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/html/utils/withMT'
export default withMT({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {extend: {}},
  plugins: [require('@tailwindcss/typography')]
})
