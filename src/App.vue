<template>
  <v-app :class="[platform]">
    <!-- <div v-if="onboardingShow" style="position:fixed;top:0px;left:0px;width:100vw;height:100vh;background:#fff;z-index:6;">
    </div> -->
    <v-dialog
      v-model="onboardingShow"
      fullscreen
      hide-overlay
      persistent
      no-click-animation
      eager
      transition="dialog-bottom-transition"
    >
      <Onboarding @close="onboardingShow = false" />
    </v-dialog>
    <v-snackbar
      v-model="snackbarElShow"
      :centered="$store.state.snackbarCentered"
      :top="!$store.state.snackbarCentered"
      :multi-line="true"
      dark
      color="black"
    >
      {{ $store.state.snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          icon
          small
          v-bind="attrs"
          @click="snackbarElShow = false"
        >
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-app-bar
      app
      color="accent"
      class="elevation-0"
    >
      <div class="d-flex align-center font-weight-bold">
        <!-- <v-badge
          bordered
          color="red"
          icon="mdi-star"
          dark
          overlap
          offset-x="10"
          offset-y="10"
        >
        </v-badge> -->
        <img src="/logo-h-shadow.png" class="d-block" style="padding:3px;height: 24px;">
        <span class="ml-2">
          <sup v-if="$store.state.user">
            <v-chip :color="$store.state.user.role === 'user' ? 'orange darken-1' : 'cyan darken-1'" dark x-small class="text-capitalize">
              {{ $store.state.user.role === 'user' ? 'Customer' : $store.state.user.role }}
            </v-chip>
          </sup>
        </span>
      </div>

      <v-spacer />
      <div class="d-flex align-center">
        <v-btn v-if="$store.state.user" to="/profile" icon small color="primary">
          <v-icon>
            mdi-account
          </v-icon>
        </v-btn>
        <v-btn v-else icon small color="primary" @click.prevent="onboardingShow = true">
          <v-icon>
            mdi-account
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="pb-15">
      <transition name="fade">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </v-main>
    <v-bottom-navigation fixed grow>
      <v-btn text replace :color="$route.name === 'Home' ? 'primary' : ''" to="/">
        <!-- <small class="font-weight-regular" style="padding-top: 2px;font-size:12px;">Home</small> -->
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <template v-if="$store.state.user">
        <v-btn v-if="$store.state.user.role === 'mitra'" :replace="$route.name === 'Home' ? false : true" text :color="$route.name === 'PoinHistory' ? 'primary' : ''" to="/poin-history">
          <v-icon :color="$route.name === 'PoinHistory' ? 'primary' : ''">mdi-plus-circle-multiple-outline</v-icon>
        </v-btn>
        <v-btn v-else :replace="$route.name === 'Home' ? false : true" text :color="$route.name === 'MyProduct' ? 'primary' : ''" to="/myproduct">
          <v-icon :color="$route.name === 'MyProduct' ? 'primary' : ''">mdi-cube-scan</v-icon>
        </v-btn>
      </template>
      <v-btn v-else text :color="$route.name === 'MyProduct' ? 'primary' : ''" @click.prevent="onboardingShow = true">
        <v-icon :color="$route.name === 'MyProduct' ? 'primary' : ''">mdi-cube-scan</v-icon>
      </v-btn>

      <v-btn v-if="$store.state.user" text :color="$route.name === 'Scan' ? 'primary' : ''" to="#show-scan">
        <!-- <span class="font-weight-regular" style="padding-top: 2px;font-size:12px;">{{ $store.state.user.role === 'user' ?'QrCode' : 'Scan' }}</span> -->
        <v-icon :color="$route.name === 'Scan' ? 'primary' : ''">mdi-qrcode</v-icon>
      </v-btn>
      <v-btn v-else text :color="$route.name === 'Scan' ? 'primary' : ''" @click.prevent="onboardingShow = true">
        <!-- <span class="font-weight-regular" style="padding-top: 2px;font-size:12px;">{{ $store.state.user.role === 'user' ?'QrCode' : 'Scan' }}</span> -->
        <v-icon :color="$route.name === 'Scan' ? 'primary' : ''">mdi-lock</v-icon>
      </v-btn>

      <v-btn :replace="$route.name === 'Home' ? false : true" text :color="$route.name === 'Product' ? 'primary' : ''" to="/product">
        <!-- <span class="font-weight-regular" style="padding-top: 2px;font-size:12px;">Catalog</span> -->
        <v-icon :color="$route.name === 'Product' ? 'primary' : ''">mdi-cube-outline</v-icon>
      </v-btn>

      <v-btn :replace="$route.name === 'Home' ? false : true" text :color="$route.name === 'Info' ? 'primary' : ''" to="/info">
        <!-- <small class="font-weight-regular" style="padding-top: 2px;font-size:12px;">Info</small> -->
        <v-icon :color="$route.name === 'Info' ? 'primary' : ''">mdi-information-outline</v-icon>
      </v-btn>

    </v-bottom-navigation>
    <v-dialog
      :value="$store.state.poin_claim.show"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card class="rounded-0">
        <v-toolbar dark color="cyan darken-1" class="elevation-1">
          <v-toolbar-title>
            <v-btn
              depressed
              color="cyan darken-3"
              class="text-capitalize"
              @click.prevent="ADD_CLAIM_POIN()"
            >
              <v-icon dark class="mr-2">
                mdi-cash-multiple
              </v-icon>
              <span class="text-capitalize">Redeem Poin</span>
            </v-btn>
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="$store.commit('POIN_CLAIM_SET')"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="pa-4">
          <div v-if="!$store.state.poin_claim.data.length" class="pa-4 text-center">
            no data
          </div>
          <div v-else>
            <v-card v-for="(pc, iPc) in $store.state.poin_claim.data" :key="'poin-claim-' + iPc" class="d-flex justify-space-between align-center pa-2 elevation-1 mb-2">
              <div>
                <div>
                  {{ $localDT(pc.created, 'display') }}
                </div>
                {{ pc.poin }} poin
              </div>
              <div class="d-flex aligncenter">
                {{ parseInt(pc.status) === 99 ? 'Declined' : (parseInt(pc.status) === 2 ? 'Completed' : (parseInt(pc.status) === 1 ? 'Confirmed' : 'Pending')) }}
              </div>
            </v-card>
          </div>
        </div>
        <v-dialog
          v-model="dialogClaimPoinNew.show"
          max-width="400px"
        >
          <v-card v-if="dialogClaimPoinNew.show" class="rounded-0">
            <v-card-title class="d-flex fill-width justify-center align-center">
              <span v-if="dialogClaimPoinNew.data">
                Redeem Poin
              </span>
            </v-card-title>
            <v-divider />
            <v-card-text class="py-8">
              <div v-if="dialogClaimPoinNew.data" class="pb-4 px-2">
                <v-text-field
                  v-model.number="dialogClaimPoinNew.data.poin"
                  type="text"
                  label="Redeem Poin"
                  color="cyan"
                  outlined
                  dense
                  hide-details
                  class="mb-4"
                  suffix="poin"
                  @keypress="$NumberOnly"
                  @keyup="parseInt(dialogClaimPoinNew.data.poin) ? (dialogClaimPoinNew.data.poin = parseInt(dialogClaimPoinNew.data.poin)) : dialogClaimPoinNew.data.poin = 0"
                  @keypress.enter="POIN_CLAIM_PROCESS()"
                />
                <!-- @keyup="dialogClaimPoinNew.data.poin = (
                  parseInt(dialogClaimPoinNew.data.poin) ? (parseInt(dialogClaimPoinNew.data.poin) > parseInt($store.state.user.poin) ? parseInt($store.state.user.poin) : parseInt(dialogClaimPoinNew.data.poin)) : parseInt($store.state.user.poin)
                )" -->
                <v-btn block color="orange" depressed dark @click.prevent="POIN_CLAIM_PROCESS()">
                  Redeem Poin
                </v-btn>
              </div>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-btn
                color="red darken-1"
                text
                small
                class="text-capitalize"
                @click="dialogClaimPoinNew.show = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-dialog>
    <v-dialog
      :value="$store.state.productDetail.show"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card class="rounded-0">
        <v-toolbar color="accent" class="elevation-0">
          <v-toolbar-title>
            <span class="text-capitalize">Product Detail</span>
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            icon
            @click="$router.go(-1)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div v-if="$store.state.productDetail.data" class="pa-0" style="height:calc(100vh - 64px);overflow-y:auto;">
          <div class="pa-0 text-center">
            <v-carousel :show-arrows="false" height="auto" cycle hide-delimiters>
              <v-carousel-item
                v-for="(img, iimg) in $getImageAll($store.state.productDetail.data.images)"
                :key="'product-detail-image-' + iimg"
              >
                <div>
                  <div class="bg-cover fill-width" :style="{ backgroundImage: 'url(' + img + ')' }" style="padding-bottom:100%;" />
                </div>
              </v-carousel-item>
            </v-carousel>
            <div class="text-left pa-4">
              <div class="text-h5 font-weight-bold">
                {{ $store.state.productDetail.data.name }}
              </div>
              <div class="body-2 grey--text text--darken-3">
                {{ $store.state.productDetail.data.category }}
              </div>
              <div class="text-h5 font-weight-bold pb-2 pt-2">
                {{ $price($store.state.productDetail.data.price) }}
              </div>
              <div class="body-1" style="white-space: pre-wrap;" v-html="$store.state.productDetail.data.description || '-'" />
              <div v-if="$store.state.user ? !($store.state.user.role === 'mitra' && parseInt($store.state.user.sub_id)) : true" class="py-12 d-flex fill-width align-center justify-space-between">
                <v-spacer />
                <v-btn color="primary lighten-1" class="text-capitalize rounded-lg" dark @click.prevent="$OpenLinkWhatsapp('Halo, informasi terkait produk ' + $store.state.productDetail.data.name)">
                  <v-icon small class="mr-2">
                    mdi-whatsapp
                  </v-icon>
                  get offers
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <transition :name="$route.hash === '#show-scan' ? 'slide-top' : 'slide-bottom'">
      <Scan v-show="$store.state.dialogScan" :show="$store.state.dialogScan" />
    </transition>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
const DEFAULT_TRANSITION = 'fade'
export default {
  name: 'App',

  data: () => ({
    platform: 'android',
    firstLoad: true,
    onboardingShow: false,
    transitionName: DEFAULT_TRANSITION,
    snackbarElShow: false,
    bottomMenus: 'home',
    search: '',
    tableLoading: true,
    table: [],
    tableTotal: 0,
    tablePage: 1,
    tableLimit: 10,
    options: {},
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Status', value: 'status' },
      { text: 'Action', value: 'action', sortable: false }
    ],
    dialogUser: {
      show: false,
      data: null
    },
    dialogUserNew: {
      show: false,
      data: null
    },
    dialoClaimPoinShow: false,
    dialogClaimPoinNew: {
      show: false,
      data: null
    },
    ResetUserPassword: ''
  }),
  computed: mapState({
    snackbarShow: state => state.snackbarShow
  }),
  watch: {
    dialoClaimPoinShow (v) {
      if (v) {
        this.LoadClaimPoin()
      }
    },
    $route: {
      immediate: true,
      handler (to, from) {
        this.$store.commit('PRODUCT_DETAIL_SET', { show: false, pid: null })
        this.$store.commit('SCAN', false)
        if (to.query.productDetail) {
          this.$store.commit('PRODUCT_DETAIL_SET', { show: true, pid: to.query.productDetail || null })
        }
        if (to.hash === '#show-scan') {
          this.$store.commit('SCAN', true)
        }
        if (from) {
          if (from.hash === '#show-scan' && this.$store.state.user.role === 'user') {
            this.$store.dispatch('ME')
          }
        }
        if (to.hash) {
          const d = to.hash.match(/#indobake:/)
          if (d && this.$store.state.user.role === 'mitra') {
            let errorProcessPoin = true
            const parser = to.hash.replace('#indobake:', '').split(':')
            if (parser.length === 2) {
              if (parseInt(parser[0]) && parseInt(parser[1])) {
                errorProcessPoin = false
                this.$store.dispatch('POIN_HISTORY_PROCESS_TO_MITRA', {
                  user: parseInt(parser[0]),
                  poin: parseInt(parser[1])
                }).then((res) => {
                  if (res.status) {
                    this.$store.dispatch('ME')
                    this.$store.commit('SNACKBAR', { show: true, text: (parseInt(parser[1]) + ' points successfully earned!') })
                    this.$router.replace('/')
                  } else {
                    this.$store.commit('SNACKBAR', { show: true, text: 'Something went wrong!' })
                  }
                })
              }
            }
            if (errorProcessPoin) {
              this.$store.commit('SNACKBAR', { show: true, text: 'Ops, please try again!' })
            }
          } else if (d) {
            this.$router.replace('/')
          }
        }
      }
    },
    'dialogUser.show' (v) {
      this.ResetUserPassword = ''
      if (v) {
        this.USER_LOAD()
      }
    },
    snackbarShow: function (v) {
      this.snackbarElShow = v
    },
    snackbarElShow: function (v) {
      if (!v) {
        this.$store.commit('SNACKBAR', {
          show: false,
          text: ''
        })
      }
    },
    bottomMenus (v) {
      if ((!v || v === 'home') && this.$route.name !== 'Home') {
        this.$router.replace('/')
      } else if (v === 'profile' && this.$route.name !== 'Profile') {
        this.$router.push('/profile')
      }
    }
  },
  created () {
    this.App()
    this.DeviceInfo()

    this.bottomMenus = 'home'
    this.$router.beforeEach((to, from, next) => {
      this.transitionName = DEFAULT_TRANSITION
      if (from && to) {
        if (
          to.name === 'Home' ||
          (from.name === 'Profile' && to.name === 'Activity') ||
          (from.name === 'Profile' && to.name === 'Channel') ||
          (from.name === 'Activity' && to.name === 'Channel')
        ) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }

        if (from.name === 'Workspace' && to.name === 'Workspace' && to.query.CID) {
          this.transitionName = 'slide-right'
        } else if (from.name === 'Workspace' && to.name === 'Workspace' && !to.query.CID) {
          this.transitionName = 'slide-right'
        } else if (to.name === 'Workspace') {
          this.transitionName = 'slide-top'
        } else if (from.name === 'Workspace') {
          this.transitionName = 'slide-bottom'
        } else if (to.name === 'ChannelDetail') {
          this.transitionName = 'slide-top'
        } else if (from.name === 'ChannelDetail') {
          this.transitionName = 'slide-bottom'
        }

        if (from.name === 'Index') {
          this.transitionName = 'slide-top'
        } else if (from.name === 'Home' && !to.name) {
          this.transitionName = 'fade'
          // this.$exitApp()
        }
        next()
      } else if (to) {
        next()
      } else {
        next()
      }
      // if (from.name === 'Home' && !to.name) {
      //   this.$exitApp()
      // }
    })
    this.$store.dispatch('ME')
  },
  methods: {
    async DeviceInfo () {
      const device = await this.$device()
      this.platform = device.operatingSystem || device.platform || 'android'
    },
    LoadClaimPoin () {
      this.$store.dispatch('POIN_HISTORY_CLAIM_MITRA_GET')
    },
    ADD_CLAIM_POIN (p) {
      this.dialogClaimPoinNew.data = Object.assign({}, {
        id: null,
        mitra: parseInt(this.$store.state.user.id), // id user : role mitra
        poin: parseInt(this.$store.state.user.poin),
        status: 0, // 0: diajukan, 1: dikonfirmasi, 2: dicairkan
        created: null
      })
      this.dialogClaimPoinNew.show = true
    },
    POIN_CLAIM_PROCESS () {
      if (!parseInt(this.dialogClaimPoinNew.data.poin) || parseInt(this.dialogClaimPoinNew.data.poin) < 0 || parseInt(this.dialogClaimPoinNew.data.poin) > parseInt(this.$store.state.user.poin)) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Invalid poin!' })
        return false
      }
      this.$store.dispatch('POIN_HISTORY_CLAIM_MITRA_PROCESS', this.dialogClaimPoinNew.data)
        .then((res) => {
          if (res.status) {
            this.dialogClaimPoinNew.show = false
            this.dialogClaimPoinNew.data = null
            this.$store.commit('SNACKBAR', { show: true, text: 'Redeem poin created.' })
            this.LoadClaimPoin()
            this.$store.dispatch('ME')
          } else {
            this.$store.commit('SNACKBAR', { show: true, text: 'Something went wrong!' })
          }
        })
    },
    isLoggedIn () {
      const t = localStorage.getItem('access_token')
      if (this.$store.state.user || t) {
        return true
      }
      return false
    },
    App () {
      const $ = this
      const App = $.$App()
      App.addListener('backButton', (e) => {
        // alert(e.canGoBack)
        if (!e.canGoBack) {
          $.$exitApp()
        } else {
          $.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  background:#fafafa;
}
.p-relative {
  position: relative!important;
}
.fill-width {
  width: 100%!important;
}
.fill-height {
  height: 100%!important;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.30s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  transition-duration: 0s;
  opacity: 0
}
#snackbar {
  visibility: hidden;
  position: fixed;
  z-index: 105;
  left: 0px;
  top: 70px;
  width: 100%;
  pointer-events: none;
  >.snackbar-inner {
    position: relative;
    margin: 0 auto;
    max-width: 85%;
    background-color: rgba(80, 80, 80, .95);
    color: #fff;
    text-align: center;
    font-size: 14px;
    padding: 10px 15px;
    border-radius: 15px;
    box-shadow: 0px 8px 20px -10px rgba(0, 0, 0, .5);
  }
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 70px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 70px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 70px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 70px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

</style>
