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
        return this.$toast.info(`Você precisa de permissões de administrador para editar uma banda!.`)
      }
      this.$router.push({
        name: 'editBand',
        params: { id: row.id }
      })
    },
    deleteBand (row) {
      if (row.owner.id !== this.me.id) {
        return this.$toast.info(`Você precisa ser o fundador da banda para poder excluir a mesma!.`)
      }
      this.$swal({
        title: 'Essa ação é permanente!',
        text: 'Deseja excluir essa banda para todos seus integrantes??',
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Excluir',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBand(row.id)
          if (response.error) {
            this.$toast.error(`Ocorreu um erro ao excluir a banda! Por favor contate um administrador do sistema.`)
          } else {
            this.$toast.success('Banda removida com sucesso!')
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
