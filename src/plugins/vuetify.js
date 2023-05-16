import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { Browser } from '@capacitor/browser'

Vue.use(Vuetify)

Vue.prototype.$OpenBrowser = async function (url) {
  await Browser.open({ url: url })
}

Vue.prototype.$localDT = function (utcDate, type) {
  const localDate = utcDate ? new Date(utcDate) : new Date()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // const year = localDate.getFullYear().toString().substr(-2)
  const year = localDate.getFullYear().toString()
  const month = monthNames[localDate.getMonth()]
  const day = localDate.getDate()
  const dayName = dayNames[localDate.getDay()]

  /* eslint-disable-next-line */
  const seconds = localDate.getSeconds()
  const minutes = localDate.getMinutes()
  const hour = localDate.getHours()

  if (type === 'daydate') {
    return dayName + ', ' + (day < 10 ? '0' + day : day) + ' ' + month + ' ' + year
  } else if (type === 'number') {
    return (day < 10 ? '0' + day : day) + '' + ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1)) + '' + year.substr(2, 2)
  } else if (type === 'date') {
    return dayName + ' ' + month + ', ' + year
  } else if (type === 'display') {
    return month + ' ' + (day < 10 ? '0' + day : day) + ', ' + year
  } else if (type === 'datelocal') {
    return (day < 10 ? '0' + day : day) + '/' + ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1)) + '/' + year
  } else if (type === 'datetimelocal') {
    return (day < 10 ? '0' + day : day) + '/' + ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1)) + '/' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
  } else if (type === 'monthyear') {
    return month + ', ' + year
  } else if (type === 'datedefault') {
    return year + '-' + ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1)) + '-' + (day < 10 ? '0' + day : day)
  } else if (type === 'datetimedefault') {
    return year + '-' + (localDate.getMonth() + 1) + '-' + day + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
  } else if (type === 'time') {
    return (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
  } else if (type === 'datetime') {
    return dayName + ', ' + day + ' ' + month + ' ' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
  } else {
    return localDate
  }
}

Vue.prototype.$ArrayToStr = function (json) {
  if (json) {
    try {
      json = JSON.stringify(json)
    } catch {
      return json
    }
    return json
  }
  return ''
}

Vue.prototype.$StrToArray = function (str) {
  if (str) {
    if (str.substr(0, 1) === '[') {
      try {
        str = JSON.parse(str)
      } catch {
        str = [str]
      }
    } else {
      str = [str]
    }
    return str
  }
  return []
}

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#02407d',
        secondary: '#d6e5fa',
        accent: '#f3f6fa',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})
