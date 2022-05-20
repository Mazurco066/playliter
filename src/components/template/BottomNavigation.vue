<template>
  <div id="bottomNav" class="bottom-elevation">
    <CurvedBottomNavigation
      foreground-color="#8E05C2"
      background-color="#3E065F"
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
