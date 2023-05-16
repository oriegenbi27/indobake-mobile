<template>
  <div>
    <div v-if="userEdit" class="d-flex justify-center py-2" style="width: 100%;height: calc(100vh - 117px);">
      <v-card v-if="$store.state.user" class="px-4 pb-8 pt-4 rounded-lg elevation-0" style="min-width: 98%;">
        <div class="text-h5 text-center pb-6 pt-2">
          My Account
          <div v-if="($store.state.user.role === 'mitra' && !parseInt($store.state.user.sub_id))" class="d-flex align-center justify-center fill-width pa-4">
            <v-btn outlined color="primary" class="rounded-pill text-capitalize px-6" @click.prevent="mitra_subs_dialog = true">
              <v-icon class="mr-3" small>
                mdi-account-group
              </v-icon>
              Mitra Sub Account
            </v-btn>
          </div>
        </div>
        <div v-if="!($store.state.user.role === 'mitra' && parseInt($store.state.user.sub_id))" class="pt-3 px-2">
          <v-text-field
            v-model="userEdit.name"
            readonly
            type="text"
            label="Name"
            color="primary"
            outlined
            hide-details
            class="mb-4 rounded-lg accent"
            @keypress.enter="UPDATE_ME()"
          />
          <v-text-field
            v-model="userEdit.email"
            readonly
            type="email"
            label="Email"
            color="primary"
            outlined
            hide-details
            class="mb-4 rounded-lg accent"
            @keypress.enter="UPDATE_ME()"
          />
          <v-text-field
            v-model="userEdit.phone"
            readonly
            type="text"
            label="Phone"
            color="primary"
            outlined
            hide-details
            class="mb-4 rounded-lg accent"
            @keypress="$NumberOnly"
            @keypress.enter="UPDATE_ME()"
          />
          <div v-if="$store.state.user.role === 'mitra'">
            <v-text-field
              v-model="userEdit.bank"
              type="text"
              label="Bank Name"
              color="primary"
              outlined
              hide-details
              class="mb-4 rounded-lg accent"
              @keypress.enter="UPDATE_ME()"
            />
            <v-text-field
              v-model="userEdit.bank_number"
              type="text"
              label="Bank Account Number"
              color="primary"
              outlined
              hide-details
              class="mb-4 rounded-lg accent"
              @keypress="$NumberOnly"
              @keypress.enter="UPDATE_ME()"
            />
            <v-text-field
              v-model="userEdit.bank_account"
              type="text"
              label="Bank Account Name"
              color="primary"
              outlined
              hide-details
              class="mb-4 rounded-lg accent"
              @keypress.enter="UPDATE_ME()"
            />
          </div>
          <v-btn block color="primary lighten-1" class="rounded-lg text-capitalize body-1" depressed large dark @click.prevent="UPDATE_ME()">
            Update
          </v-btn>
        </div>
        <v-divider v-if="!($store.state.user.role === 'mitra' && parseInt($store.state.user.sub_id))" class="my-6" />
        <div v-if="!($store.state.user.role === 'mitra' && parseInt($store.state.user.sub_id))" class="pt-2 px-2">
          <v-text-field
            v-model="password.password_old"
            type="password"
            label="Old Password"
            color="primary"
            outlined
            hide-details
            class="mb-4 rounded-lg accent"
            @keypress.enter="CHANGE_PASSWORD()"
          />
          <v-text-field
            v-model="password.password_new"
            type="password"
            label="New Password"
            color="primary"
            outlined
            hide-details
            class="mb-4 rounded-lg accent"
            @keypress.enter="CHANGE_PASSWORD()"
          />
          <v-btn block color="primary lighten-1" class="rounded-lg text-capitalize body-1" depressed large dark @click.prevent="CHANGE_PASSWORD()">
            Change Password
          </v-btn>
        </div>
        <div class="pt-4 pb-16">
          <v-btn block color="red" class="text-capitalize mb-8" text dark @click.prevent="$store.dispatch('ME_LOGOUT'), $router.replace('/')">
            Logout
          </v-btn>
        </div>
      </v-card>
    </div>
    <v-dialog
      v-model="mitra_subs_dialog"
      fullscreen
      hide-overlay
      persistent
      no-click-animation
      transition="dialog-bottom-transition"
    >
      <v-card class="rounded-0" flat>
        <v-toolbar
          color="accent"
          class="elevation-0"
        >
          <v-toolbar-title>
            Mitra Sub Account
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              @click="mitra_subs_dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider />
        <v-card v-if="$store.state.user" class="px-4 py-2 elevation-0 rounded-0">
          <div class="d-flex flex-column fill-width">
            <div v-if="!mitra_subs.length" class="d-flex fill-width justify-center py-4 my-1 font-weight-bold grey--text text--darken-1">
              no sub account
            </div>
            <div v-for="(ms, iMs) in mitra_subs" :key="'ms-' + iMs" class="d-flex fill-width align-center justify-space-between py-2 my-1 font-weight-bold" @click.prevent="ShowMitraSub(ms)">
              <div>
                <div class="d-flex fill-width justify-space-between ">
                  {{ ms.name }} (mitra#{{ $store.state.user.id }}#{{ ms.email }})
                </div>
                <div class="grey--text">
                  {{ ms.phone }}
                </div>
              </div>
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </div>
            <div class="d-flex fill-width justify-center pa-4 mt-4">
              <v-btn depressed small color="primary" class="rounded-pill text-capitalize px-6" @click.prevent="ShowMitraSub()">
                <v-icon small class="mr-1">
                  mdi-plus
                </v-icon>
                Tambah Sub Account
              </v-btn>
            </div>
          </div>
        </v-card>
        <v-dialog
          v-model="dialogMitaSub.show"
          hide-overlay
        >
          <v-card class="rounded-0">
            <v-toolbar
              dark
              color="primary"
              class="elevation-0"
            >
              <v-toolbar-title>Mita Sub Account</v-toolbar-title>
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  color="yellow"
                  @click="dialogMitaSub.show = false"
                >
                  Close
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <div v-if="dialogMitaSub.data" class="pa-4">
              <v-text-field
                v-model="dialogMitaSub.data.name"
                label="Name"
                color="primary"
                outlined
                hide-details
                class="mb-4 rounded-lg accent"
              />
              <v-text-field
                v-model="dialogMitaSub.data.email"
                :prefix="'mitra#' + $store.state.user.id + '#'"
                label="Email"
                color="primary"
                outlined
                hide-details
                class="mb-4 rounded-lg accent"
              />
              <v-text-field
                v-model="dialogMitaSub.data.phone"
                label="Phone"
                color="primary"
                outlined
                hide-details
                class="mb-4 rounded-lg accent"
                @keypress="$NumberOnly"
              />
              <v-text-field
                v-model="dialogMitaSub.data.passcode"
                type="password"
                label="Login Passcode"
                color="primary"
                outlined
                hide-details
                class="mb-4 rounded-lg accent"
              />
              <v-btn block color="primary lighten-1" class="rounded-lg text-capitalize body-1" depressed large dark @click.prevent="ProcessMitraSub()">
                Simpan
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  data: () => ({
    userEdit: null,
    password: {
      password_old: '',
      password_new: ''
    },
    mitra_subs_dialog: false,
    mitra_subs: [],
    dialogMitaSub: {
      show: false,
      data: null
    }
  }),
  computed: mapState({
    user: state => state.user
  }),
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        if (to.name === 'Profile') {
          this.mitra_subs = []
          this.LoadMitraSub()
        }
      }
    },
    user: function (v) {
      this.userEdit = Object.assign({}, v)
    }
  },
  mounted () {
    if (this.$store.state.user) {
      this.userEdit = Object.assign({}, this.$store.state.user)
    } else {
      this.$router.replace('/')
    }
  },
  methods: {
    ShowMitraSub (data) {
      if (data) {
        this.dialogMitaSub.data = Object.assign({}, data)
      } else {
        this.dialogMitaSub.data = Object.assign({}, {
          name: '',
          email: '',
          phone: '',
          passcode: '',
          mitra: this.$store.state.user.id
        })
      }
      this.dialogMitaSub.show = true
    },
    LoadMitraSub () {
      if (this.$store.state.user) {
        if (this.$store.state.user.role === 'mitra' && !parseInt(this.$store.state.user.sub_id)) {
          this.$store.dispatch('MITRA_SUB_GET', this.$store.state.user.id)
            .then((res) => {
              if (res.status) {
                if (!res.data.error) {
                  this.mitra_subs = res.data.data || []
                }
              }
            })
        }
      }
    },
    ProcessMitraSub () {
      if (this.dialogMitaSub) {
        const mitraSub = Object.assign({}, this.dialogMitaSub.data)
        if (!mitraSub.name || !mitraSub.email || !mitraSub.phone || !mitraSub.passcode) {
          this.$store.commit('SNACKBAR', { show: true, text: 'Data belum lengkap!' })
          return false
        }
        this.$store.dispatch('MITRA_SUB_PROCESS', mitraSub)
          .then((res) => {
            if (res.status) {
              this.$store.commit('SNACKBAR', { show: true, text: 'Berhasil diproses!' })
              this.dialogMitaSub.show = false
              this.LoadMitraSub()
            } else {
              this.$store.commit('SNACKBAR', { show: true, text: 'Terjadi kesalahan!' })
            }
          })
      } else {
        this.$store.commit('SNACKBAR', { show: true, text: 'Invalid!' })
      }
    },
    UPDATE_ME () {
      if (!this.userEdit.name || !this.$validateEmail(this.userEdit.email)) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input valid name and email!' })
        return false
      }
      this.$store.dispatch('ME_UPDATE', this.userEdit)
    },
    CHANGE_PASSWORD () {
      if (!this.password.password_old || !this.password.password_new) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input your old and new password!' })
        return false
      }
      this.$store.dispatch('CHANGE_PASSWORD', this.password)
        .then((res) => {
          if (res.status) {
            if (res.data.data.response) {
              this.$store.commit('SNACKBAR', { show: true, text: 'Password changed!' })
              this.password.password_old = ''
              this.password.password_new = ''
            } else {
              this.$store.commit('SNACKBAR', { show: true, text: res.data.data.message })
            }
          } else {
            this.$store.commit('SNACKBAR', { show: true, text: 'Something went wrong!' })
          }
        })
    }
  }
}
</script>

<style lang="scss">
</style>
