<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1300px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Chi tiết cấu hình phí
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="black--text pb-3">
        <v-row class="ma-0" v-if="dataDetail != null">
          <v-col cols="4">
            <div cols="12" class="fs-15 fw-500">Loại tin nhắn:</div>
            <div class="pl-3" v-for="i in dataDetail.smsName" :key="i">
              {{ i }}
            </div>
          </v-col>
          <v-col cols="4">
            <div cols="12" class="fs-15 fw-500">Lĩnh vực kinh doanh:</div>
            <div class="pl-3" v-for="i in dataDetail.businessName" :key="i">
              {{ i }}
            </div>
          </v-col>
          <v-col cols="4">
            <div cols="12" class="fs-15 fw-500">Nhà mạng:</div>
            <div class="pl-3" v-for="i in dataDetail.networkName" :key="i">
              {{ i }}
            </div>
          </v-col>
          <v-col cols="4" class="pt-0">
            <div cols="12" class="fs-15 fw-500">
              Giá cước <span class="red--text">*</span>
            </div>
            <v-text-field
              outlined
              dense
              readonly
              :value="$formatMoney({ amount: dataDetail.price })"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="pt-0">
            <div cols="12" class="fs-15 fw-500">Thời gian áp dụng từ ngày</div>
            <v-text-field
              outlined
              dense
              readonly
              :value="dataDetail.dateApply"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="pt-0">
            <div cols="12" class="fs-15 fw-500">
              Trạng thái <span class="red--text">*</span>
            </div>
            <v-text-field
              outlined
              dense
              readonly
              :value="
                dataDetail.status == 1 ? 'Đang hoạt động' : 'Ngừng hoạt động'
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pt-0">
            <div cols="12" class="fs-15 fw-500">Danh sách lịch sử:</div>
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
              <template v-slot:item="data">
                <tr>
                  <td class="text-center">{{ data.index + 1 }}</td>
                  <td>{{ data.item.smsName }}</td>
                  <td>{{ data.item.businessName }}</td>
                  <td>{{ data.item.networkName }}</td>
                  <td class="text-center">
                    {{ $formatMoney({ amount: data.item.price }) }}
                  </td>
                  <td class="text-center">{{ data.item.dateApply }}</td>
                  <td class="text-center">
                    <v-chip
                      outlined
                      small
                      v-if="data.item.status == 1"
                      color="successNotify"
                      >Hoạt động</v-chip
                    >
                    <v-chip
                      outlined
                      small
                      v-if="data.item.status == 2"
                      color="red"
                      >Chưa hoạt động</v-chip
                    >
                    <v-chip
                      outlined
                      small
                      v-if="data.item.status == 0"
                      color="warning"
                      >Ngừng hoạt động</v-chip
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="secondary text-none" depressed @click="toggle"
          >Đóng</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },

    strNetworkIds: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataDetail: null,
      Listitem: [],
    }
  },
  methods: {
    listNetwork(str) {
      return str.split(',')
    },
    configPriceDetail() {
      let data = {
        strNetworkIds: this.strNetworkIds,
      }
      this.$store
        .dispatch('configPrice/configPriceDetail', data)
        .then((res) => {
          if (!res.error) {
            this.dataDetail = res.data.data

            //history list
            let dataHis = {
              smsId: this.dataDetail.smsId.toString(),
              businessId: this.dataDetail.businessId.toString(),
              networkId: this.dataDetail.networkId.toString(),
            }
            this.$store
              .dispatch('configPrice/history', dataHis)
              .then((res1) => {
                if (!res1.error) {
                  this.Listitem = res1.data.data
                }
              })
          }
        })
        .catch((errors) => {})
    },

    toggle() {
      this.$emit('toggle')
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.configPriceDetail()
      }
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
          value: 'smsName',
          width: 100,
        },
        {
          text: 'Lĩnh vực kinh doanh',
          sortable: false,
          value: 'businessName',
          width: 100,
        },
        {
          text: 'Nhà mạng',
          sortable: false,
          value: 'networkName',
          width: 100,
        },
        {
          text: 'Giá cước',
          sortable: false,
          value: 'price',
          width: 100,
        },
        {
          text: 'Thời gian áp dụng từ ngày',
          sortable: false,
          value: 'dateApply',
          width: 100,
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'status',
          width: 100,
        },
      ]
    },
  },
}
</script>
<style lang="scss">
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px !important;
}
</style>
