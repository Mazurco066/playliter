<template>
  <div id="directory">
    <!-- Main container --->
    <div class="row pt-3">
      <div class="col-12">
        <h3 class="title">{{ $t("directory.title") }}</h3>
        <div v-if="!songLoading">
          <p class="mb-3">
            {{ $t("directory.subtitle01") }}
            <strong>{{ repertory.numberOfItems }}</strong>
            {{ $t("directory.subtitle02") }}
          </p>
          <base-input
            name="search"
            :placeholder="$t('directory.searchField')"
            v-model="search"
          />
        </div>
        <div v-else class="shine"></div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <base-button
          nativeType="button"
          type="primary"
          class="mt-3 mb-2"
          @click="navigateToCategories()"
        >
          {{ $t("directory.categoryAction") }}
        </base-button>
        <base-button
          nativeType="button"
          type="secondary"
          class="mb-3"
          @click="saveSong()"
        >
          {{ $t("directory.songAction") }}
        </base-button>
      </div>
    </div>
    <div class="row">
      <!-- Lista do repertório -->
      <div class="col-12">
        <div v-if="!songLoading">
          <!-- Categories list -->
          <ul v-if="filteredRepertorySongs.length > 0" class="categories">
            <li
              v-for="(s, i) in filteredRepertorySongs"
              :key="i"
              class="category"
            >
              <div class="content">
                <p class="text-uppercase mb-0">
                  <strong>{{ s.category.title }}</strong>
                </p>
                <span class="description">
                  {{ s.category.description }}
                </span>
                <div class="counter">
                  {{ s.numberOfItems }} {{ $t("directory.songLabel") }}
                </div>
              </div>
              <ul class="songs">
                <li
                  @click="navigateTo('song', s1.band.id, s1.id)"
                  v-for="(s1, idx) in s.items"
                  :key="idx"
                  class="song"
                >
                  <div class="content">
                    <div class="icon mr-3">
                      <div class="song-img">
                        <img :src="`/img/arts/record.png`" />
                      </div>
                    </div>
                    <div class="song-info">
                      <p class="mb-0">
                        <strong>{{ s1.title }}</strong>
                      </p>
                      <span>{{ s1.writter }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- No data -->
          <div v-else class="no-directory">
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
        <div v-else>
          <!-- Loading shimmer -->
          <ul class="categories">
            <li class="category">
              <div class="content">
                <p class="text-uppercase mb-0">
                  <span class="shine shimmer-lines"></span>
                </p>
                <span class="description">
                  <div class="shine shimmer-lines"></div>
                </span>
              </div>
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/repertory.js"></script>
