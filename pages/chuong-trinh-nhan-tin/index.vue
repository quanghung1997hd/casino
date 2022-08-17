<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách chương trình nhắn tin
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <client-only>
        <v-data-table
          :headers="headers"
          :items="Listitem"
          hide-default-footer
          loading-text="Xin chờ"
          sort-by="stt"
          :items-per-page="pageSize"
          no-results-text="Không có dữ liệu thỏa mãn"
          no-data-text="Không có dữ liệu thỏa mãn"
          class="elevation-0 custom_header_table"
          fixed-header
          light
        >
          <template v-slot:top>
            <v-row class="ma-0" align="center">
              <v-col class="col-2 pr-2">
                <v-text-field
                  dense
                  hide-details=""
                  v-model="customer_code"
                  label="Mã khách hàng"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col class="col-2 pr-2">
                <v-text-field
                  dense
                  hide-details=""
                  v-model="customer_name"
                  label="Tên khách hàng"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col class="col-2 pr-2">
                <v-text-field
                  dense
                  hide-details=""
                  v-model="campaign_code"
                  label="Mã chương trình"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col class="col-2 pr-2">
                <v-text-field
                  dense
                  hide-details=""
                  v-model="tax_code"
                  label="Mã số thuế"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col class="col-2 pr-2">
                <v-autocomplete
                  no-data-text="Không có dữ liệu"
                  dense
                  hide-details=""
                  v-model="sms_type"
                  :items="list_sms"
                  label="Loại quảng cáo"
                  outlined
                >
                </v-autocomplete>
              </v-col>
              <v-col class="col-2 pr-2">
                <v-autocomplete
                  no-data-text="Không có dữ liệu"
                  dense
                  hide-details=""
                  :items="list_business"
                  v-model="business_id"
                  label="Lĩnh vực kinh doanh"
                  outlined
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row class="ma-0" align="center">
              <v-col class="col-2 pr-2">
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
                      hide-details=""
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
                      v-model="toDate"
                      prepend-inner-icon="mdi-calendar-range "
                      dense
                      hide-details=""
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
              </v-col>
              <v-col cols="2">
                <v-autocomplete
                  no-data-text="Không có dữ liệu"
                  dense
                  :items="list_status"
                  v-model="status"
                  hide-details=""
                  label="Trạng thái"
                  outlined
                  style="margin-top: 3px"
                >
                </v-autocomplete>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn
                  class="primary text-none"
                  @click="search"
                  depressed
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
              <v-col v-if="addBtn" class="col-auto pr-0">
                <v-btn
                  class="primary text-none"
                  @click="openDialogAdd = true"
                  height="40"
                  depressed
                  >Thêm mới</v-btn
                >
              </v-col>
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <td class="text-center">
                {{ getItemIndex(data.item) }}
              </td>
              <td>
                <div>Mã: {{ data.item.customerCode }}</div>
                <div>Tên: {{ data.item.customerName }}</div>
              </td>
              <td class="text-center">
                {{ data.item.taxCode }}
              </td>
              <td>
                {{ data.item.codeCampaign }}
              </td>
              <td>
                {{ data.item.businessName }}
              </td>
              <td>
                {{ data.item.adsName }}
              </td>
              <td>
                {{ data.item.brandname }}
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
                  color="#009933"
                  >Đã phê duyệt</v-chip
                >
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 3"
                  color="#cc0000"
                  >Từ chối phê duyệt</v-chip
                >
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == -1"
                  color="#cc0000"
                  >Đã hủy</v-chip
                >
              </td>
              <td class="text-center">
                {{ data.item.sentActiveTime }}
              </td>
              <td class="text-center">
                {{ $formatMoney({ amount: data.item.temporaryMoney }) }}
              </td>
              <td class="text-center">
                {{ $formatMoney({ amount: data.item.realMoney }) }}
              </td>
              <td class="text-center">
                {{ data.item.totalSmsSuccess }}
              </td>
              <td class="text-center">
                <v-tooltip bottom v-if="data.item.status == 1 && approveBtn">
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="openConfirm(data.item)">
                      <v-icon v-on="on">mdi-check-bold </v-icon>
                    </v-btn>
                  </template>
                  <span>Đồng ý phê duyệt</span>
                </v-tooltip>
                <v-tooltip bottom v-if="detailBtn">
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="detail(data.item)">
                      <v-icon v-on="on">mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  <span>Chi tiết</span>
                </v-tooltip>
                <v-tooltip bottom v-if="data.item.status == 0 && updateBtn">
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="openUpdate(data.item)">
                      <v-icon v-on="on">mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span>Chỉnh sửa</span>
                </v-tooltip>
                <v-tooltip bottom v-if="data.item.status == 1 && approveBtn">
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="openUnConfirm(data.item)">
                      <v-icon v-on="on">mdi-close-circle </v-icon>
                    </v-btn>
                  </template>
                  <span>Từ chối phê duyệt</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
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
      </client-only>
    </CardGlobal>

    <InsertCampaign
      @success="getList"
      :open="openDialogAdd"
      @toggle="openDialogAdd = !openDialogAdd"
    ></InsertCampaign>
    <Update
      @success="getList"
      :dataDetail="dataDetail"
      :open="openDialogUpdate"
      @toggle="openDialogUpdate = !openDialogUpdate"
    ></Update>
  </div>
