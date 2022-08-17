import Cookies from 'js-cookie'
const state = () => {
  return {
    getListCustomer: {
      url: '/customer/list',
      method: 'GET',
    },
    getList: {
      url: '/tps/list',
      method: 'GET',
    },
    add: {
      url: '/tps/add',
      method: 'POST',
    },
    update: {
      url: '/tps/update',
      method: 'POST',
    },
    // TPS Tổng
    totaltps: {
      url: '/tps/saveTpsTotal',
      method: 'POST',
    },
    detailTotal: {
      url: '/tps/infoConfigTpsTotal',
      method: 'GET',
    },
    // thay đổi trạng thái
    tpsAction: {
      url: 'tps/action',
      method: 'POST',
    },
    getConfigTpsTotal: {
      url: 'tps/getConfigTpsTotal',
      method: 'GET',
    },
  }
}
const actions = {
  tpsAction(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.tpsAction.url,
      method: vueContext.state.tpsAction.method,
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
      data: {
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
  getList(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.getList.url,
      method: vueContext.state.getList.method,
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
  totaltps(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.totaltps.url,
      method: vueContext.state.totaltps.method,
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
  detailTotal(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.detailTotal.url,
      method: vueContext.state.detailTotal.method,
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
  getConfigTpsTotal(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.getConfigTpsTotal.url,
      method: vueContext.state.getConfigTpsTotal.method,
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
