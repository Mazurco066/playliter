<template>
  <div id="shows">
    <div class="row">
      <div class="col-12">
        <div class="show-header">
          <h3 class="title">
            {{ $t("shows.title") }}
          </h3>
          <button type="button" @click="saveShow()">
            <font-awesome-icon class="mr-2" icon="plus" /> {{ $t('shows.addShow') }}
          </button>
        </div>
        <p>{{ $t("shows.subtitle") }}</p>
      </div>
    </div>
    <div class="row pt-2">
      <div class="col-12">
        <div>
          <div v-if="!showLoading">
            <ul v-if="shows.length > 0" class="list">
              <li
                class="item"
                v-for="(s, i) in shows"
                :key="i"
                @click="viewShow(s)"
              >
                <div class="icon mr-3">
                  <div class="show-img">
                    <img :src="`/img/arts/white/concert.svg`" alt="Concert icon" />
                  </div>
                </div>
                <div class="show-info">
                  <p class="mb-0">
                    <strong class="text-secondary-light text-uppercase">
                      {{ s.title }}
                    </strong>
                  </p>
                  <p class="mb-0">{{ s.description }}</p>
                  <span class="show-date">
                    {{ $text.formatISODate(s.date) }}
                  </span>
                </div>
              </li>
            </ul>
            <div v-else class="no-shows">
              <div class="icon">
                <img src="/img/arts/not_found.svg" alt="No content" />
              </div>
              <p class="mb-3 text-center">
                <strong>
                  {{ $t("shows.noShows") }}
                </strong>
              </p>
            </div>
          </div>
          <!-- Shimmer list -->
          <div v-else>
            <ul class="list">
              <li class="item">
                <div class="icon mr-3">
                  <div class="shine shimmer-photo"></div>
                </div>
                <div class="show-info">
                  <span class="shine shimmer-lines"></span>
                  <div class="shine shimmer-lines"></div>
                </div>
                <div class="actions"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/shows.js"></script>
