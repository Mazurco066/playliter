<template>
  <div id="home"> 
    <div class="container">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <div class="app-info">
            <div class="display-logo">
              <img src="/img/logo.svg" alt="Playliter logo">
            </div>
            <div class="display-info">
              <h3 class="klasik">{{ $t('appname') }}</h3>
              <p class="mb-3">{{ $t('description') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3 secondary-section pb-3 mb-3">
        <div class="col-12">
          <h3 class="title mb-3 mt-3">
            {{ $t('home.nextPresentations') }}
          </h3>
          <div v-if="!showLoading">
            <ul v-if="pending.length > 0" class="list">
              <li
                class="item"
                v-for="(s, i) in pending"
                :key="i"
                @click="viewShow(s)"
              >
                <div class="icon mr-3">
                  <div class="show-img">
                    <img :src="`/img/arts/02.png`" />
                  </div>
                </div>
                <div class="show-info">
                  <p class="mb-0">
                    <strong class="show-title text-uppercase">
                      {{ s.title }}
                    </strong>
                  </p>
                  <p class="mb-0">
                    <strong>{{ s.band.title }}</strong>
                  </p>
                  <span>
                    {{ $t('home.date') }}: {{ $text.formatISODate(s.date) }} 
                  </span>
                </div>
              </li>
            </ul>
            <p v-else class="mb-0">
              {{ $t('home.noPresentations') }}
            </p>
          </div>
          <!-- Shimmer list -->
          <div v-else>
            <ul class="list">
              <li class="item">
                <div class="icon mr-3">
                  <div class="shine shimmer-photo"></div>
                </div>
                <div class="show-info">
                  <p class="title">
                    <span class="shine shimmer-lines"></span>
                  </p>
                  <div class="shine shimmer-lines"></div>
                </div>
                <div class="actions"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="hasPendingInvites" class="row">
        <div class="col-12">
          <h3 class="title mb-0">{{ $t('home.pendingInvites') }}</h3>
          <hr />
          <ul class="invites">
            <li
              v-for="(inv, i) in invites"
              :key="i"
              class="invite"
              @click="respondPendingInvite(inv)"
            >
              <div class="icon">
                <div class="board">
                  <font-awesome-icon icon="envelope" />
                </div>
              </div>
              <div class="info">
                <p class="mb-0">{{ inv.band.title }}</p>
                <span>{{ $t('home.invitedAt') }}: {{ $text.formatISODate(inv.createdAt) }}</span>
              </div>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="text-center">
            {{ $t('home.version') }}: <strong>2.4.0</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/home.js"></script>
