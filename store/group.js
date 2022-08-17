import Cookies from 'js-cookie'

const state = () => {
  return {
    getListGroup: {
      url: '/problemGroup',
      method: 'GET',
    },
    add: {
      url: '/problemGroup/add',
      method: 'POST',
    },
    update: {
      url: '/problemGroup/update',
      method: 'POST',
    },
    delete: {
      url: '/problemGroup/delete',
      method: 'GET',
    },
    detail: {
      url: '/problemGroup/detail',
      method: 'GET',
    },
  }
}
const mutations = {}
const actions = {
  getDetail(vueContext, data) {
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
  getDelete(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.delete.url,
      method: vueContext.state.delete.method,
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
  getGroup(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getListGroup.url,
      method: vueContext.state.getListGroup.method,
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
  postAdd(vueContext, data) {
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
}
export default {
  state,
  mutations,
  actions,
}
