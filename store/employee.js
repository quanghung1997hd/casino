import Cookies from 'js-cookie'

const state = () => {
  return {
    employeeDetail: {
      url: '/employee/detail',
      method: 'GET',
    },
    employeeChangePass: {
      url: '/employee/changePass',
      method: 'POST',
    },
  }
}
const actions = {
  employeeChangePass(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.employeeChangePass.url,
      method: vueContext.state.employeeChangePass.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: {
        ...payload,
      },
    })
    return response
  },
  getEmployeeDetail(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.employeeDetail.url,
      method: vueContext.state.employeeDetail.method,
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
}
