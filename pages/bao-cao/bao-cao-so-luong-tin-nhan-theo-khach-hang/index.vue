<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Báo cáo số lượng tin nhắn theo khách hàng
      </div>
    </CardGlobal>

    <CardGlobal class="mt-2">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="Listitem"
          :items-per-page="pageSize"
          hide-default-footer
          loading-text="Xin chờ"
          sort-by="stt"
          no-results-text="Không có kết quả phù hợp"
          no-data-text="Không có bản ghi nào"
          class="elevation-0 custom_header_table"
          fixed-header
          light
        >
          <template v-slot:top>
            <v-row class="ma-0">
              <v-spacer></v-spacer>
              <div class="d-flex py-4">
                <v-autocomplete
                  v-model="customerIdSelected"
                  :items="customerSearchOptions"
                  outlined
                  dense
                  hide-details=""
                  label="Tên khách hàng"
                  no-data-text="Không có dữ liệu"
                  @change="Cutomers(customerIdSelected)"
                  @click:clear="brandname = null"
                  class="mr-2"
                  style="max-width: 200px"
                ></v-autocomplete>

                <v-autocomplete
                  v-model="brandnameIdSelected"
                  :items="brandnameSearchOptions"
                  outlined
                  dense
                  hide-details=""
                  label="Tên brandname"
                  no-data-text="Không có dữ liệu"
                  class="mr-2"
                  style="max-width: 200px"
                ></v-autocomplete>
                <v-autocomplete
                  v-model="smsIdSelected"
                  :items="smsSearchOptions"
                  outlined
                  dense
                  hide-details=""
                  label="Loại tin nhắn"
                  no-data-text="Không có dữ liệu"
                  class="mr-2"
                  style="max-width: 200px"
                ></v-autocomplete>

                <v-menu
                  v-model="fromTimeSearchOptions"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Thời gian từ ngày"
                      v-on="on"
                      v-model="fromTimeSelected"
                      :error-messages="fromTimeSelectedErrors"
                      prepend-inner-icon="mdi-calendar-range "
                      dense
                      outlined
                      readonly
                    >
                    </v-text-field>
                  </template>

                  <v-date-picker
                    v-model="menuFromTime"
                    @change="saveFromTime"
                    locale="vi"
                    @input="fromTimeSearchOptions = false"
                  >
                  </v-date-picker>
                </v-menu>
                <v-menu
                  v-model="toTimeSearchOptions"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Thời gian đến ngày"
                      v-on="on"
                      v-model="toTimeSelected"
                      prepend-inner-icon="mdi-calendar-range "
                      dense
                      outlined
                      readonly
                      class="pl-2"
                      :error-messages="expiredTimeErrors"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="menuToTime"
                    @change="saveToTime"
                    locale="vi"
                    @input="toTimeSearchOptions = false"
                  >
                  </v-date-picker>
                </v-menu>

                <v-btn
                  class="text-none primary ml-2 mr-2"
                  height="40"
                  @click="searchValidate"
                  depressed
                  >Tìm kiếm
                </v-btn>

                <v-btn
                  class="text-none primary mr-2"
                  height="40"
                  @click="reset"
                  depressed
                  >Nhập lại
                </v-btn>
              </div>
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <td>{{ getItemIndex(data.item) }}</td>
              <td class="">{{ data.item.customerName }}</td>
              <td>{{ data.item.customerCode }}</td>
              <td class="">{{ data.item.typeSmsName }}</td>
              <td class="">{{ data.item.brandnameName }}</td>
              <td class="text-center">{{ data.item.startTime }}</td>
              <td class="text-center">{{ data.item.totalSms }}</td>
              <td class="text-center">{{ data.item.totalSmsSuccess }}</td>
              <td class="text-center">{{ data.item.totalSmsFail }}</td>
              <td class="text-center">{{ data.item.totalSmsUnsent }}</td>
            </tr>
          </template>
        </v-data-table>
      </client-only>
      <v-row class="ma-0">
        <v-col cols="3" class="mt-1 pr-0">
          <btn-export
            v-if="exportBtn"
            :items="Listitem"
            textContent="Xuất file excel"
            :loading="loading"
            @export-file="reportExportInside"
          >
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
  </div>
</template>

<script>
import moment from 'moment'
import URL from '~/assets/configurations/BASE_URL'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

