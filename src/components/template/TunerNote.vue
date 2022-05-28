<template>
  <div :class="'note ' + (active ? 'text-primary' : '')" @click="select">
    {{ name[0] }}
    <span class="name">{{ name[1] || '' }}</span>
    <span class="octave">{{ octave }}</span>
  </div>
</template>

<script src="./js/tunerNote.js"></script>
