<template>
  <div>
    <v-dialog
      :value="open"
      :max-width="1300"
      @click:outside="toggle"
      @keydown="$event.key === 'Escape' && toggle()"
    >
      <v-card>
        <v-card-title class="border-title-dialog">
          Cập nhật chương trình nhắn tin
          <v-btn
            @click="toggle"
            icon
            style="position: absolute; top: 0; right: 0"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text
          style="max-height: calc(100vh - 14rem); overflow-x: hidden"
          class="pb-0 pt-4"
        >
          <v-row class="ma-0" no-gutters>
            <v-col cols="12">
              <div
                style="color: black"
                class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
              >
                I. Thông tin chương trình
              </div>
            </v-col>
            <v-col cols="12">
              <v-row class="ma-0" style="color: black">
                <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
                  <span class="fw-500"> Mã chương trình </span>
                  <v-text-field
                    outlined
                    dense
                    disabled
                    aria-hidden="true"
                    v-model="campaign_code"
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
                    aria-hidden="true"
                    v-model="campaign_name"
                    class="fs-13 border-radius-5"
                    :error-messages="campaignNameError"
                    @input="campaignNameError = []"
                    @keydown.space="preventLeadingSpace"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0 pt-0">
                  <span class="fw-500">
                    Tên khách hàng (<span class="required">*</span>)
                  </span>
                  <v-autocomplete
                    outlined
                    dense
                    :items="list_customer"
                    v-model="customer_id"
                    item-value="value"
                    item-text="text"
                    no-data-text="Không có dữ liệu"
                    class="fs-13 border-radius-5"
                    @change="brandnameDataSelectOfCustomer(customer_id)"
                    :error-messages="customerIdError"
                    @input="customerIdError = []"
                  >
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" md="6" class="pb-0 pt-0">
                  <span class="fw-500">
                    Tên BrandName (<span class="required">*</span>)
                  </span>
                  <v-autocomplete
                    outlined
                    dense
                    :items="list_brandname"
                    v-model="brandname_id"
                    item-value="value"
                    item-text="text"
                    no-data-text="Không có dữ liệu"
                    class="fs-13 border-radius-5"
                    :error-messages="brandNameError"
                    @input="brandNameError = []"
                    @change="typeSmsAndBussinessOfBrandname(brandname_id)"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" class="pb-0 pt-0">
                  <span class="fw-500">
                    Lĩnh vực kinh doanh (<span class="required">*</span>)
                  </span>
                  <v-autocomplete
                    outlined
                    dense
                    :items="list_business"
                    v-model="business_id"
                    item-value="value"
                    item-text="text"
                    no-data-text="Không có dữ liệu"
                    class="fs-13 border-radius-5"
                    :error-messages="businessIdError"
                    @input="businessIdError = []"
                    @change="onChangedBusiness()"
                  >
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" md="6" class="pb-0 pt-0">
                  <span class="fw-500">
                    Loại tin nhắn (<span class="required">*</span>)
                  </span>
                  <v-autocomplete
                    outlined
                    dense
                    :items="list_sms"
                    v-model="sms_id"
                    @change="updateInfoTypeSmsDetail(sms_id)"
                    item-value="value"
                    item-text="text"
                    no-data-text="Không có dữ liệu"
                    class="fs-13 border-radius-5"
                    :error-messages="smsError"
                    @input="smsError = []"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" class="pb-0 pt-0">
                  <a
                    style="text-decoration-line: underline"
                    @click="showTablePrice()"
                    >Xem bảng giá hiện tại</a
                  >
                  <span style="color: red">{{ showTablePriceErrors }}</span>
                  <br /><br />
                </v-col>

                <v-col cols="12" class="pb-0 pt-0">
                  <span class="fw-500"> SĐT test quảng cáo </span>
                  <v-text-field
                    outlined
                    dense
                    aria-hidden="true"
                    v-model="phone_test"
                    class="fs-13 border-radius-5"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="pb-0 pt-0">
                  <div class="fs-13 pb-1 font-weight-medium">
                    <span class="fw-500">
                      Nội dung (<span class="required">*</span>)
                    </span>

                    <v-textarea
                      outlined
                      dense
                      rows="3"
                      @change="changeContent"
                      @keyup="changeContent"
                      auto-grow
                      hide-details
                      @input="contentError = []"
                      :error-messages="contentError"
                      row-height="30"
                      class="fs-13 border-radius-5"
                      v-model="content"
                      @keydown.space="preventLeadingSpace"
                    >
                    </v-textarea>
                  </div>
                </v-col>
                <v-col cols="2" class="pb-0 pt-0">
                  <div
                    class="mt-4"
                    v-for="(item, index) in listsLanguage"
                    :key="`${item.name}--${index}`"
                  >
                    <v-checkbox
                      :input-value="item.isSelect"
                      :true-value="1"
                      :false-value="0"
                      color="success"
                      class="ma-0"
                      hide-details=""
                      @change="changeLang(item)"
                    >
                      <template v-slot:label>
                        <div class="black--text fs-14">
                          {{ item.name }}
                        </div>
                      </template>
                    </v-checkbox>
                  </div>
                </v-col>
                <v-col cols="2" class="pb-0 pt-0">
                  <div class="fs-13 pb-1 font-weight-medium">
                    Quy đổi: {{ amountFragmentSms }} tin nhắn/thuê bao
                  </div>
                </v-col>
                <v-col cols="4" class="pb-0 pt-0">
                  <span class="fw-500">
                    Nội dung hiển thị trên điện thoại (<span class="required"
                      >*</span
                    >)
                  </span>
                  <v-textarea
                    outlined
                    dense
                    rows="3"
                    auto-grow
                    hide-details
                    row-height="30"
                    class="fs-13 border-radius-5"
                    v-model="content_mobile"
                  >
                  </v-textarea>
                </v-col>

                <v-col cols="12"
                  >Tổng số ký tự tin nhắn quảng cáo (bao gồm có tiền tố, hậu tố
                  và nội dung):
                  {{
                    $isNullOrEmpty(content_mobile) ? 0 : content_mobile.length
                  }}
                  ký tự
                </v-col>
                <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
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
                        v-model="startTime"
                        :error-messages="startDateError"
                        @input="startDateError = []"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      locale="vi"
                      @change="menu_date_start = false"
                      v-model="date_start"
                      :show-current="date_start"
                      :allowed-dates="allowedDates"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
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
                        v-model="endTime"
                        :error-messages="endDateError"
                        @input="endDateError = []"
                        class="fs-13 border-radius-5"
                        outlined
                        readonly
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      locale="vi"
                      @change="menu_date_end = false"
                      v-model="date_end"
                      :show-current="date_end"
                      :allowed-dates="allowedDates1"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
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
                        :value="item.start_time"
                        @input="item.start_time = $event"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" class="pb-0 pt-0 ml-2">
                      <span class="fw-500"> Khung giờ đến </span>
                      <v-text-field
                        dense
                        outlined
                        type="time"
                        :value="item.end_time"
                        @input="item.end_time = $event"
                      ></v-text-field>
                    </v-col>
                    <v-col class="col-auto">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            color="primary"
                            class="mb-1 ml-2"
                            @click="setTime"
                            v-on="on"
                          >
                            mdi-plus-circle
                          </v-icon>
                        </template>
                        <span>Thêm khung giờ</span>
                      </v-tooltip>
                    </v-col>
                    <v-col class="col-auto ml-2" v-if="arr_frame.length > 1">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            color="red"
                            class="mb-1"
                            @click="deleteTime(index)"
                            v-on="on"
                          >
                            mdi-delete
                          </v-icon>
                        </template>
                        <span>Xoá khung giờ</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      ><span class="required">{{
                        time_frame_error
                      }}</span></v-col
                    >
                  </v-row>
                </v-col>

                <v-col cols="6" class="pb-0 pt-0">
                  Hệ thống gửi tin vào các khung giờ sau
                  {{ cfgTpsTotal_startMorning }} - {{ cfgTpsTotal_endMorning }},
                  {{ cfgTpsTotal_startAfternoon }} -
                  {{ cfgTpsTotal_endAfternoon }}
                </v-col>
                <v-col cols="12" class="pb-0 pt-0">
                  <v-text-field
                    dense
                    v-model="time_frame"
                    outlined
                    readonly
                    @input="time_frame_error = []"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div
                style="color: black"
                class="information font-weight-medium fs-16 py-1 pl-2 pl-md-4"
              >
                II. Danh sách thuê bao
              </div>
            </v-col>
            <v-col cols="12" class="px-0 py-0">
              <v-row class="ma-0" align="center">
                <v-col cols="6">
                  <span class="fw-500 black--text"> Nguồn dữ liệu </span>
                  <v-select
                    outlined
                    clearable
                    dense
                    :items="list_source"
                    v-model="source_id"
                    item-value="value"
                    item-text="text"
                    no-data-text="Không có dữ liệu"
                    class="fs-13 border-radius-5"
                  >
                  </v-select>
                </v-col>

                <v-col class="col-auto" style="text-align: right">
                  Tải file mẫu của hệ thống:
                  <a
                    :href="`/fileSample/fileMauChuongTrinhNhanTin.xlsx`"
                    target="_blank"
                    download
                    >FileMauChuongTrinhNhanTin.xlsx</a
                  >
                </v-col>
                <v-col cols="12">
                  <InsertFile
                    :arr_file="arr_file"
                    @uploadSuccess="uploadSuccess"
                    :isMultiple="true"
                    :label="'Tài liệu đính kèm'"
                    :idInputFile="`input-file-CTLV`"
                    ref="foo"
                  ></InsertFile>
                </v-col>
                <div
                  v-if="errormsg"
                  class="v-messages theme--light error--text mt-n1 ml-2 mb-5"
                  role="alert"
                >
                  <div class="v-messages__wrapper">
                    <div class="v-messages__message">Vui lòng chọn file</div>
                  </div>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn text height="30px" class="primary">
            <div class="font_size text-none" @click="save">Lưu</div>
          </v-btn>
          <v-btn text height="30px" class="primary" @click="checkValidate">
            <div class="font_size text-none">Gửi duyệt</div>
          </v-btn>
          <v-btn text height="30px" class="primary" @click="reset">
            <div class="font_size text-none">Nhập lại</div>
          </v-btn>
          <v-btn text height="30px" class="secondary" @click="toggle">
            <div class="font_size text-none">Đóng</div>
          </v-btn>
        </v-card-actions>
        <loading :open="openLoading"></loading>
      </v-card>
    </v-dialog>
    <AddLink
      :open="openAddLink"
      @toggle="openAddLink = !openAddLink"
      :setLink="setLink"
    />
    <ShowTablePriceCurrent
      :open="openTablePriceCurrent"
      :businessId="business_id"
      :typeSmsId="sms_id"
      @toggle="openTablePriceCurrent = !openTablePriceCurrent"
    />
  </div>
