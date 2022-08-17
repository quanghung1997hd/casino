<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1000px"
    persistent
  >
    <div
      style="
        width: 150px;
        height: 100px;
        position: absolute;
        left: 50%;
        margin-left: -50px;
      "
      class="text-center"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="#3BA8E7"
        indeterminate
      ></v-progress-circular>
      <h3 style="color: white; padding-top: 5px">Đang xử lý...</h3>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  name: 'Loading.global.vue',
  methods: {
    toggle() {
      this.$emit('toggle')
    },
  },
}
</script>

<style scoped></style>
