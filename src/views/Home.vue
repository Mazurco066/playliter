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
              <h3 class="klasik">Playliter</h3>
              <p class="mb-3">
                App desenvolvido no intuíto de facilitar o gerenciamento do repertório de uma banda.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3 secondary-section pb-3 mb-3">
        <div class="col-12">
          <h3 class="title mb-3 mt-3">
            Proximas apresentações
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
                    Data: {{ $text.formatISODate(s.date) }} 
                  </span>
                </div>
              </li>
            </ul>
            <p v-else class="mb-0">
              Não há apresentações futuras registradas nas bandas que você participa!
            </p>
          </div>
          <!-- Shimmer list -->
          <div v-else>
            <ul class="list">
              <li class="item">
                <div class="icon mr-3">
                  <photo class="shine"></photo>
                </div>
                <div class="show-info">
                  <p class="title">
                    <lines class="shine"></lines>
                  </p>
                  <lines class="shine"></lines>
                </div>
                <div class="actions"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p class="text-center">
            Versão: <strong>2.1.1</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/home.js"></script>
