<template>
  <div id="dashboard-layout" class="wrapper">
    <app-bar />
    <main id="main-body" class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="zoom" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <bottom-navigation />
  </div>
</template>

<script>
import AppBar from '../components/template/AppBar.vue'
import BottomNavigation from '../components/template/BottomNavigation.vue'

export default {
  name: 'dashboard-layout',
  components: { AppBar, BottomNavigation }
}
</script>
