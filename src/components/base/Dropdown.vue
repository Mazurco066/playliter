<template>
  <component
    class="dropdown"
    :is="tag"
    :class="[
        { show: isOpen },
        { dropdown: direction === 'down' },
        { dropup: direction === 'up' },
      ]"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot name="title">
      <a
        class="dropdown-toggle nav-link"
        :class="{ 'no-caret': hideArrow }"
        data-toggle="dropdown"
      >
        <font-awesome-icon :icon="icon" />
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul
      class="dropdown-menu"
      ref="menu"
      :class="[
          { 'dropdown-menu-right': position === 'right' },
          { show: isOpen },
          menuClasses,
        ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>

<script src="./js/dropdown.js"></script>
