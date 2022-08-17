import Cookies from 'js-cookie'
const state = () => {
  return {
    getList: {
      url: '/policyProblem',
      method: 'GET',
    },
    add: {
      url: '/policyProblem/save',
      method: 'POST',
    },
    update: {
      url: '/policyProblem/save',
      method: 'POST',
    },
    delete: {
      url: '/policyProblem/delete',
      method: 'GET',
    },
  }
}
const mutations = {}
const actions = {
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
  getProblem(vueContext, data) {
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
