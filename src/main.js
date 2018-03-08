// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import App from '@/App'

import store from './store'

Vue.use(BootstrapVue)
Vue.use(VueAnalytics, {
  id: 'UA-115384966-1',
  checkDuplicatedScript: true,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production',
  },
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
