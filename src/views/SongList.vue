<template>
  <div id="playlist">

    <!-- Song switcher -->
    <div class="container no-print">
      <div class="row pt-3">
        <div class="col-12">
          <div class="info">
            <p v-if="!showLoading" class="title mb-0">
              {{ displaySong.title }}
            </p>
            <lines v-else class="shine"></lines>
            <span v-if="!showLoading">{{ displaySong.writter }}</span>
            <lines v-else class="shine"></lines>
            <hr v-if="!showLoading" />
            <div v-if="!showLoading" class="actions">
              <div class="action" @click="switchSong(-1)">
                <font-awesome-icon icon="angle-double-left" class="text-info" />
                <p class="mb-0">
                  <small>Anterior</small>
                </p>
              </div>
              <div class="action" @click="downloadReport()">
                <font-awesome-icon icon="print" class="text-white" />
                <p class="mb-0">
                  <small>Exportar PDF</small>
                </p>
              </div>
              <div class="action" @click="switchSong(1)">
                <font-awesome-icon icon="angle-double-right" class="text-info" />
                <p class="mb-0">
                  <small>Próxima</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-3 mb-3">
          <div class="info">
            <div
              v-if="!showLoading"
              v-html="displaySongHtml"
              class="transposer"
            />
            <div v-else>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--- Song print section -->
    <div v-if="!showLoading" class="songs d-none report-print">
      <div id="pdf-preview">
        <div class="info">
          <h3 class="title">{{ show.title }}</h3>
          <p class="description">{{ show.description }}</p>
          <span class="text-muted">Documento gerado pelo app <strong>Playliter</strong> no dia {{ $text.formatISODate(new Date().toISOString()) }}</span>
        </div>
        <div class="pagebreak"></div>
      </div>
      <div class="song bg-white pdf-song" v-for="({ song, html }, i) in parsedSongs" :key="i">
        <div class="song-header">
          <h1 class="title mb-1">{{ song.title }}</h1>
          <p class="writter mb-0">{{ song.writter }}</p>
          <p class="tone">Tom: {{song.tone}}</p>
        </div>
        <div class="transposer" v-html="html" />
        <div class="pagebreak"></div>
      </div>
    </div>

  </div>
</template>

<script src="./js/songList.js"></script>
