<template>
  <v-dialog
    :value="open"
    :max-width="500"
    @click:outside="toggle"
    @keydown="$event.key === 'Escape' && toggle()"
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Mở rộng tìm kiếm
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pb-3 pt-3">
        <v-row class="ma-0">
          <v-col cols="12">
            <v-select
              no-data-text="Không có dữ liệu"
              dense
              hide-details=""
              v-model="status"
              label="Trạng thái"
              outlined
              clearable
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              no-data-text="Không có dữ liệu"
              dense
              hide-details=""
              v-model="sms_type"
              label="Loại quảng cáo"
              outlined
              clearable
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              dense
              hide-details=""
              v-model="campaign_code"
              label="Mã chương trình"
              outlined
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              dense
              hide-details=""
              v-model="tax_code"
              label="Mã số thuế"
              outlined
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              no-data-text="Không có dữ liệu"
              dense
              hide-details=""
              v-model="business_id"
              label="Lĩnh vực kinh doanh"
              outlined
              clearable
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none secondary" depressed @click="toggle"
          >Đóng</v-btn
        >
        <v-btn class="text-none primary" depressed @click="emitSearch"
          >Lưu</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      business_id: null,
      openDialogFilter: false,
      date: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
      openDialogAdd: false,
      customer_code: null,
      customer_name: null,
      sms_type: null,
      campaign_code: null,
      tax_code: null,
      start_date: null,
      end_date: null,
      status: null,
      business: null,
    }
  },
  methods: {
    emitSearch() {
      let data = {
        status: this.status,
        sms_type: this.sms_type,
        campaign_code: this.campaign_code,
        tax_code: this.tax_code,
        business_id: this.business_id,
      }
      this.$emit('search', data)
    },
    toggle() {
      this.$emit('toggle')
    },
    resetData() {
      this.business_id = null
      this.openDialogFilter = false
      this.date = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
      this.openDialogAdd = false
      this.customer_code = null
      this.customer_name = null
      this.sms_type = null
      this.campaign_code = null
      this.tax_code = null
      this.start_date = null
      this.end_date = null
      this.status = null
      this.business = null
    },
  },
}
</script>
