<template>
  <div
    v-show="show"
    class="dialog-scan white"
  >
    <div class="scan-area">
      <div v-if="$store.state.user" class="fill-height pb-16" style="overflow-y: auto;">
        <div v-if="!Aurhenticated && $store.state.user.role === 'user'" class="pt-16 d-flex f-width flex-column align-center justify-center px-8 pt-8 pb-4 bg-main">
          <v-text-field
            v-model="AurhenticatedPassword"
            label="Password"
            type="password"
            hide-details
            outlined
            color="primary"
            class="mb-4 accent d-flex justify-center text-h6 rounded-lg"
            @keypress.enter="Aurhenticate()"
          />
          <v-btn :disabled="AurhenticatedLoading" color="primary" class="rounded-pill text-capitalize" dark @click.prevent="Aurhenticate()">
            Show Qr Code
          </v-btn>
        </div>
        <v-card v-else-if="$store.state.user.role === 'user'" flat class="d-flex f-width flex-column align-center justify-center px-8 pt-8 pb-4 bg-main">
          <div class="font-weight-bold pt-4 pb-1 text-h5" style="font-size: 1.2rem;">
            {{ $store.state.user.name }}
          </div>
          <div class="text-center grey--text text--darken-1 text-truncate" style="font-size: 1.2rem;">
            {{ ($store.state.user.email).toLowerCase() }}<br>
            {{ ($store.state.user.phone).toLowerCase() }}
          </div>
          <div class="d-flex fill-width align-center justify-center mt-2 mb-2 p-relative" style="height:275px;">
            <canvas id="canvas" />
            <span v-if="PoinQuantity < 1" class="text-center d-flex align-center justify-center px-16 text-h5" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:rgba(255, 255, 255, .97);">
              Please set point quantity
            </span>
          </div>
          <!-- <div class="d-flex fill-width justify-center px-4 pt-0 pb-0">
            <img src="/logo-h.png" style="height: 20px;">
          </div> -->
          <div class="d-flex fill-width align-center justify-center text-h5 font-weight-bold pt-2">
            <img src="/logo-h-bake.png" class="d-flex mr-2" style="height:26px;"> Poin : {{ parseInt($store.state.user.poin) }}
          </div>
          <div class="d-flex flex-column fill-width justify-center align-center py-8 px-16">
            <div class="mb-2">
              Gunakan :
            </div>
            <v-text-field
              v-model="PoinQuantity"
              suffix="Poin"
              solo
              hide-details
              color="primary"
              class="accent d-flex justify-center text-h6 rounded-pill centered-input"
              @keypress="$NumberOnly"
              @keyup="(parseInt(PoinQuantity) ? (PoinQuantity = parseInt(PoinQuantity)) : PoinQuantity = 0), InitMyQr()"
            />
          </div>
        </v-card>
        <v-card v-else flat class="fill-height d-flex align-center justify-center transparent scanner-frame">
          <div class="transparent bg-cover d-flex fill-width fill-height" :style="{ backgroundImage: 'url(' + require('@/assets/qr-scanner.png') + ')' }" />
        </v-card>
      </div>
      <div style="position:fixed;bottom:40px;left:0px;width:100%;text-align:center;">
        <v-chip color="red" dark class="px-6" @click.prevent="$router.go(-1)">
          Close
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
let IntervalPoint = null
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: vm => ({
    Aurhenticated: false,
    AurhenticatedLoading: false,
    AurhenticatedPassword: '',
    PoinQuantity: 0
  }),
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.PoinQuantity = 0
        if (to) {
          if (to.hash === '#show-scan' && this.$store.state.user.role === 'mitra') {
            if (process.env.NODE_ENV !== 'development') {
              this.$BarcodeScanner().prepare()
            }
          }
        }
        if (from) {
          if (from.hash === '#show-scan') {
            this.tab = 0
            if (process.env.NODE_ENV !== 'development') {
              this.stopScan()
            }
          }
        }
      }
    },
    show (v) {
      this.Aurhenticated = false
      this.AurhenticatedLoading = false
      this.AurhenticatedPassword = ''
      if (v) {
        if (this.$store.state.user) {
          if (this.$store.state.user.role === 'mitra') {
            if (process.env.NODE_ENV !== 'development') {
              this.startScan()
            }
          } else {
            if (process.env.NODE_ENV !== 'development') {
              this.stopScan()
            }
          }
        }
      } else {
        this.stopScan()
      }
    }
  },
  methods: {
    Aurhenticate () {
      this.AurhenticatedLoading = true
      if (!this.AurhenticatedPassword) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input password!' })
        return false
      }
      this.$store.dispatch('PASSWORD_AUTH', { pwd: this.AurhenticatedPassword })
        .then((res) => {
          if (res) {
            if (res.status) {
              if (res.data.data) {
                this.InitMyQr()
                this.Aurhenticated = true
              } else {
                this.$store.commit('SNACKBAR', { show: true, text: 'Ops, invalid password!' })
              }
            } else {
              this.$store.commit('SNACKBAR', { show: true, text: 'Ops, something went wrong!' })
            }
          } else {
            this.$store.commit('SNACKBAR', { show: true, text: 'Something went wrong!' })
          }
          this.AurhenticatedLoading = false
        })
    },
    InitMyQr () {
      if (parseInt(this.PoinQuantity) > parseInt(this.$store.state.user.poin)) {
        this.PoinQuantity = parseInt(this.$store.state.user.poin) || 0
      }
      if (!parseInt(this.PoinQuantity)) {
        this.PoinQuantity = 0
      }
      if (this.PoinQuantity) {
        if (IntervalPoint) {
          clearInterval(IntervalPoint)
        }
        IntervalPoint = setInterval(() => {
          this.CheckPointUpdate()
        }, 2000)
      }
      setTimeout(() => {
        const qrcode = this.$QrCodeWithLogo({
          canvas: document.getElementById('canvas'),
          content: this.$store.state.user.id + ':' + this.PoinQuantity,
          width: 275,
          image: document.getElementById('image'),
          nodeQrCodeOptions: {
            color: {
              dark: '#000'
            }
          },
          logo: {
            src: '/icon.png',
            logoRadius: 20,
            logoSize: 0.15,
            borderColor: '#fff'
          }
        })
        qrcode.toCanvas().then(() => {
        })
      }, 300)
    },
    CheckPointUpdate () {
      this.$store.dispatch('CHECK_POIN')
        .then((res) => {
          if (res.status) {
            const updatedPoin = parseInt(res.data.data) || -1
            if (updatedPoin !== -1 && (updatedPoin !== parseInt(this.$store.state.user.poin))) {
              const decreasedPoint = parseInt(this.$store.state.user.poin) - updatedPoin
              this.$store.commit('SNACKBAR', { show: true, text: (decreasedPoint + ' points successfully used!') })
              this.$router.go(-1)
            } else {
              // console.log('no update!')
            }
          }
        })
    },
    startScan () {
      this.didUserGrantPermission().then((res) => {
        if (res) {
          this.startScanOpen()
        } else {
          this.tab = 0
        }
      })
    },
    async startScanOpen () {
      this.$BarcodeScanner().hideBackground()
      document.body.classList.add('qr-scanner-show')
      const result = await this.$BarcodeScanner().startScan({ targetedFormats: ['QR_CODE'] })
      if (result.hasContent) {
        this.$router.replace('#indobake:' + result.content)
      }
    },
    stopScan () {
      if (IntervalPoint) {
        clearInterval(IntervalPoint)
      }
      this.$store.dispatch('ME')
      const b = this.$BarcodeScanner()
      if (b) {
        b.showBackground()
        b.stopScan()
      }
      document.body.classList.remove('qr-scanner-show')
    },
    async didUserGrantPermission () {
      const status = await this.$BarcodeScanner().checkPermission({ force: false })
      if (status.granted) {
        // user granted permission
        return true
      }
      if (status.denied) {
        // the user denied permission for good
        // redirect user to app settings if they want to grant it anyway
        const c = await this.$Confirm('Need camera permission!', 'Camera permission denied, enable it in the App Settings ?', {
          ok: 'Open',
          cancel: 'Deny'
        })
        if (c) {
          this.$BarcodeScanner().openAppSettings()
        }
      }
      if (status.asked) {
        // system requested the user for permission during this call
        // only possible when force set to true
      }
      if (status.neverAsked) {
        // // user has not been requested this permission before
        // // it is advised to show the user some sort of prompt
        // // this way you will not waste your only chance to ask for the permission
        // const c = await this.$Confirm('Camera permission :', 'We need camera permission to scan qrcode!', {
        //   ok: 'Open',
        //   cancel: 'Deny'
        // })
        // if (!c) {
        //   return false
        // }
      }
      if (status.restricted || status.unknown) {
        // ios only
        // probably means the permission has been denied
        return false
      }
      // user has not denied permission
      // but the user also has not yet granted the permission
      // so request it
      const statusRequest = await this.$BarcodeScanner().checkPermission({ force: true })
      if (statusRequest.asked) {
        // system requested the user for permission during this call
        // only possible when force set to true
      }
      if (statusRequest.granted) {
        // the user did grant the permission now
        return true
      }
      // user did not grant the permission, so he must have declined the request
      return false
    }
  }
}
</script>

<style lang="scss">
.span-title {
  border-radius: 30px;
  padding: 7px 20px;
  box-shadow: inset 1px 1px 10px rgba(14, 48, 71, .1);
}
.dialog-scan {
  position: fixed;
  // height: 0px;
  width: 100%;
  opacity: 0;
  // transition: all .15s ease;
  top: 0px;
  left: 0px;
  z-index: 3;
  height: 100%;
  opacity: 1;
  top: unset;
  overflow: hidden;
  z-index: 100;
  .v-dialog--fullscreen {
    position: relative;
  }
  &::before {
    display: none!important;
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: -1;
    opacity: 0;
    transition: all .5s ease;
    visibility: hidden;
  }
  .scan-area {
    height: 100%;
    >.tab-area {
      height: calc(100% - 47px)!important;
      .v-window__container {
        height: 100%!important;
        canvas {
          // border: solid 4px #eb660e!important;
          padding: 7px!important;
          padding: 2px;
          border-radius: 20px!important;
        }
      }
    }
  }
}
.v-text-field {
  &.centered-input {
    &.v-text-field--prefix {
      input {
        text-align:center!important;
        font-weight:bold;
      }
    }
  }
}
</style>
