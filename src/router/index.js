// Dependencies
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '../layout/AuthLayout.vue'
import DashboardLayout from '../layout/DashboardLayout.vue'

// Pages
import Band from '../views/Band.vue'
import Bands from '../views/Bands.vue'
import Categories from '../views/Categories.vue'
import Directory from '../views/Directory.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Show from '../views/Show.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Song from '../views/Song.vue'
import SongList from '../views/SongList.vue'

// Forms
import SaveBand from '../views/SaveBand.vue'
import SaveSong from '../views/SaveSong.vue'
import SaveShow from '../views/SaveShow.vue'

// Configured Routes
const routes = [{
  path: '/',
  redirect: 'signin',
  component: AuthLayout,
  children: [{
    path: '/signin',
    name: 'signin',
    component: SignIn
  }, {
    path: '/signup',
    name: 'signup',
    component: SignUp
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
    path: '/categories/:band',
    name: 'categories',
    component: Categories
  }, {
    path: '/directory/:band',
    name: 'directory',
    component: Directory
  }, {
    path: '/song/:band/:id',
    name: 'song',
    component: Song
  }, {
    path: '/show/:band/:id',
    name: 'show',
    component: Show
  }, {
    path: '/show/:band/:id/playlist',
    name: 'playlist',
    component: SongList
  }, {
    path: '/save/band',
    name: 'saveBand',
    component: SaveBand
  }, {
    path: '/save/band/:id',
    name: 'editBand',
    component: SaveBand
  }, {
    path: '/save/song/:band',
    name: 'saveSong',
    component: SaveSong
  }, {
    path: '/save/song/:band/:id',
    name: 'editSong',
    component: SaveSong
  }, {
    path: '/save/show/:band',
    name: 'saveShow',
    component: SaveShow
  }, {
    path: '/save/show/:band/:id',
    name: 'editShow',
    component: SaveShow
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
