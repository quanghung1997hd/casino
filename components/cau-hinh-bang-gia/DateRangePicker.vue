<template>
  <!--
  Cách dùng:
  - prop label là label của 2 input. Kiểu dữ liệu mảng: ['label 1', 'label 2']
  - prop date là giá trị của 2 input. Kiểu dữ liệu mảng: ['2020-01-30', '2020-02-20'] (Năm-Tháng-Ngày)
  -->
  <v-row>
    <v-col class="pr-0" style="margin-top: -4px">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="moment(date[0]).format('DD/MM/YYYY')"
            :label="label[0]"
            v-on="on"
            hide-details
            dense
            outlined
            readonly
          />
        </template>
        <v-date-picker
          locale="vi"
          v-model="date[0]"
          @input="onChange($event)"
        />
      </v-menu>
    </v-col>
    <v-col class="pr-0">
      <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="moment(date[1]).format('DD/MM/YYYY')"
            :label="label[1]"
            hide-details
            dense
            outlined
            v-on="on"
          />
        </template>

        <v-date-picker
          locale="vi"
          v-model="date[1]"
          @input="onChange($event)"
        />
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

Vue.prototype.moment = moment

export default {
  props: ['label', 'date', 'isDSKQ'],
  data: () => ({
    menu: false,
    menu1: false,
  }),
  created() {},
  methods: {
    change() {
      let change = ''
      change = this.date[1]
      this.date[1] = this.date[0]
      this.date[0] = change
    },
    datePicker() {
      const [year, month, day] = this.date[0].split('-')
      const [year1, month1, day1] = this.date[1].split('-')
      if (year > year1) {
        this.change()
      }
      if (year === year1) {
        if (month > month1) {
          this.change()
        } else if (month === month1) {
          if (day > day1) {
            this.change()
          }
        }
      }
    },
    onChange() {
      this.menu = false
      this.menu1 = false
      this.datePicker()
    },
  },
}
</script>
