<template>
  <div>
    <client-only>
      <CardGlobal>
        <div
          style="font-size: 1.3rem; font-weight: 500"
          class="pa-1 primary--text"
        >
          Danh sách đơn hàng
        </div>
      </CardGlobal>
      <v-row class="ma-0">
        <v-col cols="12" class="pb-0 px-0">
          <v-card class="w-100" flat>
            <client-only>
              <v-data-table
                :headers="headers"
                :items="dataTable"
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
                        v-model="codeCustomer"
                        label="Mã khách hàng"
                        dense
                        style="max-width: 200px"
                        class="mr-2 fs-14"
                        hide-details=""
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="customs"
                        label="Tên khách hàng"
                        dense
                        style="max-width: 200px"
                        class="mr-2 fs-14"
                        hide-details=""
                        outlined
                      ></v-text-field>
                      <v-text-field
                        dense
                        style="max-width: 200px"
                        hide-details=""
                        class="mr-2 fs-14"
                        v-model="codeTax"
                        label="Mã số thuế"
                        outlined
                      >
                      </v-text-field>
                      <v-text-field
                        dense
                        style="max-width: 200px"
                        hide-details=""
                        class="mr-2 fs-14"
                        v-model="codeOrder"
                        label="Mã đơn hàng"
                        outlined
                      >
                      </v-text-field>
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
                            dense
                            outlined
                            readonly
                            label="Từ ngày"
                            v-on="on"
                            v-model="registerTime"
                            prepend-inner-icon="mdi-calendar-range "
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
                            dense
                            outlined
                            readonly
                            class="pl-2"
                            label="Đến ngày"
                            v-on="on"
                            v-model="expiredTime"
                            prepend-inner-icon="mdi-calendar-range "
                          />
                        </template>

                        <v-date-picker
                          v-model="menu_date1"
                          @change="save_date1"
                          locale="vi"
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                      <v-autocomplete
                        outlined
                        dense
                        :items="listRechargeform"
                        v-model="rechargeform"
                        label="Hình thức nạp tiền"
                        style="max-width: 200px"
                        class="mx-2 fs-14"
                        hide-details=""
                        no-data-text="Không có dữ liệu"
                      />

                      <v-autocomplete
                        dense
                        outlined
                        :items="listStatus"
                        v-model="status"
                        label="Trạng thái"
                        style="max-width: 200px"
                        class="fs-14"
                        hide-details=""
                        no-data-text="Không có dữ liệu"
                      />

                      <v-btn
                        class="primary text-none mx-2"
                        @click="searchValidate"
                        depressed
                        height="40"
                        >Tìm kiếm</v-btn
                      >

                      <v-btn
                        class="text-none primary mr-2"
                        height="40"
                        @click="reset"
                        depressed
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

                <template v-slot:[`item.customerName`]="{ item }">
                  <div v-if="!$isNullOrEmpty(item.customerName)">
                    {{ item.customerName }}
                  </div>
                </template>

                <template v-slot:[`item.customerCode`]="{ item }">
                  <div v-if="!$isNullOrEmpty(item.customerCode)">
                    {{ item.customerCode }}
                  </div>
                </template>

                <template v-slot:[`item.infoTransfer`]="{ item }">
                  <div v-if="!$isNullOrEmpty(item.accountNumber)">
                    Số tài khoản: {{ item.accountNumber }}
                  </div>

                  <div v-if="!$isNullOrEmpty(item.bankName)">
                    Tên ngân hàng: {{ item.bankName }}
                  </div>
                </template>

                <template v-slot:[`item.orderPrice`]="{ item }">
                  <div>{{ $formatMoney({ amount: item.orderPrice }) }}</div>
                </template>

                <template v-slot:[`item.transfer`]="{ item }">
                  <v-chip outlined small v-if="item.transfer === 1">
                    Chuyển khoản</v-chip
                  >
                </template>

                <template v-slot:[`item.status`]="{ item }">
                  <v-chip small outlined color="green" v-if="item.status === 1"
                    >Đã phê duyệt</v-chip
                  >

                  <v-chip
                    small
                    outlined
                    color="warning"
                    v-if="item.status === 0"
                    >Chờ phê duyệt</v-chip
                  >

                  <v-chip
                    v-if="item.status === -1"
                    small
                    outlined
                    color="error"
                  >
                    Bị từ chối
                  </v-chip>

                  <v-chip v-if="item.status === -2" small outlined color="error"
                    >Đã hủy</v-chip
                  >
                </template>

                <template v-slot:[`item.action`]="{ item }">
                  <div class="d-flex align-center justify-center">
                    <v-tooltip bottom v-if="btnDetail">
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
                          >mdi-close-circle
                        </v-icon>
                      </template>
                      <span>Từ chối phê duyệt</span>
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
          <add
            :open="openAdd"
            @toggle="openAdd = !openAdd"
            @success="getList"
          ></add>
          <!-- chi tiết -->
          <detail
            :open="opeoDetail"
            :data="dataDetailItem"
            @toggle="opeoDetail = !opeoDetail"
          ></detail>

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
            @success="getList"
            :data="dataDetailItem"
          />
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import moment from 'moment'
import add from '~/components/don-hang/noi-bo/add.vue'
import detail from '~/components/don-hang/noi-bo/detail.vue'
import alertApprove from '~/components/don-hang/noi-bo/YesNoAlert.vue'
import alertRefuse from '~/components/don-hang/noi-bo/YesNoAlert.vue'
import Constants from '~/assets/configurations/constant'

