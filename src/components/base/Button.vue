<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    class="base-button btn"
    :class="classes"
  >
    <span class="btn-inner--icon" v-if="$slots.icon || (icon && $slots.default)">
      <slot name="icon">
        <font-awesome-icon class="mr-2" :icon="icon" />
      </slot>
    </span>
    <font-awesome-icon v-if="!$slots.default" :icon="icon" />
    <span class="btn-inner--text" v-if="$slots.icon || (icon && $slots.default)">
      <slot> {{ text }} </slot>
    </span>
    <slot v-if="!$slots.icon && !icon"></slot>
  </component>
</template>

<script src="./js/button.js"></script>
