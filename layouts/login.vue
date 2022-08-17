<template>
  <v-app>
    <v-main>
      <v-container class="fill-height align-center" fluid>
        <client-only>
          <notifications
            group="main"
            :duration="7000"
            position="top right"
            :max="5"
          />
        </client-only>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted() {
    // Set the current viewport (To check client device using viewport)
  },
  methods: {},
}
</script>

<style scoped>
body {
  background: white;
}
</style>
