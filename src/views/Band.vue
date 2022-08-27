<template>
  <div id="band">
    <!-- Band content -->
    <div class="container">
      <div class="tabs-header">
        <div v-if="isDisplayReady" class="band-wrapper">
          <h3 class="title mb-3 pr-5">{{ band.title }}</h3>
          <p class="mb-2">{{ band.description }}</p>
          <span class="mb-3">
            {{ $t('band.createdAt') }} 
            <strong class="text-secondary-light">
              {{ $text.formatISODate(new Date(parseInt(band.createdAt)).toISOString()) }}
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
                @click.prevent="openInviteModal()"
              >
                <font-awesome-icon icon="user-plus" class="text-primary mr-1" /> {{ $t('band.inviteAction') }}
              </a>
              <a
                href="#"
                class="dropdown-item"
                @click.prevent="navigateTo('editBand', band.id)"
              >
                <font-awesome-icon icon="edit" class="mr-1 text-secondary" /> {{ $t('band.updateAction') }}
              </a>
              <a
                v-if="band.owner.id === me.id"
                href="#"
                class="dropdown-item"
                @click.prevent="disposeBand()"
              >
                <font-awesome-icon icon="trash" class="mr-1 text-danger" /> {{ $t('band.removeAction') }}
              </a>
              <hr class="mb-1" />
              <a
                href="#"
                class="dropdown-item"
                @click.prevent="openMembersModal()"
              >
                <font-awesome-icon icon="users" class="text-secondary mr-1" /> Membros
              </a>
            </base-dropdown>
          </div>
        </div>
        <div class="p-3" v-else>
          <div class="shine shimmer-lines"></div>
          <div class="shine shimmer-lines"></div>
          <div class="shine shimmer-lines"></div>
        </div>
        <div class="tabs" v-if="isDisplayReady">
          <div
            v-for="({ key, title, hash }) in translatedTabs"
            :key="key"
            :class="{ 'selected': key === selectedIndex }"
            @click="setTab(key)"
            class="tab"
          >
            <a :href="hash" rel="noopener noreferrer">
              {{ title }}
            </a>
          </div>
        </div>
      </div>
      <!-- Renders the current tab -->
      <div v-if="isDisplayReady" class="tabs-content">
        <repertory
          v-if="selectedIndex === 1"
          :band="band.id"
        />
        <categories
          v-if="selectedIndex === 2"
          :band="band.id"
        />
        <shows
          v-if="selectedIndex === 3"
          :band="band.id"
        />
      </div>
    </div>
    <!-- Invite modal -->
    <base-modal @close="closeInviteModal" :show="isInviteModalOpen">
      <slot name="header">
        <div class="container">
          <div class="row">
            <div class="col-10">
              <h4 class="text-secondary-light">{{ $t('band.modalTitle') }}</h4>
            </div>
            <div class="col-2">
              <button
                @click="closeInviteModal()"
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
              <p v-html="$t('band.modalDescription')"></p>
            </div>
          </div>
        </div>
      </slot>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <base-input
              :addonRightIcon="accountFilter ? 'times' : 'search'"
              :onAddonRightClick="() => { accountFilter = '' }"
              :placeholder="$t('band.inviteLabel')"
              v-model="accountFilter"
            />
          </div>
          <div class="col-12">
            <ul class="account-checklist">
              <li
                v-for="({ id, avatar, name}, index) in filteredAccounts"
                :key="index"
                class="account-item"
              >
                <label :for="id" class="checkbox-wrapper">
                  <input
                    :id="id"
                    :value="id"
                    v-model="checkedAccounts"
                    type="checkbox"
                    class="checkbox-input" 
                  />
                  <span class="checkbox-tile">
                    <span class="checkbox-icon">
                      <img :src="avatar" alt="Account avatar"/>
                    </span>
                    <span class="checkbox-label">{{ name }}</span>
                  </span>
                </label>
              </li>
            </ul>
          </div>
          <div class="col-12">
            <base-button
              type="primary"
              @click="inviteMembers()"
              :disabled="bandLoading"
            >
              {{ $t('band.inviteSelected') }}
            </base-button>
          </div>
        </div>

        <!-- <form @submit.prevent="inviteMember">
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
        </form> -->
      </div>
    </base-modal>
    <!-- Members modal -->
    <base-modal  @close="closeMembersModal" :show="isMembersModalOpen">
      <slot name="header">
        <div class="container">
          <div class="row">
            <div class="col-10">
              <h4 class="text-secondary-light">{{ $t('band.memberSection') }}</h4>
            </div>
            <div class="col-2">
              <button
                @click="closeMembersModal()"
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
              <p v-html="$t('band.memberDescription')"></p>
            </div>
          </div>
        </div>
      </slot>
      <div class="container">
        <div class="row band-members">
          <div class="col-12">
            <ul v-if="isDisplayReady" class="members">
              <li v-for="(m, i) in band.members" :key="i" class="item">
                <div class="icon">
                  <div class="picture">
                    <img :src="m.avatar ? m.avatar : '/img/j_black.jpg'" alt="">
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
    </base-modal>
  </div>
</template>

<script src="./js/band.js"></script>
