<template>
  <div id="show">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div v-if="!showLoading" class="info about">
            <h3 class="title pr-5">{{ show.title }}</h3>
            <p class="mb-2">{{ show.description }}</p>
            <span v-if="show.createdAt">
              {{ $t('show.presentedAt') }} 
              <strong class="text-secondary-light">
                {{ $text.formatISODate(new Date(show.date).toISOString()) }}
              </strong>
            </span>
            <div class="actions">
              <base-dropdown class="ellipsis-vertical" position="right">
                <template v-slot:title>
                  <a
                    class="btn btn-sm btn-icon-only"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <font-awesome-icon icon="ellipsis-v" />
                  </a>
                </template>
                <a
                  href="#"
                  class="dropdown-item"
                  @click.prevent="toggleReorder()"
                >
                  <font-awesome-icon
                    :icon="reorderMode ? 'times' : 'arrows-alt-v'"
                    class="text-primary mr-1"
                  /> {{ reorderMode ? $t('show.cancelAction') : $t('show.reorderAction') }}
                </a>
                <a
                  href="#"
                  class="dropdown-item"
                  @click.prevent="editShow()"
                >
                  <font-awesome-icon icon="edit" class="mr-1 text-secondary" /> {{ $t('show.editAction') }}
                </a>
                <a
                  href="#"
                  class="dropdown-item"
                  @click.prevent="removeShow()"
                >
                  <font-awesome-icon icon="trash" class="mr-1 text-danger" /> {{ $t('show.removeAction') }}
                </a>
              </base-dropdown>
            </div>
          </div>
          <div v-else class="info pb-3">
            <div class="shine shimmer-lines"></div>
            <hr />
            <div class="shine shimmer-lines"></div>
            <div class="shine shimmer-lines"></div>
          </div>
        </div>
      </div>
      <div v-if="reorderMode" class="row">
        <div class="col-12">
          <base-button
            htmlType="button"
            type="danger"
            class="mb-3"
            @click="toggleReorder()"
          >
            {{ $t('show.cancelAction')}}
          </base-button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h3 class="title">{{ $t('show.songsLabel') }}</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 pt-3 mb-3">
          <div>
            <!-- Current song display -->
            <div v-if="!reorderMode">
              <div v-if="!showLoading && show.songs">
                <ul class="songs" v-if="show.songs.length > 0">
                  <li v-for="(s, i) in show.songs" :key="i" class="song">
                    <div v-if="s.isPublic" class="public-icon">
                      <span>{{ $t('show.publicLabel') }}</span>
                    </div>
                    <div class="icon mr-3" @click="navigateTo('song', show.band.id, s.id)">
                      <div class="song-img">
                        <img :src="`/img/arts/white/audio-wave.svg`" />
                      </div>
                    </div>
                    <div class="song-info" @click="navigateTo('song', show.band.id, s.id)">
                      <p class="mb-0">
                        <strong>{{ s.title }}</strong>
                      </p>
                      <span>{{ s.writter }}</span>
                    </div>
                    <div class="actions">
                      <base-dropdown class="dropdown" position="right">
                        <template v-slot:title>
                          <a
                            class="btn btn-sm btn-icon-only"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <font-awesome-icon icon="ellipsis-v" />
                          </a>
                        </template>
                        <a
                          href="#"
                          class="dropdown-item"
                          @click="removeSongFromShow(s)"
                        >
                          <font-awesome-icon icon="trash" class="mr-1" /> {{ $t('show.removeFromShow') }}
                        </a>
                      </base-dropdown>
                    </div>
                  </li>
                </ul>
                <div v-else class="no-songs">
                  <div class="icon">
                    <img src="/img/arts/not_found.svg" alt="No content">
                  </div>
                  <p class="mb-3 text-center">
                    <strong>
                      {{ $t('show.noSongs') }}
                    </strong>
                  </p>
                </div>
              </div>
              <div v-else>
                <ul class="songs">
                  <li class="song">
                    <div class="icon mr-3">
                      <div class="song-img">
                        <div class="shine shimmer-photo"></div>
                      </div>
                    </div>
                    <div class="song-info">
                      <p class="mb-0">
                        <span class="shine shimmer-lines"></span>
                      </p>
                      <div class="shine shimmer-lines"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- End: Current song display -->
            <!-- Reordering feature -->
            <div v-else>
              <div v-if="!showLoading && show.songs">
                <ul class="songs" v-if="show.songs.length > 0">
                  <li v-for="(s, i) in show.songs" :key="i" class="song reorder">
                    <div class="song-info">
                      <p class="mb-0">
                        <strong>{{ s.title }}</strong>
                      </p>
                      <span>{{ s.writter }}</span>
                    </div>
                    <div class="actions">
                      <a
                        v-if="i !== 0"
                        class="btn btn-sm btn-icon-only order"
                        role="button"
                        aria-expanded="false"
                        @click="switchSong(i, i - 1)"
                      >
                        <font-awesome-icon icon="arrow-up" />
                      </a>
                      <a
                        v-if="i !== show.songs.length - 1"
                        class="btn btn-sm btn-icon-only order"
                        role="button"
                        aria-expanded="false"
                        @click="switchSong(i, i + 1)"
                      >
                        <font-awesome-icon icon="arrow-down" />
                      </a>
                    </div>
                  </li>
                </ul>
                <div v-else class="no-songs">
                  <div class="icon">
                    <img src="/img/arts/not_found.svg" alt="No content">
                  </div>
                  <p class="mb-3 text-center">
                    <strong>
                      {{ $t('show.noSongs') }}
                    </strong>
                  </p>
                </div>
              </div>
              <div v-else>
                <ul class="songs">
                  <li class="song">
                    <div class="icon mr-3">
                      <div class="song-img">
                        <div class="shine shimmer-photo"></div>
                      </div>
                    </div>
                    <div class="song-info">
                      <p class="mb-0">
                        <span class="shine shimmer-lines"></span>
                      </p>
                      <div class="shine shimmer-lines"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- End: Reordering feature -->
            <!-- Action buttons -->
            <hr v-if="(show && show.songs && show.songs.length > 0)" />
            <base-button
              v-if="(!showLoading && (show && show.songs && show.songs.length > 0)) && !reorderMode"
              htmlType="button"
              type="primary"
              @click="viewAsPlaylist()"
            >
              {{ $t('show.pdfAction') }}
            </base-button>
            <base-button
              v-if="(!showLoading && (show && show.songs && show.songs.length > 0)) && reorderMode"
              htmlType="button"
              type="primary"
              @click="reorder()"
            >
              {{ $t('show.reorderSubmit') }}
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/show.js"></script>
