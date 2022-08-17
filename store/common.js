import Cookies from 'js-cookie'
import URL from '~/assets/configurations/BASE_URL'
const state = () => {
  return {
    getWeekOfYear: {
      url: '/common/weekOfYear',
      method: 'GET',
    },
  }
}
const actions = {
  getWeekOfYear(vueContext, data) {
    const respone = this.$axios({
      baseURL: URL.urlWeek,
      url: vueContext.state.getWeekOfYear.url,
      method: vueContext.state.getWeekOfYear.method,
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
