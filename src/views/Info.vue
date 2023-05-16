<template>
  <div class="pa-4">
    <div class="text-h6 black--text text-center font-weight-bold mb-6 mt-2">
      Outlet & Branch
    </div>
    <div class="px-0">
      <div class="d-flex fill-width justify-space-between text-h5 black--text px-0 pb-6">
        <v-btn :depressed="viewSelected === 'indobake'" :outlined="viewSelected !== 'indobake'" :color="viewSelected === 'indobake' ? 'primary lighten-2' : ''" class="d-flex font-weight-bold body-2 text-capitalize rounded-lg" style="width:47%;" @click.prevent="viewSelected = 'indobake'">
          Indobake
        </v-btn>
        <v-btn :depressed="viewSelected === 'mitra'" :outlined="viewSelected !== 'mitra'" :color="viewSelected === 'mitra' ? 'primary lighten-2' : ''" class="d-flex font-weight-bold body-2 text-capitalize rounded-lg" style="width:47%;" @click.prevent="viewSelected = 'mitra'">
          Mitra
        </v-btn>
      </div>
    </div>
    <div v-if="viewSelected === 'mitra'">
      <div v-if="!MitraActive.length" class="pa-6 text-center">
        Belum ada list mitra
      </div>
      <v-card v-for="(b, i) in MitraActive" :key="'branch-' + i" class="pa-4 rounded-lg mb-4 elevation-1">
        <div class="d-flex align-center">
          <div class="d-flex pr-3">
            <v-icon color="primary lighten-2">
              mdi-map-marker-radius-outline
            </v-icon>
          </div>
          <div class="d-flex flex-column">
            <span class="black--text">
              {{ b.name }}
            </span>
            <div class="grey--text text--darken-2">
              {{ b.addresses || '' }}
            </div>
          </div>
        </div>
        <v-divider class="mt-4 mb-2" />
        <div class="d-flex justify-end fill-width">
          <div v-if="b.map" class="ml-2" style="max-width: 33.3333%;">
            <v-btn text small class="text-capitalize" @click.prevent="$OpenLink(b.map)">
              <v-icon small class="mr-1">
                mdi-map-marker
              </v-icon>
              Maps
            </v-btn>
          </div>
          <div v-if="b.phone" class="ml-2" style="max-width: 33.3333%;">
            <v-btn :href="'tel:+' + b.phone" target="_blank" text small class="text-capitalize">
              <v-icon small class="mr-1">
                mdi-phone
              </v-icon>
              Phone
            </v-btn>
          </div>
          <div v-if="b.whatsapp" class="ml-2" style="max-width: 33.3333%;">
            <v-btn text small class="text-capitalize" @click.prevent="$OpenLink('https://api.whatsapp.com/send?phone=' + b.whatsapp)">
              <v-icon small class="mr-1">
                mdi-whatsapp
              </v-icon>
              Whatsapp
            </v-btn>
          </div>
        </div>
      </v-card>
      <!-- <v-expansion-panels accordion>
        <v-expansion-panel v-for="(b, i) in $store.state.mitra.data" :key="'branch-' + i">
          <v-expansion-panel-header>
            {{ b.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex align-center">
              <div class="d-flex pr-3">
                <v-icon color="primary lighten-2">
                  mdi-map-marker-radius-outline
                </v-icon>
              </div>
              <div class="d-flex flex-column">
                <span class="black--text">
                  {{ b.name }}
                </span>
                <div class="grey--text text--darken-2">
                  {{ b.addresses || '' }}
                </div>
              </div>
            </div>
            <v-divider v-if="b.map || b.phone || b.whatsapp" class="mt-4 mb-2" />
            <div v-if="b.map || b.phone || b.whatsapp" class="d-flex justify-center fill-width">
              <div v-if="b.map" class="ml-2" style="max-width: 33.3333%;">
                <v-btn text small class="text-capitalize" @click.prevent="$OpenLink(b.map)">
                  <v-icon small class="mr-1">
                    mdi-map-marker
                  </v-icon>
                  Maps
                </v-btn>
              </div>
              <div v-if="b.phone" class="ml-2" style="max-width: 33.3333%;">
                <v-btn :href="'tel:+' + b.phone" target="_blank" text small class="text-capitalize">
                  <v-icon small class="mr-1">
                    mdi-phone
                  </v-icon>
                  Phone
                </v-btn>
              </div>
              <div v-if="b.whatsapp" class="ml-2" style="max-width: 33.3333%;">
                <v-btn text small class="text-capitalize" @click.prevent="$OpenLink('https://api.whatsapp.com/send?phone=' + b.whatsapp)">
                  <v-icon small class="mr-1">
                    mdi-whatsapp
                  </v-icon>
                  Whatsapp
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> -->
    </div>
    <div v-else>
      <template v-if="$store.state.setting">
        <div v-if="$store.state.setting.branches.length">
          <v-card v-for="(b, i) in $store.state.setting.branches" :key="'branch-' + i" class="pa-4 rounded-lg mb-4 elevation-1">
            <div class="d-flex align-center">
              <div class="d-flex pr-3">
                <v-icon color="primary lighten-2">
                  mdi-map-marker-radius-outline
                </v-icon>
              </div>
              <div class="d-flex flex-column">
                <span class="black--text">
                  {{ b.name }}
                </span>
                <div class="grey--text text--darken-2">
                  {{ b.address || '' }}
                </div>
              </div>
            </div>
            <v-divider class="mt-4 mb-2" />
            <div class="d-flex justify-end fill-width">
              <div v-if="b.map" class="ml-2" style="max-width: 33.3333%;">
                <v-btn text small class="text-capitalize" @click.prevent="$OpenLink(b.map)">
                  <v-icon small class="mr-1">
                    mdi-map-marker
                  </v-icon>
                  Maps
                </v-btn>
              </div>
              <div v-if="b.phone" class="ml-2" style="max-width: 33.3333%;">
                <v-btn :href="'tel:+' + b.phone" target="_blank" text small class="text-capitalize">
                  <v-icon small class="mr-1">
                    mdi-phone
                  </v-icon>
                  Phone
                </v-btn>
              </div>
              <div v-if="b.whatsapp" class="ml-2" style="max-width: 33.3333%;">
                <v-btn text small class="text-capitalize" @click.prevent="$OpenLink('https://api.whatsapp.com/send?phone=' + b.whatsapp)">
                  <v-icon small class="mr-1">
                    mdi-whatsapp
                  </v-icon>
                  Whatsapp
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>
      </template>
      <v-card class="px-4 pb-4 pt-6 rounded-lg text-center elevation-1">
        <img src="logo-h.png" style="height:25px;">
        <div class="">
          Call Center
        </div>
        <v-divider class="mt-4 mb-2" />
        <div v-if="$store.state.setting" class="d-flex justify-center fill-width">
          <div class="mx-1" style="max-width: 50%;">
            <v-btn :href="'tel:+' + $store.state.setting.contact_phone" target="_blank" outlined class="text-capitalize accent rounded-pill" style="min-width:134px;">
              <v-icon class="mr-1">
                mdi-phone
              </v-icon>
              Phone
            </v-btn>
          </div>
          <div class="mx-1" style="max-width: 50%;">
            <v-btn outlined class="text-capitalize accent rounded-pill" style="min-width:134px;" @click.prevent="$OpenLinkWhatsapp('Halo, ')">
              <v-icon class="mr-1">
                mdi-whatsapp
              </v-icon>
              Whatsapp
            </v-btn>
          </div>
          <!-- <div style="max-width: 33.3333%;">
            <v-btn text x-small class="text-capitalize" @click.prevent="$OpenLink('mailto:' + $store.state.setting.contact_email)">
              <v-icon class="mr-1">
                mdi-email
              </v-icon>
              Email
            </v-btn>
          </div> -->
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Service',
  components: {
  },
  data: () => ({
    viewSelected: 'indobake'
  }),
  watch: {
  },
  computed: {
    MitraActive () {
      return this.$store.state.mitra.data.filter(r => parseInt(r.show_in_app))
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
