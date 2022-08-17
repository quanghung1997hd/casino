<template>
  <v-row class="ma-0">
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
              {{ data.item.networkName }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.totalPhone }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.networkPrice }) }}
            </td>
            <td class="text-center">
              {{ $formatMoney({ amount: data.item.networkPriceApprove }) }}
            </td>
            <td class="text-center">
              {{
                $formatMoney({
                  amount:
                    data.item.validPhoneNumber *
                    data.item.networkPriceApprove *
                    data.item.amountFragmentSms,
                })
              }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" class="fw-500 py-0" style="font-size: 15px">
      <v-row class="ma-0">
        <v-col cols="3" class="py-2"> HÌNH THỨC THANH TOÁN </v-col>
        <v-col cols="2" class="py-2"> Trả Trước </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="3" class="py-2"> CHI PHÍ DỰ TÍNH </v-col>
        <v-col cols="2" class="py-2">
          {{ $formatMoney({ amount: this.estimatedPrice }) }}
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="3" class="py-2"> SỐ DƯ HIỆN TẠI </v-col>
        <v-col cols="2" class="py-2">
          {{ $formatMoney({ amount: this.balanceMoney }) }}
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import Constants from '~/assets/configurations/constant'

export default {
  data() {
    return {
      panel: [0, 1],
      headers: Constants.System.Campaign.headerPrice,
      Listitem: [],
      estimatedPrice: null,
      balanceMoney: null,
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
          let totalPrice = 0
          let balanceMoney = 0
          this.Listitem.forEach((p) => {
            totalPrice +=
              p.validPhoneNumber * p.networkPrice * p.amountFragmentSms
            balanceMoney = p.balanceMoney
          })
          this.estimatedPrice = totalPrice
          this.balanceMoney = balanceMoney
        }
      })
    },
  },
}
</script>
