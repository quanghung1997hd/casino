import Cookies from 'js-cookie'

const state = () => {
  return {
    getListTransaction: {
      url: '/transaction/list',
      method: 'GET',
    },

  }
}
const actions = {
  getListTransaction(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListTransaction.url,
      method: vueContext.state.getListTransaction.method,
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
}
export default {
  state,
  actions,
}
