import Cookies from 'js-cookie'

const state = () => {
  return {
    getListCampaign: {
      url: '/campaign/list',
      method: 'GET',
    },
    addCampaign: {
      url: 'campaign/add',
      method: 'POST',
    },
    upLoadFile: {
      url: '/campaign/excel',
      method: 'POST',
    },
    campaignReport: {
      // url: '/campaign/list',
      url: '/report/reportListCampaign',
      method: 'GET',
    },
    campaignApprove: {
      url: '/campaign/approve',
      method: 'POST',
    },
    customerDataSelect: {
      url: '/customer/dataSelect',
      method: 'GET',
    },
    customerDataSelectAll: {
      url: '/customer/dataSelectAll',
      method: 'GET',
    },
    customerDataSelectDebt: {
      url: '/customer/customerPostpaidActiveSelectOptions',
      method: 'GET',
    },
    infoThisCustomer: {
      url: '/customer/infoThisCustomer',
      method: 'GET',
    },
    brandnameDataSelectOfCustomer: {
      url: '/brandname/dataSelectOfCustomer',
      method: 'GET',
    },
    dataSelectAllOfCustomer: {
      url: '/brandname/dataSelectAllOfCustomer',
      method: 'GET',
    },
    dataCampaignOptionsOfCustomer: {
      url: '/campaign/dataSelectOfCampaign',
      method: 'GET',
    },
    campaignDetail: {
      url: '/campaign/detail',
      method: 'GET',
    },
    smsList: {
      url: '/sms/list',
      method: 'GET',
    },
    campaignEdit: {
      url: 'campaign/edit',
      method: 'POST',
    },
    smsPrice: {
      url: 'campaign/priceTable',
      method: 'GET',
    },
    smsTest: {
      url: 'sms/listPhoneTest',
      method: 'GET',
    },
    // smsPrice1: {
    //   url: 'sms/listPhoneTest',
    //   method: 'GET',
    // },
    smsSelectData: {
      url: 'sms/selectData',
      method: 'GET',
    },
    typeSmsAndBussinessDataSelect: {
      url: 'campaign/typeSmsAndBussinessDataSelect',
      method: 'GET',
    },
    confirmTest: {
      url: 'campaign/confirmTest',
      method: 'POST',
    },
    requestRunTest: {
      url: 'campaign/runTest',
      method: 'GET',
    },
    cancelCampaign: {
      url: 'campaign/cancelCampaignCustomer',
      method: 'GET',
    },
    idCampaign: null,
  }
}
const mutations = {
  setIdCampaign(state, payload) {
    state.idCampaign = payload
  },
}
const actions = {
  async cancel(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.cancelCampaign.url,
      method: vueContext.state.cancelCampaign.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })

    return response
  },
  async confirmTestEnd(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.confirmTest.url,
      method: vueContext.state.confirmTest.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })

    return response
  },
  async runTest(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.requestRunTest.url,
      method: vueContext.state.requestRunTest.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })

    return response
  },
  async smsSelectData(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.smsSelectData.url,
      method: vueContext.state.smsSelectData.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async smsPrice(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.smsPrice.url,
      method: vueContext.state.smsPrice.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },

  async smsTest(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.smsTest.url,
      method: vueContext.state.smsTest.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async campaignEdit(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.campaignEdit.url,
      method: vueContext.state.campaignEdit.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async campaignApprove(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.campaignApprove.url,
      method: vueContext.state.campaignApprove.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async smsList(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.smsList.url,
      method: vueContext.state.smsList.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async campaignDetail(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.campaignDetail.url,
      method: vueContext.state.campaignDetail.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async dataCampaignOptionsOfCustomer(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.dataCampaignOptionsOfCustomer.url,
      method: vueContext.state.dataCampaignOptionsOfCustomer.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async brandnameDataSelectOfCustomer(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.brandnameDataSelectOfCustomer.url,
      method: vueContext.state.brandnameDataSelectOfCustomer.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async dataSelectAllOfCustomer(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.dataSelectAllOfCustomer.url,
      method: vueContext.state.dataSelectAllOfCustomer.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async typeSmsAndBussinessDataSelect(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.typeSmsAndBussinessDataSelect.url,
      method: vueContext.state.typeSmsAndBussinessDataSelect.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async customerDataSelect(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.customerDataSelect.url,
      method: vueContext.state.customerDataSelect.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async customerDataSelectAll(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.customerDataSelectAll.url,
      method: vueContext.state.customerDataSelectAll.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async customerDataSelectDebt(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.customerDataSelectDebt.url,
      method: vueContext.state.customerDataSelectDebt.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async infoThisCustomer(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.infoThisCustomer.url,
      method: vueContext.state.infoThisCustomer.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },

  async campaignReport(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.campaignReport.url,
      method: vueContext.state.campaignReport.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },
  async upLoadFile(vueContext, payload) {
    const response = this.$axios({
      url: vueContext.state.upLoadFile.url,
      method: vueContext.state.upLoadFile.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: payload.data,
    })
    return response
  },
  async getListCampaign(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.getListCampaign.url,
      method: vueContext.state.getListCampaign.method,
      baseURL: URL.BASE,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        // channel: APIs.channel,
        ...payload,
      },
    })

    return response
  },

  async addCampaign(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.addCampaign.url,
      method: vueContext.state.addCampaign.method,
      baseURL: URL.BASE,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return response
  },
}

export default {
  state,
  actions,
  mutations,
}
