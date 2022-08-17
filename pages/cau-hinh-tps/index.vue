<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Quản lý TPS
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
              no-data-text="Không có dữ liệu"
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
                      :items="listCustoms"
                      v-model="customs"
                      label="Tên khách hàng"
                      dense
                      style="max-width: 200px"
                      class="mr-2"
                      hide-details=""
                      outlined
                      no-data-text="Không có dữ liệu"
                    ></v-autocomplete>

                    <v-autocomplete
                      :items="listStatus"
                      v-model="status"
                      label="Trạng  thái"
                      dense
                      style="max-width: 200px"
                      class="mr-2"
                      hide-details=""
                      outlined
                      no-data-text="Không có dữ liệu"
                    ></v-autocomplete>
                    <v-btn
                      class="primary text-none mr-2"
                      height="40"
                      @click="search"
                      depressed
                      >Tìm kiếm</v-btn
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

              <template v-slot:[`item.lateUpdateTime`]="{ item }">
                <div>{{ formatTime(item.lateUpdateTime) }}</div>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip v-if="item.status === 0" small outlined color="red"
                  >Ngừng Hoạt động</v-chip
                >
                <v-chip
                  v-if="item.status === 1"
                  small
                  outlined
                  color="successNotify"
                  >Hoạt động</v-chip
                >
              </template>
              <template v-slot:[`item.limitTps`]="{ item }">
                <div>{{ $formatMoney({ amount: item.limitTps }) }}</div>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-tooltip bottom v-if="updateBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon class="mr-2" @click="askForUpdate(item)" v-on="on"
                        >mdi-border-color
                      </v-icon>
                    </template>
                    <span>Cập nhật</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="item.status == 0">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForApproveItem(item)"
                        v-on="on"
                        >mdi-check-bold
                      </v-icon>
                    </template>
                    <span>Hoạt động</span>
                  </v-tooltip>

                  <!--từ chối phê duyệt-->
                  <v-tooltip bottom v-if="item.status == 1 && cancelBtn">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForRefuseItem(item)"
                        v-on="on"
                        >mdi-close-circle
                      </v-icon>
                    </template>
                    <span>Ngừng hoạt động</span>
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
          @success="getList"
        ></add>

        <!-- cập nhật -->
        <update
          :data="dataDetailItem"
          :open="openUpdate"
          @toggle="openUpdate = !openUpdate"
          @success="getList"
        ></update>

        <!--  hỏi xóa -->
        <yes-no-alert
          :open="openDelete"
          btnOkColor="error"
          :alert-msg="message_noti"
          @toggle="openDelete = !openDelete"
          @OK="deleteItem"
        />

        <yes-no-alert
          :open="openApprove"
          :alert-msg="message_noti"
          @toggle="openApprove = !openApprove"
          @OK="approveItem"
        />

        <yes-no-alert
          :open="openRefuse"
          :alert-msg="message_noti"
          @toggle="openRefuse = !openRefuse"
          @OK="refuseItem"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
import add from '~/components/cau-hinh-tps/add.vue'
import update from '~/components/cau-hinh-tps/update.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

const now = new Date()
const firstDate = moment(now).format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    add,
    update,
  },
  head() {
    return Constants.System.TPS.title
  },
  data: () => ({
    openAdd: false,
    openDetail: false,
    openUpdate: false,
    openDelete: false,
    dataDetailItem: {},
    message_noti: null,
    addBtn: null,
    cancelBtn: null,
    updateBtn: null,
    customs: null,
    status: null,
    listStatus: Constants.System.TPS.listStatus,
    headers: Constants.System.TPS.headers,
    page: 1,
    openApprove: false,
    openRefuse: false,
    pageCount: null,
    pageSize: 10,
    total_item: 0,
    isPageSize: 20000,
    Listitem: [],
    listCustoms: [],
  }),

  mounted() {
    this.getList()
    this.getListCustomers()
    this.addBtn = Cookies.get('strRoles').includes(',69,')
    this.updateBtn = Cookies.get('strRoles').includes(',68,')
    this.cancelBtn = Cookies.get('strRoles').includes(',67,')
  },

  methods: {
    // hoạt động
    askForApproveItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có chắc chắn muốn thay đổi trạng thái này?`
      this.openApprove = true
    },

    approveItem() {
      this.$store
        .dispatch('configTps/tpsAction', {
          id: this.id,
          status: 1,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openApprove = false
            this.getList()
            this.$showSuccess(this, 'Thay đổi trạng thái thành công')
          }
        })
        .catch((errors) => {})
    },

    askForRefuseItem(item) {
      this.id = item.id
      this.message_noti = `Bạn có chắc chắn muốn thay đổi trạng thái này?`
      this.openRefuse = true
    },

    refuseItem() {
      this.$store
        .dispatch('configTps/tpsAction', {
          id: this.id,
          status: 0,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openRefuse = false
            this.getList()
            this.$showSuccess(this, 'Thay đổi trạng thái thành công')
          }
        })
        .catch((errors) => {})
    },

    getListCustomers() {
      this.$store.dispatch('campaign/customerDataSelectAll', {}).then((res) => {
        if (res.data.error.code === 0) {
          res.data.data.map((item) => {
            if (item.customerName !== null) {
              this.listCustoms.push({
                text: item.customerName,
                value: item.id,
              })
            }
          })
          this.listCustoms.unshift({
            text: 'Tất cả',
            value: null,
          })
        }
      })
    },
    // đổi định dạng time
    formatTime(value) {
      return moment(value, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss DD/MM/YYYY')
    },
    // gọi api xóa
    deleteItem() {},
    // gọi api phê duyệt

    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.page = 1
        this.pageSize = pageSizes
        this.$refs.pagination.reset()
        this.getList()
      }
    },
    changePage(value) {
      this.page = value
      // this.$refs.pagination.reset()
      this.getList()
    },
    getList() {
      this.$store
        .dispatch('configTps/getList', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          customerId: this.customs,
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
    search() {
      this.page = 1
      this.getList()
    },
    confirm_detail(item) {
      this.dataDetailItem = item
      this.openDetail = true
    },
    askForUpdate(item) {
      this.dataDetailItem = item
      this.openUpdate = true
    },
  },
}
</script>
