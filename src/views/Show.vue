<template>
  <div id="show">
    <div class="container">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <div v-if="!showLoading" class="info about">
            <h3 class="title mt-3">{{ show.title }}</h3>
            <hr />
            <p class="mb-3">{{ show.description }}</p>
            <span v-if="show.createdAt">
              Criada em 
              <strong>
                {{ $text.formatISODate(new Date(parseInt(show.createdAt)).toISOString()) }}
              </strong>
            </span>
            <div class="show-actions">
              <div class="action" @click="editShow()">
                <div class="icon-bg">
                  <font-awesome-icon icon="edit" />
                </div>
                <p class="mb-0">
                  <small>Editar</small>
                </p>
              </div>
              <div class="action" @click="toggleReorder()">
                <div class="icon-bg">
                  <font-awesome-icon :icon="reorderMode ? 'times' : 'arrows-alt-v'" />
                </div>
                <p class="mb-0">
                  <small>{{ reorderMode ? 'Cancelar' : 'Reordenar' }}</small>
                </p>
              </div>
              <div class="action" @click="removeShow()">
                <div class="icon-bg">
                  <font-awesome-icon icon="trash" />
                </div>
                <p class="mb-0">
                  <small>Remover</small>
                </p>
              </div>
            </div>
          </div>
          <div v-else class="info pb-3">
            <lines class="shine"></lines>
            <hr />
            <lines class="shine"></lines>
            <lines class="shine"></lines>
          </div>
        </div>
      </div>
      <div class="row secondary-section pt-3">
        <div class="col-12">
          <h3 class="title mb-3">Músicas selecionadas</h3>
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
                    <div class="icon mr-3" @click="navigateTo('song', show.band.id, s.id)">
                      <div class="song-img">
                        <img :src="`/img/arts/01.png`" />
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
                          <font-awesome-icon icon="trash" class="mr-1" /> Remover da Apresentação
                        </a>
                      </base-dropdown>
                    </div>
                  </li>
                </ul>
                <p v-else class="mb-0">
                  Não há músicas registradas nessa apresentação!
                </p>
              </div>
              <div v-else>
                <ul class="songs">
                  <li class="song">
                    <div class="icon mr-3">
                      <div class="song-img">
                        <photo class="shine"></photo>
                      </div>
                    </div>
                    <div class="song-info">
                      <p class="mb-0">
                        <lines class="shine"></lines>
                      </p>
                      <lines class="shine"></lines>
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
                <p v-else class="mb-0">
                  Não há músicas registradas nessa apresentação!
                </p>
              </div>
              <div v-else>
                <ul class="songs">
                  <li class="song">
                    <div class="icon mr-3">
                      <div class="song-img">
                        <photo class="shine"></photo>
                      </div>
                    </div>
                    <div class="song-info">
                      <p class="mb-0">
                        <lines class="shine"></lines>
                      </p>
                      <lines class="shine"></lines>
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
              Modo de visualização (PDF)
            </base-button>
            <base-button
              v-if="(!showLoading && (show && show.songs && show.songs.length > 0)) && reorderMode"
              htmlType="button"
              type="primary"
              @click="reorder()"
            >
              Salvar Ordem
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/show.js"></script>
