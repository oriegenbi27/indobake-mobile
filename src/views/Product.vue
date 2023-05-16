<template>
  <div class="pb-16 pa-4">
    <div class="search-product pt-4">
      <v-text-field
        v-model="searchProduct"
        placeholder="Search catalog"
        color="primary"
        solo
        class="px-4 rounded-lg"
        hide-details
      >
        <template v-slot:append>
          <v-icon color="primary lighten-2">
            mdi-magnify
          </v-icon>
        </template>
      </v-text-field>
    </div>
    <v-row>
      <v-col cols="12" class="pt-16 px-3">
        <div class="mt-2 d-flex align-center fill-width accent pl-2 pr-4 py-2 rounded-lg" style="">
          <v-card
            v-for="(cat, iCat) in $store.state.product.category.filter((r, i) => i < 3)"
            :key="'category-' + iCat"
            :class="[cat === 'All' ? 'primary--text font-weight-bold' : '']"
            class="d-flex fill-height grey--text text--darken-2 font-weight-bold mr-2 rounded-0 accent align-center justify-center px-2 py-1 elevation-0 rounded-0 body-2"
            @click.prevent="$router.push('product?category=' + cat)"
          >
            {{ decodeURIComponent(cat) }}
          </v-card>
          <v-spacer />
          <v-card class="d-flex grey--text text--darken-2 font-weight-bold accent rounded-0 align-center justify-center py-1 elevation-0 rounded-0">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary lighten-2"
                  fab
                  x-small
                  class="d-flex elevation-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="px-2 py-3" style="max-height:300px;overflow-y:auto;">
                <v-card v-for="(cat, iCat) in $store.state.product.category.filter((r, i) => i > 2)" :key="'category-' + iCat" class="grey--text text--darken-2 font-weight-bold d-flex mr-3 rounded-0 align-center px-3 py-1 elevation-0" @click.prevent="$router.push('product?category=' + cat)">
                  {{ decodeURIComponent(cat) }}
                </v-card>
              </v-list>
            </v-menu>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row class="px-1">
      <v-col cols="12" class="pt-0 text-h6 black--text px-4">
        <div class="d-flex">
          <span class="mr-2">
            Category
          </span>
          <span class="text-truncate black--text">
            {{ $route.query.category || 'All' }}
          </span>
        </div>
      </v-col>
      <v-col v-for="(p, iP) in dataProduct.filter((r, i) => i < Math.round((page || 1) * 12))" :key="'product-' + iP" cols="6" class="pa-2">
        <v-card class="d-flex fill-width flex-column fill-height elevation-0 rounded-0" @click.prevent="page = 1, $router.push('?productDetail=' + p.id)">
          <v-img
            :aspect-ratio="1/1"
            :src="$getImage(p.images)"
            width="100%"
          />
          <div class="pt-2 pb-1 px-4 body-2">
            {{ p.name }}
          </div>
          <div class="pb-3 px-4 text-truncate">
            {{ $price(p.price) }}
          </div>
          <div v-if="$store.state.user ? !($store.state.user.role === 'mitra' && parseInt($store.state.user.sub_id)) : true" class="d-flex fill-width align-self-end justify-end pb-3 px-4 text-right" @click.stop>
            <v-btn color="primary lighten-2" dark depressed small class="rounded-lg text-capitalize" @click.prevent="$OpenLinkWhatsapp('Halo, mohon informasi terkait penawaran produk ' + p.name)">
              Get Offer
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" class="px-2 py-8 text-center">
        <v-btn
          v-if="(page < Math.ceil(dataProduct.length / 12))"
          color="primary lighten-2"
          dark
          class="text-capitalize elevation-2 rounded-lg px-10 body-1"
          @click.prevent="(page < Math.ceil(dataProduct.length / 12)) ? page = (page + 1) : false"
        >
          Load More
        </v-btn>
        <span v-else-if="!dataProduct.length" class="grey--text text--darken-1">
          no result
        </span>
        <span v-else-if="dataProduct.length" class="grey--text text--darken-1">
          end of catalog
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
let searchTimeout = null
export default {
  name: 'Product',
  components: {
  },
  data: () => ({
    searchProduct: '',
    search: '',
    page: 1,
    loading: false
  }),
  computed: {
    productCategory () {
      return this.$store.state.product.category
    },
    dataProduct () {
      const products = this.$store.state.product.data
      const cat = this.$route.query.category || ''
      if (this.searchProduct || (cat && cat !== 'All')) {
        const search = new RegExp(this.searchProduct, 'gi')
        return products.filter(r => (r.name || '-').match(search)).filter((r) => (cat && cat !== 'All' ? (cat === r.category) : true))
      } else {
        return products
      }
    }
  },
  watch: {
    searchProduct () {
      this.page = 1
    },
    search () {
      this.loading = true
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
      searchTimeout = setTimeout(() => {
        this.SEARCH_PRODUCT()
      }, 750)
    },
    $route: {
      immediate: true,
      handler (to, from) {
      }
    }
  },
  mounted () {
  },
  methods: {
    SEARCH_PRODUCT () {
      const q = this.search ? ('?q=' + this.search) : ''
      this.$store.dispatch('SEARCH_PRODUCT', q)
        .then(() => {
          this.loading = false
          // console.log(this.$store.state.files)
        })
    }
  }
}
</script>

<style lang="scss">
.search-product {
  position: fixed;
  top: 54px;
  left: 0px;
  width: 100%;
  z-index:1;
}
</style>
