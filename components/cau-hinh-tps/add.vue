<template>
  <div class="mainDialog">
    <v-dialog
      :value="open"
      @keydown="$event.key === 'Escape' && toggle()"
      max-width="1000px"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title class="border-title-dialog py-3"
          >Thêm mới cấu hình TPS
        </v-card-title>
        <v-container class="pt-5 pb-5" fluid>
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
                class="configCustomer"
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
                @input="configErrors = []"
                :error-messages="configErrors"
                onKeyPress="if(this.value.length==10) return false;"
                v-on:keypress="isNumber($event)"
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
        <loading :open="openLoading"></loading>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open'],
  components: {
    loading,
  },
  data: () => ({
    customerName: null,
    listCustomer: [],
    customerNameErrors: [],
    config: null,
    configErrors: [],
    status: 1,
    openLoading: false,
    listStatus: Constants.System.Discount.listStatusAdd,
  }),
  watch: {
    open(value) {
      if (value) {
        this.getListCustomers()
      }
    },
  },
  methods: {
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[0-9\:]+$/.test(char)) return true
      else e.preventDefault()
    },

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
      this.$store.dispatch('campaign/customerDataSelect', {}).then((res) => {
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
        this.configErrors = ['Cấu hình TPS(s) bắt buộc nhập']
      }

      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      this.openLoading = true
      setTimeout(() => {
        this.$store
          .dispatch('configTps/add', {
            customerId: this.customerName,
            limitTps: this.$isNullOrEmpty(this.config)
              ? null
              : this.config.replace(/,/g, ''),
            status: this.status,
            type: 0,
          })
          .then((response) => {
            this.openLoading = false
            if (!response.error) {
              this.$showSuccess(this, 'Thêm mới TPS thành công')
              this.toggle()
              this.$emit('success')
            }
          })
          .catch((errors) => {
            this.openLoading = false
          })
          .catch((e) => {
            this.$log.debug(e)
          })
          .finally(() => {})
      }, 1000)
    },
  },
}
</script>
