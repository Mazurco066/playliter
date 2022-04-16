<template>
  <div id="saveSong">
    <div class="container">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <h3 class="title mt-3">
            Salvar música
          </h3>
          <p class="mb-3">
            Salvar os dados referentes a uma música.
          </p>
        </div>
      </div>
      <form class="info" @submit.prevent="createSong">
        <div class="row secondary-section pt-3 mb-3">
          <div class="col-12">
            <base-input
              type="text"
              label="Título de música"
              placeholder="Título de música"
              addonLeftIcon="music"
              v-model="v$.form.title.$model"
              :valid="!v$.form.title.$error"
              :error="v$.form.title.$errors.length ? $translations.translateMessage(v$.form.title.$errors[0].$message) : ''"
              :disabled="songLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="text"
              label="Autor de música"
              placeholder="Autor de música"
              addonLeftIcon="microphone-alt"
              v-model="v$.form.writter.$model"
              :valid="!v$.form.writter.$error"
              :error="v$.form.writter.$errors.length ? $translations.translateMessage(v$.form.writter.$errors[0].$message) : ''"
              :disabled="songLoading"
            />
          </div>
          <div class="col-12">
            <base-select
              addon-left-icon="volume-up"
              label="Tom inicial da música"
              defaultOption="Tom inicial da música"
              :options="tones"
              :disabled="songLoading"
              v-model="v$.form.tone.$model"
              :valid="!v$.form.tone.$error"
              :error="v$.form.tone.$errors.length ? $translations.translateMessage(v$.form.tone.$errors[0].$message) : ''"
            />
          </div>
          <div class="col-12">
            <base-select
              addon-left-icon="compact-disc"
              label="Categoria da música"
              defaultOption="Categoria da música"
              :options="mappedCategories"
              :disabled="songLoading"
              v-model="v$.form.category.$model"
              :valid="!v$.form.category.$error"
              :error="v$.form.category.$errors.length ? $translations.translateMessage(v$.form.category.$errors[0].$message) : ''"
            />
          </div>
          <div class="col-10">
            <base-input
              type="text"
              label="Importar música"
              placeholder="Importar música"
              addonLeftIcon="file-import"
              v-model="v$.form.importUrl.$model"
              :valid="!v$.form.importUrl.$error"
              :error="v$.form.importUrl.$errors.length ? $translations.translateMessage(v$.form.importUrl.$errors[0].$message) : ''"
              :disabled="songLoading"
            />
          </div>
          <div class="col-2 pt-2 pl-0">
            <button
              type="button"
              class="import-btn"
              @click="importExternalSong()"
              :disabled="songLoading"
            >
              <font-awesome-icon icon="check" />
            </button>
          </div>
          <div class="col-12 mb-3">
            <p class="custom-label">
              Corpo da música (Digite a letra com as cifras)
            </p>
            <!-- <base-editor
              id="songEditor"
              v-if="showTipTap"
              v-model="song"
            /> -->
            <!-- eslint-disable vue/no-v-model-argument -->
            <v-ace-editor
              lang="chordpro"
              v-model:value="song"
              theme="clouds"
              style="height: 300px"
              :print-margin="false"
              :options="{fontSize: '0.9rem'}"
              @init="setupEditor"
              @paste="paste"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || songLoading"
              class="mb-3"
            >
              Salvar música
            </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/saveSong.js"></script>
