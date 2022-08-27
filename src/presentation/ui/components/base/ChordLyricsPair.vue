<template>
  <div class="column">
    <song-sheet-chord :name="item.transposed ? item.transposed.replace(/\s/g, '') : ''" />
    <div class="lyrics">{{ item.lyrics }}</div>
  </div>
</template>

<script src="./js/chordlyricsPair.js"></script>
