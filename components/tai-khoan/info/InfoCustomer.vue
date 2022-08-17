<template>
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
        v-model="fullname"
        :error-messages="fullnameError"
        @input="fullnameError = []"
        v-on:keypress="isLetterAndNum($event)"
        @keydown.space="preventLeadingSpace"
      ></v-text-field>
    </v-col>

    <v-col cols="6" class="py-0 px-3">
      <span class="fw-500"> Mã số thuế (<span class="red--text">*</span>)</span>
      <v-text-field
        outlined
        dense
        v-model="taxCode"
        :error-messages="taxCodeError"
        @input="taxCodeError = []"
        @keydown.space="preventLeadingSpace"
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
        :error-messages="numberRegisterError"
        @input="numberRegisterError = []"
        dense
        @keydown.space="preventLeadingSpace"
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
      <span class="fw-500"> Tỉnh/TP (<span class="red--text">*</span>)</span>
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
      <span class="fw-500"> Quận/Huyện (<span class="red--text">*</span>)</span>
      <v-autocomplete
        v-model="district"
        :items="listDistrict"
        :error-messages="districtError"
        @input="districtError = []"
        no-data-text="Không có dữ liệu"
        outlined
        dense
        @change="changeDistrict(district)"
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
        :disabled="this.$isNullOrEmpty(this.district) ? true : false"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      code: null,
      codeError: [],
      fullname: null,
      fullnameError: [],
      taxCode: null,
      taxCodeError: [],
      field: null,
      fieldError: [],
      numberRegister: null,
      numberRegisterError: [],
      phoneNumber: null,
      phoneNumberError: [],
      province: null,
      provinceError: [],
      district: null,
      districtError: [],
      Ward: null,

      listProvince: [],
      listDistrict: [],
      listWard: [],
      listBusiness: [],
      demo: null,
      checkValue: null,
    }
  },
  mounted() {
    this.getCity()
    this.getListBusiness()
  },
  methods: {
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[0-9\:]+$/.test(char)) return true
      else e.preventDefault()
    },

    isNumberPhone: function (evt) {
      evt = evt ? evt : window.evt
      if (
        (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
        evt.which > 57
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
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

    getListBusiness() {
      this.$store
        .dispatch('configPrice/businessSelectDataActive', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listBusiness = res.data.data
          }
        })
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
    reset() {
      this.code = null
      this.codeError = []
      this.fullname = null
      this.fullnameError = []
      this.taxCode = ''
      this.taxCodeError = []
      this.field = null
      this.fieldError = []
      this.numberRegister = null
      this.numberRegisterError = []
      this.phoneNumber = null
      this.phoneNumberError = []
      this.province = null
      this.provinceError = []
      this.district = null
      this.districtError = []
      this.Ward = null
    },
    checkInsert() {
      let isError = false
      if (this.$isNullOrEmpty(this.code)) {
        isError = true
        this.codeError = ['Vui lòng nhập mã khách hàng']
      } else if ((this.code || '').trim().length === 0) {
        isError = true
        this.codeError = ['Vui lòng nhập mã khách hàng']
      } else if (
        (this.code || '').length < 4 ||
        (this.code || '').length > 10
      ) {
        isError = true
        this.codeError = ['Độ dài của mã khách hàng chỉ từ 4 đến 10 ký tự']
      }
      //
      if (this.$isNullOrEmpty(this.taxCode)) {
        isError = true
        this.taxCodeError = ['Vui lòng nhập mã số thuế']
      } else if ((this.taxCode || '').trim().length === 0) {
        isError = true
        this.taxCodeError = ['Vui lòng nhập mã số thuế']
      } else if (isNaN(this.taxCode) && this.taxCode.length < 14) {
        isError = true
        this.taxCodeError = ['Mã số thuế sai định dạng']
      } else if (this.$isHasSpecial(this.taxCode) && this.taxCode.length < 14) {
        isError = true
        this.taxCodeError = ['Mã số thuế sai định dạng']
      } else if (
        this.taxCode.length > 11 &&
        this.$isHasSpecial(this.taxCode[11])
      ) {
        isError = true
        this.taxCodeError = ['Mã số thuế sai định dạng']
      } else if (
        this.taxCode.length > 12 &&
        this.$isHasSpecial(this.taxCode[12])
      ) {
        isError = true
        this.taxCodeError = ['Mã số thuế sai định dạng']
      } else if (
        this.taxCode.length > 13 &&
        this.$isHasSpecial(this.taxCode[13])
      ) {
        isError = true
        this.taxCodeError = ['Mã số thuế sai định dạng']
      } else if (this.taxCode.length < 10 || this.taxCode.length > 14) {
        isError = true
        this.taxCodeError = ['Độ dài của mã số thuế chỉ 10 hoặc 14 ký tự']
      } else if (this.taxCode.length > 10 && this.taxCode.indexOf('-') != 10) {
        isError = true
        this.taxCodeError = [
          'Độ dài Mã số thuế chỉ 10 hoặc 14 ký tự có "-" ở vị trí 11',
        ]
      }

      if (this.$isNullOrEmpty(this.field)) {
        isError = true
        this.fieldError = ['Vui lòng chọn lĩnh vực kinh doanh']
      }
      if (this.$isNullOrEmpty(this.fullname)) {
        isError = true
        this.fullnameError = ['Vui lòng nhập tên khách hàng']
      } else if ((this.fullname || '').trim().length === 0) {
        isError = true
        this.fullnameError = ['Vui lòng nhập tên khách hàng']
      } else if (this.fullname.length > 100) {
        isError = true
        this.fullnameError = ['Độ dài của tên khách hàng từ 1 đến 100 ký tự']
      }

      if (this.$isNullOrEmpty(this.numberRegister)) {
        isError = true
        this.numberRegisterError = ['Vui lòng nhập số đăng ký kinh doanh']
      } else if ((this.numberRegister || '').trim().length === 0) {
        isError = true
        this.numberRegisterError = ['Vui lòng nhập số đăng ký kinh doanh']
      } else if ((this.numberRegister || '').length !== 10) {
        isError = true
        this.numberRegisterError = [
          'Độ dài của số đăng ký kinh doanh là 10 ký tự ',
        ]
      } else if (isNaN(this.numberRegister)) {
        isError = true
        this.numberRegisterError = ['Vui lòng nhập đúng định dạng']
      }

      if (this.$isNullOrEmpty(this.phoneNumber)) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập số điện thoại']
      } else if ((this.phoneNumber || '').trim().length === 0) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập số đăng ký kinh doanh']
      } else if (isNaN(this.phoneNumber)) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập đúng định dạng']
      } else if (!this.$isMobilePhone(this.phoneNumber)) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập đúng định dạng']
      } else if (this.phoneNumber.length !== 10) {
        isError = true
        this.phoneNumberError = [
          'Độ dài của số điện thoại không vượt quá 10 ký tự',
        ]
      }

      if (this.$isNullOrEmpty(this.province)) {
        isError = true
        this.provinceError = ['Vui lòng chọn Tỉnh/TP']
      }

      if (this.$isNullOrEmpty(this.district)) {
        isError = true
        this.districtError = ['Vui lòng chọn Quận/Huyện']
      }

      if (isError) return isError
      this.save()
    },
    save() {
      let data = {
        code: this.code,
        fullname: this.fullname,
        taxCode: this.taxCode,
        field: this.field,
        numberRegister: this.numberRegister,
        phoneNumber: this.phoneNumber,
        province: this.province,
        district: this.district,
        Ward: this.Ward,
      }
      this.$emit('success')
    },
  },
}
</script>
