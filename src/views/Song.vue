<template>
  <div id="song" class="full">
    <!-- Song container-->
    <div class="container full">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <p v-if="!songLoading" class="title mb-0">
            {{ song.title }}
          </p>
          <lines v-else class="shine"></lines>
          <p v-if="!songLoading">{{ song.writter }}</p>
          <lines v-else class="shine"></lines>
          <hr class="mb-1" />
        </div>
        <div class="col-12">
          <div v-if="!songLoading" class="song-actions">
            <div class="action" @click="openListModal()">
              <div class="icon-bg">
                <font-awesome-icon icon="list" />
              </div>
              <p class="mb-0">
                <small>+ Lista</small>
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
                <small>Editar</small>
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
                <small>Remover</small>
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
              <h4>Apresentações</h4>
              <p>Adicionar música a uma apresentação</p>
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
                Nenhuma apresentação cadastrada!
              </p>
            </div>
            <div v-else>
              <ul class="shows">
                <li class="show">
                  <lines class="shine"></lines>
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
