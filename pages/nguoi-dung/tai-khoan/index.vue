<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Quản lý tài khoản
      </div>
    </CardGlobal>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat>
          <client-only>
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="pageSize"
              hide-default-footer
              loading-text="Xin chờ"
              sort-by="stt"
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              class="elevation-0 custom_header_table"
              fixed-header
              light
            >
              <template v-slot:top>
                <v-row class="ma-0">
                  <v-spacer></v-spacer>
                  <v-col cols="2" class="pb-0 pr-0">
                    <v-select
                      outlined
                      v-model="status"
                      :items="listStatus"
                      dense
                      no-data-text="Không có dữ liệu"
                      label="Trạng thái"
                      hide-details=""
                    ></v-select>
                  </v-col>
                  <v-col class="col-auto pr-0">
                    <v-btn
                      class="primary text-none"
                      @click="reset"
                      depressed
                      height="40"
                      >Nhập lại</v-btn
                    >
                  </v-col>
                  <v-col class="col-auto pr-0">
                    <v-btn
                      class="primary text-none"
                      @click="search"
                      depressed
                      height="40"
                      >Tìm kiếm</v-btn
                    >
                  </v-col>
                  <v-col class="col-auto">
                    <v-btn
                      v-if="addBtn"
                      class="primary text-none"
                      @click="openDialogInsert = true"
                      depressed
                      height="40"
                      >Thêm mới</v-btn
                    >
                  </v-col>
                </v-row>
              </template>

              <template v-slot:[`item.stt`]="{ item }">
                <div class="d-flex align-center justify-center">
                  {{ getItemIndex(item) }}
                </div>
              </template>
              <template v-slot:[`item.fullName`]="{ item }">
                {{ item.fullName }}
              </template>
              <template v-slot:[`item.groupRole`]="{ item }">
                <span v-if="item.groupRole != null && item.groupRole != ''">
                  <span
                    v-for="(item1, index1) in item.groupRole.split(',')"
                    :key="`group-role--${index1}`"
                  >
                    <v-chip small outlined color="success">{{ item1 }}</v-chip>
                  </span>
                </span>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip v-if="item.status === 0" small outlined color="orange"
                  >Không hoạt động</v-chip
                >
                <v-chip
                  v-else-if="item.status === 1"
                  small
                  outlined
                  color="successNotify"
                  >Hoạt động</v-chip
                >
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-tooltip v-if="editBtn" bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="setActionUpdate(item)"
                        v-on="on"
                      >
                        mdi-border-color</v-icon
                      >
                    </template>
                    <span>Cập nhật</span>
                  </v-tooltip>
                  <!--xóa-->
                  <v-tooltip v-if="deleteBtn" bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForDeleteItem(item)"
                        v-on="on"
                      >
                        mdi-delete</v-icon
                      >
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>

                  <!--xem chi tiết-->

                  <v-tooltip v-if="detailBtn" bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForResetItem(item)"
                        v-on="on"
                        >mdi-lock-reset
                      </v-icon>
                    </template>
                    <span>reset mật khẩu</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </client-only>
          <pagination
            class="px-0 pt-3 pb-3"
            ref="pagination"
            :pageCount="pageCount"
            :page="page"
            :pageSize="pageSize"
            @changePage="changePage"
            @changePageSize="changePageSize"
            depressed="true"
          ></pagination>
        </v-card>
      </v-col>
    </v-row>
    <Insert
      :open="openDialogInsert"
      @toggle="openDialogInsert = !openDialogInsert"
      @success="getListItems"
    ></Insert>

    <Update
      :dataItem="dataItem"
      :open="openDialogUpdate"
      @toggle="openDialogUpdate = !openDialogUpdate"
      @success="getListItems"
    ></Update>
    <!--  hỏi xóa -->
    <alerDelete
      :open="openDelete"
      btnOkColor="error"
      :check="true"
      :alert-msg="message_noti"
      @toggle="openDelete = !openDelete"
      @OK="deleteItem"
    />
    <!-- chi tiết -->
    <detail
      :open="opeoDetail"
      :dataItem="dataDetailItem"
      @toggle="opeoDetail = !opeoDetail"
    ></detail>
    <alertApprove
      :open="openReset"
      :alert-msg="message_noti"
      :check="true"
      @toggle="openReset = !openReset"
      @OK="ResetItem"
    />
  </div>
