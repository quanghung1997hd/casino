<template>
  <v-row class="mt-4">
    <v-col cols="6" style="padding-top: 20px">
      <span style="font-size: 1.1rem; font-weight: 500">
        Danh sách thuê bao test
      </span>
    </v-col>
    <v-col v-if="campaign.status == 2" cols="6">
      <v-btn
        v-if="stateTest == 0"
        depressed
        color="success"
        class="text-none"
        @click="reqRunTest"
        >Test chương trình nhắn tin</v-btn
      >
      <v-btn
        v-if="stateTest == 3"
        depressed
        color="success"
        class="text-none"
        @click="confirmTestEnd"
        >Xác nhận hoàn thành test</v-btn
      >
      <v-chip
        v-if="stateTest == 4"
        label
        color="successNotify"
        text-color="white"
      >
        Đã hoàn thành test
      </v-chip>
      <v-chip
        v-if="stateTest == 2"
        label
        color="successNotify"
        text-color="white"
      >
        Đang chạy test chương trình nhắn tin
      </v-chip>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="Listitem"
        hide-default-footer
        loading-text="Xin chờ"
        sort-by="stt"
        no-results-text="Không có kết quả phù hợp"
        no-data-text="Không có dữ liệu"
        class="elevation-0 custom_header_table"
        fixed-header
        light
      >
        <template v-slot:item="data">
          <tr>
            <td class="text-center">
              {{ data.index + 1 }}
            </td>
            <td class="text-center">
              {{ data.item.phone }}
            </td>
            <td>
              {{ data.item.networkName }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.price }) }}
            </td>
            <td class="text-center">
              {{ data.item.sentDate }}
            </td>
            <td class="text-center">
              <v-chip
                outlined
                small
                color="warning"
                v-if="data.item.status == 0"
              >
                Chưa gửi
              </v-chip>
              <v-chip
                outlined
                small
                v-if="data.item.status == 1"
                color="success"
              >
                Đang gửi
              </v-chip>
              <v-chip
                outlined
                small
                v-if="data.item.status == 2"
                color="warning"
              >
                Thất bại
              </v-chip>
              <v-chip outlined small v-if="data.item.status == 3" color="green">
                Thành công
              </v-chip>
              <v-chip
                outlined
                small
                v-if="data.item.status == 4"
                color="warning"
              >
                Timeout
              </v-chip>
            </td>
            <td class="text-center">
              <v-chip
                outlined
                small
                v-if="data.item.statusPayment == 1"
                color="success"
              >
                Đã thanh toán
              </v-chip>
              <v-chip
                outlined
                small
                v-if="data.item.statusPayment == 0"
                color="warning"
              >
                Chưa thanh toán
              </v-chip>
            </td>
            <td class="text-center">{{ data.item.errorDescription }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <loading :open="openLoading"></loading>
  </v-row>
</template>
<script>
import Constants from '~/assets/configurations/constant'
import loading from '~/components/Loading.global'

export default {
  components: {
    loading,
  },
  data() {
    return {
      openLoading: false,
      campaign: {},
      stateTest: null,
      panel: [0, 1],
      headers: Constants.System.Campaign.headerSms,
      Listitem: [],
    }
  },
  mounted() {
    this.campaignDetail()
    this.getList()
  },
  methods: {
    campaignDetail() {
      let data = {
        id: this.$store.state.campaign.idCampaign,
      }
      this.$store.dispatch('campaign/campaignDetail', data).then((res) => {
        if (!res.error) {
          this.campaign = res.data.data
          this.stateTest = res.data.data.stateTest
        }
      })
    },
    getList() {
      let data = {
        campaign_id: this.$store.state.campaign.idCampaign,
      }
      this.$store.dispatch('campaign/smsTest', data).then((res) => {
        if (!res.error) {
          this.Listitem = res.data.data
        }
      })
    },
    confirmTestEnd() {
      this.$store
        .dispatch('campaign/confirmTestEnd', {
          campaignId: this.$store.state.campaign.idCampaign,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, res.data.data.message)
            this.toggle()
            this.$emit('success')
            this.stateTest = 4
          }
        })
    },
    reqRunTest() {
      this.$store
        .dispatch('campaign/runTest', {
          campaignId: this.$store.state.campaign.idCampaign,
        })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, res.data.data.message)
            this.toggle()
            this.$emit('success')
            this.stateTest = 2
          }
        })
    },

    toggle() {
      this.$emit('toggle')
    },
  },
}
</script>