</template>
<script>
import InsertCampaign from '~/components/campaign/InsertCampaign.vue'
import moment from 'moment'
import Update from '~/components/campaign/Update.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

export default {
  components: {
    InsertCampaign,
    Update,
  },
  transition: 'slide-x-transition',
  data: () => ({
    addBtn: null,
    approveBtn: null,
    pageCount: 1,
    page: 1,
    pageSize: 10,
    openDialogFilter: false,
    date: [
      moment().subtract(7, 'days').format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
    ],
    openDialogAdd: false,
    customer_code: null,
    customer_name: null,
    sms_type: null,
    campaign_code: null,
    tax_code: null,
    detailBtn: null,
    updateBtn: null,
    menu: false,
    menu1: false,
    menu_date: moment().startOf('month').format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    fromDate: moment().startOf('month').format('DD/MM/YYYY'),
    toDate: moment().format('DD/MM/YYYY'),
    status: null,
    business_id: null,
    Listitem: [],
    openDialogUpdate: false,
    dataDetail: null,
    typeCustomer: `${Cookies.get('strListGroup')}`,
    chekGroup: null,
    list_business: [],
    list_sms: [],
    headers: Constants.System.Campaign.headers,
    list_status: Constants.System.Campaign.list_status,
  }),

  mounted() {
    this.addBtn = Cookies.get('strRoles').includes(',49,')
    this.approveBtn = Cookies.get('strRoles').includes(',54,')
    this.detailBtn = Cookies.get('strRoles').includes(',56,')
    this.updateBtn = Cookies.get('strRoles').includes(',103,')
    this.businessSelectData()
    this.typeSmsSelectData()
    this.getList()
  },
  methods: {
    save_date(date) {
      this.fromDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.toDate = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    openUpdate(item) {
      let data = {
        id: item.id,
      }
      this.$store
        .dispatch('campaign/campaignDetail', data)
        .then((res) => {
          if (!res.error) {
            this.dataDetail = res.data.data
            this.openDialogUpdate = true
          }
        })
        .catch((errors) => {})
    },
    detail(item) {
      this.$store.commit('campaign/setIdCampaign', item.id)
      this.$router.push('/chuong-trinh-nhan-tin/detail')
    },
    openUnConfirm(item) {
      this.$store.commit('campaign/setIdCampaign', item.id)
      this.$router.push('/chuong-trinh-nhan-tin/tu-choi-phe-duyet')
    },
    openConfirm(item) {
      this.$store.commit('campaign/setIdCampaign', item.id)
      this.$router.push('/chuong-trinh-nhan-tin/dong-y-phe-duyet')
    },
    confirm() {
      this.$store
        .dispatch('campaign/campaignApprove')
        .then((res) => {
          if (!res.error) {
          }
        })
        .catch((errors) => {})
    },
    reset() {
      this.customer_name = null
      this.campaign_code = null
      this.sms_type = null
      this.customer_code = null
      this.tax_code = null
      this.business_id = null
      this.status = null
      this.fromDate = moment().startOf('month').format('DD/MM/YYYY')
      this.toDate = moment().format('DD/MM/YYYY')
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    getCustomerInfo(item) {
      return 'Mã: ' + item.customerCode + '\n' + ' Tên: ' + item.customerName
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
        .dispatch('campaign/getListCampaign', {
          customerCode: !this.$isNullOrEmpty(this.customer_code)
            ? this.customer_code.trim()
            : null,
          nameCustomer: !this.$isNullOrEmpty(this.customer_name)
            ? this.customer_name.trim()
            : null,
          codeCampaign: !this.$isNullOrEmpty(this.campaign_code)
            ? this.campaign_code.trim()
            : null,
          taxCode: !this.$isNullOrEmpty(this.tax_code)
            ? this.tax_code.trim()
            : null,
          strFromDate: this.$isNullOrEmpty(this.fromDate)
            ? null
            : `${this.fromDate} 00:00:00`,
          strToDate: this.$isNullOrEmpty(this.toDate)
            ? null
            : `${this.toDate} 23:59:59`,
          typeAds: this.sms_type,
          typeBusiness: this.business_id,
          status: this.status,
          pageIndex: this.page,
          pageSize: this.pageSize,
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
    search() {
      this.page = 1
      this.getList()
    },
    businessSelectData() {
      this.$store.dispatch('configPrice/businessSelectData').then((res) => {
        if (!res.error) {
          this.list_business = []
          this.list_business.push({
            text: 'Tất cả',
            value: null,
          })
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
          this.list_sms = []
          this.list_sms.push({
            text: 'Tất cả',
            value: null,
          })
          res.data.data.map((item) => {
            this.list_sms.push({
              text: item.name,
              value: item.id,
            })
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
.w-date .col {
  width: 235px;
}
</style>
