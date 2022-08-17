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
              :page.sync="page"
              hide-default-footer
              loading-text="Xin chờ"
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
                    <v-autocomplete
                      :items="Listcutomers"
                      v-model="customs"
                      label="Tên khách hàng"
                      dense
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      hide-details=""
                      outlined
                      no-data-text="Không có dữ liệu"
                      @change="Cutomers(customs)"
                      @click:clear="brandname = null"
                    ></v-autocomplete>
                    <v-autocomplete
                      dense
                      style="max-width: 200px"
                      hide-details=""
                      class="mr-2 fs-14"
                      v-model="brandname"
                      :items="ListBrandnamebyCutomer"
                      label="Tên brandname"
                      outlined
                      item-value="id"
                      item-text="brandnameName"
                      no-data-text="Không có dữ liệu "
                    >
                    </v-autocomplete>

                    <v-autocomplete
                      :items="listStatus"
                      v-model="status"
                      label="Trạng thái"
                      dense
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      hide-details=""
                      outlined
                      no-data-text="Không có dữ liệu"
                    ></v-autocomplete>
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
                      ></v-date-picker>
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
                      ></v-date-picker>
                    </v-menu>

                    <v-btn
                      class="primary text-none mx-2"
                      @click="searchValidate"
                      depressed
                      height="40"
                      >Tìm kiếm</v-btn
                    >
                    <v-btn
                      class="text-none primary mr-2"
                      @click="resetFilter"
                      depressed
                      height="40"
                      >Nhập lại</v-btn
                    >

                    <v-btn
                      v-if="addBtn"
                      class="text-none primary"
                      @click="openAdd = true"
                      depressed
                      height="40"
                      >Thêm mới</v-btn
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
                <v-chip v-if="item.status === 0" small outlined color="warning"
                  >Chờ phê duyệt
                </v-chip>
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
                        >mdi-eye
                      </v-icon>
                    </template>
                    <span>Chi tiết</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="item.status === 1 && approveBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForCaneItem(item)"
                        v-on="on"
                        >mdi-cancel
                      </v-icon>
                    </template>
                    <span>Ngừng hoạt động</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="item.status === 0 && approveBtn">
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
                  <v-tooltip bottom v-if="item.status === 0 && approveBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForRefuseItem(item)"
                        v-on="on"
                        >mdi-close-thick
                      </v-icon>
                    </template>
                    <span>Từ chối phê duyệt</span>
                  </v-tooltip>
                  <v-tooltip
                    bottom
                    v-if="
                      (item.status === -1 || item.status === -2) && deleteBtn
                    "
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForDeleteItem(item)"
                        v-on="on"
                        >mdi-delete
                      </v-icon>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </client-only>
          <pagination
            class="px-0 pt-3 pb-3"
            ref="PaginationBN"
            :pageCount="pageCount"
            :page="page"
            :pageSize="pageSize"
            @changePage="changePage"
            @changePageSize="changePageSize"
            depressed="true"
          ></pagination>
        </v-card>
        <!-- thêm -->
        <add
          :open="openAdd"
          @toggle="openAdd = !openAdd"
          @success="getListBrandname()"
        ></add>
        <!-- chi tiết -->
        <detail
          :open="opeoDetail"
          :data="dataDetailItem"
          @toggle="opeoDetail = !opeoDetail"
        ></detail>
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
        <!-- Hỏi ngừng hoạt động -->
        <alertCancel
          :open="openCancel"
          :alert-msg="message_noti"
          :check="true"
          @toggle="openCancel = !openCancel"
          @OK="approveCancel"
        />
        <!-- Hỏi từ chối duyệt -->
        <alertRefuse
          :open="openRefuse"
          :title="message_noti"
          @toggle="openRefuse = !openRefuse"
          @success="getListBrandname"
          :data="dataDetailItem"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import moment from 'moment'
