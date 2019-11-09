import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Books from '@/components/Books.vue'
import CreateBook from '@/components/CreateBook.vue'
import ImportBooks from '@/components/ImportBooks.vue'
import Home from '@/components/Home.vue'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'ShowBooks',
    path: '/books',
    component: Books,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'AddBook',
    path: '/books/add',
    component: CreateBook,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ImportBooks',
    path: '/books/import',
    component: ImportBooks,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let token = Cookies.get('jwt')
    if (token) {
      return next()
    } else {
      return next({
        path: '/login'
      })
    }
  }
  next()
})

export default router