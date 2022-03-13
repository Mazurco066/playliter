<template>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    :data-target="target"
    :aria-controls="target"
    :aria-expanded="toggled"
    aria-label="Toggle navigation"
  >
    <slot>
      <span></span>
      <span></span>
    </slot>
  </button>
</template>

<script src="./js/toggle.js"></script>
