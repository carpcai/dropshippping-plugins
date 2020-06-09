'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_API_URL_SUPPLIER: '""',
  VUE_APP_API_URL_DROPSHIPPING: '""'
})
