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
          return this.$toast.warning(this.$t('signup.messages[2]'))
        }

        // 1. Retrieve payload and create an account
        const accountResponse = await this.saveAccount({ payload })
        if (accountResponse.error) {
          this.$toast.error(this.$t('signup.messages[3]'))
        } else {

          // 2. Authenticate user
          const authResponse = await this.authenticateByUsername({
            username: payload.username,
            password: payload.password
          })
          if (authResponse.error) {
            this.$toast.success(this.$t('signup.messages[0]'))
            this.$router.push({ name: 'signin' })
          } else {
            this.$toast.success(this.$t('signup.messages[1]'))
            this.$router.push({ name: 'home' })
          }
        }

      } else {
        this.$toast.warning(this.$t('signup.messages[4]'))
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