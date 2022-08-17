<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách blacklist
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
                    <v-text-field
                      dense
                      label="Số điện thoại"
                      outlined
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      v-model="Phone"
                    >
                    </v-text-field>
                    <v-select
                      :items="listStatus"
                      v-model="status"
                      label="Trạng thái"
                      dense
                      style="max-width: 200px"
                      class="mr-2 fs-14"
                      hide-details=""
                      outlined
                      no-data-text="Không có dữ liệu"
                    ></v-select>
                    <v-btn
                      class="text-none primary mr-2"
                      height="40"
                      @click="search"
                      depressed
                      >Tìm kiếm</v-btn
                    >
                    <v-btn
                      class="text-none primary mr-2"
                      height="40"
                      @click="reset"
                      depressed
                      >Nhập lại</v-btn
                    >
                    <v-btn
                      v-if="addBtn"
                      class="text-none primary mr-2"
                      height="40"
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
                  <v-tooltip bottom v-if="btnUpdate">
                    <template v-slot:activator="{ on }">
                      <v-icon class="mr-2" @click="askForUpdate(item)" v-on="on"
                        >mdi-border-color
                      </v-icon>
                    </template>
                    <span>Cập nhật</span>
                  </v-tooltip>
                  <v-tooltip bottom v-if="btnDelete">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="mr-2"
                        @click="askForDeleteItem(item)"
                        v-on="on"
                        >mdi-delete
                      </v-icon>
                    </template>
                    <span>Xóa</span>
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

        <!--  hỏi xóa -->
        <alerDelete
          :open="openDelete"
          btnOkColor="error"
          :check="true"
          :alert-msg="message_noti"
          @toggle="openDelete = !openDelete"
          @OK="deleteItem"
        />
        <!-- thêm -->
        <add
          :open="openAdd"
          @toggle="openAdd = !openAdd"
          @success="getListBlacklist()"
        ></add>

        <addFile
          :open="openAddFlie"
          @toggle="openAddFlie = !openAddFlie"
          @success="getListBlacklist()"
        ></addFile>

        <!-- cập nhật-->
        <update
          :data="dataDetailItem"
          :open="openUpdate"
          @toggle="openUpdate = !openUpdate"
          @success="getListBlacklist"
        ></update>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import alerDelete from '~/components/blacklist/noi-bo/YesNoAlert.vue'
import add from '~/components/blacklist/noi-bo/add.vue'
import addFile from '~/components/blacklist/noi-bo/addFile.vue'
import update from '~/components/blacklist/noi-bo/update.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'

export default {
  transition: 'slide-x-transition',
  components: {
    alerDelete,
    add,
    update,
    addFile,
  },
  head() {
    return Constants.System.Blacklist.title
  },
  data: () => ({
    addBtn: null,
    btnUpdate: null,
    btnDelete: null,
    openUpdate: false,
    openAdd: false,
    openAddFlie: false,
    opeoDetail: false,
    Listitem: [],
    dataDetailItem: {},
    openDelete: false,
    message_noti: '',
    status: null,
    Phone: null,
    listStatus: Constants.System.Blacklist.listStatus,
    headers: Constants.System.Blacklist.headers,
    page: 1,
    pageCount: null,
    pageSize: 10,
    total_item: 0,
    isPageSize: 20000,
  }),

  mounted() {
    this.getListBlacklist()
    this.addBtn = Cookies.get('strRoles').includes(',87,')
    this.btnUpdate = Cookies.get('strRoles').includes(',85,')
    this.btnDelete = Cookies.get('strRoles').includes(',86,')
  },

  methods: {
    uploadSuccess(value) {
      value.map((item) => {
        this.array_file_name.push(item.name)
      })
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
        .dispatch('blacklist/deleteItem', {
          id: this.id,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.openDelete = false
            this.$showSuccess(this, 'Xóa blacklist thành công')
            this.getListBlacklist()
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    // reset dữ liệu về ban đầu khi click
    reset() {
      this.Phone = null
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.getListBlacklist()
      }
    },
    changePage(value) {
      this.page = value
      // this.$refs.pagination.reset()
      this.getListBlacklist()
    },
    getListBlacklist() {
      this.$store
        .dispatch('blacklist/getListBlacklist', {
          pageIndex: this.page,
          pageSize: this.pageSize,

          phoneNumber: !this.$isNullOrEmpty(this.Phone)
            ? this.Phone.trim()
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
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },

    search() {
      this.page = 1
      this.getListBlacklist()
    },

    askForUpdate(item) {
      this.dataDetailItem = item
      this.openUpdate = true
    },
  },
}
</script>
