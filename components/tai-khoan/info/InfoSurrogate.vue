<template>
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
        :error-messages="fullNameError"
        @input="fullNameError = []"
      ></v-text-field>
    </v-col>
    <v-col cols="6" class="pt-4 px-3">
      <span class="fw-500"> Chức vụ (<span class="red--text">*</span>)</span>
      <v-text-field
        v-model="posittion"
        :error-messages="posittionError"
        @input="posittionError = []"
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
        :error-messages="representativePhoneError"
        @input="representativePhoneError = []"
        outlined
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="6" class="py-0 px-3">
      <span class="fw-500"> Email (<span class="red--text">*</span>)</span>
      <v-text-field
        v-model="email"
        :error-messages="emailError"
        @input="emailError = []"
        outlined
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="py-0 px-3">
      <span class="fw-500"> Địa chỉ (<span class="red--text">*</span>)</span>
      <v-text-field
        v-model="address"
        :error-messages="addressError"
        @input="addressError = []"
        no-data-text="Không có dữ liệu"
        outlined
        dense
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
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
      representativePhone: null,
      representativePhoneError: [],
    }
  },
  methods: {
    checkInsert() {
      let isError = false
      if (this.$isNullOrEmpty(this.fullName)) {
        isError = true
        this.fullNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.fullName || '').trim().length === 0) {
        isError = true
        this.fullNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.fullname || '').length > 100) {
        isError = true
        this.fullnameError = [
          'Độ dài của tên người đại diện chỉ 1 hoặc 100 ký tự',
        ]
      }
      //
      if (this.$isNullOrEmpty(this.phoneNumber)) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập số điện thoại']
      } else if ((this.phoneNumber || '').trim().length === 0) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập số điện thoại']
      } else if (!this.$isMobilePhone(this.phoneNumber)) {
        isError = true
        this.phoneNumberError = ['Số điện thoại không hợp lệ']
      } else if (isNaN(this.phoneNumber)) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập đúng định dạng']
      } else if (this.$isHasSpecial(this.phoneNumber)) {
        isError = true
        this.phoneNumberError = ['Vui lòng nhập đúng định dạng']
      } else if (this.phoneNumber.length !== 10) {
        isError = true
        this.phoneNumberError = ['Độ dài của số điện thoại là 10 ký tự']
      }

      if (this.$isNullOrEmpty(this.email)) {
        isError = true
        this.emailError = ['Vui lòng nhập email']
      } else if ((this.email || '').trim().length === 0) {
        isError = true
        this.emailError = ['Vui lòng nhập email']
      } else if (!this.$isEmail(this.email)) {
        isError = true
        this.emailError = ['Email không hợp lệ']
      }

      if (this.$isNullOrEmpty(this.representativePhone)) {
        isError = true
        this.representativePhoneError = ['Vui lòng nhập số điện thoại']
      } else if ((this.representativePhone || '').trim().length === 0) {
        isError = true
        this.representativePhoneError = ['Vui lòng nhập số điện thoại']
      } else if (isNaN(this.representativePhone)) {
        isError = true
        this.representativePhoneError = ['Số điện thoại không đúng định dạng']
      } else if (!this.$isMobilePhone(this.representativePhone)) {
        isError = true
        this.representativePhoneError = ['Số điện thoại không đúng định dạng']
      } else if (this.representativePhone.length !== 10) {
        isError = true
        this.representativePhoneError = ['Độ dài của số điện thoại là 10 ký tự']
      }

      if (this.$isNullOrEmpty(this.address)) {
        isError = true
        this.addressError = ['Vui lòng nhập địa chỉ người đại diện']
      } else if ((this.address || '').trim().length === 0) {
        isError = true
        this.addressError = ['Vui lòng nhập địa chỉ người đại diện']
      } else if ((this.address || '').length > 200) {
        isError = true
        this.addressError = [
          'Độ dài của địa chỉ người đại diện chỉ 1 hoặc 200 ký tự',
        ]
      }
      if (this.$isNullOrEmpty(this.posittion)) {
        isError = true
        this.posittionError = ['Vui lòng nhập chức vụ']
      } else if ((this.posittion || '').trim().length === 0) {
        isError = true
        this.posittionError = ['Vui lòng nhập chức vụ']
      }
      if (!isError) {
        this.$emit('success')
      }
    },
    reset() {
      this.fullName = null
      this.fullNameError = []
      this.posittion = null
      this.posittionError = []
      this.phoneNumber = null
      this.phoneNumberError = []
      this.email = null
      this.emailError = []
      this.address = null
      this.addressError = []
      this.representativePhone = null
      this.representativePhoneError = []
    },
  },
}
</script>
