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
        >Thêm mới chiết khấu cho khách hàng
      </v-card-title>
      <v-container class="pt-8 pb-3" fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-autocomplete
              :items="ListdiscountCustomer"
              v-model="DiscountCustoms"
              label="Chính sách chiết khấu áp dụng "
              class="fs-14"
              no-data-text="Không có dữ liệu"
              outlined
              dense
              light
              @input="DiscountCustomsErrors = []"
              :error-messages="DiscountCustomsErrors"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-autocomplete
              v-model="partner"
              :items="Listcutomers"
              :error-messages="partnerErrors"
              label="Tên khách hàng "
              class="fs-14"
              no-data-text="Không có dữ liệu"
              outlined
              dense
              light
              @input="partnerErrors = []"
              v-show="DiscountCustoms == null ? false : true"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-select
              v-model="status"
              :items="listStatus"
              label="Trạng thái "
              dense
              class="fs-14"
              light
              outlined
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0"> </v-col>

          <v-col cols="12" sm="6" md="6" class="d-flex py-0">
            <v-text-field
              v-model="discount"
              label="Mức % chiết khấu"
              outlined
              dense
              light
              type="number"
              @input="discountErrors = []"
              :error-messages="discountErrors"
              onKeyPress="if(this.value.length==3) return false;"
              @keypress="isNumber($event)"
            />
            <span class="pl-2 pt-2">%</span>
          </v-col>
          <v-col cols="12" sm="6" md="6" class="d-flex py-0">
            <v-text-field
              label="Hạn mức"
              outlined
              dense
              light
              v-model="discountLimit"
              @keyup="onChangeDiscount"
              :error-messages="discountLimitErrors"
              maxlength="20"
              @keypress="isNumber($event)"
            />
            <span class="pl-2 pt-2">VND</span>
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
                  :error-messages="registerTimeErrors"
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
                  :error-messages="expiredTimeErrors"
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

        <v-btn text height="30px" class="primary" @click="checkValidate">
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
import moment from 'moment'
import loading from '~/components/Loading.global'
import Constants from "~/assets/configurations/constant"

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open'],
  components: {
    loading,
  },
  data: () => ({
    openLoading: false,

    status: 1,
    listStatus: Constants.System.Discount.listStatusAdd,

    isPageSize: 20000,
    menu: false,
    menu1: false,
    menu_date: moment().format('YYYY-MM-DD'),
    menu_date1: moment().format('YYYY-MM-DD'),
    Listcutomers: [
      {
        text: 'Chọn',
        value: null,
      },
    ],
    customs: null,
    registerTime: null,
    expiredTime: null,
    discount: null,
    DiscountCustoms: null,
    discountLimit: null,
    openalernotify: false,
    partner: null,
    partnerErrors: [],
    discountErrors: [],
    discountLimitErrors: [],
    DiscountCustomsErrors: [],
    registerTimeErrors: [],
    expiredTimeErrors: [],
    message_noti: '',
    ListdiscountCustomer: Constants.System.Discount.ListdiscountCustomer,
  }),
  watch: {
    open(value) {
      if (value) {
        this.reset()
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

    getListCustomers() {
      this.$store.dispatch('campaign/customerDataSelect', {}).then((res) => {
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
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.discount = null
      this.discountLimit = null
      this.partner = null
      this.registerTime = null
      this.expiredTime = null
      this.discountErrors = []
      this.registerTimeErrors = []
      this.expiredTimeErrors = []
      this.DiscountCustoms = null
      this.partnerErrors = []
    },
    checkValidate() {
      let hasErrors = false

      // validate
      if (this.$isNullOrEmpty(this.discount)) {
        hasErrors = true
        this.discountErrors = ['Mức % chiết khấu không được để trống']
      } else if (this.discount.trim() == '') {
        hasErrors = true
        this.discountErrors = ['Không đúng định dạng']
      } else if (this.discount == 0) {
        hasErrors = true
        this.discountErrors = ['Mức % chiết khấu phải lớn hơn 0']
      } else if (this.discount.length > 3) {
        hasErrors = true
        this.discountErrors = ['Không được vượt quá 3 ký tự']
      }
      if (this.$isNullOrEmpty(this.partner) && this.DiscountCustoms != null) {
        hasErrors = true
        this.partnerErrors = ['Tên khách hàng không được để trống']
      }
      if (this.discountLimit != null) {
        if (this.discountLimit < 0 || this.discountLimit == 0) {
          hasErrors = true
          this.discountLimitErrors = ['Hạn mức phải lơn hơn 0']
        }
      }

      if (this.registerTime == null && this.expiredTime != null){
        hasErrors = true
        this.registerTimeErrors = ['Từ ngày không được để trống']
      }

      if (this.registerTime != null && this.expiredTime == null){
        hasErrors = true
        this.expiredTimeErrors = ['Đến ngày không được để trống']
      }

      let fromDate = this.menu_date
      let toDate = this.menu_date1

      if (Date.parse(fromDate) > Date.parse(toDate)) {
        hasErrors = true
        this.registerTimeErrors = ['Từ ngày <= đến ngày']
      }
      if (!hasErrors) {
        this.add()
        this.registerTimeErrors = ''
      }
    },
    add() {
      this.openLoading = true
      var data = {
        customerId: this.partner,
        discount: this.discount,
        discountLimit: String(this.discountLimit).replace(/\./g, ''),
        startDate: this.registerTime,
        finishDate: this.expiredTime,
        status: this.status,
      }
      if (this.DiscountCustoms == null) {
        data.customerId = 0
      }
      setTimeout(() => {
        this.$store
          .dispatch('discountCustomer/addDiscountCustomer', data)
          .then((response) => {
            this.openLoading = false
            if (!response.error) {
              if (response.data.data.resultCode == 0) {
                this.$showWarnNotify(this, response.data.data.message)
              } else {
                this.$showSuccess(this, 'Thêm chiết khấu khách hàng thành công')
                this.toggle()
                this.$emit('success')
              }
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
