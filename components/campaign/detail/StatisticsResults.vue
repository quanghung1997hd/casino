<template>
  <v-row class="ma-0">
    <v-col cols="12">
      <span style="font-size: 1.1rem; font-weight: 500">
        THỐNG KÊ KẾT QUẢ
      </span>
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
            <td>
              {{ data.item.networkName }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalPhone }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalPhoneTest }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalSendSuccess }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalSendFail }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalNotSend }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalCollectMoney }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalCollectedMoney }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalRefundMoney }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalRefundedMoney }) }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import Constants from '~/assets/configurations/constant'

export default {
  data() {
    return {
      panel: [0, 1],
      headers: Constants.System.Campaign.headerResults,
      Listitem: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let data = {
        campaignId: this.$store.state.campaign.idCampaign,
      }
      this.$store.dispatch('campaign/smsPrice', data).then((res) => {
        if (!res.error) {
          this.Listitem = res.data.data
        }
      })
    },
  },
}
</script>
