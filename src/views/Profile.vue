<template>
  <div id="profile">
  
    <!-- Page main content -->
    <div class="container">
      <div class="row pt-3 primary-section ">
        <div class="col-12">
          <h3 class="klasik">{{ $t('profile.title') }}</h3>
          <p class="mb-3">{{ $t('profile.subtitle') }}</p>
        </div>
      </div>
      <form @submit.prevent="saveProfile">
        <div class="row secondary-section mb-3">
          <div class="col-12 pt-3">
            <div class="avatar">
              <div class="icon">
                <img src="/img/arts/face-recognition.png" alt="Sample user">
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12">
            <base-input
              type="text"
              :label="$t('profile.nameField')"
              :placeholder="$t('profile.nameField')"
              addonLeftIcon="address-card"
              v-model="v$.form.name.$model"
              :valid="!v$.form.name.$error"
              :error="v$.form.name.$errors.length ? $translations.translateMessage(v$.form.name.$errors[0].$message) : ''"
              :disabled="accountLoading"
            />
          </div>
          <div class="col-12">
            <base-input
              type="text"
              addonLeftIcon="user"
              :label="$t('profile.userField')"
              :placeholder="$t('profile.userField')"
              v-model="me.username"
              disabled
            />
          </div>
          <div class="col-12">
            <base-input
              type="text"
              addonLeftIcon="mobile"
              :label="$t('profile.accessField')"
              :placeholder="$t('profile.accessField')"
              :value="me.role === 'player' ? $t('profile.musician') : $t('profile.admin')"
              disabled
            />
          </div>
          <div class="col-12 mb-3 text-center">
            <span>
              {{ $t('profile.createdAt') }} <strong>{{ $text.formatISODate(new Date(parseInt(me.createdAt)).toISOString()) }}</strong>
            </span>
          </div>
          <div class="col-12 mb-3">
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || accountLoading"
            >
              {{ $t('profile.submit') }}
            </base-button>
          </div>
          <div class="col-12">
            <base-button
              nativeType="button"
              type="danger"
              :disabled="accountLoading"
              @click="logout()"
            >
              {{ $t('profile.logoff') }}
            </base-button>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script src="./js/profile.js"></script>
