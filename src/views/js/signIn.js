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
    })
  },
  async mounted () {
    const data = await this.authenticateByUsername({
      username: 'mazurco066',
      password: 'svchost.exe'
    })
    console.log('[response]', data)
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
