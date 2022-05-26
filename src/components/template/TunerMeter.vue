<template>
  <div
    class="meter"
    style="position:relative"
  >
    <div
      class="meter-pointer"
      :style="`left: ${left}`"
    />
  </div>
</template>

<script src="./js/tunerMeter.js"></script>

<style>
.meter {
  position: relative;
  height: 25px;
}

.meter-pointer {
  z-index: 20;
  width: 4px;
  height: 20px;
  transform: translate(-50%); /* Center items */
  @apply bg-green-500;
  transition: left 1s;
  position: absolute;
  left: 50%;
}

.meter-scale {
  opacity: 0.5;
  width: 1px;
  margin-left:-0.5px;
  height: 100%;
  box-sizing: border-box;
  border-top: 10px solid;
  position: absolute;
  left: 50%;
}

.meter-scale-strong {
  width: 2px;
  border-top-width: 20px;
}
</style>
