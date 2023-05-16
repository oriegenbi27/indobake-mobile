<template>
  <div class="">
    <div class="pa-3">
      <v-card class="rounded-lg elevation-0 mb-4">
        <v-carousel :show-arrows="false" height="auto" cycle hide-delimiter-background>
          <v-carousel-item
            v-for="(item, i) in $store.state.media.filter(r => r.type === 'banner')"
            :key="'media-banner-' + i"
            @click.prevent="$router.push('?media=' + item.id)"
          >
            <div class="bg-cover" :style="{ backgroundImage: 'url(' + item.image + ')', paddingBottom:'45%' }" />
          </v-carousel-item>
        </v-carousel>
      </v-card>
      <v-row v-if="$store.state.user">
        <v-col v-if="!($store.state.user.role === 'mitra' && parseInt($store.state.user.sub_id))" cols="12" class="px-0">
          <v-card class="rounded-lg px-4 py-4 elevation-0 accent">
            <div class="d-flex fill-width flex-column px-2">
              <div class="d-flex flex-column align-center fill-width">
                <div class="text-h6 d-flex align-center font-weight-bold fill-width text-truncate">
                  Hi, {{ $store.state.user.name }}
                </div>
                <div class="d-flex align-center fill-width font-weight-bold" style="font-size:1.1rem;">
                  <div class="d-flex align-center">
                    {{ poinOnReload ? 0 : ($store.state.user ? $store.state.user.poin : '~') }}
                  </div>
                  <div class="d-flex justify-space-between align-center fill-width">
                    <span class="d-flex align-center pl-1" style="min-width:50%;">
                      <img src="/logo-h-bake.png" class="d-flex mr-1" style="height:19px;"> Poin
                    </span>
                    <v-icon medium color="orange" @click.prevent="poinOnReload = true, ReloadPoin()">
                      mdi-refresh
                    </v-icon>
                  </div>
                </div>
              </div>
              <!-- <img src="/logo.png" class="d-block rounded-circle pa-1 white ml-4" style="width:50px;"> -->
            </div>
            <div :class="[$store.state.user.role === 'user' ? 'justify-space-between' : '']" class="d-flex align-center fill-width pt-3 pb-1">
              <v-btn
                v-if="$store.state.user.role === 'user'"
                to="/submission"
                depressed
                dark
                color="primary lighten-2"
                class="rounded-lg mr-1 text-capitalize"
                style="width:47%;"
              >
                <v-icon small class="mr-2">
                  mdi-clipboard-text-outline
                </v-icon>
                Installment
              </v-btn>
              <v-btn
                to="/poin-history"
                :class="[$store.state.user.role === 'user' ? 'ml-1' : '']"
                :style="{ width: $store.state.user.role === 'user' ? '47%' : '100%' }"
                :color="$store.state.user.role === 'user' ? 'primary lighten-2' : 'cyan'"
                depressed
                dark
                class="rounded-lg text-capitalize"
              >
                <v-icon small class="mr-2">
                  mdi-plus-circle-multiple-outline
                </v-icon>
                History
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="$store.state.media.filter(r => r.type === 'article').length">
        <v-col cols="12" class="pt-4 pb-0 text-h6 text-center font-weight-bold grey--text text--darken-1 px-4">
          Indobake News
        </v-col>
        <v-col cols="12" class="px-0">
          <div class="article-scroll px-4 py-2">
            <v-card
              v-for="(a, i) in $store.state.media.filter(r => r.type === 'article')"
              :key="'media-article-' + i"
              class="d-inline-block mr-4 rounded-lg"
              flat
              @click.prevent="$router.push('?media=' + a.id)"
            >
              <div class="bg-cover accent" :style="{ backgroundImage: 'url(' + a.image + ')', paddingBottom:'45%' }" />
              <div class="px-4 pt-2 text-h6 text-truncate fill-width">
                {{ a.title }}
              </div>
              <div class="px-4 pb-4 body-1 text-truncate fill-width">
                {{ a.description }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mt-6 mx-12" />
      <v-row>
        <v-col cols="12" class="pt-8 text-h6 text-center font-weight-bold grey--text text--darken-1 px-4">
          Our Catalog
        </v-col>
        <v-col cols="12" class="pt-2 px-4">
          <div class="d-flex align-center fill-width accent pl-2 pr-4 py-2 rounded-lg" style="">
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
      <v-row class="px-2">
        <!-- <v-col cols="12" class="pt-2 text-h6 black--text px-2">
          Our Product
        </v-col> -->
        <v-col v-for="(p, iP) in $store.state.product.data.filter((r, i) => i < 6)" :key="'product-' + iP" cols="6" class="pa-2">
          <v-card class="d-flex fill-width flex-column fill-height elevation-0 rounded-0" @click.prevent="$router.push('?productDetail=' + p.id)">
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
            <div class="d-flex fill-width align-self-end justify-end pb-3 px-4 text-right" @click.stop>
              <v-btn color="primary lighten-2" dark depressed small class="rounded-lg text-capitalize" @click.prevent="$OpenLinkWhatsapp('Halo, informasi terkait produk ' + p.name)">
                Get Offer
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="px-2 py-8 text-center">
          <v-btn to="/product" color="primary lighten-2" dark class="text-capitalize elevation-2 rounded-lg px-10 body-1">
            Load More
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="dialogMedia.show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card v-if="dialogMedia.data" class="rounded-0" flat>
        <v-toolbar
          color="accent"
          class="elevation-0"
        >
          <v-toolbar-title>
            {{ dialogMedia.data.type === 'banner' ? 'Promotion' : 'Indobake News' }}
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              @click="$router.go(-1)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider />
        <v-card v-if="dialogMedia.data" class="pb-4 elevation-0 rounded-0">
          <div class="pt-4 px-4">
            <img :src="dialogMedia.data.image" class="d-block accent fill-width">
          </div>
          <div class="pa-4">
            <div class="text-h5">
              {{ dialogMedia.data.title }}
            </div>
            <div class="pt-2 pb-4" style="white-space: pre-wrap;" v-html="dialogMedia.data.description || ''" />
          </div>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    dialogMedia: {
      show: false,
      data: null
    },
    poinOnReload: false
  }),
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.dialogMedia.show = false
        if (parseInt(to.query.media)) {
          this.OpenMedia(parseInt(to.query.media))
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    async ReloadPoin () {
      console.log('s')
      setTimeout(() => {
        this.$store.dispatch('ME')
        this.$store.commit('SNACKBAR', { show: true, text: ('Point reloaded!') })
        this.poinOnReload = false
      }, 1000)
      // this.$store.dispatch('POIN_HISTORY_PROCESS_TO_MITRA', {
      //   user: 2,
      //   poin: 10
      // }).then((res) => {
      //   if (res.status) {
      //     this.$store.dispatch('ME')
      //     this.$store.commit('SNACKBAR', { show: true, text: ('Points refreshed!') })
      //     this.$router.replace('/')
      //   } else {
      //     // this.$store.commit('SNACKBAR', { show: true, text: 'Something went wrong!' })
      //   }
      // })
    },
    OpenMedia (mediaID) {
      const findMedia = this.$store.state.media.find(r => parseInt(r.id) === mediaID)
      if (findMedia) {
        this.dialogMedia.data = Object.assign({}, findMedia)
        this.dialogMedia.show = true
      } else {
        this.$store.commit('SNACKBAR', { show: true, text: 'Failed open media!' })
      }
    }
  }
}
</script>

<style lang="scss">
.img-cover {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.file-items {
  &.no-thumbnail {
    >.v-responsive__sizer {
      padding-bottom: 50%!important;
      background-size: 50px!important;
    }
    >.v-image__image {
      &.v-image__image--cover {
        background-size: 25% 25%!important;
      }
    }
  }
}
.list-name {
  position: absolute;
  bottom: 0px;
  left: 0px;
  text-align: center;
  width: 100%;
  padding: 2px 10px;
  span {
    position: relative;
    margin: 0 auto;
    display: block;
    background: rgba(0, 0, 0, .2);
    padding: 4px 10px;
    font-size: 11px;
    border-radius: 4px;
    line-height: 100%;
    max-width: 90%;
  }
}
.flex-scroll {
  &::-webkit-scrollbar {
    display: none;
  }
  >button {
    min-width:45px;
  }
  >div {
    min-width: 150px;
  }
}
.article-scroll {
  position:relative;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space:nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  >div {
    display: inline-block;
    width: 300px;
  }
}
</style>
