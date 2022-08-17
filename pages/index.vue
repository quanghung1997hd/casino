<template>
  <div>
    <div>
      <v-btn class="text-none primary" @click="emitSearch">Lưu</v-btn>
    </div>
    <client-only>
      <line-chart :key="updated" :chartData="chartData" :chartOptions="options"></line-chart>
    </client-only>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        updated: 0,
        chartData: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July"
          ],
          datasets: [
            {
              label: "Data One",
              borderColor: "#FC2525",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "white",
              data: [40, 39, 10, 40, 39, 80, 40]
            },
            {
              label: "Data Two",
              borderColor: "#05CBE1",
              pointBackgroundColor: "white",
              pointBorderColor: "white",
              borderWidth: 1,
              data: [60, 55, 32, 10, 2, 12, 53]
            }
          ]
        },
        options: {responsive: true, maintainAspectRatio: false}
      };
    },

    created() {
    },
    mounted() {
    },

    methods: {
      emitSearch() {
        this.chartData.datasets = [
          {
            label: "Data One",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            data: [50, 39, 10, 40, 39, 80, 50]
          },
          {
            label: "Data Two",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            data: [60, 55, 32, 10, 2, 12, 53]
          }
        ];
        this.updated++
      }
    },
    transition: 'slide-x-reverse-transition',
  }
</script>
<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .main_container {
    .main_data_table {
      .theme--light.v-data-table.v-data-table--fixed-header thead th {
        background-color: #0065bd !important;
        color: white !important;
      }
    }

    .main_data_table1 {
      .theme--light.v-data-table.v-data-table--fixed-header thead th {
        background-color: #0065bd !important;
        color: white !important;
      }
    }

    .divider-vertical-oranges {
      width: 3px !important;
      height: 12px;
      background-color: #ff9a16;
    }
  }

  .border-right {
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }

  .border-r-bt {
    border-right: thin solid rgba(0, 0, 0, 0.12);
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }

  .boder-bt {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }

  .max-height-title-card {
    min-height: 25px;
    max-height: 25px;
  }
</style>
