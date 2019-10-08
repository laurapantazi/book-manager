import Vue from 'vue'
import App from './App.vue'
import router from  './router/index.js'
import axios from 'axios'
import store from './store'
import 'bootstrap'
import './assets/scss/main.scss'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import components from './components/customElements/index.js'

Vue.prototype.$axios = axios
Vue.prototype.$swal = Swal
Vue.prototype.$store = store
Vue.prototype.$cookie = Cookies

for (name in components) {
    Vue.component(name, components[name])
}

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
