<template>
  <div
    :class="'note mx-5 text-6xl font-bold relative inline-block ' + (active ? 'text-green-500' : '')"
    @click="select"
  >
    {{ name[0] }}
    <span class="absolute font-normal note-sharp text-3xl top-0">{{ name[1] || '' }}</span>
    <span class="absolute font-normal text-lg opacity-70 bottom-0">{{ octave }}</span>
  </div>
</template>

<script src="./js/tunerNote.js"></script>
