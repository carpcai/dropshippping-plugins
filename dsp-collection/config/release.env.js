'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"release"',
  VUE_APP_API_URL_SUPPLIER: '"https://release-incy-platform.automizelyapi.io"',
  VUE_APP_API_URL_DROPSHIPPING: '"https://release-incy-product.automizelyapi.io"'
})


