// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Home',
  data: () => ({
    pending: [],
    invites: [],
    refreshInterval: null
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus',
      bandLoading: 'band/getLoadingStatus'
    }),
    hasPendingInvites () {
      return this.invites.length > 0
    }
  },
  methods: {
    ...mapActions({
      listPendingShows: 'show/listPendingShows',
      listPendingInvites: 'band/listPendingInvites',
      respondInvite: 'band/respondInvite'
    }),
    async refreshInvites () {
      const r = await this.listPendingInvites()
      if (r.error) {
        this.$toast.error(`Ocorreu um erro ao obter os convites pendentes! Por favor contate um administrador do sistema.`)
      } {
        this.invites = r.data
      }
    },
    async respondPendingInvite (invite) {
      if (!this.bandLoading) {
        this.$swal({
          icon: 'info',
          title: 'Responder convite',
          html: `Deseja aceitar o convite para participar da banda <strong>${invite.band.title}</strong>?`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#1C8781',
          confirmButtonText: 'Aceitar',
          denyButtonText: 'Recusar',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed || result.isDenied) {
            const loadingSwal = this.$swal({
              icon: 'info',
              title: 'Aguarde',
              text: 'Estamos processando sua resposta...',
              showConfirmButton: false,
              allowOutsideClick: false
            })
            const r = await this.respondInvite({
              inviteId: invite.id,
              response: result.isConfirmed ? 'accepted' : 'denied'
            })
            loadingSwal.close()
            if (r.error) {
              this.$toast.error(
                r.message.replace('GraphQL error:', '') ||
                `Ocorreu um erro ao responder o convite! Por favor contate um administrador do sistema.`
              )
            } {
              this.$toast.success('Convite respondido com sucesso!')
              this.refreshInvites()
            }
          }
        })
      }
    },
    viewShow (show = {}) {
      this.$router.push({
        name: 'show',
        params: {
          band: show.band.id,
          id: show.id
        }
      })
    }
  },
  async mounted () {
    // Pending shows
    const r = await this.listPendingShows()
    if (r.error) {
      this.$toast.error(`Ocorreu um erro ao obter as apresentações futuras! Por favor contate um administrador do sistema.`)
    } else {
      this.pending = r.data
    }
    // Pending invites
    await this.refreshInvites()
    this.refreshInterval = setInterval(async () => {
      await this.refreshInvites()
    }, 30000)
  },
  beforeUnmount () {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  }
}
