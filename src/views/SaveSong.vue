<template>
  <div id="saveSong">
    <div class="container pt-3">
      <div class="row">
        <div class="col-12">
          <h3 class="klasik">Salvar Musica</h3>
        </div>
      </div>
      <form class="info" @submit.prevent="createSong">
        <div class="row">
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
          <div class="col-12 mb-3">
            <p class="custom-label">
              Corpo da música (Digite a letra com as cifras)
            </p>
            <base-editor
              id="songEditor"
              v-if="showTipTap"
              v-model="song"
            />
          </div>
          <div class="col-12">
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || songLoading"
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
