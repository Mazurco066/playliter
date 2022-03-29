<template>
  <div id="directory">
  
    <!-- Main container --->
    <div class="container">
      <div class="row pt-3">
        <!-- Adicionar categoria -->
        <div class="col-12">
          <div class="info-card">
            <base-button
              nativeType="button"
              type="primary"
              class="mb-3"
              @click="navigateToCategories()"
            >
              Gerenciar categorias
            </base-button>

            <base-button
              nativeType="button"
              type="secondary"
              @click="saveSong()"
            >
              Nova música
            </base-button>
          </div>
        </div>
        <!-- Lista do repertório -->
        <div class="col-12">
          <div class="info-card">
            <h3 class="title">Repertório completo</h3>
            <div v-if="!songLoading">
              <p class="mb-3">Contendo <strong>{{ repertory.numberOfItems }}</strong> músicas.</p>
              <base-input
                name="search"
                placeholder="Pesquisar música..."
                v-model="search"
                noMargin
              />
            </div>
            <lines v-else class="shine"></lines>
          </div>
          <div class="info">
            <!-- Categories list -->
            <ul v-if="!songLoading" class="categories">
              <li v-for="(s, i) in filteredRepertorySongs" :key="i" class="category">
                <div class="content">
                  <p class="text-uppercase mb-0">
                    <strong>{{ s.category.title }}</strong>
                  </p>
                  <span class="description">
                    {{ s.category.description }}
                  </span>
                  <div class="counter">
                    {{ s.numberOfItems }} Música(s)
                  </div>
                </div>
                <ul class="songs">
                  <li
                    @click="navigateTo('song', s1.band.id, s1.id)"
                    v-for="(s1, idx) in s.items"
                    :key="idx"
                    class="song"
                  >
                    <div class="content">
                      <div class="icon mr-3">
                        <div class="song-img">
                          <img :src="`/img/arts/01.png`" />
                        </div>
                      </div>
                      <div class="song-info">
                        <p class="mb-0">
                          <strong>{{ s1.title }}</strong>
                        </p>
                        <span>{{ s1.writter }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <!-- Loading shimmer -->
            <ul v-else class="categories">
              <li class="category">
                <div class="content">
                  <p class="text-uppercase mb-0">
                    <lines class="shine"></lines>
                  </p>
                  <span class="description">
                    <lines class="shine"></lines>
                  </span>
                </div>
                <ul class="songs">
                  <li class="song">
                    <div class="content">
                      <div class="icon mr-3">
                        <photo class="shine"></photo>
                      </div>
                      <div class="song-info">
                        <p class="mb-0">
                          <lines class="shine"></lines>
                        </p>
                        <lines class="shine"></lines>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./js/directory.js"></script>
