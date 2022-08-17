import Cookies from 'js-cookie'
const state = () => {
  return {
    getList: {
      url: '/order/list',
      method: 'GET',
    },
    add: {
      url: '/order/add',
      method: 'POST',
    },
    upload: {
      url: '/order/uploadImage',
      method: 'POST',
    },
    listTypeSms: {
      url: '/typeSms/selectData',
      method: 'GET',
    },
    dataSelectOfDiscount: {
      url: 'discount/dataSelectOfDiscountActivity',
      method: 'GET',
    },
    approve: {
      url: '/order/approve',
      method: 'POST',
    },
    detail: {
      url: '/order/detail',
      method: 'GET',
    },

    // khách hàng
    orderListCustomer: {
      url: '/order/listCustomer',
      method: 'GET',
    },
    detailOrderCustomer: {
      url: '/order/detailOrderCustomer',
      method: 'GET',
    },
    orderAddCustomer: {
      url: '/order/addCustomer',
      method: 'POST',
    },
    orderCancelOrder: {
      url: '/order/cancelOrder',
      method: 'GET',
    },
  }
}
const mutations = {}
const actions = {
  async orderListCustomer(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.orderListCustomer.url,
      method: vueContext.state.orderListCustomer.method,
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
  async detailOrderCustomer(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.detailOrderCustomer.url,
      method: vueContext.state.detailOrderCustomer.method,
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

  async orderAddCustomer(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.orderAddCustomer.url,
      method: vueContext.state.orderAddCustomer.method,
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

  async orderCancelOrder(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.orderCancelOrder.url,
      method: vueContext.state.orderCancelOrder.method,
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

  detail(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.detail.url,
      method: vueContext.state.detail.method,
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
  listTypeSms(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.listTypeSms.url,
      method: vueContext.state.listTypeSms.method,
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

  dataSelectOfDiscount(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.dataSelectOfDiscount.url,
      method: vueContext.state.dataSelectOfDiscount.method,
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
  getList(vueContext, data) {
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
  add(vueContext, data) {
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
  async upload(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.upload.url,
      method: vueContext.state.upload.method,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      params: {},
      data: data.formData,
    })
    return respone
  },

  approve(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.approve.url,
      method: vueContext.state.approve.method,
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
