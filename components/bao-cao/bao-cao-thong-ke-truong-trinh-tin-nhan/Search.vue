<template>
  <v-dialog
    :value="open"
    :max-width="500"
    @click:outside="toggle"
    @keydown="$event.key === 'Escape' && toggle()"
  >
    <v-card>
      <v-card-title class="border-title-dialog">
        Mở rộng tìm kiếm
        <v-btn
          @click="toggle"
          icon
          style="position: absolute; top: 0; right: 0"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pb-2 py-4">
        <v-row class="ma-0">
          <v-col cols="12" class="pb-0">
            <v-select
              outlined
              dense
              no-data-text="Không có dữ liệu"
              label="Tên chương trình"
              v-model="programName"
              :items="listProgramName"
            ></v-select>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-select
              outlined
              dense
              no-data-text="Không có dữ liệu"
              label="Lĩnh vực kinh doanh"
              v-model="fieldName"
              :items="listFieldName"
            ></v-select>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-select
              outlined
              no-data-text="Không có dữ liệu"
              dense
              label="Loại tin nhắn"
              v-model="typeMessage"
              :items="listTypeMessage"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="text-none secondary" depressed @click="toggle"
          >Đóng</v-btn
        >

        <v-btn class="text-none primary" depressed @click="emitSearch"
          >Lưu</v-btn
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
  },
  data() {
    return {
      programName: null,
      listProgramName: [],
      fieldName: null,
      listFieldName: [],
      typeMessage: null,
      listTypeMessage: [],
    }
  },
  methods: {
    emitSearch() {
      let data = {
        taxCode: this.taxCode,
        businessRegistrationNumber: this.businessRegistrationNumber,
        contractType: this.contractType,
        startDate: this.startDate,
        endDate: this.endDate,
      }
      this.$emit('search', data)
    },
    toggle() {
      this.$emit('toggle')
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.programName = null
        this.listProgramName = []
        this.fieldName = null
        this.listFieldName = []
        this.typeMessage = null
        this.listTypeMessage = []
      }
    },
  },
}
</script>
