<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="800px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Cập nhật cấu hình phí
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="black--text pb-3">
        <v-row class="ma-0">
          <v-col cols="6">
            <v-row class="ma-0" no-gutters>
              <v-col cols="12" class="fs-15">
                Loại tin nhắn <span class="red--text">*</span>
              </v-col>
              <v-col
                cols="12"
                class="px-3 pt-2"
                v-for="(item, index) in SelectListsTypeSMS"
                :key="`11${index}`"
              >
                <v-checkbox
                  hide-details=""
                  :true-value="1"
                  @click="selectTypeSMS(item)"
                  :false-value="0"
                  :input-value="item.isSelect"
                  dense
                  class="ma-0 pa-0"
                  color="successNotify"
                >
                  <template v-slot:label>
                    <div class="black--text">{{ item.text }}</div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="12" class="fs-15 pt-3">
                Lĩnh vực kinh doanh <span class="red--text">*</span>
              </v-col>
              <v-col
                cols="12"
                class="px-3 pt-2"
                v-for="(item, index) in SelectListsBusiness"
                :key="`112${index}`"
              >
                <v-checkbox
                  hide-details=""
                  dense
                  @click="selectBusiness(item)"
                  :true-value="1"
                  :false-value="0"
                  :input-value="item.isSelect"
                  class="ma-0 pa-0"
                  color="successNotify"
                >
                  <template v-slot:label>
                    <div class="black--text">{{ item.text }}</div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="12" class="fs-15 pt-3">
                Nhà mạng <span class="red--text">*</span>
              </v-col>
              <v-col
                cols="12"
                class="px-3 pt-2"
                v-for="(item, index) in SelectListsNetwork"
                :key="`1123${index}`"
              >
                <v-checkbox
                  hide-details=""
                  dense
                  :true-value="1"
                  :false-value="0"
                  @click="selectNetwork(item)"
                  :input-value="item.isSelect"
                  class="ma-0 pa-0"
                  color="successNotify"
                >
                  <template v-slot:label>
                    <div class="black--text">{{ item.text }}</div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-row class="ma-0" no-gutters>
              <v-col cols="12" class="fs-15">
                Giá cước <span class="red--text">*</span>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  type="number"
                  dense
                  v-model="price"
                  :error-messages="priceError"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="fs-15">
                Thời gian áp dụng từ ngày <span class="red--text">*</span>
              </v-col>
              <v-col cols="12">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="moment(date1).format('DD/MM/YYYY')"
                      v-on="on"
                      dense
                      outlined
                      readonly
                    />
                  </template>
                  <v-date-picker
                    locale="vi"
                    v-model="date1"
                    @input="onChange1"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" class="fs-15">
                Trạng thái <span class="red--text">*</span>
              </v-col>
              <v-col cols="12">
                <v-switch
                  hide-details=""
                  class="ma-0 pa-0"
                  v-model="status"
                  :true-value="1"
                  :false-value="0"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="secondary text-none" depressed @click="toggle"
          >Đóng</v-btn
        >
        <v-btn class="primary text-none" depressed @click="checkInsert"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    listsBusiness: {
      type: Array,
    },
    listsTypeSMS: {
      type: Array,
    },
    listsNetwork: {
      type: Array,
    },
    strNetworkIds: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      price: null,
      priceError: [],
      status: 0,
      menu1: false,
      date1: moment().format('YYYY-MM-DD'),
      menu2: false,
      date2: moment().format('YYYY-MM-DD'),
      arrSmsId: [],
      arrBusinessId: [],
      arrNetworkId: [],
      SelectListsBusiness: [],
      SelectListsTypeSMS: [],
      SelectListsNetwork: [],
    }
  },
  methods: {
    selectNetwork(item) {
      if (item.isSelect == 1) {
        item.isSelect = 0
      } else {
        item.isSelect = 1
      }
      if (item.isSelect == 1) {
        this.arrNetworkId.push(item.value)
      } else {
        let index = this.arrNetworkId.findIndex((i) => i == item.value)
        this.arrNetworkId.splice(index, 1)
      }
    },
    selectBusiness(item) {
      if (item.isSelect == 1) {
        item.isSelect = 0
      } else {
        item.isSelect = 1
      }
      if (item.isSelect == 1) {
        this.arrBusinessId.push(item.value)
      } else {
        let index = this.arrBusinessId.findIndex((i) => i == item.value)
        this.arrBusinessId.splice(index, 1)
      }
    },
    selectTypeSMS(item) {
      if (item.isSelect == 1) {
        item.isSelect = 0
      } else {
        item.isSelect = 1
      }
      if (item.isSelect == 1) {
        this.arrSmsId.push(item.value)
      } else {
        let index = this.arrSmsId.findIndex((i) => i == item.value)
        this.arrSmsId.splice(index, 1)
      }
    },
    onChange1() {
      this.menu1 = false
    },
    onChange2() {
      this.menu2 = false
    },
    configPriceDetail() {
      let data = {
        strNetworkIds: this.strNetworkIds,
      }
      this.$store
        .dispatch('configPrice/configPriceDetail', data)
        .then((res) => {
          if (!res.error) {
          }
        })
    },
    insert() {
      let data = {
        arrSmsId: this.arrSmsId,
        arrBusinessId: this.arrBusinessId,
        arrNetworkId: this.arrNetworkId,
        price: Number(this.price),
        dateApply: this.date1,
        status: this.status,
      }

      this.$store.dispatch('configPrice/configPriceAdd', data).then((res) => {
        if (!res.error) {
          this.$showSuccess(this, 'Thêm mới cấu hình phí thành công')
          this.toggle()
          this.$emit('success')
        }
      })
    },
    checkInsert() {
      let isError = false
      if (this.$isNullOrEmpty(this.price)) {
        isError = true
        this.priceError = ['Vui lòng nhập giá cước']
      }
      if (this.$isNullOrEmpty(this.arrSmsId)) {
        isError = true
        this.$showWarnNotify(this, 'Vui lòng chọn loại tin nhắn')
      } else if (this.$isNullOrEmpty(this.arrBusinessId)) {
        isError = true
        this.$showWarnNotify(this, 'Vui lòng chọn lĩnh vực kinh doanh')
      } else if (this.$isNullOrEmpty(this.arrNetworkId)) {
        isError = true
        this.$showWarnNotify(this, 'Vui lòng chọn nhà mạng')
      }
      if (!isError) {
        this.insert()
      }
    },
    toggle() {
      this.$emit('toggle')
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.date2 = moment().format('YYYY-MM-DD')
        this.date1 = moment().format('YYYY-MM-DD')
        this.price = null
        this.priceError = []
        this.status = 0
        this.menu1 = false
        this.menu2 = false
        this.arrSmsId = []
        this.arrBusinessId = []
        this.arrNetworkId = []
        this.SelectListsBusiness = []
        this.SelectListsTypeSMS = []
        this.SelectListsNetwork = []
        this.listsBusiness.map((item) => {
          this.SelectListsBusiness.push({
            ...item,
            isSelect: 0,
          })
        })
        this.listsTypeSMS.map((item) => {
          this.SelectListsTypeSMS.push({
            ...item,
            isSelect: 0,
          })
        })
        this.listsNetwork.map((item) => {
          this.SelectListsNetwork.push({
            ...item,
            isSelect: 0,
          })
        })
        this.configPriceDetail()
      }
    },
  },
}
</script>
<style lang="scss">
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px !important;
}
</style>
