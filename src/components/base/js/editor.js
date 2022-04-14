// Dependencies
import { Editor, EditorContent } from '@tiptap/vue-3'

// Tiptap extensions
import StarterKit from '@tiptap/starter-kit'
// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import Bold from '@tiptap/extension-bold'

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
      if (this.editor.getText() === value) return
      this.editor.commands.setContent(value, false)
    },
  }, 
  // Mount tiptap editor 
  mounted() {
    this.editor = new Editor({
      content: 'Transcreva sua canção aqui 🎉',
      content: this.modelValue,
      extensions: [
        StarterKit
      ],
      parseOptions: {
        preserveWhitespace: 'full'
      },
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getText())
      },
    })
  },
  // Destroy tiptap editor
  beforeUnmount() {
    this.editor.destroy()
  }
}