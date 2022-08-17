<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Danh sách tiến trình
      </div>
    </CardGlobal>
    <v-row class="ma-0">
      <v-col cols="12" class="pb-0 px-0">
        <v-card class="w-100" flat>
          <client-only>
            <v-data-table
              :headers="headers"
              :items="Listitem"
              :items-per-page="Listitem.length"
              hide-default-footer
              loading-text="Xin chờ"
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              class="elevation-0 custom_header_table"
              fixed-header
              light
            >
              <template v-slot:[`item.stt`]="{ item }">
                <div class="d-flex align-center justify-center">
                  {{ getItemIndex(item) }}
                </div>
              </template>

              <template v-slot:[`item.status`]="{ item }">
                <v-chip
                  v-if="item.status == 'Đang chạy'"
                  small
                  outlined
                  color="primary"
                  >Đang chạy</v-chip
                >
                <v-chip
                  v-if="item.status == 'Tạm dừng'"
                  small
                  outlined
                  color="orange"
                  >Tạm dừng</v-chip
                >
              </template>
            </v-data-table>
          </client-only>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import Constants from "~/assets/configurations/constant";

export default {
  transition: 'slide-x-transition',
  components: {},
  data: () => ({
    status: null,
    Listitem: [],
    getItemIndex(item) {
      return this.Listitem.indexOf(item) + 1
    },
    headers: Constants.System.Process.headers
  }),

  mounted() {
    this.getListProcess()
  },

  methods: {
    getListProcess() {
      this.$store
        .dispatch('process/getListProcess')
        .then((res) => {
          if (res.data.error.code === 0) {
            this.Listitem = res.data.data
          }
        })
        .catch((errors) => {})
    },
  },
}
</script>
