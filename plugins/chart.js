import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'

const registerComponent = function (name, originalComponent) {
  Vue.component(name, {
    extends: originalComponent,
    mixins: [mixins.reactiveProp],
    props: {
      chartData: {
        type: Object,
        default: () => {},
      },
      chartOptions: {
        type: Object,
        default: () => {},
      },
    },
    mounted() {
      this.renderChart(this.chartData, this.chartOptions)
    },
  })
}

registerComponent('LineChart', Line)
