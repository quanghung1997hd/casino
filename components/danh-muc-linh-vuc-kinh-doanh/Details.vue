<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="700px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Chi tiết danh mục lĩnh vực kinh doanh
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0 black--text">
          <v-col cols="6" class="pt-5">
            <div>
              <span class="fw-500"> Tên lĩnh vực kinh doanh:</span>
              <span>{{ name }}</span>
            </div>
          </v-col>
          <v-col cols="6" class="pt-5">
            <div>
              <span class="fw-500"> Mã lĩnh vực kinh doanh :</span>
              <span>{{ code }}</span>
            </div>
          </v-col>
          <v-col cols="12">
            <div>
              <span class="fw-500"> Mô tả :</span>
              <span>{{ description }}</span>
            </div>
          </v-col>
          <v-col class="col-auto">
            <div>
              <span class="fw-500"> Trạng thái :</span>
              <span v-if="status === 1">Hoạt động</span>
              <span v-else>Ngừng hoạt động</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="secondary text-none" depressed @click="toggle"
          >Đóng</v-btn
        >
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
    dataItem: {
      type: Object,
    },
  },
  data() {
    return {
      name: null,
      nameError: [],
      code: null,
      codeError: [],
      description: null,
      status: 1,
    }
  },

  methods: {
    toggle() {
      this.$emit('toggle')
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.nameError = []
        this.codeError = []
        this.code = this.dataItem.code
        this.name = this.dataItem.name
        this.status = this.dataItem.status
        this.description = this.dataItem.description
      }
    },
  },
}
</script>
