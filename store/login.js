import Cookies from 'js-cookie'
import APIs from '~/assets/configurations/API_Config'

export const state = () => ({
  username: {
    errors: [],
    value: '',
  },
  password: {
    errors: [],
    value: '',
  },
  clientId: null,
  path: null,
  isLogin: false,
  logging: false,
})

export const mutations = {
  setClientId(state, payload) {
    state.clientId = payload
  },
  setUsername(state, payload) {
    state.username = {
      ...state.username,
      value: payload,
      errors: [],
    }
  },
  setPath(state, payload) {
    state.path = payload
  },
  setLogging(state, payload) {
    state.logging == payload
  },
  unsetItem(state) {
    state.username.value = ''
    state.password.value = ''
  },
  setPassword(state, payload) {
    state.password = {
      ...state.password,
      value: payload,
      errors: [],
    }
  },
  usernameHasErrors(state, payload) {
    state.username = {
      ...state.username,
      errors: [payload],
    }
  },
  passwordHasErrors(state, payload) {
    state.password = {
      ...state.password,
      errors: [payload],
    }
  },
  setIsLogin(state, payload) {
    state.isLogin = payload
  },
  clearErrors(state, payload) {
    state.username = {
      ...state.username,
      errors: [],
    }
    state.password = {
      ...state.password,
      errors: [],
    }
  },
}

export const actions = {
  isAuthenticated(vueContext, req) {
    if (req) {
      let token
      try {
        token = req.headers.cookie
          .split(';')
          .find((c) => c.trim().startsWith('token='))
          .split('=')[1]
      } catch (e) {
        token = ''
      }
      return token
    } else {
      const token =
        Cookies.get('token') !== undefined ? Cookies.get('token') : ''
      return token
    }
  },

  setUsername(vueContext, payload) {
    vueContext.commit('setUsername', payload)
  },

  setPassword(vueContext, payload) {
    vueContext.commit('setPassword', payload)
  },

  Submit(vueContext, payload) {
    const userName = vueContext.state.username.value
    const password = vueContext.state.password.value
    const clientId = vueContext.state.clientId
    if (userName.indexOf(' ') >= 0) {
      vueContext.commit('usernameHasErrors', 'Tên người dùng không hợp lệ.')
      vueContext.commit('setLogging', false)
      return
    }
    if (this.$isNullOrEmpty(userName)) {
      vueContext.commit('usernameHasErrors', 'Tên người dùng không hợp lệ.')
      vueContext.commit('setLogging', false)
      return
    }
    if (this.$isNullOrEmpty(password)) {
      vueContext.commit(
        'passwordHasErrors',
        'Tài khoản người dùng hoặc mật khẩu không hợp lệ'
      )
      vueContext.commit('setLogging', false)
      return
    }
    vueContext.commit('clearErrors')
    this.$login({
      userName,
      password,
      clientId,
    })
      .then((response) => {
        let errorCode = response.data.error.code
        let data = response.data.data

        if (errorCode === APIs.responses.OK.code) {
          vueContext.commit('setIsLogin', true)
          Cookies.set('token', data.token)
          Cookies.set('username', data.user.userName)
          Cookies.set('customerId', data.user.customerId)
          Cookies.set('userId', data.user.id)
          // Cookies.set('employeeID', data.user.employeeId)
          if (!this.$isNullOrEmpty(data.user.fullName)) {
            Cookies.set('fullname', data.user.fullName)
          } else {
            Cookies.set('fullname', '')
          }

          let listGroups = []
          for (let i = 0; i < response.data.data.groups.length; i++) {
            listGroups.push(response.data.data.groups[i].groupName)
          }
          let strGroup = ',' + listGroups.toString() + ','
          Cookies.set('strListGroup', strGroup)

          if (data.token !== null) {
            vueContext.commit('unsetItem')
            this.$router.push('/')
          }
        } else if (
          errorCode === APIs.login.responses.CREDENTIALS_INVALID.code
        ) {
          // Wrong credentials
          vueContext.commit(
            'usernameHasErrors',
            'Tài khoản người dùng hoặc mật khẩu không hợp lệ'
          )
          vueContext.commit(
            'passwordHasErrors',
            'Tài khoản người dùng hoặc mật khẩu không hợp lệ'
          )
        }
        vueContext.commit('setLogging', false)
      })
      .catch((errors) => {
        vueContext.commit('setLogging', false)
      })
  },
}

export const getters = {}
