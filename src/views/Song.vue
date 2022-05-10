<template>
  <div id="song" class="full">
    <!-- Song container-->
    <div class="container full">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <p v-if="!songLoading" class="title mb-0">
            {{ song.title }}
          </p>
          <div v-else class="shine"></div>
          <p v-if="!songLoading">{{ song.writter }}</p>
          <div v-else class="shine"></div>
          <hr class="mb-1" />
        </div>
        <div class="col-12">
          <div v-if="!songLoading" class="song-actions">
            <div class="action" @click="openListModal()">
              <div class="icon-bg">
                <font-awesome-icon icon="list" />
              </div>
              <p class="mb-0">
                <small>{{ $t('song.listAction') }}</small>
              </p>
            </div>
            <div
              class="action"
              :class="{ 'disabled': !isEditable }"
              @click="isEditable ? editSong() : () => {}"
            >
              <div class="icon-bg">
                <font-awesome-icon icon="edit" />
              </div>
              <p class="mb-0">
                <small>{{ $t('song.editAction') }}</small>
              </p>
            </div>
            <div
              class="action"
              :class="{ 'disabled': !isRemovable }"
              @click="isRemovable ? deleteSong() : () => {}"
            >
              <div class="icon-bg">
                <font-awesome-icon icon="trash" />
              </div>
              <p class="mb-0">
                <small>{{ $t('song.removeAction') }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <base-songsheet
        :loading="songLoading"
        :song="song"
      />
    </div>
    <!-- Modals -->
    <base-modal @close="closeListModal" :show="isListModalOpen">
      <slot name="header">
        <button
          @click="closeListModal"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h4>{{ $t('song.modalTitle') }}</h4>
              <p>{{ $t('song.modalSubtitle') }}</p>
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
              <p v-else class="mb-3">
                {{ $t('song.noPresentations') }}
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
  </div>
</template>

<script src="./js/song.js"></script>
