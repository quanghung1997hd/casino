import Cookies from 'js-cookie'
const state = () => {
  return {
    getList: {
      url: '/requestObjectType',
      method: 'GET',
    },
    add: {
      url: '/requestObjectType/add',
      method: 'POST',
    },
    update: {
      url: '/requestObjectType/update',
      method: 'POST',
    },
    delete: {
      url: '/requestObjectType/delete',
      method: 'GET',
    },
    detail: {
      url: '/requestObjectType/detail',
      method: 'GET',
    },
    group: {
      url: '/requestObjectType/groups',
      method: 'GET',
    },
  }
}
const mutations = {}
const actions = {
  getGroup(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.group.url,
      method: vueContext.state.group.method,
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
  getdelete(vueContext, data) {
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
  getObjType(vueContext, data) {
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
}
export default {
  state,
  mutations,
  actions,
}
