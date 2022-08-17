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
        Thêm mới cấu hình phí
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
              <v-col cols="12" class="px-3 pt-2">
                <v-checkbox
                  hide-details=""
                  :true-value="1"
                  :false-value="0"
                  dense
                  class="ma-0 pa-0"
                  color="successNotify"
                  v-model="allMessage"
                  @change="checkvalue(allMessage)"
                >
                  <template v-slot:label>
                    <div class="black--text">Tất cả</div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col
                cols="12"
                class="px-3 pt-2"
                v-for="(item, index) in listsTypeSMS"
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
              <v-col cols="12" class="px-3 pt-2">
                <v-checkbox
                  hide-details=""
                  :true-value="1"
                  :false-value="0"
                  dense
                  class="ma-0 pa-0"
                  color="successNotify"
                  v-model="allBusiness"
                  @change="checkvalueBusiness(allBusiness)"
                >
                  <template v-slot:label>
                    <div class="black--text">Tất cả</div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col
                cols="12"
                class="px-3 pt-2"
                v-for="(item, index) in listsBusiness"
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
              <v-col cols="12" class="px-3 pt-2">
                <v-checkbox
                  hide-details=""
                  :true-value="1"
                  :false-value="0"
                  dense
                  class="ma-0 pa-0"
                  color="successNotify"
                  v-model="allNetwork"
                  @change="checkvalueNetwork(allNetwork)"
                >
                  <template v-slot:label>
                    <div class="black--text">Tất cả</div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col
                cols="12"
                class="px-3 pt-2"
                v-for="(item, index) in listsNetwork"
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
                  v-model="price"
                  outlined
                  dense
                  :error-messages="priceError"
                  @keyup="checkValuePrice"
                  onKeyPress="if(this.value.length==20) return false;"
                  @keypress="isNumber($event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="fs-15"> Thời gian áp dụng từ ngày</v-col>
              <v-col cols="12">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startTime"
                      placeholder="dd/mm/yyyy"
                      prepend-inner-icon="mdi-calendar-range "
                      v-on="on"
                      dense
                      outlined
                      readonly
                    />
                  </template>
                  <v-date-picker
                    @change="save_date"
                    :active-picker.sync="activePicker"
                    v-model="menu_date"
                    locale="vi"
                    @input="menu = false"
                    :allowed-dates="allowedDates"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" class="fs-15">
                Trạng thái <span class="red--text">*</span>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="status"
                  :items="listStatus"
                  dense
                  class="fs-14"
                  light
                  outlined
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="secondary text-none" depressed @click="toggle"
          >Đóng
        </v-btn>
        <v-btn class="primary text-none" depressed @click="checkInsert"
          >Lưu
        </v-btn>
      </v-card-actions>
      <loading :open="openLoading"></loading>
    </v-card>
  </v-dialog>
