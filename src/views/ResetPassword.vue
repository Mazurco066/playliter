<template>
  <div id="reset-password">
    <div class="container">
      <!-- Forgot password component -->
      <div class="auth-wrapper">
        <div class="logo">
          <img src="/img/logo.svg" alt="Playliter logo">
        </div>
        <div class="row pt-3">
          <div class="col-12">
            <h4 class="title text-white">{{ $t('resetPassword.title') }}</h4>
            <p class="mb-3">{{ $t('resetPassword.subtitle') }}</p>
          </div>
        </div>
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-12">
              <base-input
                type="password"
                :label="$t('resetPassword.passwordLabel')"
                :placeholder="$t('resetPassword.passwordField')"
                addonLeftIcon="key"
                v-model="v$.form.password.$model"
                :valid="!v$.form.password.$error"
                :error="v$.form.password.$errors.length ? $translations.translateMessage(v$.form.password.$errors[0].$message) : ''"
                :disabled="authLoading"
              />
            </div>
            <div class="col-12">
              <base-input
                type="password"
                :label="$t('resetPassword.confirmLabel')"
                :placeholder="$t('resetPassword.confirmField')"
                addonLeftIcon="key"
                v-model="v$.form.confirmPassword.$model"
                :valid="!v$.form.confirmPassword.$error"
                :error="v$.form.confirmPassword.$errors.length ? $translations.translateMessage(v$.form.confirmPassword.$errors[0].$message) : ''"
                :disabled="authLoading"
              />
            </div>
            <div class="col-12">
              <div class="auth-link d-flex justify-content-center align-items-center mb-3">
                <router-link to="signIn" class="forgot-password">
                  {{ $t('resetPassword.hasAccount') }}
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
                {{ $t('resetPassword.submit') }}
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

<script src="./js/resetPassword.js"></script>
