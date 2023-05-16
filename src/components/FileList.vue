<template>
  <v-row no-gutters>
    <v-col v-if="!files.length" cols="12" class="py-10 px-4 text-center">
      No data!
    </v-col>
    <v-col cols="12" class="d-flex child-flex">
      <v-list>
        <v-list-item
          v-for="(file, iFile) in files"
          :key="'file-list-' + iFile"
          :ripple="isFolder(file.mimeType)"
          @click.prevent="isFolder(file.mimeType) ? GOTO(file) : false"
        >
          <v-list-item-avatar>
            <v-icon large :color="isFolder(file.mimeType) ? 'orange' : fileIcon(file.iconLink).color">
              {{ isFolder(file.mimeType) ? 'mdi-folder' : fileIcon(file.iconLink).icon }}
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="fill-width subtitle-2 font-weight-bold">
              <div class="" style="max-width: 100%;white-space: initial;word-wrap:break-word;">
                {{ file.name }}
              </div>
            </v-list-item-title>
            <v-list-item-subtitle class="fill-width caption ">
              Modified <small>at</small> {{ $localDT(file.modifiedTime, 'datetimelocal') }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon v-if="isFolder(file.mimeType)" color="grey">
              mdi-chevron-right
            </v-icon>
            <v-icon v-else-if="!file.shared" color="grey">
              mdi-lock-outline
            </v-icon>
            <v-menu
              v-else
              transition="slide-y-transition"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="grey">
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <!-- <v-list-item @click.prevent="DOWNLOAD(file)">
                  <v-list-item-title class="body-2">
                    <v-icon class="mr-1">
                      mdi-cloud-download
                    </v-icon>
                    Download
                  </v-list-item-title>
                </v-list-item> -->
                <v-list-item @click.prevent="$OpenBrowser(file.webViewLink || file.webContentLink)">
                  <v-list-item-title class="body-2">
                    <v-icon class="mr-1">
                      mdi-eye
                    </v-icon>
                    View in Browser
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <!-- :src="file.hasThumbnail ? ('https://drive.google.com/thumbnail?sz=w150-h150&id=' + file.id) : file.iconLink" -->
      <!-- <v-img
        :src="file.hasThumbnail ? file.thumbnailLink : file.iconLink"
        :lazy-src="file.hasThumbnail ? file.thumbnailLink : file.iconLink"
        :class="[file.hasThumbnail ? '' : 'no-thumbnail']"
        aspect-ratio="1"
        referrerPolicy="no-referrer"
        class="file-items grey lighten-2 p-relative"
        height="120px"
        @click.prevent="OPEN(file)"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <div class="list-name">
          <span class="text-truncate">{{ file.name }}</span>
        </div>
      </v-img> -->
      <!-- <div :style="{ backgroundImage: 'url(' + file.iconLink + ')' }" class="d-block img-cover" style="width: 30%;padding-bottom:30%;" /> -->
    </v-col>
    <v-dialog
      v-model="dialog.show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card v-if="dialog.data.active" class="rounded-0">
        <v-toolbar dark color="orange" class="elevation-1">
          <v-icon dark class="ml-2 mr-5">
            mdi-folder
          </v-icon>
          <v-toolbar-title>
            {{ dialog.data.active.name }}
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="$router.go(-1)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div v-if="dialog.loading" class="py-10 px-2 fill-width d-flex align-center justify-center">
          <v-progress-circular
            :size="50"
            :width="5"
            color="purple"
            indeterminate
          />
        </div>
        <div v-else-if="dialog.data.files">
          <div v-if="dialog.data.files.length">
            <FileList :files="dialog.data.files" />
          </div>
          <div v-else class="py-10 px-4 text-center">
            No data!
          </div>
        </div>
        <div v-else class="py-10 px-4 text-center">
          something went wrong!
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    dialog: {
      show: false,
      loading: true,
      data: {
        active: null,
        files: null
      }
    }
  }),
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        const destTo = to ? to.query.dest ? to.query.dest.split('/').length : 0 : 0
        const destFrom = from ? from.query.dest ? from.query.dest.split('/').length : 0 : 0
        if (destTo) {
          const destFromData = destFrom ? from.query.dest.split('/') : []
          // const destToData = destTo ? to.query.dest.split('/') : []
          if (destTo > destFrom) {
            // NEXT OPEN PUSHED
          } else if (destFrom && this.dialog.data.active) {
            // GO BACK & JUST CLOSE RELATED DIALOG
            const id = destFromData[destFrom - 1]
            if (id === this.dialog.data.active.id) {
              this.dialog.show = false
            } else {
              // OTHER DIALOG OPENED NOT RELATED
            }
          } else {
            // CLOSE FORCE ALL DIALOG
            this.dialog.show = false
          }
        } else {
          // CLOSE FORCE ALL DIALOG
          this.dialog.show = false
        }
      }
    }
  },
  methods: {
    GOTO (folder) {
      this.dialog.loading = true
      this.dialog.show = true
      this.dialog.data.active = Object.assign({}, folder)
      this.dialog.data.files = null
      this.LOAD_FOLDER(this.dialog.data.active.id)
      const r = this.$route.query.dest
      if (r) {
        this.$router.push('?dest=' + this.$route.query.dest + '/' + folder.id)
      } else {
        this.$router.push('?dest=' + folder.id)
      }
    },
    LOAD_FOLDER (id) {
      this.$store.dispatch('LOAD_FILES_FOLDER', id)
        .then((res) => {
          this.dialog.data.files = res || []
          setTimeout(() => {
            this.dialog.loading = false
          }, 300)
          // this.dialog.name = folder.name
          // console.log(this.$store.state.files)
        })
    },
    DOWNLOAD (file) {
      let ext = ''
      if (file.mimeType.match(/png/gi)) {
        ext = '.png'
      } else if (file.mimeType.match(/jpg/gi) || file.mimeType.match(/jpeg/gi)) {
        ext = '.jpg'
      } else if (file.mimeType.match(/gif/gi)) {
        ext = '.gif'
      } else if (file.mimeType.match(/pdf/gi)) {
        ext = '.pdf'
      }
      if (file.name) {
        this.$store.dispatch('DOWNLOAD', {
          id: file.id,
          mimeType: file.mimeType,
          fileName: file.name ? file.name.match(/\./) ? file.name : file.name + ext : file.name
        }).then((res) => {
          if (res.status) {
            if (res.data.data.status) {
              // this.$OpenBrowser(res.data)
              var a = document.createElement('a')
              a.href = res.data.data.data
              a.target = '_blank'
              a.download = file.name ? file.name.match(/\./) ? file.name : file.name + ext : file.name
              a.click()
            } else {
              alert(res.data || 'Something went wrong!')
            }
          } else {
            alert('Something went wrong!')
          }
        })
      } else {
        alert('Something went wrong!')
      }
    },
    isFolder (mime) {
      return mime === 'application/vnd.google-apps.folder'
    },
    fileIcon (icon) {
      if (icon) {
        if (icon.match(/\/png/)) {
          return {
            icon: 'mdi-file-image',
            color: 'teal darken-2'
          }
        } else if (icon.match(/\/gif/)) {
          return {
            icon: 'mdi-file-image',
            color: 'teal darken-2'
          }
        } else if (icon.match(/\/jpg/) || icon.match(/\/jpeg/)) {
          return {
            icon: 'mdi-file-image',
            color: 'teal darken-2'
          }
        } else if (icon.match(/\/pdf/)) {
          return {
            icon: 'mdi-file-pdf-box',
            color: 'red darken-3'
          }
        } else if (icon.match(/\/word/) || icon.match(/\/doc/) || icon.match(/\/docx/) || icon.match(/\/msword/) || icon.match(/wordprocessingml/) || icon.match(/\/vnd\.google-apps\.document/)) {
          return {
            icon: 'mdi-file-word-box',
            color: 'indigo'
          }
        } else if (icon.match(/\/excel/) || icon.match(/\/xls/) || icon.match(/\/xlsx/) || icon.match(/\/msexcel/) || icon.match(/spreadsheet/)) {
          return {
            icon: 'mdi-file-excel-box',
            color: 'green darken-3'
          }
        } else if (icon.match(/\/powerpoint/) || icon.match(/\/ppt/) || icon.match(/\/pptx/) || icon.match(/presentation/)) {
          return {
            icon: 'mdi-file-powerpoint-box',
            color: 'deep-orange darken-3'
          }
        } else {
          return {
            icon: 'mdi-file-alert-outline',
            color: 'grey'
          }
        }
      }
      return 'mdi-file'
    }
  }
}
</script>
