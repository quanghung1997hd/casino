<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="800px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Thêm mới loại nhà mạng
      </v-card-title>
      <v-container class="pt-8 pb-3" fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="NetWorkName"
              label="Tên nhà mạng *"
              outlined
              dense
              light
              @input="NetWorkNameErrors = []"
              :error-messages="NetWorkNameErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="NetWorkCode"
              label="Mã viết tắt *"
              outlined
              dense
              light
              @input="NetWorkCodeErrors = []"
              :error-messages="NetWorkCodeErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="fullName"
              label="Tên đầy đủ"
              outlined
              dense
              light
              @input="fullNameErrors = []"
              :error-messages="fullNameErrors"
              @keydown.space="preventLeadingSpace"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-select
              v-model="status"
              :items="listStatus"
              label="Trạng thái "
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
    NetWorkName: null,
    NetWorkCode: null,
    fullName: null,
    openLoading: false,
    description: null,
    NetWorkNameErrors: [],
    NetWorkCodeErrors: [],
    fullNameErrors: [],
    descriptionErrors: [],
    status: 1,
    listStatus: Constants.System.Networks.listStatusAdd,
    isPageSize: 20000,
  }),

  methods: {
    toggle() {
      this.$emit('toggle')
      this.reset()
    },
    reset() {
      this.NetWorkName = null
      this.NetWorkCode = null
      this.fullName = null
      this.description = null
      this.status = 1
      this.NetWorkNameErrors = []
      this.NetWorkCodeErrors = []
      this.fullNameErrors = []
      this.descriptionErrors = []
    },

    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },

    checkValidate() {
      let hasErrors = false

      // validate smstype
      if (this.$isNullOrEmpty(this.NetWorkName)) {
        hasErrors = true
        this.NetWorkNameErrors = ['Không được để trống']
      } else if (this.NetWorkName.trim() == '') {
        hasErrors = true
        this.NetWorkNameErrors = ['Không được để trống']
      } else if (this.$isHasSpecial(this.NetWorkName)) {
        hasErrors = true
        this.NetWorkNameErrors = ['Vui lòng nhập đúng định dạng']
      } else if (this.NetWorkName.length > 50) {
        hasErrors = true
        this.NetWorkNameErrors = ['Không được vượt quá 50 ký tự']
      }

      // validate smsCode
      if (this.$isNullOrEmpty(this.NetWorkCode)) {
        hasErrors = true
        this.NetWorkCodeErrors = ['Không được để trống']
      } else if (this.NetWorkCode.trim() == '') {
        hasErrors = true
        this.NetWorkCodeErrors = ['Không được để trống']
      } else if (this.NetWorkCode.length > 50) {
        hasErrors = true
        this.NetWorkCodeErrors = ['Không được vượt quá 50 ký tự']
      }
      if (!this.$isNullOrEmpty(this.fullName)) {
        if (this.fullName.length > 200) {
          hasErrors = true
          this.fullNameErrors = ['Không được vượt quá 200 ký tự']
        } else if (this.$isHasSpecial1(this.fullName)) {
          hasErrors = true
          this.fullNameErrors = ['Vui lòng nhập đúng định dạng']
        }
      }

      if (!this.$isNullOrEmpty(this.description)) {
        if (this.description.length > 500) {
          hasErrors = true
          this.descriptionErrors = ['Không được vượt quá 500 ký tự']
        } else if (this.$isHasSpecial1(this.description)) {
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
          .dispatch('network/AddNetWork', {
            name: this.NetWorkName,
            abbreviationCode: this.NetWorkCode,
            fullName: this.fullName,
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
