<template>
  <div v-if="$store.state.user" class="pb-16 px-1">
    <div v-if="$store.state.user.role !== 'mitra'" class="d-flex fill-width justify-space-between pt-4 text-h5 black--text px-4">
      <v-btn :depressed="viewSelected === 'product'" :outlined="viewSelected !== 'product'" :color="viewSelected === 'product' ? 'primary lighten-2' : ''" class="d-flex font-weight-bold body-2 text-capitalize rounded-lg" style="width:47%;" @click.prevent="viewSelected = 'product'">
        My Product
      </v-btn>
      <v-btn :depressed="viewSelected === 'order'" :outlined="viewSelected !== 'order'" :color="viewSelected === 'order' ? 'primary lighten-2' : ''" class="d-flex font-weight-bold body-2 text-capitalize rounded-lg" style="width:47%;" @click.prevent="viewSelected = 'order'">
        My Order
      </v-btn>
    </div>
    <div v-if="$store.state.user.role !== 'mitra'" class="px-4 pt-0">
      <div v-if="viewSelected === 'product'" class="mt-2 elevation-0 py-2 transparent">
      <v-expansion-panels accordion class="transparent elevation-0 rounded-lg min-padding" flat>
        <v-expansion-panel v-for="(mp, iMp) in myProducts" :key="'my-product-' + iMp">
          <v-expansion-panel-header class="px-2">
            <v-card class="white d-flex fill-width align-center justify-space-between rounded-lg pr-2 elevation-0" flat>
              <div class="d-flex align-center">
                <v-avatar
                  class="rounded-lg"
                  color="accent"
                  size="75"
                  tile
                >
                  <v-img :src="$getImage(mp.images)" />
                </v-avatar>
                <div class="pl-3 py-2" style="line-height:135%;">
                  {{ mp.name }}
                </div>
              </div>
              <div class="pl-2">
                x{{ mp.quantity }}
              </div>
            </v-card>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="(mpo, iMpo) in mp.order_list" :key="'order-detail-' + iMp + '-' + iMpo" class="d-flex flex-column fill-width align-center px-4 py-2 accent rounded-lg mb-2">
              <div class="d-flex justify-space-between align-center justify-center fill-width">
                <div class="fill-width">
                  <div class="caption">
                    {{ $localDT(mpo.order_date.replace(' ', 'T'), 'display') }}
                  </div>
                  <div class="d-flex align-center justify-space-between fill-width">
                    {{ mpo.order_reference || '#' }}
                    <div>
                      <v-chip v-if="parseInt(mpo.service_id) && parseInt(mpo.service_status) !== 2" small color="accent" class="ml-8 primary--text">
                        {{ mpo.service_status_text }}
                      </v-chip>
                      <span v-else class="pl-8">
                        <v-btn small color="primary lighten-2" depressed dark class="rounded-lg text-capitalize" @click.prevent="OpenService({
                          id: null,
                          user: $store.state.user.id,
                          product_name: mp.name || '-',
                          inv: mpo.order_reference || '#',
                          product_id: mp.product_id,
                          order_id: mpo.order_id,
                          notes: '',
                          status: 0
                        })">
                          Request New Service
                        </v-btn>
                      </span>
                    </div>

                  </div>
                  <div v-if="parseInt(mpo.service_id)" class="body-2 grey--text text--darken-2 d-flex fill-width align-center">
                    <v-icon x-small class="mr-2">
                      mdi-comment-outline
                    </v-icon>
                    {{ mpo.service_notes }}
                  </div>
                </div>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      </div>
      <v-card v-else class="mt-2 elevation-0 px-2 py-4 transparent">
        <div v-if="!$store.state.order.data.length" class="py-4 text-center">
          no history
        </div>
        <div v-else>
          <div v-for="(o, iO) in $store.state.order.data.filter((r, i) => i < 8)" :key="'order-' + iO" class="py-1 mb-4 py-0">
            <div>
              <div v-if="o.iseller_detail" class="d-flex fill-width justify-space-between align-center">
                {{ o.iseller_detail.order_reference || '#' }}, {{ $localDT(o.iseller_detail.order_date.replace(' ', 'T'), 'display') }}
                <span class="text-capitalize">
                  {{ o.iseller_detail.status }}
                </span>
              </div>
              <div v-else>
                -
              </div>
            </div>
            <v-divider class="grey lighten-2 my-2" />
            <div v-if="o.iseller_detail">
              <div v-for="(oi, iOi) in o.iseller_detail.order_details" :key="'product-item-' + iO + '-' + iOi">
                <div :product-id="oi.product_id" class="d-flex fill-width justify-space-between align-center py-1">
                  <div class="grey--text text--darken-2">
                    {{ oi.quantity }}x {{ oi.product_generic_name }}
                  </div>
                  <!-- <v-chip v-if="parseInt(FindService({ order_id: oi.order_id, product_id: oi.product_id }).id)" small color="accent" class="ml-8 primary--text">
                    {{ FindService({ order_id: oi.order_id, product_id: oi.product_id }).status_text }}
                  </v-chip>
                  <span v-else class="pl-8">
                    <v-btn small color="primary lighten-2" depressed dark class="rounded-lg text-capitalize" @click.prevent="OpenService({
                      id: parseInt(oi.service_id) || null,
                      user: $store.state.user.id,
                      order_id: oi.order_id,
                      product_id: oi.product_id,
                      notes: oi.service_notes || '',
                      status: parseInt(oi.service_status) || 0
                    })">
                      Service
                    </v-btn>
                  </span> -->
                </div>
              </div>
            </div>
            <div v-if="o.iseller_detail" class="body-1 text-right pt-3 pb-3 primary--text font-weight-bold">
              {{ $price(o.iseller_detail.total_amount) }}
            </div>
            <v-divider class="grey lighten-3" />
          </div>
        </div>
      </v-card>
    </div>
    <template v-if="$store.state.user.role !== 'mitra'">
      <div v-if="$store.state.user.role === 'user'" style="position: fixed;bottom:80px;left:0px;width:100%;text-align:center;z-index:1;">
        <v-btn color="primary lighten-2" dark class="rounded-pill elevation-1 text-capitalize" @click.prevent="dialogService.show = true">
          My Service Request
        </v-btn>
      </div>
    </template>
    <v-dialog
      v-model="dialogService.show"
      fullscreen
      persistent
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="rounded-0" flat>
        <v-toolbar
          color="accent"
          class="elevation-0"
        >
          <v-toolbar-title>My Services</v-toolbar-title>
          <v-spacer />
          <v-btn
            icon
            @click="dialogService.show = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card class="pb-4 elevation-0 rounded-0">
          <div v-if="!dialogService.data.length" class="d-flex px-4 pt-8 caption grey--text text--darken-2 justify-center">
            no data
          </div>
          <div v-else class="pa-4">
            <v-card v-for="(s, iS) in dialogService.data" :key="'service-' + iS" flat class="accent py-3 px-4 mb-4 rounded-lg">
              <div class="d-flex flex-column fill-width">
                <div class="d-flex fill-width align-center justify-space-between">
                  <div>
                    {{ GetServiceOrderNumber(s) || '' }}<br>{{ s.product_name || GetServiceProductName(s, s.product_id) }}
                  </div>
                  <v-chip small color="accent" class="primary--text">
                    {{ ServiceStatus(s.status) }}
                  </v-chip>
                </div>
                <v-divider class="my-2" />
                <div class="d-flex align-center justify-space-between align-center body-2">
                  <div>
                    {{ $localDT('', 'display') }}
                  </div>
                  <div>
                    {{ s.notes || '-' }}
                    <v-icon small class="ml-1">
                      mdi-comment-outline
                    </v-icon>
                  </div>
                </div>
                <div v-if="parseInt(s.status) === 2" class="d-flex flex-column fill-width align-center justify-center">
                  <v-rating
                    v-model.number="dialogService.data[iS].rating"
                    dense
                    background-color="orange lighten-3"
                    color="orange"
                    class="my-2"
                    large
                  />
                  <v-textarea
                    v-model.lazy="dialogService.data[iS].rating_comment"
                    label="Write review"
                    outlined
                    hide-details
                    rows="2"
                    class="d-block fill-width mb-2"
                  />
                  <div class="d-flex fill-width justify-end pb-2">
                    <v-btn small color="orange lighten-1" depressed dark class="rounded-lg text-capitalize" @click.prevent="UpdateRating({
                      id: s.id,
                      rating: s.rating,
                      rating_comment: s.rating_comment
                    })">
                      Submit Review
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogServiceNew.show"
      persistent
      scrollable
      max-width="320"
    >
      <v-card v-if="dialogServiceNew.data">
        <v-card-title class="d-flex fill-width text-h6 align-center justify-space-between">
          {{ dialogServiceNew.data.id ? 'View Service' : 'Create Service Request' }}
          <v-icon @click.prevent="dialogServiceNew.show = false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text class="pt-4 pb-4" style="max-height: 300px;">
          <div v-if="dialogServiceNew.data.product_name" class="font-weight-bold pb-4">
            INV : {{ dialogServiceNew.data.inv || '#' }}<br>
            Product : {{ dialogServiceNew.data.product_name || '?' }}
          </div>
          <v-textarea
            v-model="dialogServiceNew.data.notes"
            type="text"
            label="Services Notes / Comment"
            color="primary"
            rows="2"
            outlined
            dense
            hide-details
            class="rounded-lg accent"
          />
          <v-row class="align-center pt-4" no-gutters>
            <v-col v-for="(img, iImg) in dialogServiceNew.data.images.filter((r, i) => i < 2)" :key="'img-' + iImg" cols="6" class="pa-1">
              <div :style="{ backgroundImage: 'url(' + img + ')' }" class="bg-cover blue lighten-5 rounded-lg" style="position:relative;padding-bottom:100%;">
                <span style="position:absolute;top:0px;right:2px;" @click.prevent="RemoveImage(iImg)">
                  <v-icon color="red">
                    mdi-close
                  </v-icon>
                </span>
              </div>
            </v-col>
            <v-col v-if="dialogServiceNew.data.images.length < 2" cols="6" class="pa-1 fill-height">
              <div class="d-flex fill-width justify-center align-center fill-width rounded-lg blue lighten-5 fill-height" style="position:relative;" @click.prevent="GET_PHOTO()">
                <div style="width:1px;padding-bottom:100%;" />
                <v-icon color="primary">
                  mdi-file-image
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions v-if="dialogServiceNew.data" class="py-4">
          <v-spacer />
          <v-btn
            :disabled="parseInt(dialogServiceNew.data.id) ? true : false"
            color="primary lighten-1"
            depressed
            class="text-capitalize rounded-lg px-4"
            @click="PROCESS_SERVICE()"
          >
            Create service request
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyProduct',
  data: () => ({
    viewSelected: 'product',
    dialogService: {
      show: false,
      data: [],
      total: 0
    },
    dialogServiceNew: {
      show: false,
      data: null
    }
  }),
  computed: {
    myProducts () {
      const data = []
      const orders = this.$store.state.order.data
      for (let o = 0; o < orders.length; o++) {
        const odetails = orders[o].iseller_detail.order_details
        for (let oo = 0; oo < odetails.length; oo++) {
          const productImages = this.$store.state.product.data.find(r => r.iseller_id === odetails[oo].product_id)
          const findProductExistIndex = data.findIndex(r => r.product_id === odetails[oo].product_id)
          const findService = this.FindService({ order_id: orders[o].iseller_detail.order_id, product_id: odetails[oo].product_id })
          if (findProductExistIndex > -1) {
            data[findProductExistIndex].quantity += (parseInt(odetails[oo].quantity) || 0)
            data[findProductExistIndex].order_list.push(
              Object.assign(odetails[oo], {
                order_id: orders[o].iseller_detail.order_id,
                order_date: orders[o].iseller_detail.order_date,
                order_reference: orders[o].iseller_detail.order_reference,
                service_id: parseInt(findService.id) || 0,
                service_status: parseInt(findService.status) || 0,
                service_status_text: findService.status_text || 'Undefined',
                service_notes: findService.notes || '',
                service_rating: findService.rating || 5,
                service_rating_comment: findService.rating_comment || ''
              })
            )
          } else {
            data.push({
              name: odetails[oo].product_generic_name,
              quantity: parseInt(odetails[oo].quantity) || 0,
              images: productImages ? productImages.images : '[]',
              product_id: odetails[oo].product_id,
              order_list: [
                Object.assign(odetails[oo], {
                  order_id: orders[o].iseller_detail.order_id,
                  order_date: orders[o].iseller_detail.order_date,
                  order_reference: orders[o].iseller_detail.order_reference,
                  service_id: parseInt(findService.id) || 0,
                  service_status: parseInt(findService.status) || 0,
                  service_status_text: findService.status_text || 'Undefined',
                  service_notes: findService.notes || '',
                  service_rating: findService.rating || 5,
                  service_rating_comment: findService.rating_comment || ''
                })
              ]
            })
          }
        }
      }
      return data
    }
  },
  watch: {
    'dialogService.show' (v) {
      if (v) {
        this.LoadService()
      }
    },
    $route: {
      immediate: true,
      handler (to, from) {
        if (to.name === 'MyProduct') {
          this.LoadService(true)
        }
      }
    }
  },
  mounted () {
    if (this.$store.state.order.data.length) {
      // console.log(this.$store.state.order.data[0].iseller_detail)
    }
    this.LoadService(true)
  },
  methods: {
    UpdateRating (service) {
      this.$store.dispatch('PENGAJUAN_SERVIS_PROCESS', service)
        .then((res) => {
          if (res.status) {
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'Review updated, thank you!'
            })
          } else {
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'Ops, something went wrong!'
            })
          }
        })
    },
    GetServiceOrderNumber (s) {
      try {
        const t = JSON.parse(s.detail_order)
        if (t) {
          if (t.order_reference) {
            const f = t.order_reference
            if (f) {
              return f
            }
          }
        }
      } catch {
        // console.log(e)
      }
      return ''
    },
    GetServiceProductName (s, productID) {
      try {
        const t = JSON.parse(s.detail_order)
        if (t) {
          if (t.order_details) {
            const f = t.order_details.find(r => r.product_id === productID)
            if (f) {
              return f.product_name || 'Undefined'
            }
          }
        }
      } catch {
        // console.log(e)
      }
      return 'Undefined'
    },
    FindService (s) {
      const d = this.dialogService.data.filter(r => r.order_id === s.order_id && r.product_id === s.product_id).sort(function (a, b) {
        const keyA = parseInt(a.id)
        const keyB = parseInt(b.id)

        if (keyA < keyB) return 1
        if (keyA > keyB) return -1
        return 0
      })
      if (d.length) {
        const dd = Object.assign({}, d[0])
        dd.status_text = this.ServiceStatus(dd.status)
        return dd
      } else {
        return {}
      }
    },
    ServiceStatus (status) {
      let text = 'Undefined'
      if (parseInt(status) === 0) {
        text = 'Request Sent'
      } else if (parseInt(status) === 1) {
        text = 'Confirmed'
      } else if (parseInt(status) === 2) {
        text = 'Completed'
      } else if (parseInt(status) === 99) {
        text = 'Declined'
      }
      return text
    },
    OpenService (s) {
      this.dialogServiceNew.data = Object.assign({}, {
        id: parseInt(s.id) || null,
        user: this.$store.state.user.id,
        inv: s.inv,
        product_name: s.product_name,
        images: this.$StrToArray(s.images),
        order_id: s.order_id,
        product_id: s.product_id,
        notes: s.notes || '',
        status: parseInt(s.status) || 0
      })
      this.dialogServiceNew.show = true
    },
    RemoveImage (index) {
      if (!confirm('Delete photo?')) {
        return false
      }
      this.dialogServiceNew.data.images.splice(index, 1)
    },
    async GET_PHOTO () {
      const image = await this.$Camera().getPhoto({
        quality: 90,
        width: 450,
        allowEditing: false,
        source: this.$CameraSource().Photos,
        resultType: this.$CameraResultType().DataUrl
      })
      await this.$store.dispatch('UPLOAD_FILE', {
        file: image.dataUrl
      }).then((resUpload) => {
        if (resUpload) {
          if (resUpload.data.data.res) {
            this.dialogServiceNew.data.images.push(resUpload.data.data.secure_url)
          } else {
            this.$store.commit('SNACKBAR', { show: true, text: 'Failed!' })
          }
        } else {
          this.$store.commit('SNACKBAR', { show: true, text: 'Upload failed!' })
        }
      })
    },
    PROCESS_SERVICE () {
      const params = Object.assign({}, this.dialogServiceNew.data)
      params.images = this.$ArrayToStr(params.images)
      if (!params.order_id || !params.product_id) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Ops, Invalid params!'
        })
        return false
      }
      if (!params.notes) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Please input notes or comment!'
        })
        return false
      }
      this.$store.dispatch('PENGAJUAN_SERVIS_PROCESS', params)
        .then((res) => {
          if (res.status) {
            this.LoadService(true)
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'New service request created!'
            })
            this.dialogServiceNew.show = false
          } else {
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'Ops, something went wrong!'
            })
          }
        })
    },
    LoadService (loadOnly) {
      this.dialogService.show = !loadOnly
      this.$store.dispatch('PENGAJUAN_SERVIS_GET')
        .then((res) => {
          if (res.status) {
            this.dialogService.data = res.data.data.data || []
            this.dialogService.total = parseInt(res.data.data.total)
          } else {
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'Something went wrong!'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss">
.min-padding {
  .v-expansion-panel-content {
    >.v-expansion-panel-content__wrap {
      padding: 0 8px 10px 8px!important;
    }
  }
}
</style>
