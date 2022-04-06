<template>
  <header id="header">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="app-bar">
            <div class="app">
              <div class="back" @click="goBack()">
                <font-awesome-icon icon="chevron-left" size="2x" />
              </div>
              <div class="info">
                <p class="mb-0">Bem vindo ao <strong>Playliter</strong>!</p>
                <span>
                  <strong>
                    {{ $text.truncate(me.name || '', 18) }}
                  </strong>
                </span>
              </div>
              <div class="logo">
                <img src="/img/logo_only.png" alt="Playliter logo">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script src="./js/appBar.js"></script>
