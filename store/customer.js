import Cookies from 'js-cookie'
const state = () => {
  return {
    getListCustomer: {
      url: '/customer/list',
      method: 'GET',
    },
    add: {
      url: '/customer/add',
      method: 'POST',
    },
    update: {
      url: '/customer/edit',
      method: 'POST',
    },
    checkAddUpdate: {
      url: '/customer/checkAddEdit',
      method: 'POST',
    },
    delete: {
      url: '/customer/delete',
      method: 'GET',
    },
    detail: {
      url: '/customer/detail',
      method: 'GET',
    },
    detailInfo: {
      url: '/customer/infoThisCustomer',
      method: 'GET',
    },
    accept: {
      url: '/customer/accept',
      method: 'POST',
    },
    lock: {
      url: '/customer/lock',
      method: 'POST',
    },
    //danh sách lịch sử
    listHistory: {
      url: '/actionHistory/listHistory',
      method: 'GET',
    },
    CommentCus: {
      url: '/actionHistory/comment',
      method: 'POST',
    },
    ResetPassword: {
      url: '/customer/resetPassword',
      method: 'GET',
    },
    // updload ảnh
    uploadImage: {
      url: '/customer/uploadImage',
      method: 'POST',
    },
    customerPrepayActiveSelectOptions: {
      url: '/customer/customerPrepayActiveSelectOptions',
      method: 'GET',
    },
    customerPrepayActiveSelectOptionsAll: {
      url: '/customer/customerPrepayActiveSelectOptionsAll',
      method: 'GET',
    },
  }
}
const actions = {
  async uploadImage(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.uploadImage.url,
      method: vueContext.state.uploadImage.method,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: data.formData,
    })
    return respone
  },
  getListCustomer(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.getListCustomer.url,
      method: vueContext.state.getListCustomer.method,
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
    return response
  },

  add(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.add.url,
      method: vueContext.state.add.method,
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
    return response
  },
  update(vueContext, payload) {
    const response = this.$axios({
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
    return response
  },

  checkAddUpdate(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.checkAddUpdate.url,
      method: vueContext.state.checkAddUpdate.method,
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
    return response
  },

  delete(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.delete.url,
      method: vueContext.state.delete.method,
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
    return response
  },

  detail(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.detail.url,
      method: vueContext.state.detail.method,
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
    return response
  },

  detailInfo(vueContext) {
    const response = this.$axios({
      url: vueContext.state.detailInfo.url,
      method: vueContext.state.detailInfo.method,
      baseURL: URL.BASE,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
    })
    return response
  },

  accept(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.accept.url,
      method: vueContext.state.accept.method,
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
    return response
  },

  lock(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.lock.url,
      method: vueContext.state.lock.method,
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
    return response
  },

  listHistory(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.listHistory.url,
      method: vueContext.state.listHistory.method,
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
    return response
  },

  CommentCus(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.CommentCus.url,
      method: vueContext.state.CommentCus.method,
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
    return response
  },

  ResetPassword(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.ResetPassword.url,
      method: vueContext.state.ResetPassword.method,
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
    return response
  },
  customerPrepayActiveSelectOptions(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.customerPrepayActiveSelectOptions.url,
      method: vueContext.state.customerPrepayActiveSelectOptions.method,
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
    return response
  },
  customerPrepayActiveSelectOptionsAll(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.customerPrepayActiveSelectOptionsAll.url,
      method: vueContext.state.customerPrepayActiveSelectOptionsAll.method,
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
    return response
  },
}

export default {
  state,
  actions,
}
