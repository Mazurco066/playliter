<template>
  <div id="song" class="full">
    <!-- Song container-->
    <div class="container full">
      <div class="row pt-3">
        <div class="col-12">
          <div class="info">
            <p v-if="!songLoading" class="title mb-0">
              {{ song.title }}
            </p>
            <lines v-else class="shine"></lines>
            <span v-if="!songLoading">{{ song.writter }}</span>
            <lines v-else class="shine"></lines>
            <hr />
            <div class="actions">
              <div class="action" @click="openListModal()">
                <font-awesome-icon icon="list" class="text-info" />
                <p class="mb-0">
                  <small>+ Lista</small>
                </p>
              </div>
              <div class="action" @click="editSong()">
                <font-awesome-icon icon="edit" class="text-warning" />
                <p class="mb-0">
                  <small>Editar</small>
                </p>
              </div>
              <div
                @click="songLoading ? () => {} : deleteSong()"
                class="action"
              >
                <font-awesome-icon icon="trash" class="text-danger" />
                <p class="mb-0">
                  <small>Remover</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-3 mb-3">
          <div class="info">
            <pre
              id="lyrics"
              class="tranposer"
              :data-key="song.tone"
              v-if="!songLoading"
            >
              {{ song.body }}
            </pre>
            <div v-else>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
              <lines class="shine"></lines>
            </div>
          </div>
        </div>
      </div>
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
