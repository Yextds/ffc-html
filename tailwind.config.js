/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
      "./partials/**/*.hbs",
      "./templates/**/*.hbs",
      "./src/**/*.js",
      "./src/**/*.ts",
  ],
  theme: {
      container: {
          center: true,
      },
      colors: {
          'transparent': 'transparent',
          'white': '#ffffff',
          'black': '#000000',
          'red': '#d61a0c',
          'blue': '#10106a',
          'light_black': '#252525',
          'footer_bg': '#4d4e53',
          'dark_black': '#3f4044',
          'facebook': '#45619d',
          'light': '#fafafa',
          'green': '#348B31',
          'dark_blue': '#09093e',
          'dark_red': '#bd1508'
      },

      fontFamily: {
          'raleway': ['"Raleway", Georgia, Arial, sans-serif'],
          'bebas_neue': ['"Bebas Neue", Georgia, Arial, sans-serif']
      },
      extend: {
        backgroundImage: {
            'plus': "url('images/plus.svg')",
            'minus': "url('images/minus.svg')",
        }
      },
  },
  plugins: [],
}