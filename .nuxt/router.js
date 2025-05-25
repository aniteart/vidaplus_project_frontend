import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4a6dc86a = () => interopDefault(import('..\\pages\\administrador.vue' /* webpackChunkName: "pages/administrador" */))
const _a0c1b074 = () => interopDefault(import('..\\pages\\historicoMedico.vue' /* webpackChunkName: "pages/historicoMedico" */))
const _bddcf258 = () => interopDefault(import('..\\pages\\paciente.vue' /* webpackChunkName: "pages/paciente" */))
const _6e732980 = () => interopDefault(import('..\\pages\\profissionais.vue' /* webpackChunkName: "pages/profissionais" */))
const _14d65643 = () => interopDefault(import('..\\pages\\telemedicina.vue' /* webpackChunkName: "pages/telemedicina" */))
const _21948602 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/administrador",
    component: _4a6dc86a,
    name: "administrador"
  }, {
    path: "/historicoMedico",
    component: _a0c1b074,
    name: "historicoMedico"
  }, {
    path: "/paciente",
    component: _bddcf258,
    name: "paciente"
  }, {
    path: "/profissionais",
    component: _6e732980,
    name: "profissionais"
  }, {
    path: "/telemedicina",
    component: _14d65643,
    name: "telemedicina"
  }, {
    path: "/",
    component: _21948602,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
