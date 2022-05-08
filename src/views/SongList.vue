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
                <small>Anterior</small>
              </p>
            </div>
            <div class="action" @click="downloadReport()">
              <div class="icon-bg">
                <font-awesome-icon icon="print" />
              </div>
              <p class="mb-0">
                <small>Exportar PDF</small>
              </p>
            </div>
            <div class="action" @click="switchSong(1)">
              <div class="icon-bg">
                <font-awesome-icon icon="angle-double-right" />
              </div>
              <p class="mb-0">
                <small>Próxima</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <base-songsheet
        :loading="showLoading"
        :song="displaySong"
      />
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
      <div class="song bg-white pdf-song" v-for="({ html }, i) in parsedSongs" :key="i">
        <div class="transposer" v-html="html" />
        <div class="pagebreak"></div>
      </div>
    </div>

  </div>
</template>

<script src="./js/songList.js"></script>
