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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'dashboard-layout',
  components: { AppBar, BottomNavigation },
  computed: {
    ...mapGetters({
      me: 'account/getMe'
    })
  },
  methods: {
    ...mapActions({
      loadMe: 'account/loadMe'
    })
  },
  async mounted () {
    await this.loadMe()
    if (!Object.keys(this.me).length) {
      this.$toast.error('Não foi possível obter a conta autenticada. Por favor tente novamente mais tarde!')
      console.log('Logoff here')
    }
  }
}
</script>
