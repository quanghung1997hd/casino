<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh mục lĩnh vực kinh doanh
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
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
          <v-row class="ma-0" align="center">
            <v-spacer></v-spacer>
            <v-col class="col-2 pr-0">
              <v-text-field
                outlined
                dense
                v-model="code"
                hide-details=""
                label="Mã lĩnh vực kinh doanh"
              ></v-text-field>
            </v-col>
            <v-col class="col-2 pr-0">
              <v-text-field
                outlined
                v-model="name"
                dense
                hide-details=""
                label="Tên lĩnh vực kinh doanh"
              ></v-text-field>
            </v-col>
            <v-col class="col-2 pr-0">
              <v-autocomplete
                outlined
                dense
                :items="itemStatus"
                v-model="status"
                hide-details=""
                label="Trạng thái"
              ></v-autocomplete>
            </v-col>
            <v-col class="col-auto pr-0">
              <v-btn
                depressed
                class="primary text-none"
                @click="BusinessFiledList"
                height="40"
                >Tìm kiếm</v-btn
              >
            </v-col>
            <v-col class="col-auto pr-0">
              <v-btn
                class="text-none primary"
                @click="reset"
                depressed
                height="40"
                >Nhập lại</v-btn
              >
            </v-col>
            <v-col class="col-auto pr-0">
              <v-btn
                v-if="addBtn"
                depressed
                class="primary text-none"
                @click="openDialogInsert = true"
                height="40"
                >Thêm mới</v-btn
              >
            </v-col>
          </v-row>
        </template>
        <template v-slot:item="data">
          <tr>
            <td class="text-center">{{ getItemIndex(data.item) }}</td>
            <td>
              {{ data.item.code }}
            </td>
            <td>{{ data.item.name }}</td>

            <td class="text-center">{{ data.item.createdAt }}</td>
            <td>{{ data.item.createdBy }}</td>
            <td class="text-center">
              <v-chip
                outlined
                small
                v-if="data.item.status == 1"
                color="successNotify"
                >Hoạt động</v-chip
              >
              <v-chip outlined small v-else color="red">Ngừng hoạt động</v-chip>
            </td>
            <td class="text-center">
              <v-tooltip bottom v-if="btnUpdate">
                <template v-slot:activator="{ on }">
                  <v-btn icon small>
                    <v-icon v-on="on" @click="openUpdate(data.item)"
                      >mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <span>Cập nhật</span>
              </v-tooltip>
              <v-tooltip bottom v-if="btnDetail">
                <template v-slot:activator="{ on }">
                  <v-btn icon small>
                    <v-icon v-on="on" @click="openDetail(data.item)"
                      >mdi-eye
                    </v-icon>
                  </v-btn>
                </template>
                <span>Chi tiết</span>
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
    </CardGlobal>
    <Insert
      @success="BusinessFiledList"
      :open="openDialogInsert"
      @toggle="openDialogInsert = !openDialogInsert"
    ></Insert>
    <Update
      :dataItem="dataItem"
      @success="BusinessFiledList"
      :open="openDialogUpdate"
      @toggle="openDialogUpdate = !openDialogUpdate"
    ></Update>
    <Details
      :dataItem="dataItem"
      :open="openDialogDetails"
      @toggle="openDialogDetails = !openDialogDetails"
    ></Details>
  </div>
</template>
<script>
import Update from '~/components/danh-muc-linh-vuc-kinh-doanh/Update.vue'
import Details from '~/components/danh-muc-linh-vuc-kinh-doanh/Details.vue'
import Insert from '~/components/danh-muc-linh-vuc-kinh-doanh/Insert.vue'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'
export default {
  data() {
    return {
      openDialogInsert: false,
      Listitem: [],
      pageSize: 10,
      page: 1,
      code: null,
      dataItem: null,
      name: null,
      openDialogDetails: false,
      openDialogUpdate: false,
      itemStatus: Constants.System.TypeBusiness.itemStatus,
      status: null,
      addBtn: null,
      btnDetail: null,
      btnUpdate: null,
      pageCount: null,
      total_item: 0,
    }
  },
  components: {
    Insert,
    Update,
    Details,
  },
  transition: 'slide-x-transition',
  mounted() {
    this.BusinessFiledList()
    this.addBtn = Cookies.get('strRoles').includes(',64,')
    this.btnDetail = Cookies.get('strRoles').includes(',66,')
    this.btnUpdate = Cookies.get('strRoles').includes(',65,')
  },
  methods: {
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    reset() {
      this.code = null
      this.name = null
      this.status = null
    },
    openDetail(item) {
      this.dataItem = item
      this.openDialogDetails = true
    },
    openUpdate(item) {
      this.dataItem = item
      this.openDialogUpdate = true
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.BusinessFiledList()
      }
    },
    changePage(value) {
      this.page = value
      this.BusinessFiledList()
    },
    BusinessFiledList() {
      let data = {
        code: !this.$isNullOrEmpty(this.code) ? this.code.trim() : null,
        name: !this.$isNullOrEmpty(this.name) ? this.name.trim() : null,
        status: this.status,
        pageIndex: this.page,
        pageSize: this.pageSize,
      }
      this.$store
        .dispatch('businessCategory/BusinessFiledList', data)
        .then((res) => {
          if (!res.error) {
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
      return Constants.System.TypeBusiness.headers
    },
  },
}
</script>
