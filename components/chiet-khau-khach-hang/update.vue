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
        >Cập nhật chiết khấu khấu khách hàng
      </v-card-title>
      <v-container class="pt-5 pb-3" fluid>
        <v-row class="pt-4">
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-autocomplete
              v-model="customerName"
              :items="listCustomer"
              outlined
              label="Tên khách hàng"
              no-data-text="Không có dữ liệu"
              dense
              light
              clearable
              @input="customerNameErrors = []"
              :error-messages="customerNameErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="discount"
              label="Mức chiết khấu"
              outlined
              dense
              light
              clearable
              type="number"
              onKeyPress="if(this.value.length==3) return false;"
              @keypress="isNumber($event)"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              label="Hạn mức"
              outlined
              dense
              light
              clearable
              v-model="discountLimit"
              @keypress="isNumber($event)"
              :error-messages="discountLimitErrors"
              @keyup="onChangeDiscount"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-select
              v-model="status"
              :items="listStatus"
              label="Trạng thái "
              dense
              light
              outlined
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
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
                  label="Từ ngày"
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
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Đến ngày"
                  v-on="on"
                  v-model="expiredTime"
                  prepend-inner-icon="mdi-calendar-range "
                  dense
                  outlined
                  readonly
                  class="pl-2"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="menu_date1"
                @change="save_date1"
                locale="vi"
                @input="menu1 = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary" @click="update">
          <div class="text-none">Lưu</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Hủy bỏ</div>
        </v-btn>
      </v-card-actions>
      <loading :open="openLoading"></loading>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from 'js-cookie'
import moment from 'moment'
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open', 'data'],
  components: {
    loading,
  },
  data: () => ({
    openLoading: false,
    menu: false,
    menu1: false,
    menu_date: moment().format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    registerTime: null,
    expiredTime: null,

    customerName: null,
    listCustomer: [],
    customerNameErrors: [],
    discount: null,
    discountLimit: null,
    discountLimitErrors: [],
    configErrors: [],
    status: null,
    listStatus: Constants.System.Discount.listStatusAdd,
  }),
  watch: {
    open(value) {
      if (value) {
        this.customerName = this.data.customerId
        this.discount = this.data.discount
        this.discountLimit = this.$formatMoney({
          amount: this.data.discountLimit,
        })
        this.registerTime = this.data.startDate
        this.expiredTime = this.data.finishDate
        this.status = this.data.status
        this.getListCustomers()
      }
    },
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
    onChangeDiscount() {
      setTimeout(() => {
        this.discountLimit = this.$formatMoney({ amount: this.discountLimit })
      }, 300)
    },
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    save_date1(date) {
      this.expiredTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
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
        .catch((errors) => {})
    },
    checkValuePrice(e, error) {
      const value = String(e)

      if ((value || []).length !== 0) {
        const numberFormat = value.replace(/\./g, '')

        if (isNaN(numberFormat) || numberFormat.indexOf('.') >= 0) {
          this[error] = ['Vui lòng nhập đúng định dạng']
        } else if (numberFormat <= -1) {
          this[error] = ['Vui lòng nhập đúng định dạng']
          this.discountLimit = this.formatNumber({ amount: numberFormat })
        } else if (numberFormat == 0) {
          this[error] = ['Hạn mức không được bằng 0']
        } else {
          this[error] = []
          // this.price = this.formatNumber({ amount: numberFormat })
          this.discountLimit = numberFormat.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            '.'
          )
        }
      } else {
        this[error] = []
      }
    },
    toggle() {
      this.$emit('toggle')
    },
    update() {
      this.openLoading = true
      setTimeout(() => {
        this.$store
          .dispatch('discountCustomer/update', {
            id: this.data.id,
            customerId: this.customerName,
            discount: this.discount,
            discountLimit: String(this.discountLimit).replace(/\./g, ''),
            startDate: this.registerTime,
            finishDate: this.expiredTime,
            status: this.status,
          })
          .then((response) => {
            this.openLoading = false
            if (!response.error) {
              this.$showSuccess(
                this,
                'Cập nhật chiết khấu khách hàng thành công'
              )
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
