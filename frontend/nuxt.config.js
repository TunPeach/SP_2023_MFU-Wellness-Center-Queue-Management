import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - web',
    title: 'MFU wellness Queue Management',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      //{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/mfu_wellness_logo.png' },
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Kanit&display=swap"}
    ]
  },
  
  target: "static",
  ssr: false,
  server: {
    //port: 80,
    port: 8241,
    host: "0.0.0.0",
    timing: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // "~layouts/global.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
 axios: {
    baseURL: "https://selab.mfu.ac.th:8241",
    proxy: true,
    credentials: true,
  },
  
  proxy: {
    "/qmanagement": {
      target: "http://127.0.0.1:8242/qmanagement",
      changeOrigin: true,
    },
  },
  
  publicPath: "/qmanagement/",

  generate: {
    dir: "dist",
    feedback: true,
    router: {
      base: "/qmanagement/",
    },
  },


  router: {
    middleware: [],
    base: "/qmanagement/",
    mode: "hash",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // dir: 'dist'
  },

  // server: {
  //   host: 'https://selab.mfu.ac.th/qmanagement',
  //   port: 8241 
  // },
}
