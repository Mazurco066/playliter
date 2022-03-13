// Dependencies
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength } from '@vuelidate/validators'

// Component
export default {
  name: 'Profile',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      name: ''
    }
  }),
  computed: {
    ...mapGetters({
      me: 'account/getMe',
      accountLoading: 'account/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      updateProfile: 'account/updateProfile',
      loadMe: 'account/loadMe',
      resetStore: 'RESET'
    }),
    logout () {
      this.resetStore()
      this.$router.push({ name: 'signin' })
    },
    async saveProfile () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        const payload = { ...this.form }
        const r = await this.updateProfile({ id: this.me.id, payload })
        if (r.error) {
          this.$toast.error(r.message.replace('GraphQL error:', '') || `Ocorreu um erro ao atualizar seu perfil! Tente novamente mais tarde`)
        } else {
          this.$toast.success('Perfil atualizado com sucesso')
          const pr = await this.loadMe()
          if (pr.error) {
            if (pr.message.includes('Unauthorized')) {
              // Reset store and logoff
              this.logout()
            } else {
              this.$toast.error('Não foi possível obter a conta autenticada. Por favor tente novamente mais tarde!')
            }
          }
        }
      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    }
  },
  mounted () {
    this.form.name = this.me.name
  },
  validations () {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(128)
        }
      }
    }
  }
}
