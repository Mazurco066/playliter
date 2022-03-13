<template>
  <div id="shows"> 
    <div class="container pt-3">
      <div class="row">
        <div class="col-12">
          <!-- Pending shows -->
          <div class="info">
            <h3 class="title">
              Apresentações (Banda)
            </h3>
            <hr />
            <div v-if="!showLoading">
              <ul v-if="shows.length > 0" class="list">
                <li
                  class="item"
                  v-for="(s, i) in shows"
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
                      <strong class="text-primary text-uppercase">{{ s.title }}</strong>
                    </p>
                    <p class="mb-0">
                      <strong>{{ s.description }}</strong>
                    </p>
                    <span>
                      Data: {{ $text.formatISODate(s.date) }} 
                    </span>
                  </div>
                </li>
              </ul>
              <p v-else class="mb-0">
                Não há apresentações registradas nessa banda atualmente!
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
      </div>
    </div>
  </div>
</template>

<script src="./js/shows.js"></script>
