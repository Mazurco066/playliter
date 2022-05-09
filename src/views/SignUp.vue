<template>
  <div id="sign-up">
    <div class="container">
      <div class="row pt-3">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div class="app-logo">
            <img src="/img/logo.svg" alt="Playliter logo" />
          </div>
        </div>
        <div class="col-12 text-center">
          <h4 class="mb-3 text-uppercase text-white">{{ $t('signup.title') }}</h4>
        </div>
      </div>
      <form @submit.prevent="register">
        <div class="row">
          <div class="col-12">
            <base-input
              type="text"
              :label="$t('signup.nameLabel')"
              :placeholder="$t('signup.nameField')"
              addonLeftIcon="user"
              v-model="v$.form.name.$model"
              :valid="!v$.form.name.$error"
              :error="v$.form.name.$errors.length ? $translations.translateMessage(v$.form.name.$errors[0].$message) : ''"
              :disabled="authLoading || accountLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="text"
              :label="$t('signup.userLabel')"
              :placeholder="$t('signup.userField')"
              addonLeftIcon="user"
              v-model="v$.form.username.$model"
              :valid="!v$.form.username.$error"
              :error="v$.form.username.$errors.length ? $translations.translateMessage(v$.form.username.$errors[0].$message) : ''"
              :disabled="authLoading || accountLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="password"
              :label="$t('signup.passwordLabel')"
              :placeholder="$t('signup.passwordField')"
              addonLeftIcon="key"
              v-model="v$.form.password.$model"
              :valid="!v$.form.password.$error"
              :error="v$.form.password.$errors.length ? $translations.translateMessage(v$.form.password.$errors[0].$message) : ''"
              :disabled="authLoading || accountLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="password"
              :label="$t('signup.confirmLabel')"
              :placeholder="$t('signup.confirmField')"
              addonLeftIcon="key"
              v-model="v$.form.confirmPassword.$model"
              :valid="!v$.form.confirmPassword.$error"
              :error="v$.form.confirmPassword.$errors.length ? $translations.translateMessage(v$.form.confirmPassword.$errors[0].$message) : ''"
              :disabled="authLoading || accountLoading"
            />
          </div>
          <div class="col-12">
            <base-button
              class="mb-3"
              nativeType="submit"
              type="alt"
              :disabled="v$.$error === true || authLoading || accountLoading"
            >
              {{ $t('signup.submit') }}
            </base-button>
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-center align-items-center mb-3">
              <span>{{ $t('signup.pageLabel') }}</span>&nbsp;
              <router-link to="signin" class="auth-action">
                {{ $t('signup.pageLink') }}
              </router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/signup.js"></script>
