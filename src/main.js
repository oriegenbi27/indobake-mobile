import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import router from './router'
import store from './store'
import './plugins/capacitor'
import vuetify from './plugins/vuetify'
import './plugins/components'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/styles/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    this.$_t(this)
    this.InitSystem()
  },
  methods: {
    async InitSystem () {
      this.$store.dispatch('MEDIA_GET')
      this.$store.dispatch('SETTING_GET')
      await this.$store.dispatch('PRODUCT_GET', '?status=1')
      if (process.env.NODE_ENV === 'production') {
        await this.$StatusBar().setStyle({ style: this.$Style().Light })
        await this.$StatusBar().setBackgroundColor({ color: '#f3f6fa' })
        await this.$StatusBar().setOverlaysWebView({ overlay: false })
        await this.HideOverlay()
      }
    },
    async HideOverlay () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return await this.$SplashScreenHide()
    }
  }
}).$mount('#app')
