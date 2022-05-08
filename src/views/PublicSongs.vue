<template>
  <div id="public-songs">
    <div class="container">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <h3 class="title">Repertório público</h3>
          <div v-if="!songLoading">
            <p class="mb-3">Aqui você encontra as músicas disponibilizadas publicamente pelas bandas.</p>
            <base-input
              name="filter"
              placeholder="Pesquisar músicas..."
              v-model="filter"
            />
          </div>
          <div v-else>
            <lines class="shine"></lines>
            <lines class="shine mb-3"></lines>
          </div>
        </div>
      </div>
      <div class="row secondary-section mb-3">
        <div class="col-12">
          <p>imagina algo aqui</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <ul class="songs">
            <li
              class="song"
              v-for="({ id, title, writter, band: { id: bandId } }, i) in songs"
              :key="i"
              @click="navigateTo('song', bandId, id)"
            >
              <div class="content">
                <div class="icon mr-3">
                  <div class="song-img">
                    <img :src="`/img/arts/record.png`" />
                  </div>
                </div>
                <div class="song-info">
                  <p class="mb-0">
                    <strong>{{ title }}</strong>
                  </p>
                  <span>{{ writter }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/publicSongs.js"></script>
