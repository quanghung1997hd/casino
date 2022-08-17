<template>
  <v-expansion-panels
    class="elevation-0"
    flat
    style="border-radius: 10px"
    v-model="panel"
    multiple
  >
    <v-expansion-panel style="border-radius: 10px" class="px-2">
      <v-expansion-panel-header class="px-2 py-0">
        <v-row class="ma-0" no-gutters>
          <v-col cols="12">
            <span style="font-size: 1rem; font-weight: 500">
              Danh sách các file thuê bao
            </span>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="py-0">
        <v-row class="ma-0" no-gutters>
          <v-col cols="4">
            <v-row
              class="ma-0"
              align="center"
              v-for="(item, index) in arr_file"
              :key="`index--${index}`"
            >
              <v-col cols="8" class="pa-0">
                <a
                  :href="
                    URL.BASE +
                    '/downloadFile/excel?link=src/main/resources/uploads/' +
                    item.linkFile
                  "
                  >{{ item.name }}</a
                >
              </v-col>
              <v-col cols="4" class="fw-500 pa-0">
                {{ $formatMoney({ amount: item.totalPhone }) }} thuê bao
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="ma-0 fw-500" style="font-size: 1rem !important">
          <v-col cols="4" class="px-0 pb-0">
            <v-row class="ma-0" align="center">
              <v-col cols="8" class="pa-0">
                <div>Tổng số thuê bao</div>
              </v-col>
              <v-col cols="4" class="fw-500 pa-0">
                {{ $formatMoney({ amount: totalPhone }) }} thuê bao
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-auto pb-0">
            Tổng số thuê bao hợp lệ:
            {{ $formatMoney({ amount: phoneSuccess }) }} thuê bao
          </v-col>
          <v-col class="col-auto pb-0">
            Tổng số thuê bao không hợp lệ:
            {{ $formatMoney({ amount: phoneFail }) }} thuê bao
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel style="border-radius: 10px" class="px-2">
      <v-expansion-panel-header class="px-2 py-0">
        <v-row class="ma-0" no-gutters>
          <v-col cols="12">
            <span style="font-size: 1rem; font-weight: 500">
              Chi tiết thuê bao
            </span>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="py-0">
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
          :items-per-page="pageSize"
          light
        >
          <template v-slot:top>
            <v-row class="ma-0">
              <v-spacer></v-spacer>
              <v-col class="col-auto pt-0">
                <v-text-field
                  outlined
                  dense
                  hide-details=""
                  v-model="phone"
                  label="Số thuê bao"
                >
                </v-text-field>
              </v-col>
              <v-col class="col-auto pt-0 pl-0">
                <v-select
                  outlined
                  no-data-text="Không có dữ liệu"
                  dense
                  hide-details=""
                  :items="listNetwork"
                  v-model="networkId"
                  label="Nhà mạng"
                >
                </v-select>
              </v-col>
              <v-col class="col-auto pt-0 pl-0">
                <v-select
                  outlined
                  no-data-text="Không có dữ liệu"
                  dense
                  hide-details=""
                  v-model="status"
                  :items="listStatus"
                  label="Trạng thái"
                >
                </v-select>
              </v-col>
              <v-col class="col-auto pt-0 pl-0">
                <v-btn depressed class="primary text-none" @click="smsList"
                  >Tìm kiếm</v-btn
                >
              </v-col>
              <v-col class="col-auto pt-0 px-0">
                <v-btn depressed class="primary text-none" @click="reset()"
                  >Nhập lại</v-btn
                >
              </v-col>
            </v-row>
          </template>
          <template v-slot:item="data">
            <tr>
              <td class="text-center">{{ getItemIndex(data.item) }}</td>
              <td class="text-center">{{ data.item.phone }}</td>
              <td>{{ data.item.networkName }}</td>
              <td class="text-center">
                {{ $formatMoney({ amount: data.item.price }) }}
              </td>
              <td class="text-center">
                <v-chip
                  outlined
                  small
                  v-if="data.item.statusPhone == 1"
                  color="warning"
                >
                  Không hợp lệ
                </v-chip>
                <v-chip
                  outlined
                  small
                  v-if="data.item.statusPhone == 0"
                  color="green"
                >
                  Hợp lệ
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip
                  outlined
                  small
                  color="warning"
                  v-if="data.item.status == 0"
                >
                  Chưa gửi
                </v-chip>
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 1"
                  color="success"
                >
                  Đang gửi
                </v-chip>
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 2"
                  color="warning"
                >
                  Thất bại
                </v-chip>
                <v-chip
                  outlined
                  small
                  v-if="data.item.status == 3"
                  color="green"
                >
                  Thành công
                </v-chip>
                <v-chip outlined small v-if="data.item.status == 4" color="">
                  Timeout
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip
                  outlined
                  small
                  v-if="data.item.statusPayment == 1"
                  color="success"
                >
                  Đã thanh toán
                </v-chip>
                <v-chip
                  outlined
                  small
                  v-if="data.item.statusPayment == 0"
                  color="warning"
                >
                  Chưa thanh toán
                </v-chip>
              </td>
              <td class="text-center">{{ data.item.errorDescription }}</td>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import URL from '~/assets/configurations/BASE_URL'
