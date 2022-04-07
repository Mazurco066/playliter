<template>
  <div id="sign-in">
    <div class="container">
      <div class="row pt-3">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div class="app-logo">
            <img src="/img/logo.svg" alt="Playliter logo" />
          </div>
        </div>
        <div class="col-12 text-center">
          <h4 class="mb-3 text-uppercase text-white">Autenticação</h4>
        </div>
      </div>
      <form @submit.prevent="authenticate">
        <div class="row">
          <div class="col-12">
            <base-input
              type="text"
              placeholder="Entre com seu usuário"
              addonLeftIcon="user"
              v-model="v$.form.username.$model"
              :valid="!v$.form.username.$error"
              :error="v$.form.username.$errors.length ? $translations.translateMessage(v$.form.username.$errors[0].$message) : ''"
              :disabled="authLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="password"
              placeholder="Agora digite sua senha"
              addonLeftIcon="key"
              v-model="v$.form.password.$model"
              :valid="!v$.form.password.$error"
              :error="v$.form.password.$errors.length ? $translations.translateMessage(v$.form.password.$errors[0].$message) : ''"
              :disabled="authLoading"
            />
          </div>
          <div class="col-12">
            <div class="auth-link d-flex justify-content-end align-items-center mb-3">
              <router-link to="forgotPassword" class="forgot-password">
                Esqueci minha senha
              </router-link>
            </div>
          </div>
          <div class="col-12">
            <base-button
              class="mb-3"
              nativeType="submit"
              type="alt"
              :disabled="v$.$error === true || authLoading"
            >
              Acessar
            </base-button>
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-center align-items-center mb-3">
              <span>Não possúi conta?</span>&nbsp;
              <router-link to="signup" class="auth-action">
                Criar uma agora!
              </router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/signIn.js"></script>
