<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Quản lý khách hàng
      </div>
    </CardGlobal>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat>
          <client-only>
            <v-data-table
              :headers="headers"
              :items="Listitem"
              :items-per-page="pageSize"
              :page.sync="page"
              hide-default-footer
              loading-text="Xin chờ"
              sort-by="stt"
              no-results-text="Không có dữ liệu thỏa mãn"
              no-data-text="Không có dữ liệu thỏa mãn"
              class="elevation-0 custom_header_table"
              fixed-header
              light
            >
              <template v-slot:top>
                <v-row class="ma-0">
                  <v-spacer></v-spacer>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-text-field
                      outlined
                      hide-details=""
                      dense
                      v-model="Code"
                      label="Mã khách hàng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-text-field
                      hide-details=""
                      outlined
                      dense
                      v-model="fullName"
                      label="Tên khách hàng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-text-field
                      outlined
                      dense
                      label="Mã số thuế"
                      v-model="taxCode"
                      hide-details=""
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-text-field
                      outlined
                      dense
                      label="Số đăng ký kinh doanh"
                      v-model="businessRegistrationNumber"
                      hide-details=""
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-autocomplete
                      outlined
                      no-data-text="Không có dữ liệu"
                      dense
                      hide-details=""
                      :items="listItemsContractType"
                      label="Loại hợp đồng"
                      v-model="contractType"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-text-field
                      v-model="contractNumber"
                      outlined
                      dense
                      label="Số hợp đồng"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label=" Từ ngày"
                          v-on="on"
                          v-model="registerTime"
                          prepend-inner-icon="mdi-calendar-range "
                          dense
                          outlined
                          readonly
                          :error-messages="registerTimeErrors"
                        >
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="menu_date"
                        @change="save_date"
                        locale="vi"
                        @input="menu = false"
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2" class="pr-0 pb-0">
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="Đến ngày"
                          v-on="on"
                          v-model="expiredTime"
                          prepend-inner-icon="mdi-calendar-range "
                          dense
                          outlined
                          readonly
                        >
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="menu_date1"
                        @change="save_date1"
                        locale="vi"
                        @input="menu1 = false"
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2" class="pb-0 pr-0">
                    <v-autocomplete
                      outlined
                      v-model="status1"
                      :items="listStatus"
                      st
                      dense
                      no-data-text="Không có dữ liệu"
                      label="Trạng thái"
                      hide-details=""
                    ></v-autocomplete>
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
                      @click="searchValidate"
                      depressed
                      height="40"
                      >Tìm kiếm
                    </v-btn>
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
              <template v-slot:[`item.fullName`]="{ item }">{{
                item.customerName
              }}</template>
              <template v-slot:[`item.customerCode`]="{ item }">{{
                item.customerCode
              }}</template>
              <template v-slot:[`item.contractType`]="{ item }">
                <v-chip small outlined v-if="item.contractType === 0"
                  >Trả trước</v-chip
                >
                <v-chip small outlined v-if="item.contractType == 1"
                  >Trả sau</v-chip
                >
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip v-if="item.status === 0" small outlined color="grey"
                  >Lưu tạm</v-chip
                >

                <v-chip
                  v-else-if="item.status === 1"
                  small
                  outlined
                  color="warning"
                  >Chờ phê duyệt</v-chip
                >

                <v-chip
                  v-else-if="item.status === 2"
                  small
                  outlined
                  color="green"
                  >Đã phê duyệt</v-chip
                >
                <v-chip
                  v-else-if="item.status === 3"
                  small
                  outlined
                  color="error"
                  >Bị từ chối</v-chip
                >
                <v-chip
                  v-else-if="item.status === 4"
                  small
                  outlined
                  color="error"
                  >Ngừng hoạt động</v-chip
                >
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <!--cập nhật-->
                  <v-tooltip
                    bottom
                    v-if="
                      (item.status == 0 ||
                        item.status == 2 ||
                        item.status == 3) &&
                      updateBtn
                    "
                  >
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
                  <v-tooltip
                    bottom
                    v-if="(item.status == 0 || item.status == 3) && deleteBtn"
                  >
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
                  <v-tooltip bottom v-if="detailBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="confirm_detail(item)"
                        v-on="on"
                        >mdi-eye
                      </v-icon>
                    </template>
                    <span>Chi tiết</span>
                  </v-tooltip>

                  <!--đồng ý phê duyệt-->
                  <v-tooltip bottom v-if="item.status == 1 && approveBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForApproveItem(item)"
                        v-on="on"
                        >mdi-check-bold
                      </v-icon>
                    </template>
                    <span>Đồng ý phê duyệt</span>
                  </v-tooltip>

                  <!--từ chối phê duyệt-->
                  <v-tooltip bottom v-if="item.status == 1 && approveBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForRefuseItem(item)"
                        v-on="on"
                        >mdi-close-circle
                      </v-icon>
                    </template>
                    <span>Từ chối phê duyệt</span>
                  </v-tooltip>

                  <!--KHóa tài khoản-->
                  <v-tooltip bottom v-if="item.status == 2 && lockBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon class="mr-2" @click="askForlLock(item)" v-on="on"
                        >mdi-lock
                      </v-icon>
                    </template>
                    <span>Khóa tài khoản</span>
                  </v-tooltip>

                  <!--Mở tài khoản-->
                  <v-tooltip bottom v-if="item.status == 4 && lockBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForOpenLock(item)"
                        v-on="on"
                        >mdi-lock-open-variant
                      </v-icon>
                    </template>
                    <span>Mở tài khoản</span>
                  </v-tooltip>

                  <!--Reload mật khẩu-->
                  <v-tooltip
                    bottom
                    v-if="(item.status == 2 || item.status == 4) && resetBtn"
                  >
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
            ref="paginationKH"
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
      @success="getListItems"
      :dataItem="dataItem"
      :open="openDialogUpdate"
      @toggle="openDialogUpdate = !openDialogUpdate"
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

    <!-- Hỏi phê duyệt -->
    <alertApprove
      :open="openApprove"
      :alert-msg="message_noti"
      :check="true"
      @toggle="openApprove = !openApprove"
      @OK="approveItem"
    />

    <!-- Hỏi từ chối duyệt -->
    <alertRefuse
      :open="openRefuse"
      :title="message_noti"
      @toggle="openRefuse = !openRefuse"
      @success="getListItems"
      :data="dataDetailItem"
    />

    <!-- Hỏi khóa bản ghi -->
    <alertApprove
      :open="openLook"
      :alert-msg="message_noti"
      :check="true"
      @toggle="openLook = !openLook"
      @OK="LockItem"
    />

    <!-- Hỏi mở khóa bản ghi -->
    <alertApprove
      :open="openBlock"
      :alert-msg="message_noti"
      :check="true"
      @toggle="openBlock = !openBlock"
      @OK="BLockItem"
    />

    <!-- Hỏi reset mật khẩu-->
    <alertApprove
      :open="openReset"
      :alert-msg="message_noti"
      :check="true"
      @toggle="openReset = !openReset"
      @OK="ResetItem"
    />

    <!-- chi tiết -->
    <detail
      :open="opeoDetail"
      :dataItem="dataDetailItem"
      @toggle="opeoDetail = !opeoDetail"
    ></detail>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import moment from 'moment'
