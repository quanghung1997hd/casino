<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="500px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Bảng giá hiện tại</v-card-title
      >
      <v-container class="pt-5 pb-3" fluid>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="dataTable"
              hide-default-footer
              loading-text="Xin chờ"
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              class="elevation-0 custom_header_table"
              fixed-header
              light
            >
              <template v-slot:item="data">
                <tr>
                  <td class="text-center">
                    {{ data.item.networkName }}
                  </td>
                  <td class="text-center">
                    {{ $formatMoney({ amount: data.item.price }) }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Constants from '~/assets/configurations/constant'

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    typeSmsId: {
      type: Number,
    },
    businessId: {
      type: Number,
    },
  },
  data: () => ({
    headers: Constants.System.Campaign.headerTablePrice,
    dataTable: [],
  }),
  watch: {
    open(value) {
      if (value) {
      }
      this.loadDataTable()
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    loadDataTable() {
      this.$store
        .dispatch('configPrice/priceSms', {
          typeSmsId: this.typeSmsId,
          businessId: this.businessId,
        })
        .then((response) => {
          this.dataTable = response.data.data
        })
    },
  },
}
</script>
