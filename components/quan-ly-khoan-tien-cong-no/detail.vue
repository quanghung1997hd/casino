<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1700px"
    scrollable
    persistent
  >
    <v-card>
      <div class="py-3 text-center center-title">Chi tiết công nợ</div>
      <v-card-text style="max-height: calc(100vh - 14rem); overflow-x: hidden">
        <v-container class="pt-5" fluid>
          <div class="fw-500 fs-16 text-uppercase black--text text-center pb-8">
            <span v-if="customerName != null"> {{ customerName }}</span>
            - tháng
            <span v-if="monthYear != null">
              {{ monthYear.substring(0, 2) }}/{{
                monthYear.substring(2, 6)
              }}</span
            >
          </div>

          <div class="fw-500 fs-14 text-uppercase black--text">
            thông tin nợ
          </div>
          <v-divider class="py-2" />
          <v-row class="mb-5 black--text fw-500">
            <v-col cols="4">
              <div>
                <span>Tổng nợ:</span>
                <span class="fw-600 pl-5">{{
                  $formatMoney({ amount: totalDebt })
                }}</span>
              </div>
            </v-col>
            <v-col cols="4">
              <div>
                <span>Đã thanh toán: </span>
                <span class="fw-600 pl-5">
                  {{ $formatMoney({ amount: moneyPaid }) }}
                </span>
              </div>
            </v-col>
            <v-col cols="4">
              <div>
                <span>Còn nợ:</span>
                <span class="fw-600 pl-5">
                  {{ $formatMoney({ amount: moneyUnpaid }) }}
                </span>
              </div>
            </v-col>
            <v-col cols="4">
              <div>
                <span>Hạn thanh toán:</span>
                <span class="fw-600 pl-5">
                  {{ paymentExpiration }}
                </span>
              </div>
            </v-col>
          </v-row>
          <div class="fw-500 fs-14 text-uppercase black--text mb-1">
            Chi tiết công nợ
          </div>
          <v-card elevation="0">
            <v-data-table
              :headers="headers"
              :items="items"
              :page.sync="page"
              :items-per-page="pageSize"
              show-select
              hide-default-footer
              loading-text="Xin chờ..."
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              fixed-header
              class="elevation-0 custom_header_table"
              light
            >
              <template v-slot:[`header.data-table-select`]>
                <div class="w-100 d-flex justify-center">
                  <v-checkbox
                    v-model="tick_all"
                    class="ma-0"
                    hide-details
                    :disabled="(items || []).length === 0"
                    :ripple="false"
                    @change="selectall"
                  >
                  </v-checkbox>
                </div>
              </template>

              <template v-slot:[`item.data-table-select`]="{ item }">
                <div class="w-100 d-flex justify-center">
                  <v-checkbox
                    v-if="item.status !== 2"
                    v-model="item.checked"
                    class="ma-0"
                    hide-details
                    :true-value="1"
                    :false-value="0"
                    :ripple="false"
                    @change="set_value($event, item)"
                  >
                  </v-checkbox>
                </div>
              </template>
              <template v-slot:[`item.reason`]="{ item }">
                <div>{{ item.reason }}</div>
              </template>
              <template v-slot:[`item.monthYear`]="{ item }">
                <div>
                  <span v-if="item.monthYear != null">
                    {{ item.monthYear.substring(0, 2) }}/{{
                      item.monthYear.substring(2, 6)
                    }}</span
                  >
                </div>
              </template>
              <template v-slot:[`item.totalDebt`]="{ item }">
                <div>{{ $formatMoney({ amount: item.totalDebt }) }}</div>
              </template>
              <template v-slot:[`item.bankName`]="{ item }">
                <div v-if="!$isNullOrEmpty(item.bankName)">
                  Ngân hàng: {{ item.bankName }}
                </div>
                <div v-if="!$isNullOrEmpty(item.bankNumber)">
                  STK: {{ item.bankNumber }}
                </div>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-chip v-if="item.status === 0" small outlined color="red"
                  >Chưa thanh toán</v-chip
                >
                <v-chip v-if="item.status === 1" small outlined color="warning"
                  >Đang thanh toán</v-chip
                >
                <v-chip v-if="item.status === 2" small outlined color="green"
                  >Đã thanh toán</v-chip
                >
                <v-chip v-if="item.status === 3" small outlined color="red"
                  >Quá hạn thanh toán</v-chip
                >
              </template>
            </v-data-table>
            <v-btn
              :disabled="checkDisabled"
              depressed
              class="primary mt-2"
              @click="paymentConfirm"
              v-if="moneyUnpaid > 0"
              >Xác nhận thanh toán</v-btn
            >
          </v-card>
        </v-container>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
      </v-card-actions>

      <confirm
        :open="openConfirm"
        :dataItem="dataItem"
        :monthYear="monthYear"
        :customerName="customerName"
        @toggle="openConfirm = !openConfirm"
        @success="getDetail"
      ></confirm>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import confirm from '~/components/quan-ly-khoan-tien-cong-no/confirm.vue'
