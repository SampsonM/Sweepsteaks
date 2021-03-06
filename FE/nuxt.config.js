module.exports = {
  mode: 'spa',
  target: 'static',
  debug: true,
  /**
   * https://nuxtjs.org/api/configuration-env/
   */
  env: {
    cookieDomain: process.env.NODE_ENV === 'production' 
      ? 'sweepsteaks.co.uk'
      : 'localhost'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  styleResources: {
    scss: [
      './assets/styles/_vars.scss',
      './assets/styles/_mixins.scss',
      './assets/styles/_animations.scss'
    ]
  },
  /*
   ** Global CSS
   */
  css: [],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/cookies'
    },
    {
      src: '~/plugins/fontAwesome'
    },
    {
      src: '~/plugins/api/index'
    },
    {
      src: '~/plugins/vuelidate'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/composition-api'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://api.sweepsteaks.co.uk/api'
        : 'https://localhost:3000/api',
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    },
    credentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    // https://nuxtjs.org/api/configuration-build#transpile
    // transpile: [
    // ],
    /*
     ** You can extend webpack config here
     */
    extend ( config, ctx) {
    }
  },
  /*
   ** PWA config
  */
  pwa: {
    manifest: {
      name: 'Sweepsteaks',
      short_name: 'Sweepsteaks',
      icons: [
        {
          src: './img/icons/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          src: './img/icons/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        }
      ],
      display: 'standalone',
      background_color: '#4554DD',
      theme_color: '#ffbf00'
    }
  }
}

