<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="700px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Thêm mới danh mục lĩnh vực kinh doanh
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0 black--text">
          <v-col cols="12" class="pb-0">
            <div>Tên lĩnh vực kinh doanh <span class="red--text">*</span></div>
            <v-text-field
              outlined
              dense
              v-model="name"
              :error-messages="nameError"
              @input="nameError = []"
              @keydown.space="preventLeadingSpace"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pb-0">
            <div>Mã lĩnh vực kinh doanh <span class="red--text">*</span></div>
            <v-text-field
              outlined
              dense
              v-model="code"
              :error-messages="codeError"
              @input="codeError = []"
              @keydown.space="preventLeadingSpace"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="pb-0">
            <div>Trạng thái <span class="red--text">*</span></div>
            <v-autocomplete
              outlined
              dense
              :items="itemStatus"
              v-model="status"
              hide-details=""
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" class="py-0">
            <div>Mô tả</div>
            <v-textarea
              outlined
              dense
              rows="3"
              v-model="description"
              :error-messages="descriptionError"
              @input="descriptionError = []"
              @keydown.space="preventLeadingSpace"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="secondary text-none" depressed @click="toggle"
          >Đóng</v-btn
        >
        <v-btn class="primary text-none" depressed @click="checkInsert"
          >Lưu</v-btn
        >
      </v-card-actions>
      <loading :open="openLoading"></loading>
    </v-card>
  </v-dialog>
</template>
<script>
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    loading,
  },
  data() {
    return {
      name: null,
      nameError: [],
      code: null,
      openLoading: false,
      codeError: [],
      descriptionError: [],
      description: null,
      status: 1,

      itemStatus: Constants.System.TypeBusiness.itemStatusAdd,
    }
  },

  methods: {
    insert() {
      this.openLoading = true
      let data = {
        code: this.code,
        name: this.name,
        status: this.status,
        description: this.description,
      }
      setTimeout(() => {
        this.$store
          .dispatch('businessCategory/BusinessFiledAdd', data)
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
          .catch(() => {
            this.openLoading = false
          })
      }, 1000)
    },
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    checkInsert() {
      let isError = false
      if (this.$isNullOrEmpty(this.name)) {
        isError = true
        this.nameError = ['Vui lòng nhập tên danh mục kinh doanh']
      } else if (this.name.trim() == '') {
        isError = true
        this.nameError = ['Không được nhập khoảng trống ']
      } else if (this.name.length > 500) {
        isError = true
        this.nameError = ['Không được vượt quá 500 ký tự']
      }

      if (this.$isNullOrEmpty(this.code)) {
        isError = true
        this.codeError = ['Vui lòng nhập tên danh mục kinh doanh']
      } else if (this.code.trim() == '') {
        isError = true
        this.codeError = ['Không được nhập khoảng trống']
      } else if (this.code.length > 20) {
        isError = true
        this.codeError = ['Không được vượt quá 20 ký tự']
      }

      if (!this.$isNullOrEmpty(this.description)) {
        if (this.description.trim() == '') {
          isError = true
          this.descriptionError = ['Không được nhập khoảng trống']
        } else if (this.description.length > 500) {
          isError = true
          this.descriptionError = ['Không được vượt quá 500 ký tự']
        }
      }

      if (!isError) {
        this.insert()
      }
    },
    toggle() {
      this.$emit('toggle')
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.name = null
        this.nameError = []
        this.code = null
        this.codeError = []
        this.description = null
        this.status = 1
        this.descriptionError = []
      }
    },
  },
}
</script>
