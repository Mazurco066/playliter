export default {
  name: 'base-table',
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: 'Table columns',
    },
    data: {
      type: Array,
      default: () => [],
      description: 'Table data',
    },
    type: {
      type: String, // striped | hover
      default: '',
      description: 'Whether table is striped or hover type',
    },
    theadClasses: {
      type: String,
      default: '',
      description: '<thead> css classes',
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: '<tbody> css classes',
    },
    noDataMsg: {
      type: String,
      default: 'No data',
      description: 'No data message'
    },
    loading: {
      type: Boolean,
      default: false,
      description: 'Loading status'
    }
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`
    },
    colsWithValue() {
      return (row) => {
        return this.columns.filter((column) => this.hasValue(row, column))
      }
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  }
}
