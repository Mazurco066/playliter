<template>
  <div id="band">
    
    <!-- Band content -->
    <div class="container">
      <div class="row pt-3 band-header primary-section p-3">
        <div class="col-12">
          <div v-if="isDisplayReady" class="about">
            <h3 class="title mt-3">{{ band.title }}</h3>
            <hr />
            <p class="mb-3">{{ band.description }}</p>
            <span>
              Criada em 
              <strong>
                {{ $text.formatISODate(new Date(parseInt(band.createdAt)).toISOString()) }}
              </strong>
            </span>
            <div class="band-actions">
              <div @click="openInviteModal()" class="action">
                <div class="icon-bg">
                  <font-awesome-icon icon="user-plus" />
                </div>
                <p class="mb-0">
                  <small>Convidar</small>
                </p>
              </div>
              <div @click="navigateTo('editBand', band.id)" class="action">
                <div class="icon-bg">
                  <font-awesome-icon icon="edit"  />
                </div>
                <p class="mb-0">
                  <small>Editar</small>
                </p>
              </div>
              <div v-if="band.owner.id === me.id" @click="disposeBand()" class="action">
                <div class="icon-bg">
                  <font-awesome-icon icon="trash" />
                </div>
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
      </div>
      <div class="row band-activities secondary-section p-3">
        <div class="col-12">
          <h3 class="title mb-3">
            Ferramentas
          </h3>
        </div>
        <div class="col-12">
          <ul v-if="isDisplayReady" class="activities">
            <li
              class="item"
              v-for="(item, i) in menu"
              :key="i"
              @click="navigateTo(item.redirect)"
            >
              <div class="icon">
                <font-awesome-icon
                  :icon="item.icon"
                  size="3x"
                />
              </div>
              <p class="mb-0 text-center">
                {{ item.text }}
              </p>
            </li>
          </ul>
          <ul v-else class="activities">
            <li class="item">
              <div class="icon">
                <photo class="shine" />
              </div>
              <lines class="shine" />
            </li>
            <li class="item">
              <div class="icon">
                <photo class="shine" />
              </div>
              <lines class="shine" />
            </li>
            <li class="item">
              <div class="icon">
                <photo class="shine" />
              </div>
              <lines class="shine" />
            </li>
          </ul>
        </div>
      </div>
      <div class="row band-members">
        <div class="col-12">
          <h3 class="title mb-3">
            Integrantes
          </h3>
        </div>
        <div class="col-12">
          <ul v-if="isDisplayReady" class="members">
            <li v-for="(m, i) in band.members" :key="i" class="item">
              <div class="icon">
                <div class="picture">
                  <img src="/img/j_black.jpg" alt="">
                </div>
              </div>
              <div class="info">
                <p class="mb-0">
                  <strong>{{ m.name }}</strong>
                </p>
                <span>
                  {{ 
                    band.owner.id === m.id 
                      ? 'Fundador' 
                      : band.admins.find(a => a.id === m.id) 
                        ? 'Administrador'
                        : 'Membro' 
                  }}
                </span>
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
              <li class="item">
                <div class="info mr-3">
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
