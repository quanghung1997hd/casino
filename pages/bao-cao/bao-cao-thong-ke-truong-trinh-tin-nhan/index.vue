<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Báo cáo thống kê chương trình tin nhắn
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
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  v-model="customerId"
                  :items="Listcutomers"
                  outlined
                  dense
                  hide-details=""
                  label="Tên khách hàng"
                  no-data-text="Không có dữ liệu"
                  @change="Cutomers(customerId)"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  :items="listStatus"
                  v-model="status"
                  outlined
                  dense
                  hide-details=""
                  label="Trạng thái"
                  no-data-text="Không có dữ liệu"
                ></v-autocomplete>
              </v-col>
              <v-col class="col-2 pr-2" style="padding-right: 0px !important">
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
                    ></v-text-field>
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
              <v-col class="col-2 pr-2" style="padding-left: 3px">
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
                      prepend-inner-icon="mdi-calendar-range"
                      dense
                      outlined
                      readonly
                      class="pl-2"
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
            <v-row class="ma-0">
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  v-model="campaignId"
                  :items="list_campaign"
                  outlined
                  dense
                  hide-details=""
                  label="Tên chương trình"
                  no-data-text="Không có dữ liệu"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  v-model="typeAds"
                  :items="list_sms"
                  outlined
                  dense
                  hide-details=""
                  label="Loại tin nhắn"
                  no-data-text="Không có dữ liệu"
                ></v-autocomplete>
              </v-col>
              <v-col cols="2" class="pr-0">
                <v-autocomplete
                  v-model="typeBusiness"
                  :items="list_business"
                  outlined
                  dense
                  hide-details=""
                  label="Lĩnh vực kinh doanh"
                  no-data-text="Không có dữ liệu"
                ></v-autocomplete>
              </v-col>
              <v-col class="col-auto pr-0">
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp;
              </v-col>
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <td>{{ getItemIndex(data.item) }}</td>
              <td>
                <div class="text-left">Mã: {{ data.item.customerCode }}</div>
                <div class="text-left">Tên: {{ data.item.customerName }}</div>
              </td>
              <td class="text-left">{{ data.item.campaignName }}</td>
              <td class="text-left">{{ data.item.brandname }}</td>
              <td class="text-center">{{ data.item.startTime }}</td>
              <td class="text-left">{{ data.item.businessName }}</td>
              <td class="text-left">{{ data.item.adsName }}</td>
              <td class="text-center">{{ data.item.totalSms }}</td>
              <td class="text-center">{{ data.item.totalSmsSuccess }}</td>
              <td class="text-center totalSmsUnsent">
                {{ data.item.totalSmsFail }}
              </td>
              <td class="text-center totalSmsUnsent">
                {{ data.item.totalSmsUnsent }}
              </td>

              <td class="text-center">
                <v-chip outlined small v-if="data.item.status == 0" color="grey"
                  >Lưu nháp</v-chip
                >
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 1"
                  color="warning"
                  >Chờ phê duyệt</v-chip
                >
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 2"
                  color="successNotify"
                  >Đã phê duyệt</v-chip
                >
                <v-chip outlined small v-if="data.item.status == 3" color="red"
                  >Bị từ chối</v-chip
                >
                <v-chip outlined small v-if="data.item.status == -1" color="red"
                  >Hủy chương trình</v-chip
                >
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 21"
                  color="primaryyy"
                  >Đang chạy</v-chip
                >
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 23"
                  color="successNotify"
                  >Đã hoàn thành</v-chip
                >
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
            :loading="loading"
            @export-file="exportFileReportCampaign"
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
  </div>
