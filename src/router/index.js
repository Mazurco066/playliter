// Dependencies
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '../layout/AuthLayout.vue'
import DashboardLayout from '../layout/DashboardLayout.vue'

// Pages
import Bands from '../views/Bands.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'

// Configured Routes
const routes = [
  {
    path: '/',
    redirect: 'signin',
    component: AuthLayout,
    children: [
      {
        path: '/signin',
        name: 'signin',
        component: SignIn
      }
    ]
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {
        path: '/bands',
        name: 'bands',
        component: Bands
      }
    ]
  }
]

// Vue 3 router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

// Exporting configured router
export default router
