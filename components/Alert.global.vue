<template>
  <div class="position-absolute-top-right notification pa-2">
    <v-slide-y-transition group>
      <div
        v-for="(notification, idx) in $store.state.notification.notifications"
        :key="`notification-${idx}`"
        class="notification-item"
      >
        <v-alert
          height="40"
          elevation="4"
          :color="notification.color"
          class="black--text pa-1 px-4 align-center d-flex"
        >
          <div class="d-flex white--text fs-14">
            <span style="padding-top: 2px"> {{ notification.text }}</span>
            <span class="pl-2">
              <div @click="dismiss_alert(notification)">
                <v-icon color="white">mdi-close</v-icon>
              </div>
            </span>
          </div>
        </v-alert>
      </div>
    </v-slide-y-transition>
  </div>
</template>
<script>
export default {
  methods: {
    dismiss_alert(notification) {
      this.$store.commit('notification/remove_notification', notification)
    },
  },
}
</script>
<style lang="scss">
.notification {
  z-index: 100000;
  overflow-y: hidden !important;
  overflow-x: visible !important;
  max-height: 100% !important;
  .notification-item {
    cursor: pointer;
  }
}
</style>
