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
      @click:outside="toggle"
      max-width="500"
    >
      <v-card>
        <v-card-title :class="`${btnOkColor} white--text`">
          {{ title }}
          <div class="flex-grow-1"></div>
          <v-icon dark class="cp" @click="toggle">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pt-6 text-center black--text fs-15">
          <v-row class="ma-0">
            <v-col cols="12">
              <v-textarea
                outlined
                dense
                v-model="content"
                rows="3"
                @input="contentError = []"
                :error-messages="contentError"
              >
                <template v-slot:label
                  >Nội dung từ chối phê duyệt
                  <span class="required">*</span></template
                >
              </v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="secondary" class="text-none" depressed @click="toggle"
            >Hủy</v-btn
          >
          <v-btn :color="btnOkColor" class="text-none" depressed @click="OK"
            >Xác nhận</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.required {
  color: red;
}
</style>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Xác nhận',
    },
    alertMsg: {
      type: String,
      default: String,
    },
    btnOkColor: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      content: null,
      contentError: [],
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    OK() {
      if (this.$isNullOrEmpty(this.content)) {
        this.contentError = ['Vui lòng nhập nội dung']
        return
      }
      this.$emit('setContent', this.content)
      this.$emit('toggle')
      this.$emit('OK')
    },
  },
}
</script>
