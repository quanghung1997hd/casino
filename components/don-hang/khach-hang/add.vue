<template>
  <v-dialog
    :value="open"
    :max-width="1300"
    @keydown="$event.key === 'Escape' && toggle()"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Thêm mới thông tin đơn hàng
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pb-2 py-4">
        <v-row class="ma-0" no-gutters style="color: black">
          <v-col cols="12">
            <div
              style="color: black"
              class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
            >
              Thông tin đơn hàng
            </div>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Mã đơn hàng (<span class="red--text">*</span>)</span
            >
            <v-text-field
              class="fs-14"
              disabled
              outlined
              dense
              light
              placeholder="Hệ thống sẽ tự sinh sau khi thêm mới thành công"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Tên người liên hệ (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="contactName"
              class="fs-14"
              outlined
              dense
              light
              @input="contactNameErrors = []"
              :error-messages="contactNameErrors"
              onKeyPress="if(this.value.length==100) return false;"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Số điện thoại liên hệ (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="phone"
              class="fs-14"
              outlined
              type="number"
              dense
              light
              @input="phoneErrors = []"
              :error-messages="phoneErrors"
              onKeyPress="if(this.value.length==10) return false;"
              @keypress="isNumber($event)"
            />
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Hình thức chuyển khoản (<span class="red--text">*</span>)</span
            >
            <v-autocomplete
              v-model="bankTransfer"
              :items="listbankTransfer"
              class="fs-14"
              outlined
              dense
              light
              @input="bankTransferErrors = []"
              :error-messages="bankTransferErrors"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              STK chuyển tiền (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="STK"
              class="fs-14"
              outlined
              dense
              light
              @input="STKErrors = []"
              :error-messages="STKErrors"
              onKeyPress="if(this.value.length==50) return false;"
              type="number"
              @keypress="isNumber($event)"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Ngân hàng (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="bank"
              class="fs-14"
              outlined
              dense
              light
              @input="bankErrors = []"
              :error-messages="bankErrors"
              onKeyPress="if(this.value.length==100) return false;"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Chi nhánh </span>
            <v-text-field
              v-model="branch"
              class="fs-14"
              outlined
              dense
              light
              @input="branchError = []"
              :error-messages="branchError"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Giá trị đơn hàng (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="orderValue"
              class="fs-14"
              outlined
              dense
              light
              @keyup="calculatePriceReal"
              :error-messages="orderValueError"
              @keypress="isNumber($event)"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Mã giao dịch (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="tradingCode"
              class="fs-14"
              outlined
              dense
              light
              @input="tradingCodeErrors = []"
              :error-messages="tradingCodeErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Chiết khấu </span>
            <v-text-field
              v-model="discount"
              class="fs-14 fw-500"
              outlined
              dense
              light
              readonly
            >
              <template v-slot:append-outer>
                <div class="mt-1 black--text fs-18">%</div>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Hạn mức </span>
            <v-text-field
              readonly
              v-model="moneyLimit"
              class="fs-14 fw-500"
              outlined
              dense
              light
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Số tiền nạp thực tế </span>
            <v-text-field
              v-model="priceReal"
              class="fs-14 fw-500"
              outlined
              dense
              light
              readonly
            />
          </v-col>

          <v-col cols="6" class="px-3">
            <div class="fw-500">Ảnh giao dịch</div>
            <div v-if="$isNullOrEmpty(avatar)">
              <v-btn depressed class="primary" @click="selectFileOpen"
                >Chọn file</v-btn
              >
            </div>
            <div v-else>
              <img
                :src="avatar"
                v-viewer
                style="height: 150px; width: 100%; object-fit: contain"
              />
            </div>
            <div class="" style="text-align: center">
              <v-btn
                class="text-none white--text primary"
                height="32"
                v-if="!$isNullOrEmpty(avatar)"
                depressed
                @click="selectFileOpen"
              >
                Chỉnh sửa
              </v-btn>
            </div>
            <div
              class="text-none fs-12 d-flex justify-center primary--text font-italic"
            ></div>
            <div style="color: red">{{ limited_msg }}</div>
          </v-col>

          <v-col cols="12" class="mt-3 px-3">
            <span class="fw-500"> Ghi chú </span>
            <v-textarea
              rows="3"
              v-model="note"
              hide-details=""
              outlined
              dense
              onKeyPress="if(this.value.length==100) return false;"
              @keydown.space="preventLeadingSpace"
            ></v-textarea>
          </v-col>

          <v-file-input
            :value="file"
            @change="inputFile($event)"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            id="input_file_add"
            class="d-none"
          ></v-file-input>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff">
        <v-spacer></v-spacer>
        <v-btn class="text-none primary" depressed @click="temporarySave"
          >Gửi duyệt
        </v-btn>

        <v-btn class="text-none primary" depressed @click="reset"
          >Nhập lại
        </v-btn>
        <v-btn class="text-none secondary" depressed @click="toggle">Hủy</v-btn>
      </v-card-actions>
      <loading :open="openLoading"></loading>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Cookies from 'js-cookie'
import loading from '~/components/Loading.global'

Vue.use(Viewer)
import BASE from '~/assets/configurations/BASE_URL'
import URL from '~/assets/configurations/BASE_URL'
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
      BASE,
      note: null,
      Listcutomers: [],
      listMessageType: [],
      openLoading: false,

      partner: null,
      partnerErrors: [],
      avatar: null,
      img: null,
      file: null,
      messageType: null,
      messageTypeErrors: [],
      contactName: null,
      contactNameErrors: [],
      phone: [],
      phoneErrors: [],
      bankTransfer: 1,
      listbankTransfer: Constants.System.Orders.listbankTransfer,
      bankTransferErrors: [],
      STK: null,
      STKErrors: [],
      bank: null,
      bankErrors: [],
      branch: null,
      orderValue: null,
      orderValueError: [],
      branchError: [],
      tradingCode: null,
      tradingCodeErrors: [],
      discount: 0,
      moneyLimit: null,
      priceReal: null,
      limited_msg: '',
    }
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },

    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    checkDiscount() {
      // for (let i = 0; i < this.Listcutomers.length; i++) {
      //   if (value === this.Listcutomers[i].customerId) {
          this.discount = this.Listcutomers[0].discount
          this.moneyLimit = this.$formatMoney({
            amount: this.Listcutomers[0].discountLimit,
          })
        // }
      // }
    },
    calculatePriceReal() {
      // tính số tiền thực tế nạp đơn hàng
      if (this.orderValue == null || this.orderValue == '') {
        this.priceReal = 0
        return
      }

      // số tiền giá trị đơn hàng
      let amountMoneyOrder = Number(this.orderValue.replace(/\./g, ''))

      // số tiền hạn mức giảm giá tối đa
      let moneyLimitDiscount = 0
      if (this.moneyLimit !== null) {
        moneyLimitDiscount = Number(this.moneyLimit.replace(/\./g, ''))
      }

      // số tiền giảm giá
      let moneyDiscount = 0
      if (this.discount !== null && this.discount !== 0) {
        moneyDiscount = (amountMoneyOrder * this.discount) / 100
        moneyDiscount = parseInt(moneyDiscount)

        if (
          !this.$isNullOrEmpty(moneyLimitDiscount) &&
          moneyDiscount > moneyLimitDiscount
        ) {
          moneyDiscount = moneyLimitDiscount
        }
      } else {
        this.discount = 0
      }

      // số tiền sau khi giảm giá (tiền nạp đơn hàng)
      let moneyAfterDiscount = amountMoneyOrder - moneyDiscount

      this.priceReal = this.$formatMoney({
        amount: moneyAfterDiscount,
      })
      this.orderValue = this.$formatMoney({
        amount: this.orderValue,
      })
    },

    checkValuePrice(e, error) {
      const value = String(e)

      if ((value || []).length !== 0) {
        const numberFormat = value.replace(/\./g, '')

        if (isNaN(numberFormat)) {
          this[error] = ['Vui lòng nhập đúng định dạng']
        } else if (numberFormat <= -1) {
          this[error] = ['Vui lòng nhập đúng định dạng']
          this.orderValue = this.formatNumber({ amount: numberFormat })
        } else {
          this[error] = []
          this.orderValue = this.formatNumber({ amount: numberFormat })
        }
      } else {
        this[error] = []
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
        .dispatch('order/dataSelectOfDiscount', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listcutomers = res.data.data
            this.checkDiscount()
          }
        })
        .catch((errors) => {})
    },

    listTypeSms() {
      this.$store
        .dispatch('order/listTypeSms', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listMessageType = res.data.data
          }
        })
        .catch((errors) => {})
    },

    regexBankNumber(str) {
      const regexBankNumber = /((0)\b)/g

      if (str.match(regexBankNumber)) {
        return true
      } else {
        return false
      }
    },

    // lưu trình phê duyệt

    temporarySave() {
      let hasError = false
      const isPhoneRegex = /\D/g
      if (this.$isNullOrEmpty(this.contactName)) {
        hasError = true
        this.contactNameErrors = ['Tên người liên hệ bắt buộc nhập']
      } else if (this.contactName.length > 100) {
        hasError = true
        this.contactNameErrors = ['Vui lòng nhập không quá số kí tự cho phép']
      }
      if (this.$isNullOrEmpty(this.phone)) {
        hasError = true
        this.phoneErrors = ['Số điện thoại liên hệ bắt buộc nhập']
      } else if (isNaN(this.phone)) {
        hasError = true
        this.phoneErrors = ['Vui lòng nhập đúng định dạng là số']
      } else if ((this.phone || '').trim().length !== 10) {
        hasError = true
        this.phoneErrors = ['Số điện thoại không hợp lệ']
      } else if (isPhoneRegex.test((this.phone || '').trim())) {
        hasError = true
        this.phoneErrors = ['Số điện thoại không hợp lệ']
      } else if (!this.regexPhoneNumber(this.phone)) {
        hasError = true
        this.phoneErrors = ['Vui lòng nhập đúng định dạng']
      }
      if (this.$isNullOrEmpty(this.bankTransfer)) {
        hasError = true
        this.bankTransferErrors = ['Vui lòng chọn hinh thức chuyển khoản']
      }
      if (this.$isNullOrEmpty(this.STK)) {
        hasError = true
        this.STKErrors = ['STK chuyển khoản bắt buộc nhập']
      } else if (isNaN(this.STK)) {
        hasError = true
        this.STKErrors = ['Vui lòng nhập đúng định dạng là số']
      } else if (this.STK.length > 50) {
        hasError = true
        this.STKErrors = ['Vui lòng nhập không vượt quá số ký tự cho phép']
      } else if (this.STK.trim() == '') {
        hasError = true
        this.STKErrors = ['Vui lòng nhập đúng định dạng']
      } else if (this.regexBankNumber(this.STK)) {
        hasError = true
        this.STKErrors = ['Số tài khoản không hợp lệ']
      }
      if (this.$isNullOrEmpty(this.bank)) {
        hasError = true
        this.bankErrors = ['Trường Ngân hàng bắt buộc nhập']
      } else if (this.bank > 100) {
        this.bankErrors = ['Vui lòng nhập không vượt quá số ký tự cho phép']
      } else if (this.bank.trim() == '') {
        hasError = true
        this.bankErrors = ['Vui lòng nhập đúng định dạng']
      }
      if (this.branch != null) {
        if (this.branch.length > 100) {
          hasError = true
          this.branchError = ['Độ dài trường Chi nhánh từ 0 đến 100 ký tự']
        }
      }
      if (this.$isNullOrEmpty(this.orderValue)) {
        hasError = true
        this.orderValueError = ['Vui lòng nhập giá trị']
      }
      if (!this.$isNullOrEmpty(this.orderValue)) {
        if (isNaN(this.orderValue.replace(/\./g, ''))) {
          hasError = true
          this.orderValueError = ['Vui lòng nhập đúng định dạng']
        } else if (this.orderValue.replace(/\./g, '') <= -1) {
          hasError = true
          this.orderValueError = ['Vui lòng nhập đúng định dạng']
        }
      }
      if (this.$isNullOrEmpty(this.tradingCode)) {
        hasError = true
        this.tradingCodeErrors = ['Vui lòng nhập mã giao dịch']
      } else if (this.$isHasSpecial(this.tradingCode)) {
        hasError = true
        this.tradingCodeErrors = ['Vui lòng nhập đúng định dạng']
      } else if (this.tradingCode.trim() == '') {
        hasError = true
        this.tradingCodeErrors = ['Vui lòng nhập đúng định dạng']
      }
      if (!hasError) {
        this.callAPIapproval()
      }
    },
    regexPhoneNumber(str) {
      const regexPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g

      if (str.match(regexPhoneNumber)) {
        return true
      } else {
        return false
      }
    },
    callAPIapproval() {
      this.openLoading = true
      const data = {
        customerId: `${Cookies.get('customerId')}`,
        typeSms: this.messageType,
        contact: this.contactName,
        contactPhone: this.phone,
        transfer: this.bankTransfer,
        accountNumber: this.STK,
        bankName: this.bank,
        branch: this.branch,
        price: this.orderValue.replace(/\./g, ''),
        tradingCode: this.tradingCode,
        status: 0,
        note: this.note,
        image: this.avatar,
        discount: this.discount,
        discountLimit: this.$isNullOrEmpty(this.moneyLimit)
          ? 0
          : this.moneyLimit.replace(/\./g, ''),
        priceReal: this.$isNullOrEmpty(this.priceReal)
          ? 0
          : this.priceReal.replace(/\./g, ''),
      }
      setTimeout(() => {
        this.$store
          .dispatch('order/orderAddCustomer', data)
          .then((res) => {
            this.openLoading = false
            this.$showSuccess(this, 'Thêm mới đơn hàng thành công ')
            this.toggle()
            this.$emit('success')
          })
          .catch((errors) => {
            this.openLoading = false
          })
      }, 1000)
    },
    reset() {
      this.note = null

      this.avatar = null
      this.img = null
      this.file = null
      this.messageType = null
      this.messageTypeErrors = []
      this.contactName = null
      this.contactNameErrors = []
      this.phone = []
      this.phoneErrors = []
      this.bankTransfer = 1
      this.bankTransferErrors = []
      this.STK = null
      this.STKErrors = []
      this.bank = null
      this.bankErrors = []
      this.branch = null
      this.branchError = []
      this.orderValue = null
      this.orderValueError = []
      this.tradingCode = null
      this.tradingCodeErrors = []
      this.discount = null
      this.priceReal = null
      this.moneyLimit = null
    },

    toggle() {
      this.$emit('toggle')
    },

    file_selected(file) {
      this.file_img = file.name
      this.required_img = false
      const formData = new FormData()
      formData.append('image', file)
      const data = { formData }
      this.$store
        .dispatch('order/upload', data)
        .then((response) => {
          if (!response.error) {
            var urlBase = `${BASE.BASE}`
            if (urlBase.endsWith('/'))
              urlBase = urlBase.substring(0, urlBase.length - 1)
            this.avatar =
              urlBase + `/downloadFile/${response.data.data.linkImg}`
          }
        })
        .catch((errors) => {})
        .catch((e) => {
          this.$log.debug(e)
        })
    },
    selectFileOpen() {
      return window.document.getElementById('input_file_add').click()
    },
    inputFile(file) {
      if (
        !file.name.endsWith('png') &&
        !file.name.endsWith('jpeg') &&
        !file.name.endsWith('gif') &&
        !file.name.endsWith('jpg')
      ) {
        this.$showError(this, 'Sai định dạng file ảnh')
        return
      }
      if (!this.$isNullOrEmpty(file)) {
        this.hidden = false
        let hasErrors = false

        if ((file.size || 0) > 3145728) {
          hasErrors = true
          this.limited_msg = 'File được chọn không được vượt quá 3MB'
        }

        if (!hasErrors) {
          this.limited_msg = ''
          this.reset_file = file

          if (this.$isNullOrEmpty(file)) {
            this.img = URL.createObjectURL(file)
          }
          this.file_selected(file)
        }
      }
    },
  },
  watch: {
    open(value) {
      this.limited_msg = ''
      if (value) {
        setTimeout(() => {
          this.getListCustomers()
          this.listTypeSms()
          this.reset()
        }, 300)
      }
    },
  },
}
</script>
