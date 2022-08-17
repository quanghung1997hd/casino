import Cookies from 'js-cookie'

const state = () => {
  return {
    //list blacklist nội bộ
    getListBlacklist: {
      url: '/blacklist/list',
      method: 'GET',
    },

    addBlacklist: {
      url: '/blacklist/add',
      method: 'POST',
    },
    deleteItem: {
      url: '/blacklist/delete',
      method: 'GET',
    },
    EditBlacklist: {
      url: '/blacklist/update',
      method: 'POST',
    },
    EditBlacklistCms: {
      url: '/blacklist/cmsUpdate',
      method: 'POST',
    },
    upLoadFile: {
      url: '/blacklist/import',
      method: 'POST',
    },

    //list blacklist khách hàng
    getlist: {
      url: '/blacklist/cmsCustomerlist',
      method: 'GET',
    },

    addBlacklistCus: {
      url: '/blacklist/cmsCustomerAdd',
      method: 'POST',
    },
    upLoadFileCus: {
      url: '/blacklist/cmsImport',
      method: 'POST',
    },
  }
}
const actions = {
  getListBlacklist(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getListBlacklist.url,
      method: vueContext.state.getListBlacklist.method,
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

  getlist(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getlist.url,
      method: vueContext.state.getlist.method,
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

  async upLoadFile(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.upLoadFile.url,
      method: vueContext.state.upLoadFile.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: payload.data,
    })
    return response
  },

  async upLoadFileCus(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.upLoadFileCus.url,
      method: vueContext.state.upLoadFileCus.method,
      headers: {
        Authorization:
          Cookies.get('token') != (null || undefined)
            ? `Bearer ${Cookies.get('token')}`
            : '',
      },
      data: payload.data,
    })
    return response
  },
  addBlacklist(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addBlacklist.url,
      method: vueContext.state.addBlacklist.method,
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

  // add blacklist khách hàng

  addBlacklistCus(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addBlacklistCus.url,
      method: vueContext.state.addBlacklistCus.method,

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
  EditBlacklist(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.EditBlacklist.url,
      method: vueContext.state.EditBlacklist.method,
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
  EditBlacklistCms(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.EditBlacklistCms.url,
      method: vueContext.state.EditBlacklistCms.method,
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
