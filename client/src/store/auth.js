import router from '@/router'
import { ENDPOINT } from '@/config/index'
import axios from 'axios'
import Cookies from 'js-cookie'

const state = {
  status: '',
  token: Cookies.get('jwt') || '',
  user: {}
}
const getters = {
  isLoggedIn(state) {
    return !!state.token
  }
}
const mutations = {
  auth_request(state) {
    state.status = 'loading'
  },
  auth_success(state, token) {
    state.status = 'success'
    state.token = token
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
  },
  register(state) {
    state.status = ''
    state.token = ''
  }
}
const actions = {
  async login({ commit }, user) {
    commit('auth_request')
    try {
      let { data } = await axios.post(ENDPOINT + 'users/login', user)
      return data
    } catch (error) {
      commit('auth_error')
      return error
    }
  },
  logout({ commit }) {
    commit('logout')
    Cookies.remove('jwt')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  },
  async register({ commit }, user) {
    commit('register')
    try {
      let { data } = await axios.post(ENDPOINT + 'users/register', user)
      router.push('/login')
      return data
    } catch (error) {
      return error
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
