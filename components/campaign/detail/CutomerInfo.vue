<template>
  <div>
    <v-row class="ma-0" style="color: black">
      <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
        <span class="fw-500"> Mã chương trình </span>
        <v-text-field
          outlined
          dense
          aria-hidden="true"
          v-model="campaign_code"
          readonly
          class="fs-13 border-radius-5"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pb-0 pt-0 pt-md-3">
        <span class="fw-500">
          Tên chương trình (<span class="required">*</span>)
        </span>
        <v-text-field
          outlined
          dense
          readonly
          aria-hidden="true"
          v-model="campaign_name"
          class="fs-13 border-radius-5"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" md="6" class="pb-0 pt-0">
        <span class="fw-500">
          Tên BrandName (<span class="required">*</span>)
        </span>
        <v-text-field
          outlined
          dense
          readonly
          aria-hidden="true"
          v-model="brandnameName"
          class="fs-13 border-radius-5"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="pb-0 pt-0">
        <span class="fw-500">
          Lĩnh vực kinh doanh (<span class="required">*</span>)
        </span>
        <v-text-field
          outlined
          dense
          readonly
          v-model="business_id"
          class="fs-13 border-radius-5"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" md="6" class="pb-0 pt-0">
        <span class="fw-500">
          Loại tin nhắn (<span class="required">*</span>)
        </span>
        <v-text-field
          outlined
          dense
          readonly
          v-model="sms_id"
          class="fs-13 border-radius-5"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" class="pb-0 pt-0">
        <span class="fw-500"> SĐT test quảng cáo </span>
        <v-text-field
          outlined
          readonly
          dense
          aria-hidden="true"
          v-model="phone_test"
          class="fs-13 border-radius-5"
        ></v-text-field>
      </v-col>

      <v-col cols="4" class="pb-0 pt-0">
        <div class="fs-13 pb-1 font-weight-medium">
          Quy đổi: {{ amountFragmentSms }} tin nhắn/thuê bao
        </div>
      </v-col>
      <v-col cols="8" class="pb-0 pt-0">
        <span class="fw-500">
          Nội dung hiển thị trên điện thoại (<span class="required">*</span>)
        </span>
        <v-textarea
          outlined
          dense
          rows="3"
          readonly
          auto-grow
          hide-details
          row-height="30"
          class="fs-13 border-radius-5"
          v-model="content_mobile"
        >
        </v-textarea>
      </v-col>

      <v-col cols="12"
        >Tổng số ký tự tin nhắn quảng cáo (bao gồm có tiền tố, hậu tố và nội
        dung):
        {{ $isNullOrEmpty(content_mobile) ? '' : content_mobile.length }} ký
        tự</v-col
      >
      <v-col cols="12" md="6" class="py-0">
        <v-menu
          v-model="menu_date_start"
          :close-on-content-click="false"
          transition="scale-transition1"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <span class="fw-500">
              Ngày bắt đầu gửi tin (<span class="required">*</span>)
            </span>
            <v-text-field
              placeholder="Ngày/Tháng/Năm"
              v-on="on"
              prepend-inner-icon="mdi-calendar-range "
              dense
              class="fs-13 border-radius-5"
              outlined
              readonly
              disabled
              v-model="dateTime"
            >
            </v-text-field>
          </template>
          <v-date-picker
            readonly
            locale="vi"
            @input="menu_date_start = false"
            v-model="date_start"
          >
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" md="6" class="py-0">
        <v-menu
          v-model="menu_date_end"
          :close-on-content-click="false"
          transition="scale-transition1"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <span class="fw-500">
              Ngày kết thúc gửi tin (<span class="required">*</span>)
            </span>
            <v-text-field
              placeholder="Ngày/Tháng/Năm"
              prepend-inner-icon="mdi-calendar-range "
              dense
              v-on="on"
              v-model="dateTime1"
              class="fs-13 border-radius-5"
              outlined
              readonly
              disabled
            >
            </v-text-field>
          </template>
          <v-date-picker
            readonly
            locale="vi"
            @change="menu_date_end = false"
            v-model="date_end"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6" class="py-0">
        <v-row
          no-gutters
          class="ma-0"
          align="center"
          v-for="(item, index) in arr_frame"
          :key="`arr_frame--${index}`"
        >
          <v-col cols="4" class="pb-0 pt-0">
            <span class="fw-500"> Khung giờ từ </span>
            <v-text-field
              dense
              outlined
              type="time"
              readonly
              :value="item.start_time"
              @input="item.start_time = $event"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="pb-0 pt-0 ml-2">
            <span class="fw-500"> Khung giờ đến </span>
            <v-text-field
              dense
              outlined
              readonly
              type="time"
              :value="item.end_time"
              @input="item.end_time = $event"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pb-0 pt-0">
        Hệ thống gửi tin vào các khung giờ sau {{ cfgTpsTotal_startMorning }} -
        {{ cfgTpsTotal_endMorning }}, {{ cfgTpsTotal_startAfternoon }} -
        {{ cfgTpsTotal_endAfternoon }}
      </v-col>
      <v-col cols="12" class="pb-0 pt-0">
        <v-text-field
          dense
          v-model="time_frame"
          outlined
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    customerInfo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    totalSMS() {
      let str = 0
      if (this.contentType == 0) {
        if (0 < this.content.length <= 70) {
          str = 1
        } else if (this.content.length <= 134) {
          str = 2
        } else if (this.content.length <= 201) {
          str = 3
        } else if (this.content.length <= 268) {
          str = 4
        } else {
          str = 5
        }
      } else {
        if (this.content.length <= 160) {
          str = 1
        } else if (this.content.length <= 306) {
          str = 2
        } else if (this.content.length <= 459) {
          str = 3
        } else if (this.content.length <= 612) {
          str = 4
        } else {
          str = 5
        }
      }
      return str
    },
    dateTime() {
      return moment(this.date_start).format('DD/MM/YYYY')
    },
    dateTime1() {
      return moment(this.date_end).format('DD/MM/YYYY')
    },
  },
  watch: {
    customerInfo(value) {
      this.brandnameDataSelectOfCustomer(value.customer_id)
      this.typeSmsSelectData()
      this.businessSelectData()
      this.campaign_code = value.campaignCode
      this.campaign_name = value.name
      this.brandname_id = value.brandnameId
      this.brandnameName = value.brandnameName
      this.business_id = value.typeBusinessName
      this.sms_id = value.typeSmsName
      this.phone_test = value.phoneTest
      this.content_mobile = this.$isNullOrEmpty(value.contentFinal)
        ? null
        : value.contentFinal
      // this.changeContent()
      this.amountFragmentSms = value.amountFragmentSms

      this.date_start = moment(value.startTime, 'DD/MM/YYYY HH:mm:ss').format(
        'YYYY-MM-DD'
      )
      this.date_end = moment(value.endTime, 'DD/MM/YYYY HH:mm:ss').format(
        'YYYY-MM-DD'
      )

      this.time_frame = value.frameTime

      if (value.frameTime != null && value.frameTime != '') {
        this.arr_frame = []
        var frameTime = value.frameTime

        if (frameTime.includes(',')) {
          let arr = frameTime.split(',')
          for (let i = 0; i < arr.length; i++) {
            this.arr_frame.push({
              start_time: arr[i].split('-')[0].trim(),
              end_time: arr[i].split('-')[1].trim(),
            })
          }
        } else {
          this.arr_frame.push({
            start_time: frameTime.split('-')[0].trim(),
            end_time: frameTime.split('-')[1].trim(),
          })
        }
      }

      this.getInfoConfigTpsTotal()
    },
  },
  data() {
    return {
      listsLanguage: [
        {
          name: 'Tiếng việt có dấu',
          value: 0,
          isSelect: 1,
        },
        {
          name: 'Tiếng việt không dấu',
          value: 1,
          isSelect: 0,
        },
      ],
      campaign_code: null,
      campaign_name: null,
      brandname_id: null,
      brandnameName: null,
      business_id: null,
      sms_id: null,
      phone_test: null,
      content: '',
      content_mobile: '',
      menu_date_start: false,
      date_start: moment().format('YYYY-MM-DD'),
      date_end: moment().format('YYYY-MM-DD'),

      menu_date_end: false,

      time_frame: null,
      arr_frame: [],
      list_brandname: [],
      list_business: [],
      list_sms: [],
      cfgTpsTotal_startMorning: null,
      cfgTpsTotal_endMorning: null,
      cfgTpsTotal_startAfternoon: null,
      cfgTpsTotal_endAfternoon: null,
      amountFragmentSms: 1,
    }
  },
  methods: {
    nonAccentVietnamese(str) {
      str = str.toLowerCase()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      // Some system encode vietnamese combining accent as individual utf-8 characters
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
      return str
    },
    changeContent() {
      let found_lang = this.listsLanguage.filter((v) => v.isSelect === 1)[0]
        .value
      if (found_lang != 1) {
        this.content_mobile = this.nonAccentVietnamese(this.content)
      } else {
        this.content_mobile = this.content
      }
    },
    brandnameDataSelectOfCustomer(value) {
      if (value == null) return
      let data = {
        customerId: value,
      }
      this.$store
        .dispatch('campaign/brandnameDataSelectOfCustomer', data)
        .then((res) => {
          if (!res.error) {
            res.data.data.map((item) => {
              this.list_brandname.push({
                text: item.brandnameName,
                value: item.id,
              })
            })
          }
        })
    },
    businessSelectData() {
      this.$store.dispatch('configPrice/businessSelectData').then((res) => {
        if (!res.error) {
          this.list_business = []
          res.data.data.map((item) => {
            this.list_business.push({
              text: item.name,
              value: item.id,
            })
          })
        }
      })
    },
    typeSmsSelectData() {
      this.$store.dispatch('configPrice/typeSmsSelectData').then((res) => {
        if (!res.error) {
          this.list_sms = []
          res.data.data.map((item) => {
            this.list_sms.push({
              text: item.name,
              value: item.id,
            })
          })
        }
      })
    },
    getInfoConfigTpsTotal() {
      this.$store.dispatch('configTps/getConfigTpsTotal', {}).then((res) => {
        if (!res.error) {
          var configTpsTotal = res.data.data
          this.cfgTpsTotal_startMorning = configTpsTotal.startTime
          this.cfgTpsTotal_endMorning = configTpsTotal.startBreak
          this.cfgTpsTotal_startAfternoon = configTpsTotal.endBreak
          this.cfgTpsTotal_endAfternoon = configTpsTotal.endTime
        }
      })
    },
  },
}
</script>
