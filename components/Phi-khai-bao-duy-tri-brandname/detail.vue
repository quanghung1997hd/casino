<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1300px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Chi tiết cấu hình phí khai báo, phí duy trì</v-card-title
      >
      <v-card-text style="max-height: calc(100vh - 14rem); overflow-x: hidden">
        <v-container class="pt-8 pb-3" fluid>
          <v-row>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <span class="fw-500"> Chính sách phí áp dụng </span>
              <v-select
                v-model="policy"
                :items="listPolicy"
                outlined
                dense
                light
                readonly
                class="mt-2"
              />
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="12" sm="6" md="4" class="py-0" v-if="policy === 1">
              <span class="fw-500">
                Tên khách hàng <span class="errorr--text">*</span>
              </span>
              <v-autocomplete
                v-model="partner"
                :items="Listcutomers"
                :error-messages="partnerErrors"
                class="fs-14"
                no-data-text="Không có dữ liệu"
                outlined
                dense
                light
                readonly
                @input="partnerErrors = []"
              />
            </v-col>

            <v-col cols="12">
              <v-card elevation="0">
                <v-data-table
                  :headers="headers"
                  :items="items"
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
                      <td>{{ data.item.name }}</td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="data.item.declarationFee"
                          :error-messages="data.item.declarationFeeError"
                          @input="checkValuePrice(data.item)"
                        >
                        </v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          readonly
                          v-model="data.item.maintainingFee"
                          :error-messages="data.item.maintainingFeeError"
                          @input="checkValuePrice1(data.item)"
                        >
                        </v-text-field>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
            <v-col cols="4">
              <span
                >Thời gian áp dụng từ ngày
                <span class="red--text">*</span></span
              >
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    v-model="registerTime"
                    prepend-inner-icon="mdi-calendar-range "
                    dense
                    outlined
                    readonly
                    class="mt-2"
                    @input="registerTimeError = []"
                    :error-messages="registerTimeError"
                    disabled
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="menu_date"
                  locale="vi"
                  @input="menu = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4"></v-col>
            <v-col cols="12" sm="6" md="4">
              <span>Trạng thái <span class="red--text">*</span></span>
              <v-select
                v-model="status"
                :items="listStatus"
                dense
                class="fs-14 mt-2"
                light
                outlined
                readonly
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import Constants from '~/assets/configurations/constant'

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open', 'data'],
  data: () => ({
    menu: false,
    menu_date: moment().format('YYYY-MM-DD'),

    registerTimeError: [],
    policy: 0,
    listPolicy: Constants.System.DeclareBrandname.listPolicy,
    partnerErrors: [],
    status: 1,
    listStatus: Constants.System.DeclareBrandname.listStatusAdd,
    items: [],

    Listcutomers: [],
  }),
  watch: {
    open(value) {
      if (value) {
        // this.listnetwork()
        this.getListCustomers()
        this.getDetail()
      }
    },
  },
  computed: {
    registerTime() {
      return moment(this.menu_date).format('DD/MM/YYYY')
    },
    headers() {
      return [
        {
          text: 'Nhà mạng',
          sortable: false,
          value: 'name',
          width: '13%',
        },
        {
          text: 'Phí khai báo *',
          sortable: false,
          value: 'declarationFee',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Phí duy trì *',
          sortable: false,
          value: 'maintainingFee',
          align: 'center',
          width: '13%',
        },
      ]
    },
  },
  methods: {
    getDetail() {
      this.$store
        .dispatch('maintain/detail', {
          code: this.data.code,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.items = []
            this.itemsData = []
            this.itemsData = res.data.data
            this.$store.dispatch('maintain/networkSelect', {}).then((res) => {
              if (res.data.error.code === 0) {
                this.itemsData.map((item) => {
                  res.data.data.filter((i) => {
                    if (item.networkId === i.id) {
                      this.items.push({
                        id: item.id,
                        networkId: item.networkId,
                        name: i.name,
                        declarationFee: this.$isNullOrEmpty(item.declarationFee)
                          ? 0
                          : this.$formatMoney({ amount: item.declarationFee }),
                        maintainingFee: this.$isNullOrEmpty(item.maintainingFee)
                          ? 0
                          : this.$formatMoney({ amount: item.maintainingFee }),
                        declarationFeeError: [],
                        maintainingFeeError: [],
                      })
                    }
                  })
                })
              }
            })
            this.policy = res.data.data[0].customerId === 0 ? 0 : 1
            this.partner = res.data.data[0].customerId
            this.menu_date = this.$isNullOrEmpty(
              res.data.data[0].timeApplication
            )
              ? ''
              : moment(
                  res.data.data[0].timeApplication,
                  'DD/MM/YYYY HH:mm:ss'
                ).format('YYYY-MM-DD')
            this.status = res.data.data[0].status
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
        .catch((errors) => {})
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
    },

    checkValidate() {
      let hasErrors = false

      if (this.policy === 1) {
        if (this.$isNullOrEmpty(this.partner)) {
          hasErrors = true
          this.partnerErrors = ['Vui lòng chọn Tên khách hàng ']
        }
      }
      if (this.$isNullOrEmpty(this.registerTime)) {
        hasErrors = true
        this.registerTimeError = ['Vui lòng chọn ngày áp dụng']
      }
      for (let i = 0; i < this.items.length; i++) {
        if (this.$isNullOrEmpty(this.items[i].declarationFee)) {
          hasErrors = true
          this.items[
            i
          ].declarationFeeError = `Vui lòng nhập phí khai báo của nhà mạng ${this.items[i].name}`
        } else if (isNaN(this.items[i].declarationFee.replace(/,/g, ''))) {
          hasErrors = true
          this.items[i].declarationFeeError = ['Vui lòng nhập đúng định dạng']
        }

        if (this.$isNullOrEmpty(this.items[i].maintainingFee)) {
          hasErrors = true
          this.items[
            i
          ].maintainingFeeError = `Vui lòng nhập phí khai báo của nhà mạng ${this.items[i].name}`
        } else if (isNaN(this.items[i].maintainingFee.replace(/,/g, ''))) {
          hasErrors = true
          this.items[i].maintainingFeeError = ['Vui lòng nhập đúng định dạng']
        }
      }
      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      const declareNetworkDtos = []
      for (let i = 0; i < this.items.length; i++) {
        declareNetworkDtos.push({
          networkId: this.items[i].networkId,
          declarationFee: this.items[i].declarationFee.replace(/,/g, ''),
          maintainingFee: this.items[i].maintainingFee.replace(/,/g, ''),
        })
      }
      let data = {
        customerId: this.policy === 0 ? 0 : this.partner,
        declareNetworkDtos,
        timeApplication: this.registerTime,
        status: this.status,
      }
      this.$store
        .dispatch('maintain/update', data)
        .then((response) => {
          if (!response.error) {
            this.$showSuccess(this, 'Cập nhật thành công')
            this.toggle()
            this.$emit('success')
          }
        })
        .catch((errors) => {})
        .catch((e) => {
          this.$log.debug(e)
        })
        .finally(() => {})
    },
  },
}
</script>
