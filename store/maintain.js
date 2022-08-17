import Cookies from 'js-cookie'
const state = () => {
  return {
    getList: {
      url: '/declareBrandname/list',
      method: 'GET',
    },
    add: {
      url: '/declareBrandname/add',
      method: 'POST',
    },
    update: {
      url: '/declareBrandname/update',
      method: 'POST',
    },
    detail: {
      url: '/declareBrandname/detail',
      method: 'GET',
    },
    // danh sách nhà mạng

    networkSelect: {
      url: '/network/selectNetworkActive',
      method: 'GET',
    },
  }
}
const mutations = {}
const actions = {
  networkSelect(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.networkSelect.url,
      method: vueContext.state.networkSelect.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      params: {
        ...data,
      },
    })
    return respone
  },
  detail(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.detail.url,
      method: vueContext.state.detail.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      params: {
        ...data,
      },
    })
    return respone
  },
  getList(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getList.url,
      method: vueContext.state.getList.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      params: {
        ...data,
      },
    })
    return respone
  },
  add(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.add.url,
      method: vueContext.state.add.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: {
        ...data,
      },
    })
    return respone
  },

  update(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.update.url,
      method: vueContext.state.update.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: {
        ...data,
      },
    })
    return respone
  },
}
export default {
  state,
  mutations,
  actions,
}
