<template>
  <div>
    <CardGlobal>
      <div class="py-10">
        <div class="fs-24 pb-5 font-weight-bold text-center">
          Cấu hình TPS tổng
        </div>
        <v-container class="pt-5 pb-3" fluid>
          <v-row class="pt-4">
            <v-col
              cols="12"
              sm="6"
              md="4"
              style="padding-left: 15%"
              class="py-0"
            >
              <div class="mt-2">
                Số TPS/s (<span class="red--text">*</span>):
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="py-0">
              <v-text-field
                v-model="numberTime"
                outlined
                type="number"
                dense
                light
                clearable
                @input="numberTimeErrors = []"
                :error-messages="numberTimeErrors"
                onKeyPress="if(this.value.length==10) return false;"
                @keypress="isNumber($event)"
                @keyup="checkPush"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="py-0"
              style="padding-left: 15%"
            >
              <div class="mt-2">Khung giờ push:</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1"></v-col>
            <v-col md="3" style="padding-left: 10%">
              <div>Khung giờ làm việc (<span class="red--text">*</span>):</div>
            </v-col>
            <v-col cols="8" class="pt-1">
              <div class="d-flex">
                <v-menu
                  role="time"
                  v-model="menu_time"
                  :close-on-content-click="false"
                  class="ccc"
                  @input="timeError = []"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label=" Từ giờ"
                      append-icon="mdi-clock-time-four-outline"
                      outlined
                      light
                      style="max-width: 180px"
                      dense
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="timeError"
                      @input="timeError = []"
                      v-on:keypress="isLetter($event)"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="time"
                    @input="menu_time = false"
                  ></v-time-picker>
                </v-menu>

                <span class="px-2 pt-2">-</span>
                <v-menu
                  role="time"
                  v-model="menu_time1"
                  :close-on-content-click="false"
                  @input="timeError1 = []"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time1"
                      label="Đến giờ"
                      append-icon="mdi-clock-time-four-outline"
                      outlined
                      light
                      style="max-width: 180px"
                      dense
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="timeError1"
                      @input="timeError1 = []"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="time1"
                    @input="menu_time1 = false"
                  ></v-time-picker>
                </v-menu>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="1"></v-col>
            <v-col md="3" style="padding-left: 10%">
              <div>Khung giờ nghỉ trưa (<span class="red--text">*</span>):</div>
            </v-col>
            <v-col cols="8" class="pt-1">
              <div class="d-flex">
                <v-menu
                  role="time1"
                  v-model="menu_time2"
                  :close-on-content-click="false"
                  @input="timeError2 = []"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="time1 === null"
                      v-model="time2"
                      label="Từ giờ"
                      append-icon="mdi-clock-time-four-outline"
                      outlined
                      light
                      style="max-width: 180px"
                      dense
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="timeError2"
                      @input="timeError2 = []"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="time2"
                    @input="menu_time2 = false"
                  ></v-time-picker>
                </v-menu>

                <span class="px-2 pt-2">-</span>
                <v-menu
                  role="time1"
                  v-model="menu_time3"
                  :close-on-content-click="false"
                  @input="timeError3 = []"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="time1 === null"
                      v-model="time3"
                      label="Đến giờ"
                      append-icon="mdi-clock-time-four-outline"
                      outlined
                      light
                      style="max-width: 180px"
                      dense
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="timeError3"
                      @input="timeError3 = []"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="time3"
                    @input="menu_time3 = false"
                  ></v-time-picker>
                </v-menu>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pt-0"></v-col>
            <v-col cols="8" class="pt-0 text-left">
              <v-btn
                :disabled="
                  !$isNullOrEmpty(numberTime) &&
                  !$isNullOrEmpty(time) &&
                  !$isNullOrEmpty(time1) &&
                  !$isNullOrEmpty(time2) &&
                  !$isNullOrEmpty(time3)
                    ? false
                    : true
                "
                depressed
                class="primary"
                @click="checkPush"
                height="40"
              >
                <div class="text-none">Tổng số thời gian push</div>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="pb-4">
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="py-0"
              style="padding-left: 15%"
            >
              <div class="mt-2">
                Tổng số TPS/tổng thời gian push (<span class="red--text">*</span
                >):
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="py-0">
              <v-text-field
                v-model="totalTime"
                outlined
                readonly
                dense
                light
                @input="totalTimeErrors = []"
                :error-messages="totalTimeErrors"
              />
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions style="justify-content: center">
          <div v-if="addBtn">
            <v-btn
              text
              width="100px"
              class="primary mr-5"
              @click="checkValidate"
              height="40"
            >
              <div class="text-none">Lưu</div>
            </v-btn>
            <v-btn
              text
              width="100px"
              class="secondary"
              height="40"
              @click="reset"
            >
              <div class="text-none">Nhập lại</div>
            </v-btn>
          </div>
        </v-card-actions>
        <loading :open="openLoading"></loading>
      </div>
    </CardGlobal>
  </div>
</template>

<script>
import moment from 'moment'

import Cookies from 'js-cookie'
import loading from '~/components/Loading.global'

