import Cookies from 'js-cookie'

const state = () => {
  return {
    getListNetWork: {
      url: '/network/list',
      method: 'GET',
    },
    AddNetWork: {
      url: '/network/add',
      method: 'POST',
    },
    EditNetWork: {
      url: '/network/update',
      method: 'POST',
    },
    detail: {
      url: '/network/detail',
      method: 'GET',
    },
  }
}
const actions = {
  getListNetWork(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListNetWork.url,
      method: vueContext.state.getListNetWork.method,
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
    return respone
  },

  AddNetWork(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.AddNetWork.url,
      method: vueContext.state.AddNetWork.method,
      baseURL: URL.BASE,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: {
        ...payload,
      },
    })
    return respone
  },

  detail(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.detail.url,
      method: vueContext.state.detail.method,
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
    return respone
  },

  EditNetWork(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.EditNetWork.url,
      method: vueContext.state.EditNetWork.method,
      baseURL: URL.BASE,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
}
export default {
  state,
  actions,
}
