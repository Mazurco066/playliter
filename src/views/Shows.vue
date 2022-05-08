<template>
  <div id="shows"> 
    <div class="container ">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <h3 class="title mt-3">
            Apresentações
          </h3>
          <p class="mt-3">
            Apresentações registradas para a banda performar.
          </p>
        </div>
      </div>
      <div class="row mb-3 secondary-section">
        <div class="col-12">
          <base-button
            nativeType="button"
            type="primary"
            class="mt-3 mb-3"
            @click="saveShow()"
          >
            Adicionar Apresentação
          </base-button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <!-- Pending shows -->
          <div>
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
              <div v-else class="no-shows">
                <div class="icon">
                  <img src="/img/arts/not_found.svg" alt="No content">
                </div>
                <p class="mb-3 text-center">
                  <strong>
                    Essa banda não possuí apresentações cadastradas!
                  </strong>
                </p>
              </div>
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
      </div>
    </div>
  </div>
</template>

<script src="./js/shows.js"></script>
