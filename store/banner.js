import Cookies from 'js-cookie'

const state = () => {
  return {
    getListBanner: {
      url: '/banner',
      method: 'GET',
    },
    bannerDelete: {
      url: '/banner/delete',
      method: 'POST',
    },
    bannerSave: {
      url: '/banner/save',
      method: 'POST',
    },
    getListDefaultBanner: {
      url: '/common/banner',
      method: 'GET',
    },
  }
}
const actions = {
  getListDefaultBanner(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListDefaultBanner.url,
      method: vueContext.state.getListDefaultBanner.method,
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
  bannerSave(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.bannerSave.url,
      method: vueContext.state.bannerSave.method,
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
  getListBanner(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListBanner.url,
      method: vueContext.state.getListBanner.method,
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
  bannerDelete(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.bannerDelete.url,
      method: vueContext.state.bannerDelete.method,
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
