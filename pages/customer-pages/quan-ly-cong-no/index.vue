<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách công nợ
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
                    <v-select
                      :items="Listmoth"
                      v-model="moth"
                      label="Tháng"
                      dense
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      hide-details=""
                      outlined
                      no-data-text="Không có dữ liệu"
                    ></v-select>

                    <v-select
                      :items="listStatus"
                      v-model="status"
                      label="Trạng  thái thanh toán"
                      dense
                      style="max-width: 200px"
                      hide-details=""
                      outlined
                      class="ml-2 fs-14"
                      no-data-text="Không có dữ liệu"
                    ></v-select>
                    <v-btn
                      class="primary text-none ml-2 mr-2"
                      @click="search"
                      height="40"
                      depressed
                      >Tìm kiếm</v-btn
                    >
                    <v-btn
                      class="text-none primary mr-2"
                      @click="reset"
                      height="40"
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
                <v-chip v-if="item.status === 0" small outlined color="orange"
                  >Chưa thanh toán</v-chip
                >
                <v-chip v-if="item.status === 1" small outlined color="warning"
                  >Đang thanh toán</v-chip
                >
                <v-chip v-if="item.status === 2" small outlined color="primary"
                  >Đã thanh toán</v-chip
                >
                <v-chip v-if="item.status === 3" small outlined color="grey"
                  >Qúa hạn thanh toán</v-chip
                >
              </template>
              <template v-slot:[`item.totalAmountPaid`]="{ item }">
                <div>{{ $formatMoney({ amount: item.totalAmountPaid }) }}</div>
              </template>
              <template v-slot:[`item.moneyPaid`]="{ item }">
                <div>{{ $formatMoney({ amount: item.moneyPaid }) }}</div>
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

        <detail
          :open="openDetail"
          :data="dataDetailItem"
          @toggle="openDetail = !openDetail"
        ></detail>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment'
import detail from '~/pages/customer-pages/quan-ly-cong-no/detail/detail.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    detail,
  },
  head() {
    return Constants.System.Debt.title
  },
  data: () => ({
    menu: false,
    menu1: false,
    menu_date: moment().format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    registerTime: null,
    btnDetail: null,
    openUpdate: false,
    expiredTime: null,
    openAdd: false,
    openDetail: false,
    openDelete: false,
    openApprove: false,
    openRefuse: false,
    openCancel: false,
    brandname: null,
    Listcutomers: [],
    Listitem: [],
    Listbrandname: [],
    ListBrandnamebyCutomer: [],
    customs: null,
    dataDetailItem: {},
    dataDetail: [],
    status: null,
    message_noti: '',
    moth: null,
    Listmoth: Constants.System.Debt.Listmoth,
    listStatus: Constants.System.Debt.listStatus,

    headers: Constants.System.Debt.headers,
    date: [firstDate, endDate],
    page: 1,
    pageCount: null,
    pageSize: 10,
    total_item: 0,
    isPageSize: 20000,
  }),

  mounted() {
    this.getList()
    this.btnDetail = Cookies.get('strRoles').includes(',99,')
  },

  methods: {
    // reset dữ liệu về ban đầu khi click
    reset() {
      this.status = null
      this.moth = null
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.getList()
      }
    },
    changePage(value) {
      this.page = value
      this.$refs.pagination.reset()
      this.getList()
    },
    getList() {
      this.$store
        .dispatch('debt/getList', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          customerId: `${Cookies.get('customerId')}`,
          monthYear: this.moth,
          status: this.status,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listitem = res.data.data.data
            this.pageCount = res.data.data.totalPages
            this.total_item = res.data.data.totalRecords
          }
        })
        .catch((errors) => {})
    },

    getListCustomers() {
      this.$store
        .dispatch('campaign/customerDataSelectDebt', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            res.data.data.map((item) => {
              if (item.customerName !== null) {
                this.Listcutomers.push(
                  { text: 'Tất cả', value: null },
                  {
                    text: item.customerName,
                    value: item.id,
                  }
                )
              }
            })
          }
        })
    },
    search() {
      this.page = 1
      this.getList()
    },
    confirm_detail(item) {
      this.dataDetailItem = item
      this.openDetail = true
    },
  },
}
</script>
