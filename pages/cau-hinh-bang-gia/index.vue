<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Cấu hình bảng giá
      </div>
    </CardGlobal>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat>
          <client-only>
            <v-data-table
              :headers="headers"
              :items="Listitem"
              hide-default-footer
              loading-text="Xin chờ"
              sort-by="stt"
              no-results-text="Không có dữ liệu thỏa mãn"
              no-data-text="Không có dữ liệu thỏa mãn"
              class="elevation-0 custom_header_table"
              fixed-header
              :items-per-page="pageSize"
              light
            >
              <template v-slot:top>
                <v-app-bar class="pt-3 mb-5" flat color="#fff">
                  <div class="flex-grow-1"></div>
                  <v-spacer></v-spacer>
                  <div class="d-flex py-4">
                    <v-autocomplete
                      outlined
                      dense
                      hide-details=""
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      :items="smsSearchOptions"
                      v-model="smsIdSelected"
                      label="Loại tin nhắn"
                      no-data-text="Không có dữ liệu"
                    ></v-autocomplete>

                    <v-autocomplete
                      outlined
                      dense
                      :items="businessSearchOptions"
                      hide-details=""
                      label="Lĩnh vực kinh doanh"
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      no-data-text="Không có dữ liệu"
                      v-model="businessIdSelected"
                    ></v-autocomplete>

                    <v-autocomplete
                      outlined
                      dense
                      hide-details=""
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      :items="networkSearchOptions"
                      label="Nhà mạng"
                      no-data-text="Không có dữ liệu"
                      v-model="networkIdSelected"
                    ></v-autocomplete>

                    <v-autocomplete
                      outlined
                      dense
                      hide-details=""
                      class="mr-2 fs-14"
                      :items="statusSearchOptions"
                      style="max-width: 200px"
                      label="Trạng thái"
                      no-data-text="Không có dữ liệu"
                      v-model="statusIdSelected"
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
                          label="Từ ngày"
                          v-on="on"
                          v-model="fromTimeSelected"
                          prepend-inner-icon="mdi-calendar-range "
                          :error-messages="fromTimeSelectedErrors"
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
                      ></v-date-picker>
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
                          label="Đến ngày"
                          v-on="on"
                          v-model="toTimeSelected"
                          prepend-inner-icon="mdi-calendar-range "
                          dense
                          outlined
                          readonly
                          class="pl-2"
                        >
                        </v-text-field>
                      </template>

                      <v-date-picker
                        v-model="menuToTime"
                        @change="saveToTime"
                        locale="vi"
                        @input="toTimeSearchOptions = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-btn
                      depressed
                      class="primary text-none ml-2"
                      height="40"
                      @click="searchValidate"
                      >Tìm kiếm
                    </v-btn>
                    <v-btn
                      depressed
                      class="primary text-none mx-2"
                      height="40"
                      @click="reset"
                      >Nhập lại
                    </v-btn>

                    <v-btn
                      v-if="addBtn"
                      depressed
                      class="primary text-none"
                      height="40"
                      @click="openDialogInsert = true"
                      >Thêm mới</v-btn
                    >
                  </div>
                </v-app-bar>
              </template>
              <template v-slot:item="data">
                <tr>
                  <td class="text-center">{{ getItemIndex(data.item) }}</td>
                  <td>
                    {{
                      !$isNullOrEmpty(data.item.smsName)
                        ? data.item.smsName.toString()
                        : null
                    }}
                  </td>

                  <td>
                    {{
                      !$isNullOrEmpty(data.item.businessName)
                        ? data.item.businessName.toString()
                        : null
                    }}
                  </td>
                  <td>
                    {{
                      !$isNullOrEmpty(data.item.networkName)
                        ? data.item.networkName.toString()
                        : null
                    }}
                  </td>
                  <td class="text-center">{{ data.item.dateApply }}</td>
                  <td class="text-center">
                    {{ $formatMoney({ amount: data.item.price }) }}
                  </td>
                  <td class="text-center">{{ data.item.createdAt }}</td>
                  <td>{{ data.item.createdByName }}</td>
                  <td class="text-center">
                    <v-chip
                      outlined
                      small
                      v-if="data.item.status == 1"
                      color="successNotify"
                      >Hoạt động
                    </v-chip>
                    <v-chip
                      outlined
                      small
                      v-if="data.item.status == 2"
                      color="red"
                      >Chưa hoạt động
                    </v-chip>
                    <v-chip
                      outlined
                      small
                      v-if="data.item.status == 0"
                      color="warning"
                      >Ngừng hoạt động
                    </v-chip>
                  </td>
                  <td class="text-center">
                    <v-tooltip bottom v-if="btnDetail">
                      <template v-slot:activator="{ on }">
                        <v-btn icon small @click="openDetail(data.item)">
                          <v-icon v-on="on">mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>Chi tiết</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </client-only>
          <pagination
            class="px-0 pt-3 pb-3"
            ref="pagination"
            :pageCount="pageCount"
            :page="pageIndex"
            :pageSize="pageSize"
            @changePage="changePage"
            @changePageSize="changePageSize"
            depressed="true"
          ></pagination>
        </v-card>
        <Insert
          @success="configPriceList"
          :open="openDialogInsert"
          @toggle="openDialogInsert = !openDialogInsert"
        ></Insert>
        <Details
          :strNetworkIds="strNetworkIds"
          :open="openDialogDetail"
          @toggle="openDialogDetail = !openDialogDetail"
        >
        </Details>

        <!-- Hỏi ngừng hoạt động -->
        <alertCancel
          :open="openCancel"
          :alert-msg="message_noti"
          :check="true"
          @toggle="openCancel = !openCancel"
          @OK="approveCancel"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Details from '~/components/cau-hinh-bang-gia/Details.vue'
