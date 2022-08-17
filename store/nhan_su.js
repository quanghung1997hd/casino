import Cookies from 'js-cookie'
const state = () => {
  return {
    listEmployee: {
      url: 'employee',
      method: 'GET',
    },
    getDetail: {
      url: 'employee/detail',
      method: 'GET',
    },
    addEmployee: {
      url: 'employee/add',
      method: 'POST',
    },
    updateEmployee: {
      url: 'employee/update',
      method: 'POST',
    },
    addPhone: {
      url: 'employee/phone/add',
      method: 'POST',
    },
    updatePhone: {
      url: 'employee/phone/update',
      method: 'POST',
    },
    deletePhone: {
      url: 'employee/phone/delete',
      method: 'GET',
    },
    addEmail: {
      url: 'employee/email/add',
      method: 'POST',
    },
    updateEmail: {
      url: 'employee/email/update',
      method: 'POST',
    },
    deleteEmail: {
      url: 'employee/email/delete',
      method: 'GET',
    },
    addDepartment: {
      url: 'employee/department/add',
      method: 'POST',
    },
    updateDepartment: {
      url: 'employee/department/update',
      method: 'POST',
    },
    deleteDepartment: {
      url: 'employee/department/delete',
      method: 'GET',
    },
    addNoticeReceiver: {
      url: 'employee/noticeReceiver/add',
      method: 'POST',
    },
    deleteNoticeReceiver: {
      url: 'employee/noticeReceiver/delete',
      method: 'GET',
    },

    relatedEmployee: {
      url: '/employee/relatedEmployee',
      method: 'GET',
    },

    getOtherNoticeReceivers: {
      url: '/employee/getOtherNoticeReceivers',
      method: 'GET',
    },
  }
}
const actions = {
  getOtherNoticeReceivers(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getOtherNoticeReceivers.url,
      method: vueContext.state.getOtherNoticeReceivers.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })
    return respone
  },
  relatedEmployee(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.relatedEmployee.url,
      method: vueContext.state.relatedEmployee.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })
    return respone
  },
  listEmployee(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.listEmployee.url,
      method: vueContext.state.listEmployee.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })
    return respone
  },
  getDetail(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.getDetail.url,
      method: vueContext.state.getDetail.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })
    return respone
  },
  addEmployee(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addEmployee.url,
      method: vueContext.state.addEmployee.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  updateEmployee(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.updateEmployee.url,
      method: vueContext.state.updateEmployee.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  addPhone(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addPhone.url,
      method: vueContext.state.addPhone.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  updatePhone(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.updatePhone.url,
      method: vueContext.state.updatePhone.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  deletePhone(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.deletePhone.url,
      method: vueContext.state.deletePhone.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })
    return respone
  },
  addEmail(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addEmail.url,
      method: vueContext.state.addEmail.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  updateEmail(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.updateEmail.url,
      method: vueContext.state.updateEmail.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  deleteEmail(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.deleteEmail.url,
      method: vueContext.state.deleteEmail.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })
    return respone
  },
  addDepartment(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addDepartment.url,
      method: vueContext.state.addDepartment.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  updateDepartment(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.updateDepartment.url,
      method: vueContext.state.updateDepartment.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  deleteDepartment(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.deleteDepartment.url,
      method: vueContext.state.deleteDepartment.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        ...payload,
      },
    })
    return respone
  },
  addNoticeReceiver(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.addNoticeReceiver.url,
      method: vueContext.state.addNoticeReceiver.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      data: {
        ...payload,
      },
    })
    return respone
  },
  deleteNoticeReceiver(vueContext, payload) {
    const respone = this.$axios({
      url: vueContext.state.deleteNoticeReceiver.url,
      method: vueContext.state.deleteNoticeReceiver.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
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
