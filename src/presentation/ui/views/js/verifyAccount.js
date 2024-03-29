// Dependencies
import CodeInput from '../../components/template/VerificationCodeInput.vue'
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'VerifyAccount',
  data: () => ({
    pathValue: ''
  }),
  components: { CodeInput },
  computed: {
    ...mapGetters({
      me: 'account/getMe',
      accountLoading: 'account/getLoadingStatus'
    }),
    isAccountConfirmed () {
      return this.me.isEmailconfirmed && JSON.parse(this.me.isEmailconfirmed)
    }
  },
  methods: {
    ...mapActions({
      verifyAccount: 'account/verifyAccount',
      resendVerification: 'account/resendVerification',
      loadMe: 'account/loadMe'
    }),
    async onComplete (code) {
      // Display loading message
      const swal = this.$swal({
        icon: 'info',
        title: this.$t('verifyAccount.messages[1]'),
        text: this.$t('verifyAccount.messages[2]'),
        showConfirmButton: false,
        allowOutsideClick: false
      })

      // Call API
      const response = await this.verifyAccount(code)
      swal.close()
      if (response.error) {
        this.$toast.error(
          response.message ||
          this.$t('verifyAccount.messages[0]')
        )
      } else {
        this.$toast.success(this.$t('verifyAccount.messages[3]'))
        await this.loadMe()
        this.$router.push({ name: 'home' })
      }
    },
    async sendMeAnotherMail () {
      const response = await this.resendVerification()
      if (response.error) {
        this.$toast.error(
          response.message ||
          this.$t('verifyAccount.messages[4]')
        )
      } else {
        this.$toast.success(this.$t('verifyAccount.messages[5]'))
      }
    }
  },
  beforeMount() {
    // If account is already confirmed just redirect to home
    if (this.isAccountConfirmed) {
      this.$router.push({ name: 'home' })
    } else {
      // Retrieve path params
      const { code } = this.$route.params
      if (code) {
        this.pathValue = code
      }
    }
  }
}
