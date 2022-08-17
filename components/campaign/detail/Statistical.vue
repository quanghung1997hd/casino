<template>
  <v-row class="ma-0">
    <v-col cols="12">
      <span style="font-size: 1.1rem; font-weight: 500"> BẢNG GIÁ </span>
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
              {{ $formatMoney({ amount: data.item.networkPrice }) }}
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
      headers: Constants.System.Campaign.headerPrice1,
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
