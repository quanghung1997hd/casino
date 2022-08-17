// import { values } from 'core-js/core/dict'

const state = () => {
  return {
    listCarouselImg: [
      // { url: '/background/banner_1.jpg' },
      // { url: '/background/banner_2.jpg' },
      //  { url:'/background/banner3.png',}
    ],
  }
}

const actions = {}
const mutations = {
  setBanner(state, payload) {
    state.listCarouselImg = payload
  },
}
export default {
  state,
  actions,
  mutations,
}
