<template>
  <div id="saveShow">
    <div class="container">
      <div class="row pt-3 primary-section">
        <div class="col-12">
          <h3 class="title mt-3">
            {{ saveMode ? 'Criar nova apresentacao' : 'Editar apresentacao' }}
          </h3>
          <p class="mb-3">
            {{ saveMode ? 'Salvar nova apresentação.' : 'Alterar os dados de uma apresentação cadastrada.' }}
          </p>
        </div>
      </div>
      <form class="info" @submit.prevent="createShow">
        <div class="row secondary-section pt-3 pb-3 mb-3">
          <div class="col-12">
            <p class="text-left">1. Primeiramente informe um <strong>título</strong> para sua apresentação:</p>
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
          <div class="col-12" :class="{ 'd-none': v$.form.title.$error || !form.title }">
            <p class="text-left">2. Agora forneça uma breve <strong>descrição</strong> sobre a mesma:</p>
          </div>
          <div class="col-12" :class="{ 'd-none': v$.form.title.$error || !form.title }">
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
        </div>
        <div class="row">
          <div class="col-12" >
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || showLoading"
              class="mb-3"
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
