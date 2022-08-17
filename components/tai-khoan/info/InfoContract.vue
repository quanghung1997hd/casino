<template>
  <v-row class="ma-0" no-gutters style="color: black">
    <v-col cols="12">
      <div
        style="color: black"
        class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
      >
        Thông tin hợp đồng
      </div>
    </v-col>
    <v-col cols="6" class="pt-4 px-3">
      <span class="fw-500">
        Loại hợp đồng (<span class="red--text">*</span>)</span
      >
      <v-select
        v-model="type"
        :error-messages="typeError"
        @input="typeError = []"
        class="pt-1"
        :items="listType"
        outlined
        dense
      ></v-select>
    </v-col>
    <v-col cols="6" class="pt-4 px-3">
      <span class="fw-500"> Số (<span class="red--text">*</span>)</span>
      <v-text-field
        v-model="number"
        :error-messages="numberError"
        @input="numberError = []"
        class="pt-1"
        outlined
        dense
        @keydown.space="preventLeadingSpace"
        v-on:keypress="isAlphaNumber($event)"
      ></v-text-field>
    </v-col>
    <v-col cols="6" class="pt-4 px-3">
      <span class="fw-500">
        Ngày bắt đầu hợp đồng (<span class="red--text">*</span>)</span
      >
      <v-menu
        role="time2"
        v-model="menu1"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="moment(startTime).format('DD/MM/YYYY')"
            v-on="on"
            hide-details
            dense
            outlined
            append-icon="mdi-calendar-range"
            readonly
          />
        </template>
        <v-date-picker
          width="600"
          locale="vi"
          v-model="startTime"
          @input="onChange"
        />
      </v-menu>
    </v-col>
    <v-col cols="6" class="pt-4 px-3">
      <span class="fw-500">
        Ngày kết thúc hợp đồng (<span class="red--text">*</span>)</span
      >
      <v-menu
        role="time2"
        v-model="menu2"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="moment(endTime).format('DD/MM/YYYY')"
            v-on="on"
            hide-details
            dense
            outlined
            append-icon="mdi-calendar-range"
            readonly
          />
        </template>
        <v-date-picker
          width="600"
          locale="vi"
          v-model="endTime"
          @input="onChange"
        />
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
import moment from 'moment'
import Constants from '~/assets/configurations/constant'
export default {
  data() {
    return {
      menu: false,
      menu1: false,
      menu2: false,
      date: moment().format('YYYY-MM-DD'),
      startTime: moment().startOf('month').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      type: 1,
      typeError: [],
      number: null,
      numberError: [],
      listType: Constants.System.Profile.listType,
    }
  },
  methods: {
    isAlphaNumber(e) {
      let char = String.fromCharCode(e.keyCode)
      if (
        /^[0-9A-Za-z\àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ]+$/.test(
          char
        )
      )
        return true
      else e.preventDefault()
    },
    checkInsert() {
      let isError = false
      if (this.$isNullOrEmpty(this.number)) {
        isError = true
        this.numberError = ['Vui lòng nhập số hợp đồng']
      } else if (this.number.length > 30) {
        isError = true
        this.numberError = ['Độ dài của số hợp đồng chỉ 1 hoặc 30 ký tự']
      } else if (this.$isHasSpeciall(this.number)) {
        isError = true
        this.numberError = ['Số hợp đồng không đúng định dạng']
      }
      if (isError) return isError
      this.$emit('success')
    },
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    reset() {
      this.date = moment().format('YYYY-MM-DD')
      this.startTime = moment().startOf('month').format('YYYY-MM-DD')
      this.endTime = moment().format('YYYY-MM-DD')
      this.menu = false
      this.type = 1
      this.typeError = []
      this.number = null
      this.numberError = []
    },
    onChange() {
      this.menu = false
      this.menu1 = false
      this.menu2 = false
    },
  },
}
</script>
<style>
.v-input.v-input--hide-details.v-input--is-label-active.v-input--is-dirty.v-input--is-readonly.v-input--dense.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined {
  margin-top: 4px;
}
</style>
