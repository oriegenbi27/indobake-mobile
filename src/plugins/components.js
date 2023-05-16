import Vue from 'vue'

Vue.component('FileList', () => import(/* webpackChunkName: "file-list" */ '@/components/FileList.vue'))
Vue.component('Onboarding', () => import(/* webpackChunkName: "onboarding" */ '@/components/Onboarding.vue'))
Vue.component('Scan', () => import(/* webpackChunkName: "scan" */ '@/components/Scan.vue'))

Vue.prototype.$localDT = function (utcDate, type, tz) {
  const localDate = utcDate ? new Date(utcDate) : new Date()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  // const year = localDate.getFullYear().toString().substr(-2)
  const year = localDate.getFullYear().toString()
  const month = monthNames[localDate.getMonth()]
  const monthFull = monthNamesFull[localDate.getMonth()]
  const day = localDate.getDate()
  const dayName = dayNames[localDate.getDay()]

  /* eslint-disable-next-line */
  const seconds = localDate.getSeconds()
  const minutes = localDate.getMinutes()
  const hour = localDate.getHours()

  if (type === 'daydate') {
    return dayName + ', ' + (day < 10 ? '0' + day : day) + ' ' + month + ' ' + year
  } else if (type === 'gmt') {
    return (day < 10 ? '0' + day : day) + ' ' + monthFull + ' ' + year
  } else if (type === 'gmtoffset') {
    return monthFull + ' ' + (day < 10 ? '0' + day : day) + ', ' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':00 GMT' + tz
  } else if (type === 'display') {
    return month + ' ' + (day < 10 ? '0' + day : day) + ', ' + year
  } else if (type === 'date') {
    return dayName + ' ' + month + ', ' + year
  } else if (type === 'monthyear') {
    return month + ', ' + year
  } else if (type === 'datedefault') {
    return year + '-' + ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1)) + '-' + (day < 10 ? '0' + day : day)
  } else if (type === 'datetimedefault') {
    return year + '-' + ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1)) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
  } else if (type === 'time') {
    return (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
  } else if (type === 'datetime') {
    return dayName + ' ' + month + ', ' + year + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
  } else if (type === 'datemonth') {
    return (day < 10 ? '0' + day : day) + '/' + ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1))
  } else if (type === 'month') {
    return ((localDate.getMonth() + 1) < 10 ? '0' + (localDate.getMonth() + 1) : (localDate.getMonth() + 1))
  } else if (type === 'monthname') {
    return month
  } else {
    return localDate
  }
}

Vue.prototype.$price = function (value) {
  if (!value) {
    return 'Rp0'
  }
  value = parseInt(value).toLocaleString()
  return 'Rp' + (value ? value.replace(',', '.') : value)
}

Vue.prototype.$getImage = function (images, index) {
  try {
    const newGalleries = JSON.parse(images)
    if (newGalleries.length) {
      if (process.env.NODE_ENV === 'production') {
        const returned = (newGalleries[index ? (newGalleries.length > index ? index : 0) : 0])
        return returned
      } else {
        const returned = (newGalleries[index ? (newGalleries.length > index ? index : 0) : 0])
        return returned
      }
    } else {
      return '/no-image.png'
    }
  } catch {
    return '/no-image.png'
  }
}

Vue.prototype.$getImageAll = function (galleriesString) {
  try {
    const newGalleries = JSON.parse(galleriesString)
    if (newGalleries.length) {
      if (process.env.NODE_ENV === 'production') {
        // return newGalleries
        return newGalleries.map((r) => {
          r.replace('https://susimarine.com', 'https://dev.susimarine.com')
          return r
        })
      } else {
        return newGalleries.map((r) => {
          r.replace('https://susimarine.com', 'https://dev.susimarine.com')
          return r
        })
      }
    } else {
      return ['/no-image.png']
    }
  } catch {
    return ['/no-image.png']
  }
}

Vue.prototype.$NumberOnly = function (e) {
  const key = e.keyCode ? e.keyCode : e.which
  if (isNaN(String.fromCharCode(key)) && key !== 8 && key !== 46 && key !== 37 && key !== 39 && key !== 45) {
    e.preventDefault()
    return false
  }
}

Vue.prototype.$validateEmail = function (email) {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

Vue.prototype.$reformatPhone = function (phone) {
  if (phone) {
    phone = phone.replace('+', '')
    if (phone.substring(0, 1) === '8') {
      return phone
    } else if (phone.substring(0, 2) === '08') {
      return phone.substring(1, phone.length)
    } else if (phone.substring(0, 2) === '62') {
      return phone.substring(2, phone.length)
    } else if (phone.substring(0, 3) === '+62') {
      return phone.substring(3, phone.length)
    } else {
      return phone
    }
  } else {
    return phone
  }
}

Vue.prototype.$phone = function (phone) {
  if (phone) {
    if (parseInt(phone.substr(0, 1)) === 0) {
      return phone
    } else if (parseInt(phone.substr(0, 1)) === 8) {
      return '62' + phone
    }
  }
  return phone || ''
}

Vue.prototype.$validatePhone = function (phone, arePhone) {
  if (phone) {
    if (phone.length > 7 && phone.length < 15) {
      return true
      // if (arePhone === '0' && phone.length > 9 && phone.length < 14) {
      //   if (phone.substring(0, 1) === '0') {
      //     return true
      //   } else {
      //     return false
      //   }
      // } else if (arePhone) {
      //   if (phone.substring(0, 1) === '2' || phone.substring(0, 2) === '02' || phone.substring(0, 2) === '62' || phone.substring(0, 3) === '+62') {
      //     return true
      //   } else {
      //     return false
      //   }
      // } else if (phone.substring(0, 1) === '8' || phone.substring(0, 2) === '08' || phone.substring(0, 2) === '62' || phone.substring(0, 3) === '+62') {
      //   return true
      // } else {
      //   return false
      // }
    } else {
      return false
    }
  } else {
    return false
  }
}
