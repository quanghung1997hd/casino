import Cookies from 'js-cookie'

const state = () => {
  return {
    getListProcess: {
      url: '/threadInfo/list',
      method: 'GET',
    },
  }
}
const actions = {
  getListProcess(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getListProcess.url,
      method: vueContext.state.getListProcess.method,
      baseURL: URL.BASE,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return respone
  },
}
export default {
  state,
  actions,
}
