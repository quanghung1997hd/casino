<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Báo cáo thống kê doanh thu trả trước/trả sau
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="Listitem"
          :items-per-page="itemsPerPage"
          hide-default-footer
          loading-text="Xin chờ"
          sort-by="stt"
          no-results-text="Không có kết quả phù hợp"
          no-data-text="Không có dữ liệu thỏa mãn"
          class="elevation-0 custom_header_table"
          fixed-header
          light
        >
          <template v-slot:top>
            <v-row class="ma-0">
              <v-spacer></v-spacer>
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  v-model="customerId"
                  :items="Listcutomers"
                  @change="brandnameDataSelectOfCustomer(customerId)"
                  outlined
                  dense
                  hide-details=""
                  label="Tên khách hàng"
                  no-data-text="Không có dữ liệu"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  v-model="brandnameId"
                  :items="brandnameSearchSelect"
                  outlined
                  dense
                  hide-details=""
                  label="Tên Brandname"
                  no-data-text="Không có dữ liệu"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-select
                  outlined
                  dense
                  hide-details=""
                  :items="contractTypeSelect"
                  v-model="contractType"
                  label="Loại hợp đồng"
                  no-data-text="Không có dữ liệu"
                ></v-select>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Từ ngày"
                      v-on="on"
                      v-model="fromDate"
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
              <v-col cols="2" class="pr-0">
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
                      v-model="toDate"
                      prepend-inner-icon="mdi-calendar-range "
                      dense
                      outlined
                      readonly
                      :error-messages="expiredTimeErrors"
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
              <v-col class="col-auto pr-0">
                <v-btn
                  class="primary text-none"
                  depressed
                  @click="searchValidate"
                  height="40"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn
                  class="primary text-none"
                  depressed
                  @click="reset"
                  height="40"
                  >Nhập lại</v-btn
                >
              </v-col>
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <!--STT-->
              <td>
                {{ getItemIndex(data.item) }}
              </td>

              <!--Tên khách hàng-->
              <td>
                {{ data.item.customerName }}
              </td>

              <!--Mã khách hàng-->
              <td>
                {{ data.item.customerCode }}
              </td>

              <!--Tên brandname-->
              <td>
                {{ data.item.brandnameName }}
              </td>

              <!--loại hợp đồng-->
              <td>
                {{ data.item.strContract }}
              </td>

              <!--số tiền-->
              <td class="text-center">
                {{ $formatMoney({ amount: data.item.money }) }}
              </td>

              <!--Nguồn thu-->
              <td>
                {{ data.item.reason }}
              </td>

              <!--Ngày thanh toán-->
              <td class="text-center">
                {{ data.item.strCreatedAt }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </client-only>
      <v-row class="ma-0">
        <v-col cols="3" class="mt-1 pr-0">
          <btn-export
            v-if="exportBtn"
            :items="Listitem"
            @export-file="reportRevenueFile"
            :loading="loading"
          >
            Xuất file excel
          </btn-export>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
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
        </v-col>
      </v-row>
    </CardGlobal>
    <Search
      :open="openDialogSearchMore"
      @toggle="openDialogSearchMore = !openDialogSearchMore"
    ></Search>
  </div>
</template>
<style lang="scss" scoped>
.v-menu__content {
  top: 20.2% !important;
}
</style>

<script>
import Search from '~/components/bao-cao/bao-cao-thong-ke-truong-trinh-tin-nhan/Search.vue'
import moment from 'moment'
import URL from '~/assets/configurations/BASE_URL'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'
export default {
  components: {
    Search,
  },
  data() {
    return {
      loading: false,
      openDialogSearchMore: false,
      Listitem: [],
      itemsPerPage: 50,
      date: [
        moment().clone().startOf('month').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      Listcutomers: [],
      contractTypeSelect: Constants.System.Report.contractTypeSelect,
      brandnameSearchSelect: [],
      paymentStatusSelect: Constants.System.Report.paymentStatusSelect,
      pageCount: 1,
      page: 1,
      customerId: null,
      brandnameId: null,
      paymentStatus: null,
      customerStatus: null,
      exportBtn: null,
      contractType: null,
      registerTimeErrors: [],
      expiredTimeErrors: [],
      pageSize: 10,
      total_item: 0,
      menu: false,
      menu1: false,
      menu_date: moment().startOf('month').format('YYYY-MM-DD'),
      menu_date1: moment().format('YYYY-MM-DD'),
      fromDate: moment().startOf('month').format('DD/MM/YYYY'),
      toDate: moment().format('DD/MM/YYYY'),
    }
  },
  mounted() {
    this.revenueReport()
    this.getListCustomers()
    this.brandnameDataSelectOfCustomer()
    this.exportBtn = Cookies.get('strRoles').includes(',78,')
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

      if (
        (parseInt(this.toDate.split('/')[1]) -
          parseInt(this.fromDate.split('/')[1]) >=
          3 &&
          parseInt(this.toDate.split('/')[2]) -
            parseInt(this.fromDate.split('/')[2]) ==
            0) ||
        parseInt(this.toDate.split('/')[2]) -
          parseInt(this.fromDate.split('/')[2]) !=
          0
      ) {
        hasErrors = true
        this.expiredTimeErrors = ['Khoảng cách không được lớn hơn 3 tháng']
      }

      if (!hasErrors) {
        this.search()
        this.registerTimeErrors = ''
        this.expiredTimeErrors = ''
      }
    },

    save_date(date) {
      this.fromDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.toDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    revenueReport() {
      let data = {
        pageIndex: this.page,
        pageSize: this.pageSize,
        customerId: this.customerId,
        brandnameId: this.brandnameId,
        contractType: this.contractType,
        strFromDate: this.$isNullOrEmpty(this.fromDate)
          ? null
          : `${this.fromDate} 00:00:00`,
        strToDate: this.$isNullOrEmpty(this.toDate)
          ? null
          : `${this.toDate} 23:59:59`,
      }
      this.$store
        .dispatch('report/reportRevenue', data)
        .then((res) => {
          if (!res.error) {
            this.Listitem = res.data.data.data
            this.pageCount = res.data.data.totalPages
            this.total_item = res.data.data.totalRecords
          }
        })
        .catch((errors) => {})
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
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
    brandnameDataSelectOfCustomer(customerId) {
      let data = {
        customerId: customerId,
      }
      this.$store
        .dispatch('brandname/dataSelectAllOfCustomer', {
          customerId: customerId,
        })
        .then((res) => {
          if (!res.error) {
            this.brandnameSearchSelect = [
              {
                text: 'Tất cả',
                value: null,
              },
            ]
            res.data.data.map((item) => {
              this.brandnameSearchSelect.push({
                text: item.brandnameName,
                value: item.id,
              })
            })
            this.brandnameId = null
          }
        })
    },
    search() {
      this.page = 1
      this.revenueReport()
    },
    reset() {
      this.customerId = null
      this.brandnameId = null
      this.brandnameSearchSelect = []
      this.registerTimeErrors = []
      this.expiredTimeErrors = []
      this.status = null
      this.contractType = null
      this.fromDate = moment().startOf('month').format('DD/MM/YYYY')
      this.toDate = moment().format('DD/MM/YYYY')
      this.brandnameDataSelectOfCustomer()
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.revenueReport()
      }
    },
    changePage(value) {
      this.page = value
      this.revenueReport()
    },
    reportRevenueFile() {
      this.loading = true
      let data = {
        customerId: this.customerId,
        brandnameId: this.brandnameId,
        contractType: this.contractType,
        strFromDate: this.fromDate,
        strToDate: this.toDate,
      }

      var urlBase = `${URL.BASE}`
      if (!urlBase.endsWith('/')) urlBase += '/'
      var linkDownload = urlBase + `downloadFile/reportRevenueFile`
      linkDownload += '?strFromDate=' + data.strFromDate
      linkDownload += '&strToDate=' + data.strToDate
      if (data.customerId != null && data.customerId != undefined) {
        linkDownload += '&customerId=' + data.customerId
      }
      if (data.brandnameId != null && data.brandnameId != undefined) {
        linkDownload += '&brandnameId=' + data.brandnameId
      }
      if (data.contractType != null && data.contractType != undefined) {
        linkDownload += '&contractType=' + data.contractType
      }
      window.location.href = linkDownload
      this.loading = false
    },
  },
  transition: 'slide-x-transition',
  computed: {
    headers() {
      return Constants.System.Report.headerRevenue
    },
  },
}
</script>
