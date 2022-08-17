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
        >Thêm mới loại tin nhắn
      </v-card-title>
      <v-container class="pt-8 pb-3" fluid>
        <v-row>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="smsType"
              label="Tên loại tin nhắn *"
              outlined
              dense
              light
              @input="smsTypeErrors = []"
              :error-messages="smsTypeErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="smsCode"
              label="Mã loại tin nhắn *"
              outlined
              dense
              light
              @input="smsCodeErrors = []"
              :error-messages="smsCodeErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="prefix"
              label="Tiền tố *"
              outlined
              dense
              light
              @input="prefixErrors = []"
              :error-messages="prefixErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="suffixes"
              label="Hậu tố *"
              outlined
              dense
              light
              @input="suffixesErrors = []"
              :error-messages="suffixesErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>

          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-select
              v-model="status"
              :items="listStatus"
              label="Trạng thái *"
              dense
              class="fs-14"
              light
              outlined
            />
          </v-col>
          <v-col cols="12" class="py-0 px-3">
            <span class="fw-500"> Mô tả </span>
            <v-textarea
              rows="3"
              v-model="description"
              outlined
              dense
              @input="descriptionErrors = []"
              :error-messages="descriptionErrors"
              @keydown.space="preventLeadingSpace"
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
  props: ['open'],
  components: {
    loading,
  },
  data: () => ({
    smsType: null,
    smsCode: null,
    prefix: null,
    openLoading: false,
    suffixes: null,
    description: null,
    smsTypeErrors: [],
    smsCodeErrors: [],
    prefixErrors: [],
    suffixesErrors: [],
    descriptionErrors: [],
    status: 1,
    listStatus: Constants.System.TypeSms.listStatusAdd,
    isPageSize: 20000,
  }),

  methods: {
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },
    reset() {
      this.smsType = null
      this.smsCode = null
      this.prefix = null
      this.suffixes = null
      this.description = null
      this.status = 1
      this.smsTypeErrors = []
      this.smsCodeErrors = []
      this.prefixErrors = []
      this.suffixesErrors = []
      this.descriptionErrors = []
    },

    checkValidate() {
      let hasErrors = false

      // validate smstype
      if (this.$isNullOrEmpty(this.smsType)) {
        hasErrors = true
        this.smsTypeErrors = ['Vui lòng nhập tên loại tin nhắn']
      } else if (this.smsType.trim() == '') {
        hasErrors = true
        this.smsTypeErrors = ['Vui lòng nhập tên loại tin nhắn']
      } else if (this.smsType.length > 200) {
        hasErrors = true
        this.smsTypeErrors = [
          'Độ dài tối đa của Tên loại tin nhắn là 200 ký tự',
        ]
      }

      // validate smsCode
      if (this.$isNullOrEmpty(this.smsCode)) {
        hasErrors = true
        this.smsCodeErrors = ['Không được để trống']
      } else if (this.smsCode.trim() == '') {
        hasErrors = true
        this.smsCodeErrors = ['Không được để trống']
      } else if (this.smsCode.length > 20) {
        hasErrors = true
        this.smsCodeErrors = ['Không được vượt quá 20 ký tự']
      }

      if (this.$isNullOrEmpty(this.prefix)) {
        hasErrors = true
        this.prefixErrors = ['Không được để trống tiền tố']
      } else if (this.prefix.trim() == '') {
        hasErrors = true
        this.prefixErrors = ['Không được để trống tiền tố']
      } else if (this.prefix.length > 50) {
        hasErrors = true
        this.prefixErrors = ['Không được được vượt quá 50 ký tự']
      }

      if (this.$isNullOrEmpty(this.suffixes)) {
        hasErrors = true
        this.suffixesErrors = ['Không được để trống hậu tố']
      } else if (this.suffixes.trim() == '') {
        hasErrors = true
        this.suffixesErrors = ['Không được để trống hậu tố']
      } else if (this.suffixes.length > 50) {
        hasErrors = true
        this.suffixesErrors = ['Không được được vượt quá 50 ký tự']
      }
      if (!this.$isNullOrEmpty(this.description)) {
        if (this.description.length > 500) {
          hasErrors = true
          this.descriptionErrors = ['Độ dài tối đa của Mô tả là 500 ký tự']
        }
      }

      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      this.openLoading = true
      setTimeout(() => {
        this.$store
          .dispatch('messgerType/AddMessType', {
            name: this.smsType,
            code: this.smsCode,
            prefix: this.prefix,
            suffixes: this.suffixes,
            description: this.description,
            status: this.status,
          })
          .then((response) => {
            this.openLoading = false
            if (!response.error) {
              if (response.data.data.resultCode == 0) {
                this.$showWarnNotify(this, response.data.data.message)
              } else {
                this.$showSuccess(this, response.data.data.message)
                this.toggle()
                this.$emit('success')
              }
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
