import Cookies from 'js-cookie'

const state = () => {
  return {
    APIs: {
      commonRequestType: {
        url: '/common/requestType',
        method: 'GET',
      },

      commonpolicyProblem: {
        url: '/common/policyProblem',
        method: 'GET',
      },

      //Danh sách kỳ họp
      commonPeriod: {
        url: '/common/period',
        method: 'GET',
      },

      //Danh sách Khóa
      commonSession: {
        url: '/common/session',
        method: 'GET',
      },
      commonFieldTheme: {
        url: '/common/fieldTheme',
        method: 'GET',
      },
    },
    stateCommon: {
      requestUnit: [],
      listPeriod: [],
      // listPolicyProblem: [],
      // listProblemGroup: [],
      listRequestObjectType: [],
      listSession: [],
      itemObjectType: [
        {
          text: 'Đại biểu quốc hội',
          value: 1,
        },
        {
          text: 'Cử tri tỉnh/thành phố',
          value: 2,
        },
        {
          text: 'Sở TTTT',
          value: 3,
        },
        {
          text: 'Đối tượng quản lý',
          value: 4,
        },
      ],
      listPolicyProblem: [],
      listHotProblem: [],
      listField: [],
      listLeader: [],
      listProblemGroup: [],
      listRequestType: [],
      listUnit: [],
      listApprovalStatus: [
        {
          text: 'Chờ duyệt',
          value: 'PENDING',
        },
        {
          value: 'APPROVED',
          text: 'Đã duyệt',
        },
      ],
      listChangeStatus: [
        {
          text: 'Không thay đổi',
          value: 'NON_CHANGE',
        },
        // NON_CHANGE,
        {
          value: 'CHANGED',
          text: 'Đã thay đổi',
        },
      ],
      listReplyStatus: [
        {
          text: 'Chưa trả lời',
          value: 'UN_REPLY',
        },
        // NON_CHANGE,
        {
          value: 'REPLIED',
          text: 'Đã trả lời',
        },
      ],
    },
  }
}
const mutations = {
  setRequestUnit(state, payload) {
    state.stateCommon.requestUnit = payload
  },
  setlistPolicyProblem(state, payload) {
    state.stateCommon.listPolicyProblem = payload
  },
  setlistHotProblem(state, payload) {
    state.stateCommon.listHotProblem = payload
  },
  setlistField(state, payload) {
    state.stateCommon.listField = payload
  },
  setlistLeader(state, payload) {
    state.stateCommon.listLeader = payload
  },
  setlistProblemGroup(state, payload) {
    state.stateCommon.listProblemGroup = payload
  },
  setlistRequestType(state, payload) {
    state.stateCommon.listRequestType = payload
  },
  setlistUnit(state, payload) {
    state.stateCommon.listUnit = payload
  },
  setItemObjectType(state, payload) {
    state.stateCommon.itemObjectType = payload
  },
}
const actions = {
  commonFieldTheme(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.APIs.commonFieldTheme.url,
      method: vueContext.state.APIs.commonFieldTheme.method,
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
    return response
  },
  commonSession(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.APIs.commonSession.url,
      method: vueContext.state.APIs.commonSession.method,
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
    return response
  },
  commonRequestObjectType(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.APIs.commonRequestObjectType.url,
      method: vueContext.state.APIs.commonRequestObjectType.method,
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
    return response
  },

  // commonPolicyProblem(vueContext, payload) {
  //   const response = this.$axios({
  //     url: vueContext.state.APIs.commonPolicyProblem.url,
  //     method: vueContext.state.APIs.commonPolicyProblem.method,
  //     headers: {
  //       Authorization:
  //         Cookies.get('token') != (null || undefined)
  //           ? `Bearer ${Cookies.get('token')}`
  //           : '',
  //     },
  //     params: {
  //       ...payload,
  //     },
  //   })
  //   return response
  // },
  commonPeriod(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.APIs.commonPeriod.url,
      method: vueContext.state.APIs.commonPeriod.method,
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
    return response
  },
  commonpolicyProblem(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.APIs.commonpolicyProblem.url,
      method: vueContext.state.APIs.commonpolicyProblem.method,
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
    return response
  },

  commonField(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.APIs.commonField.url,
      method: vueContext.state.APIs.commonField.method,
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
    return response
  },

  commonRequestType(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.APIs.commonRequestType.url,
      method: vueContext.state.APIs.commonRequestType.method,
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
    return response
  },
}

export default {
  state,
  actions,
  mutations,
}
