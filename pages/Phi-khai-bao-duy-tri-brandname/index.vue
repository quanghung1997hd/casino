<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách phí khai báo, duy trì BrandName
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
                    <v-select
                      :items="listStatus"
                      v-model="status"
                      label="Trạng  thái"
                      dense
                      style="max-width: 200px"
                      hide-details=""
                      outlined
                      class="ml-2 fs-14"
                      no-data-text="Không có dữ liệu"
                    ></v-select>
                    <v-btn
                      class="primary text-none ml-2 mr-2"
                      @click="searchValidate"
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

                    <v-btn
                      v-if="addBtn"
                      class="text-none primary"
                      @click="openAdd = true"
                      height="40"
                      depressed
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
                <v-chip v-if="item.status === 0" small outlined color="red"
                  >Ngừng hoạt động</v-chip
                >
                <v-chip
                  v-if="item.status === 1"
                  small
                  outlined
                  color="successNotify"
                  >Hoạt động</v-chip
                >
              </template>
              <template v-slot:[`item.declarationFee`]="{ item }">
                <div>{{ $formatMoney({ amount: item.declarationFee }) }}</div>
              </template>
              <template v-slot:[`item.maintainingFee`]="{ item }">
                <div>{{ $formatMoney({ amount: item.maintainingFee }) }}</div>
              </template>
              <template v-slot:[`item.customerName`]="{ item }">
                <div v-if="item.customerId === 0">
                  Áp dụng cho tất cả khách hàng
                </div>
                <div v-else>{{ item.customerName }}</div>
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-tooltip bottom v-if="btnUpdate && enableUpdate(item)">
                    <template v-slot:activator="{ on }">
                      <v-icon class="mr-2" @click="askForUpdate(item)" v-on="on"
                        >mdi-border-color
                      </v-icon>
                    </template>
                    <span>Cập nhật</span>
                  </v-tooltip>
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

        <add
          :open="openAdd"
          @toggle="openAdd = !openAdd"
          @success="getList"
        ></add>
        <update
          :open="openUpdate"
          :data="dataDetailItem"
          @toggle="openUpdate = !openUpdate"
          @success="getList"
        ></update>
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
import add from '~/components/Phi-khai-bao-duy-tri-brandname/add.vue'
import update from '~/components/Phi-khai-bao-duy-tri-brandname/update.vue'
import detail from '~/components/Phi-khai-bao-duy-tri-brandname/detail.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    add,
    update,
    detail,
  },
  head() {
    return Constants.System.DeclareBrandname.title
  },
  data: () => ({
    menu: false,
    menu1: false,
    menu_date: moment().startOf('month').format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    registerTime: moment().startOf('month').format('DD/MM/YYYY'),
    expiredTime: moment().format('DD/MM/YYYY'),
    openUpdate: false,
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
    addBtn: null,
    btnDetail: null,
    btnUpdate: null,
    dataDetailItem: {},
    dataDetail: [],
    registerTimeErrors: [],
    status: null,
    message_noti: '',
    listStatus: Constants.System.DeclareBrandname.listStatus,
    headers: Constants.System.DeclareBrandname.headers,
    date: [firstDate, endDate],
    page: 1,
    pageCount: null,
    pageSize: 10,
    total_item: 0,
    isPageSize: 20000,
  }),

  mounted() {
    this.getList()

    this.getListCustomers()
    this.addBtn = Cookies.get('strRoles').includes(',72,')
    this.btnUpdate = Cookies.get('strRoles').includes(',73,')
    this.btnDetail = Cookies.get('strRoles').includes(',74,')
  },

  methods: {
    enableUpdate(item) {
      return item == null ? false : moment(item.timeApplication, 'DD/MM/YYYY') > now
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
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    // reset dữ liệu về ban đầu khi click
    reset() {
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
        this.getList()
      }
    },
    changePage(value) {
      this.page = value
      this.getList()
    },
    getList() {
      this.$store
        .dispatch('maintain/getList', {
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
      this.getList()
    },
    askForUpdate(item) {
      this.openUpdate = true
      this.dataDetailItem = item
    },
    confirm_detail(item) {
      this.dataDetailItem = item
      this.openDetail = true
    },
  },
}
</script>
