import Vue from 'vue'

export default {
  async get (url, opt) {
    return new Promise(resolve => {
      Vue.axios.get(url, opt || {}).then(response => {
        resolve({
          status: true,
          data: response
        })
      }).catch((error) => {
        resolve({
          status: false,
          data: error
        })
      })
    })
  },
  async post (url, params, opt) {
    return new Promise(resolve => {
      Vue.axios.post(url, params, opt || {}).then(response => {
        resolve({
          status: true,
          data: response
        })
      }).catch((error) => {
        resolve({
          status: false,
          data: error
        })
      })
    })
  },
  async put (url, params) {
    return new Promise(resolve => {
      Vue.axios.put(url, params).then(response => {
        resolve({
          status: true,
          data: response
        })
      }).catch((error) => {
        resolve({
          status: false,
          data: error
        })
      })
    })
  },
  async patch (url, params) {
    return new Promise(resolve => {
      Vue.axios.patch(url, params).then(response => {
        resolve({
          status: true,
          data: response
        })
      }).catch((error) => {
        resolve({
          status: false,
          data: error
        })
      })
    })
  },
  async delete (url, params) {
    return new Promise(resolve => {
      Vue.axios.delete(url, params).then(response => {
        resolve({
          status: true,
          data: response
        })
      }).catch((error) => {
        resolve({
          status: false,
          data: error
        })
      })
    })
  }
}