import Constants from '~/assets/configurations/constant'
export default {
  props: {
    customerInfor: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      URL,
      phone: null,
      network: null,
      status: null,
      panel: [0, 1],
      headers: Constants.System.Campaign.headerSms,
      totalPhone: null,
      phoneFail: null,
      phoneSuccess: null,
      page: 1,
      pageCount: null,
      pageSize: 10,
      total_item: 0,
      listNetwork: [],

      Listitem: [],
      arr_file: [],
      networkId: null,
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Chưa gửi',
          value: 0,
        },
        {
          text: 'Đang gửi',
          value: 1,
        },
        {
          text: 'Lỗi',
          value: 2,
        },
        {
          text: 'Thành công',
          value: 3,
        },
        {
          text: 'Timeout',
          value: 4,
        },
      ],
    }
  },
  mounted() {
    this.networkSelectData()
    this.smsList()
  },
  watch: {
    customerInfor(value) {
      if (value.fileAbout != null) {
        this.arr_file = JSON.parse(value.fileAbout)
      } else {
        this.arr_file = []
      }
      let totalPhone = null
      let phoneFail = null
      let phoneSuccess = null

      for (let i = 0; i < this.arr_file.length; i++) {
        totalPhone += this.arr_file[i].totalPhone
        phoneFail += this.arr_file[i].phoneFail
        phoneSuccess += this.arr_file[i].phoneSuccess
      }
      this.totalPhone = totalPhone
      this.phoneFail = phoneFail
      this.phoneSuccess = phoneSuccess
    },
  },
  methods: {
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.Listitem.indexOf(item) + 1
    },
    networkSelectData() {
      this.$store.dispatch('configPrice/networkSelectData').then((res) => {
        if (!res.error) {
          res.data.data.map((item) => {
            this.listNetwork.push(
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
    urlDownload(fileName) {
      return (
        URL.BASE +
        '/downloadFile/excel?link=src/main/resources/uploads/${fileName}'
      )
    },
    getnetwork(value) {
      let str = null
      for (let i = 0; i < this.listNetwork.length; i++) {
        if (value === this.listNetwork[i].value) {
          str = this.listNetwork[i].text
        }
      }
      return str
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.pagination.reset()
        this.smsList()
      }
    },
    reset() {
      this.phone = null
      this.networkId = null
      this.status = null
    },
    changePage(value) {
      this.page = value
      this.smsList()
    },
    smsList() {
      let data = {
        // id: ,
        campaign_id: this.$store.state.campaign.idCampaign,
        phone: this.phone,
        networkId: this.networkId,
        status: this.status,
        pageIndex: this.page,
        pageSize: this.pageSize,
      }
      this.$store.dispatch('campaign/smsList', data).then((res) => {
        if (!res.error) {
          this.Listitem = res.data.data.data
          this.pageCount = res.data.data.totalPages
        }
      })
    },
  },
}
</script>
