<template>
  <div id="dashboard-layout" class="wrapper" :class="theme">
    <main id="main-body" class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="zoom" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'dashboard-layout'
}
</script>
