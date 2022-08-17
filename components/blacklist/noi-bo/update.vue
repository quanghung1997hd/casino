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
        >Cập nhật blacklist
      </v-card-title>
      <v-container class="pt-5 pb-3" fluid>
        <v-row class="pt-4">
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="phoneNumber"
              label="Số điện thoại"
              outlined
              dense
              light
              @input="PhoneblacklistErrors = []"
              :error-messages="PhoneblacklistErrors"
              type="number"
              @keypress="isNumberPhone($event)"
              onKeyPress="if(this.value[0]==0){if(this.value.length==10) return false;} else if(this.value[0]==8 && this.value[1]==4){if(this.value.length==11) return false;}"
            />
          </v-col>

          <v-col cols="6" sm="6" md="6" class="py-0">
            <v-select
              v-model="status"
              :items="listStatus"
              class="fs-14"
              outlined
              label="Trạng thái"
              dense
              light
            />
          </v-col>
          <v-col cols="12" class="py-0 px-3">
            <span class="fw-500"> Lý do </span>
            <v-textarea
              rows="3"
              v-model="reason"
              outlined
              dense
              @keydown.space="preventLeadingSpace"
              v-on:keypress="isLetter($event)"
            ></v-textarea>
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
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'
export default {
  props: ['open', 'data'],
  components: {
    loading,
  },
  data: () => ({
    phoneNumber: null,
    reason: null,
    status: 1,
    openLoading: false,
    PhoneblacklistErrors: [],
    listStatus: Constants.System.Blacklist.listStatusAdd,
  }),
  watch: {
    open(value) {
      if (value) {
        this.phoneNumber = this.data.phoneNumber
        this.status = this.data.status
        this.reason = this.data.reason
        this.getListBlacklist
      }
    },
  },
  methods: {
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
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
    regexPhoneNumber(str) {
      const regexPhoneNumber =
        /((096|086|097|098|032|033|034|035|036|037|038|039|091|094|084|085|081|088|083|082|090|093|070|076|078|089|079|077|092|056|058|099|059|8496|8486|8497|8498|8432|8433|8434|8435|8436|8437|8438|8439|8491|8494|8484|8485|8481|8488|8483|8482|8490|8493|8470|8476|8478|8489|8479|8477|8492|8456|8458|8499|8459)+([0-9]{7})\b)/g

      if (str.match(regexPhoneNumber)) {
        return true
      } else {
        return false
      }
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
    toggle() {
      this.$emit('toggle')
    },

    checkValidate() {
      let hasErrors = false
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

      if (this.$isNullOrEmpty(this.phoneNumber)) {
        hasErrors = true
        this.PhoneblacklistErrors = ['Vui lòng nhập số điện thoại']
      } else if (isNaN(this.phoneNumber)) {
        hasErrors = true
        this.PhoneblacklistErrors = ['Vui lòng nhập đúng định dạng là số']
      } else if (!this.regexPhoneNumber(this.phoneNumber)) {
        hasErrors = true
        this.PhoneblacklistErrors = ['Số điện thoại không hợp lệ']
      }
      // if(this.reason != null){
      //   if (this.reason.trim() == '') {
      //     hasErrors = true
      //     this.reasonErrors = ['Vui lòng nhập đúng định dạng']
      //   }
      //   else if(this.reason.length >200){
      //     hasErrors = true
      //     this.reasonErrors = ['Độ dài tối đa của Lý do là 200 ký tự']
      //   }

      // }

      if (!hasErrors) {
        this.add()
        this.openLoading = true
      }
    },

    add() {
      setTimeout(() => {
        this.$store
          .dispatch('blacklist/EditBlacklist', {
            id: this.data.id,
            phoneNumber: this.phoneNumber,
            status: this.status,
            reason: this.reason,
          })
          .then((response) => {
            this.openLoading = false

            if (response.data.error.code === 0) {
              if (response.data.data.resultCode === 1) {
                this.$showSuccess(this, 'Cập nhật Blacklist thành công')
                this.toggle()
                this.$emit('success')
              } else if (response.data.data.resultCode === 0) {
                this.$showWarnNotify(
                  this,
                  'Số điện thoại đã tồn tại trong Blacklist'
                )
              }
            }
          })
          .catch(() => {
            this.openLoading = false
          })
      }, 300)
    },
  },
}
</script>
