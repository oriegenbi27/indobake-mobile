import Vue from 'vue'
import Vuex from 'vuex'
import request from './_api/request'

Vue.use(Vuex)

const api = process.env.VUE_APP_HOST || 'https://api-sig.wapps.id'

// const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    snackbarShow: false,
    snackbarText: '',
    snackbarCentered: false,
    dialogScan: false,
    media: [],
    product: {
      data: [],
      category: [],
      total: 0
    },
    productDetail: {
      show: false,
      data: null
    },
    order: {
      data: [],
      total: 0
    },
    mitra: {
      data: [],
      total: 0
    },
    poin_claim: {
      show: false,
      data: [],
      total: 0
    },
    setting: null,
    progress: 0
  },
  mutations: {
    SET_USER (state, v) {
      if (v) {
        state.user = v || null
      } else {
        state.user = null
      }
    },
    PROGRESS (state, v) {
      state.progress = parseInt(v) || 0
    },
    SETTING_SET (state, v) {
      if (v.branches && typeof v.branches === 'string') {
        try {
          v.branches = JSON.parse(v.branches)
        } catch {
          v.branches = []
        }
      } else {
        v.branches = []
      }
      state.setting = v
    },
    SET_ORDER (state, v) {
      state.order.data = v.data || []
      state.order.total = parseInt(v.total) || 0
    },
    SET_MITRA (state, v) {
      state.mitra.data = v.data || []
      state.mitra.total = parseInt(v.total) || 0
    },
    PRODUCT_DETAIL_SET (state, v) {
      state.productDetail.show = v.show || false
      state.productDetail.data = null
      if (v.show && parseInt(v.pid)) {
        const p = state.product.data.find(r => parseInt(r.id) === parseInt(v.pid))
        if (p) {
          state.productDetail.data = Object.assign({}, p)
        }
      }
    },
    PRODUCT_SET (state, v) {
      state.product.category = []
      state.product.data = v.data || []
      state.product.total = parseInt(v.total) || 0
      const newCategory = []
      newCategory.push('All')
      for (let p = 0; p < v.data.length; p++) {
        const pp = v.data[p]
        if (pp.category) {
          const nc = encodeURIComponent(pp.category.trim())
          const cat = newCategory.find(r => r === nc)
          if (!cat) {
            newCategory.push(nc)
          }
        }
      }
      state.product.category = newCategory
    },
    POIN_CLAIM_SET (state, v) {
      if (!v) {
        state.poin_claim.show = false
        state.poin_claim.data = []
        state.poin_claim.total = 0
      } else {
        state.poin_claim.show = v.show || false
        state.poin_claim.data = v.data || []
        state.poin_claim.total = parseInt(v.total) || 0
      }
    },
    SET_MEDIA (state, v) {
      state.media = v || []
      if (!state.media.length) {
        state.media = [
          {
            id: 1,
            title: 'Indobake - Baking & Mixing Equipment',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            image: '/sample/indobake.jpg'
          },
          {
            id: 2,
            title: 'Indobake - Baking & Mixing Equipment',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            image: '/sample/banner.png'
          }
        ]
      }
    },
    SNACKBAR (state, v) {
      state.snackbarShow = v.show
      state.snackbarText = v.text || ''
      state.snackbarCentered = v.center || false
    },
    SCAN (state, v) {
      document.body.setAttribute('style', 'overflow: hidden;')
      state.dialogScan = v || false
      if (!v) {
        document.body.removeAttribute('style')
      }
    }
  },
  actions: {
    async RESET_PASSWORD (context, params) {
      return request.post(api + '/reset-password', params)
        .then(res => res)
        .catch(e => {
          return {
            status: false,
            data: e
          }
        })
    },
    async SETTING_GET (context, params) {
      return request.get(api + '/setting')
        .then((res) => {
          if (res.status) {
            context.commit('SETTING_SET', Object.assign({}, res.data.data))
            context.dispatch('MITRA_GET')
          }
          return res
        })
        .catch(e => null)
    },
    async SETTING_PROCESS (context, params) {
      return request.post(api + '/setting')
        .then((res) => {
          context.dispatch('SETTING_GET')
          return res
        })
        .catch(e => null)
    },
    async PASSWORD_AUTH (context, params) {
      return request.post(api + '/password-auth', params)
        .then((res) => {
          if (res.status) {
            if (res.data.data.response) {
              context.commit('SNACKBAR', { show: true, text: 'Logged In!' })
              localStorage.setItem('access_token', res.data.data.access_token)
              context.dispatch('ME')
            }
          }
          return res
        })
        .catch(e => null)
    },
    async LOGIN (context, params) {
      return request.post(api + '/login', params)
        .then((res) => {
          if (res.status) {
            if (res.data.data.response) {
              context.commit('SNACKBAR', { show: true, text: 'Logged In!' })
              localStorage.setItem('access_token', res.data.data.access_token)
              context.dispatch('ME')
            }
          }
          return res
        })
        .catch(e => null)
    },
    async REGISTER (context, params) {
      return request.post(api + '/register', params)
        .then(res => res)
        .catch(e => {
          return {
            status: false,
            data: e
          }
        })
    },
    async EMAIL_CHECK (context, email) {
      return request.post(api + '/user/email/' + email)
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async ME ({ commit, dispatch }) {
      return await request.get(api + '/user/me').then((res) => {
        if (res.status) {
          if (res.data.statusCode === 401) {
            commit('SET_USER', null)
          } else if (parseInt(res.data.data.id)) {
            commit('SET_USER', res.data.data)
            dispatch('MEDIA_GET', '?role=' + res.data.data.role)
            if (res.data.data.role === 'user') {
              dispatch('ORDER_GET', '')
            }
          } else {
            commit('SET_USER', null)
          }
        } else {
          commit('SET_USER', null)
        }
        return res
      }).catch(err => err)
    },
    async ME_UPDATE (context, params) {
      return request.put(api + '/user/me', params)
        .then((res) => {
          context.commit('SNACKBAR', { show: true, text: 'Updated!' })
          context.dispatch('ME')
          return res
        })
        .catch(e => null)
    },
    async CHANGE_PASSWORD (context, params) {
      return request.post(api + '/user/change-password', params)
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async ME_LOGOUT (context) {
      localStorage.removeItem('access_token')
      context.commit('SNACKBAR', { show: true, text: 'Logged Out!' })
      context.commit('SET_USER', null)
    },
    async ORDER_GET (context, queries) {
      return request.get(api + '/iseller/order' + (queries || ''))
        .then((res) => {
          context.commit('SET_ORDER', {
            total: res.data.data.total,
            data: (res.data.data.data || []).map((r) => {
              if (r.iseller_detail) {
                try {
                  r.iseller_detail = JSON.parse(r.iseller_detail)
                } catch {
                  r.iseller_detail = null
                }
              }
              return r
            })
          })
          return res
        })
        .catch(e => {
          context.commit('SET_ORDER', [])
        })
    },
    async MEDIA_GET (context, queries) {
      return request.get(api + '/iseller/media' + (queries || ''))
        .then((res) => {
          context.commit('SET_MEDIA', res.data.data.data || [])
          return res
        })
        .catch(e => {
          context.commit('SET_MEDIA', [])
        })
    },
    async PRODUCT_GET (context, queries) {
      return request.get(api + '/iseller/product' + (queries || ''))
        .then((res) => {
          if (res.status) {
            context.commit('PRODUCT_SET', res.data.data)
          }
          return res
        })
        .catch(e => {
          return {
            status: false,
            data: e
          }
        })
    },
    async POIN_HISTORY_GET (context, queries) {
      return request.get(api + '/poin' + (queries || ''))
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async CHECK_POIN () {
      return request.get(api + '/poin/check')
        .then((res) => {
          return res
        })
        .catch(e => {
          return { status: false }
        })
    },
    async POIN_HISTORY_PROCESS_TO_MITRA (context, params) {
      return request.post(api + '/poin/mitra', params)
        .then((res) => {
          return res
        })
        .catch(e => {
          return {
            status: false
          }
        })
    },
    async POIN_HISTORY_CLAIM_MITRA_GET (context, queries) {
      return request.get(api + '/poin/claim-mitra' + (queries || ''))
        .then((res) => {
          if (res.status) {
            context.commit('POIN_CLAIM_SET', Object.assign({ show: true }, res.data.data))
          }
          return res
        })
        .catch(e => {
          return {
            status: false,
            data: e
          }
        })
    },
    async POIN_HISTORY_CLAIM_MITRA_PROCESS (context, params) {
      return request.post(api + '/poin/claim-mitra', params)
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async PENGAJUAN_CICILAN_GET (context, queries) {
      return request.get(api + '/pengajuan/cicilan' + (queries || ''))
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async PENGAJUAN_CICILAN_PROCESS (context, params) {
      return request.post(api + '/pengajuan/cicilan', params)
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async PENGAJUAN_SERVIS_GET (context, queries) {
      return request.get(api + '/pengajuan/servis' + (queries || ''))
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async PENGAJUAN_SERVIS_PROCESS (context, params) {
      return request.post(api + '/pengajuan/servis', params)
        .then((res) => {
          return res
        })
        .catch(e => null)
    },
    async MITRA_GET (context) {
      return request.get(api + '/user/mitra')
        .then((res) => {
          context.commit('SET_MITRA', res.data.data || [])
          return res
        })
        .catch(e => {
          context.commit('SET_MITRA', [])
        })
    },
    async UPLOAD_FILE (context, params) {
      context.commit('PROGRESS', 0)
      const config = {
        onUploadProgress: function (progressEvent) {
          context.commit('PROGRESS', Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
      }
      return await request.post(api + '/upload', params, config).then((res) => res).catch(() => null)
    },
    async MITRA_SUB_GET (context, mitra) {
      return request.get(api + '/user/mitra-sub/' + mitra)
        .then((res) => {
          return res
        })
        .catch(e => {
          return { status: false }
        })
    },
    async MITRA_SUB_PROCESS (context, params) {
      return request.post(api + '/user/mitra-sub', params)
        .then((res) => {
          return res
        })
        .catch(e => {
          return {
            status: false
          }
        })
    }
  },
  modules: {}
})
