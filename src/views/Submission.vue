<template>
  <div class="pa-4">
    <div class="d-flex fill-width align-center d-flex align-center pb-1">
      <div class="d-flex align-center text-h6 black--text">
        <v-icon class="mr-2">
          mdi-clipboard-text-outline
        </v-icon>
        Installment
      </div>
    </div>
    <v-card v-if="!data.length" flat class="pa-4 my-2 text-center">
      No data
    </v-card>
    <v-card v-for="(c, iC) in data" :key="'cicilan-' + iC" class="pa-4 my-2 elevation-1">
      <div class="d-flex justify-space-between align-center fill-width pb-1">
        <div class="grey--text text--darken-2">
          {{ $localDT(c.created, 'display') }}
        </div>
        <div class="font-weight-bold">
          {{ $price(GetCicilanProducts(c.products).total) }}
        </div>
      </div>
      <div class="d-flex justify-space-between align-center fill-width mb-2">
        <div class="grey--text text--darken-2">
          #{{ GenID(c.id) }}
        </div>
        <div class="caption">
          {{ parseInt(c.status) === 0 ? 'Pending' : (parseInt(c.status) === 1 ? 'Processed' : (parseInt(c.status) === 2 ? 'Completed' : 'Declined')) }}
        </div>
      </div>
      <v-divider class="my-2" />
      <div class="subtitle-2 mb-2">
        Installment Products :
        <div class="pt-2" style="line-height:100%;">
          <v-chip v-for="(cc, iCc) in GetCicilanProducts(c.products).products" :key="'cicilan-' + iCc + '-' + c.id" small class="mr-2 my-0 my-1">
            {{ cc.name }}
          </v-chip>
        </div>
        <div v-if="c.notes" class="d-flex fill-width align-center pt-2">
          <v-icon class="mr-2" small>
            mdi-comment-alert-outline
          </v-icon>
          {{ c.notes || '-' }}
        </div>
      </div>
    </v-card>
    <div>
      <div class="d-flex fill-width align-center justify-center" style="position:fixed;bottom:72px;left:0px;">
        <v-btn color="orange" class="text-capitalize rounded-lg" dark @click.prevent="CICILAN_SHOW()">
          <v-icon small class="mr-2">
            mdi-account-cash-outline
          </v-icon>
          Installment
        </v-btn>
      </div>
      <v-dialog
        v-model="dialogCicilan.show"
        persistent
        scrollable
        max-width="320"
      >
        <v-card v-if="dialogCicilan.data">
          <v-card-title class="d-flex fill-width text-h6 align-center justify-space-between">
            Installment Request
            <v-icon @click.prevent="dialogCicilan.show = false">
              mdi-close
            </v-icon>
          </v-card-title>
          <v-divider />
          <v-card-text class="pt-4 pb-4" style="max-height: 420px;">
            <div class="d-flex fill-width align-center flex-column justify-center body-2 mb-4 grey--text text--darken-1">
              <img src="/adira.png" class="mt-3 mb-5" style="height:40px;">
              <div class="font-weight-bold mb-1 fill-width subtitle-2 black--text">
                Pengajuan installment bersama Adira
              </div>
              <div class="mb-1 fill-width body-2">
                Indobake bekerjasama dengan Adira agar dapat memudahkan teman-teman dalam mengajukan kredit.
              </div>
              <div class="mb-1 fill-width body-2">
                Harap mengisi data diri dengan benar agar dapat mempercepat proses pengajuan installment.
              </div>
              <div class="mb-1 fill-width body-2">
                Setelah pengiriman data, pihak Adira akan menghubungi anda untuk pelaksanaan konfirmasi data.
              </div>
            </div>
            <v-text-field
              v-model="dialogCicilan.data.customer_name"
              label="Full Name"
              color="primary"
              hide-details
              dense
              outlined
              class="mb-4"
            />
            <v-text-field
              v-model="dialogCicilan.data.customer_nik"
              label="No. KTP"
              color="primary"
              hide-details
              dense
              outlined
              class="mb-4"
              @keypress="$NumberOnly"
            />
            <v-textarea
              v-model="dialogCicilan.data.customer_address"
              label="Full Address"
              color="primary"
              rows="2"
              outlined
              dense
              hide-details
              class="rounded-lg accent"
            />
            <div class="d-flex fill-width justify-space-between py-4">
              <v-btn :color="dialogCicilan.data.customer_ktp ? 'green' : 'primary'" outlined small dark depressed @click.prevent="TakePicture('customer_ktp')">
                <v-icon class="mr-2" small>
                  {{ dialogCicilan.data.customer_ktp ? 'mdi-check-circle' : 'mdi-card-account-details' }}
                </v-icon>
                KTP
              </v-btn>
              <v-btn :color="dialogCicilan.data.customer_ktp_selfie ? 'green' : 'primary'" outlined small class="text-capitalize" dark @click.prevent="TakePicture('customer_ktp_selfie')">
                <v-icon class="mr-2" small depressed>
                  {{ dialogCicilan.data.customer_ktp_selfie ? 'mdi-check-circle' : 'mdi-camera-account' }}
                </v-icon>
                Selfie + KTP
              </v-btn>
            </div>
            <v-divider />
            <div class="pt-4">
              <v-autocomplete
                v-model="dialogCicilan.productActive"
                :items="dataProductCicilan"
                item-text="name"
                dense
                label="Select Product"
                outlined
                hide-details
                return-object
                class="rounded-lg accent"
              />
              <v-divider />
              <div class="d-flex flex-column fill-width py-2 px-0">
                <div class="font-weight-bold d-flex align-center pt-2">
                  <v-icon class="mr-2" small>
                    mdi-view-list
                  </v-icon>
                  Installment Products
                </div>
                <div v-if="!dialogCicilan.data.products.length" class="px-4 py-2 text-center red--text caption">
                  no product selected
                </div>
                <v-card v-for="(pc, iPc) in dialogCicilan.data.products" :key="'product-cicilan-' + iPc" class="px-4 py-2 my-2 elevation-1 p-relative">
                  {{ pc.name }}
                  <div class="d-flex fill-width align-center justify-space-between caption font-weight-bold">
                    {{ $price(pc.price) }}
                    <v-icon color="red" @click.prevent="dialogCicilan.data.products.splice(iPc, 1)">
                      mdi-close
                    </v-icon>
                  </div>
                </v-card>
                <v-divider class="mt-2 mb-3" />
                <div class="pa-4 accent text-center font-weight-bold black--text elevation-1">
                  {{ $price(dataProductCicilanTotal) }}
                </div>
              </div>
              <v-divider class="mt-2" />
            </div>
            <div class="d-flex align-start fill-width py-2 px-2 orange--text text--darken-2">
              <v-checkbox
                v-model="dialogCicilan.agree"
                hide-details
              >
                <template v-slot:label>
                  <div>
                    Saya dengan ini menyetujui <span @click.stop><span class="primary--text" @click.prevent="dialogCicilan.terms = true">syarat dan ketentuan</span></span> yang berlaku.
                  </div>
                </template>
              </v-checkbox>
              <!-- Pihak Adira akan menghubungi anda untuk konfirmasi data. -->
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions class="py-4">
            <v-spacer />
            <v-btn
              color="primary lighten-1"
              depressed
              class="text-capitalize rounded-lg px-4"
              @click="CICILAN_PROCESS()"
            >
              Apply Now
            </v-btn>
            <v-spacer />
          </v-card-actions>
          <v-dialog
            v-if="$store.state.setting"
            v-model="dialogCicilan.terms"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card class="rounded-0">
              <v-toolbar
                dark
                color="primary"
              >
                <v-toolbar-title>Syarat dan Ketentuan</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                  <v-btn
                    dark
                    text
                    @click="dialogCicilan.terms = false"
                  >
                    Close
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <pre class="d-block pa-4" style="font-family:Arial;word-wrap: break-word;white-space: pre-wrap;" v-html="$store.state.setting.terms_installment || '-'" />
            </v-card>
          </v-dialog>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Submission',
  components: {
  },
  data: () => ({
    data: [],
    total: 0,
    dialogCicilan: {
      show: false,
      data: null,
      terms: false,
      agree: true,
      productActive: null
    }
  }),
  computed: {
    dataProductCicilan () {
      return this.$store.state.product.data
    },
    dataProductCicilanTotal () {
      if (this.dialogCicilan.data) {
        const p = this.dialogCicilan.data.products
        let t = 0
        for (let pp = 0; pp < p.length; pp++) {
          t += parseInt(p[pp].price) || 0
        }
        return t
      }
      return 0
    }
  },
  watch: {
    'dialogCicilan.productActive' (v) {
      if (v && this.dialogCicilan.data) {
        const f = this.dialogCicilan.data.products.find(r => parseInt(r.id) === parseInt(v.id))
        if (f) {
          this.$store.commit('SNACKBAR', {
            show: true,
            text: 'This product already on the list!'
          })
        } else {
          this.dialogCicilan.data.products.push({
            id: v.id,
            name: v.name,
            images: v.images,
            price: parseInt(v.price)
          })
        }
      }
      this.dialogCicilan.productActive = null
    },
    $route: {
      immediate: true,
      handler (to, from) {
        if (to.name === 'Submission') {
          this.LoadCicilan()
        }
      }
    }
  },
  mounted () {
    // this.LoadCicilan()
  },
  methods: {
    async TakePicture (src) {
      const image = await this.$Camera().getPhoto({
        quality: 95,
        width: 450,
        allowEditing: false,
        source: this.$CameraSource().Camera,
        resultType: this.$CameraResultType().DataUrl
      })
      await this.$store.dispatch('UPLOAD_FILE', {
        file: image.dataUrl
      }).then((resUpload) => {
        if (resUpload) {
          if (resUpload.data.data.res) {
            if (src === 'customer_ktp') {
              this.dialogCicilan.data.customer_ktp = resUpload.data.data.secure_url
            } else if (src === 'customer_ktp_selfie') {
              this.dialogCicilan.data.customer_ktp_selfie = resUpload.data.data.secure_url
            } else {
              this.$store.commit('SNACKBAR', { show: true, text: 'Invalid origin!' })
            }
          } else {
            this.$store.commit('SNACKBAR', { show: true, text: 'Failed!' })
          }
        } else {
          this.$store.commit('SNACKBAR', { show: true, text: 'Upload failed!' })
        }
      })
    },
    GetCicilanProducts (products) {
      const pp = this.$StrToArray(products)
      let total = 0
      for (let p = 0; p < pp.length; p++) {
        total += parseInt(pp[p].price) || 0
      }
      return {
        products: pp,
        total
      }
    },
    GenID (n) {
      if (parseInt(n) < 10) {
        return '00000' + n
      } else if (parseInt(n) < 100) {
        return '0000' + n
      } else if (parseInt(n) < 1000) {
        return '000' + n
      } else if (parseInt(n) < 10000) {
        return '00' + n
      } else if (parseInt(n) < 100000) {
        return '0' + n
      }
      return n
    },
    LoadCicilan () {
      this.$store.dispatch('PENGAJUAN_CICILAN_GET')
        .then((res) => {
          if (res.status) {
            this.data = res.data.data.data || []
            this.total = parseInt(res.data.data.total)
          } else {
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'Something went wrong!'
            })
          }
        })
    },
    CICILAN_SHOW () {
      const isExistUncompleteCicilan = this.data.filter(r => (parseInt(r.status) === 0 || parseInt(r.status) === 1))
      if (isExistUncompleteCicilan.length) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Ops, you still have installments in progress!'
        })
        return false
      }
      // this.$store.state.productDetail.data.price
      this.dialogCicilan.productActive = 0
      this.dialogCicilan.agree = true
      this.dialogCicilan.terms = false
      this.dialogCicilan.data = Object.assign({}, {
        id: null,
        user: this.$store.state.user.id,
        product: 0,
        products: [],
        notes: '',
        customer_name: '',
        customer_nik: '',
        customer_address: '',
        customer_ktp: '',
        customer_ktp_selfie: '',
        status: 0
      })
      this.dialogCicilan.show = true
    },
    CICILAN_PROCESS () {
      if (!this.dialogCicilan.data) {
        return false
      }
      if (this.dataProductCicilanTotal <= 0) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Ops, no installment product selected!'
        })
        return false
      }
      if (!this.dialogCicilan.data.customer_name) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Please input your name!'
        })
        return false
      }
      if (!this.dialogCicilan.data.customer_nik) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Please input NIK/KTP Number!'
        })
        return false
      }
      if (!this.dialogCicilan.data.customer_address) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Please input Address!'
        })
        return false
      }
      if (!this.dialogCicilan.data.customer_ktp) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Please upload your KTP!'
        })
        return false
      }
      if (!this.dialogCicilan.data.customer_ktp_selfie) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Please upload your Selfie with KTP!'
        })
        return false
      }
      if (!this.dialogCicilan.agree) {
        this.$store.commit('SNACKBAR', {
          show: true,
          text: 'Please agree to the installment terms and conditions!'
        })
        return false
      }
      const params = Object.assign({}, this.dialogCicilan.data)
      params.products = this.$ArrayToStr(params.products)
      this.$store.dispatch('PENGAJUAN_CICILAN_PROCESS', params)
        .then((res) => {
          if (res.status) {
            this.dialogCicilan.show = false
            if (res.data.data === 'exist') {
              this.$store.commit('SNACKBAR', {
                show: true,
                text: 'Ops, you still have installments in progress!'
              })
            } else {
              this.LoadCicilan()
              this.$store.commit('SNACKBAR', {
                show: true,
                text: 'Terimakasih, selanjutnya pihak Adira akan menghubungi anda untuk konfirmasi data.'
              })
            }
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
</style>
