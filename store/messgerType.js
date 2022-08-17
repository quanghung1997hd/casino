import Cookies from 'js-cookie'

const state = () => {
  return {
    getListMessType: {
      url: '/typeSms/list',
      method: 'GET',
    },
    AddMessType: {
      url: '/typeSms/add',
      method: 'POST',
    },
    EditMessType: {
      url: '/typeSms/edit',
      method: 'POST',
    },
    detail: {
      url: '/typeSms/detail',
      method: 'GET',
    },
  }
}
const actions = {
  getListMessType(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListMessType.url,
      method: vueContext.state.getListMessType.method,
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

  AddMessType(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.AddMessType.url,
      method: vueContext.state.AddMessType.method,
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

  EditMessType(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.EditMessType.url,
      method: vueContext.state.EditMessType.method,
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
