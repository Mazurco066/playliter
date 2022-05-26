<template>
  <div id="sign-in">
    <div class="container">
      <div class="auth-wrapper">
        <div class="logo">
          <img src="/img/logo.svg" alt="Playliter logo">
        </div>
        <div class="row pt-3">
          <div class="col-12">
            <h4 class="title text-white">{{ $t('signin.title') }}</h4>
          </div>
        </div>
        <form @submit.prevent="authenticate">
          <div class="row">
            <div class="col-12">
              <base-input
                label="Username"
                type="text"
                :placeholder="$t('signin.userField')"
                addonLeftIcon="user"
                v-model="v$.form.username.$model"
                :valid="!v$.form.username.$error"
                :error="v$.form.username.$errors.length ? $translations.translateMessage(v$.form.username.$errors[0].$message) : ''"
                :disabled="authLoading"
              />
            </div>
            <div class="col-12">
              <base-input
                label="Password"
                type="password"
                :placeholder="$t('signin.passwordField')"
                addonLeftIcon="key"
                v-model="v$.form.password.$model"
                :valid="!v$.form.password.$error"
                :error="v$.form.password.$errors.length ? $translations.translateMessage(v$.form.password.$errors[0].$message) : ''"
                :disabled="authLoading"
              />
            </div>
            <!-- TODO: Implement forgot password -->
            <div class="col-12">
              <div class="auth-link d-flex justify-content-center align-items-center mb-3">
                <router-link to="forgotPassword" class="forgot-password">
                  {{ $t('signin.forgotPasword') }}
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
                {{ $t('signin.submit') }}
              </base-button>
            </div>
            <!-- Go to signup -->
            <div class="col-12">
              <div class="d-flex justify-content-center align-items-center mb-3">
                <span>{{ $t('signin.pageLabel') }}</span>&nbsp;
                <router-link to="signup" class="auth-action text-secondary-light">
                  {{ $t('signin.pageLink') }}
                </router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- Version manager -->
      <div class="row">
        <div class="col-12">
          <p class="text-center">
            {{ $t('home.version') }} <strong class="text-secondary-light">3.0.1</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/signIn.js"></script>
