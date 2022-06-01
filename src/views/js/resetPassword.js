// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'ResetPassword',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      password: '',
      confirmPassword: ''
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
      resetPassword: 'authentication/resetPassword'
    }),
    async submitForm () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {
        // Retrieve path parameters
        const { id, token } = this.$route.params

        console.log('token', token)

         // Display loading message
         const swal = this.$swal({
          icon: 'info',
          title: this.$t('resetPassword.messages[3]'),
          text: this.$t('resetPassword.messages[4]'),
          showConfirmButton: false,
          allowOutsideClick: false
        })

        // Call API
        const response = await this.resetPassword({
          accountId: id,
          token,
          newPassword: this.form.password
        })
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
        this.$toast.warning(this.$t('resetPassword.messages[0]'))
      }
    }
  },
  mounted () {
    const { id, token } = this.$route.params
    if (!id || !token) {
      this.$toast.warning('Parâmetros incorretos!')
      this.$router.push({ name: 'signin' })
    }
  },
  validations () {
    return {
      form: {
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
