import Cookies from 'js-cookie'

const state = () => {
  return {
    getListDepartment: {
      url: '/common/department',
      method: 'GET',
    },
    getListSectorGroup: {
      url: '/common/sectorGroup',
      method: 'GET',
    },
    getListScheme: {
      url: '/common/scheme',
      method: 'GET',
    },
    getListZone: {
      url: '/common/zone',
      method: 'GET',
    },
    getListStaff: {
      url: '/common/staff',
      method: 'GET',
    },
    getListProvince: {
      url: '/common/province',
      method: 'GET',
    },
    //
    getListClothes: {
      url: '/common/clothes',
      method: 'GET',
    },
    // device
    getListDevice: {
      url: '/common/device',
      method: 'GET',
    },
    getListMeetingRoom: {
      url: '/common/meetingRoom',
      method: 'GET',
    },
    // //common/weekOfYear
    getWeekOfYear: {
      url: '/common/weekOfYear',
      method: 'GET',
    },
    // /common/costumesObject
    getCostumesObject: {
      url: '/common/costumesObject',
      method: 'GET',
    },
    //
    getPositionTitles: {
      url: '/common/positionTitles',
      method: 'GET',
    },
    getPosition: {
      url: '/common/position',
      method: 'GET',
    },
    getEmployee: {
      url: '/employee',
      method: 'GET',
    },
    getStaticContent: {
      url: '/common/staticContent',
      method: 'GET',
    },
    // get slogan
    getSlogan: {
      url: '/common/goodSaying',
      method: 'GET',
    },
    departmentRoom: {
      url: '/common/departmentV2',
      method: 'GET',
    },
    missionType: {
      url: '/common/missionType',
      method: 'GET',
    },
    commonUser: {
      url: '/common/user',
      method: 'GET',
    },
    author: null,
    slogan: null,
    listVanPhongBo: [],
  }
}
const mutations = {
  setListVanPhongBo(state, payload) {
    state.listVanPhongBo = payload
  },
  setSologan(state, payload) {
    state.slogan = payload.slogan
    state.author = payload.author
  },
}
const actions = {
  commonUser(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.commonUser.url,
      method: vueContext.state.commonUser.method,
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
  missionType(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.missionType.url,
      method: vueContext.state.missionType.method,
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
  departmentRoom(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.departmentRoom.url,
      method: vueContext.state.departmentRoom.method,
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
  setSologan(vueContext, payload) {
    vueContext.commit('setSologan', payload)
  },
  getSlogan(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getSlogan.url,
      method: vueContext.state.getSlogan.method,
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
  getStaticContent(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getStaticContent.url,
      method: vueContext.state.getStaticContent.method,
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
  setListVanPhongBo(vueContext, payload) {
    vueContext.commit('setListVanPhongBo', payload.pageRoles)
  },
  getCostumesObject(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getCostumesObject.url,
      method: vueContext.state.getCostumesObject.method,
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
  getWeekOfYear(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getWeekOfYear.url,
      method: vueContext.state.getWeekOfYear.method,
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
  // trang thiet bi
  getListDevice(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getListDevice.url,
      method: vueContext.state.getListDevice.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return respone
  },
  // danh sach trang phuc
  getListClothes(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getListClothes.url,
      method: vueContext.state.getListClothes.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return respone
  },
  // T???nh th??nh ph???
  getListProvince(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getListProvince.url,
      method: vueContext.state.getListProvince.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return respone
  },
  // Nh??n vi??n
  getListStaff(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListStaff.url,
      method: vueContext.state.getListStaff.method,
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
  // nh???n s???

  getEmployee(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getEmployee.url,
      method: vueContext.state.getEmployee.method,
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
  // Khu v???c
  getListZone(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getListZone.url,
      method: vueContext.state.getListZone.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return respone
  },
  // ????? ??n
  getListScheme(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListScheme.url,
      method: vueContext.state.getListScheme.method,
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
  // l??nh v???c
  getListSectorGroup(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getListSectorGroup.url,
      method: vueContext.state.getListSectorGroup.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return respone
  },
  //th??nh ph???n tham d??? + ????n v??? chu???n b???
  getListDepartment(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListDepartment.url,
      method: vueContext.state.getListDepartment.method,
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
  // ph??ng h???p
  getListMeetingRoom(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getListMeetingRoom.url,
      method: vueContext.state.getListMeetingRoom.method,
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
  // Ch???c v???
  getPositionTitles(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getPositionTitles.url,
      method: vueContext.state.getPositionTitles.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return respone
  },
  getPosition(vueContext) {
    const respone = this.$axios({
      url: vueContext.state.getPosition.url,
      method: vueContext.state.getPosition.method,
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
// const mutations = {}
export default {
  state,
  mutations,
  actions,
}
