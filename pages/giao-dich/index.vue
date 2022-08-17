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
import customer from '~/components/giao-dich/khach-hang/index.vue'
import internal from '~/components/giao-dich/noi-bo/index.vue'

export default {
  transition: 'slide-x-transition',
  components: {
    internal,
    customer,
  },
  head() {
    return {
      title: 'Danh sách giao dịch',
    }
  },
  data: () => ({
    permission: 1,
  }),
}
</script>
