// Dependencies
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '../layout/AuthLayout.vue'
import DashboardLayout from '../layout/DashboardLayout.vue'

// Pages
import Band from '../views/Band.vue'
import Bands from '../views/Bands.vue'
import Directory from '../views/Directory.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import Song from '../views/Song.vue'
import Songs from '../views/Songs.vue'

// Configured Routes
const routes = [{
  path: '/',
  redirect: 'signin',
  component: AuthLayout,
  children: [{
    path: '/signin',
    name: 'signin',
    component: SignIn
  }]
}, {
  path: '/',
  component: DashboardLayout,
  children: [{
    path: '/home',
    name: 'home',
    component: Home
  }, {
    path: '/profile',
    name: 'profile',
    component: Profile
  }, {
    path: '/bands',
    name: 'bands',
    component: Bands
  }, {
    path: '/band/:id',
    name: 'band',
    component: Band
  }, {
    path: '/songs/:band',
    name: 'songs',
    component: Songs
  }, {
    path: '/directory/:band',
    name: 'directory',
    component: Directory
  }, {
    path: '/song/:band/:id',
    name: 'song',
    component: Song
  }]
}]

// Vue 3 router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

// Exporting configured router
export default router
