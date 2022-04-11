// Dependencies
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength } from '@vuelidate/validators'

// Component
export default {
  name: 'SaveSong',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    song: '',
    form: {
      title: '',
      writter: '',
      tone: '',
      category: '',
      importUrl: ''
    },
    // Select data list
    categories: [],
    tones: [
      { label: 'Ab', value: 'Ab' },
      { label: 'A', value: 'A' },
      { label: 'A#', value: 'A#' },
      { label: 'Bb', value: 'Bb' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'C#', value: 'C#' },
      { label: 'Db', value: 'Db' },
      { label: 'D', value: 'D' },
      { label: 'D#', value: 'D#' },
      { label: 'Eb', value: 'Eb' },
      { label: 'E', value: 'E' },
      { label: 'F', value: 'F' },
      { label: 'F#', value: 'F#' },
      { label: 'Gb', value: 'Gb' },
      { label: 'G', value: 'G' },
      { label: 'G#', value: 'G#' }
    ]
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    }),
    saveMode () {
      const { id } = this.$route.params
      return !id 
    },
    showTipTap () {
      if (!this.saveMode) {
        return this.song ? true : false
      } else {
        return true
      }
    },
    mappedCategories () {
      return this.categories.map(({ title, id }) => ({
        label: title,
        value: id
      }))
    }
  },
  methods: {
    ...mapActions({
      listBandCategories: 'song/listBandCategories',
      saveSong: 'song/saveSong',
      loadBandSong: 'song/loadBandSong',
      scrapSong: 'song/scrapSong'
    }),
    async importExternalSong () {
      const importUrl = this.form.importUrl
      if (!importUrl) return this.$toast.warning('Nenhuma url de importação foi inserida.')
      if (!importUrl.includes('https://')) return this.$toast.warning('Insira uma URL válida.')
      const swal = this.$swal({
        icon: 'info',
        title: 'Aguarde',
        text: 'Estamos importando a cifra da música informada...',
        showConfirmButton: false,
        allowOutsideClick: false
      })
      const external = await this.scrapSong(importUrl)
      swal.close()
      if (external.error) {
        this.$toast.error(
          external.message.replace('GraphQL error:', '') ||
          `Ocorreu um erro ao importar a música! Por favor contate um administrador do sistema.`
        )
      } else {
        this.form.importUrl = ''
        this.form.title = external.data.title
        this.form.writter = external.data.writter
        const obtainedTone = this.tones.find(t => t.value === external.data.tone)
          ? external.data.tone
          : external.data.tone.substring(0, 1)
        this.form.tone = obtainedTone
        const songAsText = external.data.loot
        this.song = songAsText.replace(/\n/g, '<br>')  
      }
    },
    async createSong () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Validate if song body was fulfilled
        if (!this.song) {
          return this.$toast.warning('Por favor preencha o corpo da música para prosseguir! Por favor revise-os.')
        }
        
        // Retrieve params and generate payload
        const { id, band } = this.$route.params
        const payload = {
          ...this.form,
          body: this.song && this.song.startsWith('\n') ? this.song : `\n${this.song}`,
          band
        }

        // Create / Update song
        const r = await this.saveSong({ id, payload })
        if (r.error) {
          this.$toast.error(`Ocorreu um erro ao salvar sua música! Tente novamente mais tarde`)
        } else {
          this.$toast.success('Música salva com sucesso!')
          this.$router.push({ name: 'band', params: { id: band } })
        }
        
      } else {
        this.$toast.warning('Seu formuário contem erros de validação! Por favor revise-os.')
      }
    }
  },
  async mounted () {
    const { id, band } = this.$route.params
    if (id) {
      const song = await this.loadBandSong({ id, band })
      this.form = {
        title: song.data.title,
        writter: song.data.writter,
        tone: song.data.tone,
        category: song.data.category.id,
        importUrl: ''
      }
      // Replace \n with html elements
      this.song = song.data.body.replace(/\n/g, '<br>')      
      if (!Object.keys(song.data).length > 0) {
        this.$toast.warning(`Música de id ${id} não encontrada!`)
        this.$router.push({ name: 'band', params: { id: band } })
      }
    }
    const categories = await this.listBandCategories({ band, limit: 0, offset: 0 })
    this.categories = categories.data
    if (!categories.data.length > 0) {
      this.$toast.warning('Cadastre uma categoria antes de cadastrar uma música!')
      this.$router.push({ name: 'band', params: { id: band } })
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
        writter: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(128)
        },
        tone: {
          required
        },
        importUrl: {
          minLength: minLength(2)
        },
        category: {
          required
        }
      }
    }
  }
}