const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    add,
    detail,
    alertApprove,
    alertRefuse,
  },
  head() {
    return Constants.System.Orders.title
  },
  data: () => ({
    typeCustomer: `${Cookies.get('strListGroup')}`,
    menu: false,
    menu1: false,
    menu_date: moment().startOf('month').format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    openAdd: false,
    registerTime: moment().startOf('month').format('DD/MM/YYYY'),
    expiredTime: moment().format('DD/MM/YYYY'),
    opeoDetail: false,
    addBtn: null,
    btnDetail: null,
    openApprove: false,
    openRefuse: false,
    approveBtn: null,
    brandname: null,
    Listcutomers: [],
    dataTable: [],
    Listbrandname: [],
    ListBrandnamebyCutomer: [],
    registerTimeErrors: [],

    dataDetailItem: {},
    status: null,
    message_noti: '',
    codeCustomer: null,
    customs: null,
    codeTax: null,
    codeOrder: null,
    advertisement: null,
    rechargeform: null,
    listAdvertisement: [],
    listRechargeform: Constants.System.Orders.listRechargeform,
    listStatus: Constants.System.Orders.listStatus,
    headers: Constants.System.Orders.headers,
    date: [firstDate, endDate],
    page: 1,
    pageCount: null,
    pageSize: 15,
    total_item: 1,
    isPageSize: 20000,
  }),

  mounted() {
    this.getList()
    this.listTypeSms()
    this.addBtn = Cookies.get('strRoles').includes(',82,')
    this.approveBtn = Cookies.get('strRoles').includes(',84,')
    this.btnDetail = Cookies.get('strRoles').includes(',83,')
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

    //xóa item khi click
    askForApproveItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận phê duyệt bản ghi không?`
      this.openApprove = true
    },

    askForRefuseItem(item) {
      this.dataDetailItem = item
      this.message_noti = `Từ chối duyệt đơn hàng này?`
      this.openRefuse = true
    },
    listTypeSms() {
      this.$store.dispatch('order/listTypeSms', {}).then((res) => {
        if (res.data.error.code === 0) {
          this.listAdvertisement.push(
            {
              name: 'Tất cả',
              id: null,
            },
            ...res.data.data
          )
        }
      })
    },
    // gọi api phê duyệt
    approveItem() {
      this.$store
        .dispatch('order/approve', {
          id: this.id,
          status: 1,
          refuseContent: null,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openApprove = false
            this.getList()
            this.$showSuccess(this, 'Phê duyệt thành công')
          }
        })
        .catch((errors) => {})
    },

    // reset dữ liệu về ban đầu khi click
    reset() {
      this.codeCustomer = null
      this.customs = null
      this.codeTax = null
      this.codeOrder = null
      this.advertisement = null
      this.rechargeform = null
      this.status = null
      this.registerTime = moment().startOf('month').format('DD/MM/YYYY')
      this.expiredTime = moment().format('DD/MM/YYYY')
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.dataTable.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.pagination.reset()
        this.getList()
      }
    },
    changePage(value) {
      this.page = value
      this.getList()
    },
    getList() {
      this.$store
        .dispatch('order/getList', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          customerCode: !this.$isNullOrEmpty(this.codeCustomer)
            ? this.codeCustomer.trim()
            : null,
          nameCustomer: !this.$isNullOrEmpty(this.customs)
            ? this.customs.trim()
            : null,
          taxCode: !this.$isNullOrEmpty(this.codeTax)
            ? this.codeTax.trim()
            : null,
          orderCode: !this.$isNullOrEmpty(this.codeOrder)
            ? this.codeOrder.trim()
            : null,
          strFromDate: this.$isNullOrEmpty(this.registerTime)
            ? null
            : `${this.registerTime} 00:00:00`,
          strToDate: this.$isNullOrEmpty(this.expiredTime)
            ? null
            : `${this.expiredTime} 23:59:59`,
          typeSms: this.advertisement,
          transfer: this.rechargeform,
          status: this.status,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.dataTable = res.data.data.data
            this.pageCount = res.data.data.totalPages
            this.total_item = res.data.data.totalRecords
          }
        })
        .catch((errors) => {})
    },

    search() {
      this.page = 1
      this.getList()
    },
    confirm_detail(item) {
      this.$store
        .dispatch('order/detail', {
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
  },
}
</script>
