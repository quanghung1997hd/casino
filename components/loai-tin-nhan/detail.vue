<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1200px"
    persistent
  >
    <v-card>
      <v-card-title class="py-3" style="border-bottom: 1px solid #00754a">
        Chi tiết loại tin nhắn
      </v-card-title>
      <v-container class="pt-8 pb-3" fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="smsType"
              label="Tên loại tin nhắn *"
              outlined
              dense
              light
              readonly
            />
          </v-col>

          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="smsCode"
              label="Mã loại tin nhắn *"
              outlined
              dense
              light
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="prefix"
              label="Hậu tố"
              outlined
              dense
              light
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="suffixes"
              label="Tiền tố"
              outlined
              dense
              light
              readonly
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-select
              v-model="status"
              :items="listStatus"
              label="Trạng thái "
              dense
              readonly
              class="fs-14"
              light
              outlined
            />
          </v-col>
          <v-col cols="12" class="py-0 px-3">
            <span class="fw-500"> Mô tả </span>
            <v-textarea
              rows="3"
              v-model="description"
              outlined
              dense
              readonly
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="font_size">Đóng</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Constants from '~/assets/configurations/constant'

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      items: [],
      Listitem: [],
      page: 1,
      pageCount: 1,
      itemsPerPage: 50,
      status: 0,
      smsType: null,
      smsCode: null,
      prefix: null,
      suffixes: null,
      description: null,

      listStatus: Constants.System.TypeSms.listStatus,
    }
  },
  watch: {
    open(value) {
      if (value) {
        this.smsType = this.data.name
        this.smsCode = this.data.code
        this.prefix = this.data.prefix
        this.suffixes = this.data.suffixes
        this.description = this.data.description
        this.status = this.data.status
      }
    },
  },
  methods: {
    getItemIndex(item) {
      return (
        (this.page - 1) * this.itemsPerPage + this.Listitem.indexOf(item) + 1
      )
    },

    toggle() {
      this.$emit('toggle')
    },
    reset() {},

    changePageSize(pageSizes) {
      if (pageSizes !== this.itemsPerPage) {
        this.itemsPerPage = pageSizes
        this.page = 1
        this.$refs.qlsPagination.reset()
      }
    },
    changePage(value) {
      this.page = value
    },
  },
}
</script>

<style lang="scss">
.v-dialog.v-dialog--active.v-dialog--persistent.v-dialog--scrollable {
  max-height: 100%;
}
.cus-color {
  color: #00754a;
}
</style>
