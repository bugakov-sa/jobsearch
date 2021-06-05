import Vue from 'vue'

import './fontawesome'
import './bootstrap'
import router from './router'
import App from './App.vue'

require('./assets/index.css')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
