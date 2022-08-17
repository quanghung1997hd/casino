<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách Brandname
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
                <v-app-bar class="pt-3 mb-5" flat color="#fff">
                  <div class="flex-grow-1"></div>
                  <v-spacer></v-spacer>
                  <div class="d-flex py-4">
                    <v-text-field
                      dense
                      style="max-width: 200px"
                      hide-details=""
                      class="mr-2 fs-14"
                      v-model="brandname"
                      label="Tên brandname"
                      outlined
                      clearable
                    >
                    </v-text-field>

                    <v-select
                      :items="listStatus"
                      v-model="status"
                      label="Trạng thái"
                      dense
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      hide-details=""
                      outlined
                      no-data-text="Không có dữ liệu"
                    ></v-select>
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="Từ ngày"
                          v-on="on"
                          v-model="registerTime"
                          prepend-inner-icon="mdi-calendar-range "
                          :error-messages="registerTimeErrors"
                          dense
                          outlined
                          readonly
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
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
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
                          class="pl-2"
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

                    <v-btn
                      class="primary text-none ml-6 mr-2"
                      @click="searchValidate"
                      depressed
                      >Tìm kiếm</v-btn
                    >
                    <v-btn
                      class="text-none primary mr-2"
                      @click="reset"
                      depressed
                      >Nhập lại</v-btn
                    >
                  </div>
                </v-app-bar>
              </template>
              <template v-slot:[`item.stt`]="{ item }">
                <div class="d-flex align-center justify-center">
                  {{ getItemIndex(item) }}
                </div>
              </template>

              <template v-slot:[`item.status`]="{ item }">
                <v-chip v-if="item.status === -1" small outlined color="red"
                  >Ngừng hoạt động</v-chip
                >

                <v-chip v-if="item.status === 1" small outlined color="green"
                  >Đã phê duyệt</v-chip
                >

                <v-chip
                  v-bind="attrs"
                  v-on="on"
                  v-if="item.status === 0"
                  small
                  outlined
                  color="warning"
                  >Chờ phê duyệt</v-chip
                >
                <v-chip v-if="item.status === -2" small outlined color="error"
                  >Bị từ chối</v-chip
                >
              </template>
              <template v-slot:[`item.accountDepartment`]="{ item }">
                <div v-if="item.accountDepartment.department !== null">
                  {{ item.accountDepartment.department.fullName }}
                </div>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-tooltip bottom v-if="detailBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="confirm_detail(item)"
                        v-on="on"
                        color="primary"
                        >mdi-eye
                      </v-icon>
                    </template>
                    <span>Chi tiết</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="item.status === 1 && cancelBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForCaneItem(item)"
                        v-on="on"
                        color="red"
                        >mdi-cancel
                      </v-icon>
                    </template>
                    <span>Ngừng hoạt động</span>
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
        <!-- thêm -->

        <!-- chi tiết -->
        <detail
          :open="opeoDetail"
          :data="dataDetailItem"
          @toggle="opeoDetail = !opeoDetail"
        ></detail>
        <!--  hỏi xóa -->

        <!-- Hỏi ngừng hoạt động -->
        <alertCancel
          :open="openCancel"
          :alert-msg="message_noti"
          :check="true"
          @toggle="openCancel = !openCancel"
          @OK="approveCancel"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment'

import detail from '~/components/Brandname/khach-hang/detail.vue'
import Cookies from 'js-cookie'
import alertCancel from '~/components/Brandname/khach-hang/YesNoAlert.vue'
import Constants from '~/assets/configurations/constant'
const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    detail,
    alertCancel,
  },
  head() {
    return Constants.System.Brandname.title
  },
  data: () => ({
    menu: false,
    menu1: false,
    menu_date: moment().startOf('month').format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    registerTime: moment().startOf('month').format('DD/MM/YYYY'),
    expiredTime: moment().format('DD/MM/YYYY'),
    openAdd: false,
    opeoDetail: false,
    openDelete: false,
    openApprove: false,
    openRefuse: false,
    openCancel: false,
    brandname: null,
    detailBtn: null,
    cancelBtn: null,
    Listcutomers: [],
    registerTimeErrors: [],
    Listitem: [],
    Listbrandname: [],
    customs: null,
    dataDetailItem: {},
    status: null,
    message_noti: '',
    listStatus: Constants.System.Brandname.listStatus,
    headers: Constants.System.Brandname.headers,
    date: [firstDate, endDate],
    page: 1,
    pageCount: null,
    pageSize: 10,
    total_item: 0,
    isPageSize: 20000,
  }),

  mounted() {
    this.getListBrandname()
    this.detailBtn = Cookies.get('strRoles').includes(',94,')
    this.cancelBtn = Cookies.get('strRoles').includes(',93,')
  },

  methods: {
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    searchValidate() {
      let hasErrors = false
      if (this.registerTime > this.expiredTime) {
        hasErrors = true
        this.registerTimeErrors = ['Từ ngày <= đến ngày']
      }

      if (!hasErrors) {
        this.search()
        this.registerTimeErrors = ''
      }
    },
    askForCaneItem(item) {
      this.id = item.id

      this.message_noti = `Bạn có xác nhận ngừng hoạt động Brandname không?`
      this.openCancel = true
    },
    askForRefuseItem(item) {
      this.dataDetailItem = item
      this.message_noti = `Từ chối duyệt Brandname?`
      this.openRefuse = true
    },

    approveCancel() {
      this.$store
        .dispatch('brandname/acceptBrandnameCustomer', {
          id: this.id,
          status: -1,
          refusal: null,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openApprove = false
            this.$showSuccess(this, 'Ngừng hoạt động thành công')
            this.getListBrandname()
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    // reset dữ liệu về ban đầu khi click
    reset() {
      this.brandname = null
      this.customs = null
      this.status = null
      this.registerTime = moment().startOf('month').format('DD/MM/YYYY')
      this.expiredTime = moment().format('DD/MM/YYYY')
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.getListBrandname()
      }
    },
    changePage(value) {
      this.page = value
      // this.$refs.pagination.reset()
      this.getListBrandname()
    },
    getListBrandname() {
      this.$store
        .dispatch('brandname/getList', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          name: !this.$isNullOrEmpty(this.brandname)
            ? this.brandname.trim()
            : null,
          strFromDate: this.$isNullOrEmpty(this.registerTime)
            ? null
            : `${this.registerTime} 00:00:00`,
          strToDate: this.$isNullOrEmpty(this.expiredTime)
            ? null
            : `${this.expiredTime} 23:59:59`,
          status: this.status,
          customerId: Cookies.get('userId'), // id khách hàng đăng nhập vào hệ thống
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listitem = res.data.data.data
            this.pageCount = res.data.data.totalPages
            this.total_item = res.data.data.totalRecords
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },

    search() {
      this.page = 1
      this.getListBrandname()
    },
    confirm_detail(item) {
      this.$store
        .dispatch('brandname/detail', {
          id: item.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.dataDetailItem = res.data.data
            this.opeoDetail = true
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
  },
}
</script>
