import Vue from "vue"
import VueRouter from "vue-router"

import Main from './components/main.vue'
import Login from './components/login.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/main', component: Main },
  { path: '/', component: Login },
]


const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: 'history'
  })

export {
    router
}