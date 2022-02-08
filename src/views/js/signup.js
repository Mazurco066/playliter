// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'SignUp',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      username: '',
      password: '',
      name: ''
    }
  }),
  computed: {
    ...mapGetters({
      authLoading: 'authentication/getLoadingStatus',
      accountLoading: 'account/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      authenticateByUsername: 'authentication/authenticateByUsername',
      saveAccount: 'account/saveAccount'
    }),
    async register () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Validate both passwords
        const payload = { ...this.form }
        if (payload.password !== payload.confirmPassword) {
          return this.$toast.warning(`As senhas devem ser iguais!`)
        }

        // 1. Retrieve payload and create an account
        const accountResponse = await this.saveAccount({ payload })
        if (accountResponse.error) {
          this.$toast.error(`Ocorreu um erro ao criar sua conta! Tente novamente mais tarde`)
        } else {

          // 2. Authenticate user
          const authResponse = await this.authenticateByUsername({
            username: payload.username,
            password: payload.password
          })
          if (authResponse.error) {
            this.$toast.success('Conta criada com sucesso!')
            this.$router.push({ name: 'signin' })
          } else {
            this.$toast.success('Conta criada com sucesso. Seja bem vindo(a)!')
            this.$router.push({ name: 'home' })
          }
        }

      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    }
  },
  validations () {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(128)
        },
        username: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(64)
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(96)
        },
        confirmPassword: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(96)
        }
      }
    }
  }
}