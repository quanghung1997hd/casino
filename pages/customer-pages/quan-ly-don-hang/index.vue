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
import customer from '~/components/don-hang/khach-hang/index.vue'
import internal from '~/components/don-hang/noi-bo/index.vue'
import Constants from '~/assets/configurations/constant'
const now = new Date()

export default {
  transition: 'slide-x-transition',
  components: {
    internal,
    customer,
  },
  head() {
    return Constants.System.Orders.title
  },
  data: () => ({
    permission: 2,
  }),
}
</script>
