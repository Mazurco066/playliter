<template>
  <div id="verify-account" class="pt-3">
    <div class="container">
      <div class="col-12 text-center">
        <h3 class="title">{{ $t('verifyAccount.title') }}</h3>
       </div>
       <div class="col-12">
          <div class="art">
            <img src="/img/arts/email.svg" alt="E-mail art">
          </div>
       </div>
      <div class="col-12 pt-3 mb-4">
        <div class="info">
          <p class="text-center mb-0">
            {{ $t('verifyAccount.subtitle') }} <strong class="text-secondary-light">{{ me.email }}</strong>
          </p>
          <code-input
            @complete="onComplete"
            :fields="4"
            :fieldWidth="56"
            :fieldHeight="56"
            :required="true"
            :disabled="accountLoading"
          />
          <p class="text-center mb-0">
            {{ $t('verifyAccount.resendLabel') }} <strong class="text-secondary-light">{{ $t('verifyAccount.resendLink') }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/verifyAccount.js"></script>
