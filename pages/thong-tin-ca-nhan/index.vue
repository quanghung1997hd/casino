<template>
  <div>
    <CardGlobal>
      <div class="d-flex justify-space-between">
        <div
          style="font-size: 1.3rem; font-weight: 500"
          class="pa-1 primary--text"
        >
          Chi tiết thông tin cá nhân
        </div>
        <div
          style="font-size: 1.3rem; font-weight: 500"
          class="pa-1 primary--text"
        >
          Số dư tài khoản: <span style="color: red">{{ surplus }}</span>
        </div>
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-row class="ma-0" align="center" justify="center">
        <v-col
          class="col-auto pt-0 pb-4"
          v-for="(item, index) in listsMaketting"
          :key="`${item.name}--${index}`"
        >
          <v-checkbox
            hide-details
            readonly
            class="px-9 ma-0"
            :input-value="item.isSelect"
            :true-value="1"
            :false-value="0"
            @change="checkBox(item.value)"
          >
            <template v-slot:label>
              <div class="black--text fs-16">{{ item.name }}</div>
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
      <v-row class="ma-0" no-gutters style="color: black">
        <v-col cols="12">
          <div
            style="color: black"
            class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
          >
            Thông tin cá nhân
          </div>
        </v-col>
        <v-col cols="6" class="pt-4 px-3">
          <span class="fw-500"> Mã (<span class="red--text">*</span>)</span>
          <v-text-field
            class="pt-1"
            outlined
            dense
            v-model="code"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="pt-4 px-3">
          <span class="fw-500"> Tên (<span class="red--text">*</span>)</span>
          <v-text-field
            class="pt-1"
            outlined
            dense
            v-model="fullname"
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="6" class="py-0 px-3">
          <span class="fw-500">
            Mã số thuế (<span class="red--text">*</span>)</span
          >
          <v-text-field
            outlined
            dense
            v-model="taxCode"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="py-0 px-3">
          <span class="fw-500">
            Lĩnh vực kinh doanh (<span class="red--text">*</span>)</span
          >
          <v-autocomplete
            v-model="field"
            :items="listBusiness"
            no-data-text="Không có dữ liệu"
            multiple
            chips
            small-chips
            outlined
            dense
            item-text="name"
            item-value="id"
            readonly
          ></v-autocomplete>
        </v-col>
        <v-col cols="6" class="py-0 px-3">
          <span class="fw-500">
            Số đăng ký kinh doanh (<span class="red--text">*</span>)</span
          >
          <v-text-field
            no-data-text="Không có dữ liệu"
            outlined
            v-model="numberRegister"
            dense
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="py-0 px-3">
          <span class="fw-500">
            Số điện thoại (<span class="red--text">*</span>)</span
          >
          <v-text-field
            v-model="phoneNumber"
            no-data-text="Không có dữ liệu"
            outlined
            dense
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="py-0 px-3">
          <span class="fw-500">
            Tỉnh/TP (<span class="red--text">*</span>)</span
          >
          <v-autocomplete
            v-model="province"
            no-data-text="Không có dữ liệu"
            outlined
            dense
            readonly
            :items="listProvince"
            @change="changeCity(province)"
          ></v-autocomplete>
        </v-col>
        <v-col cols="4" class="py-0 px-3">
          <span class="fw-500">
            Quận/Huyện (<span class="red--text">*</span>)</span
          >
          <v-autocomplete
            v-model="district"
            :items="listDistrict"
            no-data-text="Không có dữ liệu"
            outlined
            dense
            readonly
          ></v-autocomplete>
        </v-col>
        <v-col cols="4" class="py-0 px-3">
          <span class="fw-500"> Xã/Phường </span>
          <v-autocomplete
            v-model="Ward"
            :items="listWard"
            no-data-text="Không có dữ liệu"
            outlined
            dense
            readonly
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row class="ma-0" no-gutters style="color: black">
        <v-col cols="12">
          <div
            style="color: black"
            class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
          >
            Thông tin người đại diện
          </div>
        </v-col>
        <v-col cols="6" class="pt-4 px-3">
          <span class="fw-500">
            Tên người đại diện (<span class="red--text">*</span>)</span
          >
          <v-text-field
            class="pt-1"
            outlined
            dense
            v-model="fullName"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="pt-4 px-3">
          <span class="fw-500">
            Chức vụ (<span class="red--text">*</span>)</span
          >
          <v-text-field
            v-model="posittion"
            readonly
            class="pt-1"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="py-0 px-3">
          <span class="fw-500">
            Số điện thoại (<span class="red--text">*</span>)</span
          >
          <v-text-field
            v-model="representativePhone"
            readonly
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="6" class="py-0 px-3">
          <span class="fw-500"> Email (<span class="red--text">*</span>)</span>
          <v-text-field v-model="email" readonly outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0 px-3">
          <span class="fw-500">
            Địa chỉ (<span class="red--text">*</span>)</span
          >
          <v-text-field
            v-model="address"
            readonly
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ma-0" no-gutters style="color: black">
        <v-col cols="12">
          <div
            style="color: black"
            class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
          >
            Thông tin hợp đồng
          </div>
        </v-col>
        <v-col cols="4" class="pt-4 px-3">
          <span class="fw-500">
            Loại hợp đồng (<span class="red--text">*</span>)</span
          >
          <v-select
            v-model="type"
            readonly
            class="pt-1"
            :items="listType"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col cols="4" class="pt-4 px-3">
          <span class="fw-500"> Số (<span class="red--text">*</span>)</span>
          <v-text-field
            v-model="number"
            readonly
            class="pt-1"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="pt-4 px-3">
          <span class="fw-500">
            Ngày ký (<span class="red--text">*</span>)</span
          >
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="moment(date).format('DD/MM/YYYY')"
                v-on="on"
                hide-details
                dense
                outlined
                append-icon="mdi-calendar-range"
                readonly
                disabled
              />
            </template>
            <v-date-picker
              width="391"
              locale="vi"
              v-model="date"
              @input="onChange"
            />
          </v-menu>
        </v-col>
      </v-row>
    </CardGlobal>
  </div>
