<template>
  <div class="base-slider" :class="{ 'no-margin': noMargin === true }">
    <slot name="label">
      <label
        v-if="label"
        class="form-control-label"
        :class="[
          { 'focused': focused },
          labelClasses
        ]"
      >
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <div
      class="form-group input-wrapper"
      :class="[
          { 'has-danger': error &&  modelValue !== null },
          { focused: focused },
          { 'has-label': label || $slots.label },
          { 'has-success': valid === true &&  modelValue !== null },
          { 'has-danger': valid === false &&  modelValue !== null },
          { 'mb-0': noMargin === true },
          formClasses
        ]"
    >

      <slot>
        <input
          type="range"
          :value="modelValue"
          v-bind="$attrs"
          v-on="listeners"
          class="form-control"
          :class="[
            { 'is-valid': valid === true && modelValue !== null },
            { 'is-invalid': valid === false &&  modelValue !== null },
            inputClasses,
          ]"
          aria-describedby="addon-right addon-left"
        />
      </slot>

      <slot name="infoBlock"></slot>
      
    </div>

    <slot name="helpBlock">
      <div
        class="text-danger invalid-feedback"
        style="display: block"
        :class="{ 'mt-2': hasIcon }"
        v-if="error"
      >
        {{ error }}
      </div>
    </slot>

  </div>
</template>

<script src="./js/slider.js"></script>
