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
          this.$toast.error(this.$t('signin.messages[1]'))
        } else {

          // User feedback
          this.$toast.success(this.$t('signin.messages[0]'))
          this.$router.push({ name: 'home' })
          
        }
      } else {
        this.$toast.warning(this.$t('signin.messages[2]'))
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
