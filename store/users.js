import APIs from '~/assets/configurations/API_Config'
import Cookies from 'js-cookie'
import uniqid from 'uniqid'

const state = () => ({
  groups: [],
  list: {
    url: 'user/list',
    method: 'GET',
  },
  pass_reset: {
    url: 'user/resetPass',
    method: 'GET',
  },
  delete_user: {
    url: 'user/delete',
    method: 'GET',
  },
  add_user: {
    url: 'user/add',
    method: 'POST',
  },

  utility: {
    group: {
      url: 'user/group/list',
      method: 'GET',
    },
    groupsOfSystem: {
      url: 'user/group/ofSystem',
      method: 'GET',
    },
  },
  userListUnconfirmed: {
    url: '/user/list/unconfirmed',
    method: 'GET',
  },
  addByManager: {
    url: '/user/addByManager',
    method: 'POST',
  },

  updateGroupForAccount: {
    url: '/user/updateGroupForAccount',
    method: 'POST',
  },
  ResetPassword: {
    url: '/user/resetPass',
    method: 'GET',
  },
  detail: {
    url: 'user/detail',
    method: 'GET',
  },
  items: [],
})

const getters = {}

const mutations = {
  setListItems(state, payload) {
    state.items = payload
  },
  updatePagingIndex(state, payload) {
    state.pageIndex = payload.pageIndex
    state.pageSize = payload.pageSize
  },
  setGroups(state, payload) {
    state.groups = []
    payload.forEach((it) => {
      state.groups.push({
        id: it.id,
        text: it.groupName,
      })
    })
  },
}

const actions = {

  async addByManager(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.addByManager.url,
      method: vueContext.state.addByManager.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return response
  },
  async userListUnconfirmed(vueContext, payload) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.userListUnconfirmed.url,
      method: vueContext.state.userListUnconfirmed.method,
      params: {
        channel: APIs.channel,
        transid,
        ...payload,
      },
    })
    return response
  },
  async get_list(vueContext, payload) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.list.url,
      method: vueContext.state.list.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        channel: APIs.channel,
        transid,
        ...payload,
      },
    })
    return response
  },
  async getListItems(vueContext, payload) {
    const respone = this.$axios({
      url: '/user/list',
      method: 'GET',

      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      params: {
        ...payload,
      },
    })
    return respone
  },

  async setGroups(vueContext) {
    try {
      let response = await this.$getListGroupUsers()
      let errorCode = response.data.error.code
      let data = response.data.data
      if (errorCode === APIs.responses.OK.code) {
        vueContext.commit('setGroups', data)
      } else if (APIs.responses[errorCode] != undefined) {
        this.$showError(this.$router.app, APIs.responses[errorCode].message)
      } else {
        let errorMsg = response.data.error.message
        this.$showError(
          this.$router.app,
          'Đã xảy ra lỗi khi lấy danh sách nhóm người dùng. ' + errorMsg
        )
      }
    } catch (errors) {}
  },
  async deleted_user(vueContext, payload) {
    let currentUser = Cookies.get('username')
    if (currentUser === payload.user_name) {
      this.$showError(
        this.$router.app,
        'Không cho phép xóa chính tài khoản đang đăng nhập.'
      )
      return
    }

    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.delete_user.url,
      method: vueContext.state.delete_user.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        userId: payload.id,
      },
    })
    return response
  },

  async reset_pass(vueContext, userId) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.pass_reset.url,
      method: vueContext.state.pass_reset.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        channel: APIs.channel,
        transid,
        userId,
      },
    })
    return response
  },

  async ResetPassword(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.ResetPassword.url,
      method: vueContext.state.ResetPassword.method,
      baseURL: URL.BASE,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      params: {
        ...payload,
      },
    })
    return response
  },

  async add(vueContext, payload) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.add_user.url,
      method: vueContext.state.add_user.method,

      data: {
        channel: APIs.channel,
        transid,
        ...payload,
      },
    })
    return response
  },

  async get_detail(vueContext, userId) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.detail.url,
      method: vueContext.state.detail.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        channel: APIs.channel,
        transid,
        ...userId,
      },
    })
    return response
  },

  async updateGroupForAccount(vueContext, payload) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.updateGroupForAccount.url,
      method: vueContext.state.updateGroupForAccount.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        channel: APIs.channel,
        transid,
        ...payload,
      },
    })
    return response
  },

  async list_partner(vueContext) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.utility.partner.url,
      method: vueContext.state.utility.partner.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        channel: APIs.channel,
        transid,
        user_id: Cookies.get('userId'),
      },
    })
    return response
  },

  async list_group(vueContext) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.utility.group.url,
      method: vueContext.state.utility.group.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        channel: APIs.channel,
        transid,
      },
    })
    return response
  },

  async groupsOfSystem(vueContext) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.utility.groupsOfSystem.url,
      method: vueContext.state.utility.groupsOfSystem.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        channel: APIs.channel,
        transid,
      },
    })
    return response
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
