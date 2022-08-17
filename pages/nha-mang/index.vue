<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh mục nhà mạng
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
                    <v-text-field
                      dense
                      label="Tên nhà mạng"
                      outlined
                      class="mr-2 fs-14"
                      v-model="NetworkName"
                    >
                    </v-text-field>
                    <v-text-field
                      dense
                      label="Mã viết tắt"
                      outlined
                      class="mr-2 fs-14"
                      v-model="NetworkCode"
                    >
                    </v-text-field>
                    <v-autocomplete
                      :items="listStatus"
                      v-model="status"
                      label="Trạng thái"
                      dense
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      outlined
                      no-data-text="Không có dữ liệu"
                    ></v-autocomplete>
                    <v-btn
                      class="primary text-none mr-2"
                      @click="search"
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
                      class="text-none primary"
                      @click="openAdd = true"
                      depressed
                      height="40"
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

              <template v-slot:[`item.status`]="{ item }">
                <v-chip v-if="item.status === 0" small outlined color="red"
                  >Ngừng hoạt động</v-chip
                >
                <v-chip v-if="item.status === 1" small outlined color="green"
                  >Hoạt động</v-chip
                >
              </template>
              <template v-slot:[`item.accountDepartment`]="{ item }">
                <div v-if="item.accountDepartment.department !== null">
                  {{ item.accountDepartment.department.fullName }}
                </div>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <div class="d-flex align-center justify-center">
                  <v-tooltip bottom v-if="btnDetail">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="confirm_detail(item)"
                        v-on="on"
                        >mdi-eye
                      </v-icon>
                    </template>
                    <span>Chi tiết</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="btnUpdate">
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
          @success="getListNetWork()"
        ></add>
        <!-- chi tiết -->
        <detail
          :open="opeoDetail"
          :data="dataDetailItem"
          @toggle="opeoDetail = !opeoDetail"
        ></detail>
        <!-- cập nhật -->
        <update
          :data="dataDetailItem"
          :open="openUpdate"
          @toggle="openUpdate = !openUpdate"
          @success="getListNetWork"
        ></update>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import add from '~/components/nha-mang/add.vue'
import detail from '~/components/nha-mang/detail.vue'
import update from '~/components/nha-mang/update.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

export default {
  transition: 'slide-x-transition',
  components: {
    add,
    detail,
    update,
  },
  head() {
    return Constants.System.Networks.title
  },
  data: () => ({
    openUpdate: false,
    openAdd: false,
    opeoDetail: false,
    Listitem: [],
    dataDetailItem: {},
    status: null,
    addBtn: null,
    btnUpdate: null,
    btnDetail: null,
    message_noti: '',
    NetworkName: null,
    NetworkCode: null,
    listStatus: Constants.System.Networks.listStatus,
    headers: Constants.System.Networks.headers,
    page: 1,
    pageCount: null,
    pageSize: 10,
    total_item: 0,
    isPageSize: 20000,
  }),

  mounted() {
    this.getListNetWork()
    this.addBtn = Cookies.get('strRoles').includes(',61,')
    this.btnDetail = Cookies.get('strRoles').includes(',63,')
    this.btnUpdate = Cookies.get('strRoles').includes(',62,')
  },

  methods: {
    // reset dữ liệu về ban đầu khi click
    reset() {
      this.status = null
      this.NetworkName = null
      this.NetworkCode = null
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.getListNetWork()
      }
    },
    changePage(value) {
      this.page = value
      // this.$refs.pagination.reset()
      this.getListNetWork()
    },
    getListNetWork() {
      this.$store
        .dispatch('network/getListNetWork', {
          pageIndex: this.page,
          pageSize: this.pageSize,
          name: !this.$isNullOrEmpty(this.NetworkName)
            ? this.NetworkName.trim()
            : null,
          abbreviationCode: !this.$isNullOrEmpty(this.NetworkCode)
            ? this.NetworkCode.trim()
            : null,
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
      this.getListNetWork()
    },
    confirm_detail(item) {
      this.$store
        .dispatch('network/detail', {
          id: item.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.dataDetailItem = res.data.data
            this.opeoDetail = true
          }
        })
        .catch((errors) => {})
    },
    askForUpdate(item) {
      this.dataDetailItem = item
      this.openUpdate = true
    },
  },
}
</script>
