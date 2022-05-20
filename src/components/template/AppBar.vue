<template>
  <header id="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="app-bar">
            <div class="app">
              <div class="user">
                <div class="user-img">
                  <img src="/img/j_black.jpg" alt="User Image">
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
                  <a href="#" class="dropdown-item" @click="navigateTo('profile')">
                    <font-awesome-icon icon="user-astronaut" class="mr-1" /> {{ $t('layout.profile') }}
                  </a>
                  <hr class="mb-2" />
                  <a href="#" class="dropdown-item" @click="logout()">
                    <font-awesome-icon icon="right-from-bracket" class="mr-1" /> {{ $t('layout.logout') }}
                  </a>
                </base-dropdown>
              </div>
              <!-- <div class="back" @click="goBack()">
                <font-awesome-icon icon="chevron-left" size="2x" />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script src="./js/appBar.js"></script>
