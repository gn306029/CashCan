import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueCookies from 'vue-cookie'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueCookies)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
