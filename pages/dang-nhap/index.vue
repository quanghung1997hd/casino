<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-card-text class>
          <v-row justify="center">
            <v-img
              src="/logo/chip.png"
              contain
              max-width="250"
              max-height="250"
            ></v-img>
          </v-row>
          <v-divider class="mb-8 mt-6"></v-divider>
          <form @submit.prevent="submit">
            <v-text-field
              prepend-icon="mdi-account"
              outlined
              v-model="username"
              :error-messages="$store.state.login.username.errors"
              label="Tên đăng nhập *"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Mật khẩu *"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              name="password"
              v-model="password"
              prepend-icon="mdi-lock"
              :type="showPass ? 'text' : 'password'"
              :error-messages="$store.state.login.password.errors"
              outlined
              @click:append="showPass = !showPass"
            ></v-text-field>
            <div class="d-flex">
              <div id="captchaInput"></div>
              <div id="resetCapcha">
                <v-btn icon @click="setupCaptcha"
                  ><v-icon dark> mdi-sync </v-icon></v-btn
                >
              </div>
            </div>
            <v-text-field
              label="Mã Captcha *"
              v-model="captchaInput"
              outlined
              :error-messages="captchaErrors"
            ></v-text-field>
            <div class="d-flex justify-center">
              <v-btn
                v-ripple
                color="primary"
                type="submit"
                block
                :loading="loaddingLogin"
                >Đăng nhập</v-btn
              >
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'index',
  layout: 'login',
  transition(to, from) {
    if (!from) {
      return 'slide-x-transition'
    }
    return 'slide-x-reverse-transition'
  },

  data: () => ({
    logging: false,
    showPass: false,
    loaddingLogin: false,
    captchaCode: '',
    captchaInput: '',
    captchaErrors: [],
  }),
  mounted() {
    this.setupCaptcha()
    this.showMessage()
  },

  methods: {
    showMessage() {
      if(this.$store.state.login.isLogin) {
        this.$showWarnNotify(
          this,
          "Phiên làm việc đã hết hạn"
        )
      }
    },
    submit() {
      if (this.captchaInput !== this.captchaCode) {
        this.captchaErrors = ['Mã Captcha không đúng!']
        return
      } else {
        this.captchaErrors = []
      }
      this.loaddingLogin = true
      setTimeout(() => {
        this.loaddingLogin = false
        this.$store.dispatch('login/Submit', this.$store.state.app.ip)
      }, 1000)
    },
    setupCaptcha() {
      var arrayCaptchaCode = this.$createCaptcha()
      var strCaptchaCode = ''
      arrayCaptchaCode.forEach((char) => {
        if (char != null) {
          strCaptchaCode += char
        }
      })
      this.captchaCode = strCaptchaCode
    },
  },

  computed: {
    username: {
      get() {
        return this.$store.state.login.username.value
      },
      set(value) {
        this.$store.dispatch('login/setUsername', value).then
      },
    },
    password: {
      get() {
        return this.$store.state.login.password.value
      },
      set(value) {
        this.$store.dispatch('login/setPassword', value)
      },
    },
  },
}
</script>
