<template>
  <div>
    <v-dialog
      :value="open"
      :max-width="1320"
      @click:outside="toggle"
      @keydown="$event.key === 'Escape' && toggle()"
    >
      <v-card>
        <v-card-title class="border-title-dialog"
          >Cập nhật danh sách tài khoản
          <v-btn
            @click="toggle"
            icon
            style="position: absolute; top: 0; right: 0"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text style="max-height: 700px; overflow: auto" class="pb-0">
          <v-row class="ma-0" justify="center">
            <v-col cols="12">
              <div class="primary--text fs-14 pt-3" style="font-weight: 500">
                Chọn tài khoản:
              </div>
              <v-data-table
                :headers="headers"
                :items="itemsData"
                :items-per-page="pageSize"
                hide-default-footer
                loading-text="Xin chờ"
                no-results-text="Không có kết quả phù hợp"
                no-data-text="Không có dữ liệu"
                class="elevation-0 custom_header_table"
                fixed-header
                light
              >
                <template v-slot:item="data">
                  <tr>
                    <td>{{ data.item.fullName }}</td>
                    <td>{{ data.item.email }}</td>
                    <td>{{ data.item.workPhoneNumber }}</td>
                    <td>{{ data.item.userName }}</td>
                    <td>
                      <div class="d-flex align-center justify-center">
                        <v-checkbox
                          :true-value="1"
                          :false-value="0"
                          color="success"
                          @change="changeValue(data.item)"
                          :input-value="checkValueInput(data.item)"
                          class="ma-0"
                          hide-details=""
                        ></v-checkbox>
                      </div>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn text height="30px" class="secondary" @click="toggle">
            <div class="font_size text-none">Đóng</div>
          </v-btn>
          <v-btn text height="30px" class="primary" @click="submit">
            <div class="font_size text-none">Cập nhật</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Constants from '~/assets/configurations/constant'

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    itemGroup: {
      type: Object,
      required: false,
    },
  },
  computed: {
    headers() {
      return Constants.System.User.headerAccG
    },
  },
  data() {
    return {
      itemsDataSelect: [],
      pageSize: 50,
      ArrRoles: [],
      itemsData: [],
      listSelectUser: [],
      dataDetail: null,
      arr: [],
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },

    changeValue(item) {
      this.arr = []
      let checkIncludes = this.itemsDataSelect.find((i) => i.id === item.id)
      if (checkIncludes) {
        for (let i = 0; i < this.itemsDataSelect.length; i++) {
          if (this.itemsDataSelect[i].id == checkIncludes.id) {
            this.itemsDataSelect.splice(i, 1)
          }
        }
      } else {
        this.itemsDataSelect.push(item)
      }
      this.itemsDataSelect.map((item) => {
        this.arr.push(item.id)
      })
      this.listSelectUser = this.arr
    },
    checkValueInput(item) {
      let checkIncludes = this.itemsDataSelect.find((i) => i.id === item.id)
      if (checkIncludes) {
        return 1
      } else {
        return 0
      }
    },
    async setSelectedItem(item) {
      let arr = []
      let response = await this.$getGroupUser(item.id)
      if (response.data.error.code === 0) {
        response.data.data.pageRoles.map((item) => {
          item.roles.split(',').map((i) => {
            arr.push({ id: item.id.toString(), roles: i })
          })
        })
      }
      this.ArrRoles = arr
      this.itemsDataSelect = response.data.data.users
      this.dataDetail = response.data.data.group
      if (!this.$isNullOrEmpty(response.data.data.users)) {
        response.data.data.users.map((item) => {
          this.listSelectUser.push(Number(item.id))
        })
      }
    },
    async submit() {
      let arr = []
      this.listSelectUser.map((item) => {
        arr.push({ id: item })
      })
      let data = {
        group: {
          id: this.dataDetail.id,
          groupName: this.dataDetail.groupName,
          description: this.dataDetail.description,
        },
        pageRoles: this.ArrRoles,
        users: arr,
      }
      this.$store
        .dispatch('groupUsers/updateGroupUser', data)
        .then((res) => {
          if (res.data.error.code === 0) {
            this.$showSuccess(this, 'Cập nhật nhóm tài khoản thành công')
            this.toggle()
            this.$store.dispatch('app/GetRole', { menuId: 1 })
            this.$emit('success')
          }
        })
        .catch((errors) => {})
    },

    getListUser() {
      this.itemsData = []
      this.$store
        .dispatch('utility/commonUser')
        .then((res) => {
          if (res.data.error.code === 0) {
            this.itemsData = res.data.data
            this.pageSize = res.data.data.length
          }
        })
        .catch((errors) => {})
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.ArrRoles = []
        this.itemsData = []
        this.listSelectUser = []
        this.itemsDataSelect = []
        this.dataDetail = null
        this.arr = []
        this.getListUser()
        this.setSelectedItem(this.itemGroup)
      }
    },
  },
}
</script>
<style lang="scss">
.data-table-seclect-account {
  .v-data-table__wrapper {
    overflow-y: hidden !important;
  }
}

.information {
  background-color: #f6f9fd;
  border: 1px solid #eaeaea;
}
</style>
