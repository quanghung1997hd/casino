<template>
  <!--
  Cách dùng:
  - prop label là label của 2 input. Kiểu dữ liệu mảng: ['label 1', 'label 2']
  - prop date là giá trị của 2 input. Kiểu dữ liệu mảng: ['2020-01-30', '2020-02-20'] (Năm-Tháng-Ngày)
  -->
  <v-row>
    <v-col class="pr-0 d-flex">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-x
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date1"
            :label="label[0]"
            hide-details
            dense
            v-on="on"
            class="mr-2"
            outlined
          />
        </template>
        <v-date-picker
          locale="vi"
          v-model="date[0]"
          @input="onChange($event)"
        />
      </v-menu>
    </v-col>
    <v-col class="pr-0 d-flex">
      <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-x
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date2"
            :label="label[1]"
            hide-details
            dense
            v-on="on"
            outlined
            @change="changeDateInput"
            class="mr-3"
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
  computed: {
    date1: {
      get() {
        return moment(this.date[0]).format('DD/MM/YYYY')
      },
      set(value) {
        if (value.length == 10) {
          this.$emit('setDate', [
            moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            moment(this.date[1], 'YYYY-MM-DD').format('DD/MM/YYYY'),
          ])
        }
      },
    },
    date2: {
      get() {
        return moment(this.date[1]).format('DD/MM/YYYY')
      },
      set(value) {
        if (value.length == 10) {
          this.$emit('setDate', [
            moment(this.date[0], 'YYYY-MM-DD').format('DD/MM/YYYY'),
            moment(value, 'DD/MM/YYYY').format('DD/MM/YYYY'),
          ])
        }
      },
    },
  },
  methods: {
    changeDateInput() {},
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
      this.$store.commit('dataConfig/setDate', this.date)
    },
  },
}
</script>
