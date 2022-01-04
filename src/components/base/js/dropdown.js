export default {
  name: 'base-dropdown',
  props: {
    direction: {
      type: String,
      default: 'down',
    },
    title: {
      type: String,
      description: 'Dropdown title',
    },
    icon: {
      type: String,
      description: 'Icon for dropdown title',
    },
    position: {
      type: String,
      description: 'Position of dropdown menu (e.g right|left)',
    },
    menuClasses: {
      type: [String, Object],
      description: 'Dropdown menu classes',
    },
    hideArrow: {
      type: Boolean,
      description: 'Whether dropdown arrow should be hidden',
    },
    appendToBody: {
      type: Boolean,
      default: true,
      description: 'Whether dropdown should be appended to document body',
    },
    tag: {
      type: String,
      default: 'li',
      description: 'Dropdown html tag (e.g div, li etc)',
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen
      this.$emit('change', this.isOpen)
    },
    closeDropDown() {
      this.isOpen = false
      this.$emit('change', this.isOpen)
    },
  }
}
