// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'ForgotPassword',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      email: ''
    }
  }),
  computed: {
    ...mapGetters({
      authLoading: 'authentication/getLoadingStatus',
      appVersion: 'ui/getAppVersion'
    })
  },
  methods: {
    ...mapActions({
      requestPasswordReset: 'authentication/requestPasswordReset'
    }),
    async submitForm () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Display loading message
        const swal = this.$swal({
          icon: 'info',
          title: this.$t('forgotPassword.messages[3]'),
          text: this.$t('forgotPassword.messages[4]'),
          showConfirmButton: false,
          allowOutsideClick: false
        })

        // Call API
        const response = await this.requestPasswordReset(this.form.email)
        swal.close()
        if (response.error) {
          this.$toast.error(
            response.message.replace('GraphQL error:', '') ||
            this.$t('forgotPassword.messages[1]')
          )
        } else {
          this.$toast.success(this.$t('forgotPassword.messages[2]'))
          this.$router.push({ name: 'signin' })
        }

      } else {
        this.$toast.warning(this.$t('forgotPassword.messages[0]'))
      }
    }
  },
  validations () {
    return {
      form: {
        email: {
          required,
          email
        }
      }
    }
  }
}
