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
        Tạo tài khoản khách hàng
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
            >
              <template v-slot:label>
                <div class="black--text fs-16">{{ item.name }}</div>
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="12" style="text-align-last: center">
            <div
              v-if="errormsg"
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
        <InfoCustomer ref="InfoCustomers"></InfoCustomer>
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
              v-on:keypress="isLetter($event)"
              @keydown.space="preventLeadingSpace"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pt-4 px-3">
            <span class="fw-500"> Chức vụ <span class="red--text"></span></span>
            <v-text-field
              v-model="posittion"
              :error-messages="posittionError"
              @input="posittionError = []"
              class="pt-1"
              :maxlength="100"
              outlined
              dense
              v-on:keypress="isLetter($event)"
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
              v-on:keypress="isAlphaNumber($event)"
              @keydown.space="preventLeadingSpace"
            ></v-text-field>
          </v-col>
        </v-row>

        <InfoContract ref="InfoContract"></InfoContract>
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
              v-model="userNote"
              :error-messages="userNoteError"
              @input="userNoteError = []"
              class="pt-1"
              outlined
              dense
              @keydown.space="preventLeadingSpace"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="position: sticky; bottom: 0; background: #f6f9ff">
        <v-spacer></v-spacer>
        <v-btn class="text-none primary" depressed @click="temporarySave"
          >Lưu nháp</v-btn
        >
        <v-btn class="text-none primary" depressed @click="approvalSave"
          >Trình phê duyệt</v-btn
        >
        <v-btn class="text-none primary" depressed @click="reset"
          >Nhập lại</v-btn
        >
        <v-btn class="text-none secondary" depressed @click="toggle">Hủy</v-btn>
      </v-card-actions>
      <alerWarning
        btnOkColor="warning"
        title="Cảnh báo"
        :open="openWarning"
        :check="true"
        :alert-msg="messWarning"
        @toggle="openWarning = !openWarning"
        @OK="callAPIapproval"
      ></alerWarning>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import InfoCustomer from './info/InfoCustomer.vue'