import Insert from '~/components/tai-khoan/Insert.vue'
import Update from '~/components/tai-khoan/update.vue'
import alerDelete from '~/components/tai-khoan/YesNoAlert.vue'
import alertApprove from '~/components/tai-khoan/YesNoAlert.vue'
import alertRefuse from '~/components/tai-khoan/YesNoAlert.vue'
import detail from '~/components/tai-khoan/detail.vue'
import Constants from '~/assets/configurations/constant'

export default {
  transition: 'slide-x-transition',
  components: {
    Insert,
    Update,
    alerDelete,
    alertApprove,
    alertRefuse,
    detail,
  },
  data() {
    return {
      registerTimeErrors: [],
      typeCustomer: `${Cookies.get('strListGroup')}`,
      menu: false,
      menu1: false,
      menu_date: moment().startOf('month').format('YYYY-MM-DD'),
      menu_date1: moment().format('YYYY-MM-DD'),
      registerTime: moment().startOf('month').format('DD/MM/YYYY'),
      expiredTime: moment().format('DD/MM/YYYY'),
      taxCode: null,
      resetBtn: null,
      addBtn: null,
      lockBtn: null,
      detailBtn: null,
      updateBtn: null,
      businessRegistrationNumber: null,
      contractType: null,
      deleteBtn: null,
      startDate: null,
      endDate: null,
      approveBtn: null,
      contractNumber: null,
      openDialogInsert: false,
      openDelete: false,
      Code: null,
      fullName: null,
      status1: null,
      UserName: null,
      // openDialogFillter: false,
      openConfirmReset: false,
      dataItem: {},
      openDialogUpdate: false,
      openIPDialog: false,

      userItem: null,
      currentIP: [],
      deleteIP: [],
      editIP: '',
      errorIP: false,
      idxIP: -1,
      showPassword: false,
      message_noti: '',
      units: ['admin', 'employee'],
      listItemsContractType: Constants.System.Customer.listItemsContractType,
      sexs: Constants.System.Customer.sexs,
      listStatus: Constants.System.Customer.listStatus,
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
      pageSize: 15,
      total_item: 0,
      customPage: 1,
      Listitem: [],
      id: null,

      openDetailDialog: false,
      rules: {
        required: (value) => !!value || 'Vui lòng nhập nội dung',
        checkIP: (value) => {
          return this.$isIPAddress(value) || 'Địa chỉ IP sai định dạng.'
        },
      },
    }
  },

  computed: {
    headers() {
      return Constants.System.Customer.header
    },
  },

  watch: {},

  mounted() {
    this.initialize()
    this.addBtn = Cookies.get('strRoles').includes(',42,')
    this.approveBtn = Cookies.get('strRoles').includes(',43,')
    this.updateBtn = Cookies.get('strRoles').includes(',44,')
    this.detailBtn = Cookies.get('strRoles').includes(',45,')
    this.lockBtn = Cookies.get('strRoles').includes(',46,')
    this.resetBtn = Cookies.get('strRoles').includes(',47,')
    this.deleteBtn = Cookies.get('strRoles').includes(',48,')
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
      this.registerTime = moment().startOf('month').format('DD/MM/YYYY')
      this.expiredTime = moment().format('DD/MM/YYYY')
      this.Code = null
      this.fullName = null
      this.status1 = null
    },
    askForResetItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có reset mật khẩu  không?`
      this.openReset = true
    },

    // gọi api reset mật khẩu
    ResetItem() {
      this.$store
        .dispatch('customer/ResetPassword', {
          id: this.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openReset = false
            this.getListItems()
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
            this.getListItems()
            this.$showSuccess(this, 'Khóa bản ghi thành công')
          }
        })
        .catch((errors) => {})
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
            this.getListItems()
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
            this.getListItems()
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
            this.Success()
            this.$showSuccess(this, 'Reset mật khẩu thành công')
          }
        })
        .catch((errors) => {})
    },
    Success() {
      this.getListItems()
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
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.paginationKH.reset()
        this.getListItems()
      }
    },
    changePage(value) {
      this.page = value
      this.getListItems()
    },
    getListItems() {
      this.$store
        .dispatch('customer/getListCustomer', {
          customerCode: this.$isNullOrEmpty(this.Code)
            ? null
            : this.Code.trim(),
          customerName: this.$isNullOrEmpty(this.fullName)
            ? null
            : this.fullName.trim(),
          status: this.status1,
          taxCode: this.$isNullOrEmpty(this.taxCode)
            ? null
            : this.taxCode.trim(),
          businessNumber: this.$isNullOrEmpty(this.businessRegistrationNumber)
            ? null
            : this.businessRegistrationNumber.trim(),
          contractType: this.contractType,
          contractNumber: this.$isNullOrEmpty(this.contractNumber)
            ? null
            : this.contractNumber.trim(),
          strFromDate: this.$isNullOrEmpty(this.registerTime)
            ? null
            : `${this.registerTime} 00:00:00`,
          strToDate: this.$isNullOrEmpty(this.expiredTime)
            ? null
            : `${this.expiredTime} 23:59:59`,
          pageIndex: this.page,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            var dataRes = res.data.data.data
            for (var i = 0; i < dataRes.length; i++) {
              dataRes[i].balanceMoney = this.formatNumber({
                amount: dataRes[i].balanceMoney,
              })
            }
            this.Listitem = dataRes
            this.pageCount = res.data.data.totalPages
          }
        })
        .catch((errors) => {})
    },
    searchValidate() {
      let hasErrors = false
      let fromDate = this.menu_date
      let toDate = this.menu_date1

      if (Date.parse(fromDate) > Date.parse(toDate)) {
        hasErrors = true
        this.registerTimeErrors = ['Từ ngày <= đến ngày']
      }

      if (!hasErrors) {
        this.search()
        this.registerTimeErrors = ''
      }
    },
    search() {
      this.page = 1
      this.getListItems()
    },
    initialize() {
      this.getListItems()
    },

    setSelectedItem(item) {
      this.$store.dispatch('users/setSelectedItem', item)
    },

    setActionUpdate(item) {
      this.$store
        .dispatch('customer/detail', { id: item.id })
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
      ;(this.openDelete = true),
        (this.message_noti = `Bạn có xác nhận xóa bản ghi không?`)
    },
    deleteItem(item) {
      this.$store
        .dispatch('customer/delete', {
          id: this.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openDelete = false
            this.$showSuccess(this, 'Xóa khách hàng thành công')
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
    formatNumber(payload) {
      try {
        const decimalCount = 0
        const thousands = '.'
        const decimal = '.'

        const negativeSign = payload.amount < 0 ? '-' : ''

        const i = parseInt(
          (payload.amount = Math.abs(Number(payload.amount) || 0).toFixed(
            decimalCount
          ))
        ).toString()
        const j = i.length > 3 ? i.length % 3 : 0

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(payload.amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : '')
        )
      } catch (e) {}
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
  },
}
</script>
