<template>
  <div id="playlist" :class="{'disable-print-padding': doubleCol}">
    <!-- Song switcher -->
    <div class="container no-print">
      <div class="row">
        <div class="col-12">
          <div v-if="!showLoading" class="show-navigator">
            <div class="action" @click="switchSong(-1)">
              <div class="icon-bg">
                <font-awesome-icon icon="angle-double-left" />
              </div>
              <p class="mb-0">
                <small>{{ $t('songList.previous') }}</small>
              </p>
            </div>
            <div class="action">
              <div class="icon-bg">
                <base-dropdown class="dropdown" position="right">
                  <template v-slot:title>
                    <a
                      class="btn btn-sm btn-icon-only"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <font-awesome-icon icon="print" />
                      <p class="mb-0">
                        <small>{{ $t('songList.print') }}</small>
                      </p>
                    </a>
                  </template>
                  <a href="#" class="dropdown-item" @click.prevent="downloadReport()">
                    <font-awesome-icon icon="file-pdf" class="mr-1" /> {{ $t('songList.print-normal') }}
                  </a>
                  <a href="#" class="dropdown-item" @click.prevent="downloadReport(true)">
                    <font-awesome-icon icon="file-pdf" class="mr-1" /> {{ $t('songList.print-col') }}
                  </a>
                </base-dropdown>
              </div>
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
    <!--- Song print section (Default) -->
    <div v-if="!showLoading && !doubleCol" class="songs d-none report-print"> <!-- d-none report-print -->
      <!-- PDF Preview page background content -->
      <div>
        <p>Sample</p>
        <div class="pagebreak"></div>
      </div>
      <!-- PDF Preview page main content -->
      <div id="pdf-preview">
        <div class="svg-container">
          <img src="/img/pdf-prev.svg" alt="PDF Preview">
          <div class="info">
            <h3 class="title">{{ show.title }}</h3>
            <p class="description">{{ show.description }}</p>
            <span class="text-secondary-light">
              <small>{{ $t('songList.credits') }} {{ $text.formatISODate(new Date().toISOString()) }}</small>
            </span>
          </div>
        </div>
        <!-- <div class="pagebreak"></div> -->
      </div>
      <div
        class="song bg-white pdf-song shongsheet m-3"
        v-for="(song, i) in parsedSongs"
        :key="i"
      >
        <div class="row">
          <!-- Song metadata -->
          <div class="col-12" v-if="song.title">
            <h1 class="song-title text-xl my-1">
              {{ song.title }}
            </h1>
          </div>
          <div class="col-12" v-if="song.artist">
            <div class="my-1">
              <span class="opacity-40">{{ $t('songsheet.by') }}</span> {{ song.artist }}
            </div>
          </div>
          <div class="col-12" v-if="song.capo">
            <div  class="capo my-4">
              {{ $t('songsheet.capo') }} {{ song.capo }}
            </div>
          </div>
          <!-- Song body -->
          <div class="col-12">
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
          </div>
        </div>
        <div class="pagebreak"></div>
      </div>
    </div>
    <!--  Song print section (2 Columns layout) -->
    <div v-if="!showLoading && doubleCol" class="songs d-none report-print double-col">
      <!-- PDF Preview page background content -->
      <div id="pdf-preview" style="col-span: 2">
        <div class="svg-container">
          <img src="/img/pdf-prev.svg" alt="PDF Preview">
          <div class="info">
            <h3 class="title">{{ show.title }}</h3>
            <p class="description">{{ show.description }}</p>
            <span class="text-secondary-light">
              <small>{{ $t('songList.credits') }} {{ $text.formatISODate(new Date().toISOString()) }}</small>
            </span>
          </div>
        </div>
      </div>
      <div>
        <span>fill</span>
        <div class="pagebreak"></div>
      </div>
      <div>
        <span>fill</span>
        <div class="pagebreak"></div>
      </div>
      <!-- Song list -->
      <div
        class="song bg-white pdf-song shongsheet"
        v-for="(song, i) in parsedSongs"
        :key="i"
      >
        <div class="row">
          <!-- Song metadata -->
          <div class="col-12" v-if="song.title">
            <h1 class="song-title text-xl my-1">
              {{ song.title }}
            </h1>
          </div>
          <div class="col-12" v-if="song.artist">
            <div class="my-1 song-artist">
              <span class="opacity-40">{{ $t('songsheet.by') }}</span> {{ song.artist }}
            </div>
          </div>
          <div class="col-12" v-if="song.capo">
            <div  class="capo my-4">
              {{ $t('songsheet.capo') }} {{ song.capo }}
            </div>
          </div>
          <!-- Song body -->
          <div class="col-12">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/songList.js"></script>
