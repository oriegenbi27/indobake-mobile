import Vue from 'vue'
import { App } from '@capacitor/app'
import { Device } from '@capacitor/device'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { PushNotifications } from '@capacitor/push-notifications'
import { Dialog } from '@capacitor/dialog'
import { Browser } from '@capacitor/browser'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import QrCodeWithLogo from 'qrcode-with-logos'

let _t
let currentFcmToken = null

Vue.prototype.$_t = function (t) {
  _t = this
}

Vue.prototype.$device = async function () {
  const info = await Device.getInfo()
  return info || {}
}

Vue.prototype.$OpenLink = async function (link) {
  if (_t.$store.state.setting) {
    return await Browser.open({ url: link })
  } else {
    return null
  }
}

Vue.prototype.$OpenLinkWhatsapp = async function (text) {
  if (_t.$store.state.setting) {
    return await Browser.open({ url: 'https://api.whatsapp.com/send?phone=' + _t.$store.state.setting.contact_whatsapp + '&text=' + encodeURIComponent(text) })
  } else {
    return null
  }
}

Vue.prototype.$App = function () {
  return App
}

Vue.prototype.$exitApp = function () {
  App.exitApp()
}

Vue.prototype.$SplashScreenShow = async function () {
  return await SplashScreen.show({
    autoHide: false
  })
}

Vue.prototype.$SplashScreenHide = async function () {
  return await SplashScreen.hide()
}

Vue.prototype.$Camera = function () {
  return Camera
}

Vue.prototype.$CameraResultType = function () {
  return CameraResultType
}

Vue.prototype.$CameraSource = function () {
  return CameraSource
}

Vue.prototype.$StatusBar = function () {
  return StatusBar
}

Vue.prototype.$Style = function () {
  return Style
}

Vue.prototype.$Alert = async function (title, message, button) {
  await Dialog.alert({
    title: title,
    message: message,
    buttonTitle: button || 'Ok'
  })
}

Vue.prototype.$Confirm = async function (title, message, button) {
  const { value } = await Dialog.confirm({
    title: title,
    message: message,
    okButtonTitle: button ? button.ok || 'Ok' : 'Ok',
    cancelButtonTitle: button ? button.cancel || 'Cancel' : 'Cancel'
  })
  return value
}

Vue.prototype.$Prompt = async function (title, message, button, input) {
  const { value, cancelled } = await Dialog.prompt({
    title: title,
    message: message,
    okButtonTitle: button ? button.ok || 'Ok' : 'Ok',
    cancelButtonTitle: button ? button.cancel || 'Cancel' : 'Cancel',
    inputPlaceholder: input.placeholder || '',
    inputText: input.text || ''
  })
  return {
    value,
    cancelled
  }
}

Vue.prototype.$BarcodeScanner = function () {
  if (process.env.NODE_ENV !== 'development') {
    return BarcodeScanner
  } else {
    return null
  }
}

Vue.prototype.$Notification = function (t, me) {
  if (process.env.NODE_ENV !== 'production') {
    return false
  }
  _t = t
  if (me || _t.$store.state.me) {
    const tokens = (me ? me.fcm_ids : (_t.$store.state.me.fcm_ids || [])).filter(r => r)
    if (currentFcmToken && !tokens.find(r => r === currentFcmToken)) {
      tokens.push(currentFcmToken)
      _t.$store.dispatch('ME_UPDATE', {
        fcm_ids: tokens
      })
    }
  }
  PushNotifications.requestPermission().then((result) => {
    if (result.granted) {
      PushNotifications.register()
    } else {
      alert(result)
    }
  })
}

if (process.env.NODE_ENV === 'production') {
  PushNotifications.addListener('registration', (token) => {
    currentFcmToken = token.value
    if (!_t) {
      return false
    } else if (_t.$store.state.me) {
      const tokens = _t.$store.state.me.fcm_ids || []
      if (currentFcmToken && !tokens.find(r => r === currentFcmToken)) {
        tokens.push(currentFcmToken)
        _t.$store.dispatch('ME_UPDATE', {
          fcm_ids: tokens
        })
      }
    }
  })

  PushNotifications.addListener('registrationError', (error) => {
    console.log(error)
  })

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
  })

  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
  })
}

Vue.prototype.$CG_PERMIT = function (data, key) {
  return new QrCodeWithLogo(data)
}

Vue.prototype.$QrCodeWithLogo = function (data) {
  return new QrCodeWithLogo(data)
}
