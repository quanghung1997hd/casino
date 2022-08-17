<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1000px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Cập nhật cấu hình TPS</v-card-title
      >
      <v-container class="pt-5 pb-3" fluid>
        <v-row class="pt-4">
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-autocomplete
              v-model="customerName"
              :items="listCustomer"
              outlined
              label="Tên khách hàng"
              no-data-text="Không có dữ liệu"
              dense
              light
              @input="customerNameErrors = []"
              :error-messages="customerNameErrors"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="config"
              outlined
              label="Cấu hình TPS (s)"
              type="number"
              dense
              light
              clearable
              @input="checkValuePrice($event, 'configErrors')"
              :error-messages="configErrors"
              onKeyPress="if(this.value.length==10) return false;"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-autocomplete
              v-model="status"
              :items="listStatus"
              class="fs-14"
              outlined
              label="Trạng thái"
              dense
              light
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary" @click="checkValidate">
          <div class="text-none">Lưu</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="reset">
          <div class="text-none">Nhập lại</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Hủy bỏ</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from 'js-cookie'
import moment from 'moment'
import Constants from '~/assets/configurations/constant'

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open', 'data'],
  data: () => ({
    customerName: null,
    listCustomer: [],
    customerNameErrors: [],
    config: null,
    configErrors: [],
    status: 1,
    listStatus: Constants.System.Discount.listStatusAdd,
  }),
  watch: {
    open(value) {
      if (value) {
        this.customerName = this.data.customerId
        this.config = this.data.limitTps
        this.status = this.data.status
        this.checkValuePrice(this.config)
        this.getListCustomers()
      }
    },
  },
  methods: {
    checkValuePrice(e, error) {
      const value = String(e)

      if ((value || []).length !== 0) {
        const numberFormat = value.replace(/,/g, '')

        if (isNaN(numberFormat)) {
          this[error] = ['Vui lòng nhập đúng định dạng']
        } else if (numberFormat <= -1) {
          this[error] = ['Vui lòng nhập đúng định dạng']
          this.config = this.formatNumber({ amount: numberFormat })
        } else {
          this[error] = []
          this.config = this.formatNumber({ amount: numberFormat })
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
        const j = i.length > 10 ? i.length % 10 : 0

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{10})(?=\d)/g, '$1' + thousands) +
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
                this.listCustomer.push({
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
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.customerName = null

      this.customerNameErrors = []
      this.config = null
      this.configErrors = []
      this.status = 1
    },

    checkValidate() {
      let hasErrors = false
      if (this.$isNullOrEmpty(this.customerName)) {
        hasErrors = true
        this.customerNameErrors = ['Vui lòng chọn khách hàng']
      }
      if (this.$isNullOrEmpty(this.config)) {
        hasErrors = true
        this.configErrors = ['vui lòng nhập số TPS']
      }
      if (!this.$isNullOrEmpty(this.config)) {
        if (isNaN(this.config.replace(/,/g, ''))) {
          hasErrors = true
          this.configErrors = ['Vui lòng nhập đúng định dạng']
        } else if (this.config.replace(/,/g, '').length > 10) {
          hasErrors = true
          this.configErrors = ['Không được vượt quá 10 ký tự']
        } else if (this.config.replace(/,/g, '') <= -1) {
          hasErrors = true
          this.configErrors = ['Vui lòng nhập đúng định dạng']
        }
      }

      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      this.$store
        .dispatch('configTps/update', {
          id: this.data.id,
          customerId: this.customerName,
          limitTps: this.$isNullOrEmpty(this.config)
            ? null
            : this.config.replace(/,/g, ''),
          status: this.status,
        })
        .then((response) => {
          if (!response.error) {
            this.$showSuccess(this, 'Cập nhật TPS thành công')
            this.toggle()
            this.$emit('success')
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
        .catch((e) => {
          this.$log.debug(e)
        })
        .finally(() => {})
    },
  },
}
</script>