</template>
<script>
import moment from 'moment'
import URL from '~/assets/configurations/BASE_URL'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  components: {
    // Search,
  },
  data() {
    return {
      openDialogSearchMore: false,
      listStatus: Constants.System.Report.listStatus,
      Listitem: [],
      Listcutomers: [],
      date: [
        moment().clone().startOf('month').format('YYYY-MM-DD'),
        // moment().subtract(30, 'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      customerId: null,
      status: null,
      campaignId: null,
      typeBusiness: null,
      typeAds: null,
      exportBtn: null,
      pageCount: 1,
      page: 1,
      pageSize: 10,
      total_item: 0,
      list_business: [],
      list_sms: [],
      list_campaign: [],
      menu: false,
      menu1: false,
      menu_date: moment().startOf('month').format('YYYY-MM-DD'),
      menu_date1: moment().format('YYYY-MM-DD'),
      registerTime: moment().startOf('month').format('DD/MM/YYYY'),
      expiredTime: moment().format('DD/MM/YYYY'),
      registerTimeErrors: [],
      expiredTimeErrors: [],
      loading: false,
    }
  },
  transition: 'slide-x-transition',
  mounted() {
    this.campaignReport()
    this.getListCustomers()
    this.businessSelectData()
    this.typeSmsSelectData()
    this.getListCampaignByCutomer()
    this.exportBtn = Cookies.get('strRoles').includes(',79,')
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
        (parseInt(this.expiredTime.split('/')[1]) -
          parseInt(this.registerTime.split('/')[1]) >=
          3 &&
          parseInt(this.expiredTime.split('/')[2]) -
            parseInt(this.registerTime.split('/')[2]) ==
            0) ||
        parseInt(this.expiredTime.split('/')[2]) -
          parseInt(this.registerTime.split('/')[2]) !=
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
    Cutomers(value) {
      this.getListCampaignByCutomer(value)
    },
    getListCampaignByCutomer(customerId) {
      this.$store
        .dispatch('campaign/dataCampaignOptionsOfCustomer', {
          customerId: customerId,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.list_campaign = [
              {
                text: 'Tất cả',
                value: null,
              },
            ]
            res.data.data.map((item) => {
              if (item.name !== null) {
                this.list_campaign.push({
                  text: item.name,
                  value: item.id,
                })
              }
            })
          }
        })
    },
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    businessSelectData() {
      this.$store.dispatch('configPrice/businessSelectData').then((res) => {
        if (!res.error) {
          this.list_business = [
            {
              text: 'Tất cả',
              value: null,
            },
          ]
          res.data.data.map((item) => {
            this.list_business.push({
              text: item.name,
              value: item.id,
            })
          })
        }
      })
    },
    typeSmsSelectData() {
      this.$store.dispatch('configPrice/typeSmsSelectData').then((res) => {
        if (!res.error) {
          this.list_sms = [
            {
              text: 'Tất cả',
              value: null,
            },
          ]
          res.data.data.map((item) => {
            this.list_sms.push({
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
    campaignReport() {
      let data = {
        pageIndex: this.page,
        pageSize: this.pageSize,
        customerId: this.customerId,
        campaignId: this.campaignId,
        status: this.status,
        strFromDate: this.$isNullOrEmpty(this.registerTime)
          ? null
          : `${this.registerTime} 00:00:00`,
        strToDate: this.$isNullOrEmpty(this.expiredTime)
          ? null
          : `${this.expiredTime} 23:59:59`,
        typeAds: this.typeAds,
        typeBusiness: this.typeBusiness,
      }
      this.$store
        .dispatch('campaign/campaignReport', data)
        .then((res) => {
          if (!res.error) {
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
    getListCustomers() {
      this.$store.dispatch('campaign/customerDataSelectAll', {}).then((res) => {
        this.Listcutomers = [
          {
            text: 'Tất cả',
            value: null,
          },
        ]
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
      this.page = 1
      this.campaignReport()
    },
    reset() {
      this.customerId = null
      this.campaignId = null
      this.status = null
      this.campaignId = null
      this.registerTimeErrors = []
      this.expiredTimeErrors = []

      this.typeAds = null
      this.typeBusiness = null
      this.registerTime = moment().startOf('month').format('DD/MM/YYYY')
      this.expiredTime = moment().format('DD/MM/YYYY')
      this.list_campaign = []
      this.getListCampaignByCutomer()
    },
    exportFileReportCampaign() {
      this.loading = true
      var urlBase = `${URL.BASE}`
      if (!urlBase.endsWith('/')) urlBase += '/'
      var linkDownload = urlBase + `downloadFile/messageProgramReport`
      var arrayStr = []
      if (this.customerId != null && this.customerId != undefined) {
        // linkDownload += "&customerId=" + this.customerId;
        arrayStr.push('customerId=' + this.customerId)
      }
      if (this.campaignId != null && this.campaignId != undefined) {
        // linkDownload += "&campaignId=" + this.campaignId;
        arrayStr.push('campaignId=' + this.campaignId)
      }
      if (this.typeBusiness != null && this.typeBusiness != undefined) {
        // linkDownload += "&typeBusiness=" + this.typeBusiness;
        arrayStr.push('typeBusiness=' + this.typeBusiness)
      }
      if (this.typeAds != null && this.typeAds != undefined) {
        // linkDownload += "&typeAds=" + this.typeAds;
        arrayStr.push('typeAds=' + this.typeAds)
      }
      if (this.registerTime != null && this.registerTime != undefined) {
        // linkDownload += "?strFromDate=" + this.registerTime;
        arrayStr.push('strFromDate=' + this.registerTime)
      }
      if (this.expiredTime != null && this.expiredTime != undefined) {
        // linkDownload += "&strToDate=" + this.expiredTime;
        arrayStr.push('strToDate=' + this.expiredTime)
      }
      if (this.status != null && this.status != undefined) {
        // linkDownload += "&strToDate=" + this.expiredTime;
        arrayStr.push('status=' + this.status)
      }
      if (arrayStr.length > 0) linkDownload += '?' + arrayStr.join('&')

      window.location.href = linkDownload
      this.loading = false
    },
  },
  computed: {
    headers() {
      return Constants.System.Report.headerCampaign
    },
  },
}
</script>

<style>
.totalSmsUnsent {
  width: 100px !important;
  min-width: 100px !important;
}
</style>
