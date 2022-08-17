<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Báo cáo số lượng tin nhắn theo brandname
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
          no-data-text="Không có dữ liệu thỏa mãn"
          class="elevation-0 custom_header_table"
          fixed-header
          light
        >
          <template v-slot:top>
            <v-row class="ma-0">
              <v-spacer></v-spacer>
              <div class="d-flex py-4">
                <v-select
                  v-model="brandnameId"
                  :items="ListBrandnamebyCutomer"
                  outlined
                  dense
                  hide-details=""
                  label="Tên brandname"
                  no-data-text="Không có dữ liệu"
                  class="mr-2"
                  style="max-width: 200px"
                ></v-select>
                <div>
                  <DateRangePicker
                    :date="date"
                    :label="['Từ ngày', 'Đến ngày']"
                  ></DateRangePicker>
                </div>
                <button
                  type="button"
                  class="primary text-none ml-6 mr-2 v-btn v-btn--has-bg theme--light v-size--default"
                >
                  <span class="v-btn__content" @click="search">Tìm kiếm</span>
                </button>
                <button
                  type="button"
                  class="text-none primary mr-2 v-btn v-btn--has-bg theme--light v-size--default"
                >
                  <span class="v-btn__content" @click="reset">Nhập lại</span>
                </button>
              </div>
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <td class="text-center">{{ data.index + 1 }}</td>
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
            v-if="btnExport"
            :items="Listitem"
            textContent="Xuất file excel"
            :loading="loading"
            @export-file="exportReportFile"
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

<style>
.icon-dateMont {
  color: red;
}
</style>
<script>
import moment from 'moment'
import URL from '~/assets/configurations/BASE_URL'
import Cookies from 'js-cookie'
import DateRangePicker from '~/components/cau-hinh-bang-gia/DateRangePicker'
export default {
  components: {
    DateRangePicker,
  },
  data() {
    return {
      btnExport: null,
      URL,
      loading: false,
      registerTimeError: [],
      registerTime: null,
      menu_date: moment().format('YYYY-MM-DD'),
      openDialogSearchMore: false,
      Listitem: [],
      page: 1,
      pageCount: null,
      pageSize: 20,
      total_item: 0,
      isPageSize: 20000,
      menu: false,
      Listcutomers: [],
      customerId: `${Cookies.get('customerId')}`,
      ListBrandnamebyCutomer: [],
      brandnameId: null,
      getItemIndex(item) {
        return (
          (this.page - 1) * this.pageSize +
          this.ListBrandnamebyCutomer.indexOf(item) +
          1
        )
      },
      date: [
        // moment().subtract(7, 'days').format('YYYY-MM-DD'),
        moment().startOf('month').format('YYYY-MM-DD'),

        moment().format('YYYY-MM-DD'),
      ],
    }
  },
  transition: 'slide-x-transition',
  mounted() {
    this.btnExport = Cookies.get('strRoles').includes(',98,')
    this.campaignReport()
    this.getListBrandnamebyCutomer()
  },
  methods: {
    Cutomers(value) {
      if (!this.$isNullOrEmpty(value)) {
      }
    },
    onChange() {
      this.menu = false
    },
    reportExportInside() {
      this.loading = true
      this.$store
        .dispatch('report/reportExportInside', {
          customerId: this.customerId,
          month: this.$isNullOrEmpty(this.registerTime)
            ? null
            : `${this.registerTime}`,

          brandnameId: this.brandnameId,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            window.location.href =
              `${URL.BASE}/downloadFile/excel?link=` + res.data.data.url
          }
        })
        .finally(() => {
          this.loading = true
        })
    },
    exportReportFile() {
      let data = {
        customerId: this.customerId,
        paymentStatus: this.paymentStatus,
        contractType: this.contractType,
        strFromDate: moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY'),
        strToDate: moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY'),
      }

      var urlBase = `${URL.BASE}`
      if (!urlBase.endsWith('/')) urlBase += '/'
      var linkDownload =
        urlBase + `downloadFile/exportCampaignByBrandname?isCustomerRequest=1`
      linkDownload +=
        '&customerId=' +
        `${Cookies.get('customerId')}` +
        '&strFromDate=' +
        `${moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY')}` +
        '&strToDate=' +
        `${moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY')}`

      if (this.brandnameId != null && this.brandnameId != undefined) {
        linkDownload += '&brandnameId=' + this.brandnameId
      }

      window.location.href = linkDownload
    },
    campaignReport() {
      this.$store
        .dispatch('report/campaignReport', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          customerId: this.customerId,
          strFromDate: moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY'),
          strToDate: moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY'),

          brandnameId: this.brandnameId,
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
    getListBrandnamebyCutomer() {
      this.$store
        .dispatch('campaign/dataSelectAllOfCustomer', {
          customerId: `${Cookies.get('customerId')}`,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.ListBrandnamebyCutomer = [
              {
                text: 'Tất cả',
                value: null,
              },
            ]
            res.data.data.map((item) => {
              if (item.brandnameName !== null) {
                this.ListBrandnamebyCutomer.push({
                  text: item.brandnameName,
                  value: item.id,
                })
              }
            })
          }
        })
    },
    getListCustomers() {
      this.$store.dispatch('campaign/customerDataSelect', {}).then((res) => {
        if (res.data.error.code === 0) {
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
      this.registerTimeError = []
      this.page = 1
      this.campaignReport()
    },
    reset() {
      this.customerId = null
      this.brandnameId = null
      this.registerTime = null
      this.registerTimeError = []
      this.date = [
        moment().startOf('month').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ]
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
      this.$refs.pagination.reset()
      this.campaignReport()
    },
  },
  computed: {
    headers() {
      return [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Loại tin nhắn',
          sortable: false,
          value: 'typeSmsName',
          width: '13%',
        },
        {
          text: 'Tên brandname',
          sortable: false,
          value: 'userName',
          width: '13%',
        },
        {
          text: 'Ngày gửi',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'Tổng số tin nhắn',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'Tổng số tin nhắn thành công',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'Tổng số tin nhắn thất bại',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'Tổng số tin nhắn chưa gửi',
          sortable: false,
          value: '',
          width: '13%',
        },
      ]
    },
  },
}
</script>
