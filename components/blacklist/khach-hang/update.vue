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
          <v-col cols="6" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="phoneNumber"
              label="Số điện thoại"
              outlined
              dense
              light
              @input="PhoneblacklistErrors = []"
              :error-messages="PhoneblacklistErrors"
              @keypress="isNumberPhone($event)"
              onKeyPress="if(this.value[0]==0){if(this.value.length==10) return false;} else if(this.value[0]==8 && this.value[1]==4){if(this.value.length==11) return false;}"
              type="number"
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
            <v-textarea rows="3" v-model="reason" outlined dense></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary" @click="add">
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
    openLoading: false,
    PhoneblacklistErrors: [],
    status: 1,
    listStatus: Constants.System.Blacklist.listStatusAdd,
  }),
  watch: {
    open(value) {
      if (value) {
        this.status = this.data.status
        this.phoneNumber = this.data.phoneNumber
        this.reason = this.data.reason
      }
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle')
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

      if (!hasErrors) {
        this.add()
      }
    },

    add() {
      this.openLoading = true
      setTimeout(() => {
        this.$store
          .dispatch('blacklist/EditBlacklistCms', {
            id: this.data.id,
            status: this.status,
            phoneNumber: this.phoneNumber,
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
          .catch((errors) => {
            // Exceptions
            // this.app.wait.end('loadingGroupUser')
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
