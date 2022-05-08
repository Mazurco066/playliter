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
        this.$toast.warning(`Banda de id ${id} não encontrada!`)
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
            this.$toast.info(`O usuário ${payload.username} já se encontra nessa banda!`)
          } else {
            const addMemberResponse = await this.addBandMember({ member: id, band: this.band.id })
            if (addMemberResponse.error) {
              this.$toast.error('Ocorreu um erro ao adicionar um membro a banda. Por favor contate um administrador!')
            } else {
              this.$toast.success('Um novo membro foi adicionado a banda!')
              this.closeInviteModal()
              await this.loadPageData()
            }
          }
        }
      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    },
    async removeMember (member) {
      this.$swal({
        title: 'Essa ação é permanente!',
        html: `Deseja remover o membro <strong>${member.name}</strong> da banda?`,
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Remover',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBandMember({ member: member.id, band: this.band.id })
          if (response.error) {
            this.$toast.error(`Ocorreu um erro ao remover o membro da banda! Por favor contate um administrador do sistema.`)
          } else {
            this.$toast.success('Membro removido com sucesso!')
            await this.loadPageData()
          }
        }
      }) 
    },
    async promoteMember (member) {
      this.$swal({
        title: 'Tem certeza?',
        html: `Deseja promover o membro <strong>${member.name}</strong> para "Admin"?`,
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Promover',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.promoteBandMember({ member: member.id, band: this.band.id })
          if (response.error) {
            this.$toast.error(`Ocorreu um erro ao promover o membro da banda! Por favor contate um administrador do sistema.`)
          } else {
            this.$toast.success('Membro promovido com sucesso!')
            await this.loadPageData()
          }
        }
      }) 
    },
    async demoteMember (member) {
      this.$swal({
        title: 'Tem certeza?',
        html: `Deseja rebaixar <strong>${member.name}</strong> para "Membro"?`,
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Rebaixar',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.demoteBandMember({ member: member.id, band: this.band.id })
          if (response.error) {
            this.$toast.error(`Ocorreu um erro ao rebaixar o membro da banda! Por favor contate um administrador do sistema.`)
          } else {
            this.$toast.success('Membro rebaixado com sucesso!')
            await this.loadPageData()
          }
        }
      }) 
    },
    async disposeBand () {
      this.$swal({
        title: 'Essa ação é permanente!',
        text: 'Deseja excluir essa banda para todos seus integrantes??',
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Excluir',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBand(this.band.id)
          if (response.error) {
            this.$toast.error(`Ocorreu um erro ao excluir a banda! Por favor contate um administrador do sistema.`)
          } else {
            this.$toast.success('Banda removida com sucesso!')
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
