import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import book from './book'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    book
  }
})
