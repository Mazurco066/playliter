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
              @click="openCategoryModal()"
            >
              Adicionar Categoria
            </base-button>
          </div>
        </div>
        <!-- Lista do repertório -->
        <div class="col-12">
          <div class="info-card">
            <h3 class="title">Repertório completo</h3>
            <p v-if="!songLoading" class="mb-0">Contendo <strong>{{ repertory.numberOfItems }}</strong> músicas.</p>
            <lines v-else class="shine"></lines>
          </div>
          <div class="info">
            <!-- Categories list -->
            <ul v-if="!songLoading" class="categories">
              <li v-for="(s, i) in repertory.songs" :key="i" class="category">
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

    <!-- Category form modal -->
    <base-modal @close="closeCategoryModal" :show="isCategoryModalOpen">
      <slot name="header">
        <button
          @click="closeCategoryModal"
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
              <h4>Categorias</h4>
              <p>Salvar categoria</p>
            </div>
          </div>
        </div>
      </slot>
      <div class="container">
        <form @submit.prevent="submitCategory">
          <div class="row">
            <div class="col-12">
              <base-input
                type="text"
                label="Título da categoria"
                placeholder="Título da categoria"
                addonLeftIcon="tag"
                v-model="v$.form.title.$model"
                :valid="!v$.form.title.$error"
                :error="v$.form.title.$errors.length ? $translations.translateMessage(v$.form.title.$errors[0].$message) : ''"
                :disabled="songLoading"
              />
            </div>
            <div class="col-12">
              <base-input
                type="text"
                label="Descrição da categoria"
                placeholder="Descrição da categoria"
                addonLeftIcon="hashtag"
                v-model="v$.form.description.$model"
                :valid="!v$.form.description.$error"
                :error="v$.form.description.$errors.length ? $translations.translateMessage(v$.form.description.$errors[0].$message) : ''"
                :disabled="songLoading"  
              />
            </div>
            <div class="col-12">
              <base-button
                nativeType="submit"
                type="primary"
                :disabled="v$.$error === true || songLoading"
              >
                Salvar categoria
              </base-button>
            </div>
          </div>
        </form>
      </div>
    </base-modal>

  </div>
</template>

<script src="./js/directory.js"></script>
