// Dependencies
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '../../presentation/ui/_layouts/AuthLayout.vue'
import DashboardLayout from '../../presentation/ui/_layouts/DashboardLayout.vue'

// Pages
import Band from '../../presentation/ui/views/Band.vue'
import Bands from '../../presentation/ui/views/Bands.vue'
import Home from '../../presentation/ui/views/Home.vue'
import Profile from '../../presentation/ui/views/Profile.vue'
import PublicSongs from '../../presentation/ui/views/PublicSongs.vue'
import Show from '../../presentation/ui/views/Show.vue'
import SignIn from '../../presentation/ui/views/SignIn.vue'
import SignUp from '../../presentation/ui/views/SignUp.vue'
import ForgotPassword from '../../presentation/ui/views/ForgotPassword.vue'
import ResetPassword from '../../presentation/ui/views/ResetPassword.vue'
import Song from '../../presentation/ui/views/Song.vue'
import SongList from '../../presentation/ui/views/SongList.vue'
import Tuner from '../../presentation/ui/views/Tuner.vue'
import VerifyAccount from '../../presentation/ui/views/VerifyAccount.vue'

// Forms
import SaveBand from '../../presentation/ui/views/SaveBand.vue'
import SaveSong from '../../presentation/ui/views/SaveSong.vue'
import SaveShow from '../../presentation/ui/views/SaveShow.vue'

// Store
import store from '../store'

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
  }, {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: ForgotPassword
  }, {
    path: '/resetPassword/:id/:token',
    name: 'resetPassword',
    component: ResetPassword
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
    path: '/public-songs',
    name: 'publicSongs',
    component: PublicSongs
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
    component: SongList,
    meta: {
      hideBottom: true
    }
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
  }, {
    path: '/tuner',
    name: 'tuner',
    component: Tuner
  }, {
    path: '/verify',
    name: 'verifyAccount',
    component: VerifyAccount,
    meta: {
      hideHeader: false,
      hideBottom: true
    }
  }, {
    path: '/verify/:code',
    name: 'verifyAccountCode',
    component: VerifyAccount,
    meta: {
      hideHeader: false,
      hideBottom: true
    }
  }]
}]

// Vue 3 router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

// Routes validation
router.beforeEach((to, _, next) => {
  // Retrieve store authentication data
  const currentUser = store['getters']['account/getMe']
  const authentication = store['getters']['authentication/getAuthorization']

  // If user account is not validated force validation
  if (currentUser && authentication) {
    if (
      !['verifyAccount', 'verifyAccountCode'].includes(to.name) &&
      currentUser.isEmailconfirmed &&
      !JSON.parse(currentUser.isEmailconfirmed)
    ) {
      next({ name: 'verifyAccount' })
    } else {
      next()
    }
  } else {
    next()
  }  
})

// Exporting configured router
export default router
