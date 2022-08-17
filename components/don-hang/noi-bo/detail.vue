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
        Chi tiết thông tin đơn hàng
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
              Thông tin khách hàng
            </div>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Mã khách hàng (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="codeCustomer"
              class="fs-14"
              outlined
              dense
              light
              readonly
            />
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Tên khách hàng (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="partner"
              class="fs-14"
              no-data-text="Không có dữ liệu"
              outlined
              dense
              light
              readonly
            />
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Mã số thuế (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="taxCode"
              class="fs-14"
              outlined
              dense
              light
              readonly
            />
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Số điện thoại (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="phoneCustomer"
              class="fs-14"
              outlined
              dense
              light
              readonly
            />
          </v-col>
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
              v-model="code"
              readonly
              outlined
              dense
              light
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
              readonly
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
              dense
              light
              @input="phoneErrors = []"
              :error-messages="phoneErrors"
              readonly
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
              readonly
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
              readonly
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
              readonly
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Chi nhánh </span>
            <v-text-field v-model="branch" class="fs-14" outlined dense light />
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
              @input="checkValuePrice($event)"
              readonly
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
              readonly
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
              v-model="level"
              class="fs-14 fw-500"
              outlined
              dense
              light
              @input="checkValuePrice($event)"
            />
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Số tiền nạp thực tế </span>
            <v-text-field
              v-model="depositAmount"
              class="fs-14 fw-500"
              outlined
              dense
              light
              readonly
            />
          </v-col>
          <v-col cols="6" class="px-3"> </v-col>

          <v-col cols="6" class="ml-4 my-4">
            <div class="fw-500">Ảnh giao dịch</div>
            <div v-if="$isNullOrEmpty(avatar)">
              <v-btn depressed class="primary">Chọn file</v-btn>
            </div>
            <div v-else>
              <img
                :src="avatar"
                v-viewer
                style="height: 150px; width: 100%; object-fit: contain"
              />
            </div>

            <div
              class="text-none fs-12 d-flex justify-center primary--text font-italic"
            ></div>
          </v-col>

          <v-col cols="12" class="mt-3 px-3">
            <span class="fw-500"> Ghi chú </span>
            <v-textarea
              rows="3"
              v-model="note"
              hide-details=""
              outlined
              dense
            ></v-textarea>
          </v-col>

          <v-file-input
            :value="file"
            @change="inputFile($event)"
            accept="image/png, image/jpeg, image/gif"
            id="input_file_add"
            class="d-none"
          ></v-file-input>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff">
        <v-spacer></v-spacer>
        <v-btn class="text-none secondary" depressed @click="toggle"
          >Đóng</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)
import URL from '~/assets/configurations/BASE_URL'
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
  components: {},
  data() {
    return {
      URL,
      code: null,
      note: null,
      Listcutomers: [],

      partner: null,
      partnerErrors: [],
      avatar: null,
      img: null,
      file: null,
      messageType: null,

      contactName: null,
      contactNameErrors: [],
      phone: [],
      phoneErrors: [],
      bankTransfer: null,
      codeCustomer: null,
      taxCode: null,
      phoneCustomer: null,
      listbankTransfer: Constants.System.Orders.listbankTransfer,
      bankTransferErrors: [],
      STK: null,
      STKErrors: [],
      bank: null,
      bankErrors: [],
      branch: null,
      orderValue: null,
      orderValueError: [],
      tradingCode: null,
      tradingCodeErrors: [],
      discount: null,
      level: null,
      depositAmount: null,
    }
  },
  methods: {
    // format tiền

    checkValuePrice(e, error) {
      const value = String(e)

      if ((value || []).length !== 0) {
        const numberFormat = value.replace(/,/g, '')

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
            this.avatar = `${URL.BASE}/${response.data.data.linkImg}`
          }
        })
        .catch((e) => {
          this.$log.debug(e)
        })
        .catch((errors) => {})
    },
    selectFileOpen() {
      return window.document.getElementById('input_file_add').click()
    },
    inputFile(file) {
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
      if (value) {
        setTimeout(() => {
          this.getListCustomers()
          this.listTypeSms()
          this.reset()
        }, 300)
        this.messageType = this.data.typeSmsName
        this.partner = this.data.customerName
        this.codeCustomer = this.data.customerCode
        this.phoneCustomer = this.data.customerPhone
        this.code = this.data.orderCode
        this.taxCode = this.data.taxCode
        this.contactName = this.data.contact
        this.phone = this.data.contactPhone
        this.bankTransfer = this.data.transfer
        this.STK = this.data.accountNumber
        this.bank = this.data.bankName
        this.branch = this.data.branch
        this.orderValue = this.$isNullOrEmpty(this.data.orderPrice)
          ? 0
          : this.$formatMoney({ amount: this.data.orderPrice })
        this.tradingCode = this.data.tradingCode
        this.discount = this.data.discount
        this.level = this.$isNullOrEmpty(this.data.discountLimit)
          ? 0
          : this.$formatMoney({ amount: this.data.discountLimit })

        this.depositAmount = this.$isNullOrEmpty(this.data.priceReal)
          ? 0
          : this.$formatMoney({ amount: this.data.priceReal })

        this.avatar = this.data.image
        this.note = this.data.note
      }
    },
  },
}
</script>
