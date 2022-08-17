import Cookies from 'js-cookie'

const state = () => {
  return {
    getCity: {
      url: '/address/dataCity',
      method: 'GET',
    },
    getDistricts: {
      url: '/address/dataDistricts',
      method: 'GET',
    },
    getWards: {
      url: '/address/dataWards',
      method: 'GET',
    },
  }
}
const actions = {
  getCity(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getCity.url,
      method: vueContext.state.getCity.method,
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

  getDistricts(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getDistricts.url,
      method: vueContext.state.getDistricts.method,
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

  getWards(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getWards.url,
      method: vueContext.state.getWards.method,
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
