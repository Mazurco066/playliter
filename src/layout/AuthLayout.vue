<template>
  <div id="auth-layout" class="wrapper">
    <!-- Main content -->
    <main>
      <router-view />
    </main>
    <!-- Splashscreen -->
    <div
      v-if="showSplash"
      class="splash"
      :class="{
        'start': startSplash,
        'hide': startAnimation,
        'close': closeSplash
      }"
    >
      <div className="logo">
        <img src="/img/logo.svg" alt="Playliter logo"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'auth-layout',
  data: () => ({
    showSplash: false,
    startSplash: false,
    startAnimation: false,
    closeSplash: false,
    fetchedAccount: false
  }),
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
    // Splashscreen events
    this.showSplash = true
    setTimeout(() => { this.startSplash = true }, 300)
    setTimeout(() => { this.startAnimation = true }, 1900)
    setTimeout(() => { this.closeSplash = true }, 2800)
    setTimeout(() => { this.showSplash = false }, 3200)

    // Verify is if already authenticated
    await this.loadMe()
    this.fetchedAccount = true
  },
  watch: {
    showSplash (value) {
      if (!value && this.fetchedAccount && Object.keys(this.me).length > 0) {
        this.$router.push({ name: 'home' })
      }
    },
    fetchedAccount (value) {
      if (value && !this.showSplash && Object.keys(this.me).length > 0) {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
