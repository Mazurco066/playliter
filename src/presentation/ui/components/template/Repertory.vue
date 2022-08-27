<template>
  <div id="directory">
    <!-- Main container --->
    <div class="row">
      <div class="col-12">
        <div v-if="!songLoading">
          <h3 class="title">{{ $t('directory.title') }}</h3>
          <p class="mb-2">
            {{ $t("directory.subtitle01") }}
            <strong class="text-secondary-light">
              {{ total }}
            </strong>
            {{ $t("directory.subtitle02") }}
          </p>
        </div>
        <div v-else class="shine"></div>
      </div>
      <div v-if="!songLoading" class="col-10">
        <base-input
          name="search"
          :placeholder="$t('directory.searchField')"
          addonLeftIcon="search"
          v-model="search"
          @keydown.enter="filterSongs()"
          noMargin
        />
      </div>
      <div v-if="!songLoading" class="col-2 pl-0">
        <base-button
          class="search-btn"
          @click="filterSongs()"
          :disabled="songLoading"
          type="primary"
        >
          <font-awesome-icon icon="search" />
        </base-button>
      </div>
    </div>
    <div class="row mb-3 pt-2">
      <div class="col-12">
        <base-button
          v-if="search && !songLoading"
          :mini="true"
          icon="times"
          nativeType="button"
          type="danger"
          @click="filterSongs(true)"
        >
        </base-button>
        <base-button
          :mini="true"
          icon="earth-americas"
          nativeType="button"
          type="primary"
          @click="publicSongs()"
        >
          {{ $t("directory.publicAction") }}
        </base-button>
        <base-button
          :mini="true"
          icon="plus"
          nativeType="button"
          type="primary"
          @click="saveSong()"
        >
          {{ $t("directory.songAction") }}
        </base-button>
      </div>
    </div>
    <div class="row">
      <!-- Lista do repertório -->
      <div class="col-12">
        <div>
         <!-- Songs list -->
          <ul
            v-if="repertory.length > 0"
            :class="{'loading' : songLoading}"
            class="songs"
          >
            <li
              v-for="({ id, title, writter, band: { id: bandId }, category: { title: categoryTitle } }, i) in repertory"
              :key="i"
              @click="navigateTo('song', bandId, id)"
              class="song"
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
              <div class="category">
                {{ categoryTitle }}
              </div>
            </li>
          </ul>
          <!-- No data -->
          <div v-else class="no-directory" :class="{'d-none': songLoading}">
            <div class="icon">
              <img src="/img/arts/not_found.svg" alt="No content" />
            </div>
            <p class="mb-3 text-center">
              <strong>
                {{ $t("directory.noSongs") }}
              </strong>
            </p>
          </div>
        </div>
        <div v-if="songLoading && repertory.length === 0">
          <!-- Loading shimmer -->
          <ul class="songs">
            <li class="song">
              <div class="content">
                <div class="icon mr-3">
                  <div class="shine shimmer-photo"></div>
                </div>
                <div class="song-info">
                  <p class="mb-0">
                    <span class="shine shimmer-lines"></span>
                  </p>
                  <div class="shine shimmer-lines"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/repertory.js"></script>
