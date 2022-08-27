// Dependencies
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'

// Tab Components
import Categories from '../../components/template/Categories.vue'
import Repertory from '../../components/template/Repertory.vue'
import Shows from '../../components/template/Shows.vue'

// Component
export default {
  name: 'Band',
  components: { Categories, Repertory, Shows },
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    band: {},
    songs: [],
    shows: [],
    accounts: [],
    checkedAccounts: [],
    accountFilter: '',
    isInviteModalOpen: false,
    isMembersModalOpen: false,
    // Tabs state
    selectedIndex: 1,
    tabs: [
      {
        key: 1,
        title: 'Repertório',
        hash: '#songs'
      },
      {
        key: 2,
        title: 'Categorias',
        hash: '#categories'
      },
      {
        key: 3,
        title: 'Show',
        hash: '#shows'
      }
    ]
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
    },
    translatedTabs () {
      return this.tabs.map((tab, i) => ({
        ...tab,
        title: this.$t(`band.tabs[${i}]`)
      }))
    },
    filteredAccounts () {
      const memberIds = this.band && this.band.members ? this.band.members.map(m => m.id) : []
      return this.accounts.filter(acc => 
        // Removing owner
        acc.id !== this.me.id
      ).filter(acc =>
        // Removing current band members
        !memberIds.includes(acc.id)
      ).filter(acc =>
        // Filtering accounts
        acc.name.toLowerCase().includes(this.accountFilter.toLowerCase())
      )
    }
  },
  methods: {
    ...mapActions({
      addBandMember: 'band/addBandMember',
      loadBand: 'band/loadBand',
      listBandSongs: 'song/listBandSongs',
      listBandShows: 'show/listBandShows',
      removeBandMember: 'band/removeBandMember',
      demoteBandMember: 'band/demoteBandMember',
      promoteBandMember: 'band/promoteBandMember',
      removeBand: 'band/removeBand',
      listAccounts: 'account/listAccounts'
    }),
    navigateTo (route, id = null) {
      this.$router.push({
        name: route,
        params: { band: this.band.id, id }
      })
    },
    closeInviteModal () {
      this.isInviteModalOpen = false
      // Clear selection
      this.checkedAccounts = []
      this.accountFilter = ''
    },
    async openInviteModal () {
      // Clear selection
      this.checkedAccounts = []
      this.accountFilter = ''
      // Open modal
      this.isInviteModalOpen = true
      // Retrieve signed users
      const r = await this.listAccounts({})
      if (!r.error) this.accounts = r.data
    },
    closeMembersModal () {
      this.isMembersModalOpen = false
    },
    openMembersModal () {
      this.isMembersModalOpen = true
    },
    setTab(tab) {
      this.selectedIndex = tab
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
    async inviteMembers () {
      if (this.checkedAccounts.length < 1) {
        this.$toast.warning(this.$t('band.messages[4]'))
      } else {
        // Invite members
        const responses = await Promise.all(
          this.checkedAccounts.map(async id => 
            this.addBandMember({ member: id, band: this.band.id })
          )
        )
        // Verify errors and notify user
        const hasErrors = responses.filter(r => r.error !== false).length !== 0
        console.log('[here]', responses, hasErrors)
        if (hasErrors) {
          this.$toast.error(this.$t('band.messages[2]'))
          this.closeInviteModal()
          await this.loadPageData()
        } else {
          this.$toast.success(this.$t('band.messages[3]'))
          this.closeInviteModal()
          await this.loadPageData()
        }
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
    const routeHash = this.$route.hash
    if (routeHash) {
      switch (routeHash) {
        case '#songs':
          this.selectedIndex = 1
          break

        case '#categories':
          this.selectedIndex = 2
          break

        case '#shows':
          this.selectedIndex = 3
          break
      }
    }
    await this.loadPageData()
  }
}
