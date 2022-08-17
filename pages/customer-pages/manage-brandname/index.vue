<template>
  <div>
    <div v-if="permission === 1">
      <internal></internal>
    </div>
    <div v-else>
      <customer></customer>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import customer from '~/components/Brandname/khach-hang/index.vue'
import internal from '~/components/Brandname/noi-bo/index.vue'
import Constants from '~/assets/configurations/constant'
const now = new Date()
const firstDate = moment(now).subtract(4, 'days').format('YYYY-MM-DD')
const endDate = moment(now).format('YYYY-MM-DD')

export default {
  transition: 'slide-x-transition',
  components: {
    internal,
    customer,
  },
  head() {
    return Constants.System.Brandname.title
  },
  data: () => ({
    permission: 0,
  }),
}
</script>
