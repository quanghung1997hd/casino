import Cookies from 'js-cookie'

const state = () => {
  return {
    token: '',
  }
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
}
export default {
  state,
  mutations,
}
