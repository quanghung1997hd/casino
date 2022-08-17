import Cookies from 'js-cookie'

const state = () => {
  return {
    getListUnit: {
      url: '/unit',
      method: 'GET',
    },
    update: {
      url: '/unit/update/orderNo',
      method: 'POST',
    },
    listPersonnel: {
      url: '/unit/employee',
      method: 'GET',
    },
    updPersonnel: {
      url: '/unit/employee/requestAnswer',
      method: 'POST',
    },
  }
}
const mutations = {}
const actions = {
  postPersonnel(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.updPersonnel.url,
      method: vueContext.state.updPersonnel.method,
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
  Personnel(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.listPersonnel.url,
      method: vueContext.state.listPersonnel.method,
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
  postUpdate(vueContext, data) {
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
  getListUnit(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getListUnit.url,
      method: vueContext.state.getListUnit.method,
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
}
export default {
  state,
  mutations,
  actions,
}
