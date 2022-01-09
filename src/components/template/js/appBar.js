// Component
export default {
  name: 'AppBar',
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}