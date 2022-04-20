import './global-components'
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'
import '@/@fake-db/db'
import '@/@fake-db/db'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import { ModalPlugin, ToastPlugin } from 'bootstrap-vue'

import App from './App.vue'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import axios from 'axios'
import i18n from '@/libs/i18n'
import router from './router'
import store from './store'

// Global Components


// 3rd party plugins






// axios.defaults.baseURL = "https://dev.floto.in"
axios.defaults.baseURL = "https://stg.gappubobo.com"

// axios.defaults.timeout = 3000;
// Add a request interceptor
axios.interceptors.request.use( (config)=> {
  const accessToken = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
},error => Promise.reject(error));


// Axios Mock Adapter


// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
