// Dependencies
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength } from '@vuelidate/validators'

// Component
export default {
  name: 'SaveBand',
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
      bandLoading: 'band/getLoadingStatus'
    }),
    saveMode () {
      const { id } = this.$route.params
      return !id 
    }
  },
  methods: {
    ...mapActions({
      saveBand: 'band/saveBand',
      loadBand: 'band/loadBand'
    }),
    async createBand () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Create payload
        const { id } = this.$route.params
        const payload = { ...this.form }

        // Save band
        const r = await this.saveBand({ payload: payload, id })
        if (r.error) {
          this.$toast.error(`Ocorreu um erro ao salvar sua banda! Tente novamente mais tarde`)
        } else {
          this.$toast.success('Banda criada com sucesso!')
          if (id) {
            this.$router.push({ name: 'band', params: { id: r.data.id } })
          } else  {
            this.$router.push({ name: 'bands' })
          }
        }

      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    }
  },
  async mounted () {
    const { id } = this.$route.params
    if (id) {
      const band = await this.loadBand(id)
      this.form = {
        title: band.data.title,
        description: band.data.description
      }
      if (!Object.keys(band.data).length > 0) {
        this.$toast.warning(`Banda de id ${id} não encontrada!`)
        this.$router.push({ name: 'bands' })
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
