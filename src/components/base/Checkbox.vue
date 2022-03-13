<template>
  <div
    class="custom-control custom-checkbox"
    :class="{ disabled: disabled, 'form-check-inline': inline }"
  >
    <input
      :id="cbId"
      class="custom-control-input"
      type="checkbox"
      :disabled="disabled"
      v-model="model"
    />
    <label :for="cbId" class="custom-control-label">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>

<script src="./js/checkbox.js"></script>
