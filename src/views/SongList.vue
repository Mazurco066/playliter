<template>
  <div id="playlist">

    <!-- Song switcher -->
    <div class="container no-print">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <!-- Title -->
          <p v-if="!showLoading" class="title mb-0">
            {{ displaySong.title }}
          </p>
          <div v-else class="shine"></div>
          <!-- Writter -->
          <p v-if="!showLoading" class="mb-3">
            {{ displaySong.writter }}
          </p>
          <div v-else class="shine"></div>
          <hr class="mb-1" />
        </div>
        <div class="col-12">
          <div v-if="!showLoading" class="playlist-actions">
            <div class="action" @click="switchSong(-1)">
              <div class="icon-bg">
                <font-awesome-icon icon="angle-double-left" />
              </div>
              <p class="mb-0">
                <small>{{ $t('songList.previous') }}</small>
              </p>
            </div>
            <div class="action" @click="downloadReport()">
              <div class="icon-bg">
                <font-awesome-icon icon="print" />
              </div>
              <p class="mb-0">
                <small>{{ $t('songList.print') }}</small>
              </p>
            </div>
            <div class="action" @click="switchSong(1)">
              <div class="icon-bg">
                <font-awesome-icon icon="angle-double-right" />
              </div>
              <p class="mb-0">
                <small>{{ $t('songList.next') }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <base-songsheet
        @toneUpdated="updateTone"
        :loading="showLoading"
        :song="displaySong"
      />
    </div>

    <!--- Song print section -->
    <div v-if="!showLoading" class="songs d-none report-print"> <!-- d-none report-print -->
      <div id="pdf-preview">
        <div class="info">
          <h3 class="title">{{ show.title }}</h3>
          <p class="description">{{ show.description }}</p>
          <span class="text-muted">
            {{ $t('songList.credits') }} {{ $text.formatISODate(new Date().toISOString()) }}
          </span>
        </div>
        <div class="pagebreak"></div>
      </div>
      <div
        class="song bg-white pdf-song shongsheet"
        v-for="(song, i) in parsedSongs"
        :key="i"
      >
        <!-- Song metadata -->
        <div class="col-12" v-if="song.title">
          <h1 class="text-xl my-1">
            {{ song.title }}
          </h1>
        </div>
        <div class="col-12" v-if="song.artist">
          <div class="my-1">
            <span class="opacity-40">by</span> {{ song.artist }}
          </div>
        </div>
        <div class="col-12" v-if="song.capo">
          <div  class="capo my-4">
            Capo {{ song.capo }}
          </div>
        </div>
        <!-- Song body -->
        <div class="song-section">
          <div ref="output" class="chord-sheet">
            <div
              v-for="({ type, lines }, i) in song.paragraphs"
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
        <div class="pagebreak"></div>
      </div>
    </div>

  </div>
</template>

<script src="./js/songList.js"></script>
