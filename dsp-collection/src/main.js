import Vue from 'vue'
import App from './App'

import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
import _ from 'lodash'



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs;

Vue.prototype._ = _

// axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true

// Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
