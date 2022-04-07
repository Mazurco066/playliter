<template>
  <div id="categories">

     <!-- Main container --->
    <div class="container">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <h3 class="title mt-3">Categorias</h3>
          <p class="mt-3">
            Categorias registradas para a banda selecionada.
          </p>
        </div>
      </div>
      <div class="row secondary-section mb-3">
        <div class="col-12">
          <base-button
            nativeType="button"
            type="primary"
            class="mt-3 mb-3"
            @click="openCategoryModal()"
          >
            Adicionar Categoria
          </base-button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div v-if="isDisplayReady">
            <ul v-if="categories.length > 0" class="categories">
              <li
                v-for="(c, i) in categories"
                :key="i"
                class="category"
                @click="openCategoryModal(c)"
              >
                <div class="category-info">
                  <p class="mb-0">
                      <strong>{{ c.title }}</strong>
                  </p>
                  <span>
                    {{ c.description }}
                  </span>
                </div>
                <div class="category-actions">

                </div>
              </li>
            </ul>
            <div v-else class="no-categories">
              <div class="icon">
                <img src="/img/arts/not_found.svg" alt="No content">
              </div>
              <p class="mb-3 text-center">
                <strong>
                  Essa banda não possuí categorias cadastradas!
                </strong>
              </p>
            </div>
          </div>
          <div v-else>
            <ul class="categories">
              <li class="category">
                <div class="category-info">
                  <p class="mb-0">
                    <lines class="shine"></lines>
                  </p>
                  <span>
                    <lines class="shine"></lines>
                  </span>
                </div>
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
                class="mb-3"
              >
                Salvar categoria
              </base-button>
              <base-button
                nativeType="button"
                type="danger"
                :disabled="songLoading"
                @click="removeCategory(catId)"
              >
                Remover Categoria
              </base-button>
            </div>
          </div>
        </form>
      </div>
    </base-modal>

  </div>
</template>

<script src="./js/categories.js"></script>
