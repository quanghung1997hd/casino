<template>
  <v-chip small outlined :color="status === 1 ? 'primary' : 'warning'">{{
    status === 1 ? 'Kích hoạt' : 'Không kích hoạt'
  }}</v-chip>
</template>

<script>
export default {
  name: 'Status',
  props: ['status'],
}
</script>

<style scoped></style>
