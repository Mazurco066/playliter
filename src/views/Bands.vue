<template>
  <div id="bands">
  
    <!-- Page main content -->
    <div class="container">
      <div class="row pt-3 primary-section mb-3">
        <div class="col-12">
          <h3 class="klasik">{{ $t('bands.title') }}</h3>
          <p class="mb-3">{{ $t('bands.subtitle') }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <!-- Bands list -->
          <div v-if="!bandLoading">
            <ul class="list" v-if="bands.length > 0">
              <li class="item" v-for="(b, i) in bands" :key="i">
                <div class="icon mr-3" @click="navigateTo('band', b.id)">
                  <div class="band-img">
                    <img :src="`/img/arts/${randomIcon()}`" />
                  </div>
                </div>
                <div class="info" @click="navigateTo('band', b.id)">
                  <p class="title">{{ $text.truncate(b.title, 23) }}</p>
                  <span class="sub">
                    {{ 
                      b.owner.id === me.id 
                        ? $t('bands.founder') 
                        : b.admins.find(a => a.id === me.id) 
                          ? $t('bands.admin') 
                          : $t('bands.member') 
                    }}
                  </span>
                </div>
                <div class="actions">
                  <base-dropdown class="dropdown" position="right">
                    <template v-slot:title>
                      <a
                        class="btn btn-sm btn-icon-only"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <font-awesome-icon icon="ellipsis-v" />
                      </a>
                    </template>
                    <a href="#" class="dropdown-item" @click.prevent="editBand(b)">
                      <font-awesome-icon icon="edit" class="mr-1" /> {{ $t('bands.editAction') }}
                    </a>
                    <a href="#" class="dropdown-item" @click.prevent="deleteBand(b)">
                      <font-awesome-icon icon="trash" class="mr-1" /> {{ $t('bands.removeAction') }}
                    </a>
                  </base-dropdown>
                </div>
              </li>
            </ul>
            <!-- TODO: Add svg art here -->
            <div v-else class="no-bands">
              <div class="icon">
                <img src="/img/arts/not_found.svg" alt="No content">
              </div>
              <p class="mb-3 text-center">
                <strong>
                  {{ $t('bands.noBands') }}
                </strong>
              </p>
            </div>
          </div>
          <!-- Loading Shimmer -->
          <div v-else>
            <ul class="list">
              <li class="item">
                <div class="icon mr-3">
                  <div class="shine shimmer-photo"></div>
                </div>
                <div class="info">
                  <p class="title">
                    <span class="shine shimmer-lines"></span>
                  </p>
                  <div class="shine shimmer-lines"></div>
                </div>
                <div class="actions"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating button -->
    <button @click="navigateTo('saveBand')" class="floating-btn">
      <font-awesome-icon icon="plus" />
    </button>

  </div>
</template>

<script src="./js/bands.js"></script>
