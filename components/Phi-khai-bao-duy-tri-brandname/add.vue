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
        >Thêm mới cấu hình phí khai báo, phí duy trì
      </v-card-title>
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
                class="fs-14 mt-2"
                no-data-text="Không có dữ liệu"
                label="Lựa chọn"
                outlined
                solo
                dense
                light
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
                          v-model="data.item.declarationFee"
                          :error-messages="data.item.declarationFeeError"
                          @input="checkValuePrice(data.item)"
                          @keypress="isNumber($event)"
                          :maxlength="20"
                        >
                        </v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="data.item.maintainingFee"
                          :error-messages="data.item.maintainingFeeError"
                          @input="checkValuePrice1(data.item)"
                          @keypress="isNumber($event)"
                          :maxlength="20"
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
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn depressed height="30px" color="primary" @click="checkValidate">
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
import Constants from '~/assets/configurations/constant'

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open'],
  components: {
    loading,
  },
  data: () => ({
    menu: false,
    openLoading: false,
    menu_date: moment().format('YYYY-MM-DD'),
    registerTime: moment().format('DD/MM/YYYY'),
    registerTimeError: [],
    policy: 0,
    status: 0,
    listPolicy: Constants.System.DeclareBrandname.listPolicy,
    listStatus: Constants.System.DeclareBrandname.listStatusAdd,
    items: [],
    partner: null,
    partnerErrors: [],
    Listcutomers: [],
    checkDisabled: null,
    checkDisabled1: null,
    demo: [],
  }),
  watch: {
    open(value) {
      if (value) {
        this.listnetwork()
        this.getListCustomers()
      }
    },
  },
  computed: {
    headers() {
      return Constants.System.DeclareBrandname.headerAdd
    },
  },
  methods: {
    save_date(date) {
      this.registerTime = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
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
    // validate input phí khai báo
    checkValuePrice(e) {
      e.declarationFee = this.$formatMoney({ amount: e.declarationFee })
    },
    // validate phí duy trì
    checkValuePrice1(e) {
      e.maintainingFee = this.$formatMoney({ amount: e.maintainingFee })
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
    listnetwork() {
      this.$store
        .dispatch('maintain/networkSelect', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.items = []
            res.data.data.map((item) => {
              this.items.push({
                id: item.id,
                name: item.name,
                declarationFee: null,
                maintainingFee: null,
                declarationFeeError: [],
                maintainingFeeError: [],
              })
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
      this.status = 1
      this.brandNameErrors = []
      this.partnerErrors = []
      this.registerTime = moment().format('DD/MM/YYYY')
      this.policy = 0
      this.registerTimeError = []
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
        if (!this.$isNullOrEmpty(this.items[i].declarationFee)) {
          if (isNaN(this.items[i].declarationFee.replace(/\./g, ''))) {
            hasErrors = true
            this.items[i].declarationFeeError = ['Vui lòng nhập đúng định dạng']
          } else if (this.items[i].declarationFee.trim() === '') {
            hasErrors = true
            this.items[i].declarationFeeError = ['Vui lòng nhập đúng định dạng']
          }
        } else {
        }

        if (!this.$isNullOrEmpty(this.items[i].maintainingFee)) {
          if (isNaN(this.items[i].maintainingFee.replace(/\./g, ''))) {
            hasErrors = true
            this.items[i].maintainingFeeError = ['Vui lòng nhập đúng định dạng']
          } else if (this.items[i].maintainingFee.trim() === '') {
            hasErrors = true
            this.items[i].maintainingFeeError = ['Vui lòng nhập đúng định dạng']
          }
        } else {
        }
      }
      let number = 0
      for (let i = 0; i < this.items.length; i++) {
        if (
          !this.$isNullOrEmpty(this.items[i].maintainingFee) ||
          !this.$isNullOrEmpty(this.items[i].declarationFee)
        ) {
          number += 1
        }
      }
      if (number === 0) {
        hasErrors = true
        this.$showError(
          this,
          'Vui lòng nhập phí khai báo, duy trì của nhà mạng'
        )
      }
      if (moment(this.registerTime, 'DD/MM/YYYY') <= moment()) {
        hasErrors = true
        this.registerTimeError = ['Thời gian áp dụng > ngày hiện tại']
      }

      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      this.openLoading = true
      const declareNetworkDtos = []
      for (let i = 0; i < this.items.length; i++) {
        if (
          !this.$isNullOrEmpty(this.items[i].declarationFee) &&
          !this.$isNullOrEmpty(this.items[i].maintainingFee)
        ) {
          declareNetworkDtos.push({
            networkId: this.items[i].id,
            declarationFee: this.items[i].declarationFee.replace(/\./g, ''),
            maintainingFee: this.items[i].maintainingFee.replace(/\./g, ''),
          })
        } else if (
          !this.$isNullOrEmpty(this.items[i].declarationFee) &&
          this.$isNullOrEmpty(this.items[i].maintainingFee)
        ) {
          declareNetworkDtos.push({
            networkId: this.items[i].id,
            declarationFee: this.items[i].declarationFee.replace(/\./g, ''),
          })
        } else if (
          this.$isNullOrEmpty(this.items[i].declarationFee) &&
          !this.$isNullOrEmpty(this.items[i].maintainingFee)
        ) {
          declareNetworkDtos.push({
            networkId: this.items[i].id,
            maintainingFee: this.items[i].maintainingFee.replace(/\./g, ''),
          })
        }
      }
      let data = {
        customerId: this.policy === 0 ? 0 : this.partner,
        declareNetworkDtos,
        timeApplication: this.registerTime,
        status: this.status,
      }
      setTimeout(() => {
        this.$store
          .dispatch('maintain/add', data)
          .then((response) => {
            this.openLoading = false
            if (!response.error) {
              this.$showSuccess(this, 'Thêm thành công')
              this.toggle()
              this.$emit('success')
            }
          })
          .catch((e) => {
            this.$log.debug(e)
          })
          .catch((errors) => {
            this.openLoading = false
          })
          .finally(() => {})
      }, 1000)
    },
  },
}
</script>

<style>
.addRequire span::after {
  content: ' *';
  color: red;
}
</style>
