import Cookies from 'js-cookie'

const state = () => {
  return {
    campaignReport: {
      url: '/report/getCampaignByCustomer',
      method: 'GET',
    },
    reportExportInside: {
      url: 'report/exportInside',
      method: 'GET',
    },
    downloadFileExcel: {
      url: 'downloadFile/excel',
      method: 'GET',
    },
    reportRevenue: {
      url: '/report/revenue',
      method: 'GET',
    },
  }
}
const actions = {
  downloadFileExcel(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.downloadFileExcel.url,
      method: vueContext.state.downloadFileExcel.method,
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
  reportExportInside(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.reportExportInside.url,
      method: vueContext.state.reportExportInside.method,
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
  campaignReport(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.campaignReport.url,
      method: vueContext.state.campaignReport.method,
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
  reportRevenue(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.reportRevenue.url,
      method: vueContext.state.reportRevenue.method,
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
}
export default {
  state,
  actions,
}
