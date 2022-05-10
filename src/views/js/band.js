// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Band',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    band: {},
    songs: [],
    shows: [],
    isInviteModalOpen: false,
    inviteForm: {
      username: ''
    }
  }),
  computed: {
    ...mapGetters({
      accountLoading: 'account/getLoadingStatus',
      bandLoading: 'band/getLoadingStatus',
      songLoading: 'song/getLoadingStatus',
      showLoading: 'show/getLoadingStatus',
      me: 'account/getMe'
    }),
    isDisplayReady () {
      return !this.bandLoading && Object.keys(this.band).length > 0
    },
    menu () {
      return [
        {
          text: this.$t('band.categoriesMenu'),
          icon: 'compact-disc',
          redirect: 'categories'
        },
        {
          text: this.$t('band.songbookMenu'),
          icon: 'music',
          redirect: 'directory'
        },
        {
          text: this.$t('band.publicMenu'),
          icon: 'earth-americas',
          redirect: 'publicSongs'
        },
        {
          text: this.$t('band.presentationMenu'),
          icon: 'microphone-lines',
          redirect: 'shows'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      addBandMember: 'band/addBandMember',
      loadAccountByUsername: 'account/loadAccountByUsername',
      loadBand: 'band/loadBand',
      listBandSongs: 'song/listBandSongs',
      listBandShows: 'show/listBandShows',
      removeBandMember: 'band/removeBandMember',
      demoteBandMember: 'band/demoteBandMember',
      promoteBandMember: 'band/promoteBandMember',
      removeBand: 'band/removeBand'
    }),
    navigateTo (route, id = null) {
      this.$router.push({
        name: route,
        params: { band: this.band.id, id }
      })
    },
    closeInviteModal () {
      this.isInviteModalOpen = false
    },
    openInviteModal () {
      this.inviteForm = { username: '' }
      this.v$.inviteForm.$reset()
      this.isInviteModalOpen = true
    },
    async loadPageData () {
      const { id } = this.$route.params
      const [ band, songs, shows ] = await Promise.all([
        this.loadBand(id),
        this.listBandSongs({ band: id, limit: 3 }),
        this.listBandShows({ band: id, limit: 3 })
      ])
      this.band = band.data
      this.songs = songs.data
      this.shows = shows.data
      if (!Object.keys(band.data).length > 0) {
        this.$toast.warning(this.$t('band.messages[0]'))
      }
    },
    async inviteMember () {
      this.v$.inviteForm.$touch()
      if (!this.v$.error && !this.v$.$invalid) {
        const payload = { ...this.inviteForm }
        const userResponse = await this.loadAccountByUsername(payload.username)
        if (userResponse.error) {
          this.$toast.error(userResponse.message.replace('GraphQL error: ', ''))
        } else {
          const { id } =  userResponse.data
          if (this.band.members.find(a => a.id === id)) {
            // Case member is already in band
            this.$toast.info(this.$t('band.messages[1]'))
          } else {
            const addMemberResponse = await this.addBandMember({ member: id, band: this.band.id })
            if (addMemberResponse.error) {
              this.$toast.error(this.$t('band.messages[2]'))
            } else {
              this.$toast.success(this.$t('band.messages[3]'))
              this.closeInviteModal()
              await this.loadPageData()
            }
          }
        }
      } else {
        this.$toast.warning(this.$t('band.messages[4]'))
      }
    },
    async removeMember (member) {
      this.$swal({
        title: this.$t('band.messages[5]'),
        html: this.$t('band.messages[6]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Remover',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBandMember({ member: member.id, band: this.band.id })
          if (response.error) {
            this.$toast.error(this.$t('band.messages[7]'))
          } else {
            this.$toast.success(this.$t('band.messages[8]'))
            await this.loadPageData()
          }
        }
      }) 
    },
    async promoteMember (member) {
      this.$swal({
        title: this.$t('band.messages[9]'),
        html: this.$t('band.messages[10]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Promover',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.promoteBandMember({ member: member.id, band: this.band.id })
          if (response.error) {
            this.$toast.error(this.$t('band.messages[11]'))
          } else {
            this.$toast.success(this.$t('band.messages[12]'))
            await this.loadPageData()
          }
        }
      }) 
    },
    async demoteMember (member) {
      this.$swal({
        title: this.$t('band.messages[9]'),
        html: this.$t('band.messages[13]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Rebaixar',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.demoteBandMember({ member: member.id, band: this.band.id })
          if (response.error) {
            this.$toast.error(this.$t('band.messages[14]'))
          } else {
            this.$toast.success(this.$t('band.messages[15]'))
            await this.loadPageData()
          }
        }
      }) 
    },
    async disposeBand () {
      this.$swal({
        title: this.$t('band.messages[5]'),
        text: this.$t('band.messages[16]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Excluir',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBand(this.band.id)
          if (response.error) {
            this.$toast.error(this.$t('band.messages[17]'))
          } else {
            this.$toast.success(this.$t('band.messages[18]'))
            this.$router.push({ name: 'bands' })
          }
        }
      })
    }
  },
  async mounted () {
    await this.loadPageData()
  },
  validations () {
    return {
      inviteForm: {
        username: {
          required,
          minLength: minLength(3)
        }
      }
    }
  }
}
