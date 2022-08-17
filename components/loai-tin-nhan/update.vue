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
        >Cập nhật loại tin nhắn
      </v-card-title>
      <v-container class="pt-5 pb-3" fluid>
        <v-row class="pt-4">
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="smsType"
              outlined
              label="Tên loại tin nhắn *"
              dense
              light
              clearable
              @input="smsTypeErrors = []"
              :error-messages="smsTypeErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="smsCode"
              outlined
              label="Mã loại tin nhắn *"
              dense
              light
              clearable
              @input="smsCodeErrors = []"
              :error-messages="smsCodeErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="prefix"
              outlined
              label="Hậu tố *"
              dense
              light
              clearable
              @input="suffixesErrors = []"
              :error-messages="suffixesErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="py-0">
            <v-text-field
              v-model="suffixes"
              outlined
              label="Tiền tố *"
              dense
              light
              clearable
              @input="prefixErrors = []"
              :error-messages="prefixErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>

          <v-col cols="12" sm="6" md="4" class="py-0">
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
import Constants from '~/assets/configurations/constant';

export default {
  props: ['open', 'data'],
  components: {
    loading,
  },
  data: () => ({
    smsType: null,
    prefix: null,
    suffixes: null,
    description: null,
    smsTypeErrors: [],
    smsCode: null,
    smsCodeErrors: [],
    prefixErrors: [],
    suffixesErrors: [],
    descriptionErrors: [],
    status: 1,
    openLoading: false,
    listStatus: Constants.System.TypeSms.listStatusAdd,
  }),
  watch: {
    open(value) {
      if (value) {
        this.reset()
        this.smsType = this.data.name
        this.smsCode = this.data.code
        this.prefix = this.data.prefix
        this.suffixes = this.data.suffixes
        this.status = this.data.status
        this.description = this.data.description
        this.getListMessType
      }
    },
  },
  methods: {
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    reset() {
      this.smsTypeErrors = []
      this.smsCodeErrors = []
      this.prefixErrors = []
      this.descriptionErrors = []
      this.suffixesErrors = []
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    checkValidate() {
      let hasErrors = false
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
      if (this.$isNullOrEmpty(this.smsCode)) {
        hasErrors = true
        this.smsCodeErrors = ['vui lòng nhập mã loại tin nhắn']
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
          this.descriptionErrors = ['Vui lòng nhập đúng định dạng']
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
          .dispatch('messgerType/EditMessType', {
            id: this.data.id,
            name: this.smsType,
            code: this.smsCode,
            prefix: this.prefix,
            suffixes: this.suffixes,
            status: this.status,
            description: this.description,
          })
          .then((response) => {
            this.openLoading = false
            if (!response.error) {
              this.$showSuccess(this, 'Cập nhật loại tin nhắn thành công')
              this.toggle()
              this.$emit('success')
            }
          })
          .catch((errors) => {
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
