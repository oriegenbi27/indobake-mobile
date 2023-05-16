import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.interceptors.request.use(async function (config) {
  const value = localStorage.getItem('access_token')
  config.headers.common.Authorization = 'Bearer ' + value
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.axios.interceptors.response.use((response) => response, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return error.response.data
      case 401:
        // Storage.remove({ key: 'access_token' })
        return error.response.data
      case 500:
        return error.response.data
      default:
        return error.response.data
    }
  } else {
    return error
  }
})
