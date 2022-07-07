<template>
  <header id="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="app-bar">
            <div class="app">
              <div class="user">
                <div v-if="displayBackBtn" class="back mr-2" @click="goBack()">
                  <font-awesome-icon icon="chevron-left" size="2x" />
                </div>
                <div class="user-img">
                  <img :src="me.avatar ? me.avatar : '/img/j_black.jpg'" alt="User Image">
                </div>
                <div class="user-info">
                  <p class="mb-0">{{ $t('welcomeMsg') }} <strong>{{ $t('appname') }}</strong>!</p>
                  <span>
                    <strong>
                      {{ $text.truncate(me.name || '', 18) }}
                    </strong>
                  </span>
                </div>
              </div>
              <div class="actionbar">
                <base-dropdown class="dropdown" position="right">
                  <template v-slot:title>
                    <a
                      class="btn btn-sm btn-icon-only btn-action"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <font-awesome-icon icon="gear" />
                    </a>
                  </template>
                  <a v-if="isAccountConfirmed" href="#" class="dropdown-item" @click="navigateTo('profile')">
                    <font-awesome-icon icon="user-astronaut" class="mr-1" /> {{ $t('layout.profile') }}
                  </a>
                  <a v-if="isAccountConfirmed" href="#" class="dropdown-item" @click="navigateTo('tuner')">
                    <font-awesome-icon icon="music" class="mr-1" /> {{ $t('layout.tuner') }}
                  </a>
                  <hr v-if="isAccountConfirmed" class="mb-2" />
                  <a href="#" class="dropdown-item" @click="logout()">
                    <font-awesome-icon icon="right-from-bracket" class="mr-1" /> {{ $t('layout.logout') }}
                  </a>
                </base-dropdown>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script src="./js/appBar.js"></script>
