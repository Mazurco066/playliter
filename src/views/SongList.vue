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
            <pre
              id="lyrics"
              class="tranposer"
              :data-key="displaySong.tone"
              v-if="!showLoading"
            >
              {{ displaySong.body }}
            </pre>
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

    <!-- Print list -->
    <div v-if="!showLoading" class="songs d-none report-print">

      <!-- PDF Preview -->
      <div id="pdf-preview">
        <div class="info">
          <h3 class="title">{{ show.title }}</h3>
          <p class="description">{{ show.description }}</p>
          <span class="text-muted">Documento gerado pelo app <strong>Playliter</strong> no dia {{ $text.formatISODate(new Date().toISOString()) }}</span>
        </div>
        <div class="pagebreak"></div>
      </div>

      <!-- Songs -->
      <div class="song bg-white" v-for="(song, i) in show.songs" :key="i">
        <pre
          class="tranposer bg-white"
          :data-key="song.tone"
          v-if="!showLoading"
        >
<!-- The lack of identation is desired unfortunatly -->
<p>
<span class="title">{{ song.title }}</span>
{{ song.writter }}
Tom: {{song.tone}}
{{ song.body }}
</p>
        </pre>
        <div class="pagebreak"></div>
      </div>
      
    </div>

  </div>
</template>

<script src="./js/songList.js"></script>
