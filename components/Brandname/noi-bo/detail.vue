<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1200px"
    persistent
  >
    <v-card>
      <v-card-title class="py-3" style="border-bottom: 1px solid #00754a">
        Chi tiết Brandname
      </v-card-title>
      <v-card-text style="max-height: calc(100vh - 14rem); overflow-x: hidden">
        <v-container class="pt-8 pb-3" fluid>
          <v-row>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-text-field
                v-model="brandName"
                label="Tên Brandname *"
                outlined
                dense
                light
                readonly
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-text-field
                v-model="partner"
                readonly
                label="Tên khách hàng *"
                outlined
                dense
                light
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-select
                v-model="status"
                :items="listStatus"
                label="Trạng thái "
                dense
                readonly
                class="fs-14"
                light
                outlined
                append-icon=""
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="py-0"
              v-if="unitRequest != null"
            >
              <v-text-field
                v-model="unitRequest"
                label="Đơn vị yêu cầu khai báo"
                outlined
                dense
                light
                readonly
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4"
              ><div class="fs-16 black--text fw-700">Loại tin nhắn</div>
              <div
                v-for="i in listTypeSms"
                :key="i.id"
                class="fs-14 black--text ml-2"
              >
                {{ i }}
              </div></v-col
            >
            <v-col cols="4"
              ><div class="fs-16 black--text fw-700">Lĩnh vực kinh doanh</div>
              <div
                v-for="i in listBusiness"
                :key="i.id"
                class="fs-14 black--text ml-2"
              >
                {{ i }}
              </div></v-col
            >
            <v-col cols="4"
              ><div class="fs-16 black--text fw-700">Nhà mạng</div>
              <div
                v-for="i in listNetwork"
                :key="i.id"
                class="fs-14 black--text ml-2"
              >
                {{ i }}
              </div></v-col
            >
          </v-row>
          <v-row class="mt-5 mb-5 pl-4">
            <div class="black--text fs-16">Danh sách lịch sử</div>
            <v-col cols="12" class="px-0">
              <v-card class="w-100" flat>
                <client-only>
                  <v-data-table
                    :headers="headers"
                    :items="Listitem"
                    hide-default-footer
                    loading-text="Xin chờ"
                    sort-by="stt"
                    no-results-text="Không có kết quả phù hợp"
                    no-data-text="Không có dữ liệu"
                    class="elevation-0 custom_header_table"
                    fixed-header
                    light
                  >
                    <template v-slot:[`item.createdAt`]="{ item }">
                      <div>{{ formatTime(item.createdAt) }}</div>
                    </template>
                    <template v-slot:[`item.stt`]="{ item }">
                      <div class="d-flex align-center justify-center">
                        {{ getItemIndex(item) }}
                      </div>
                    </template>
                  </v-data-table>
                </client-only>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="font_size">Đóng</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import Constants from '~/assets/configurations/constant'
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      items: [],
      Listitem: [],
      page: 1,
      pageCount: 1,
      itemsPerPage: 50,
      brandName: null,
      unitRequest: null,
      partner: null,
      Listcutomers: [],
      status: 0,
      listTypeSms: [],
      listNetwork: [],
      listBusiness: [],
      listStatus: Constants.System.Brandname.listStatus,
      headers: Constants.System.Brandname.headers,
    }
  },
  watch: {
    open(value) {
      if (value) {
        this.brandName = this.data.name
        this.partner = this.data.customerName
        this.unitRequest = this.data.unitRequest
        this.listTypeSms = this.data.smsName
        this.listNetwork = this.data.networkName
        this.listBusiness = this.data.businessName
        this.status = this.data.status
        this.getListCustomers()
        this.listHitory()
      }
    },
  },
  methods: {
    getItemIndex(item) {
      return (
        (this.page - 1) * this.itemsPerPage + this.Listitem.indexOf(item) + 1
      )
    },
    formatTime(value) {
      return moment(value, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss DD/MM/YYYY')
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
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    listHitory() {
      this.$store
        .dispatch('customer/listHistory', {
          tableId: this.data.id,
          tableName: 'BRANDNAME',
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listitem = res.data.data
          }
        })
    },
    toggle() {
      this.$emit('toggle')
    },
    reset() {},

    changePageSize(pageSizes) {
      if (pageSizes !== this.itemsPerPage) {
        this.itemsPerPage = pageSizes
        this.page = 1
        this.$refs.qlsPagination.reset()
        // this.get_list()
      }
    },
    changePage(value) {
      this.page = value
      //   this.get_list()
    },
  },
}
</script>

<style lang="scss">
.v-dialog.v-dialog--active.v-dialog--persistent.v-dialog--scrollable {
  max-height: 100%;
}
.cus-color {
  color: #00754a;
}
</style>
