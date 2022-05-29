<template>
  <div id="profile">
    <!-- Page main content -->
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3 class="klasik">{{ $t('profile.title') }}</h3>
          <div class="info">
            <p class="mb-1">
              <strong>{{ $t('profile.notice') }}</strong>
            </p>
            <p class="mb-0" v-html="$t('profile.subtitle')"/>
          </div>
        </div>
      </div>
      <form class="profile-form" @submit.prevent="saveProfile">
        <!-- TODO: Implement picture update -->
        <div class="avatar">
          <div class="image-container">
            <div class="avatar-img">
              <img
                :src="form.avatar ? form.avatar : '/img/j_black.jpg'"
                alt="Avatar"
              />
            </div>
            <button type="button">
              <label for="newProfilePhoto" class="upload-file-block mb-0">
                <font-awesome-icon icon="camera" />
              </label>
              <input
                @change="uploadImage($event)"
                :disabled="isImageUploading"
                class="uploadProfileInput"
                type="file"
                name="profile_pic"
                id="newProfilePhoto"
                accept="image/*"
                style="display: none;"
              />
            </button>
          </div>
        </div>
        <div class="row">
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
              :label="$t('profile.emailField')"
              :placeholder="$t('profile.emailField')"
              addonLeftIcon="envelope"
              v-model="v$.form.email.$model"
              :valid="!v$.form.email.$error"
              :error="v$.form.email.$errors.length ? $translations.translateMessage(v$.form.email.$errors[0].$message) : ''"
              :disabled="accountLoading"
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
          <div class="col-12 mb-3">
            <base-button
              nativeType="submit"
              type="primary"
              :disabled="v$.$error === true || accountLoading"
            >
              {{ $t('profile.submit') }}
            </base-button>
          </div>
          <div class="col-12 mb-3">
            <base-button
              nativeType="button"
              type="danger"
              :disabled="accountLoading"
              @click="logout()"
            >
              {{ $t('profile.logoff') }}
            </base-button>
          </div>
          <div class="col-12 text-center">
            <span>
              {{ $t('profile.createdAt') }} <strong>{{ $text.formatISODate(new Date(parseInt(me.createdAt)).toISOString()) }}</strong>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./js/profile.js"></script>
