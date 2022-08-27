// Dependencies
import axios from 'axios'
import crypto from 'crypto'
import useVuelidate from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, maxLength, email } from '@vuelidate/validators'
import { asyncHandler } from '../../../utils'

// Component
export default {
  name: 'Profile',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    form: {
      avatar: '',
      name: '',
      email: ''
    },
    isImageUploading: false
  }),
  computed: {
    ...mapGetters({
      me: 'account/getMe',
      accountLoading: 'account/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      updateProfile: 'account/updateProfile',
      loadMe: 'account/loadMe',
      resetStore: 'RESET'
    }),
    logout () {
      this.resetStore()
      this.$router.push({ name: 'signin' })
    },
    async uploadImage(evt) {
      const files = evt.target.files
      if (!files.length) {
        return this.$toast.warning(this.$t('profile.messages[4]'))
      }
      if (/^image/.test(files[0].type)) {

        // Start pre upload proccess
        const file = files[0]
        this.isImageUploading = true

        // Call cloudinary api
        const apiKey = process.env.VUE_APP_CLOUDINARY_KEY
        const apiSecret = process.env.VUE_APP_CLOUDINARY_SECRET
        const preset = process.env.VUE_APP_CLOUDINARY_PRESET
        const cloud = process.env.VUE_APP_CLOUDINARY_URL
        const endpoint = `https://api.cloudinary.com/v1_1/${cloud}/image/upload`

        // Notify user
        this.$toast.info(this.$t('profile.messages[5]'))

        // Gather request data
        const timestamp = Date.now()
        let shasum = crypto.createHash('sha1')
        const info = `folder=playliter_profile_pictures&timestamp=${timestamp}&upload_preset=${preset}${apiSecret}`
        shasum.update(info, 'binary')
        const requestHash = shasum.digest('hex')

        // Mount request payload
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'playliter_profile_pictures')
        formData.append('upload_preset', preset)
        formData.append('api_key', apiKey)
        formData.append('timestamp', timestamp)
        formData.append('signature', requestHash)

        // Request cloudinary
        const response = await asyncHandler(
          axios.post(endpoint, formData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          })
        )
        if (![200, 201].includes(response.status)) {
          this.$toast.error(this.$t('profile.messages[6]'))
          document.getElementById('newProfilePhoto').value = ''
        } else {
          const uploadedUrl = response.data.url
          this.form.avatar = uploadedUrl
          this.$toast.success(this.$t('profile.messages[7]'))
        }

        // Notify loading finish
        this.isImageUploading = false

      } else {
        this.$toast.warning('O arquivo informado não é uma imagem válida.')
      }
    },
    async saveProfile () {
      this.v$.form.$touch()
      if (!this.v$.error && !this.v$.$invalid) {

        const payload = { ...this.form }
        const r = await this.updateProfile({ id: this.me.id, payload })
        if (r.error) {
          this.$toast.error(r.message || this.$t('profile.messages[0]'))
        } else {
          this.$toast.success(this.$t('profile.messages[1]'))
          const pr = await this.loadMe()
          if (pr.error) {
            if (pr.message.includes('Unauthorized')) {
              // Reset store and logoff
              this.logout()
            } else {
              this.$toast.error(this.$t('profile.messages[2]'))
            }
          }
        }
      } else {
        this.$toast.warning(this.$t('profile.messages[3]'))
      }
    }
  },
  mounted () {
    this.form = {
      avatar: this.me.avatar,
      email: this.me.email,
      name: this.me.name
    }
  },
  validations () {
    return {
      form: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(128)
        },
        email: {
          required,
          email
        }
      }
    }
  }
}
