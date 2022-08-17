<template>
  <!--
  Cách dùng:
  - prop 'open' là giá trị đóng mở dialog (Boolean)
  - prop 'alertMsg' dùng để hiển thị câu hỏi của dialog (Number/String)
  - Event 'toggle' dùng để đóng hoặc mở dialog
  - Khi bấm OK sẽ emit event 'OK' và event 'toggle'
  - Khi bấm 'Hủy' sẽ emit event toggle
  -->
  <div>
    <v-dialog
      :value="open"
      @keydown="$event.key === 'Escape' && toggle()"
      max-width="600"
      persistent
      scrollable
    >
      <v-card v-if="check">
        <v-card-title :class="`${btnOkColor} white--text`">
          <div class="text-center" style="width: 100%">{{ title }}</div>
          <!-- <div class="flex-grow-1"></div> -->
          <v-btn
            @click="toggle"
            color="secondary"
            icon
            class="position-absolute-top-right"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-6 text-center black--text fs-15">{{
          alertMsg
        }}</v-card-text>

        <v-card-actions style="justify-content: center" class="py-5">
          <div>
            <v-btn
              :color="btnOkColor"
              class="text-none mr-5"
              depressed
              @click="OK"
              width="130"
              >Xác nhận</v-btn
            >
            <v-btn
              color="secondary"
              width="130"
              class="text-none"
              depressed
              @click="toggle"
              >Hủy bỏ</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title :class="`${btnOkColor} white--text`">
          <div class="text-center" style="width: 100%">{{ title }}</div>
          <!-- <div class="flex-grow-1"></div> -->
          <v-btn
            @click="toggle"
            color="secondary"
            icon
            class="position-absolute-top-right"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-row class="pt-5 ma-0">
          <v-col cols="1" class="pa-0"></v-col>
          <v-col cols="3" class="px-0"
            >Lý do từ chối <span class="red--text">*</span></v-col
          >
          <v-col cols="7" class="px-0"
            ><v-textarea
              v-model="content"
              @input="contentErrors = []"
              :error-messages="contentErrors"
              outlined
              dense
            ></v-textarea
          ></v-col>
          <v-col cols="1" class="pa-0"></v-col>
        </v-row>

        <v-card-actions style="justify-content: center" class="py-5">
          <div>
            <v-btn
              :color="btnOkColor"
              class="text-none mr-5"
              depressed
              @click="validate"
              width="130"
              >Xác nhận</v-btn
            >
            <v-btn
              color="secondary"
              width="130"
              class="text-none"
              depressed
              @click="toggle"
              >Hủy bỏ</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: null,
      contentErrors: [],
      id: null,
    }
  },
  watch: {
    open(value) {
      if (value) {
        this.id = this.data.id
      }
    },
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: Object,
    },
    title: {
      type: String,
      default: 'Thông báo',
    },
    alertMsg: {
      type: String,
      default: String,
    },

    btnOkColor: {
      type: String,
      default: 'primary',
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle')
      this.reset()
    },
    OK() {
      this.$emit('toggle')
      this.$emit('OK')
    },
    reset() {
      this.content = null
      this.contentErrors = []
    },
    validate() {
      let hasErrors = false
      if (this.$isNullOrEmpty(this.content)) {
        hasErrors = true
        this.contentErrors = ['Vui lòng nhập lý do']
      } else if (this.content.length > 200) {
        hasErrors = true
        this.contentErrors = ['Vui lòng nhập lý do không vượt quá 200 ký tự']
      }
      if (!hasErrors) {
        this.$store
          .dispatch('brandname/approveItem', {
            id: this.id,
            status: -2,
            refusal: this.content,
          })
          .then((res) => {
            if (res.data.error.code === 0) {
              this.$showSuccess(this, 'Từ chối thành công')

              this.$emit('toggle')
              this.$emit('success')
              this.reset()
            }
          })
      }
    },
  },
}
</script>
