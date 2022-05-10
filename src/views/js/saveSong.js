// Dependencies
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { VAceEditor } from 'vue3-ace-editor'

// Ace plugins
import ChordCompleter from '../../components/base/ace/chordCompleter'

// Ace themes
import 'ace-builds/src-noconflict/theme-clouds'
import 'ace-builds/src-noconflict/ext-language_tools'

// Ace snippets
import '../../components/base/ace/modeChordpro'
import '../../components/base/ace/snipets/chordpro'

// Component
export default {
  name: 'SaveSong',
  components: { VAceEditor },
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
      importUrl: '',
      visibility: 'public'
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
      if (!importUrl) return this.$toast.warning(this.$t('saveSong.messages[9]'))
      if (!importUrl.includes('https://')) return this.$toast.warning(this.$t('saveSong.messages[10]'))
      const swal = this.$swal({
        icon: 'info',
        title: this.$t('saveSong.messages[7]'),
        text: this.$t('saveSong.messages[5]'),
        showConfirmButton: false,
        allowOutsideClick: false
      })
      const external = await this.scrapSong(importUrl)
      swal.close()
      if (external.error) {
        this.$toast.error(
          external.message.replace('GraphQL error:', '') ||
          this.$t('saveSong.messages[6]')
        )
      } else {
        this.form.importUrl = ''
        this.form.title = external.data.title
        this.form.writter = external.data.writter
        const obtainedTone = this.tones.find(t => t.value === external.data.tone)
          ? external.data.tone
          : external.data.tone.substring(0, 1)
        this.form.tone = obtainedTone
        this.song  = external.data.loot
      }
    },
    async createSong () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Validate if song body was fulfilled
        if (!this.song) {
          return this.$toast.warning(this.$t('saveSong.messages[8]'))
        }
        
        // Retrieve params and generate payload
        const { id, band } = this.$route.params
        const payload = {
          ...this.form,
          body: this.song,
          band: band,
          isPublic: this.form.visibility === 'public'
        }
        delete payload.visibility

        // Create / Update song
        const r = await this.saveSong({ id, payload })

        // Validate errors
        if (r.error) {
          this.$toast.error(this.$t('saveSong.messages[2]'))
        } else {
          this.$toast.success(this.$t('saveSong.messages[0]'))
          this.$router.push({ name: 'directory', params: { band } })
        }
        
      } else {
        this.$toast.warning(this.$t('saveSong.messages[2]'))
      }
    },
    // Ace editor methods
    setupEditor (editor) {
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      })
      editor.renderer.setScrollMargin(20, 20)

      // Add snipets and completers
      const { snippetCompleter } = ace.require('ace/ext/language_tools')
      editor.completers = [ new ChordCompleter(), snippetCompleter ]

      // Start autocomplete on [ or { characters
      editor.commands.addCommand({
        name: 'chordproStartAutocomplete',
        bindKey: '[|{',
        exec () {
          editor.commands.byName.startAutocomplete.exec(editor)
          return false
        }
      })

      // Expose ace editor for tests
      window.editor = editor
    },
    paste (e) {
      e.text = e.text.replaceAll('<br>', '\n')
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
        importUrl: '',
        visibility: song.data.isPublic ? 'public' : 'private'
      }
      // Replace \n with html elements
      this.song = song.data.body.replaceAll('<br>', '\n')  
      if (!Object.keys(song.data).length > 0) {
        this.$toast.warning(this.$t('saveSong.messages[3]'))
        this.$router.push({ name: 'band', params: { id: band } })
      }
    }
    const categories = await this.listBandCategories({ band, limit: 0, offset: 0 })
    this.categories = categories.data
    if (!categories.data.length > 0) {
      this.$toast.warning(this.$t('saveSong.messages[4]'))
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
        },
        visibility: {
          required
        }
      }
    }
  }
}
