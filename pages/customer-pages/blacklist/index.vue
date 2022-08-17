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
import customer from '~/components/blacklist/khach-hang/index.vue'
import internal from '~/components/blacklist/noi-bo/index.vue'
import Constants from '~/assets/configurations/constant'

export default {
  transition: 'slide-x-transition',
  components: {
    internal,
    customer,
  },
  head() {
    return Constants.System.Blacklist.title
  },
  data: () => ({
    permission: 2,
  }),
}
</script>
