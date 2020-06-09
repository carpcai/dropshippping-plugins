'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  VUE_APP_API_URL_SUPPLIER: '"https://testing-incy-platform.automizelyapi.io"',
  VUE_APP_API_URL_DROPSHIPPING: '"https://testing-incy-product.automizelyapi.io"'
})


