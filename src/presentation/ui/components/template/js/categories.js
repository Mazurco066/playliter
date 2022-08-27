// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'categories',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    catId: null,
    categories: [],
    isCategoryModalOpen: false,
    form: {
      title: '',
      description: ''
    }
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    }),
    isDisplayReady () {
      return !this.songLoading
    }
  },
  props: {
    band: {
      default: '',
      type: String
    }
  },
  methods: {
    ...mapActions({
      saveCategory: 'song/saveCategory',
      listBandCategories: 'song/listBandCategories',
      deleteCategory: 'song/removeCategory'
    }),
    closeCategoryModal () {
      this.isCategoryModalOpen = false
    },
    openCategoryModal (category = null) {
      if (category) {
        this.catId = category.id
        this.form = {
          title: category.title,
          description: category.description
        }
      }
      this.isCategoryModalOpen = true
    },
    resetForm () {
      this.form = {
        title: '',
        description: ''
      }
      this.v$.form.$reset()
    },
    async submitCategory () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {
        const payload = { ...this.form, band: this.band }
        const r = await this.saveCategory({ payload, id: this.catId })
        if (r.error) {
          this.$toast.error(this.$t('categories.messages[0]'))
        } else {
          this.$toast.success(this.$t('categories.messages[1]'))
          this.closeCategoryModal()
          this.resetForm()
          await this.loadCategories()
        }

      } else {
        this.$toast.warning(this.$t('categories.messages[2]'))
      }
    },
    async loadCategories () {
      const r = await this.listBandCategories({ band: this.band })
      if (r.error) {
        this.$toast.error(this.$t('categories.messages[3]'))
      } else {
        this.categories = r.data
      }
    },
    async removeCategory (id = '') {
      this.$swal({
        title: this.$t('categories.messages[4]'),
        text: this.$t('categories.messages[5]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('categories.removeAction'),
        denyButtonText: this.$t('categories.cancelAction')
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.deleteCategory(id)
          if (response.error) {
            this.$toast.error(response.message || this.$t('categories.messages[6]'))
          } else {
            this.$toast.success(this.$t('categories.messages[7]'))
            this.closeCategoryModal()
            this.resetForm()
            await this.loadCategories()
          }
        }
      })
    }
  },
  async mounted () {
    await this.loadCategories()
  },
  validations () {
    return {
      form: {
        title: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(128)
        },
        description: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(255)
        }
      }
    }
  }
}