// Dependencies
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { VAceEditor } from 'vue3-ace-editor'
import { Chord } from 'chordsheetjs'
import { chordTransposer } from '../../utils'

// Ace plugins
import ChordCompleter from '../../components/base/ace/chordCompleter'

// Ace themes
import 'ace-builds/src-noconflict/theme-chaos'
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
      isPublic: true
    },
    // Select data list
    categories: []
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    }),
    saveMode () {
      const { id } = this.$route.params
      return !id 
    },
    mappedCategories () {
      return this.categories.map(({ title, id }) => ({
        label: title,
        value: id
      }))
    },
    transpositions () {
      const baseTone = 'B'
      const key = Chord.parse(baseTone)
      const steps = []
      for (let i = -11; i <= 11; i++) {
        steps.push({
          label: key.transpose(i),
          name: key.transpose(i)
        })
      }
      return steps
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
          external.message ||
          this.$t('saveSong.messages[6]')
        )
      } else {

        // Updating form data to imported song
        const formattedSong = chordTransposer.plaintextToChordProFormat(external.data.loot)
        this.form.importUrl = ''
        this.form.title = external.data.title
        this.form.writter = external.data.writter
        const obtainedTone = this.transpositions.find(t => t.value === external.data.tone)
          ? external.data.tone
          : external.data.tone.substring(0, 1)
        this.form.tone = obtainedTone
        this.song = formattedSong
      }
    },
    async createSong () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        // Validate if song body was fulfilled
        if (!this.song) {
          return this.$toast.warning(this.$t('saveSong.messages[8]'))
        }

        // Clone body text as a variable to update it
        const songFormat = chordTransposer.detecteSongFormat(this.song)
        let bodyText = songFormat !== 'chordpro'
          ? chordTransposer.plaintextToChordProFormat(this.song)
          : this.song

        // Define body flags
        const hasTitle = bodyText.includes('{title:')
        const hasArtist = bodyText.includes('{artist:')
        const hasKey = bodyText.includes('{key:')

        // Add snippets tags if not present
        if (!hasKey) bodyText = `{key: ${this.form.tone}}\n` + bodyText
        if (!hasArtist) bodyText = `{artist: ${this.form.writter}}\n` + bodyText
        if (!hasTitle) bodyText = `{title: ${this.form.title}}\n` + bodyText

        // Retrieve params and generate payload
        const { id, band } = this.$route.params
        const payload = {
          ...this.form,
          body: bodyText,
          band: band
        }

        // Create / Update song
        const r = await this.saveSong({ id, payload })

        // Validate errors
        if (r.error) {
          this.$toast.error(this.$t('saveSong.messages[2]'))
        } else {
          this.$toast.success(this.$t('saveSong.messages[0]'))
          this.$router.push({ name: 'song', params: { band, id: id || r.data.id } })
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
      e.text = chordTransposer.plaintextToChordProFormat(e.text)
    }
  },
  async mounted () {
    const { id, band } = this.$route.params
    if (id) {

      // Retrieve song
      const song = await this.loadBandSong({ id, band })
      this.form = {
        title: song.data.title,
        writter: song.data.writter,
        tone: song.data.tone,
        category: song.data.category.id,
        importUrl: '',
        isPublic: song.data.isPublic
      }
      
      // Replace \n with html elements and meta brackets
      this.song = song.data.body
        .replaceAll('<br>', '\n')
        // Song metadata (dont worry il 'll be generated again)
        .replace(/{title:(.*)}\n/, '')
        .replace(/{artist:(.*)}\n/, '')
        .replace(/{key:(.*)}\n/, '')
      if (!Object.keys(song.data).length > 0) {
        this.$toast.warning(this.$t('saveSong.messages[3]'))
        this.$router.push({ name: 'band', params: { id: band } })
      }

      // Load band categories
      const categories = await this.listBandCategories({ band: song.data.band.id, limit: 0, offset: 0 })
      this.categories = categories.data
      if (!categories.data.length > 0) {
        this.$toast.warning(this.$t('saveSong.messages[4]'))
        this.$router.push({ name: 'band', params: { id: band } })
      }

    } else {
      // Load current band categories
      const categories = await this.listBandCategories({ band, limit: 0, offset: 0 })
      this.categories = categories.data
      if (!categories.data.length > 0) {
        this.$toast.warning(this.$t('saveSong.messages[4]'))
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
        isPublic: {
          required
        }
      }
    }
  }
}
