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
        >Cập nhật loại nhà mạng
      </v-card-title>
      <v-container class="pt-5 pb-3" fluid>
        <v-row class="pt-4">
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="NetworkName"
              outlined
              label="Tên loại tin nhắn"
              dense
              light
              clearable
              @input="NetworkNameErrors = []"
              :error-messages="NetworkNameErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="NetworkCode"
              outlined
              label="Mã loại tin nhắn"
              dense
              light
              clearable
              @input="NetworkCodeErrors = []"
              :error-messages="NetworkCodeErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="full_name"
              outlined
              label="Tên đầy đủ"
              dense
              light
              clearable
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
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
  props: ['open', 'data'],
  components: {
    loading,
  },
  data: () => ({
    NetworkName: null,
    NetworkCode: null,
    full_name: null,
    description: null,
    openLoading: false,
    NetworkNameErrors: [],
    NetworkCodeErrors: [],
    status: 1,
    listStatus: Constants.System.Networks.listStatusAdd,
  }),
  watch: {
    open(value) {
      if (value) {
        this.NetworkName = this.data.name
        this.NetworkCode = this.data.abbreviationCode
        this.full_name = this.data.fullName
        this.status = this.data.status
        this.description = this.data.description
        this.getListNetWork
      }
    },
  },
  methods: {
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    toggle() {
      this.$emit('toggle')
    },

    checkValidate() {
      let hasErrors = false
      if (this.$isNullOrEmpty(this.NetworkName)) {
        hasErrors = true
        this.NetworkNameErrors = ['Vui lòng nhập tên loại tin nhắn']
      }
      if (this.$isNullOrEmpty(this.NetworkName)) {
        hasErrors = true
        this.NetworkNameErrors = ['vui lòng nhập mã loại tin nhắn']
      }

      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      this.openLoading = true
      setTimeout(() => {
        this.$store
          .dispatch('network/EditNetWork', {
            id: this.data.id,
            name: this.NetworkName,
            abbreviationCode: this.NetworkCode,
            fullName: this.full_name,
            status: this.status,
            description: this.description,
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
