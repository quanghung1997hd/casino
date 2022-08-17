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
      <v-card>
        <v-card-title>
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
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>

        <v-card-actions style="justify-content: center" class="py-5">
          <div>
            <v-btn
              @click="OK"
              color="primary"
              class="text-none mr-5"
              depressed
              width="130"
              >Đồng ý</v-btn
            >
            <v-btn
              color="secondary"
              width="130"
              class="text-none"
              depressed
              @click="toggle"
              >Hủy</v-btn
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
    return {}
  },
  watch: {
    open(value) {
      if (value) {
      }
    },
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    OK() {
      this.$emit('toggle')
      this.$emit('OK')
    },
  },
}
</script>
