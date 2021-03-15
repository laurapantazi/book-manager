import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
  },
  {
    name: 'ShowBooks',
    path: '/books',
    component: () =>
      import(/* webpackChunkName: "books" */ '@/views/Books.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'AddBook',
    path: '/books/add',
    component: () =>
      import(/* webpackChunkName: "books" */ '@/views/CreateBook.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'ImportBooks',
    path: '/books/import',
    component: () =>
      import(/* webpackChunkName: "books" */ '@/views/ImportBooks.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let token = Cookies.get('jwt')
    if (token) {
      return next()
    } else {
      return next({
        name: 'Login',
      })
    }
  }
  next()
})

export default router