import InfoSurrogate from './info/InfoSurrogate.vue'
import InfoContract from './info/InfoContract.vue'
import alerWarning from '~/components/tai-khoan/YesNoAlert.vue'
import Constants from '~/assets/configurations/constant'
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    InfoCustomer,
    InfoSurrogate,
    InfoContract,
    alerWarning,
  },
  data() {
    return {
      openWarning: false,
      messWarning: null,
      userNote: null,
      userNoteError: [],
      errormsg: false,
      showPass: false,
      InfoCustomerSuccess: false,
      InfoSurrogateSuccess: true,
      InfoContractSuccess: false,
      userName: null,
      note: null,
      userNameError: [],
      password: null,
      valueCheckbox: null,
      passwordError: [],
      date: moment().format('YYYY-MM-DD'),
      menu: false,
      listsMaketting: Constants.System.Profile.listsMaketting,

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
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode)
      if (
        /^[A-Za-z\àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ]+$/.test(
          char
        )
      )
        return true
      else e.preventDefault()
    },
    isAlphaNumber(e) {
      let char = String.fromCharCode(e.keyCode)
      if (
        /^[/\-0-9A-Za-z\àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ]+$/.test(
          char
        )
      )
        return true
      else e.preventDefault()
    },

    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
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
    checkBox(item) {
      this.errormsg = false
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
    // Lưu tạm
    temporarySave() {
      let isError = false
      if (!isError) {
        this.callApiAddTmp()
      }
    },
    callApiAddTmp() {
      const data = {
        customerCode: this.$refs.InfoCustomers.code,
        customerName: this.$refs.InfoCustomers.fullname,
        taxCode: this.$refs.InfoCustomers.taxCode,
        businessNumber: this.$refs.InfoCustomers.numberRegister,
        customerPhone: this.$refs.InfoCustomers.phoneNumber,
        adType: this.valueCheckbox,
        city: this.$refs.InfoCustomers.province,
        district: this.$refs.InfoCustomers.district,
        ward: this.$refs.InfoCustomers.Ward,
        representativeName: this.fullName,
        position: this.posittion,
        representativePhone: this.representativePhone,
        address: this.address,
        email: this.email,
        //loại hợp đồng
        contractType: this.$refs.InfoContract.type,
        contractDate: moment(this.$refs.InfoContract.date, 'YYYY-MM-DD').format(
          'DD/MM/YYYY 00:00:00'
        ),
        startTime: moment(
          this.$refs.InfoContract.startTime,
          'YYYY-MM-DD'
        ).format('DD/MM/YYYY 00:00:00'),
        endTime: moment(this.$refs.InfoContract.endTime, 'YYYY-MM-DD').format(
          'DD/MM/YYYY 00:00:00'
        ),
        note: this.note,
        userName: this.userName,
        password: this.password,
        businessField: this.$refs.InfoCustomers.field,
        contractNumber: this.$refs.InfoContract.number,
        status: 0,
        image: null,
      }

      this.$store
        .dispatch('customer/add', data)
        .then((response) => {
          if (response.data.data.resultCode == 1) {
            this.$showSuccess(this, response.data.data.message)
            this.toggle()
            this.$emit('success')
          } else {
            this.$showWarnNotify(this, response.data.data.message)
          }
        })
        .catch((errors) => {})
    },

    // end lưu tạm

    // lưu trình phê duyệt
    approvalSave() {
      let isError = false

      if (this.$refs.InfoCustomers.checkInsert()) isError = true
      if (this.$refs.InfoContract.checkInsert()) isError = true

      if (this.$isNullOrEmpty(this.userName)) {
        isError = true
        this.userNameError = ['Vui lòng nhập tên đăng nhập']
      } else if ((this.userName || '').trim().length === 0) {
        isError = true
        this.userNameError = ['Vui lòng nhập tên đăng nhập']
      } else if (this.$isHasSpecial(this.userName)) {
        isError = true
        this.userNameError = ['Tên đăng nhập sai định dạng']
      } else if (this.userName.length < 5 || this.userName.length > 30) {
        isError = true
        this.userNameError = ['Độ dài tài khoản chỉ từ 5 đến 30 kí tự']
      }

      if (this.$isNullOrEmpty(this.password)) {
        isError = true
        this.passwordError = ['Vui lòng nhập mật khẩu']
      }

      if (this.$isNullOrEmpty(this.valueCheckbox)) {
        isError = true
        this.errormsg = true
      }

      if (this.userNote != null && this.userNote.length > 200) {
        isError = true
        this.userNoteError = ['Độ dài ghi chú chỉ từ 0 đến 200 kí tự']
      }

      if (this.$isNullOrEmpty(this.fullName)) {
        isError = true
        this.fullNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.fullName || '').trim().length === 0) {
        isError = true
        this.fullNameError = ['Vui lòng nhập tên người đại diện']
      } else if ((this.fullName || '').length > 100) {
        isError = true
        this.fullNameError = [
          'Độ dài của tên người đại diện chỉ 1 hoặc 100 ký tự',
        ]
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

      if (!isError) {
        this.callAPIcheck()
      }
    },
    callAPIapproval() {
      const data = {
        customerCode: this.$refs.InfoCustomers.code,
        customerName: this.$refs.InfoCustomers.fullname,
        taxCode: this.$refs.InfoCustomers.taxCode,
        businessNumber: this.$refs.InfoCustomers.numberRegister,
        customerPhone: this.$refs.InfoCustomers.phoneNumber,
        adType: this.valueCheckbox,
        city: this.$refs.InfoCustomers.province,
        district: this.$refs.InfoCustomers.district,
        ward: this.$refs.InfoCustomers.Ward,
        representativeName: this.fullName,
        position: this.posittion,
        representativePhone: this.representativePhone,
        address: this.address,
        email: this.email,
        //loại hợp đồng
        contractType: this.$refs.InfoContract.type,
        contractDate: moment(this.$refs.InfoContract.date, 'YYYY-MM-DD').format(
          'DD/MM/YYYY 00:00:00'
        ),
        startTime: moment(
          this.$refs.InfoContract.startTime,
          'YYYY-MM-DD'
        ).format('DD/MM/YYYY 00:00:00'),
        endTime: moment(this.$refs.InfoContract.endTime, 'YYYY-MM-DD').format(
          'DD/MM/YYYY 00:00:00'
        ),
        note: this.note,
        userName: this.userName,
        password: this.password,
        businessField: this.$refs.InfoCustomers.field,
        contractNumber: this.$refs.InfoContract.number,
        status: 1,
        image: null,
      }

      this.$store
        .dispatch('customer/add', data)
        .then((response) => {
          if (!response.error) {
            if (response.data.data.resultCode == 0) {
              this.$showError(this, response.data.data.message)
            } else if (response.data.data.resultCode == 1) {
              this.$showSuccess(this, response.data.data.message)
              this.toggle()
              this.$emit('success')
            } else {
              this.$showSuccess(this, 'Gửi duyệt thành công')
              this.$showWarnNotify(this, response.data.data.message)
              this.toggle()
              this.$emit('success')
            }
          }
        })
        .catch((errors) => {})
    },
    callAPIcheck() {
      const data = {
        taxCode: this.$refs.InfoCustomers.taxCode,
        businessNumber: this.$refs.InfoCustomers.numberRegister,
        status: 1,
      }

      this.$store.dispatch('customer/checkAddUpdate', data).then((response) => {
        if (!response.error) {
          if (response.data.data.resultCode === 1) {
            this.callAPIapproval()
          } else if (response.data.data.resultCode === 2) {
            this.messWarning =
              response.data.data.message + '. Bạn có muốn tiếp tục?'
            this.openWarning = true
          }
        }
      })
    },
    reset() {
      for (let index = 0; index < this.listsMaketting.length; index++) {
        this.listsMaketting[index].isSelect = 0
      }
      this.userName = null
      this.userNameError = []
      this.password = null
      this.passwordError = []
      this.note = null
      this.errormsg = false
      this.$refs.InfoCustomers.reset()
      this.$refs.InfoContract.reset()

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
      this.valueCheckbox = null
      this.userNoteError = []
      this.userNote = null
    },

    toggle() {
      this.$emit('toggle')
    },
  },
  watch: {
    open(value) {
      if (value) {
        setTimeout(() => {
          this.reset()
        }, 300)
      }
    },
  },
}
</script>
