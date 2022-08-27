import { createApp } from 'vue'
import App from './main/App.vue'
import './registerServiceWorker'
import plugins from './main/plugins'
import router from './main/router'
import store from './main/store'

createApp(App)
  .use(store)
  .use(router)
  .use(plugins)
  .mount('#app')
