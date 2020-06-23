
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/iview'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    "cookie-universal-nuxt"
  ],
  proxy:[
    // 'http://localhost:8080/suppliers',
    // 'http://localhost:8079/dropshipping',

    // 'https://testing-incy-platform.automizelyapi.io/suppliers',
    // 'https://testing-incy-product.automizelyapi.io/dropshipping',

    // 'https://release-incy-platform.automizelyapi.io/suppliers',
    // 'https://release-incy-product.automizelyapi.io/dropshipping',
    
    'https://platform.automizelyapi.com/suppliers',
    'https://product.automizelyapi.com/dropshipping',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