export default {
  data() {
    return {
      URL,
      loading: false,
      fromTimeSelectedErrors: [],
      fromTimeSelected: moment().startOf('month').format('DD/MM/YYYY'),
      toTimeSelected: moment().format('DD/MM/YYYY'),
      menuFromTime: moment().startOf('month').format('YYYY-MM-DD'),
      menuToTime: moment().format('YYYY-MM-DD'),
      openDialogSearchMore: false,
      Listitem: [],
      page: 1,
      pageCount: 10,
      pageSize: 10,
      total_item: 0,
      isPageSize: 20000,
      customPage: 1,
      fromTimeSearchOptions: false,
      toTimeSearchOptions: false,
      date: moment().format('YYYY-MM'),
      customerSearchOptions: [
        {
          text: 'Tất cả',
          value: null,
        },
      ],
      customerIdSelected: null,
      exportBtn: null,
      brandnameSearchOptions: [],
      brandnameIdSelected: null,
      smsIdSelected: null,
      smsSearchOptions: [],
      expiredTimeErrors: [],
    }
  },
  transition: 'slide-x-transition',

  mounted() {
    this.campaignReport()
    this.getListCustomers()
    this.getListBrandnamebyCutomer(null)
    this.typeSmsSelectData()
    this.exportBtn = Cookies.get('strRoles').includes(',77,')
  },

  methods: {
    searchValidate() {
      let hasErrors = false
      let fromDate = this.menuFromTime
      let toDate = this.menuToTime

      if (Date.parse(fromDate) > Date.parse(toDate)) {
        hasErrors = true
        this.fromTimeSelectedErrors = ['Từ ngày <= đến ngày']
      }
      if (
        (parseInt(this.toTimeSelected.split('/')[1]) -
          parseInt(this.fromTimeSelected.split('/')[1]) >=
          3 &&
          parseInt(this.toTimeSelected.split('/')[2]) -
            parseInt(this.fromTimeSelected.split('/')[2]) ==
            0) ||
        parseInt(this.toTimeSelected.split('/')[2]) -
          parseInt(this.fromTimeSelected.split('/')[2]) !=
          0
      ) {
        hasErrors = true
        this.expiredTimeErrors = ['Khoảng cách không được lớn hơn 3 tháng']
      }

      if (!hasErrors) {
        this.search()
        this.expiredTimeErrors = []
        this.fromTimeSelectedErrors = ''
      }
    },

    typeSmsSelectData() {
      this.$store.dispatch('configPrice/typeSmsSelectData').then((res) => {
        if (!res.error) {
          this.smsSearchOptions = [
            {
              text: 'Tất cả',
              value: null,
            },
          ]
          res.data.data.map((item) => {
            this.smsSearchOptions.push({
              text: item.name,
              value: item.id,
            })
          })
        }
      })
    },

    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },

    saveFromTime(date) {
      this.fromTimeSelected = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    saveToTime(date) {
      this.toTimeSelected = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    Cutomers(value) {
      this.getListBrandnamebyCutomer(value)
    },

    onChange() {
      this.fromTimeSearchOptions = false
      this.toTimeSearchOptions = false
    },

    reportExportInside() {
      this.loading = true
      var urlBase = `${URL.BASE}`
      if (!urlBase.endsWith('/')) urlBase += '/'
      var linkDownload = urlBase + `downloadFile/exportReportAmountSms`
      var arrayStr = []

      if (
        this.customerIdSelected != null &&
        this.customerIdSelected != undefined
      ) {
        // linkDownload += "&customerId=" + this.customerId;
        arrayStr.push('customerId=' + this.customerIdSelected)
      }

      if (
        this.brandnameIdSelected != null &&
        this.brandnameIdSelected != undefined
      ) {
        // linkDownload += "&brandnameId=" + this.brandnameId;
        arrayStr.push('brandnameId=' + this.brandnameIdSelected)
      }

      if (this.smsIdSelected != null && this.smsIdSelected != undefined) {
        // linkDownload += "&typeSmsId=" + this.typeSmsId;
        arrayStr.push('typeSmsId=' + this.smsIdSelected)
      }

      if (this.fromTimeSelected != null && this.fromTimeSelected != undefined) {
        // linkDownload += "&strFromDate=" + this.registerTime;
        arrayStr.push('strFromDate=' + this.fromTimeSelected)
      }

      if (this.toTimeSelected != null && this.toTimeSelected != undefined) {
        // linkDownload += "&strToDate=" + this.expiredTime;
        arrayStr.push('strToDate=' + this.toTimeSelected)
      }

      if (arrayStr.length > 0) linkDownload += '?' + arrayStr.join('&')
      window.location.href = linkDownload
      this.loading = false
    },

    campaignReport() {
      this.$store
        .dispatch('report/campaignReport', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          customerId: this.customerIdSelected,
          typeSmsId: this.smsIdSelected,
          strFromDate: this.$isNullOrEmpty(this.fromTimeSelected)
            ? null
            : `${this.fromTimeSelected} 00:00:00`,
          strToDate: this.$isNullOrEmpty(this.toTimeSelected)
            ? null
            : `${this.toTimeSelected} 23:59:59`,

          brandnameId: this.brandnameIdSelected,
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

    getListBrandnamebyCutomer(value) {
      this.$store
        .dispatch('campaign/dataSelectAllOfCustomer', {
          customerId: value,
        })

        .then((res) => {
          this.brandnameIdSelected = null
          if (res.data.error.code === 0) {
            this.brandnameSearchOptions = [
              {
                text: 'Tất cả',
                value: null,
              },
            ]
            res.data.data.map((item) => {
              if (item.brandnameName !== null) {
                this.brandnameSearchOptions.push({
                  text: item.brandnameName,
                  value: item.id,
                })
              }
            })
          }
        })
    },

    getListCustomers() {
      this.$store.dispatch('campaign/customerDataSelectAll', {}).then((res) => {
        if (res.data.error.code === 0) {
          res.data.data.map((item) => {
            if (item.customerName !== null) {
              this.customerSearchOptions.push({
                text: item.customerName,
                value: item.id,
              })
            }
          })
        }
      })
    },

    search() {
      if (this.$isNullOrEmpty(this.fromTimeSelected)) {
        this.fromTimeSelectedError = ['Vui lòng chọn tháng']
      } else {
        this.fromTimeSelectedError = []
        this.page = 1
        this.campaignReport()
      }
    },

    reset() {
      this.customerIdSelected = null
      this.brandnameIdSelected = null
      this.smsIdSelected = null
      this.expiredTimeErrors = []
      ;(this.fromTimeSelected = moment().startOf('month').format('DD/MM/YYYY')),
        (this.toTimeSelected = moment().format('DD/MM/YYYY'))
      this.fromTimeSelectedErrors = []
      this.getListBrandnamebyCutomer(null)
      this.typeSmsSelectData()
      this.campaignReport()
    },

    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.campaignReport()
      }
    },

    changePage(value) {
      this.page = value
      this.campaignReport()
    },
  },

  computed: {
    headers() {
      return Constants.System.Report.headerSms
    },
  },
}
</script>
