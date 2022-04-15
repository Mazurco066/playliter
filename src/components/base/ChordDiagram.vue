<template>
  <component
    :is="as"
    :id="`chord-${name}`"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    v-html="diagram"
  />
</template>

<script src="./js/chordDiagram.js"></script>
