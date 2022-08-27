<template>
  <div>
    <Popover class="position-relative inline-block mr-1">
      <PopoverButton as="div" role="button" class="chord">
        {{ name }}
      </PopoverButton>
      <PopoverPanel class="position-absolute floating-chord d-flex flex-column mb-1 p-1 pb-0 rounded text-center shadow">
        <p class="mb-0 text-secondary">{{ name }}</p>
        <svg class="chord-diagram" xmlns="http://www.w3.org/2000/svg" role="image" :title="name">
          <use :xlink:href="`#chord-${name}`" viewBox="0 0 50 65" />
        </svg>
      </PopoverPanel>
    </Popover>
  </div>
</template>

<script src="./js/songsheetChord.js"></script>
