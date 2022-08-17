<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="330px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Thêm link liên kết</v-card-title
      >
      <v-container class="pt-5 pb-3" fluid>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="content"
              label="Nội dung hiển thị"
              outlined
              dense
              light
              clearable
            />
          </v-col>

          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="link"
              label="Liên kết"
              outlined
              dense
              light
              clearable
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary">
          <div class="text-none" @click="add">OK</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Hủy bỏ</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    setLink: {
      type: Function,
    },
  },
  data: () => ({
    content: null,
    link: null,
  }),
  watch: {
    open(value) {
      if (value) {
      }
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.content = null
      this.link = null
    },
    add() {
      this.setLink(this.content, this.link)
      this.$emit('toggle')
      this.reset()
    },
  },
}
</script>
