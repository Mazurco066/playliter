<template>
  <div v-if="!loading" class="shongsheet">
    <div v-if="chords.length" class="row secondary-section pt-3">
      <div class="col-12">
        <!-- Hide tag is needed (render this once, cause the svg tag will xlink this) -->
        <svg hidden xmlns="http://www.w3.org/2000/svg">
          <base-chord-diagram
            v-for="chord in chords"
            :key="chord + 'guitar'"
            :name="chord"
            instrument="guitar"
          />
        </svg>
      </div>
      <div class="col-12">
        <div class="chordsbook">
          <!-- Because we are using xlink to render song -->
          <div
            v-for="chord in chords"
            :key="chord + 'display'"
            class="text-center text-sm"
          >
            <div class="chord">
              <span>
                <small>
                  <strong>
                    {{ chord }}
                  </strong>
                </small>
              </span>
            </div>
            <svg
              class="chord-diagram"
              xmlns="http://www.w3.org/2000/svg"
              role="image"
              :title="chord"
            >
              <use :xlink:href="`#chord-${chord}`" viewBox="0 0 50 65" />
            </svg>
          </div>
        </div>
      </div>
      <div class="col-12">
        <p class="text-center text-uppercase">
          Formação dos acordes
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-html="parsedSong" class="song-section" />
      </div>
    </div>
  </div>
  <div v-else class="row">
    <div class="col-12">
      <div>
        <lines class="shine"></lines>
        <lines class="shine"></lines>
        <lines class="shine"></lines>
        <lines class="shine"></lines>
        <lines class="shine"></lines>
      </div>
    </div>
  </div>
</template>

<script src="./js/songSheet"></script>