import add from '~/components/Brandname/noi-bo/add.vue'
import detail from '~/components/Brandname/noi-bo/detail.vue'
import alertApprove from '~/components/Brandname/noi-bo/YesNoAlert.vue'
import alertRefuse from '~/components/Brandname/noi-bo/YesNoAlert.vue'
import alerDelete from '~/components/Brandname/noi-bo/YesNoAlert.vue'
import alertCancel from '~/components/Brandname/noi-bo/YesNoAlert.vue'
import Constants from '~/assets/configurations/constant'
const now = new Date()
const firstDate = moment(now).format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    add,
    detail,
    alertApprove,
    alertRefuse,
    alerDelete,
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
    typeCustomer: `${Cookies.get('strListGroup')}`,
    openAdd: false,
    opeoDetail: false,
    openDelete: false,
    openApprove: false,
    openRefuse: false,
    openCancel: false,
    brandname: null,
    Listcutomers: [],
    Listitem: [],
    Listbrandname: [],
    ListBrandnamebyCutomer: [],
    registerTimeErrors: [],
    customs: null,
    detailBtn: null,
    approveBtn: null,
    deleteBtn: null,
    dataDetailItem: {},
    status: null,
    addBtn: null,
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
    this.getListCustomers()
    this.getListBrandnamebyCutomer()
    this.detailBtn = Cookies.get('strRoles').includes(',53,')
    this.addBtn = Cookies.get('strRoles').includes(',50,')
    // this.cancelBtn = Cookies.get('strRoles').includes(",52,")
    this.approveBtn = Cookies.get('strRoles').includes(',52,')
    this.deleteBtn = Cookies.get('strRoles').includes(',51,')
  },

  methods: {
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
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    Cutomers(value) {
      this.getListBrandnamebyCutomer(value)
    },
    //xóa item khi click
    askForDeleteItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận xóa bản ghi không?`
      this.openDelete = true
    },
    askForApproveItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận phê duyệt bản ghi không?`
      this.openApprove = true
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
    // gọi api xóa

    deleteItem() {
      this.$store
        .dispatch('brandname/deleteItem', {
          id: this.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openDelete = false
            this.$showSuccess(this, 'Xóa bradname thành công')
            this.getListBrandname()
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    // gọi api phê duyệt
    approveItem() {
      this.$store
        .dispatch('brandname/approveItem', {
          id: this.id,
          status: 1,
          refusal: null,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            if (res.data.data.resultCode == 0) {
              this.$showWarnNotify(this, res.data.data.message)
            } else {
              this.$showSuccess(this, res.data.data.message)
              this.getListBrandname()
            }
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },

    approveCancel() {
      this.$store
        .dispatch('brandname/approveItem', {
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
    resetFilter() {
      this.brandname = null
      this.customs = null
      this.status = null
      this.registerTime = moment().startOf('month').format('DD/MM/YYYY')
      this.expiredTime = moment().format('DD/MM/YYYY')
      this.getListBrandnamebyCutomer()
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.PaginationBN.reset()
        this.getListBrandname()
      }
    },
    changePage(value) {
      this.page = value
      this.getListBrandname()
    },
    getListBrandname() {
      const data = {
        pageIndex: this.page,
        pageSize: this.pageSize,
        customerId: this.customs,
        strFromDate: this.$isNullOrEmpty(this.registerTime)
          ? null
          : `${this.registerTime} 00:00:00`,
        strToDate: this.$isNullOrEmpty(this.expiredTime)
          ? null
          : `${this.expiredTime} 23:59:59`,
        status: this.status,
        id: this.brandname,
      }
      this.$store
        .dispatch('brandname/getListBrandname', data)
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
    getListBrandnamebyCutomer(value) {
      this.$store
        .dispatch('campaign/dataSelectAllOfCustomer', {
          customerId: value,
        })

        .then((res) => {
          if (res.data.error.code === 0) {
            this.ListBrandnamebyCutomer = [
              {
                brandnameName: 'Tất cả',
                id: null,
              },
            ]

            res.data.data.forEach((brandnameOptions) => {
              this.ListBrandnamebyCutomer.push(brandnameOptions)
            })
          }
        })
    },
    getListCustomers() {
      this.$store.dispatch('campaign/customerDataSelectAll', {}).then((res) => {
        if (res.data.error.code === 0) {
          this.Listcutomers = [
            {
              text: 'Tất cả',
              value: null,
            },
          ]
          res.data.data.map((item) => {
            if (item.customerName !== null) {
              this.Listcutomers.push({
                text: item.customerName,
                value: item.id,
              })
            }
          })
        }
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
