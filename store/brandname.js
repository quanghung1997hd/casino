import Cookies from 'js-cookie'

const state = () => {
  return {
    // nội bô
    getListBrandname: {
      url: '/brandname/list',
      method: 'GET',
    },
    // list khách hàng
    getListCustomers: {
      url: '/customer/list',
      method: 'GET',
    },
    detail: {
      url: '/brandname/detail',
      method: 'GET',
    },
    addBrandname: {
      url: '/brandname/add',
      method: 'POST',
    },
    deleteItem: {
      url: '/brandname/delete',
      method: 'GET',
    },
    approveItem: {
      url: '/brandname/accept',
      method: 'POST',
    },
    acceptBrandnameCustomer: {
      url: '/brandname/acceptBrandnameCustomer',
      method: 'POST',
    },
    // khách hàng
    getList: {
      url: '/brandname/listBrandName',
      method: 'GET',
    },
    // danh sách tin nhắn
    listTypeSms: {
      url: '/typeSms/selectData',
      method: 'GET',
    },
    listNetworkActive: {
      url: '/network/selectNetworkActive',
      method: 'GET',
    },
    dataSelectAllOfCustomer: {
      // data select tất cả brandname (kể cả innactive)
      url: '/brandname/dataSelectAllOfCustomer',
      method: 'GET',
    },
    checkValidBrandname: {
      url: '/brandname/checkValidBrandname',
      method: 'POST',
    },
  }
}
const actions = {
  async checkValidBrandname(vueContext, payload) {
    const respone = await this.$axios({
      url: vueContext.state.checkValidBrandname.url,
      method: vueContext.state.checkValidBrandname.method,

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
  async listNetwork(vueContext, payload) {
    const respone = await this.$axios({
      url: vueContext.state.listNetwork.url,
      method: vueContext.state.listNetwork.method,

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
  async listNetworkActive(vueContext, payload) {
    const respone = await this.$axios({
      url: vueContext.state.listNetworkActive.url,
      method: vueContext.state.listNetworkActive.method,

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

  async listTypeSms(vueContext, payload) {
    const respone = await this.$axios({
      url: vueContext.state.listTypeSms.url,
      method: vueContext.state.listTypeSms.method,

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
  getList(vueContext, payload) {
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
        ...payload,
      },
    })
    return respone
  },
  getListBrandname(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListBrandname.url,
      method: vueContext.state.getListBrandname.method,

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
  detail(vueContext, payload) {
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
        ...payload,
      },
    })
    return respone
  },
  getListCustomers(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListCustomers.url,
      method: vueContext.state.getListCustomers.method,

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
  addBrandname(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addBrandname.url,
      method: vueContext.state.addBrandname.method,

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
  approveItem(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.approveItem.url,
      method: vueContext.state.approveItem.method,

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
  acceptBrandnameCustomer(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.acceptBrandnameCustomer.url,
      method: vueContext.state.acceptBrandnameCustomer.method,

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
  async dataSelectAllOfCustomer(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.dataSelectAllOfCustomer.url,
      method: vueContext.state.dataSelectAllOfCustomer.method,

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
}
export default {
  state,
  actions,
}
