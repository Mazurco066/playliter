<template>
  <div class="progress-wrapper">
    <div
      class="progress-info"
      v-if="$slots.label || label || $slots.percentage || showPercentage"
    >
      <div class="progress-label" v-if="$slots.label || label">
        <span>
          <slot name="label">
            {{ label }}
          </slot>
        </span>
      </div>
      <div
        class="progress-percentage"
        v-if="$slots.percentage || showPercentage"
      >
        <slot name="percentage"> {{ value }} % </slot>
      </div>
    </div>
    <div class="progress" :style="`height: ${height}px`">
      <div
        class="progress-bar"
        :class="computedClasses"
        role="progressbar"
        :aria-valuenow="value"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width: ${value}%;`"
      ></div>
    </div>
  </div>
</template>

<script src="./js/progress.js"></script>
