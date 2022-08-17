import Cookies from 'js-cookie'

const state = () => {
  return {
    getListTermOfUse: {
      url: '/termOfUse',
      method: 'GET',
    },
    termOfUseDetail: {
      url: '/termOfUse/detail',
      method: 'GET',
    },
    termOfUseUpdate: {
      url: '/termOfUse/update',
      method: 'POST',
    },
    termOfUseAdd: {
      url: '/termOfUse/add',
      method: 'POST',
    },
    style: null,
    title: null,
  }
}
const mutations = {
  setStyle(state, payload) {
    state.style = payload
  },
  setTitle(state, payload) {
    state.title = payload
  },
}
const actions = {
  termOfUseAdd(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.termOfUseAdd.url,
      method: vueContext.state.termOfUseAdd.method,
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
  termOfUseUpdate(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.termOfUseUpdate.url,
      method: vueContext.state.termOfUseUpdate.method,
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
  termOfUseDetail(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.termOfUseDetail.url,
      method: vueContext.state.termOfUseDetail.method,
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
  getListTermOfUse(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListTermOfUse.url,
      method: vueContext.state.getListTermOfUse.method,
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
}
export default {
  state,
  actions,
  mutations,
}
