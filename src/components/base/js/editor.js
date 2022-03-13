// Dependencies
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// Component
export default {
  name: 'base-editor',
  components: { EditorContent, },
  data() {
    return {
      editor: null,
    }
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  watch: {
    modelValue(value) {
      // const isSame = this.editor.getHTML() === value
      const isSame = this.editor.getText() === value
      if (isSame) return
      this.editor.commands.setContent(value, false)
    },
  }, 
  // Mount tiptap editor 
  mounted() {
    this.editor = new Editor({
      content: 'I’m running Tiptap with Vue.js. 🎉',
      extensions: [ StarterKit ],
      content: this.modelValue,
      parseOptions: {
        preserveWhitespace: 'full'
      },
      onUpdate: () => {
        // this.$emit('update:modelValue', this.editor.getHTML())
        console.log('[on update]', this.editor.getText())
        this.$emit('update:modelValue', this.editor.getText())
      },
    })
  },
  // Destroy tiptap editor
  beforeUnmount() {
    this.editor.destroy()
  }
}