<template>
  <div class="base-table">
    <table v-if="data.length && !loading" class="table tablesorter" :class="tableClass">
      <thead :class="theadClasses">
        <tr>
          <slot name="columns" :columns="columns">
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </slot>
        </tr>
      </thead>
      <tbody :class="tbodyClasses">
        <tr v-for="(item, index) in data" :key="index">
          <slot :item="item">
            <td v-for="column in columns" :key="column">
              <template v-if="hasValue(item, column)">
                {{ itemValue(item, column) }}
              </template>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
    <div v-else class="no-data">
      <p v-if="!loading">{{ noDataMsg }}</p>
      <div class="d-flex justify-content-center align-items-center pt-5 pb-5" v-else>
        <base-loading />
      </div>
    </div>
  </div>
</template>

<script src="./js/table.js"></script>
