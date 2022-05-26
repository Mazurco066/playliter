<template>
  <div class="p-6 relative cursor-default select-none">
    <canvas
      ref="frequency-bars"
      class="opacity-20 absolute right-0 bottom-0 left-0 h-1/2 w-full z-0"
    />
    <tuner-meter :cents="note.cents" />
    <div
      ref="notes"
      class="text-center"
    >
      <div class="notes-list overflow-y-hidden overflow-x-auto whitespace-nowrap my-2">
        <tuner-note
          v-for="n in notes"
          :key="n.name"
          :name="n.name"
          :octave="n.octave"
          :frequency="n.frequency"
          :active="note.name == n.name && note.octave == n.octave"
        />
      </div>
      <div class="text-gray-500">
        {{ note.frequency.toFixed(1) }} <span>Hz</span>
      </div>
    </div>

    <div class="mt-4 text-center">
      <button
        v-if="!active"
        color="success"
        @click="start"
      >
        <font-awesome-icon icon="microphone-slash"/>
      </button>
      <button
        v-if="active"
        color="danger"
        type="reset"
        @click="stop"
      >
        <font-awesome-icon icon="microphone"/>
      </button>
    </div>
  </div>
</template>

<script src="./js/webTuner.js"></script>

<style>
.notes-list {
  scrollbar-width: none;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  -webkit-mask-image: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0),
    #fff,
    rgba(255, 255, 255, 0)
  );
}

.notes-list::-webkit-scrollbar {
  @apply hidden;
}
</style>
