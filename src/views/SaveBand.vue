<template>
  <div id="saveBand">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3 class="title">
            {{ saveMode ? $t('saveBand.createTitle') : $t('saveBand.updateTitle') }}
          </h3>
          <p class="mb-3">
            {{ saveMode ? $t('saveBand.createSubtitle') : $t('saveBand.updateSubtitle') }}
          </p>
        </div>
      </div>
      <form class="info" @submit.prevent="createBand">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <base-input
                  type="text"
                  :label="$t('saveBand.nameLabel')"
                  :placeholder="$t('saveBand.nameField')"
                  addonLeftIcon="address-card"
                  v-model="v$.form.title.$model"
                  :valid="!v$.form.title.$error"
                  :error="v$.form.title.$errors.length ? $translations.translateMessage(v$.form.title.$errors[0].$message) : ''"
                  :disabled="bandLoading"
                />
              </div>
              <div class="col-12">
                <base-input
                  type="text"
                  :label="$t('saveBand.descriptionLabel')"
                  :placeholder="$t('saveBand.descriptionField')"
                  addonLeftIcon="align-justify"
                  v-model="v$.form.description.$model"
                  :valid="!v$.form.description.$error"
                  :error="v$.form.description.$errors.length ? $translations.translateMessage(v$.form.description.$errors[0].$message) : ''"
                  :disabled="bandLoading"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12" >
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || bandLoading"
            >
              {{ $t('saveBand.submit') }}
            </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/saveBand.js"></script>
