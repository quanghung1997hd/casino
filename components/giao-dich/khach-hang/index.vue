<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Quản lý giao dịch
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
                      dense
                      style="max-width: 200px"
                      hide-details=""
                      class="mr-2 fs-14"
                      v-model="campaignIdSelected"
                      :items="campaignSearchOptions"
                      label="Tên chương trình"
                      outlined
                      item-value="id"
                      item-text="name"
                      no-data-text="Không có dữ liệu "
                    >
                    </v-autocomplete>

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
                          label=" Hiệu lực từ ngày"
                          v-on="on"
                          v-model="registerTime"
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
                          label="Hiệu lực đến ngày"
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

                    <v-btn
                      class="primary text-none ml-6 mr-2"
                      @click="searchValidate"
                      depressed
                      >Tìm kiếm
                    </v-btn>

                    <v-btn
                      class="text-none primary mr-2"
                      @click="reset"
                      depressed
                      >Nhập lại
                    </v-btn>
                  </div>
                </v-app-bar>
              </template>

              <template v-slot:[`item.stt`]="{ item }">
                <div class="d-flex align-center justify-center">
                  {{ getItemIndex(item) }}
                </div>
              </template>

              <template v-slot:[`item.type`]="{ item }">
                <v-chip v-if="item.type === 0" small outlined color="orange"
                  >Trừ tiền</v-chip
                >
                <v-chip v-if="item.type === 1" small outlined color="primary"
                  >Hoàn tiền</v-chip
                >
                <v-chip v-if="item.type === 2" small outlined color="primary"
                  >Nạp tiền</v-chip
                >
              </template>

              <template v-slot:[`item.accountDepartment`]="{ item }">
                <div v-if="item.accountDepartment.department !== null">
                  {{ item.accountDepartment.department.fullName }}
                </div>
              </template>

              <template v-slot:[`item.realMoney`]="{ item }">
                <div v-if="item.realMoney !== null">
                  {{ $formatMoney({ amount: item.realMoney }) }}
                </div>
              </template>

              <template v-slot:[`item.balanceMoney`]="{ item }">
                <div v-if="item.balanceMoney !== null">
                  {{ $formatMoney({ amount: item.balanceMoney }) }}
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {},

  head() {
    return Constants.System.Transition.title
  },

  data: () => ({
    registerTimeErrors: [],
    menu: false,
    menu1: false,
    menu_date: moment().startOf('month').format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    registerTime: moment().startOf('month').format('DD/MM/YYYY'),
    expiredTime: moment().format('DD/MM/YYYY'),
    campaignIdSelected: null,
    Listcutomers: [],
    Listitem: [],
    Listbrandname: [],
    campaignSearchOptions: [],
    customs: null,
    dataDetailItem: {},
    message_noti: '',
    headers: Constants.System.Transition.headersCustomer,
    date: [firstDate, endDate],
    page: 1,
    pageCount: null,
    pageSize: 20,
    total_item: 0,
    isPageSize: 20000,
  }),

  mounted() {
    this.getListTransaction()
    this.getCampaignSearchOptions()
  },
  methods: {
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    Cutomers(value) {
      if (!this.$isNullOrEmpty(value)) {
        this.getCampaignSearchOptions(value)
      }
    },

    // reset dữ liệu về ban đầu khi click
    reset() {
      this.campaignIdSelected = null
      this.customs = null
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
        this.getListTransaction()
      }
    },

    changePage(value) {
      this.page = value
      this.$refs.pagination.reset()
      this.getListTransaction()
    },

    getListTransaction() {
      this.$store
        .dispatch('transaction/getListTransaction', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          customerId: `${Cookies.get('customerId')}`,
          campaignId: this.campaignIdSelected,
          strFromDate: this.$isNullOrEmpty(this.registerTime)
            ? null
            : `${this.registerTime} 00:00:00`,
          strToDate: this.$isNullOrEmpty(this.expiredTime)
            ? null
            : `${this.expiredTime} 23:59:59`,
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

    getCampaignSearchOptions() {
      this.$store
        .dispatch('campaign/dataCampaignOptionsOfCustomer', {
          customerId: `${Cookies.get('customerId')}`,
        })
        .then((res) => {
          this.campaignSearchOptions = [
            {
              name: 'Tất cả',
              id: null,
            },
          ]
          res.data.data.forEach((eachCampaignOption) => {
            this.campaignSearchOptions.push(eachCampaignOption)
          })
        })
    },

    getListCustomers() {
      this.$store
        .dispatch('campaign/customerDataSelect', {})
        .then((res) => {
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
        .catch((errors) => {})
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

    search() {
      this.page = 1
      this.getListTransaction()
    },
  },
}
</script>
