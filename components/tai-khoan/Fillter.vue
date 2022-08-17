<template>
  <v-dialog
    :value="open"
    :max-width="1000"
    @click:outside="toggle"
    @keydown="$event.key === 'Escape' && toggle()"
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Mở rộng tìm kiếm
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pb-2 py-4">
        <v-row class="ma-0">
          <v-col cols="6" class="pb-0">
            <v-text-field
              outlined
              dense
              label="Mã số thuế"
              v-model="taxCode"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field
              outlined
              dense
              label="Số đăng ký kinh doanh"
              v-model="businessRegistrationNumber"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-select
              outlined
              no-data-text="Không có dữ liệu"
              dense
              :items="listItemsContractType"
              label="Loại hợp dồng"
              v-model="contractType"
            ></v-select>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field
              clearable
              v-model="contractNumber"
              outlined
              dense
              label="Số hợp đồng"
            ></v-text-field>
          </v-col>

          <v-col cols="6" class="pt-0 pb-5">
            <v-text-field
              v-model="registerTime"
              label="Hiệu lực từ ngày"
              hide-details
              dense
              outlined
              class="mr-3"
              clearable
            />
          </v-col>
          <v-col cols="6" class="pt-0 pb-5">
            <v-text-field
              label="Hiệu lực đến ngày"
              hide-details
              dense
              outlined
              v-model="expiredTime"
              clearable
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none primary" depressed @click="reset"
          >Nhập lại</v-btn
        >
        <v-btn class="text-none primary" depressed @click="emitSearch"
          >Lưu</v-btn
        >
        <v-btn class="text-none secondary" depressed @click="close">Đóng</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import DatePickerInput from '~/components/DatePickerInput.vue'
import Constants from '~/assets/configurations/constant'
const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')
export default {
  components: {
    DatePickerInput,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      registerTime: '',
      expiredTime: '',
      menu: false,
      menu1: false,
      taxCode: null,
      businessRegistrationNumber: null,
      contractType: null,
      startDate: null,
      endDate: null,
      contractNumber: null,
      listItemsContractType: Constants.System.Profile.listType,
    }
  },
  methods: {
    onChange() {
      this.menu = false
    },
    emitSearch() {
      let data = {
        taxCode: this.taxCode,
        contractNumber: this.contractNumber,
        businessRegistrationNumber: this.businessRegistrationNumber,
        contractType: this.contractType,
        startDate: this.registerTime,
        endDate: this.expiredTime,
      }
      this.$emit('search', data)
    },
    toggle() {
      this.$emit('toggle')
    },
    reset() {
      this.taxCode = null
      this.businessRegistrationNumber = null
      this.contractType = null
      this.contractNumber = null
      this.startDate = null
      this.endDate = null
      this.registerTime = null
      this.expiredTime = null
    },
    close() {
      this.taxCode = null
      this.businessRegistrationNumber = null
      this.contractType = null
      this.contractNumber = null
      this.startDate = null
      this.endDate = null
      this.registerTime = null
      this.expiredTime = null
      this.$emit('toggle')
    },
  },
  watch: {
    open(value) {
      if (value) {
      }
    },
  },
}
</script>
