<template>
  <v-card class="onboarding-page elevation-0 rounded-0">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider />
      <!-- <v-tab href="#tab-1">
        #
      </v-tab>
      <v-tab href="#tab-2">
        #
      </v-tab>
      <v-tab href="#tab-3">
        #
      </v-tab> -->
      <v-tab href="#tab-4">
        #
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- <v-tab-item value="tab-1">
        <v-card flat class="rounded-0">
          <v-card-text class="d-flex px-10 flex-column align-center text-center justify-center">
            <div class="pt-2 body-1">
              <div class="font-weight-bold text-h6 black--text mb-2 text-capitalize">
                The right choice for your baking & mixing equipment needs
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <v-card flat>
          <v-card-text class="d-flex px-10 body-1 flex-column text-center align-center justify-center">
            <p>
              <strong>Indobake</strong> lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-3">
        <v-card flat class="rounded-0">
          <v-card-text class="d-flex px-4 flex-column align-center justify-center body-1">
            Ready to Explore ?
            <v-btn text class="text-capitalize mt-2 body-1" color="primary" @click.prevent="tab = 'tab-4'">
              Continue Access
              <v-icon small class="ml-1">
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <v-tab-item value="tab-4">
        <v-card flat class="login-page accent px-10 rounded-0">
          <div class="d-flex align-center justify-center fill-width fill-height">
            <span style="position: absolute;top:20px;right:20px;" @click.prevent="$emit('close', true)">
              <v-icon color="primary lighten-1" large>
                mdi-close
              </v-icon>
            </span>
            <v-card class="px-4 py-8 rounded-xl">
              <div class="d-flex fill-width justify-center pt-0 pb-2">
                <v-img
                  alt="Indobake"
                  class="shrink mr-2"
                  contain
                  src="/logo-shadow.png"
                  transition="scale-transition"
                  height="90"
                />
              </div>
              <div v-if="toggleShow === 'reset-password'" class="pt-4 px-4">
                <v-text-field
                  v-model="forgotPassword.email"
                  type="email"
                  label="Input your email"
                  color="primary"
                  outlined
                  dense
                  hide-details
                  class="mb-6 rounded-lg accent"
                  @keypress.enter="RESET_PASSWORD"
                >
                  <template v-slot:append>
                    <v-icon color="primary lighten-1">
                      mdi-email
                    </v-icon>
                  </template>
                </v-text-field>
                <div class="d-flex fill-width align-cnter justify-space-between">
                  <v-btn text color="primary" class="text-capitalize" @click.prevent="toggleShow = 'signin'">
                    Sign In
                  </v-btn>
                  <v-btn color="primary" class="text-capitalize rounded-lg lighten-1 elevation-2 px-6" @click.prevent="RESET_PASSWORD">
                    Reset Password
                  </v-btn>
                </div>
              </div>
              <div v-else-if="toggleShow === 'register'" class="pt-4 px-4">
                <v-text-field
                  v-model="register.email"
                  type="email"
                  label="Email"
                  color="primary"
                  outlined
                  dense
                  hide-details
                  class="mb-4 rounded-lg accent"
                  @keypress.enter="REGISTER"
                  @keyup="EMAIL_CHECK()"
                >
                  <template v-slot:append>
                    <v-icon color="primary lighten-1">
                      mdi-email
                    </v-icon>
                  </template>
                </v-text-field>
                <v-text-field
                  v-model="register.password"
                  :type="togglePassword ? 'password' : 'text'"
                  label="Password"
                  outlined
                  dense
                  color="primary"
                  hide-details
                  class="mb-4 rounded-lg accent"
                  @keypress.enter="REGISTER"
                >
                  <template v-slot:append>
                    <v-icon color="primary lighten-1" @click.prevent="togglePassword = !togglePassword">
                      {{ togglePassword ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                  </template>
                </v-text-field>
                <v-text-field
                  v-model="register.password_confirm"
                  :type="togglePassword ? 'password' : 'text'"
                  label="Confirm Password"
                  outlined
                  dense
                  color="primary"
                  hide-details
                  class="mb-6 rounded-lg accent"
                  @keypress.enter="LOGIN"
                >
                  <template v-slot:append>
                    <v-icon color="primary lighten-1" @click.prevent="togglePassword = !togglePassword">
                      {{ togglePassword ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                  </template>
                </v-text-field>
                <div v-if="register.email_exist === 'not_exist'" class="font-italic text-center px-4 pb-6 red--text" style="line-height:120%;">
                  Email not found, please contact our call center <a href="#" @click.prevent="$OpenLinkWhatsapp('Halo, saya mau register di Indobake.')" class="primary--text" style="text-decoration:none;">here</a>
                </div>
                <div v-else-if="register.email_exist === 'exist_registered'" class="font-italic text-center px-4 pb-6 red--text" style="line-height:120%;">
                  Email already registered, use <a href="#" @click.prevent="toggleShow = 'reset-password'" class="primary--text" style="text-decoration:none;">reset password</a> to change your password!
                </div>
                <div class="d-flex fill-width align-cnter justify-space-between">
                  <v-btn text color="primary" class="text-capitalize" @click.prevent="toggleShow = 'signin'">
                    Sign In
                  </v-btn>
                  <v-btn :dark="register.email_exist === 'exist'" :disabled="register.email_exist !== 'exist'" :color="register.email_exist === 'exist' ? 'primary' : 'red'" class="text-capitalize rounded-lg lighten-1 elevation-2 px-6" @click.prevent="REGISTER">
                    Register
                  </v-btn>
                </div>
              </div>
              <!-- <div class="px-4 pt-6 pb-0 text-center caption">
                Already have an account?
                <span class="d-inline-block primary--text text--lighten-1" @click.prevent="forgotPassword.show = false">
                  Sign In
                </span>
              </div> -->
              <div v-else class="pt-4 px-4">
                <v-text-field
                  v-model="login.email"
                  type="email"
                  label="Email"
                  color="primary"
                  outlined
                  dense
                  hide-details
                  class="mb-4 rounded-lg accent"
                  @keypress.enter="LOGIN"
                >
                  <template v-slot:append>
                    <v-icon color="primary lighten-1">
                      mdi-email
                    </v-icon>
                  </template>
                </v-text-field>
                <v-text-field
                  v-model="login.password"
                  :type="togglePassword ? 'password' : 'text'"
                  label="Password"
                  outlined
                  dense
                  color="primary"
                  hide-details
                  class="mb-6 rounded-lg accent"
                  @keypress.enter="LOGIN"
                >
                  <template v-slot:append>
                    <v-icon color="primary lighten-1" @click.prevent="togglePassword = !togglePassword">
                      {{ togglePassword ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                  </template>
                </v-text-field>
                <div class="text-center">
                  <v-btn color="primary" class="text-capitalize rounded-lg lighten-1 elevation-2 px-6" dark @click.prevent="LOGIN">
                    Sign In
                  </v-btn>
                  <div class="px-4 pt-4 pb-0 text-center caption">
                    Forgot Password?
                    <span class="d-inline-block primary--text text--lighten-1" @click.prevent="toggleShow = 'reset-password'">
                      Reset Password
                    </span>
                  </div>
                  <div class="px-4 pt-0 pb-0 text-center caption">
                    Don't have an account ?
                    <span class="d-inline-block primary--text text--lighten-1" @click.prevent="toggleShow = 'register'">
                      Register
                    </span>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <div v-if="tab !== 'tab-4'" class="onboarding-fixed-overlay">
      <div class="d-flex flex-column align-center justify-space-between fill-height fill-width">
        <div class="onboarding-logo-top text-center">
          <img src="/logo.png" style="height: 85px;">
        </div>
        <div class="onboarding-logo-bottom text-center">
          <div class="d-flex justify-center pb-2">
            <div class="d-flex justify-center text-h2">
              <span :class="[tab === 'tab-1' ? 'primary--text' : 'grey--text']">&sdot;</span>
              <span :class="[tab === 'tab-2' ? 'primary--text' : 'grey--text']">&sdot;</span>
              <span :class="[tab === 'tab-3' ? 'primary--text' : 'grey--text']">&sdot;</span>
              <!-- <span :class="[tab === 'tab-4' ? 'primary--text' : 'grey--text']">&sdot;</span> -->
            </div>
          </div>
          <img src="/logo-h.png" style="height: 20px;">
        </div>
      </div>
    </div>
    <div v-if="loadingFull && !$store.state.user" class="d-flex flex-column justify-center align-center" style="z-index:1000;position:fixed;top:0px;left:0px;width:100vw;height:100vh;background:rgba(0, 0, 0, .3);">
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </div>
  </v-card>
</template>

<script>
let emailCheckTimeout = null
export default {
  data: () => {
    return {
      loadingFull: false,
      tab: 'tab-4',
      toggleShow: 'signin',
      register: {
        show: false,
        email: '',
        password: '',
        password_confirm: '',
        email_exist: ''
      },
      forgotPassword: {
        show: false,
        email: ''
      },
      togglePassword: true,
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    EMAIL_CHECK () {
      this.register.email_exist = ''
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout)
      }
      emailCheckTimeout = setTimeout(() => {
        if (this.$validateEmail(this.register.email)) {
          this.$store.dispatch('EMAIL_CHECK', this.register.email)
            .then((res) => {
              if (res.status) {
                this.register.email_exist = res.data.data
              }
            })
        }
      }, 750)
    },
    RESET_PASSWORD () {
      if (!this.forgotPassword.email) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input email!' })
        return false
      } else if (!this.$validateEmail(this.forgotPassword.email)) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input valid email!' })
        return false
      }
      this.loadingFull = true
      this.$store.dispatch('RESET_PASSWORD', {
        email: this.forgotPassword.email
      }).then((res) => {
        if (res.status) {
          this.toggleShow = 'signin'
          this.login.email = this.forgotPassword.email
          this.forgotPassword.email = ''
          this.$store.commit('SNACKBAR', { show: true, text: 'Success, please check your email!' })
        } else {
          this.$store.commit('SNACKBAR', { show: true, text: 'Ops, something went wrong!' })
        }
        setTimeout(() => {
          this.loadingFull = false
        }, 300)
      })
    },
    REGISTER () {
      if (!this.register.email) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input email!' })
        return false
      } else if (!this.$validateEmail(this.register.email)) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input valid email!' })
        return false
      } else if (!this.register.password) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input password!' })
        return false
      } else if (this.register.password.length <= 4) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Invalid password!' })
        return false
      } else if (this.register.password !== this.register.password_confirm) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Password doesn\'t match!' })
        return false
      }
      this.loadingFull = true
      this.$store.dispatch('REGISTER', {
        email: this.register.email,
        password: this.register.password,
        password_confirm: this.register.password_confirm
      }).then((res) => {
        if (res.status) {
          this.toggleShow = 'signin'
          this.login.email = this.register.email
          this.register.email = ''
          this.register.password = ''
          this.register.password_confirm = ''
          this.$store.commit('SNACKBAR', { show: true, text: 'Success, please check your email!' })
        } else {
          this.$store.commit('SNACKBAR', { show: true, text: 'Ops, something went wrong!' })
        }
        setTimeout(() => {
          this.loadingFull = false
        }, 300)
      })
    },
    LOGIN () {
      if (!this.login.email) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input email!' })
        return false
      } else if (!this.$validateEmail(this.login.email)) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input valid email!' })
        return false
      } else if (!this.login.password) {
        this.$store.commit('SNACKBAR', { show: true, text: 'Please input password!' })
        return false
      }
      this.loadingFull = true
      this.$store.dispatch('LOGIN', this.login)
        .then((res) => {
          if (res.status) {
            if (res.data.data.response) {
              this.$store.commit('SNACKBAR', { show: true, text: 'Logged In!' })
              this.$emit('close', true)
              this.login.email = ''
              this.login.password = ''
            } else {
              this.$store.commit('SNACKBAR', { show: true, text: res.data.data.message })
            }
          } else {
            this.$store.commit('SNACKBAR', { show: true, text: 'Something went wrong!' })
          }
          setTimeout(() => {
            this.loadingFull = false
          }, 300)
        })
    }
  }
}
</script>

<style lang="scss">
.onboarding-page {
  position: relative;
  background: #fff;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  .v-tabs {
    position: fixed;
    top: -72px;
  }
  .v-tabs-items {
    height: 100%;
    .v-window__container {
      height: 100vh!important;
      >.v-window-item {
        height: 100vh!important;
        width: 100vw!important;
        display: flex;
        align-items: center;
        .v-card {
          width: 100%;
        }
      }
    }
  }
  .login-page {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
.onboarding-fixed-overlay {
  position: absolute;
  top: 0px;
  left: 0px;
  pointer-events: none;
  z-index: 100;
  width: 100%;
  height: 100%;
  padding: 50px 0px 20px 0px;
}
</style>
