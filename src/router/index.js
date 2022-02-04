import { getHomeRouteForLoggedInUser, getUserData, isUserLoggedIn } from '@/auth/utils'

import Vue from 'vue'
import VueRouter from 'vue-router'
import apps from './routes/apps'
import { canNavigate } from '@/libs/acl/routeProtection'
import chartsMaps from './routes/charts-maps'
import dashboard from './routes/dashboard'
import formsTable from './routes/forms-tables'
import missions from './routes/missions'
import movies from './routes/movies'
import others from './routes/others'
import pages from './routes/pages'
import uiElements from './routes/ui-elements/index'

// Routes











Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard-analytics' } },
    ...apps,
    ...dashboard,
    ...pages,
    ...chartsMaps,
    ...formsTable,
    ...uiElements,
    ...others,
    ...missions,
    ...movies,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
