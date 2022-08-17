import Cookies from 'js-cookie'

const state = () => {
  return {
    configPriceList: {
      url: 'configPrice/list',
      method: 'GET',
    },
    configPriceAdd: {
      url: 'configPrice/add',
      method: 'POST',
    },
    configPriceDetail: {
      url: 'configPrice/detail',
      method: 'GET',
    },
    configPriceUpdate: {
      url: 'configPrice/update',
      method: 'POST',
    },
    networkSelectData: {
      url: 'network/selectData',
      method: 'GET',
    },
    selectNetworkActive: {
      url: 'network/selectNetworkActive',
      method: 'GET',
    },
    businessSelectData: {
      url: 'businessFiled/selectData',
      method: 'GET',
    },
    businessSelectDataActive: {
      url: 'businessFiled/dataSelectOptionsActive',
      method: 'GET',
    },
    businessSelectDataOfCustomer: {
      url: 'businessFiled/selectDataOfCustomer',
      method: 'GET',
    },
    typeSmsSelectData: {
      url: 'typeSms/selectData',
      method: 'GET',
    },
    typeSmsSelectDataActive: {
      url: 'typeSms/dataSelectOptionsActive',
      method: 'GET',
    },
    history: {
      url: 'configPrice/history',
      method: 'GET',
    },
    priceSms: {
      url: 'configPrice/priceSms',
      method: 'GET',
    },
  }
}
const actions = {
  businessSelectDataOfCustomer(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.businessSelectDataOfCustomer.url,
      method: vueContext.state.businessSelectDataOfCustomer.method,
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
  typeSmsSelectData(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.typeSmsSelectData.url,
      method: vueContext.state.typeSmsSelectData.method,
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
  typeSmsSelectDataActive(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.typeSmsSelectDataActive.url,
      method: vueContext.state.typeSmsSelectDataActive.method,
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
  businessSelectData(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.businessSelectData.url,
      method: vueContext.state.businessSelectData.method,
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
  businessSelectDataActive(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.businessSelectDataActive.url,
      method: vueContext.state.businessSelectDataActive.method,
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
  networkSelectData(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.networkSelectData.url,
      method: vueContext.state.networkSelectData.method,
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
  selectNetworkActive(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.selectNetworkActive.url,
      method: vueContext.state.selectNetworkActive.method,
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
  configPriceDetail(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.configPriceDetail.url,
      method: vueContext.state.configPriceDetail.method,
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
  configPriceUpdate(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.configPriceUpdate.url,
      method: vueContext.state.configPriceUpdate.method,
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
  configPriceAdd(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.configPriceAdd.url,
      method: vueContext.state.configPriceAdd.method,
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
  configPriceList(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.configPriceList.url,
      method: vueContext.state.configPriceList.method,
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

  history(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.history.url,
      method: vueContext.state.history.method,
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
  priceSms(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.priceSms.url,
      method: vueContext.state.priceSms.method,
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
}
export default {
  state,
  actions,
}
