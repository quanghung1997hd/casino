import Vue from 'vue'
import Notifications from 'vue-notification'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import Vue2Editor from 'vue2-editor'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VueQuillEditor from 'vue-quill-editor'
import VueApexCharts from 'vue-apexcharts'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import CKEditor from 'ckeditor4-vue'
Vue.component('apexchart', VueApexCharts)

Vue.use(CKEditor)
Vue.use(Vue2Editor)
Vue.use(PerfectScrollbar)
Vue.use(Notifications)
Vue.use(VueQuillEditor)
const sizeStyle = Quill.import('attributors/style/size')
sizeStyle.whitelist = [
  '6px',
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '30px',
  '32px',
  '36px',
]
Quill.register(sizeStyle, true)

import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme)
