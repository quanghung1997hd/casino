import Cookies from 'js-cookie'

const state = () => {
  return {
    // danh sách công nợ
    getList: {
      url: '/debt/list',
      method: 'GET',
    },
    detail: {
      url: '/debt/detail',
      method: 'GET',
    },
    // xác nhận
    paymentConfirmation: {
      url: '/debt/paymentConfirmation',
      method: 'POST',
    },
    // danh sách ngân hàng
    dataSelectOfBank: {
      url: '/debt/dataSelectOfBank',
      method: 'GET',
    },
  }
}
const actions = {
  dataSelectOfBank(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.dataSelectOfBank.url,
      method: vueContext.state.dataSelectOfBank.method,
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
  paymentConfirmation(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.paymentConfirmation.url,
      method: vueContext.state.paymentConfirmation.method,
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
  detail(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.detail.url,
      method: vueContext.state.detail.method,
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
  getList(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.getList.url,
      method: vueContext.state.getList.method,
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
