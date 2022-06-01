<template>
  <div id="forgot-password">
    <div class="container">
      <!-- Forgot password component -->
      <div class="auth-wrapper">
        <div class="logo">
          <img src="/img/logo.svg" alt="Playliter logo">
        </div>
        <div class="row pt-3">
          <div class="col-12">
            <h4 class="title text-white">{{ $t('forgotPassword.title') }}</h4>
            <p class="mb-3">{{ $t('forgotPassword.subtitle') }}</p>
          </div>
        </div>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-12">
              <base-input
                :label="$t('forgotPassword.emailLabel')"
                type="text"
                :placeholder="$t('forgotPassword.emailField')"
                addonLeftIcon="user"
                v-model="v$.form.email.$model"
                :valid="!v$.form.email.$error"
                :error="v$.form.email.$errors.length ? $translations.translateMessage(v$.form.email.$errors[0].$message) : ''"
                :disabled="authLoading"
              />
            </div>
            <div class="col-12">
              <div class="auth-link d-flex justify-content-center align-items-center mb-3">
                <router-link to="signIn" class="forgot-password">
                  {{ $t('forgotPassword.hasAccount') }}
                </router-link>
              </div>
            </div>
            <div class="col-12">
              <base-button
                class="mb-3"
                nativeType="submit"
                type="primary"
                :disabled="v$.$error === true || authLoading"
              >
                {{ $t('forgotPassword.submit') }}
              </base-button>
            </div>
          </div>
        </form>
      </div>
      <!-- Version manager -->
      <div class="row">
        <div class="col-12">
          <p class="text-center">
            {{ $t('home.version') }} <strong class="text-secondary-light">{{ appVersion }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/forgotPassword.js"></script>
