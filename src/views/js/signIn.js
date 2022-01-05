// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'SignIn',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      username: '',
      password: ''
    }
  }),
  computed: {
    ...mapGetters({
      authLoading: 'authentication/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      authenticateByUsername: 'authentication/authenticateByUsername'
    }),
    async authenticate () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {
        const payload = { ...this.form }

        // Authenticate by E-mail
        const r = await this.authenticateByUsername(payload)
        if (r.error) {
          this.$toast.error(`Usuário ou senha incorreto(s)`)
        } else {

          // User feedback
          this.$toast.success(`Seja bem vindo`)
          this.$router.push({ name: 'home' })
          
        }
      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    }
  },
  validations () {
    return {
      form: {
        username: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(8)
        }
      }
    }
  }
}
