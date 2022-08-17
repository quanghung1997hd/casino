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
        Chi tiết tài khoản khách hàng
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pb-2 py-4">
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
        <!-- thông tin khách hàng -->

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
              class="pt-1"
              outlined
              dense
              v-model="code"
              :error-messages="codeError"
              @input="codeError = []"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Tên khách hàng (<span class="red--text">*</span>)</span
            >
            <v-text-field
              class="pt-1"
              outlined
              dense
              v-model="fullName"
              :error-messages="fullNameError"
              @input="fullNameError = []"
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
              :error-messages="taxCodeError"
              @input="taxCodeError = []"
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
              :error-messages="fieldError"
              @input="fieldError = []"
              no-data-text="Không có dữ liệu"
              multiple
              chips
              deletable-chips
              small-chips
              outlined
              dense
              readonly
              item-text="name"
              item-value="id"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" class="py-0 px-3">
            <span class="fw-500">
              Số đăng ký kinh doanh (<span class="red--text">*</span>)</span
            >
            <v-text-field
              outlined
              v-model="numberRegister"
              :error-messages="numberRegisterError"
              @input="numberRegisterError = []"
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
              :error-messages="phoneNumberError"
              @input="phoneNumberError = []"
              type="number"
              readonly
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="py-0 px-3">
            <span class="fw-500">
              Tỉnh/TP (<span class="red--text">*</span>)</span
            >
            <v-select
              v-model="province"
              :error-messages="provinceError"
              @input="provinceError = []"
              no-data-text="Không có dữ liệu"
              outlined
              dense
              readonly
              :items="listProvince"
            ></v-select>
          </v-col>
          <v-col cols="4" class="py-0 px-3">
            <span class="fw-500">
              Quận/Huyện (<span class="red--text">*</span>)</span
            >
            <v-select
              :items="listDistrict"
              v-model="district"
              :error-messages="districtError"
              @input="districtError = []"
              no-data-text="Không có dữ liệu"
              outlined
              readonly
              dense
            ></v-select>
          </v-col>
          <v-col cols="4" class="py-0 px-3">
            <span class="fw-500">
              Xã/Phường (<span class="red--text">*</span>)</span
            >
            <v-select
              v-model="Ward"
              :items="listWard"
              :error-messages="WardError"
              @input="WardError = []"
              no-data-text="Không có dữ liệu"
              outlined
              readonly
              dense
            ></v-select>
          </v-col>
        </v-row>
        <!-- Thông tin người đại diện -->
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
              readonly
              v-model="representativeName"
              :error-messages="representativeNameError"
              @input="representativeNameError = []"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Chức vụ (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="posittion"
              :error-messages="posittionError"
              @input="posittionError = []"
              class="pt-1"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0 px-3">
            <span class="fw-500">
              Số điện thoại (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="representativePhone"
              :error-messages="representativePhoneError"
              @input="representativePhoneError = []"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="py-0 px-3">
            <span class="fw-500">
              Email (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="email"
              :error-messages="emailError"
              @input="emailError = []"
              no-data-text="Không có dữ liệu"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0 px-3">
            <span class="fw-500">
              Địa chỉ (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="address"
              :error-messages="addressError"
              @input="addressError = []"
              no-data-text="Không có dữ liệu"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Thông tin hợp đồng -->
        <v-row class="ma-0" no-gutters style="color: black">
          <v-col cols="12">
            <div
              style="color: black"
              class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
            >
              Thông tin hợp đồng
            </div>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Loại hợp đồng (<span class="red--text">*</span>)</span
            >
            <v-select
              v-model="type"
              :error-messages="typeError"
              @input="typeError = []"
              class="pt-1"
              :items="listType"
              readonly
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Số (<span class="red--text">*</span>)</span>
            <v-text-field
              v-model="number"
              :error-messages="numberError"
              @input="numberError = []"
              class="pt-1"
              outlined
              readonly
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Ngày bắt đầu hợp đồng (<span class="red--text">*</span>)</span
            >
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="moment(startTime).format('DD/MM/YYYY')"
                  v-on="on"
                  hide-details
                  dense
                  disabled
                  outlined
                  append-icon="mdi-calendar-range"
                  readonly
                />
              </template>
              <v-date-picker
                width="391"
                locale="vi"
                v-model="startTime"
                @input="onChange"
              />
            </v-menu>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Ngày kết thúc hợp đồng (<span class="red--text">*</span>)</span
            >
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="moment(endTime).format('DD/MM/YYYY')"
                  v-on="on"
                  hide-details
                  dense
                  disabled
                  outlined
                  append-icon="mdi-calendar-range"
                  readonly
                />
              </template>
              <v-date-picker
                width="391"
                locale="vi"
                v-model="endTime"
                @input="onChange"
              />
            </v-menu>
          </v-col>
        </v-row>

        <v-row class="ma-0 mt-5" no-gutters style="color: black">
          <v-col cols="12">
            <div
              style="color: black"
              class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
            >
              Thông tin tài khoản
            </div>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Tên tài khoản (<span class="red--text">*</span>)</span
            >
            <v-text-field
              v-model="userName"
              :error-messages="userNameError"
              @input="userNameError = []"
              class="pt-1"
              readonly
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Mật khẩu (<span class="red--text">*</span>)</span
            >
            <v-text-field
              class="pt-1"
              id="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              name="password"
              v-model="password"
              dense
              :type="showPass ? 'text' : 'password'"
              :error-messages="passwordError"
              @input="passwordError = []"
              outlined
              readonly
              @click:append="showPass = !showPass"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0 px-3">
            <span class="fw-500"> Ghi chú </span>
            <v-textarea rows="3" v-model="note" outlined dense></v-textarea>
          </v-col>

          <v-col cols="12" class="py-0 px-3">
            <span class="fw-500"> Bình luận </span>
            <v-textarea
              rows="3"
              v-model="comment"
              hide-details=""
              outlined
              dense
            ></v-textarea>
            <div style="text-align: end" class="pt-4">
              <v-btn class="text-none primary" depressed @click="commentSend"
                >Gửi</v-btn
              >
            </div>
          </v-col>
        </v-row>

        <v-row class="mb-5 pl-4">
          <div class="fs-16 black--text font-weight-bold">
            Danh sách lịch sử
          </div>
          <v-col cols="12" class="px-0">
            <v-card class="w-100" flat>
              <client-only>
                <v-data-table
                  :headers="headers"
                  :items="Listitem"
                  hide-default-footer
                  loading-text="Xin chờ"
                  sort-by="stt"
                  no-results-text="Không có kết quả phù hợp"
                  no-data-text="Không có dữ liệu"
                  class="elevation-0 custom_header_table"
                  fixed-header
                  light
                >
                  <template v-slot:[`item.createdAt`]="{ item }">
                    <div>{{ formatTime(item.createdAt) }}</div>
                  </template>
                  <template v-slot:[`item.stt`]="{ item }">
                    <div class="d-flex align-center justify-center">
                      {{ getItemIndex(item) }}
                    </div>
                  </template>
                </v-data-table>
              </client-only>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff">
        <v-spacer></v-spacer>

        <div>
          <v-btn class="text-none secondary" depressed @click="toggle"
            >Đóng</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import Constants from '~/assets/configurations/constant'

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    dataItem: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.getCity()
  },

  data() {
    return {
      listBusiness: [],
      listProvince: [],
      listDistrict: [],
      listWard: [],
      // thông tin khách hàng
      comment: null,
      Listitem: [],
      code: null,
      showPass: false,
      codeError: [],
      taxCode: null,
      taxCodeError: [],
      field: null,
      fieldError: [],
      numberRegister: null,
      numberRegisterError: [],
      province: null,
      provinceError: [],
      district: null,
      districtError: [],
      Ward: null,
      WardError: [],
      // người đại diện
      menu: false,
      date: moment().format('YYYY-MM-DD'),
      startTime: moment().format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      type: 1,
      typeError: [],
      number: null,
      numberError: [],
      listType: Constants.System.Profile.listType,
      representativeNameError: [],
      representativeName: null,
      representativePhoneError: [],
      representativePhone: null,
      fullName: null,
      fullNameError: [],
      posittion: null,
      posittionError: [],
      phoneNumber: null,
      phoneNumberError: [],
      email: null,
      emailError: [],
      address: null,
      addressError: [],
      status: 0,
      //
      userName: null,
      note: null,
      userNameError: [],
      password: null,
      passwordError: [],
      listsMaketting: [
        {
          name: 'Quảng cáo SMS',
          value: 1,
          isSelect: 0,
        },
        {
          name: 'Quảng cáo kênh sóng truyền hình',
          value: 2,
          isSelect: 0,
        },
        {
          name: 'Quảng cáo kênh app',
          value: 3,
          isSelect: 0,
        },
      ],
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tác nhân',
          sortable: false,
          value: 'createdBy',
          width: '13%',
        },
        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          width: '11%',
        },
        {
          text: 'Thời gian',
          value: 'createdAt',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'Nội dung',
          sortable: false,
          width: '11%',
          value: 'content',
        },
      ],
    }
  },
  watch: {
    open(value) {
      if (value) {
        this.getListBusiness()
        this.code = this.dataItem.customerCode
        this.fullName = this.dataItem.customerName
        this.taxCode = this.dataItem.taxCode
        this.numberRegister = this.dataItem.businessNumber
        this.phoneNumber = this.dataItem.customerPhone
        this.province = this.dataItem.city

        this.representativeName = this.dataItem.representativeName
        this.posittion = this.dataItem.position
        this.representativePhone = this.dataItem.representativePhone
        this.address = this.dataItem.address
        this.email = this.dataItem.email

        this.type = this.dataItem.contractType
        this.date = moment(
          this.dataItem.contractDate,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')
        this.note = this.dataItem.note
        this.userName = this.dataItem.userName
        this.password = this.dataItem.password
        this.field = this.dataItem.listTypeBusinessField

        this.number = this.dataItem.contractNumber
        this.status = this.dataItem.status
        this.checkBox(this.dataItem.adType)
        this.listHitory()
        this.getDistrict()
        this.district = this.dataItem.district
        //this.getWards()
        this.Ward = this.dataItem.ward
        this.startTime = moment(
          this.dataItem.startTime,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')
        this.endTime = moment(
          this.dataItem.endTime,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')
      }
    },
  },
  methods: {
    getListBusiness() {
      this.$store
        .dispatch('businessCategory/BusinessFiledSelectData', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listBusiness = res.data.data
          }
        })
        .catch((errors) => {})
    },
    getCity() {
      this.$store
        .dispatch('address/getCity')
        .then((res) => {
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
        .catch((errors) => {})
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
        .catch((errors) => {})
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
        .catch((errors) => {})
    },
    getItemIndex(item) {
      return (
        (this.page - 1) * this.itemsPerPage + this.Listitem.indexOf(item) + 1
      )
    },
    formatTime(value) {
      return moment(value, 'DD/MM/YYYY HH:mm:ss').format('HH:mm:ss DD/MM/YYYY')
    },
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
    listHitory() {
      this.$store
        .dispatch('customer/listHistory', {
          tableId: this.dataItem.id,
          tableName: 'Customer',
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listitem = res.data.data
          }
        })
        .catch((errors) => {})
    },
    commentSend() {
      this.$store
        .dispatch('customer/CommentCus', {
          tableId: this.dataItem.id,
          tableName: 'Customer',
          content: this.comment,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Gửi bình luận thành công')
            this.comment = null
            this.listHitory()
          }
        })
        .catch((errors) => {})
    },
    reset() {
      this.comment = null
    },

    emitSearch() {
      this.$emit('search')
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },
    onChange() {
      this.menu = false
    },
  },
}
</script>
