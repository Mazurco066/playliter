// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'
import { songHelpers } from '../../helpers'

// Component
export default {
  name: 'Directory',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    catId: null,
    repertory: {},
    isCategoryModalOpen: false,
    form: {
      title: '',
      description: ''
    }
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      listBandSongs: 'song/listBandSongs',
      saveCategory: 'song/saveCategory'
    }),
    navigateTo (route, band, id = null) {
      this.$router.push({
        name: route,
        params: { band, id }
      })
    },
    closeCategoryModal () {
      this.isCategoryModalOpen = false
    },
    openCategoryModal () {
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
        }

      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    }
  },
  async mounted () {
    const { band } = this.$route.params
    const r = await this.listBandSongs({ band })
    this.repertory = songHelpers.compute(r.data)
    console.log(this.repertory)
    if (r.error) {
      this.$toast.error(`Ocorreu um erro ao obter o repertório da banda!`)
    }
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
