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
        Cập nhật tài khoản khách hàng
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
              class="px-9 ma-0"
              v-model="item.isSelect"
              v-bind:true-value="1"
              v-bind:false-value="0"
              @change="checkBox(item)"
              :disabled="status == 2"
            >
              <template v-slot:label>
                <div class="black--text fs-16">{{ item.name }}</div>
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="12" style="text-align-last: center">
            <div
              v-if="errorcheckbox"
              class="v-messages theme--light error--text mt-n1 ml-2 mb-5"
              role="alert"
            >
              <div class="v-messages__wrapper">
                <div class="v-messages__message">
                  Vui lòng tick chọn 1 trong 3 ô
                </div>
              </div>
            </div>
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
              @keydown.space="preventLeadingSpace"
              :disabled="status == 2"
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
              v-on:keypress="isLetterAndNum($event)"
              @keydown.space="preventLeadingSpace"
              :disabled="status == 2"
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
              @keydown.space="preventLeadingSpace"
              :disabled="status == 2"
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
              item-text="name"
              item-value="id"
              @keydown.space="preventLeadingSpace"
              :disabled="status == 2"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" class="py-0 px-3">
            <span class="fw-500">
              Số đăng ký kinh doanh (<span class="red--text">*</span>)</span
            >
            <v-text-field
              type="number"
              outlined
              v-model="numberRegister"
              :error-messages="numberRegisterError"
              @input="numberRegisterError = []"
              dense
              @keydown.space="preventLeadingSpace"
              :disabled="status == 2"
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
              no-data-text="Không có dữ liệu"
              outlined
              dense
              type="number"
              onKeyPress="if(this.value.length==10) return false;"
              @keypress="isNumberPhone($event)"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="py-0 px-3">
            <span class="fw-500">
              Tỉnh/TP (<span class="red--text">*</span>)</span
            >
            <v-autocomplete
              v-model="province"
              :error-messages="provinceError"
              @input="provinceError = []"
              no-data-text="Không có dữ liệu"
              outlined
              dense
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
              :error-messages="districtError"
              @input="districtError = []"
              no-data-text="Không có dữ liệu"
              outlined
              dense
              :items="listDistrict"
              @change="changeDistrict(district)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4" class="py-0 px-3">
            <span class="fw-500"> Xã/Phường</span>
            <v-autocomplete
              v-model="Ward"
              no-data-text="Không có dữ liệu"
              outlined
              dense
              :items="listWard"
            ></v-autocomplete>
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
              v-model="representativeName"
              :error-messages="representativeNameError"
              @input="representativeNameError = []"
              @keydown.space="preventLeadingSpace"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Chức vụ </span>
            <v-text-field
              v-model="posittion"
              @input="posittionError = []"
              class="pt-1"
              outlined
              dense
              @keydown.space="preventLeadingSpace"
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
              dense
              type="number"
              onKeyPress="if(this.value.length==10) return false;"
              @keypress="isNumberPhone($event)"
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
              outlined
              dense
              @keydown.space="preventLeadingSpace"
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
              dense
              @keydown.space="preventLeadingSpace"
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
              outlined
              dense
              :disabled="status == 2"
            ></v-select>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Số (<span class="red--text">*</span>)</span>
            <v-text-field
              type="number"
              v-model="number"
              :error-messages="numberError"
              @input="numberError = []"
              class="pt-1"
              outlined
              dense
              @keydown.space="preventLeadingSpace"
              :disabled="status == 2"
            ></v-text-field>
          </v-col>

          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500">
              Ngày bắt đầu hợp đồng (<span class="red--text">*</span>)</span
            >
            <v-menu
              role="time"
              v-model="menu1"
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
                  outlined
                  append-icon="mdi-calendar-range"
                  :disabled="status == 2"
                />
              </template>
              <v-date-picker
                width="600"
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
              role="time"
              v-model="menu2"
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
                  outlined
                  append-icon="mdi-calendar-range"
                  :disabled="status == 2"
                />
              </template>
              <v-date-picker
                width="600"
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
              outlined
              dense
              @keydown.space="preventLeadingSpace"
              :disabled="status == 2"
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
              @click:append="showPass = !showPass"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0 px-3">
            <span class="fw-500"> Ghi chú </span>
            <v-textarea
              rows="3"
              v-model="note"
              outlined
              dense
              @keydown.space="preventLeadingSpace"
              disable
            ></v-textarea>
          </v-col>

          <v-col cols="12" class="py-0 px-3 mb-5" v-if="status === 2">
            <span class="fw-500">
              Bằng chứng thay đổi: <span class="red--text">*</span>
            </span>
            <v-btn
              class="text-none white--text primary ml-4"
              height="32"
              depressed
              v-if="$isNullOrEmpty(avatar)"
              @click="selectFileOpen"
            >
              Tải file
            </v-btn>
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
          </v-col>
          <div
            v-if="errormsg"
            class="v-messages theme--light error--text mt-1 ml-2"
            role="alert"
          >
            <div class="v-messages__wrapper">
              <div class="v-messages__message">
                Vui lòng không được để trống file bằng chứng thay đổi
              </div>
            </div>
          </div>
          <div
            v-if="errorlimit"
            class="v-messages theme--light error--text mt-1 ml-2"
            role="alert"
          >
            <div class="v-messages__wrapper">
              <div class="v-messages__message">
                File được chọn không được vượt quá 2MB
              </div>
            </div>
          </div>

          <div></div>
          <v-file-input
            :value="file"
            @change="inputFile($event)"
            accept="image/png, image/jpeg, image/gif"
            id="input_file_update"
            class="d-none"
          ></v-file-input>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff">
        <v-spacer></v-spacer>
        <div v-if="status === 0 || status === 3">
          <v-btn class="text-none primary" depressed @click="temporarySave"
            >Lưu tạm</v-btn
          >
          <v-btn class="text-none primary" depressed @click="approvalSave"
            >Trình phê duyệt</v-btn
          >
          <v-btn class="text-none primary" depressed @click="reset"
            >Nhập lại</v-btn
          >
          <v-btn class="text-none secondary" depressed @click="toggle"
            >Hủy</v-btn
          >
        </div>
        <div v-else-if="status === 2">
          <v-btn class="text-none primary" depressed @click="save">Lưu</v-btn>
          <v-btn class="text-none secondary" depressed @click="toggle"
            >Hủy</v-btn
          >
        </div>
      </v-card-actions>
      <alerWarning
        btnOkColor="warning"
        title="Cảnh báo"
        :open="openWarning"
        :check="true"
        :alert-msg="messWarning"
        @toggle="openWarning = !openWarning"
        @OK="callAPIApproval"
      ></alerWarning>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import URL from '~/assets/configurations/BASE_URL'
