<template>
  <div id="saveShow">
    <div class="container pt-3">
      <div class="row">
        <div class="col-12">
          <h3 class="klasik"> {{ saveMode ? 'Criar nova apresentacao' : 'Editar apresentacao' }}</h3>
        </div>
      </div>
      <form class="info" @submit.prevent="createShow">
        <div class="row">
          <div class="col-12">
            <p class="text-justify">Primeiramente informe um <strong>nome</strong> para sua apresentação:</p>
          </div>
          <div class="col-12">
            <base-input
              type="text"
              placeholder="Nome para a apresentação"
              addonLeftIcon="address-card"
              v-model="v$.form.title.$model"
              :valid="!v$.form.title.$error"
              :error="v$.form.title.$errors.length ? $translations.translateMessage(v$.form.title.$errors[0].$message) : ''"
              :disabled="showLoading"
            />
          </div>
          <div class="col-12" :class="{ 'd-none': v$.form.title.$error }">
            <p class="text-justify">Agora forneça uma breve <strong>descrição</strong> sobre a mesma:</p>
          </div>
          <div class="col-12" :class="{ 'd-none': v$.form.title.$error }">
            <base-input
              type="text"
              placeholder="Breve descrição..."
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
              label="Data"
              placeholder="DD/MM/YYYY"
              addonLeftIcon="calendar"
              v-model="v$.form.date.$model"
              :valid="!v$.form.date.$error"
              :error="v$.form.date.$errors.length ? $translations.translateMessage(v$.form.date.$errors[0].$message) : ''"
              :disabled="showLoading"
            />
          </div>
          <div class="col-12" >
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || showLoading"
            >
              Salvar apresentação
            </base-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/saveShow.js"></script>