import Constants from '~/assets/configurations/constant'
const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  components: {
    confirm,
  },
  props: ['open', 'data'],
  data: () => ({
    openConfirm: false,
    checkDisabled: true,
    tick_all: false,
    dataItem: {},
    menu: false,
    menu_date: moment().format('YYYY-MM-DD'),
    totalDebt: null,
    moneyPaid: null,
    moneyUnpaid: null,
    paymentExpiration: null,
    registerTimeError: [],
    policy: 0,
    partnerErrors: [],
    status: 1,
    items: [],
    data_selected: [],

    page: 1,
    pageCount: null,
    pageSize: 1000000000000000000,
    monthYear: null,
    customerName: null,
  }),
  watch: {
    open(value) {
      if (value) {
        this.getDetail()
      }
    },
  },
  computed: {
    registerTime() {
      return moment(this.menu_date).format('DD/MM/YYYY')
    },
    headers() {
      return Constants.System.Debt.headersDetails
    },
  },

  methods: {
    set_selected_all(checked) {
      const arr = [...this.items]
      for (let i = 0; i < arr.length; i++) {
        arr[i] = {
          ...arr[i],
          checked,
        }
        if (checked === 0 && this.data_selected.length > 0) {
          const arr1 = [...this.data_selected]
          for (let j = 0; j < this.data_selected.length; j++) {
            if (arr[i].id === this.data_selected[j].id) {
              arr1.splice(j, 1)
            }
          }
          this.data_selected = [...arr1]
        }
      }
      this.items = [...arr]
    },
    selectall(value) {
      if (value) {
        this.set_selected_all(1)
        const arr = [...this.items]
        this.disabled = false
        this.checkDisabled = false
        for (let i = 0; i < arr.length; i++) {
          if (this.data_selected.length > 0) {
            const arr1 = [...this.data_selected]
            for (let j = 0; j < this.data_selected.length; j++) {
              if (arr[i].id === this.data_selected[j].id) {
                arr1.splice(j, 1)
              }
            }
            this.data_selected = [...arr1]
          }
        }
        const arr2 = []
        for (let i = 0; i < arr.length; i++) {
          arr2.push(arr[i])
        }
        this.data_selected = [...arr2, ...this.data_selected]
      } else {
        this.set_selected_all(0)
        this.disabled = true
        this.checkDisabled = true
      }
    },
    set_value(value, item) {
      const arrselected = [...this.data_selected]

      if (value === 1) {
        arrselected.push(item)
      } else {
        for (let i = 0; i < arrselected.length; i++) {
          if (item.id === arrselected[i].id) {
            arrselected.splice(i, 1)
          }
        }
        this.checkDisabled = true
      }
      this.data_selected = [...arrselected]

      const arr = []

      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].checked === 1) {
          arr.push(this.items[i].checked)
          this.checkDisabled = false
        }
      }

      if (arr.length > 0 && arr.length < this.items.length) {
        this.disabled = false
      } else if (arr.length === this.items.length) {
        this.tick_all = true
        this.disabled = false
      } else if (arr.length === 0) {
        this.tick_all = false
        this.disabled = true
      }
    },

    getDetail() {
      this.data_selected = []
      this.$store
        .dispatch('debt/detail', {
          customerId: this.data.customerId,
          monthYear: this.data.monthYear,
          customerName: this.data.customerName,
        })
        .then((response) => {
          if (response.data.error.code === 0) {
            this.items = []
            for (let i = 0; i < response.data.data.length; i++) {
              if (response.data.data[i].type === 1) {
                this.totalDebt = response.data.data[i].totalDebt
                this.moneyPaid = response.data.data[i].moneyPaid
                this.moneyUnpaid = response.data.data[i].moneyUnpaid
                this.paymentExpiration = this.$isNullOrEmpty(
                  response.data.data[i].paymentExpiration
                )
                  ? null
                  : moment(
                      response.data.data[i].paymentExpiration,
                      'DD/MM/YYYY HH:mm:ss'
                    ).format('DD/MM/YYYY')
              } else {
                this.items.push({ ...response.data.data[i] })
              }
            }

            this.monthYear = this.data.monthYear
            this.customerName = this.data.customerName

            if ((response.data.data || []).length !== 0) {
              for (let i = 0; i < response.data.data.length; i++) {
                response.data.data[i] = {
                  ...response.data.data[i],
                  stt: i + 1,
                  checked: 0,
                }

                for (let j = 0; j < this.data_selected.length; j++) {
                  if (response.data.data.id === this.data_selected[j].id) {
                    response.data.data[i] = {
                      ...response.data.data[i],
                      checked: 1,
                    }
                  }
                }
              }
              let count = 0

              for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].checked === 1) {
                  count += 1
                }
              }
              if (count === response.data.datalength) {
                this.tick_all = true
              } else {
                this.tick_all = false
              }
            }
            this.pageCount = response.data.data.totalPages
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].type === 0) {
                if (this.items[i].status === 2 || this.items.length === 0) {
                  this.checkDisabled = true
                }
              }
            }
          }
        })
        .catch((errors) => {})
    },

    // validate input phí khai báo
    checkValuePrice(e) {
      const value = String(e.declarationFee)
      if ((value || []).length !== 0) {
        const numberFormat = value.replace(/,/g, '')
        if (isNaN(numberFormat)) {
          e.declarationFeeError = ['Vui lòng nhập đúng định dạng']
        } else if (numberFormat <= -1) {
          e.declarationFeeError = ['Vui lòng nhập đúng định dạng']
          e.declarationFee = this.formatNumber({ amount: numberFormat })
        } else {
          e.declarationFeeError = []
          e.declarationFee = this.formatNumber({ amount: numberFormat })
        }
      } else {
        e.declarationFeeError = `Vui lòng nhập phí khai báo nhà mạng ${e.name}`
      }
    },
    // validate phí duy trì
    checkValuePrice1(e) {
      const value = String(e.maintainingFee)
      if ((value || []).length !== 0) {
        const numberFormat = value.replace(/,/g, '')
        if (isNaN(numberFormat)) {
          e.maintainingFeeError = ['Vui lòng nhập đúng định dạng']
        } else if (numberFormat <= -1) {
          e.maintainingFeeError = ['Vui lòng nhập đúng định dạng']
          e.maintainingFee = this.formatNumber({ amount: numberFormat })
        } else {
          e.maintainingFeeError = []
          e.maintainingFee = this.formatNumber({ amount: numberFormat })
        }
      } else {
        e.maintainingFeeError = `Vui lòng nhập phí duy trì nhà mạng ${e.name}`
      }
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

    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.brandName = null
      this.partner = null
      this.status = 0
      this.brandNameErrors = []
      this.partnerErrors = []
      this.checkDisabled = true
      this.getList
    },

    paymentConfirm() {
      const arr = []
      for (let i = 0; i < this.data_selected.length; i++) {
        if (this.data_selected[i].status !== 2) {
          arr.push(this.data_selected[i])
        }
      }
      this.dataItem = arr
      this.openConfirm = true
    },
  },
}
</script>
<style>
.center-title {
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #1461ad;
  font-size: 1.25rem;
}
</style>
