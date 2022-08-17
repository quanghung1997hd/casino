<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Xem chi tiết chiến dịch gửi tin
      </div>
    </CardGlobal>
    <CardGlobal class="mt-2">
      <v-row class="ma-0 pt-3" no-gutters>
        <v-col cols="3">
          <div class="text-center black--text fw-500 fs-16">
            Mã: {{ campaignDetailData.campaignCode }}
          </div>
        </v-col>
        <v-col cols="3">
          <div class="text-center black--text fw-500 fs-16">
            Mã đối tác: {{ campaignDetailData.customerCode }}
          </div>
        </v-col>
        <v-col cols="3">
          <div class="text-center black--text fw-500 fs-16">
            Tên: {{ campaignDetailData.name }}
          </div>
        </v-col>
        <v-col cols="3">
          <div class="text-center black--text fw-500 fs-16">
            Tên khách hàng: {{ campaignDetailData.customerName }}
          </div>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="12">
          <v-expansion-panels
            class="elevation-0"
            flat
            style="border-radius: 10px"
            v-model="panel"
            multiple
          >
            <v-expansion-panel style="border-radius: 10px" class="px-2">
              <v-expansion-panel-header class="px-2 py-0">
                <v-row class="ma-0" no-gutters>
                  <v-col cols="12">
                    <span style="font-size: 1.1rem; font-weight: 500">
                      I. THÔNG TIN KHÁCH HÀNG
                    </span>
                  </v-col>
                  <v-col cols="12" class="mt-2">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0">
                <CutomerInfo :customerInfo="campaignDetailData"></CutomerInfo>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel style="border-radius: 10px" class="px-2">
              <v-expansion-panel-header class="px-2 py-0">
                <v-row class="ma-0" no-gutters>
                  <v-col cols="12">
                    <span style="font-size: 1.1rem; font-weight: 500">
                      II. DANH SÁCH THUÊ BAO
                    </span>
                  </v-col>
                  <v-col cols="12" class="mt-2">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0">
                <SubscriberList :customerInfor="customerInfo"></SubscriberList>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel style="border-radius: 10px" class="px-2">
              <v-expansion-panel-header class="px-2 py-0">
                <v-row class="ma-0" no-gutters>
                  <v-col cols="12">
                    <span style="font-size: 1.1rem; font-weight: 500">
                      III. THỐNG KÊ BẢNG GIÁ & KẾT QUẢ
                    </span>
                  </v-col>
                  <v-col cols="12" class="mt-2">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0">
                <PriceAndResults></PriceAndResults>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </CardGlobal>
    <CardGlobal style="position: sticky; bottom: 0; z-index: 10" class="mt-2">
      <v-row class="ma-0" justify="center">
        <v-col class="col-auto py-0">
          <v-btn depressed @click="openConfirm" class="primary text-none"
            >Phê duyệt</v-btn
          >
        </v-col>
        <v-col class="col-auto py-0">
          <v-btn depressed @click="back" class="secondary text-none"
            >Đóng</v-btn
          >
        </v-col>
      </v-row>
    </CardGlobal>
    <yes-no-alert
      :open="openDialogConfirm"
      :alert-msg="'Bạn có chắc chắn muốn duyệt chương trình này?'"
      @toggle="openDialogConfirm = !openDialogConfirm"
      @OK="confirm"
    />
  </div>
</template>
<script>
import CutomerInfo from '~/components/campaign/detail/CutomerInfo.vue'
import SubscriberList from '~/components/campaign/detail/SubscriberList.vue'
import PriceAndResults from '~/components/campaign/detail/PriceAndResults'
export default {
  data() {
    return {
      panel: [0, 1, 2],
      campaignDetailData: {
        campaign: {},
        customer: {},
      },
      customerInfo: null,
      openDialogConfirm: false,
    }
  },
  components: {
    PriceAndResults,
    CutomerInfo,
    SubscriberList,
  },
  transition: 'slide-x-transition',
  created() {},
  mounted() {
    if (this.$isNullOrEmpty(this.$store.state.campaign.idCampaign)) {
      window.history.back()
    } else {
      this.campaignDetail()
    }
  },
  methods: {
    confirm() {
      let data = {
        id: this.$store.state.campaign.idCampaign,
        status: 2,
        content: '',
      }
      this.$store
        .dispatch('campaign/campaignApprove', data)
        .then((response) => {
          if (!response.error) {
            if (response.data.data.resultCode == 0) {
              this.$showWarnNotify(this, response.data.data.message)
            } else {
              this.$showSuccess(this, response.data.data.message)
              this.back()
            }
          }
        })
        .catch((errors) => {})
    },
    openConfirm(data) {
      this.openDialogConfirm = true
    },
    back() {
      window.history.back()
    },
    campaignDetail() {
      let data = {
        id: this.$store.state.campaign.idCampaign,
      }
      this.$store
        .dispatch('campaign/campaignDetail', data)
        .then((res) => {
          if (!res.error) {
            this.campaignDetailData = res.data.data
            this.customerInfo = res.data.data
          }
        })
        .catch((errors) => {})
    },
  },
}
</script>
<style lang="scss">
.v-expansion-panel-content__wrap {
  padding-bottom: 0 !important;
}
i.v-icon.notranslate.mdi.mdi-chevron-down.theme--light {
  color: black;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 35px !important;
}
</style>
