<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="900px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3 text-center"
        >Xác nhận thanh toán</v-card-title
      >
      <v-card-text style="max-height: calc(100vh - 14rem); overflow-x: hidden">
        <v-container class="pt-5" fluid>
          <div class="fw-500 fs-16 text-uppercase black--text text-center pb-8">
            <span v-if="customerName != null"> {{ customerName }}</span> - tháng
            <span v-if="monthYear != null">
              {{ monthYear.substring(0, 2) }}/{{
                monthYear.substring(2, 6)
              }}</span
            >
          </div>
          <v-card elevation="0" class="pb-5">
            <v-data-table
              :headers="headers"
              :items="items"
              :page.sync="page"
              :items-per-page="pageSize"
              hide-default-footer
              loading-text="Xin chờ..."
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              fixed-header
              class="elevation-0 custom_header_table"
              light
            >
              <template v-slot:[`item.totalDebt`]="{ item }">
                <div>{{ $formatMoney({ amount: item.totalDebt }) }}</div>
              </template>
            </v-data-table>
          </v-card>

          <v-col cols="7" class="pb-0">
            <div>Tài khoản nhận (<span class="red--text">*</span>)</div>
            <v-autocomplete
              :items="listBank"
              v-model="bankName"
              outlined
              dense
              light
              item-text="bankName"
              item-value="id"
              no-data-text="Không có dữ liệu"
              clearable
              @input="bankNameErrors = []"
              :error-messages="bankNameErrors"
            ></v-autocomplete>
          </v-col>
          <v-col cols="7" class="pb-0">
            <div>Mã REF</div>
            <v-text-field
              v-model="codeRef"
              outlined
              dense
              light
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="7" class="pb-0">
            <div>Ngày chuyển khoản</div>
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
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="menu_date"
                @change="save_date"
                locale="vi"
                @input="menu = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="7" class="pb-0">
            <div>Số tiền chuyển (<span class="red--text">*</span>)</div>
            <v-text-field
              v-model="totalMoney"
              outlined
              dense
              light
              disabled
            ></v-text-field>
            {{ totalMoneyString }}
          </v-col>
        </v-container>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary" @click="checkValidate">
          <div class="text-none">Cập nhật</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open', 'dataItem', 'monthYear', 'customerName'],
  data: () => ({
    bankName: null,
    listBank: [],
    bankNameErrors: [],
    codeRef: null,
    tick_all: false,
    menu: false,
    menu_date: moment().format('YYYY-MM-DD'),
    totalDebt: null,
    moneyPaid: null,
    moneyUnpaid: null,
    paymentExpiration: null,
    registerTime: null,
    policy: 0,
    partnerErrors: [],
    status: 1,
    items: [],
    data_selected: [],
    totalMoney: null,
    totalMoneyString: '',
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
        this.dataSelectOfBank()
      }
    },
  },
  computed: {
    headers() {
      return [
        {
          text: 'Nội dung nợ ',
          sortable: false,
          value: 'reason',
          align: 'center',
          width: 200,
        },
        {
          text: 'Tổng nợ',
          sortable: false,
          value: 'totalDebt',
          align: 'center',
          width: 200,
        },
      ]
    },
  },

  methods: {
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    dataSelectOfBank() {
      this.$store.dispatch('debt/dataSelectOfBank', {}).then((response) => {
        if (response.data.error.code === 0) {
          this.listBank = response.data.data
        }
      })
    },
    getDetail() {
      let cont = 0
      this.items = []
      let arr = []
      this.dataItem.map((item) => {
        cont += item.totalDebt
        this.items.push({
          id: item.id,
          reason: item.reason,
          totalDebt: item.totalDebt,
          monthYear: item.monthYear,
          customerName: item.customerName,
        })
      })

      this.items.map((item) => {
        arr = [
          ...this.items,
          { reason: 'Tổng nợ', code: 'total', totalDebt: cont },
        ]
      })

      this.items = arr
      for (let i = 0; i < this.items.length; i++) {
        if (!this.$isNullOrEmpty(this.items[i].code)) {
          this.totalMoney = this.$formatMoney({
            amount: this.items[i].totalDebt,
          })
          this.totalMoneyString =
            'Bằng chữ: ' + this.to_vietnamese(this.items[i].totalDebt, 'đồng')
        }
      }
    },

    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.bankName = null
      this.codeRef = null
      this.totalMoney = null
      this.totalMoneyString = ''
      this.registerTime = null
      this.getList
    },

    checkValidate() {
      let hasError = false
      if (this.$isNullOrEmpty(this.bankName)) {
        hasError = true
        this.bankNameErrors = ['Vui lòng chọn tài khoản người nhận']
      }

      if (!hasError) {
        const id = []
        for (let i = 0; i < this.items.length; i++) {
          if (this.$isNullOrEmpty(this.items[i].code)) {
            id.push(this.items[i].id)
          }
        }

        this.$store
          .dispatch('debt/paymentConfirmation', {
            id,
            tradingDate: this.registerTime,
            refCode: this.codeRef,
            bankId: this.bankName,
          })
          .then((res) => {
            if (res.data.error.code === 0) {
              this.$showSuccess(this, 'Xác nhận đơn hàng thành công')
              this.toggle()
              this.$emit('success')
            }
          })
          .catch((errors) => {})
      }
    },
    to_vietnamese(str, currency) {
      var u = '2 nghìn triệu tỉ'.split(' ')

      var str = parseInt(str) + ''
      var i = 0
      var arr = []
      var index = str.length
      var result = []
      if (index == 0 || str == 'NaN') return ''
      var string = ''

      //explode number string into blocks of 3numbers and push to queue
      while (index >= 0) {
        arr.push(str.substring(index, Math.max(index - 3, 0)))
        index -= 3
      }

      //loop though queue and convert each block
      for (i = arr.length - 1; i >= 0; i--) {
        if (arr[i] != '' && arr[i] != '000') {
          result.push(this.block_of_three(arr[i]))
          if (u[i]) result.push(u[i])
        }
      }
      if (currency) result.push(currency)
      string = result.join(' ')
      //remove unwanted white space
      return string.replace(/[0-9]/g, '').replace(/  /g, ' ').replace(/ $/, '')
    },
    block_of_three(d) {
      var default_numbers = ' hai ba bốn năm sáu bảy tám chín'
      var units = ('1 một' + default_numbers).split(' ')
      var tr = 'không một' + default_numbers
      var tram = tr.split(' ')

      var _a = d + ''
      if (d == '000') return ''
      switch (_a.length) {
        case 0:
          return ''

        case 1:
          return units[_a]

        case 2:
          return this.tenth(_a)

        case 3:
          var sl12 = ''
          if (_a.slice(1, 3) != '00') sl12 = this.tenth(_a.slice(1, 3))
          var sl3 = tram[_a[0]] + ' trăm'
          return sl3 + ' ' + sl12
      }
    },
    tenth(a) {
      var default_numbers = ' hai ba bốn năm sáu bảy tám chín'
      var units = ('1 một' + default_numbers).split(' ')
      var ch = 'lẻ mười' + default_numbers
      var chuc = ch.split(' ')
      var sl1 = units[a[1]]
      var sl2 = chuc[a[0]]
      var append = ''
      if (a[0] > 0 && a[1] == 5) sl1 = 'lăm'
      if (a[0] > 1) {
        append = ' mươi'
        if (a[1] == 1) sl1 = ' mốt'
      }
      var str = sl2 + '' + append + ' ' + sl1
      return str
    },
  },
}
</script>
