<template>
  <div id="band">
    <div class="container">
      <div class="row pt-3">
        <div class="col-12">
          <div v-if="isDisplayReady" class="info about">
            <h3 class="title">{{ band.title }}</h3>
            <hr />
            <p class="mb-1">{{ band.description }}</p>
            <hr />
            <span>
              Criada em 
              <strong>
                {{ $text.formatISODate(new Date(parseInt(band.createdAt)).toISOString()) }}
              </strong>
            </span>
            <hr />
            <div class="actions">
              <div @click="openInviteModal()" class="action">
                <font-awesome-icon icon="user-plus" class="text-info" />
                <p class="mb-0">
                  <small>Convidar</small>
                </p>
              </div>
              <div @click="navigateTo('editBand', null, band.id)" class="action">
                <font-awesome-icon icon="edit" class="text-warning" />
                <p class="mb-0">
                  <small>Editar</small>
                </p>
              </div>
              <div v-if="band.owner.id === me.id" @click="disposeBand()" class="action">
                <font-awesome-icon icon="trash" class="text-danger" />
                <p class="mb-0">
                  <small>Remover</small>
                </p>
              </div>
            </div>
          </div>
          <div v-else class="info">
            <lines class="shine"></lines>
            <hr />
            <lines class="shine"></lines>
            <hr />
            <lines class="shine"></lines>
          </div>
        </div>
        <div class="col-12 pt-3">
          <div class="info">
            <div class="info-title">
              <h3 class="title">Repertório</h3>
              <button class="btn-card" @click="saveSong(band.id)">
                <font-awesome-icon icon="plus" />
              </button>
            </div>
            <hr />
            <div v-if="isDisplayReady">
              <ul class="songs" v-if="songs.length > 0">
                <li v-for="(s, i) in songs" :key="i" class="song" @click="navigateTo('song', s.band.id, s.id)">
                  <div class="icon mr-3">
                    <div class="song-img">
                      <img :src="`/img/arts/01.png`" />
                    </div>
                  </div>
                  <div class="song-info">
                    <p class="mb-0">
                      <strong>{{ s.title }}</strong>
                    </p>
                    <span>{{ s.writter }}</span>
                  </div>
                </li>
              </ul>
              <p v-else class="mb-0">
                Não há músicas registradas nessa banda!
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
            <hr />
            <base-button
              v-if="isDisplayReady"
              @click="navigateTo('directory', band.id)"
              htmlType="button"
              type="primary"
            >
              Ver repertório completo
            </base-button>
            <lines v-else class="shine"></lines>
          </div>
        </div>
        <div class="col-12 pt-3">
          <div class="info">
            <div class="info-title">
              <h3 class="title">Apresentações</h3>
              <button class="btn-card" @click="saveShow(band.id)">
                <font-awesome-icon icon="plus" />
              </button>
            </div>
            <hr />
            <div v-if="isDisplayReady">
              <ul class="shows" v-if="shows.length > 0">
                <li v-for="(s, i) in shows" :key="i" class="show" @click="navigateTo('show', s.band.id, s.id)">
                  <div class="icon mr-3">
                    <div class="show-img">
                      <img :src="`/img/arts/02.png`" />
                    </div>
                  </div>
                  <div class="show-info">
                    <p class="mb-0">
                      <strong>{{ s.title }}</strong>
                    </p>
                    <span>{{ s.description }}</span>
                  </div>
                </li>
              </ul>
              <p v-else class="mb-0">
                Não há apresentações registradas nessa banda!
              </p>
            </div>
            <div v-else>
              <ul class="shows">
                <li class="show">
                  <div class="icon mr-3">
                    <div class="show-img">
                      <photo class="shine"></photo>
                    </div>
                  </div>
                  <div class="show-info">
                    <p class="mb-0">
                      <lines class="shine"></lines>
                    </p>
                    <lines class="shine"></lines>
                  </div>
                </li>
              </ul>
            </div>
            <hr />
            <base-button
              v-if="isDisplayReady"
              type="primary"
              @click="navigateTo('shows', band.id)"
            >
              Ver todas apresentações
            </base-button>
            <lines v-else class="shine"></lines>
          </div>
        </div>
        <div class="col-12 pt-3 mb-3">
          <div class="info">
            <h3 class="title">Membros</h3>
            <hr />
            <ul v-if="isDisplayReady" class="members">
              <li v-for="(m, i) in band.members" :key="i" class="member">
                <div class="member-info">
                  <p class="mb-0">
                    <strong>{{ m.name }}</strong>
                  </p>
                  <span> {{ 
                    band.owner.id === m.id 
                      ? 'Fundador' 
                      : band.admins.find(a => a.id === m.id) 
                        ? 'Administrador'
                        : 'Membro' 
                  }}</span>
                </div>
                <div class="actions" v-if="band.owner.id !== m.id">
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
                      @click="removeMember(m)"
                      class="dropdown-item"
                      v-if="(band.admins.find(a => a.id === me.id) && m.id !== band.owner.id && m.id !== me.id) || (band.owner.id === me.id && m.id !== me.id)"
                    >
                      <font-awesome-icon icon="trash" class="mr-1" /> Remover
                    </a>
                    <a
                      href="#"
                      @click="demoteMember(m)"
                      class="dropdown-item"
                      v-if="((band.owner.id === me.id || band.admins.find(a => a.id === me.id)) && m.id !== me.id && band.admins.find(a => a.id === m.id))"
                    >
                      <font-awesome-icon icon="angle-double-down" class="mr-1" /> Remover permissões
                    </a>
                    <a
                      href="#"
                      @click="promoteMember(m)"
                      class="dropdown-item"
                      v-if="(band.admins.find(a => a.id === me.id) && m.id !== band.owner.id && m.id !== me.id && !band.admins.find(a => a.id === m.id)) || (band.owner.id === me.id && m.id !== me.id && !band.admins.find(a => a.id === m.id))"
                    >
                      <font-awesome-icon icon="angle-double-up" class="mr-1" /> Tornar admin
                    </a>
                  </base-dropdown>
                </div>
              </li>
            </ul>
            <ul v-else class="members">
              <li class="member">
                <div class="member-info mr-2">
                  <p class="mb-0">
                    <lines class="shine"></lines>
                  </p>
                  <lines class="shine"></lines>
                </div>
                <div class="actions">
                  <photo class="shine"></photo>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <base-modal @close="closeInviteModal" :show="isInviteModalOpen">
      <slot name="header">
        <button
          @click="closeInviteModal"
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
              <h4>Banda</h4>
              <p>Adicionar novo membro</p>
            </div>
          </div>
        </div>
      </slot>
      <div class="container">
        <form @submit.prevent="inviteMember">
          <div class="row">
            <div class="col-12">
              <base-input
                type="text"
                label="Nome de usuário"
                placeholder="Entre com a tag do usuário"
                addonLeftIcon="user"
                v-model="v$.inviteForm.username.$model"
                :valid="!v$.inviteForm.username.$error"
                :error="v$.inviteForm.username.$errors.length ? $translations.translateMessage(v$.inviteForm.username.$errors[0].$message) : ''"
                :disabled="bandLoading || accountLoading"
              />
            </div>
            <div class="col-12">
              <base-button
                class="mb-3"
                nativeType="submit"
                type="primary"
                :disabled="v$.$error === true || bandLoading || accountLoading"
              >
                Adicionar Membro
              </base-button>
            </div>
          </div>
        </form>
      </div>
    </base-modal>
  </div>
</template>

<script src="./js/band.js"></script>
