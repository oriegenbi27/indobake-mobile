import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue')
  },
  {
    path: '/poin-history',
    name: 'PoinHistory',
    component: () => import(/* webpackChunkName: "poin-history" */ '../views/PoinHistory.vue')
  },
  {
    path: '/submission',
    name: 'Submission',
    component: () => import(/* webpackChunkName: "submission" */ '../views/Submission.vue')
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import(/* webpackChunkName: "services" */ '../views/Services.vue')
  },
  {
    path: '/myproduct',
    name: 'MyProduct',
    component: () => import(/* webpackChunkName: "myproduct" */ '../views/MyProduct.vue')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import(/* webpackChunkName: "info" */ '../views/Info.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
