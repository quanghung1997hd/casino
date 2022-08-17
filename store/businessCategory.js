import Cookies from 'js-cookie'
const state = () => {
  return {
    BusinessFiledList: {
      url: 'businessFiled/list',
      method: 'GET',
    },
    BusinessFiledAdd: {
      url: 'businessFiled/add',
      method: 'POST',
    },
    BusinessFiledDetail: {
      url: 'businessFiled/detail',
      method: 'GET',
    },
    BusinessFiledUpdate: {
      url: 'businessFiled/update',
      method: 'POST',
    },
    BusinessFiledSelectData: {
      url: '/businessFiled/selectData',
      method: 'GET',
    },
  }
}
const actions = {
  BusinessFiledUpdate(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.BusinessFiledUpdate.url,
      method: vueContext.state.BusinessFiledUpdate.method,
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
  BusinessFiledDetail(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.BusinessFiledDetail.url,
      method: vueContext.state.BusinessFiledDetail.method,
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
  BusinessFiledAdd(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.BusinessFiledAdd.url,
      method: vueContext.state.BusinessFiledAdd.method,
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
  async BusinessFiledSelectData(vueContext, payload) {
    const respone = await this.$axios({
      url: vueContext.state.BusinessFiledSelectData.url,
      method: vueContext.state.BusinessFiledSelectData.method,

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
  BusinessFiledList(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.BusinessFiledList.url,
      method: vueContext.state.BusinessFiledList.method,
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
