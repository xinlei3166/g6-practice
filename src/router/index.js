import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/g6',
    name: 'g6',
    component: () => import(/* webpackChunkName: "g6" */ '../views/g6/G6.vue')
  },
  {
    path: '/g6-practice',
    name: 'g6-practice',
    component: () => import(/* webpackChunkName: "g6" */ '../views/g6/Practice.vue')
  },
  {
    path: '/g',
    name: 'g',
    component: () => import(/* webpackChunkName: "g6" */ '../views/g/G.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
