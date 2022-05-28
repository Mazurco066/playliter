<template>
  <div id="web-tuner">
    <!-- Tunner components -->
    <canvas ref="frequency-bars" />
    <tuner-meter :cents="note.cents" />
    <div ref="notes" class="text-center">
      <div class="notes-list">
        <tuner-note
          v-for="n in notes"
          :key="n.name"
          :name="n.name"
          :octave="n.octave"
          :frequency="n.frequency"
          :active="note.name == n.name && note.octave == n.octave"
        />
      </div>
      <div class="text-secondary-light">
        {{ note.frequency.toFixed(1) }} <span>Hz</span>
      </div>
    </div>
    <!-- Enable/Disable microphone -->
    <div class="text-center actions">
      <base-button v-if="!active" type="success" @click="start">
        <font-awesome-icon icon="microphone-slash"/>
      </base-button>
      <base-button v-if="active" type="danger" @click="stop">
        <font-awesome-icon icon="microphone"/>
      </base-button>
    </div>
  </div>
</template>

<script src="./js/webTuner.js"></script>
