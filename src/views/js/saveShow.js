// Dependencies
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength } from '@vuelidate/validators'

// Component
export default {
  name: 'SaveShow',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      title: null,
      description: null
    }
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus'
    }),
    saveMode () {
      const { id } = this.$route.params
      return !id 
    }
  },
  methods: {
    ...mapActions({
      saveShow: 'show/saveShow',
      loadShow: 'show/listBandShow'
    }),
    async createShow () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Create payload
        const { id, band } = this.$route.params
        const payload = { ...this.form }

        // Save band
        const r = await this.saveShow({ payload: payload, band, id })
        if (r.error) {
          this.$toast.error(`Ocorreu um erro ao salvar sua apresentação! Tente novamente mais tarde`)
        } else {
          this.$toast.success('Apresentação salva com sucesso!')
          this.$router.push({ name: 'band', params: { id: band } })
        }

      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    }
  },
  async mounted () {
    const { id, band } = this.$route.params
    if (id) {
      const show = await this.loadShow({ id, band })
      this.form = {
        title: show.data.title,
        description: show.data.description
      }
      if (!Object.keys(show.data).length > 0) {
        this.$toast.warning(`Apresentação de id ${id} não encontrada!`)
        this.$router.push({ name: 'band', params: { id: band } })
      }
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
