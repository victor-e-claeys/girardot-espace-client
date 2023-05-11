const formKitTailwind = require('@formkit/themes/tailwindcss');


module.exports = {
  content: [
    "./index.html",
    './src/**/*.{html,js,vue}'
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'gold': '#a98350'
    }
  },
  plugins: [formKitTailwind],
}