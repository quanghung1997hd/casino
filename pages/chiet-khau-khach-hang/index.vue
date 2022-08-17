<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách chiết khấu cho khách hàng
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
              no-results-text="Không có kết quả phù hợp"
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
                    <v-autocomplete
                      :items="listStatus"
                      v-model="status"
                      label="Trạng thái"
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
                          label="Thời gian tạo từ ngày"
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
                          label="Thời gian tạo đến ngày"
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
                      class="primary text-none ml-2 mr-2"
                      @click="searchValidate"
                      depressed
                      height="40"
                      >Tìm kiếm</v-btn
                    >
                    <v-btn
                      class="text-none primary mr-2"
                      @click="reset"
                      depressed
                      height="40"
                      >Nhập lại</v-btn
                    >

                    <v-btn
                      v-if="addBtn"
                      height="40"
                      class="text-none primary"
                      @click="openAdd = true"
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
              <template v-slot:[`item.fullName`]="{ item }">
                <span v-if="item.customerId == 0">Tất cả khách hàng</span>
                <span
                  v-if="item.customerId != 0"
                  small
                  outlined
                  color="primary"
                >
                  <div>
                    <span class="">Mã : </span>
                    {{ item.customerId }}
                  </div>
                  <div>
                    <span class="">Tên: </span>
                    {{ item.customerName }}
                  </div>
                </span>
              </template>

              <template v-slot:[`item.fullDate`]="{ item }">
                <div>{{ item.startDate }} - {{ item.finishDate }}</div>
              </template>
              <template v-slot:[`item.discount`]="{ item }">
                {{ item.discount }}%
              </template>
              <template v-slot:[`item.discountLimit`]="{ item }">
                {{ $formatMoney({ amount: item.discountLimit }) }}
              </template>

              <template v-slot:[`item.accountDepartment`]="{ item }">
                <div v-if="item.accountDepartment.department !== null">
                  {{ item.accountDepartment.department.fullName }}
                </div>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip v-if="item.status === 0" small outlined color="red"
                  >Ngừng hoạt động</v-chip
                >
                <v-chip v-if="item.status === 1" small outlined color="green"
                  >Hoạt động</v-chip
                >
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-tooltip
                    bottom
                    v-if="(item.status === 0 || item.status === 1) && btnUpdate"
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon class="mr-2" @click="askForUpdate(item)" v-on="on"
                        >mdi-border-color
                      </v-icon>
                    </template>
                    <span>Cập nhật</span>
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

        <!-- thêm -->
        <add
          :open="openAdd"
          @toggle="openAdd = !openAdd"
          @success="getListDiscountCustomer()"
        ></add>

        <!--  hỏi xóa -->
        <alerDelete
          :open="openDelete"
          btnOkColor="error"
          :check="true"
          :alert-msg="message_noti"
          @toggle="openDelete = !openDelete"
          @OK="deleteItem"
        />
        <!-- cập nhật -->
        <update
          :data="dataDetailItem"
          :open="openUpdate"
          @toggle="openUpdate = !openUpdate"
          @success="getListDiscountCustomer"
        ></update>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment'
import add from '~/components/chiet-khau-khach-hang/add.vue'
import update from '~/components/chiet-khau-khach-hang/update.vue'
import alerDelete from '~/components/chiet-khau-khach-hang/YesNoAlert.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'
const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    add,
    alerDelete,
    update,
  },
  head() {
    return Constants.System.Discount.title
  },
  data: () => ({
    registerTimeErrors: [],
    openUpdate: false,
    menu: false,
    menu1: false,
    registerTime: moment().startOf('month').format('DD/MM/YYYY'),
    expiredTime: moment().format('DD/MM/YYYY'),
    menu_date: moment().startOf('month').format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    openAdd: false,
    openDelete: false,
    Listcutomers: [],
    Listitem: [],
    customs: null,
    addBtn: null,
    btnUpdate: null,
    dataDetailItem: {},
    message_noti: '',
    status: null,
    listStatus: Constants.System.Discount.listStatus,
    headers: Constants.System.Discount.headers,
    date: [firstDate, endDate],
    page: 1,
    pageCount: null,
    pageSize: 10,
    total_item: 0,
    isPageSize: 20000,
  }),

  mounted() {
    this.getListDiscountCustomer()
    this.getListCustomers()
    this.addBtn = Cookies.get('strRoles').includes(',75,')
    this.btnUpdate = Cookies.get('strRoles').includes(',76,')
  },

  methods: {
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },

    //xóa item khi click
    askForDeleteItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có xác nhận xóa bản ghi không?`
      this.openDelete = true
    },
    // gọi api xóa
    deleteItem() {
      this.$store
        .dispatch('discountCustomer/deleteItem', {
          id: this.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openDelete = false
            this.$showSuccess(
              this,
              'Xóa chiết khấu kháu khách hàng  thành công'
            )
            this.getListDiscountCustomer()
          }
        })
        .catch((errors) => {})
    },

    // reset dữ liệu về ban đầu khi click
    reset() {
      this.status = null
      this.customs = null
      this.registerTime = moment().startOf('month').format('DD/MM/YYYY')
      this.expiredTime = moment().format('DD/MM/YYYY')
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.pagination.reset()
        this.getListDiscountCustomer()
      }
    },
    changePage(value) {
      this.page = value
      this.getListDiscountCustomer()
    },
    getListDiscountCustomer() {
      this.$store
        .dispatch('discountCustomer/getListDiscountCustomer', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          customerId: this.customs,
          status: this.status,
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

    getListCustomers() {
      this.$store.dispatch('campaign/customerDataSelectAll', {}).then((res) => {
        this.Listcutomers = [
          {
            text: 'Tất cả',
            value: null,
          },
          {
            text: 'Tất cả khách hàng',
            value: 0,
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
      this.getListDiscountCustomer()
    },
    askForUpdate(item) {
      this.dataDetailItem = item
      this.openUpdate = true
    },
  },
}
</script>
