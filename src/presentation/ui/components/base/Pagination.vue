<template>
  <ul
    class="pagination"
    :class="[size && `pagination-${size}`, align && `justify-content-${align}`]"
  >
    <li class="page-item prev-page" :class="{ disabled: value === 1 }">
      <a class="page-link" aria-label="Previous" @click="prevPage">
        <span aria-hidden="true">
          <font-awesome-icon icon="angle-left" aria-hidden="true" />
        </span>
      </a>
    </li>
    <li
      class="page-item"
      :class="{ active: value === item }"
      :key="item"
      v-for="item in range(minPage, maxPage)"
    >
      <a class="page-link" @click="changePage(item)">{{ item }}</a>
    </li>
    <li class="page-item next-page" :class="{ disabled: value === totalPages }">
      <a class="page-link" aria-label="Next" @click="nextPage">
        <span aria-hidden="true">
          <font-awesome-icon icon="angle-right" aria-hidden="true" />
        </span>
      </a>
    </li>
  </ul>
</template>

<script src="./js/pagination.js"></script>
