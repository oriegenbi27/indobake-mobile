<template>
  <div v-if="$store.state.user">
    <div class="pa-4">
      <div class="d-flex fill-width align-center d-flex align-center pb-1">
        <div class="d-flex align-center text-h6 black--text">
          <!-- <v-icon class="mr-2">
            mdi-plus-circle-multiple-outline
          </v-icon> -->
          Poin History
        </div>
        <v-spacer />
        <div v-if="$store.state.user.role === 'mitra'" class="d-flex align-center">
          <v-btn v-if="!($store.state.user.role === 'mitra' && parseInt($store.state.user.sub_id))" color="cyan darken-1" depressed dark class="rounded-pill text-capitalize" small @click.prevent="$store.dispatch('POIN_HISTORY_CLAIM_MITRA_GET')">
            <v-icon small class="mr-2">
              mdi-cash-multiple
            </v-icon>
            Redeem Poin
          </v-btn>
        </div>
      </div>
      <v-divider v-if="ListPoint.length" class="my-2" />
      <div v-if="!ListPoint.length" class="pa-4 text-center">
        no history
      </div>
      <div v-else class="py-2">
        <v-card v-for="(p, iP) in ListPoint" :key="'poin-' + iP" class="d-flex justify-space-between align-center pa-4 mb-4 elevation-0 accent">
          <div>
            <div class="subtitle-1 d-flex fill-width flex-column align-start">
              {{ $localDT(p.created, 'display') }}
              <div v-if="$store.state.user.role === 'mitra' && p.mitra_sub_email" class="grey--text font-weight-regular">
                by : {{ p.mitra_sub_email }}
              </div>
            </div>
            <div class="text-h6">
              <span v-if="$store.state.user.role === 'user'" class="text-capitalize d-flex align-center">
                <v-icon :color="parseInt(p.ispoinout) ? 'red lighten-1' : 'blue lighten-1'" small class="mr-2">
                  {{ parseInt(p.ispoinout) ? 'mdi-bookmark-minus-outline' : 'mdi-bookmark-plus-outline' }}
                </v-icon>
                {{ parseInt(p.iseller) ? 'ISeller' : (p.mitra_name || 'Indobake') }}
              </span>
              <span v-else class="text-capitalize d-flex align-center">
                <v-icon :color="parseInt(p.ispoinout) ? 'blue' : 'red'" class="mr-2">
                  {{ parseInt(p.ispoinout) ? 'mdi-bookmark-minus-outline' : 'mdi-bookmark-plus-outline' }}
                </v-icon>
                {{ parseInt(p.iseller) ? 'ISeller' : (p.user_name || 'Indobake') }}
              </span>
            </div>
          </div>
          <div v-if="$store.state.user.role === 'user'" class="text-h6 d-flex align-center">
            <v-avatar
              :color="parseInt(p.ispoinout) ? 'red lighten-1' : 'blue lighten-1'"
              size="36"
            >
              <span class="white--text subtitle-2">
                {{ parseInt(p.ispoinout) ? '-' : '+' }}{{ p.poin }}
              </span>
            </v-avatar>
          </div>
          <div v-else class="text-h6 d-flex align-center">
            <v-avatar
              :color="parseInt(p.ispoinout) ? 'blue' : 'red'"
              size="36"
            >
              <span class="white--text subtitle-2">
                {{ parseInt(p.ispoinout) ? '+' : '-' }}{{ p.poin }}
              </span>
            </v-avatar>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoinHistory',
  components: {
  },
  data: () => ({
    poin: {
      data: [],
      total: []
    },
    poinClaim: {
      data: [],
      total: []
    }
  }),
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        if (to) {
          if (to.name === 'PoinHistory') {
            this.LoadPoinHistory()
          }
        }
      }
    }
  },
  computed: {
    ListPoint () {
      return this.poin.data.filter((r) => {
        const u = this.$store.state.user
        if (u) {
          if (u.role === 'mitra' && parseInt(u.sub_id)) {
            return parseInt(r.mitra_sub_id) === parseInt(u.sub_id)
          }
        }
        return true
      })
    }
  },
  mounted () {
    // this.LoadPoinHistory()
  },
  methods: {
    LoadPoinHistory () {
      this.$store.dispatch('POIN_HISTORY_GET')
        .then((res) => {
          if (res.status) {
            this.poin.data = res.data.data.data || []
            this.poin.total = parseInt(res.data.data.total)
          } else {
            this.$store.commit('SNACKBAR', {
              show: true,
              text: 'Something went wrong!'
            })
          }
        })
    },
    LoadPoinHistoryClaimMitra () {
      this.$store.dispatch('POIN_HISTORY_CLAIM_MITRA_GET')
        .then((res) => {
          if (res.status) {
            this.poinClaim.data = res.data.data.data || []
            this.poinClaim.total = parseInt(res.data.data.total)
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
