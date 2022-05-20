<template>
  <div id="bottomNav" class="bottom-elevation">
    <CurvedBottomNavigation
      foreground-color="#940DE7"
      background-color="#1F0066"
      icon-color="#FFFFFF"
      :options="translatedLinks"
      v-model="selected"
      :value="selected"
    >
      <template #icon="{ props }">
        <font-awesome-icon :icon="props.icon" />
      </template>
    </CurvedBottomNavigation>
  </div>
</template>

<script src="./js/bottomNavigation.js"></script>
