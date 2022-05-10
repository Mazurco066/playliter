// Dependencies
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength } from '@vuelidate/validators'

// Component
export default {
  name: 'SaveShow',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      title: null,
      description: null,
      date: null
    }
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus'
    }),
    saveMode () {
      const { id } = this.$route.params
      return !id 
    }
  },
  methods: {
    ...mapActions({
      saveShow: 'show/saveShow',
      loadShow: 'show/listBandShow'
    }),
    async createShow () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Create payload
        const { id, band } = this.$route.params
        const payload = { ...this.form }

        // Save band
        const r = await this.saveShow({ payload: payload, band, id })
        if (r.error) {
          this.$toast.error(this.$t('saveShow.messages[1]'))
        } else {
          this.$toast.success(this.$t('saveShow.messages[0]'))
          this.$router.push({ name: 'shows', params: { band } })
        }

      } else {
        this.$toast.warning(this.$t('saveShow.messages[2]'))
      }
    }
  },
  async mounted () {
    const { id, band } = this.$route.params
    if (id) {
      const show = await this.loadShow({ id, band })
      this.form = {
        title: show.data.title,
        description: show.data.description,
        date: show.data.date.split('T')[0]
      }
      if (!Object.keys(show.data).length > 0) {
        this.$toast.warning(this.$t('saveShow.messages[3]'))
        this.$router.push({ name: 'band', params: { id: band } })
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
        },
        date: {
          required
        }
      }
    }
  }
}