import alerWarning from '~/components/tai-khoan/YesNoAlert.vue'
import Constants from '~/assets/configurations/constant'
export default {
  components: {
    alerWarning,
  },
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
      URL,
      openWarning: false,
      messWarning: null,
      avatar: null,
      file: [],
      listProvince: [],
      listDistrict: [],
      listWard: [],
      // thông tin khách hàng
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

      // người đại diện
      menu: false,
      menu1: false,
      menu2: false,
      date: moment().format('YYYY-MM-DD'),
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
      startTime: moment().format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      listBusiness: [],
      files: {},
      errormsg: false,
      errorcheckbox: false,
      errorlimit: false,

      listsMaketting: Constants.System.Profile.listsMaketting,
    }
  },
  computed: {},
  watch: {
    open(value) {
      if (value) {
        this.getListBusiness()
        this.reset()
        this.code = this.dataItem.customerCode
        this.fullName = this.dataItem.customerName
        this.taxCode = this.dataItem.taxCode
        this.numberRegister = this.dataItem.businessNumber
        this.phoneNumber = this.dataItem.customerPhone
        // adType:
        this.province = this.dataItem.city
        this.Ward = this.dataItem.ward
        this.representativeName = this.dataItem.representativeName
        this.posittion = this.dataItem.position
        this.representativePhone = this.dataItem.representativePhone
        this.address = this.dataItem.address
        this.email = this.dataItem.email
        this.files = {
          fileName: this.dataItem.nameImage,
          url: this.dataItem.image,
        }
        this.type = this.dataItem.contractType
        this.date = moment(
          this.dataItem.contractDate,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')
        this.startTime = moment(
          this.dataItem.startTime,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')
        this.endTime = moment(
          this.dataItem.endTime,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')
        this.note = this.dataItem.note
        this.userName = this.dataItem.userName
        this.password = this.dataItem.password

        this.field = this.dataItem.listTypeBusinessField

        this.number = this.dataItem.contractNumber
        this.status = this.dataItem.status

        this.valueCheckbox = this.dataItem.adType
        for (let i = 0; i < this.listsMaketting.length; i++) {
          if (this.listsMaketting[i].value == this.dataItem.adType) {
            this.listsMaketting[i].isSelect = 1
          }
        }
        this.getDistrict()
        this.district = this.dataItem.district
        this.avatar = this.dataItem.image
      }
    },
  },
  methods: {
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    isLetterAndNum(e) {
      let char = String.fromCharCode(e.keyCode)
      if (
        /^[A-Za-z\àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ1234567890 ]+$/.test(
          char
        )
      )
        return true
      else e.preventDefault()
    },
    isNumberPhone: function (evt) {
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
    delete_img(index) {
      this.files.splice(index, 1)
      this.file = []
    },
    file_selected(file) {
      this.errormsg = false

      const formData = new FormData()
      formData.append('image', file)
      const data = { formData }
      this.$store
        .dispatch('customer/uploadImage', data)
        .then((response) => {
          var urlBase = `${URL.BASE}`
          if (urlBase.endsWith('/'))
            urlBase = urlBase.substring(0, urlBase.length - 1)
          if (!response.error) {
            this.files = {
              fileName: response.data.data[0].nameImg,
              url: urlBase + `/downloadFile/${response.data.data[0].linkImg}`,
            }
            this.avatar =
              urlBase + `/downloadFile/${response.data.data[0].linkImg}`
          }
        })
        .catch((errors) => {})
        .catch((e) => {
          this.$log.debug(e)
        })
    },
    selectFileOpen() {
      return window.document.getElementById('input_file_update').click()
    },
    inputFile(file) {
      if (!this.$isNullOrEmpty(file)) {
        this.hidden = false
        let hasErrors = false

        if ((file.size || 0) > 2000000) {
          hasErrors = true
          this.errormsg = false
          this.errorlimit = true
        }
        if (!hasErrors) {
          this.errorlimit = false
          this.reset_file = file
          if (this.$isNullOrEmpty(file)) {
            this.img = URL.createObjectURL(file)
          }
          this.file_selected(file)
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
        .catch((errors) => {})
    },
    changeDistrict(district) {
      let code = this.listDistrict.filter((i) => i.value == district)[0].code

      this.listWard = []
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
    changeCity(city) {
      let code = this.listProvince.filter((i) => i.value == city)[0].code
      this.listDistrict = []
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
    checkBox(item) {
      if (item == null) return
      this.errorcheckbox = false
      this.valueCheckbox = null
      for (let i = 0; i < this.listsMaketting.length; i++) {
        if (this.listsMaketting[i].value == item.value && item.isSelect == 1) {
          this.listsMaketting[i].isSelect = 1
          this.valueCheckbox = item.value
        } else {
          this.listsMaketting[i].isSelect = 0
        }
      }
    },

    temporarySave() {
      this.callAPI()
    },
    callAPI() {
      this.$store
        .dispatch('customer/update', {
          id: this.dataItem.id,
          customerCode: this.code,
          customerName: this.fullName,
          taxCode: this.taxCode,
          businessNumber: this.numberRegister,
          customerPhone: this.phoneNumber,
          adType: this.valueCheckbox,
          city: this.province,
          district: this.district,
          ward: this.Ward,
          representativeName: this.representativeName,
          position: this.posittion,
          representativePhone: this.representativePhone,
          address: this.address,
          email: this.email,
          //loại hợp đồng
          contractType: this.type,
          contractDate: moment(this.date, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          startTime: moment(this.startTime, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          endTime: moment(this.endTime, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          note: this.note,
          userName: this.userName,
          password: this.password,
          businessField: this.field,
          contractNumber: this.number,
          image: this.avatar,
          status: 0,
        })
        .then((res) => {
          this.$showSuccess(this, 'Cập nhật tài khoản khách hàng thành công')
          this.toggle()
          this.$emit('success')
        })
        .catch((errors) => {})
    },

    approvalSave() {
      if (!this.checkValidate()) {
        this.callAPIcheck()
      }
    },
    callAPIApproval() {
      this.$store
        .dispatch('customer/update', {
          id: this.dataItem.id,
          customerCode: this.code,
          customerName: this.fullName,
          taxCode: this.taxCode,
          businessNumber: this.numberRegister,
          customerPhone: this.phoneNumber,
          adType: this.valueCheckbox,
          city: this.province,
          district: this.district,
          ward: this.Ward,
          representativeName: this.representativeName,
          position: this.posittion,
          representativePhone: this.representativePhone,
          address: this.address,
          email: this.email,
          //loại hợp đồng
          contractType: this.type,
          contractDate: moment(this.date, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          startTime: moment(this.startTime, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          endTime: moment(this.endTime, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          note: this.note,
          userName: this.userName,
          password: this.password,
          businessField: this.field,
          contractNumber: this.number,
          image: null,
          status: 1,
        })
        .then((res) => {
          if (res.data.data.resultCode == 1) {
            this.$showSuccess(this, 'Cập nhật tài khoản khách hàng thành công')
            this.toggle()
            this.$emit('success')
          } else if (res.data.data.resultCode == 2) {
            this.$showSuccess(this, 'Gửi duyệt thành công')
            this.$showWarnNotify(this, res.data.data.message)
            this.toggle()
            this.$emit('success')
          } else {
            this.$showError(this, res.data.data.message)
          }
        })
        .catch((errors) => {})
    },

    callAPIcheck() {
      const data = {
        id: this.dataItem.id,
        taxCode: this.taxCode,
        businessNumber: this.numberRegister,
        status: 1,
      }

      this.$store.dispatch('customer/checkAddUpdate', data).then((response) => {
        if (!response.error) {
          if (response.data.data.resultCode === 1) {
            this.callAPIApproval()
          } else if (response.data.data.resultCode === 2) {
            this.messWarning =
              response.data.data.message + '. Bạn có muốn tiếp tục?'
            this.openWarning = true
          }
        }
      })
    },

    checkValidate() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.userName)) {
        hasErrors = true
        this.userNameError = ['Vui lòng nhập tên đăng nhập']
      } else if ((this.userName || '').trim().length === 0) {
        hasErrors = true
        this.userNameError = ['Vui lòng nhập tên đăng nhập']
      } else if (this.$isHasSpecial(this.userName)) {
        hasErrors = true
        this.userNameError = ['Tên đăng nhập sai định dạng']
      } else if (this.userName.length < 5 || this.userName.length > 30) {
        hasErrors = true
        this.userNameError = ['Độ dài tài khoản chỉ từ 5 đến 30 kí tự']
      }

      if (this.$isNullOrEmpty(this.fullName)) {
        hasErrors = true
        this.fullNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.fullName || '').trim().length === 0) {
        hasErrors = true
        this.fullNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.fullName || '').length > 100) {
        hasErrors = true
        this.fullNameError = [
          'Độ dài của tên người đại diện chỉ 1 hoặc 100 ký tự',
        ]
      }

      if (this.$isNullOrEmpty(this.phoneNumber)) {
        hasErrors = true
        this.phoneNumberError = ['Vui lòng nhập số điện thoại']
      } else if (isNaN(this.phoneNumber)) {
        hasErrors = true
        this.phoneNumberError = ['Vui lòng nhập đúng định dạng']
      } else if (this.$isHasSpecial(this.phoneNumber)) {
        hasErrors = true
        this.phoneNumberError = ['Vui lòng nhập đúng định dạng']
      } else if (!this.$isMobilePhone(this.phoneNumber)) {
        hasErrors = true
        this.phoneNumberError = ['Vui lòng nhập đúng định dạng']
      } else if (this.phoneNumber.length !== 10) {
        hasErrors = true
        this.phoneNumberError = ['Độ dài của số điện thoại là 10 ký tự']
      }

      if (this.$isNullOrEmpty(this.email)) {
        hasErrors = true
        this.emailError = ['Vui lòng nhập email']
      } else if (!this.$isEmail(this.email)) {
        hasErrors = true
        this.emailError = ['Email không hợp lệ']
      }

      if (this.$isNullOrEmpty(this.representativePhone)) {
        hasErrors = true
        this.representativePhoneError = ['Vui lòng nhập số điện thoại']
      } else if (isNaN(this.representativePhone)) {
        hasErrors = true
        this.representativePhoneError = ['Vui lòng nhập đúng định dạng']
      } else if (this.$isHasSpecial(this.representativePhone)) {
        hasErrors = true
        this.representativePhoneError = ['Vui lòng nhập đúng định dạng']
      } else if (!this.$isMobilePhone(this.representativePhone)) {
        hasErrors = true
        this.representativePhoneError = ['Vui lòng nhập đúng định dạng']
      } else if ((this.representativePhone || '').length !== 10) {
        hasErrors = true
        this.representativePhoneError = ['Độ dài của số điện thoại là 10 ký tự']
      }

      if (this.$isNullOrEmpty(this.representativeName)) {
        hasErrors = true
        this.representativeNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.representativeName || '').trim().length === 0) {
        hasErrors = true
        this.representativeNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.representativeName || '').length > 100) {
        hasErrors = true
        this.representativeNameError = [
          'Độ dài của tên người đại diện chỉ 1 hoặc 100 ký tự',
        ]
      }

      if (this.$isNullOrEmpty(this.province)) {
        hasErrors = true
        this.provinceError = ['Vui lòng chọn Tỉnh/TP']
      }
      // //
      if (this.$isNullOrEmpty(this.district)) {
        hasErrors = true
        this.districtError = ['Vui lòng chọn Quận/Huyện']
      }

      if (this.status != 2) {
        //read only
        if (this.$isNullOrEmpty(this.code)) {
          hasErrors = true
          this.codeError = ['Vui lòng nhập mã khách hàng']
        } else if ((this.code || '').trim().length === 0) {
          hasErrors = true
          this.codeError = ['Vui lòng nhập mã khách hàng']
        } else if (this.code.length < 4 || this.code.length > 10) {
          hasErrors = true
          this.codeError = ['Độ dài của mã khách hàng chỉ từ 4 đến 10 ký tự']
        }

        if (this.$isNullOrEmpty(this.taxCode)) {
          hasErrors = true
          this.taxCodeError = ['Vui lòng nhập mã số thuế']
        } else if ((this.taxCode || '').trim().length === 0) {
          hasErrors = true
          this.taxCodeError = ['Vui lòng nhập mã số thuế']
        } else if (isNaN(this.taxCode) && this.taxCode.length < 14) {
          hasErrors = true
          this.taxCodeError = ['Mã số thuế sai định dạng']
        } else if (
          this.$isHasSpecial(this.taxCode) &&
          this.taxCode.length < 14
        ) {
          hasErrors = true
          this.taxCodeError = ['Mã số thuế sai định dạng']
        } else if (
          this.taxCode.length > 11 &&
          this.$isHasSpecial(this.taxCode[11])
        ) {
          hasErrors = true
          this.taxCodeError = ['Mã số thuế sai định dạng']
        } else if (
          this.taxCode.length > 12 &&
          this.$isHasSpecial(this.taxCode[12])
        ) {
          hasErrors = true
          this.taxCodeError = ['Mã số thuế sai định dạng']
        } else if (
          this.taxCode.length > 13 &&
          this.$isHasSpecial(this.taxCode[13])
        ) {
          hasErrors = true
          this.taxCodeError = ['Mã số thuế sai định dạng']
        } else if (this.taxCode.length < 10 || this.taxCode.length > 14) {
          hasErrors = true
          this.taxCodeError = ['Độ dài của mã số thuế chỉ 10 hoặc 14 ký tự']
        } else if (
          this.taxCode.length > 10 &&
          this.taxCode.indexOf('-') != 10
        ) {
          hasErrors = true
          this.taxCodeError = [
            'Độ dài Mã số thuế chỉ 10 hoặc 14 ký tự có "-" ở vị trí 11',
          ]
        }

        if (this.$isNullOrEmpty(this.userName)) {
          hasErrors = true
          this.userNameError = ['Vui lòng nhập tên đăng nhập']
        }
        if (this.$isNullOrEmpty(this.password)) {
          hasErrors = true
          this.passwordError = ['Vui lòng nhập mật khẩu']
        }

        if (this.$isNullOrEmpty(this.number)) {
          hasErrors = true
          this.numberError = ['Vui lòng nhập số hợp đồng']
        } else if (this.$isHasSpeciall(this.number)) {
          hasErrors = true
          this.numberError = ['Vui lòng nhập đúng định dạng']
        } else if (this.number.length > 30) {
          hasErrors = true
          this.numberError = ['Độ dài của số hợp đồng chỉ 1 hoặc 30 ký tự']
        }

        if (this.$isNullOrEmpty(this.field)) {
          hasErrors = true
          this.fieldError = ['Vui lòng nhập lĩnh vực kinh doanh']
        }

        if (this.$isNullOrEmpty(this.numberRegister)) {
          hasErrors = true
          this.numberRegisterError = ['Vui lòng nhập số đăng ký kinh doanh']
        } else if ((this.numberRegister || '').length !== 10) {
          hasErrors = true
          this.numberRegisterError = [
            'Độ dài của số đăng ký kinh doanh là 10 ký tự ',
          ]
        } else if (isNaN(this.numberRegister)) {
          hasErrors = true
          this.numberRegisterError = ['Vui lòng nhập đúng định dạng']
        } else if (this.$isHasSpecial(this.numberRegister)) {
          hasErrors = true
          this.numberRegisterError = ['Vui lòng nhập đúng định dạng']
        }

        if (this.$isNullOrEmpty(this.valueCheckbox)) {
          hasErrors = true
          this.errorcheckbox = true
        }
      }

      return hasErrors
    },
    save() {
      if (this.checkValidate()) return

      this.$store
        .dispatch('customer/update', {
          id: this.dataItem.id,
          customerCode: this.code,
          customerName: this.fullName,
          taxCode: this.taxCode,
          businessNumber: this.numberRegister,
          customerPhone: this.phoneNumber,
          adType: this.$isNullOrEmpty(this.valueCheckbox)
            ? null
            : this.valueCheckbox,
          city: this.province,
          district: this.district,
          ward: this.Ward,
          representativeName: this.representativeName,
          position: this.posittion,
          representativePhone: this.representativePhone,
          address: this.address,
          email: this.email,
          //loại hợp đồng
          contractType: this.type,
          contractDate: moment(this.date, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          startTime: moment(this.startTime, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          endTime: moment(this.endTime, 'YYYY-MM-DD').format(
            'DD/MM/YYYY 00:00:00'
          ),
          note: this.note,
          userName: this.userName,
          password: this.password,
          businessField: this.field,
          contractNumber: this.number,
          status: this.status,
          image: this.files.url,
          nameImage: this.files.fileName,
        })
        .then((res) => {
          this.$showSuccess(this, 'Cập nhật tài khoản khách hàng thành công')
          this.toggle()
          this.$emit('success')
        })
        .catch((errors) => {})
    },
    reset() {
      this.code = this.dataItem.customerCode
      this.fullName = this.dataItem.customerName
      this.taxCode = this.dataItem.taxCode
      this.numberRegister = this.dataItem.businessNumber
      this.phoneNumber = this.dataItem.customerPhone
      // adType:
      this.province = this.dataItem.city
      this.district = this.dataItem.district
      this.Ward = this.dataItem.ward
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
      this.startTime = moment(
        this.dataItem.startTime,
        'DD/MM/YYYY HH:mm:ss'
      ).format('YYYY-MM-DD')
      this.endTime = moment(
        this.dataItem.endTime,
        'DD/MM/YYYY HH:mm:ss'
      ).format('YYYY-MM-DD')
      this.note = this.dataItem.note
      this.userName = this.dataItem.userName
      this.password = this.dataItem.password
      this.field = this.dataItem.businessField
      this.number = this.dataItem.contractNumber
      this.status = this.dataItem.status

      this.checkBox(this.dataItem.adType)

      this.codeError = []
      this.phoneNumberError = []
      this.provinceError = []
      this.districtError = []

      this.representativeNameError = []
      this.representativePhoneError = []
      this.posittionError = []
      this.emailError = []
      this.addressError = []
      this.taxCodeError = []
      this.numberError = []
      this.numberRegisterError = []
      this.userNameError = []
      this.passwordError = []
      this.fieldError = []
      this.errorcheckbox = false
      this.fullNameError = []
      for (let index = 0; index < this.listsMaketting.length; index++) {
        this.listsMaketting[index].isSelect = 0
      }
      this.valueCheckbox = null
      this.files = { fileName: null, url: null }
    },

    emitSearch() {
      this.$emit('search')
    },
    toggle() {
      this.$emit('toggle')
    },
    onChange() {
      this.menu = false
      this.menu1 = false
      this.menu2 = false
    },
  },
}
</script>
<style>
[role='time'] {
  top: 60% !important;
}
</style>
