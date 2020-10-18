import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {router} from './router'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.prototype.$axios = axios


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
