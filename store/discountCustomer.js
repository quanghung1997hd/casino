import Cookies from 'js-cookie'

const state = () => {
  return {
    getListDiscountCustomer: {
      url: '/discount/list',
      method: 'GET',
    },
    // list khách hàng
    getListCustomers: {
      url: '/customer/list',
      method: 'GET',
    },
    addDiscountCustomer: {
      url: '/discount/add',
      method: 'POST',
    },
    deleteItem: {
      url: '/discount/delete',
      method: 'GET',
    },
    update: {
      url: '/discount/update',
      method: 'POST',
    },
  }
}
const actions = {
  getListDiscountCustomer(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListDiscountCustomer.url,
      method: vueContext.state.getListDiscountCustomer.method,
      baseURL: URL.BASE,
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

  getListCustomers(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListCustomers.url,
      method: vueContext.state.getListCustomers.method,
      baseURL: URL.BASE,
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
  addDiscountCustomer(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addDiscountCustomer.url,
      method: vueContext.state.addDiscountCustomer.method,
      baseURL: URL.BASE,
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
    return respone
  },

  deleteItem(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.deleteItem.url,
      method: vueContext.state.deleteItem.method,
      baseURL: URL.BASE,
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
  update(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.update.url,
      method: vueContext.state.update.method,
      baseURL: URL.BASE,
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
    return respone
  },
}
export default {
  state,
  actions,
}