import Update from '~/components/cau-hinh-bang-gia/Update.vue'
import Insert from '~/components/cau-hinh-bang-gia/Insert.vue'
import DateRangePicker from '~/components/cau-hinh-bang-gia/DateRangePicker.vue'
import alertCancel from '~/components/cau-hinh-bang-gia/YesNoAlert.vue'
import moment from 'moment'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

export default {
  data() {
    return {
      toTimeSelected: moment().format('DD/MM/YYYY'),
      menuFromTime: moment().startOf('month').format('YYYY-MM-DD'),
      menuToTime: moment().format('YYYY-MM-DD'),
      toTimeSearchOptions: false,
      fromTimeSelected: moment().startOf('month').format('DD/MM/YYYY'),
      fromTimeSearchOptions: false,
      fromTimeSelectedErrors: [],
      openDialogDetail: false,
      businessSearchOptions: [],
      smsSearchOptions: [],
      openDialogInsert: false,
      Listitem: [],
      pageSize: 10,
      pageIndex: 1,
      networkSearchOptions: [],
      pageCount: 10,
      smsIdSelected: null,
      addBtn: null,
      btnDetail: null,
      openDialogUpdate: false,
      statusIdSelected: null,
      strNetworkIds: null,
      businessIdSelected: null,
      networkIdSelected: null,
      statusSearchOptions: Constants.System.ConfigPrice.statusSearchOptions,
      date: [
        moment().startOf('month').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
      ],
      listId: null,
      openCancel: false,
      message_noti: '',
    }
  },
  components: {
    Insert,
    Details,
    Update,
    DateRangePicker,
    alertCancel,
  },
  transition: 'slide-x-transition',
  mounted() {
    this.configPriceList()
    this.typeSmsSelectData()
    this.businessSelectData()
    this.networkSelectData()
    this.addBtn = Cookies.get('strRoles').includes(',70,')
    this.btnDetail = Cookies.get('strRoles').includes(',71,')
  },
  methods: {
    approveCancel() {
      this.$store
        .dispatch('configPrice/configPriceUpdate', {
          strNetworkIds: this.listId.toString(),
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Ngừng hoạt động thành công')
            this.configPriceList()
          }
        })
        .catch((errors) => {})
    },
    askForCaneItem(item) {
      this.listId = item.configPriceIds
      this.message_noti = `Bạn có xác nhận ngừng hoạt động cấu hình này không?`
      this.openCancel = true
    },
    getItemIndex(item) {
      return (
        (this.pageIndex - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
      )
    },

    reset() {
      this.smsIdSelected = null
      this.businessIdSelected = null
      this.networkIdSelected = null
      this.statusIdSelected = null
      this.fromTimeSelected = moment().startOf('month').format('DD/MM/YYYY')
      this.toTimeSelected = moment().format('DD/MM/YYYY')
      this.configPriceList()
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.pageIndex = 1
        this.$refs.pagination.reset()
        this.configPriceList()
      }
    },
    changePage(value) {
      this.pageIndex = value

      this.configPriceList()
    },
    networkSelectData() {
      this.$store.dispatch('configPrice/networkSelectData').then((res) => {
        if (!res.error) {
          res.data.data.map((item) => {
            this.networkSearchOptions.push(
              { text: 'Tất cả', value: null },
              {
                text: item.name,
                value: item.id,
              }
            )
          })
        }
      })
    },
    businessSelectData() {
      this.$store.dispatch('configPrice/businessSelectData').then((res) => {
        if (!res.error) {
          res.data.data.map((item) => {
            this.businessSearchOptions.push(
              { text: 'Tất cả', value: null },
              {
                text: item.name,
                value: item.id,
              }
            )
          })
        }
      })
    },
    typeSmsSelectData() {
      this.$store.dispatch('configPrice/typeSmsSelectData').then((res) => {
        if (!res.error) {
          res.data.data.map((item) => {
            this.smsSearchOptions.push(
              { text: 'Tất cả', value: null },
              {
                text: item.name,
                value: item.id,
              }
            )
          })
        }
      })
    },
    openDetail(item) {
      this.strNetworkIds = item.configPriceIds.toString()
      this.openDialogDetail = true
    },
    searchValidate() {
      let hasErrors = false
      let fromDate = this.menuFromTime
      let toDate = this.menuToTime

      if (Date.parse(fromDate) > Date.parse(toDate)) {
        hasErrors = true
        this.fromTimeSelectedErrors = ['Từ ngày <= đến ngày']
      }

      if (!hasErrors) {
        this.pageIndex = 1
        this.configPriceList()
        this.fromTimeSelectedErrors = ''
      }
    },
    saveFromTime(date) {
      this.fromTimeSelected = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    saveToTime(date) {
      this.toTimeSelected = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    configPriceList() {
      const data = {
        smsId: this.smsIdSelected,
        businessId: this.businessIdSelected,
        networkId: this.networkIdSelected,
        status: this.statusIdSelected,
        strFromDate: this.$isNullOrEmpty(this.fromTimeSelected)
          ? null
          : `${this.fromTimeSelected} 00:00:00`,
        strToDate: this.$isNullOrEmpty(this.toTimeSelected)
          ? null
          : `${this.toTimeSelected} 23:59:59`,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      this.$store
        .dispatch('configPrice/configPriceList', data)
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listitem = res.data.data.data
            this.pageCount = res.data.data.totalPages
            this.total_item = res.data.data.totalRecords
          }
        })
        .catch((errors) => {})
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
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Lĩnh vực kinh doanh',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Nhà mạng',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Thời gian áp dụng từ ngày',
          sortable: false,
          value: 'stt',
          width: '5%',
        },

        {
          text: 'Giá cước (VND)',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Hành động',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
      ]
    },
  },
}
</script>
