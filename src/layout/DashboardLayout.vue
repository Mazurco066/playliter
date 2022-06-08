<template>
  <div id="dashboard-layout" class="wrapper">
    <app-bar
      v-if="showHeader"
    />
    <main id="main-body" class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="zoom" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <bottom-navigation
      v-if="showBottom"
    />
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
    }),
    showHeader () {
      return !this.$route.meta.hideHeader
    },
    showBottom () {
      return !this.$route.meta.hideBottom
    }
  },
  methods: {
    ...mapActions({
      loadMe: 'account/loadMe',
      resetStore: 'RESET'
    })
  },
  async mounted () {
    const r = await this.loadMe()
    if (r.error) {
      if (r.message.includes('Unauthorized')) {
        // Reset store and logoff
        this.resetStore()
        this.$router.push({ name: 'signin' })
      } else {
        this.$toast.error('Não foi possível obter a conta autenticada. Por favor tente novamente mais tarde!')
      }
    }
  }
}
</script>
