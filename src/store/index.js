import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import appConfig from './app-config'
import breadcrumbs from './breadcrumbs'
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import verticalMenu from './vertical-menu'

// Modules

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
    breadcrumbs,
  },
  strict: process.env.DEV,
})
