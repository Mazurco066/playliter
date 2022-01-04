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
export default {
  name: 'auth-layout',
  data: () => ({
    showSplash: false,
    startSplash: false,
    startAnimation: false,
    closeSplash: false
  }),
  mounted () {
    // Splashscreen events
    this.showSplash = true
    setTimeout(() => { this.startSplash = true }, 300)
    setTimeout(() => { this.startAnimation = true }, 1900)
    setTimeout(() => { this.closeSplash = true }, 2800)
    setTimeout(() => { this.showSplash = false }, 3200)
  }
}
</script>
