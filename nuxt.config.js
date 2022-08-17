import colors from 'vuetify/es5/util/colors'
import URL from './assets/configurations/BASE_URL'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 10007, // pro
    host: '0.0.0.0', // default: localhost
  },
  head: {
    titleTemplate: '%s  casino',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/logo/chip.png',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.scss',
    '~/assets/font-size.scss',
    '~/assets/data_table_base.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/PersistedState.js', ssr: false },
    {src: '~/plugins/chart.js', mode: 'client'},
    '~/plugins/axios.js',
    '~/plugins/globalComponent.js',
    '~/plugins/APIs.js',
    '~/plugins/ult.js',
    '~/plugins/ultilities.js',
    {
      src: '~/plugins/notification.js',
      ssr: false
    },
    { src: '~/plugins/common.js', ssr: false },
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
    'cookie-universal-nuxt',
  ],

  router: {
    middleware: ['auth'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL:'https://taskman.xtel.vn/workcontrol/api'
    //baseURL: 'http://localhost:8181/api',
    // baseURL: 'http://103.147.35.53:8181/api' ,
    // baseURL: 'http://192.168.10.157:8181',
    baseURL: URL.BASE,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.lightBlue.lighten1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#3ba8e7',
          primary2: '#1d50a3',
          success: '#3ba8e7',
          successNotify: '#4caf50',
          warning: colors.amber.base,
          info: colors.teal.lighten1,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
