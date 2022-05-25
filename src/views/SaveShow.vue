<template>
  <div id="saveShow">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3 class="title">
            {{ saveMode ? $t('saveShow.createTitle') : $t('saveShow.updateTitle') }}
          </h3>
          <p class="mb-3">
            {{ saveMode ? $t('saveShow.createSubtitle') : $t('saveShow.updateSubtitle') }}
          </p>
        </div>
      </div>
      <form class="info" @submit.prevent="createShow">
        <div class="row">
          <div class="col-12">
            <base-input
              type="text"
              :label="$t('saveShow.nameLabel')"
              :placeholder="$t('saveShow.nameField')"
              addonLeftIcon="address-card"
              v-model="v$.form.title.$model"
              :valid="!v$.form.title.$error"
              :error="v$.form.title.$errors.length ? $translations.translateMessage(v$.form.title.$errors[0].$message) : ''"
              :disabled="showLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="text"
              :label="$t('saveShow.descriptionLabel')"
              :placeholder="$t('saveShow.descriptionField')"
              addonLeftIcon="align-justify"
              v-model="v$.form.description.$model"
              :valid="!v$.form.description.$error"
              :error="v$.form.description.$errors.length ? $translations.translateMessage(v$.form.description.$errors[0].$message) : ''"
              :disabled="showLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="date"
              :label="$t('saveShow.dateLabel')"
              placeholder="DD/MM/YYYY"
              addonLeftIcon="calendar"
              v-model="v$.form.date.$model"
              :valid="!v$.form.date.$error"
              :error="v$.form.date.$errors.length ? $translations.translateMessage(v$.form.date.$errors[0].$message) : ''"
              :disabled="showLoading"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12" >
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || showLoading"
            >
              {{ $t('saveShow.submit') }}
            </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/saveShow.js"></script>
