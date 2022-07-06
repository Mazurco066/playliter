<template>
  <div id="show">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div v-if="!showLoading" class="info about">
            <div class="header-wrapper">
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
            <!-- Tabs header -->
            <div v-if="!showLoading" class="tabs">
              <div
                v-for="({ key, title }) in translatedTabs"
                :key="key"
                :class="{ 'selected': key === selectedIndex }"
                @click="setTab(key)"
                class="tab"
              >
                <span>{{ title }}</span>
              </div>
            </div>
          </div>
          <div v-else class="info pb-3">
            <div class="header-wrapper">
              <div class="shine shimmer-lines"></div>
              <hr />
              <div class="shine shimmer-lines"></div>
              <div class="shine shimmer-lines"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Tab content render -->
      <div class="tabs-content">
        <!-- Songs tab -->
        <div v-if="selectedIndex === 1" id="show-songs">
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
        <!-- Observations tab -->
        <div v-if="selectedIndex === 2" id="show-observations">
          <div class="row">
            <div class="col-12">
              <div class="observation-header">
                <h3 class="title">{{ $t("show.obsTitle") }}</h3>
                <button type="button" @click="openObservationModal()">
                  <font-awesome-icon class="mr-2" icon="plus" /> {{ $t('show.addAction') }}
                </button>
              </div>
            </div>
            <div class="col-12 pt-2">
              <ul v-if="!showLoading" class="obs-list">
                <li class="item" :key="i" v-for="(obs, i) in show.observations">
                  <div class="obs-title">
                    <h4>{{ obs.title }}</h4>
                    <div class="obs-actions">
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
                          @click="openObservationModal(obs)"
                        >
                          <font-awesome-icon icon="pencil" class="mr-1" /> {{ $t('show.obsEditAction') }}
                        </a>
                        <a
                          href="#"
                          class="dropdown-item"
                          @click="removeObservation(obs)"
                        >
                          <font-awesome-icon icon="trash" class="mr-1" /> {{ $t('show.obsRemoveAction') }}
                        </a>
                      </base-dropdown>
                    </div>
                  </div>
                  <p>
                    {{ obs.data }}
                  </p>
                </li>
              </ul>
              <div v-if="show.observations.length === 0 && !showLoading" class="no-observation">
                <div class="icon">
                  <img src="/img/arts/not_found.svg" alt="No content">
                </div>
                <p class="mb-3 text-center">
                  <strong>{{ $t('show.noObservations') }}</strong>
                </p>
              </div>
              <ul v-if="showLoading" class="obs-list">
                <li class="item">
                  <div class="obs-title">
                    <div class="shine shimmer-lines"></div>
                  </div>
                  <div class="shine shimmer-lines"></div>
                  <div class="shine shimmer-lines"></div>
                  <div class="shine shimmer-lines"></div>
                </li>
                <li class="item">
                  <div class="obs-title">
                    <div class="shine shimmer-lines"></div>
                  </div>
                  <div class="shine shimmer-lines"></div>
                  <div class="shine shimmer-lines"></div>
                  <div class="shine shimmer-lines"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Update observation form -->
    <base-modal
      @close="closeObservationModal()"
      :show="isObservationModalOpen"
    >
      <slot name="header">
        <div class="container">
          <div class="row">
            <div class="col-10">
              <h4 class="text-secondary-light">{{ $t("show.obsFormTitle") }}</h4>
            </div>
            <div class="col-2">
              <button
                @click="closeObservationModal()"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <font-awesome-icon icon="times" />
                </span>
              </button>
            </div>
            <div class="col-12">
              <p v-html="$t('show.obsFormDescription')"></p>
            </div>
          </div>
        </div>
      </slot>
      <div class="container">
        <form @submit.prevent="submitObservation">
          <div class="row">
            <div class="col-12">
              <base-input
                type="text"
                :label="$t('show.titleField')"
                :placeholder="$t('show.titleField')"
                addonLeftIcon="tag"
                v-model="v$.form.title.$model"
                :valid="!v$.form.title.$error"
                :error="
                  v$.form.title.$errors.length
                    ? $translations.translateMessage(
                        v$.form.title.$errors[0].$message
                      )
                    : ''
                "
                :disabled="showLoading"
              />
            </div>
            <div class="col-12">
              <base-area
                :label="$t('show.dataField')"
                :placeholder="$t('show.dataField')"
                v-model="v$.form.data.$model"
                :valid="!v$.form.data.$error"
                :error="
                  v$.form.data.$errors.length
                    ? $translations.translateMessage(
                        v$.form.data.$errors[0].$message
                      )
                    : ''
                "
                :disabled="showLoading"
              />
            </div>
            <div class="col-12">
              <base-button
                nativeType="submit"
                type="primary"
                :disabled="v$.$error === true || showLoading"
                class="mb-3"
              >
                {{ $t("show.submit") }}
              </base-button>
            </div>
          </div>
        </form>
      </div>
    </base-modal>
  </div>
</template>

<script src="./js/show.js"></script>