</template>
<script>
import moment from 'moment'
import AddLink from '~/components/campaign/AddLink'
import InsertFile from './InsertFile.vue'
import URL from '~/assets/configurations/BASE_URL'
import Cookies from 'js-cookie'
import ConstValue from '~/assets/configurations/constValue'
import ShowTablePriceCurrent from '~/components/campaign/ShowTablePriceCurrent'
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'

const date = new Date()
const now = new Date()

export default {
  components: {
    ShowTablePriceCurrent,
    AddLink,
    InsertFile,
    loading,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    dataDetail: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      URL,
      errormsg: false,
      openLoading: false,
      openAddLink: false,
      campaign_code: Constants.System.Campaign.campaign_code,
      campaign_name: null,
      campaignNameError: [],
      customerIdError: [],
      brandNameError: [],
      businessIdError: [],
      contentError: [],
      customer_id: null,
      content: '',
      list_customer: [],
      brandname_id: null,
      list_brandname: [],
      business_id: null,
      endDateError: [],
      startDateError: [],
      cfgTpsTotal_startMorning: null,
      cfgTpsTotal_endMorning: null,
      cfgTpsTotal_startAfternoon: null,
      cfgTpsTotal_endAfternoon: null,
      amountFragmentSms: 1,
      list_business: [],
      sms_id: null,
      list_sms: [],
      list_sms_detail: [Object],
      menu_date_start: false,
      menu_date_end: false,
      list_source: Constants.System.Campaign.list_source,
      source_id: 1,
      phone_test: null,
      date_start: moment().format('YYYY-MM-DD'),
      date_end: moment().format('YYYY-MM-DD'),
      time_start: null,
      time_end: null,
      smsError: [],
      arr_frame: [
        {
          start_time: '',
          end_time: '',
        },
      ],
      time_frame_error: '',
      contentType: null, // contentType == 1 : Không dấu ; contentType == 0 : có dấu
      listsLanguage: Constants.System.Campaign.listsLanguage,
      content_mobile: null,
      data_file: Constants.System.Campaign.data_file,
      arr_file: [],
      array_file_name: [],
      current_type_sms_detail: null,
      openTablePriceCurrent: false,
      showTablePriceErrors: '',
    }
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

    time_frame() {
      let arr = []
      let str = null
      this.time_frame_error = ''
      let startMorning = moment(this.cfgTpsTotal_startMorning, 'HH:mm')
      let endMorning = moment(this.cfgTpsTotal_endMorning, 'HH:mm')
      let startAfternoon = moment(this.cfgTpsTotal_startAfternoon, 'HH:mm')
      let endAfternoon = moment(this.cfgTpsTotal_endAfternoon, 'HH:mm')

      this.arr_frame.map((item) => {
        let startTime = this.$isNullOrEmpty(item.start_time)
          ? ''
          : moment(item.start_time, 'HH:mm').format('HH:mm')
        let endTime = this.$isNullOrEmpty(item.end_time)
          ? ''
          : moment(item.end_time, 'HH:mm').format('HH:mm')

        let _startTime = moment(startTime, 'HH:mm')
        let _endTime = moment(endTime, 'HH:mm')

        if (!this.$isNullOrEmpty(startTime)) {
          if (
            _startTime < startMorning ||
            (_startTime > endMorning && _startTime < startAfternoon) ||
            _startTime > endAfternoon
          ) {
            this.time_frame_error =
              "'Khung giờ từ' phải nằm trong cấu hình khung giờ gửi tin!"
            return
          } else {
            this.time_frame_error = ''
          }
        }

        if (!this.$isNullOrEmpty(endTime)) {
          if (
            _endTime < startMorning ||
            (_endTime > endMorning && _endTime < startAfternoon) ||
            _endTime > endAfternoon
          ) {
            this.time_frame_error =
              "'Khung giờ đến' phải nằm trong cấu hình khung giờ gửi tin!"
            return
          } else {
            this.time_frame_error = ''
          }
        }

        if (startTime && endTime) {
          if (_startTime >= _endTime) {
            this.time_frame_error =
              "'Khung giờ từ' phải nhỏ hơn 'Khung giờ đến'"
            return
          } else if (_startTime < endMorning && _endTime > startAfternoon) {
            this.time_frame_error =
              "'Khung giờ từ' và 'Khung giờ đến' phải cùng khung giờ cấu hình gửi tin!"
            return
          }
          this.time_frame_error = ''
          arr.push(`${startTime} - ${endTime}`)
        }
      })
      str = arr.join()
      return str
    },
    startTime() {
      return moment(this.date_start).format('DD/MM/YYYY')
    },
    endTime() {
      return moment(this.date_end).format('DD/MM/YYYY')
    },
  },
  methods: {
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },
    allowedDates(value) {
      const today = moment(new Date()).format('YYYY-MM-DD')
      if (today <= value) {
        return true
      } else {
        return false
      }
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
    allowedDates1(value) {
      const today = moment(new Date()).format('YYYY-MM-DD')
      if (today <= value) {
        return true
      } else {
        return false
      }
    },
    customerDataSelect() {
      var strListGroup = `${Cookies.get('strListGroup')}`
      if (strListGroup.includes(',CUSTOMER,')) {
        // Nếu thêm mới ở trang khách hàng, thì fix data select khách hàng là khách hàng hiện tại
        this.$store.dispatch('campaign/infoThisCustomer').then((res) => {
          if (!res.error) {
            var data = res.data.data
            this.list_customer.push({
              text: data.customerName,
              value: data.id,
            })
            this.customer_id = data.id
            this.brandnameDataSelectOfCustomer(this.customer_id)
          }
        })
      } else {
        this.$store.dispatch('campaign/customerDataSelect').then((res) => {
          if (!res.error) {
            res.data.data.map((item) => {
              this.list_customer.push({
                text: item.customerName,
                value: item.id,
              })
            })
          }
        })
      }
    },
    brandnameDataSelectOfCustomer(customerId) {
      this.list_brandname = []
      this.list_business = []
      this.list_sms = []
      if (customerId == null) {
        this.brandname_id = null
        return
      }
      let data = {
        customerId: customerId,
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
    typeSmsAndBussinessOfBrandname(brandnameId) {
      this.business_id = null
      this.sms_id = null
      if (brandnameId == null) return
      let data = {
        brandnameId: brandnameId,
      }
      this.$store
        .dispatch('campaign/typeSmsAndBussinessDataSelect', data)
        .then((res) => {
          if (!res.error) {
            this.list_business = []
            res.data.data.typeBusinessList.map((item) => {
              this.list_business.push({
                text: item.name,
                value: item.id,
              })
            })

            this.list_sms = []
            this.list_sms_detail = res.data.data.typeSmsList
            res.data.data.typeSmsList.map((item) => {
              this.list_sms.push({
                text: item.name,
                value: item.id,
              })
            })
          }
        })
    },
    uploadSuccess(value) {
      this.array_file_name = []
      value.map((item) => {
        this.array_file_name.push(item)
        // this.arr_file.push(item)
      })
    },
    toggle() {
      this.$emit('toggle')
    },
    deleteTime(index) {
      this.arr_frame.splice(index, 1)
    },
    setTime() {
      this.arr_frame.push({
        start_time: '',
        end_time: '',
      })
    },

    sumTotal() {
      let total = 0
      if (this.data_file.length <= 0) return total
      for (var i in this.data_file) {
        total += this.data_file[i].count
      }
      return total
    },

    changeContent() {
      // Khi 'Nội dung hiển thị trên điện thoại' thay đổi
      // this.contentType == 1 : Không dấu ; this.contentType == 0 : có dấu
      this.content_mobile = ''
      if (
        this.current_type_sms_detail != null &&
        this.current_type_sms_detail.prefix != null
      ) {
        this.content_mobile += this.current_type_sms_detail.prefix
      }
      this.content_mobile += this.content
      if (
        this.current_type_sms_detail != null &&
        this.current_type_sms_detail.suffixes != null
      ) {
        this.content_mobile += this.current_type_sms_detail.suffixes
      }
      if (this.contentType == 1) {
        var _content = this.content_mobile
        this.content_mobile = this.convertToNonAccent(_content)
      }

      // Tính quy đổi số lượng tin nhắn / thuê bao
      this.calculateamountFragmentSms()
    },
    calculateamountFragmentSms() {
      // Tính quy đổi số lượng tin nhắn / thuê bao
      var arrframe
      if (this.contentType == 1) {
        // Nội dung không dấu
        arrframe = ConstValue.frameSmsNonAccent.split('-')
      } else {
        arrframe = ConstValue.frameSmsAccent.split('-')
      }
      var lengthContentMobile = this.content_mobile.length
      if (lengthContentMobile > arrframe[arrframe.length - 1]) {
        this.contentMobileError = [
          'Nội dung không được dài quá ' +
            arrframe[arrframe.length - 1] +
            ' ký tự',
        ]
      } else {
        this.amountFragmentSms = 1
        for (var i = 0; i < arrframe.length - 1; i++) {
          if (
            arrframe[i] < lengthContentMobile &&
            lengthContentMobile <= arrframe[i + 1]
          ) {
            this.amountFragmentSms = i + 1
            break
          }
        }
      }
    },
    convertToNonAccent(str) {
      var result = ''
      var charAccent =
        'áàảãạăắằẳẵặấâầẩẫậóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựéèẻẽẹêếềểễệíìỉĩịýỳỷỹỵđÁÀẢÃẠĂẮẰẲẴẶẤÂẦẨẪẬÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÝỲỶỸỴĐ'
      var charNonAccent =
        'aaaaaaaaaaaaaaaaaooooooooooooooooouuuuuuuuuuueeeeeeeeeeeiiiiiyyyyydAAAAAAAAAAAAAAAAAOOOOOOOOOOOOOOOOOUUUUUUUUUUUEEEEEEEEEEEIIIIIYYYYYD'
      for (var i = 0; i < str.length; i++) {
        var character = str.charAt(i)
        var detectCharAccent = false

        for (var j = 0; j < charAccent.length; j++) {
          if (character == charAccent.charAt(j)) {
            result += charNonAccent.charAt(j)
            detectCharAccent = true
            break
          }
        }

        if (!detectCharAccent) {
          result += character
        }
      }

      return result
    },
    updateInfoTypeSmsDetail(smsId) {
      if (smsId != null && this.list_sms_detail.length > 0) {
        for (let i = 0; i < this.list_sms_detail.length; i++) {
          if (this.list_sms_detail[i].id === smsId) {
            this.current_type_sms_detail = this.list_sms_detail[i]
            this.changeContent()
            break
          }
        }
        this.showTablePriceErrors = ''
      }
    },
    changeLang(item) {
      // this.contentType == 1 : Không dấu ; this.contentType == 0 : có dấu
      this.contentType = item.value
      for (var i in this.listsLanguage) {
        if (this.listsLanguage[i].value == item.value) {
          this.listsLanguage[i].isSelect = 1
        } else {
          this.listsLanguage[i].isSelect = 0
        }
      }
      this.changeContent()
    },

    setLink(content, link) {
      content == ''
        ? (this.content += '<a v-html="' + link + '">' + link + '</a>')
        : (this.content += '<a v-html="' + link + '">' + content + '</a>')
    },

    send() {
      this.openLoading = true
      //if (!this.checkValidate()) {
      const data = {
        customerId: this.customer_id,
        typeBusiness: this.business_id,
        typeAds: this.sms_id,
        brandnameId: this.brandname_id,
        status: 1,
        name: this.campaign_name,
        startDate: this.date_start,
        endDate: this.date_end,
        sentActiveTime: moment(now).format('YYYY-MM-DD'),
        phoneTest: this.phone_test,
        arrayFileName: this.array_file_name,
        content: this.content,
        frameTime: this.time_frame,
        contentFinal: this.content_mobile,
        contentType: this.contentType,
        campaignId: this.dataDetail.id,
        amountFragmentSms: this.amountFragmentSms,
      }
      setTimeout(() => {
        this.$store.dispatch('campaign/campaignEdit', data).then((res) => {
          this.openLoading = false
          if (!res.error && res.data.data.resultCode == 1) {
            this.$showSuccess(
              this,
              'Gửi duyệt chương trình nhắn tin thành công'
            )
            this.toggle()
            this.$emit('success')
          } else if (!res.error && res.data.data.resultCode == 0) {
            this.$showError(this, res.data.data.message)
          }
        })
      }, 1000)
      //}
    },

    save() {
      this.openLoading = true
      //if (!this.checkValidate()) {
      const data = {
        customerId: this.customer_id,
        typeBusiness: this.business_id,
        typeAds: this.sms_id,
        brandnameId: this.brandname_id,
        status: 0,
        name: this.campaign_name,
        startDate: this.date_start,
        endDate: this.date_end,
        sentActiveTime: moment(now).format('YYYY-MM-DD'),
        phoneTest: this.phone_test,
        arrayFileName: this.array_file_name,
        content: this.content,
        frameTime: this.time_frame,
        contentFinal: this.content_mobile,
        contentType: this.contentType,
        campaignId: this.dataDetail.id,
        amountFragmentSms: this.amountFragmentSms,
      }
      setTimeout(() => {
        this.$store
          .dispatch('campaign/campaignEdit', data)
          .then((res) => {
            this.openLoading = false
            if (!res.error) {
              this.$showSuccess(
                this,

                'Cập nhật chương trình nhắn tin thành công'
              )
              this.toggle()
              this.$emit('success')
            }
          })
          .catch((errors) => {
            // Exceptions
            // this.app.wait.end('loadingGroupUser')
            this.openLoading = false
          })
      }, 1000)
      //}
    },

    checkValidate() {
      let hasErrors = false
      if (
        this.$isNullOrEmpty(this.campaign_name) ||
        (this.campaign_name != null &&
          this.$isNullOrEmpty(this.campaign_name.trim()))
      ) {
        hasErrors = true
        this.campaignNameError = ['Vui lòng nhập tên chương trình']
      }
      if (this.$isNullOrEmpty(this.customer_id)) {
        this.customerIdError = ['Vui lòng chọn khách hàng']
        hasErrors = true
      }
      if (!this.$isNullOrEmpty(this.customer_id)) {
        if (this.$isNullOrEmpty(this.brandname_id)) {
          this.brandNameError = ['Vui lòng chọn Brandname']
          hasErrors = true
        }
      }
      if (this.$isNullOrEmpty(this.customer_id)) {
        this.brandNameError = ['Vui lòng chọn Brandname']
        hasErrors = true
      }

      if (this.$isNullOrEmpty(this.business_id)) {
        this.businessIdError = ['Vui lòng chọn lĩnh vực kinh doanh']
        hasErrors = true
      }
      if (this.$isNullOrEmpty(this.sms_id)) {
        this.smsError = ['Vui lòng chọn loại tin nhắn']
        hasErrors = true
      }
      if (this.$isNullOrEmpty(this.content)) {
        this.contentError = ['Vui lòng nhập nội dung']
        hasErrors = true
      }
      if (this.date_start > this.date_end) {
        this.startDateError = ['Thời gian bắt đầu lớn hơn thời gian kết thúc']
        hasErrors = true
      }
      if (this.array_file_name.length <= 0) {
        this.errormsg = true
        hasErrors = true
      }
      if (!hasErrors) {
        this.send()
      }
    },

    reset() {
      this.campaign_name = null
      this.customer_id = null
      this.brandname_id = null
      this.business_id = null
      this.sms_id = null
      this.phone_test = null
      this.date_start = moment().format('YYYY-MM-DD')
      this.date_end = moment().format('YYYY-MM-DD')
      this.content = null

      this.businessIdError = []
      this.campaignNameError = []
      this.customerIdError = []
      this.brandNameError = []
      this.smsError = []
      this.time_start = null
      this.time_end = null
      this.contentError = []
      this.errormsg = false
      this.content_mobile = null
    },
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
    showTablePrice() {
      this.showTablePriceErrors = ''
      if (this.brandname_id == null) {
        this.showTablePriceErrors = 'Chưa chọn lĩnh vực kinh doanh'
      }
      if (this.sms_id == null) {
        if (this.showTablePriceErrors != '') {
          this.showTablePriceErrors += ', '
        }
        this.showTablePriceErrors += 'Chưa chọn loại tin nhắn'
      }
      if (this.showTablePriceErrors != '') {
        return
      }
      this.openTablePriceCurrent = true
    },
    onChangedBusiness() {
      this.showTablePriceErrors = ''
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.list_source = Constants.System.Campaign.list_source
        this.listsLanguage = Constants.System.Campaign.listsLanguage
        this.contentType = this.dataDetail.contentType
        this.openAddLink = false
        this.campaignNameError = []
        this.customerIdError = []
        this.brandNameError = []
        this.businessIdError = []
        this.contentError = []
        this.customerDataSelect()
        this.customer_id = this.dataDetail.customerId
        this.brandnameDataSelectOfCustomer(this.dataDetail.customerId)
        this.list_customer = []
        this.list_brandname = []
        this.menu_date_start = false
        this.menu_date_end = false
        this.time_start = null
        this.time_end = null
        this.smsError = []
        this.content_mobile = this.dataDetail.contentFinal
        this.data_file = []

        this.campaign_code = this.dataDetail.campaignCode
        this.campaign_name = this.dataDetail.name
        this.brandname_id = this.dataDetail.brandnameId
        if (this.brandname_id != null) {
          this.typeSmsAndBussinessOfBrandname(this.brandname_id)
        }
        this.business_id = this.dataDetail.typeBusinessId
        this.sms_id = this.dataDetail.typeSmsId
        this.phone_test = this.dataDetail.phoneTest
        this.content = this.dataDetail.content
        //this.time_frame = this.dataDetail.frameTime
        this.amountFragmentSms = this.dataDetail.amountFragmentSms
        this.date_start = moment(
          this.dataDetail.startTime,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')
        this.date_end = moment(
          this.dataDetail.endTime,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY-MM-DD')

        if (
          this.dataDetail.frameTime != null &&
          this.dataDetail.frameTime != ''
        ) {
          this.arr_frame = []
          var frameTime = this.dataDetail.frameTime

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

        if (this.sms_id != null) {
          this.updateInfoTypeSmsDetail(this.sms_id)
        }

        setTimeout(() => {
          if (this.$refs.foo != undefined) {
            this.arr_file = JSON.parse(this.dataDetail.fileAbout)
            // let arr = []
            this.array_file_name = []

            for (let index = 0; index < this.arr_file.length; index++) {
              this.array_file_name.push(this.arr_file[index].name)
            }
            // this.array_file_name = arr
            this.$refs.foo.pushArrFile(this.arr_file)
          }
        }, 500)

        // this.changeContent()\
        this.errormsg = false
        this.showTablePriceErrors = ''
      }
    },
    date_start(val) {
      if (this.date_start > this.date_end) {
        this.startDateError = ['Thời gian bắt đầu lớn hơn thời gian kết thúc']
      } else if (this.date_start === this.date_end) {
        this.startDateError = []
      } else if (this.date_start < this.date_end) {
        this.startDateError = []
      }
    },
    date_end(val) {
      if (this.date_start === this.date_end) {
        this.startDateError = []
      } else if (this.date_start > this.date_end) {
        this.startDateError = ['Thời gian bắt đầu lớn hơn thời gian kết thúc']
      } else {
        this.startDateError = []
      }
    },
  },
}
</script>
<style lang="scss">
.information {
  background-color: #f6f9fd;
  border: 1px solid #eaeaea;
}

.required {
  color: red;
}
</style>
