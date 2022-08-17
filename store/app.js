import Cookies from 'js-cookie'
import ULT from '~/plugins/ult'
import APIs from '~/assets/configurations/API_Config'
import moment from 'moment'

export let state = () => ({
  ip: '',
  roles: [],
  getContent: '',
  pageSizes: [10, 15, 20, 50, 100, 200],
  getRoles: false,
  requestObjectType: null,
  onlyMe: true,
  alert_display_time: 6000,
  stateOnlye: true,
  dateTimeDashboard: [
    moment().startOf('year').format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD'),
  ],
  changePass: {
    url: '/user/changePasswordThisAccount',
    method: 'POST',
  },
  strRoles: null,
  // reload_treeview: false,
})

export const mutations = {
  ClientPrivateIP(state, ip) {
    state.ip = ip
  },
  set_time_alert(state, payload) {
    state.alert_display_time = Number(payload)
  },
  setRole(state, payload) {
    state.roles = payload
    state.getRoles = true
  },
  setRequestObjectType(state, payload) {
    state.requestObjectType = payload
  },
  setDateTimeDashboard(state, payload) {
    state.dateTimeDashboard = payload
  },
  setOnlyme(state, payload) {
    state.onlyMe = payload
  },
  setStateOnlyme(state, payload) {
    state.stateOnlye = payload
  },
  setContent(state, payload) {
    state.getContent = payload
  },
}

export const actions = {
  async changePass(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.changePass.url,
      method: vueContext.state.changePass.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return response
  },

  async GetRole(vueContext, payload) {
    let data = [
      {
        id: 1,
        pageName: 'Trang chủ',
        pageUrl: '/',
        pageIcon: 'mdi-home',
        parentId: 0,
        menuIndex: 1,
        level: 0,
        pageType: 0,
        redirectType: null,
        roles: '10',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 2,
        pageName: 'Báo cáo',
        pageUrl: '/',
        pageIcon: 'mdi-chart-bar',
        parentId: 0,
        menuIndex: 2,
        level: 0,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },

      {
        id: 3,
        pageName: 'Báo cáo số lượng tin nhắn theo khách hàng',
        pageUrl: '/bao-cao/bao-cao-so-luong-tin-nhan-theo-khach-hang',
        pageIcon: 'mdi-file-chart-outline',
        parentId: 2,
        menuIndex: 1,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },

      {
        id: 4,
        pageName: 'Báo cáo thống kê doanh thu',
        pageUrl: '/bao-cao/bao-cao-thong-ke-doanh-thu',
        pageIcon: 'mdi-file-chart-outline',
        parentId: 2,
        menuIndex: 2,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },

      {
        id: 5,
        pageName: 'Báo cáo thống kê trương trình tin nhắn',
        pageUrl: '/bao-cao/bao-cao-thong-ke-truong-trinh-tin-nhan',
        pageIcon: 'mdi-file-chart-outline',
        parentId: 2,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 6,
        pageName: 'Cấu hình',
        pageUrl: '/',
        pageIcon: 'mdi-tools',
        parentId: 0,
        menuIndex: 2,
        level: 0,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 7,
        pageName: 'Cấu hình TPS',
        pageUrl: '/cau-hinh-tps',
        pageIcon: 'mdi-tools',
        parentId: 6,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 8,
        pageName: 'Cấu hình TPS tổng',
        pageUrl: '/cau-hinh-tps-tong',
        pageIcon: 'mdi-tools',
        parentId: 6,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 18,
        pageName: 'Cấu hình bảng giá',
        pageUrl: '/cau-hinh-bang-gia',
        pageIcon: 'mdi-tools',
        parentId: 6,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },

      {
        id: 9,
        pageName: 'Khách hàng',
        pageUrl: '/',
        pageIcon: 'mdi-account-group',
        parentId: 0,
        menuIndex: 2,
        level: 0,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 10,
        pageName: 'Quản lý khách hàng',
        pageUrl: '/nguoi-dung/khach-hang',
        pageIcon: 'mdi-account',
        parentId: 9,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 12,
        pageName: 'Quản lý brandname',
        pageUrl: '/brandname-manager',
        pageIcon: 'mdi-message-processing',
        parentId: 0,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 13,
        pageName: 'Quản lý chương trình nhắn tin',
        pageUrl: '/brandname-manager',
        pageIcon: 'mdi-forum',
        parentId: 0,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 14,
        pageName: 'Danh sách chương trình nhắn tin',
        pageUrl: '/chuong-trinh-nhan-tin',
        pageIcon: 'mdi-message-text-clock-outline',
        parentId: 13,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 15,
        pageName: 'Danh sách tiến trình',
        pageUrl: '/tien-trinh',
        pageIcon: 'mdi-abacus',
        parentId: 0,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 16,
        pageName: 'Quản lý danh mục loại tin nhắn',
        pageUrl: '/loai-tin-nhan',
        pageIcon: 'mdi-forum',
        parentId: 0,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 17,
        pageName: 'Quản lý danh mục nhà mạng',
        pageUrl: '/nha-mang',
        pageIcon: ' mdi-access-point-network',
        parentId: 0,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 19,
        pageName: 'Danh mục lĩnh vực kinh doanh',
        pageUrl: '/danh-muc-linh-vuc-kinh-doanh',
        pageIcon: ' mdi-access-point-network',
        parentId: 0,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 20,
        pageName: 'Quản lý tài khoản',
        pageUrl: '/',
        pageIcon: 'mdi-account-cog',
        parentId: 0,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 21,
        pageName: 'Danh sách tài khoản',
        pageUrl: '/nguoi-dung/tai-khoan',
        pageIcon: 'mdi-account-cog',
        parentId: 20,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
      {
        id: 11,
        pageName: 'Nhóm tài khoản',
        pageUrl: '/nguoi-dung/nhom-tai-khoan',
        pageIcon: 'mdi-account-group',
        parentId: 20,
        menuIndex: 4,
        level: 1,
        pageType: 0,
        redirectType: null,
        roles: '',
        showOnMobile: 1,
        showOnTablet: 1,
        isOpen: null,
      },
    ]
    // vueContext.commit('setRole', data)

    await this.$getRoleByUser(payload).then((response) => {
      try {
        let errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
          vueContext.commit('setRole', response.data.data.pageRoles)

          let listRoles = []
          for (let i = 0; i < response.data.data.pageRoles.length; i++) {
            listRoles.push(response.data.data.pageRoles[i].roles)
          }
          console.log()
          let str = ',' + listRoles.toString() + ','
          Cookies.set('strRoles', str)

        } else if (APIs.responses[errorCode] != undefined) {
          this.$showError(this.$router.app, APIs.responses[errorCode].message)
        } else {
          let errorMsg = response.data.error.message
          this.$showError(
            this.$router.app,
            'Đã xảy ra lỗi khi lấy thông tin quyền truy cập. ' + errorMsg
          )
        }
      } catch (e) {

      }
    })
  },
}

export const getters = {}
