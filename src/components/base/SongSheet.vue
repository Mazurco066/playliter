<template>
  <div v-if="!loading" class="shongsheet">

    <!-- Custom slot -->
    <slot></slot>

    <!-- Song chords section -->
    <div v-if="chords.length && showChordList" class="row">
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
        <p class="mb-2 toggler" @click="toggleChordsCollapse()">
          {{ chordsCollapsed ? $t('song.showChords') : $t('song.hideChords') }}
          <font-awesome-icon
            :icon="chordsCollapsed ? 'angle-down' : 'angle-up'"
            class="ml-2"
          />
        </p>
      </div>
      <div class="col-12" v-if="!chordsCollapsed">
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
    </div>


    <!-- Song body -->
    <div class="row">
      <!-- Song metadata -->
      <div class="col-12" v-if="chordsheet.title">
        <h1 class="song-title my-1">
          {{ chordsheet.title }}
        </h1>
      </div>
      <div class="col-12" v-if="chordsheet.artist">
        <div class="song-artist">
          <span>{{ $t('songsheet.by') }}</span> {{ chordsheet.artist }}
        </div>
      </div>
      <div class="col-12" v-if="song.capo">
        <div  class="song-capo">
          {{ $t('songsheet.capo') }} {{ song.capo }}
        </div>
      </div>
      <!-- Song tools -->
      <div v-if="song && song.tone && showToneControl" class="col-12 mb-3">
        <div class="transpose-control">
          <div class="transpose-buttons">
            <button class="tone-btn tone-down">
              <font-awesome-icon icon="arrow-down" @click="toneDown()" />
            </button>
            <select
              v-model="transpose"
              class="tone text-center w-20"
            >
              <option
                v-for="n in transpositions"
                :key="n.step"
                :value="n.step"
              >
                {{ n.name }}
              </option>
            </select>
            <button class="tone-btn tone-up" @click="toneUp()">
              <font-awesome-icon icon="arrow-up" />
            </button>
          </div>
          <div v-if="transpose !== 0 && canUpdateBaseTone" class="transpose-action">
            <button
              type="button"
              :disabled="loading"
              @click="$emit('toneUpdated', chordsheet, transpositions, transpose)"
            >
              {{ $t('songsheet.updateTone') }}
            </button>
          </div>
        </div>
      </div>
      <!-- Song body -->
      <div class="col-12">
        <div class="song-section">
          <div ref="output" class="chord-sheet">
            <div
              v-for="({ type, lines }, i) in chordsheet.paragraphs"
              :key="type + i"
              :class="type + ' paragraph'"
            >
              <template v-for="(line, idx) in lines">
                <div :key="idx" v-if="line.hasRenderableItems()" class="row">
                  <template v-for="(item, idx2) in line.items">
                    <component
                      v-if="item.isRenderable()"
                      :is="componentFor(item)"
                      :item="item"
                      :key="'inner' + idx2"
                    />
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading shimmers -->
  <div v-else class="row">
    <div class="col-12">
      <div>
        <div class="shine shimmer-lines"></div>
        <div class="shine shimmer-lines"></div>
        <div class="shine shimmer-lines"></div>
        <div class="shine shimmer-lines"></div>
        <div class="shine shimmer-lines"></div>
      </div>
    </div>
  </div>

</template>

<script src="./js/songSheet"></script>
