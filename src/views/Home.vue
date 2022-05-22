<template>
  <div id="home"> 
    <div class="container">
      <!-- App info card -->
      <div class="row pt-1">
        <div class="col-12">
          <h3 class="title">{{ $t('home.aboutUs') }}</h3>
        </div>
        <div class="col-12">
          <div class="app-info">
            <div class="display-logo">
              <img src="/img/logo.svg" alt="Playliter logo">
            </div>
            <div class="display-info">
              <h4 class="text-uppercase">{{ $t('appname') }}</h4>
              <p class="mb-0">{{ $t('description') }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Next presentation list -->
      <div class="row pt-3">
        <div class="col-12">
          <h3 class="title">
            {{ $t('home.nextPresentations') }}
          </h3>
        </div>
        <div class="col-12">
          <div v-if="!showLoading">
            <ul v-if="pending.length > 0" class="list">
              <li
                class="item"
                v-for="(s, i) in pending"
                :key="i"
                @click="viewShow(s)"
              >
                <div class="icon">
                  <div class="show-img">
                    <img :src="`/img/arts/white/concert.svg`" />
                  </div>
                </div>
                <div class="show-info">
                  <p class="mb-0">
                    <strong class="show-title text-capitalize">
                      {{ s.title }}
                    </strong>
                  </p>
                  <p class="mb-0 text-secondary-light">
                    <strong>{{ s.band.title }}</strong>
                  </p>
                  <span>
                    {{ $t('home.date') }} <strong>{{ $text.formatISODate(s.date) }}</strong> 
                  </span>
                </div>
              </li>
            </ul>
            <div class="feedback" v-else>
              <p class="mb-0">
                {{ $t('home.noPresentations') }}
              </p>
            </div>
          </div>
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
      <!-- Band invites list -->
      <div v-if="hasPendingInvites" class="row pt-3">
        <div class="col-12">
          <h3 class="title">
            {{ $t('home.pendingInvites') }}
          </h3>
        </div>
        <div class="col-12">
          <ul class="invites">
            <li
              v-for="(inv, i) in invites"
              :key="i"
              class="invite"
              @click="respondPendingInvite(inv)"
            >
              <div class="icon">
                <div class="invite-img">
                  <img :src="`/img/arts/white/guitarist.svg`" />
                </div>
              </div>
              <div class="info">
                <p class="mb-0">{{ inv.band.title }}</p>
                <span>{{ $t('home.invitedAt') }} <span class="text-secondary-light">{{ $text.formatISODate(inv.createdAt) }}</span></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Version manager -->
      <div class="row">
        <div class="col-12">
          <p class="text-center">
            {{ $t('home.version') }} <strong class="text-secondary-light">2.5.0</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/home.js"></script>