</template>
<script>
import moment from 'moment'
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    loading,
  },
  data() {
    return {
      allBusiness: null,
      openLoading: false,
      allNetwork: null,
      allMessage: null,
      price: null,
      priceError: [],
      status: 1,
      menu: false,
      menu_date: moment().format('YYYY-MM-DD'),
      startTime: null,
      arrSmsId: [],
      arrBusinessId: [],
      arrNetworkId: [],
      listsBusiness: [],
      listsTypeSMS: [],
      listsNetwork: [],
      activePicker: null,
      listStatus: Constants.System.ConfigPrice.listStatus,
    }
  },
  methods: {
    checkvalueNetwork(value) {
      if (value === 1) {
        for (let i = 0; i < this.listsNetwork.length; i++) {
          this.listsNetwork[i].isSelect = 1
          this.arrNetworkId.push(this.listsNetwork[i].value)
        }
      } else {
        for (let i = 0; i < this.listsNetwork.length; i++) {
          this.listsNetwork[i].isSelect = 0
          this.arrNetworkId = []
        }
      }
    },
    checkvalueBusiness(value) {
      if (value === 1) {
        for (let i = 0; i < this.listsBusiness.length; i++) {
          this.listsBusiness[i].isSelect = 1
          this.arrBusinessId.push(this.listsBusiness[i].value)
        }
      } else {
        for (let i = 0; i < this.listsBusiness.length; i++) {
          this.listsBusiness[i].isSelect = 0
          this.arrBusinessId = []
        }
      }
    },
    isNumber(e) {
      e = e ? e : window.e
      var charCode = e.which ? e.which : e.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault()
      } else {
        return true
      }
    },
    checkvalue(value) {
      if (value === 1) {
        for (let i = 0; i < this.listsTypeSMS.length; i++) {
          this.listsTypeSMS[i].isSelect = 1
          this.arrSmsId.push(this.listsTypeSMS[i].value)
        }
      } else {
        for (let i = 0; i < this.listsTypeSMS.length; i++) {
          this.listsTypeSMS[i].isSelect = 0
          this.arrSmsId = []
        }
      }
    },
    selectNetworkActive() {
      this.$store
        .dispatch('configPrice/selectNetworkActive')
        .then((res) => {
          if (!res.error) {
            this.listsNetwork = []
            res.data.data.map((item) => {
              this.listsNetwork.push({
                text: item.name,
                value: item.id,
                isSelect: 0,
              })
            })
          }
        })
        .catch((errors) => {})
    },
    businessSelectData() {
      this.$store
        .dispatch('configPrice/businessSelectDataActive')
        .then((res) => {
          if (!res.error) {
            this.listsBusiness = []
            res.data.data.map((item) => {
              if (!this.$isNullOrEmpty(item.name)) {
                this.listsBusiness.push({
                  text: item.name,
                  value: item.id,
                  isSelect: 0,
                })
              }
            })
          }
        })
        .catch((errors) => {})
    },
    typeSmsSelectData() {
      this.$store
        .dispatch('configPrice/typeSmsSelectDataActive')
        .then((res) => {
          if (!res.error) {
            this.listsTypeSMS = []
            res.data.data.map((item) => {
              if (!this.$isNullOrEmpty(item.name)) {
                this.listsTypeSMS.push({
                  text: item.name,
                  value: item.id,
                  isSelect: 0,
                })
              }
            })
          }
        })
        .catch((errors) => {})
    },

    allowedDates(value) {
      const today = moment(new Date()).format('YYYY-MM-DD')
      if (today <= value) {
        return true
      } else {
        return false
      }
    },
    save_date(date) {
      this.startTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    checkValuePrice() {
      this.price = this.$formatMoney({
        amount: this.price,
      })
    },

    formatNumber(payload) {
      try {
        const decimalCount = 0
        const thousands = ','
        const decimal = '.'

        const negativeSign = payload.amount < 0 ? '-' : ''

        const i = parseInt(
          (payload.amount = Math.abs(Number(payload.amount) || 0).toFixed(
            decimalCount
          ))
        ).toString()
        const j = i.length > 3 ? i.length % 3 : 0

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(payload.amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : '')
        )
      } catch (e) {}
    },

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

      if (this.arrNetworkId.length === this.listsNetwork.length) {
        this.allNetwork = 1
      } else {
        this.allNetwork = 0
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

      if (this.arrBusinessId.length === this.listsBusiness.length) {
        this.allBusiness = 1
      } else {
        this.allBusiness = 0
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

      if (this.arrSmsId.length === this.listsTypeSMS.length) {
        this.allMessage = 1
      } else {
        this.allMessage = 0
      }
    },
    onChange1() {
      this.menu1 = false
    },
    onChange2() {
      this.menu2 = false
    },
    insert() {
      this.openLoading = true
      let data = {
        arrSmsId: this.arrSmsId,
        arrBusinessId: this.arrBusinessId,
        arrNetworkId: this.arrNetworkId,
        price: Number(this.price.replace(/\./g, '')),
        dateApply: this.$isNullOrEmpty(this.startTime)
          ? ''
          : `${this.startTime}`,
        status: this.status,
      }
      setTimeout(() => {
        this.$store
          .dispatch('configPrice/configPriceAdd', data)
          .then((res) => {
            this.openLoading = false
            if (!res.error) {
              this.$showSuccess(this, 'Thêm mới cấu hình phí thành công')
              this.toggle()
              this.$emit('success')
            }
          })
          .catch((errors) => {
            this.openLoading = false
          })
      }, 1000)
    },
    checkInsert() {
      let isError = false
      if (this.$isNullOrEmpty(this.price)) {
        isError = true
        this.priceError = ['Giá cước bắt buộc nhập']
      }
      if (!this.$isNullOrEmpty(this.price)) {
        if (isNaN(this.price.replace(/\./g, ''))) {
          isError = true
          this.priceError = ['Vui lòng nhập đúng định dạng']
        } else if (this.price.replace(/\./g, '') <= 0) {
          isError = true
          this.priceError = ['Vui lòng nhập đúng định dạng']
        }
      }

      if ((this.arrSmsId || []).length === 0) {
        isError = true
        this.$showWarnNotify(this, 'Loại tin nhắn bắt buộc chọn')
      } else if ((this.arrBusinessId || []).length === 0) {
        isError = true
        this.$showWarnNotify(this, 'Lĩnh vực kinh doanh bắt buộc chọn')
      } else if (this.$isNullOrEmpty(this.arrNetworkId)) {
        isError = true
        this.$showWarnNotify(this, 'Nhà mạng bắt buộc chọn')
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
        this.startTime = null
        this.price = null
        this.priceError = []
        this.status = 1
        this.menu1 = false
        this.menu2 = false
        this.arrSmsId = []
        this.arrBusinessId = []
        this.arrNetworkId = []
        this.SelectListsBusiness = []
        this.SelectListsTypeSMS = []
        this.SelectListsNetwork = []
        this.activePicker = null
        this.allBusiness = null
        this.allNetwork = null
        this.allMessage = null
        this.selectNetworkActive()
        this.businessSelectData()
        this.typeSmsSelectData()
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
