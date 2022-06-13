<template>
  <div id="song">
    <!-- Song container-->
    <div class="container">
      <base-songsheet
        @toneUpdated="updateTone"
        :loading="songLoading"
        :song="song"
        :canUpdateBaseTone="isRemovable"
      >
        <div class="options">
          <base-dropdown class="dropdown" position="right">
            <template v-slot:title>
              <a
                class="btn"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <font-awesome-icon icon="ellipsis-vertical" />
              </a>
            </template>
            <a
              href="#"
              class="dropdown-item"
              @click="openListModal()"
            >
              <font-awesome-icon icon="list" class="mr-1" /> {{ $t('song.listAction') }}
            </a>
            <a
              href="#"
              class="dropdown-item"
              :class="{ 'disabled': !isEditable }"
              @click="isEditable ? editSong() : () => {}"
            >
              <font-awesome-icon icon="edit" class="mr-1" /> {{ $t('song.editAction') }}
            </a>
            <a
              href="#"
              class="dropdown-item"
              :class="{ 'disabled': !isRemovable }"
              @click="isRemovable ? deleteSong() : () => {}"
            >
              <font-awesome-icon icon="trash" class="mr-1" /> {{ $t('song.removeAction') }}
            </a>
            <a
              href="#"
              class="dropdown-item"
              :class="{ 'disabled': bandLoading || songLoading }"
              @click="bandLoading || songLoading ? () => {} : openCloneModal()"
            >
              <font-awesome-icon icon="clone" class="mr-1" /> {{ $t('song.cloneAction') }}
            </a>
          </base-dropdown>
        </div>
      </base-songsheet>
    </div>
    <!-- Add to list Modals -->
    <base-modal
      @close="closeListModal"
      :show="isListModalOpen"
    >
      <slot name="header">
        <div class="container">
          <div class="row">
            <div class="col-10">
              <h4 class="text-secondary-light">{{ $t('song.modalTitle') }}</h4>
            </div>
            <div class="col-2">
              <button
                @click="closeListModal()"
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
              <p v-html="$t('song.modalSubtitle')"></p>
            </div>
          </div>
        </div>
      </slot>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- Show list -->
            <div v-if="!showLoading">
              <ul class="shows" v-if="shows.length">
                <li
                  @click="addSongToShow(s)"
                  v-for="(s, i) in shows"
                  :key="i"
                  class="show"
                >
                  <p class="mb-0">
                    <strong>{{ s.title }}</strong>
                  </p>
                </li>
              </ul>
              <p v-else class="mt-2">
                <strong>
                  {{ $t('song.noPresentations') }}
                </strong>
              </p>
            </div>
            <div v-else>
              <ul class="shows">
                <li class="show">
                  <div class="shine shimmer-lines"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </base-modal>
    <!-- Clone song to a band -->
    <base-modal
       @close="closeCloneModal"
      :show="isCloneModalOpen"
    >
      <slot name="header">
        <div class="container">
          <div class="row">
            <div class="col-10">
              <h4 class="text-secondary-light">{{ $t('song.cloneTitle') }}</h4>
            </div>
            <div class="col-2">
              <button
                @click="closeCloneModal()"
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
              <p v-html="$t('song.cloneSubtitle')"></p>
            </div>
          </div>
        </div>
      </slot>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ul class="bands-list" v-if="!bandLoading">
              <li
                class="item"
                v-for="(band, i) in computedBands"
                :key="i"
                @click="cloneSong(band)"
              >
                <p class="mb-0">
                  <strong>{{ band.title }}</strong>
                </p>
              </li>
            </ul>
            <ul class="bands-list" v-else>
              <li class="item">
                <div class="shine shimmer-lines"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script src="./js/song.js"></script>
