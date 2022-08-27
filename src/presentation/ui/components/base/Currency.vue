<template>
  <input 
    ref="inputRef"
    type="text"
    :value="formattedValue"
    :class="inputClasses"
    v-bind="$attrs"
  >
</template>

<script src="./js/currency.js"></script>
