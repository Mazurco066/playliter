// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Bands',
  data: () => ({
    bands: []
  }),
  computed: {
    ...mapGetters({
      me: 'account/getMe',
      bandLoading: 'band/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      loadBands: 'band/loadBands',
      removeBand: 'band/removeBand'
    }),
    randomIcon () {
      const rng = Math.floor(Math.random() * 4 + 1)
      return `0${rng}.png`
    },
    navigateTo (route, id = null) {
      this.$router.push({
        name: route,
        params: { id }
      })
    },
    editBand (row) {
      const admins = row.admins
      const isAdmin = admins.find(a => a.id === this.me.id)
      const isOwner = row.owner.id === this.me.id
      if (!isOwner && !isAdmin) {
        return this.$toast.info(this.$t('bands.messages[0]'))
      }
      this.$router.push({
        name: 'editBand',
        params: { id: row.id }
      })
    },
    deleteBand (row) {
      if (row.owner.id !== this.me.id) {
        return this.$toast.info(this.$t('bands.messages[1]'))
      }
      this.$swal({
        title: this.$t('bands.messages[2]'),
        text: this.$t('bands.messages[3]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('bands.removeAction'),
        denyButtonText: this.$t('bands.cancelAction')
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBand(row.id)
          if (response.error) {
            this.$toast.error(this.$t('bands.messages[4]'))
          } else {
            this.$toast.success(this.$t('bands.messages[5]'))
            const rf = await this.loadBands({})
            this.bands = rf.data
          }
        }
      })
    }
  },
  async mounted () {
    const r = await this.loadBands({})
    this.bands = r.data
  }
}
