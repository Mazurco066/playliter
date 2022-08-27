<template>
  <div id="public-songs">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3 class="title">{{ $t('publicSongs.title') }}</h3>
          <div v-if="!songLoading">
            <p class="mb-3">{{ $t('publicSongs.subtitle') }}</p>
          </div>
          <div v-else>
            <div class="shine shimmer-lines"></div>
            <div class="shine mb-3"></div>
          </div>
        </div>
      </div>
      <div class="filter-section">
        <div class="row">
          <div class="col-10">
            <base-input
              :label="$t('publicSongs.searchLabel')"
              name="filter"
              :placeholder="$t('publicSongs.searchField')"
              v-model="filter"
              @keydown.enter="filterSongs()"
              :disabled="songLoading"
            />
          </div>
          <div class="col-2 pl-0">
            <base-button
              class="search-btn"
              @click="filterSongs()"
              :disabled="songLoading"
              type="primary"
            >
              <font-awesome-icon icon="search" />
            </base-button>
          </div>
          <div class="col-12">
            <base-button
              @click="filterSongs(true)"
              :disabled="songLoading"
              type="secondary"
            >
              {{ $t('publicSongs.clearAction') }}
            </base-button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>
            <ul v-if="songs.length > 0" :class="{'loading' : songLoading}" class="songs">
              <li
                class="song"
                v-for="({ id, title, writter, band: { id: bandId } }, i) in songs"
                :key="i"
                @click="navigateTo('song', bandId, id)"
              >
                <div class="content">
                  <div class="icon mr-3">
                    <div class="song-img">
                      <img :src="`/img/arts/white/audio-wave.svg`" />
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
            <div v-else class="no-songs">
              <div class="icon">
                <img src="/img/arts/not_found.svg" alt="No content">
              </div>
              <p class="mb-3 text-center">
                <strong>
                  {{ $t('publicSongs.noPublicSongs') }}
                 </strong>
              </p>
            </div>
          </div>
          <ul v-if="songLoading && songs.length === 0" class="songs">
            <li class="song">
              <div class="content">
                <div class="icon mr-3">
                  <div class="song-img">
                    <div class="shine shimmer-photo"></div>
                  </div>
                </div>
                <div class="song-info">
                  <p class="mb-0">
                    <span class="shine shimmer-lines"></span>
                  </p>
                  <span class="shine shimmer-lines"></span>
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