</template>
<script>
import moment from 'moment'

import SingeDatePicker from '~/components/SingeDatePicker'
import RenDerStatus from '~/components/Status.vue'
import { mapState } from 'vuex'
import Rules from '~/assets/configurations/Rules'
import Dialog from '~/components/Dialog'
import Insert from '~/components/tai-khoan-noi-bo/add.vue'
import Update from '~/components/tai-khoan-noi-bo/update.vue'
import alerDelete from '~/components/tai-khoan/YesNoAlert.vue'
import alertApprove from '~/components/tai-khoan-noi-bo/YesNoAlert.vue'
import detail from '~/components/tai-khoan/detail.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

export default {
  transition: 'slide-x-transition',
  components: {
    SingeDatePicker,
    RenDerStatus,
    Dialog,
    Insert,
    Update,
    alerDelete,
    alertApprove,
    detail,
  },

  data() {
    return {
      addBtn: null,
      editBtn: null,
      deleteBtn: null,
      detailBtn: null,
      menu: false,
      menu1: false,
      menu_date: moment().format('YYYY-MM-DD'),
      menu_date1: moment().format('YYYY-MM-DD'),
      registerTime: null,

      expiredTime: null,
      taxCode: null,
      businessRegistrationNumber: null,
      contractType: null,
      startDate: null,
      endDate: null,
      contractNumber: null,
      openDelete: false,
      Code: null,
      status: null,
      UserName: null,
      fullName: null,
      openConfirmReset: false,
      dataItem: {},
      openDialogUpdate: false,
      Rules,
      openDialogInsert: false,
      openIPDialog: false,
      userItem: null,
      currentIP: [],
      deleteIP: [],
      editIP: '',
      errorIP: false,
      idxIP: -1,
      showPassword: false,
      message_noti: '',

      listStatus: Constants.System.User.listStatus,
      openConfirm: false,
      birthday: '',
      updateWhat: '',
      confirmMessage: '',
      openDeleteDialog: false,
      deleteMessage: '',
      openEditDialog: false,
      allowAccess: true,
      openApprove: false,
      openRefuse: false,
      dataDetailItem: {},
      opeoDetail: false,
      openLook: false,
      openReset: false,
      openBlock: false,
      businessNumber: null,
      startIndex: 1,
      page: 1,
      pageCount: null,
      pageSize: 20,
      total_item: 0,
      Listitem: [],
      id: null,
      user_name: null,
      pageSizes: [10, 20, 50, 100, 150, 200, 300],
      openDetailDialog: false,
      rules: {
        required: (value) => !!value || 'Vui lòng nhập nội dung',
        checkIP: (value) => {
          return this.$isIPAddress(value) || 'Địa chỉ IP sai định dạng.'
        },
      },
      items: [],
    }
  },

  computed: {
    ...mapState({
      selectedItem: (state) => state.users.selectedItem,
      selectedIndex: (state) => state.users.selectedIndex,
      groups: (state) => state.users.groups,
      detailUser: (state) => state.users.detailUser,
      addressIpOfUser: (state) => state.users.addressIpOfUser,
      groupUser: (state) => state.users.groupUser,
      schedules: (state) => state.users.schedules,
    }),
    headers() {
      return Constants.System.User.headerAcc
    },
  },

  watch: {},

  mounted() {
    this.addBtn = Cookies.get('strRoles').includes(',5,')
    this.editBtn = Cookies.get('strRoles').includes(',6,')
    this.deleteBtn = Cookies.get('strRoles').includes(',7,')
    this.detailBtn = Cookies.get('strRoles').includes(',9,')
    this.initialize()
  },

  methods: {
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    reset() {
      this.taxCode = null
      this.businessRegistrationNumber = null
      this.contractType = null
      this.contractNumber = null
      this.registerTime = null
      this.expiredTime = null
      this.Code = null
      this.fullName = null
      this.status = null
    },
    askForResetItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có reset mật khẩu  không?`
      this.openReset = true
    },

    // gọi api reset mật khẩu
    ResetItem() {
      this.$store
        .dispatch('users/ResetPassword', {
          userId: this.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openReset = false
            this.$showNotifyRest(this, res.data.data.message)
          }
        })
        .catch((errors) => {})
    },

    askForlLock(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận khóa bản ghi không?`
      this.openLook = true
    },

    // gọi api khóa
    LockItem() {
      this.$store
        .dispatch('customer/lock', {
          id: this.id,
          isLock: 1,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openLook = false

            this.$showSuccess(this, 'Khóa bản ghi thành công')
          }
        })
    },

    askForBlock() {},
    askForOpenLock(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận mở khóa bản ghi không?`
      this.openBlock = true
    },

    BLockItem() {
      this.$store
        .dispatch('customer/lock', {
          id: this.id,
          isLock: 0,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openBlock = false

            this.$showSuccess(this, 'Mở khóa bản ghi thành công')
          }
        })
        .catch((errors) => {})
    },
    askForRefuseItem(item) {
      this.dataDetailItem = item
      this.message_noti = `Từ chối duyệt khách hàng?`
      this.openRefuse = true
    },

    askForApproveItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận phê duyệt bản ghi không?`
      this.openApprove = true
    },
    // gọi api phê duyệt
    approveItem() {
      this.$store
        .dispatch('customer/accept', {
          id: this.id,
          status: 2,
          refusal: null,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openApprove = false

            this.$showSuccess(this, 'Phê duyệt thành công')
          }
        })
        .catch((errors) => {})
    },

    confirm_detail(item) {
      this.$store
        .dispatch('customer/detail', {
          id: item.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.dataDetailItem = res.data.data
            this.opeoDetail = true
          }
        })
        .catch((errors) => {})
    },

    ResetUser() {
      this.$store
        .dispatch('users/reset_pass', this.id)
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Reset mật khẩu thành công')
          }
        })
        .catch((errors) => {})
    },

    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.User.id,
        actionId
      )
      return isAllowed
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.items.indexOf(item) + 1
    },

    changePageSize(value) {
      this.page = 1
      this.pageSize = value
      this.$refs.pagination.reset()
      this.getListItems()
    },
    changePage(value) {
      this.page = value
      this.getListItems()
    },
    getListItems() {
      let data = {
        pageIndex: this.page,
        pageSize: this.pageSize,
        status: this.status,
      }
      this.$store
        .dispatch('users/getListItems', data)
        .then((res) => {
          if (res.data.error.code === 0) {
            this.items = res.data.data.data
            this.pageCount = res.data.data.totalPages
            this.total_item = res.data.data.totalRecords
          }
        })
        .catch((errors) => {})
    },
    initialize() {
      this.$store.dispatch('users/setGroups')
      this.getListItems()
    },
    search() {
      this.getListItems()
    },

    setActionUpdate(item) {
      this.$store
        .dispatch('users/get_detail', { userId: item.id })
        .then((res) => {
          this.dataItem = res.data.data
          this.openDialogUpdate = true
        })
        .catch((errors) => {})
    },

    //update event to save add add new
    updateItem() {
      this.$store.dispatch('users/changeComplexStateSeletedValue', {
        field: 'ip',
        value: this.currentIP,
      })
      //update in there
      this.$store.dispatch('users/saveItem', this.deleteIP).then((res) => {
        if (res == 1) {
          this.toggleEditDialog()
        }
      })
      //remove IP
    },

    changeStatus(value, item) {
      this.updateWhat = 'STATUS'
      this.$store
        .dispatch('users/setSelectedItemWithDetailInfor', { item })
        .then((res) => {
          this.$store.dispatch('users/changeSimpleStateSeletedValue', {
            field: 'status',
            value: value,
            inItem: true,
          })
          this.toggleConfirm()
        })
        .catch((errors) => {})
    },

    // detail user
    setActionDetail(item) {
      this.$store.dispatch('users/setSelectedItemWithDetailInfor', { item })
      this.toggleDetailDialog()
    },

    setNewStatus(value) {
      this.$store.dispatch('users/changeSimpleStateSeletedValue', {
        field: 'status',
        value,
      })
    },
    //ask to delete
    askForDeleteItem(item) {
      this.id = item.id
      this.user_name = item.userName
      ;(this.openDelete = true),
        (this.message_noti = `Bạn có xác nhận xóa bản ghi không?`)
    },
    deleteItem(item) {
      this.$store
        .dispatch('users/deleted_user', {
          id: this.id,
          user_name: this.user_name,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openDelete = false
            this.$showSuccess(this, 'Xóa tài khoản thành công')
            this.getListItems()
          }
        })
        .catch((errors) => {})
    },

    setResetUserPass(item) {
      this.openConfirmReset = true
      this.id = item.id
    },

    resetUserPass() {
      this.$store.dispatch('users/resetPass')
    },

    confirmAction() {
      if (this.openConfirm) {
        if (this.updateWhat == 'RESET') {
          this.resetUserPass()
        } else {
          this.$store.dispatch('users/setStatus')
        }
      }
    },
    toggleConfirm() {
      this.openConfirm = !this.openConfirm
      if (this.openConfirm) {
        if (this.updateWhat == 'RESET')
          this.confirmMessage =
            'Bạn có muốn reset mật khẩu của người dùng này không?'
        else
          this.confirmMessage =
            'Bạn có muốn thay đổi trạng thái của người dùng này không?'
      } else {
        if (this.updateWhat !== 'RESET') {
          this.$store.dispatch('users/undoChangeStatus')
        }

        this.updateWhat = ''
        this.confirmMessage = ''
      }
    },
    setActionForIP(item, action) {
      if (action === 0) {
        //them moi
        this.editIP = ''
        this.idxIP = -1
      }
      this.toggleIPDialog()
    },
    saveIP() {
      let ip = this.editIP
      if (this.$isIPAddress(ip) === false) {
        this.errorIP = true
        return
      }
      let hasExist = false
      this.currentIP.forEach((p) => {
        if (p.ip_address === ip) hasExist = true
      })
      if (hasExist) {
        this.errorIP = true
        return
      }
      if (this.idx == undefined || this.idxIP < 0) {
        let lst = []
        this.currentIP.forEach((p) => {
          lst.push({ ip_address: p.ip_address, id: p.id })
        })
        lst.push({ ip_address: ip, id: 0 })
        this.currentIP = lst
      }

      this.$store.dispatch('users/changeComplexStateSeletedValue', {
        field: 'ip',
        value: this.currentIP,
      })
      this.toggleIPDialog()
    },
    removeIP(item) {
      let obj = this.currentIP.find((i) => i.ip_address === item.ip_address)
      let idx = this.currentIP.indexOf(obj)
      if (idx >= 0) {
        let lst = []
        this.currentIP.forEach((p) => {
          if (p.ip_address !== item.ip_address) lst.push(p)
        })
        this.currentIP = lst
        if (item.id > 0) this.deleteIP.push(item.id)
      }
    },

    toggleEditDialog() {
      this.openEditDialog = !this.openEditDialog
      if (!this.openEditDialog) {
        this.$store.dispatch('users/unsetItem')
      }
    },
    toggleDeleteDialog() {
      this.openDeleteDialog = !this.openDeleteDialog
    },
    toggleDetailDialog() {
      this.openDetailDialog = !this.openDetailDialog
    },
    toggleIPDialog() {
      this.openIPDialog = !this.openIPDialog
      if (this.openIPDialog === false) this.errorIP = false
    },
    //-----------toogle dialog---
  },
}
</script>
