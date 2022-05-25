<template>
  <div id="bottomNav" class="bottom-elevation">
    <CurvedBottomNavigation
      foreground-color="#8257e5"
      background-color="#633bbc"
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
