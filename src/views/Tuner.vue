<template>
  <div id="tuner-page" class="container">
    <div class="row">
      <div class="col-12">
        <h3 class="title">{{ $t('tuner.title') }}</h3>
        <p class="mb-0">{{ $t('tuner.subtitle') }}</p>
      </div>
      <div class="col-12">
        <web-tuner />
      </div>
    </div>
  </div>
</template>

<script src="./js/tuner.js"></script>
