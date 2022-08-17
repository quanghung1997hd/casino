const state = () => {
  return {
    idNotifi: null,
    idBo: null,
    idPhong: null,
    idSchedule: null,
    idDepartment: null,
    url: null,
    idGroup: null,
    items: [
      // {
      //   text: 'Đơn vị phòng ban',
      //   disabled: false,
      //   id:0
      // },
    ],
    contentFillter: null,
    path: null,
  }
}
const mutations = {
  setPath(state, payload) {
    state.path = payload
  },
  setContentFillter(state, payload) {
    state.contentFillter = payload
  },
  setBreadcrumbs(state, payload) {
    state.items = payload
  },
  setURL(state, payload) {
    state.url = payload
  },
  setIdDepartment(state, payload) {
    state.idDepartment = payload
  },
  setIdSchedule(state, payload) {
    state.idSchedule = payload
  },
  setIdNotifi(state, payload) {
    state.idNotifi = payload
  },
  setIdEditBo(state, payload) {
    state.idBo = payload
  },
  setIDPhong(state, payload) {
    state.idPhong = payload
  },
  setIDGroup(state, payload) {
    state.idGroup = payload
  },
}

export default {
  state,
  mutations,
}