</template>
<script>
import moment from 'moment'
import Cookies from 'js-cookie'
import Constants from '~/assets/configurations/constant'
export default {
  data() {
    return {
      listType: Constants.System.Profile.listType,
      menu: false,
      date: moment().format('YYYY-MM-DD'),
      listsMaketting: Constants.System.Profile.listsMaketting,
      surplus: null,
      code: null,
      fullname: null,
      fullName: null,
      taxCode: null,
      field: null,
      numberRegister: null,
      phoneNumber: null,
      province: null,
      district: null,
      Ward: null,
      posittion: null,
      representativePhone: null,
      email: null,
      address: null,
      type: null,
      number: null,
      typeCustomer: `${Cookies.get('customerId')}`,
      listWard: [],
      listDistrict: [],
      listProvince: [],
      listBusiness: [],
    }
  },
  components: {},
  transition: 'slide-x-transition',
  created() {
    this.getListBusiness()
    this.getDistrict()
    this.getWards()
    this.getCity()
  },
  mounted() {
    this.detail()
  },
  methods: {
    checkBox(item) {
      this.valueCheckbox = item
      for (let i = 0; i < this.listsMaketting.length; i++) {
        if (this.listsMaketting[i].value !== item) {
          this.listsMaketting[i].isSelect = 0
        } else {
          this.listsMaketting[i].isSelect = 1
        }
      }
    },
    getListBusiness() {
      this.$store
        .dispatch('businessCategory/BusinessFiledSelectData', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listBusiness = res.data.data
          }
        })
    },
    getCity() {
      this.$store.dispatch('address/getCity').then((res) => {
        if (res.data.error.code === 0) {
          res.data.data.map((item) => {
            this.listProvince.push({
              text: item.name,
              value: item.id,
              code: item.code,
            })
          })
        }
      })
    },
    getDistrict() {
      if (this.listProvince.length <= 0 || this.province == null) return
      let code = this.listProvince.filter((i) => i.value == this.province)[0]
        .code

      this.$store
        .dispatch('address/getDistricts', {
          parentCode: code,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            res.data.data.map((item) => {
              this.listDistrict.push({
                text: item.name,
                value: item.id,
                code: item.code,
              })
            })
            this.getWards()
          }
        })
    },
    getWards() {
      if (this.listDistrict.length <= 0 || this.district == null) return
      let code = this.listDistrict.filter((i) => i.value == this.district)[0]
        .code

      this.$store
        .dispatch('address/getWards', {
          parentCode: code,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            res.data.data.map((item) => {
              this.listWard.push({
                text: item.name,
                value: item.id,
              })
            })
          }
        })
    },
    detail() {
      this.$store.dispatch('customer/detailInfo').then((res) => {
        if (!res.error) {
          this.code = res.data.data.customerCode
          this.fullname = res.data.data.customerName
          this.taxCode = res.data.data.taxCode
          this.field = res.data.data.listTypeBusinessField
          this.numberRegister = res.data.data.businessNumber
          this.phoneNumber = res.data.data.customerPhone
          this.province = res.data.data.city
          this.district = res.data.data.district
          this.Ward = res.data.data.ward
          this.fullName = res.data.data.representativeName
          this.posittion = res.data.data.position
          this.representativePhone = res.data.data.representativePhone
          this.address = res.data.data.address
          this.type = res.data.data.contractType
          this.number = res.data.data.contractNumber
          this.email = res.data.data.email
          this.surplus = this.$formatMoney({
            amount: res.data.data.balanceMoney,
          })
          this.date = moment(
            res.data.data.contractDate,
            'DD/MM/YYYY HH:mm:ss'
          ).format('YYYY-MM-DD')
          this.checkBox(res.data.data.adType)
          this.getDistrict()
          this.getListBusiness()
        }
      })
    },
    onChange() {
      this.menu = false
    },
  },
}
</script>
<style lang="scss">
.v-expansion-panel-content__wrap {
  padding-bottom: 0 !important;
}
i.v-icon.notranslate.mdi.mdi-chevron-down.theme--light {
  color: black;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 35px !important;
}
</style>
