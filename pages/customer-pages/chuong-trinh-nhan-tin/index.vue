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
                  v-model="campaign_code"
                  label="Mã chương trình"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col class="col-2 pr-2">
                <v-select
                  no-data-text="Không có dữ liệu"
                  dense
                  hide-details=""
                  v-model="sms_type"
                  :items="list_sms"
                  label="Loại quảng cáo"
                  outlined
                >
                </v-select>
              </v-col>
              <v-col class="col-2 pr-2">
                <v-select
                  no-data-text="Không có dữ liệu"
                  dense
                  hide-details=""
                  :items="list_business"
                  v-model="business_id"
                  label="Lĩnh vực kinh doanh"
                  outlined
                >
                </v-select>
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
                      outlined
                      readonly
                      dense
                      label="Từ ngày"
                      v-on="on"
                      v-model="registerTime"
                      prepend-inner-icon="mdi-calendar-range "
                      hide-details=""
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
                      dense
                      outlined
                      readonly
                      label="Đến ngày"
                      v-on="on"
                      v-model="expiredTime"
                      prepend-inner-icon="mdi-calendar-range "
                      hide-details=""
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
                <v-select
                  no-data-text="Không có dữ liệu"
                  dense
                  :items="list_status"
                  v-model="status"
                  hide-details=""
                  label="Trạng thái"
                  outlined
                >
                </v-select>
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn class="primary text-none" @click="search" depressed
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn class="primary text-none" depressed @click="reset"
                  >Nhập lại</v-btn
                >
              </v-col>
              <v-col class="col-auto pr-0">
                <v-btn
                  v-if="addBtn"
                  class="primary text-none"
                  @click="openDialogAdd = true"
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
              <td class="text-center">
                {{ data.item.codeCampaign }}
              </td>
              <td class="text-center">
                {{ data.item.businessName }}
              </td>
              <td class="text-center">
                {{ data.item.adsName }}
              </td>
              <td class="text-center">
                {{ data.item.brandname }}
              </td>
              <td class="text-center">
                <v-chip outlined small v-if="data.item.status == 0"
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
                <v-chip outlined small v-if="data.item.status == -1" color="red"
                  >Đã hủy</v-chip
                >
                <v-chip outlined small v-if="data.item.status == 3" color="red"
                  >Từ chối phê duyệt</v-chip
                >
              </td>
              <td class="text-center">
                {{ data.item.sentActiveTime }}
              </td>
              <td class="text-center">
                {{ data.item.startTime }}
              </td>
              <td class="text-center">
                {{ data.item.endTime }}
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
                <v-tooltip
                  bottom
                  v-if="
                    data.item.status == 1 && (chekGroup == 5 || chekGroup == 1)
                  "
                >
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="openConfirm(data.item)">
                      <v-icon v-on="on" color="successNotify"
                        >mdi-check-bold
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Đồng ý phê duyệt</span>
                </v-tooltip>
                <v-tooltip bottom v-if="detailBtn">
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="detail(data.item)">
                      <v-icon v-on="on" color="primary">mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  <span>Chi tiết</span>
                </v-tooltip>
                <v-tooltip bottom v-if="data.item.status == 0 && updateBtn">
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="openUpdate(data.item)">
                      <v-icon v-on="on" color="primary">mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span>Chỉnh sửa</span>
                </v-tooltip>
                <v-tooltip bottom v-if="data.item.status == 1 && cancelBtn">
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="askForCaneItem(data.item)">
                      <v-icon v-on="on" color="red">mdi-cancel </v-icon>
                    </v-btn>
                  </template>
                  <span>Hủy chương trình</span>
                </v-tooltip>
                <v-tooltip
                  bottom
                  v-if="
                    data.item.status == 1 && (chekGroup == 5 || chekGroup == 1)
                  "
                >
                  <template v-slot:activator="{ on }">
                    <v-btn icon small @click="openUnConfirm(data.item)">
                      <v-icon v-on="on" color="red">mdi-close-circle </v-icon>
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

    <!-- Hỏi ngừng hoạt động -->
    <alertCancel
      :open="openCancel"
      :alert-msg="message_noti"
      :check="true"
      @toggle="openCancel = !openCancel"
      @OK="approveCancel"
    />

    <FilterMore
      ref="filterMores"
      :open="openDialogFilter"
      @toggle="openDialogFilter = !openDialogFilter"
    ></FilterMore>
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
import DatePickerInput from '~/components/DatePickerInput'
import InsertCampaign from '~/components/campaign/InsertCampaign.vue'
import moment from 'moment'
import FilterMore from '~/components/campaign/FilterMore.vue'
import Update from '~/components/campaign/Update.vue'
import Cookies from 'js-cookie'
import alertCancel from '~/components/campaign/YesNoAlert.vue'
import Constants from '~/assets/configurations/constant'
export default {
  components: {
    DatePickerInput,
    InsertCampaign,
    FilterMore,
    Update,
    alertCancel,
  },
  transition: 'slide-x-transition',
  data: () => ({
    id: null,
    message_noti: '',
    openCancel: false,
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
    updateBtn: null,
    menu: false,
    menu1: false,
    menu_date: moment().startOf('month').format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    registerTime: null,
    expiredTime: null,
    status: null,
    business_id: null,
    Listitem: [],
    openDialogUpdate: false,
    dataDetail: null,
    addBtn: null,
    detailBtn: null,
    cancelBtn: null,
    chekGroup: null,
    list_business: [],
    list_sms: [],
    headers: Constants.System.Campaign.headersCustomer,
    list_status: Constants.System.Campaign.list_status,
  }),
  created() {
    this.chekGroup = Cookies.get('group')
  },
  mounted() {
    this.getList()
    this.businessSelectData()
    this.typeSmsSelectData()
    this.addBtn = Cookies.get('strRoles').includes(',101,')
    this.detailBtn = Cookies.get('strRoles').includes(',100,')
    this.updateBtn = Cookies.get('strRoles').includes(',104,')
    this.cancelBtn = Cookies.get('strRoles').includes(',105,')
  },
  methods: {
    approveCancel() {
      this.$store
        .dispatch('campaign/cancel', {
          id: this.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openCancel = false
            this.$showSuccess(this, 'Hủy chương trình thành công')
            this.getList()
          }
        })
        .catch((errors) => {})
    },
    askForCaneItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận hủy chương trình không?`
      this.openCancel = true
    },
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    openUpdate(item) {
      let data = {
        id: item.id,
      }
      this.$store.dispatch('campaign/campaignDetail', data).then((res) => {
        if (!res.error) {
          this.dataDetail = res.data.data
          this.openDialogUpdate = true
        }
      })
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
      this.$store.dispatch('campaign/campaignApprove').then((res) => {
        if (!res.error) {
        }
      })
    },
    reset() {
      this.customer_name = null
      this.campaign_code = null
      this.sms_type = null
      this.customer_code = null
      this.tax_code = null
      this.business_id = null
      this.status = null
      this.registerTime = null
      this.expiredTime = null
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
          customerId: `${Cookies.get('customerId')}`,
          customerCode: null,
          nameCustomer: null,
          codeCampaign: !this.$isNullOrEmpty(this.campaign_code)
            ? this.campaign_code.trim()
            : null,
          taxCode: this.tax_code,
          strFromDate: this.$isNullOrEmpty(this.registerTime)
            ? null
            : `${this.registerTime} 00:00:00`,
          strToDate: this.$isNullOrEmpty(this.expiredTime)
            ? null
            : `${this.expiredTime} 23:59:59`,
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
      this.$store
        .dispatch('configPrice/businessSelectData', {
          customerId: Cookies.get('userId'),
        })
        .then((res) => {
          if (!res.error) {
            this.list_business = [
              {
                text: 'Tất cả',
                value: null,
              },
            ]
            res.data.data.map((item) => {
              if (!this.$isNullOrEmpty(item.name)) {
                this.list_business.push({
                  text: item.name,
                  value: item.id,
                })
              }
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
  },
}
</script>

<style lang="scss">
.w-date .col {
  width: 235px;
}
</style>
