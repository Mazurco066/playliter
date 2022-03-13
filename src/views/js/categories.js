// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Components
export default {
  name: 'Categories',
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
  methods: {
    ...mapActions({
      saveCategory: 'song/saveCategory',
      listBandCategories: 'song/listBandCategories'
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

        const { band } = this.$route.params
        const payload = { ...this.form, band }
        const r = await this.saveCategory({ payload, id: this.catId })
        if (r.error) {
          this.$toast.error(`Ocorreu um erro ao salvar sua categoria! Tente novamente mais tarde`)
        } else {
          this.$toast.success('Categoria salva com sucesso!')
          this.closeCategoryModal()
          this.resetForm()
          await this.loadCategories()
        }

      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    },
    async loadCategories () {
      const { band } = this.$route.params
      const r = await this.listBandCategories({ band })
      if (r.error) {
        this.$toast.error(`Ocorreu um erro ao obter as categorias musicais da banda!`)
      } else {
        this.categories = r.data
      }
    },
    async removeCategory (id = '') {
      this.$swal({
        title: 'Essa ação é permanente!',
        text: 'Deseja remover essa categoria?',
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Remover',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log('[remove]', id)
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