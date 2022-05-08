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
              {{ $t('band.createdAt') }} 
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
                  <small>{{ $t('band.inviteAction') }}</small>
                </p>
              </div>
              <div @click="navigateTo('editBand', band.id)" class="action">
                <div class="icon-bg">
                  <font-awesome-icon icon="edit"  />
                </div>
                <p class="mb-0">
                  <small>{{ $t('band.updateAction') }}</small>
                </p>
              </div>
              <div v-if="band.owner.id === me.id" @click="disposeBand()" class="action">
                <div class="icon-bg">
                  <font-awesome-icon icon="trash" />
                </div>
                <p class="mb-0">
                  <small>{{ $t('band.removeAction') }}</small>
                </p>
              </div>
            </div>
          </div>
          <div v-else class="info">
            <div class="shine shimmer-lines"></div>
            <hr />
            <div class="shine shimmer-lines"></div>
            <hr />
            <div class="shine shimmer-lines"></div>
          </div>
        </div>
      </div>
      <div class="row band-activities secondary-section p-3">
        <div class="col-12">
          <h3 class="title mb-3">
            {{ $t('band.toolSection') }}
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
                <div class="shine shimmer-photo" />
              </div>
              <div class="shine shimmer-lines" />
            </li>
            <li class="item">
              <div class="icon">
                <div class="shine shimmer-photo" />
              </div>
              <div class="shine shimmer-lines" />
            </li>
            <li class="item">
              <div class="icon">
                <div class="shine shimmer-photo" />
              </div>
              <div class="shine shimmer-lines" />
            </li>
          </ul>
        </div>
      </div>
      <div class="row band-members">
        <div class="col-12">
          <h3 class="title mb-3">
            {{ $t('band.memberSection') }}
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
                      ? $t('bands.founder')  
                      : band.admins.find(a => a.id === m.id) 
                        ? $t('bands.admin') 
                        : $t('bands.member') 
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
                      <font-awesome-icon icon="trash" class="mr-1" /> {{ $t('band.removeAction') }}
                    </a>
                    <a
                      href="#"
                      @click="demoteMember(m)"
                      class="dropdown-item"
                      v-if="((band.owner.id === me.id || band.admins.find(a => a.id === me.id)) && m.id !== me.id && band.admins.find(a => a.id === m.id))"
                    >
                      <font-awesome-icon icon="angle-double-down" class="mr-1" /> {{ $t('band.demoteAction') }}
                    </a>
                    <a
                      href="#"
                      @click="promoteMember(m)"
                      class="dropdown-item"
                      v-if="(band.admins.find(a => a.id === me.id) && m.id !== band.owner.id && m.id !== me.id && !band.admins.find(a => a.id === m.id)) || (band.owner.id === me.id && m.id !== me.id && !band.admins.find(a => a.id === m.id))"
                    >
                      <font-awesome-icon icon="angle-double-up" class="mr-1" /> {{ $t('band.promoteAction') }}
                    </a>
                  </base-dropdown>
                </div>
              </li>
            </ul>
            <ul v-else class="members">
              <li class="item">
                <div class="info mr-3">
                  <p class="mb-0">
                    <span class="shine shimmer-lines"></span>
                  </p>
                  <div class="shine shimmer-lines"></div>
                </div>
                <div class="actions">
                  <div class="shine shimmer-photo"></div>
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
              <h4>{{ $t('band.modalTitle') }}</h4>
              <p>{{ $t('band.modalDescription') }}</p>
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
                :label="$t('band.userField')"
                :placeholder="$t('band.userField')"
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
                {{ $t('band.addAction') }}
              </base-button>
            </div>
          </div>
        </form>
      </div>
    </base-modal>
  </div>
</template>

<script src="./js/band.js"></script>
