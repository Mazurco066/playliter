<template>
  <div
    class="custom-control custom-radio"
    :class="[inlineClass, { disabled: disabled }]"
  >
    <input
      :id="cbId"
      class="custom-control-input"
      type="radio"
      :disabled="disabled"
      :value="name"
      v-model="model"
    />
    <label :for="cbId" class="custom-control-label">
      <slot></slot>
    </label>
  </div>
</template>

<script src="./js/radio.js"></script>