export default {
  props: ['open'],
  components: {
    loading,
  },
  data: () => ({
    menu_time: false,
    timeError: [],
    time: null,
    openLoading: false,
    menu_time1: false,
    timeError1: [],
    time1: null,
    menu_time2: false,
    timeError2: [],
    time2: null,
    menu_time3: false,
    timeError3: [],
    time3: null,
    numberTime: null,
    numberTimeErrors: [],
    totalTimeErrors: [],
    totalTime: null,
    addBtn: null,
  }),
  watch: {
    open(value) {
      if (value) {
      }
    },
  },
  mounted() {
    this.detail()
    this.addBtn = Cookies.get('strRoles').includes(',41,')
  },
  methods: {
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[0-9\:]+$/.test(char)) return true
      else e.preventDefault()
    },
    checkPush() {
      const startTime = this.time
      const endTime = this.time1
      const hours = moment
        .duration(moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm')))
        .asHours()

      const startTime1 = this.time2
      const endTime1 = this.time3
      const hours1 = moment
        .duration(moment(endTime1, 'HH:mm').diff(moment(startTime1, 'HH:mm')))
        .asHours()
      this.totalTime = this.$formatMoney({
        amount: (hours - hours1) * 60 * 60 * this.numberTime,
      })
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.numberTime = null
      this.numberTimeErrors = []
      this.time = null
      this.timeError = []
      this.time1 = null
      this.timeError1 = []
      this.time2 = null
      this.timeError2 = []
      this.time3 = null
      this.timeError3 = []
      this.totalTime = null
      this.totalTimeErrors = []
    },

    checkValidate() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.numberTime)) {
        hasErrors = true
        this.numberTimeErrors = ['Số TPS/s không được để trống']
      } else if ((String(this.numberTime) || '').trim().length === 0) {
        hasErrors = true
        this.numberTimeErrors = ['Số TPS/s không được để trống']
      } else if (isNaN(this.numberTime)) {
        hasErrors = true
        this.numberTimeErrors = ['Vui lòng nhập đúng định dạng']
      } else if (this.numberTime.length > 10) {
        hasErrors = true
        this.numberTimeErrors = ['Được nhập tối đa 10 ký tự']
      } else if (this.numberTime <= 0) {
        hasErrors = true
        this.numberTimeErrors = ['Vui lòng nhập đúng định dạng']
      }

      if (this.$isNullOrEmpty(this.time)) {
        hasErrors = true
        this.timeError = ['Bạn chưa chọn Khung giờ làm việc']
      }
      if (this.$isNullOrEmpty(this.time1)) {
        hasErrors = true
        this.timeError1 = ['Bạn chưa chọn Khung giờ làm việc']
      }
      if (
        this.$isNullOrEmpty(this.time2) &&
        this.time1 != null &&
        this.time != null
      ) {
        hasErrors = true
        this.timeError2 = ['Bạn chưa chọn Khung giờ nghỉ trưa']
      }
      if (
        this.$isNullOrEmpty(this.time3) &&
        this.time1 != null &&
        this.time != null
      ) {
        hasErrors = true
        this.timeError3 = ['Bạn chưa chọn Khung giờ nghỉ trưa']
      }
      if (this.$isNullOrEmpty(this.totalTime)) {
        hasErrors = true
        this.totalTimeErrors = [
          'Tổng số TPS/tổng thời gian push không được để trống',
        ]
      }
      let time = moment.duration(moment(this.time, 'HH:mm')).asSeconds()
      let time1 = moment.duration(moment(this.time1, 'HH:mm')).asSeconds()
      let time2 = moment.duration(moment(this.time2, 'HH:mm')).asSeconds()
      let time3 = moment.duration(moment(this.time3, 'HH:mm')).asSeconds()

      if (time > time1 && this.time1 != null && this.time != null) {
        hasErrors = true
        this.timeError = [
          ' Thời gian bắt đầu không được lớn hơn thời gian kết thúc',
        ]
      }
      if (
        time2 > time3 &&
        this.time1 != null &&
        this.time != null &&
        this.time3 != null
      ) {
        hasErrors = true
        this.timeError2 = [
          ' Thời gian bắt đầu không được lớn hơn thời gian kết thúc',
        ]
      }
      if (
        time2 < time &&
        this.time1 != null &&
        this.time != null &&
        this.time2 != null
      ) {
        hasErrors = true
        this.timeError2 = [
          ' Thời gian nghỉ trưa phải nằm trong khoảng thời gian push',
        ]
      }
      if (time3 > time1 && this.time1 != null && this.time != null) {
        hasErrors = true
        this.timeError3 = [
          ' Thời gian nghỉ trưa phải nằm trong khoảng thời gian push',
        ]
      }

      if (!hasErrors) {
        this.add()
      }
    },
    isNumber(e) {
      e = e ? e : window.e
      var charCode = e.which ? e.which : e.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault()
      } else {
        return true
      }
    },
    detail() {
      this.$store
        .dispatch('configTps/detailTotal', {
          id: 1,
        })
        .then((res) => {
          this.numberTime = res.data.data.limitTps
          this.time = res.data.data.startTime
          this.time1 = res.data.data.endTime
          this.time2 = res.data.data.startBreak
          this.time3 = res.data.data.endBreak
          this.totalTime = this.$formatMoney({ amount: res.data.data.totalTps })
        })
        .catch((errors) => {})
    },
    add() {
      this.openLoading = true
      setTimeout(() => {
        this.$store
          .dispatch('configTps/totaltps', {
            id: 1,
            limitTps: this.numberTime,
            startTime: this.time,
            endTime: this.time1,
            startBreak: this.time2,
            endBreak: this.time3,
            totalTps: this.totalTime.replace(/\./g, ''),
          })
          .then((response) => {
            this.openLoading = false
            if (!response.error) {
              this.$showSuccess(this, 'Lưu tổng TPS thành công')
              this.detail()
              this.numberTimeErrors = []
              this.timeError = []
              this.timeError1 = []
              this.timeError2 = []
              this.timeError3 = []
              this.totalTimeErrors = []
            }
          })
          .catch((e) => {
            this.$log.debug(e)
          })
          .catch((errors) => {})
          .finally(() => {})
      }, 1000)
    },
  },
}
</script>

<style>
[role='time'] {
  top: 330px !important;
}

[role='time1'] {
  top: 415px !important;
}
</style>
