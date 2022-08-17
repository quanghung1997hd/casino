<template>
  <div>
    <CardGlobal>
      <div
        style="font-size: 1.3rem; font-weight: 500"
        class="pa-1 primary--text"
      >
        Nhóm tài khoản
      </div>
    </CardGlobal>
    <v-row class="ma-0">
      <v-col
        cols="4"
        sm="4"
        md="4"
        align="center"
        class="pl-0"
        justify="center"
      >
        <v-card outlined class="mx-auto" height="100%">
          <div outlined class="d-flex pt-3 px-4">
            <div class="v-toolbar__title">Nhóm tài khoản</div>
            <v-spacer></v-spacer>
            <client-only>
              <v-btn
                class="text-none"
                color="primary"
                depressed
                @click="setNewItem"
                height="40"
              >
                Thêm mới
              </v-btn>
            </client-only>
          </div>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="search"
                  dense
                  outlined
                  single-line
                  hide-details
                  placeholder="Tìm kiếm"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="pt-3">
              <v-col cols="12">
                <client-only>
                  <v-data-table
                    :headers="headerGroup"
                    :items="items"
                    :search="search"
                    no-data-text="Không có nhóm nào"
                    no-results-text="Không có kết quả phù hợp"
                    loading-text="Xin chờ"
                    disable-pagination
                    sort-by="groupName"
                    class="elevation-0 custom_header_table"
                    hide-default-header
                    hide-default-footer
                    light
                  >
                    <template v-slot:item="{ item }">
                      <template>
                        <tr
                          :class="{
                            'row-active white--text font-weight-bold':
                              item.id === selectedId,
                          }"
                        >
                          <td
                            :class="{ 'white--text': item.id === selectedId }"
                            class="text-left cp"
                            @click="setSelectedItem(item)"
                          >
                            {{ item.groupName }}
                          </td>
                        </tr>
                      </template>
                    </template>
                  </v-data-table>
                </client-only>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        cols="8"
        sm="8"
        md="8"
        align="center"
        class="pr-0"
        justify="center"
      >
        <v-card flat height="100%">
          <v-tabs
            v-model="tab"
            color="primary"
            grow
            active-class="elevation-12 black--text radius-top lighten-5"
          >
            <v-tab class="text-none">Thông tin nhóm</v-tab>

            <v-tab class="text-none">Tài khoản nhóm</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" class="w-100">
            <!-- Thông tin nhóm-->
            <v-tab-item>
              <v-card outlined height="100%">
                <v-card-title outlined class="d-flex pb-1">
                  <v-spacer></v-spacer>
                  <v-btn
                    depressed
                    color="deep-orange white--text text-none"
                    @click="toggleDeleteDialog"
                    class="mr-3"
                    height="40"
                  >
                    <v-icon class="pr-1" color="white">mdi-delete</v-icon>
                    Xóa
                  </v-btn>
                  <v-btn
                    depressed
                    style="margin-right: 30px !important"
                    class="mr-3 text-none"
                    color="primary"
                    @click="saveItem"
                    height="40"
                  >
                    <v-icon class="pr-1" color="white"
                      >mdi-content-save-all</v-icon
                    >

                    <span v-if="isInsert">Thêm mới</span>
                    <span v-else> Cập nhật </span>
                  </v-btn>
                  <v-btn
                    icon
                    depressed
                    id="action-close"
                    color="white--text"
                    v-if="openEditDialog"
                    @click="toggleEditDialog"
                  >
                    <v-icon color="primary">mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-container fluid>
                    <v-row dense>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          :value="selectedItem.group_name.value"
                          :disabled="!openEditDialog"
                          :error="selectedItem.group_name.invalid"
                          :error-messages="selectedItem.group_name.invalidMsg"
                          dense
                          outlined
                          label="Tên nhóm *"
                          @input="change($event, 'group_name')"
                        ></v-text-field>
                        <v-text-field
                          :value="selectedItem.description.value"
                          outlined
                          dense
                          label="Mô tả *"
                          :error="selectedItem.description.invalid"
                          :error-messages="selectedItem.description.invalidMsg"
                          :disabled="!openEditDialog"
                          @input="change($event, 'description')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense v-if="!isInsert">
                      <v-col cols="6" sm="6" md="6" v-if="openEditDialog">
                        <v-card>
                          <v-data-table
                            v-model="selectedPages"
                            :value="selectedPages"
                            :headers="headerPage"
                            :items="lstPages"
                            :single-select="singleSelect"
                            item-key="page_id"
                            no-data-text="Không có trang nào trong hệ thống."
                            loading-text="Xin chờ"
                            class="custom_header_table custom-scroll-table-group-user-info elevation-0"
                            show-select
                            disable-pagination
                            hide-default-footer
                            fixed-header
                            light
                            @click:row="clickPageRow($event)"
                            @item-selected="selectedPageRow($event)"
                            @toggle-select-all="selectAllPageRows($event)"
                          ></v-data-table>
                        </v-card>
                      </v-col>

                      <v-col cols="6" sm="6" md="6">
                        <v-card>
                          <v-data-table
                            v-model="selectedFuncs"
                            :value="selectedFuncs"
                            :headers="headerFunc"
                            :items="lstSelectedRoles"
                            :single-select="singleSelect"
                            item-key="role_id"
                            no-data-text="Không có chức năng phù hợp"
                            class="custom_header_table custom-scroll-table-group-user-info elevation-0"
                            show-select
                            fixed-header
                            disable-pagination
                            hide-default-footer
                            @toggle-select-all="selectAllFuncRows($event)"
                            @click:row="clickRoleRow($event)"
                            @item-selected="selectedRoleRow($event)"
                          ></v-data-table>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- Tài khoản thuộc nhóm-->
            <v-tab-item v-if="selectedId !== -5">
              <!--          v-if="selectedId !== -1"-->
              <v-data-table
                :headers="headerUser"
                :items="lstUser"
                :items-per-page="itemsPerPage"
                class="custom_header_table custom-scroll-table-group-user"
                sort-by="stt"
                loading-text="Xin chờ"
                no-results-text="Không có kết quả phù hợp"
                no-data-text="Không có dữ liệu"
                hide-default-footer
                fixed-header
                light
                :page.sync="page"
                @page-count="pageCount = $event"
              >
                <template v-slot:top>
                  <v-row class="ma-0" style="width: 100%">
                    <v-col class="col-auto"> Danh sách tài khoản </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="col-auto">
                      <v-btn
                        depressed
                        class="primary"
                        small
                        v-if="itemGroup !== null"
                        @click="openDialogAddAccount = true"
                        >Cập nhật danh sách tài khoản</v-btn
                      >
                    </v-col>
                  </v-row>
                </template>

                <template v-slot:item.stt="{ item }">
                  <div class="d-flex align-center justify-center">
                    {{
                      startIndex +
                      lstUser
                        .map(function (x) {
                          return x.user_id
                        })
                        .indexOf(item.user_id)
                    }}
                  </div>
                </template>
              </v-data-table>
              <!--          v-if="selectedId !== -1"-->
              <pagination
                v-if="selectedId !== -5"
                ref="dsndPagination"
                :page="page"
                :pageCount="pageCount"
                :pageSize="itemsPerPage"
                class="mt-2"
                depressed="true"
                @changePage="changePage($event)"
                @changePageSize="changePageSize($event)"
              ></pagination>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        <!-- Xóa nhóm tài khoản-->
        <yes-no-alert
          :open="openDeleteDialog"
          :alert-msg="deleteMessage"
          @toggle="toggleDeleteDialog"
          @OK="deleteItem"
        ></yes-no-alert>
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
    <InsertAccountToGroupUsers
      @success="setSelectedItem(itemGroup)"
      :itemGroup="itemGroup"
      :open="openDialogAddAccount"
      @toggle="openDialogAddAccount = false"
    ></InsertAccountToGroupUsers>
  </div>
</template>
<script>
import FullscreenDialog from '~/components/FullscreenDialog'
import ConfirmDialog from '~/components/ConfirmDialog'
import { mapState } from 'vuex'
import InsertAccountToGroupUsers from '~/components/nguoi-dung/InsertAccountToGroupUsers.vue'
import Constants from '~/assets/configurations/constant'

export default {
  components: {
    InsertAccountToGroupUsers,
    FullscreenDialog,
    ConfirmDialog,
  },
  transition: 'slide-x-reverse-transition',
  data: () => ({
    search: '',
    openDialogAddAccount: false,
    openConfirmDialog: false,
    confirmMessage: '',
    singleSelect: false,
    selectedPages: [],
    selectedFuncs: [],
    lstSelectedRoles: [],
    openEditDialog: false,
    openDeleteDialog: false,
    deleteMessage: '',
    finalRole: '',
    selectedId: -1000,
    startIndex: 1,
    page: 1,
    pageCount: 1,
    itemsPerPage: 50,
    tab: null,
    itemGroup: null,
    isInsert: false,
  }),
  computed: {
    ...mapState({
      selectedIndex: (state) => state.groupUsers.selectedIndex,
      selectedItem: (state) => state.groupUsers.selectedItem,
      lstPages: (state) => state.groupUsers.lstPages,
      lstRoles: (state) => state.groupUsers.lstRoles,
      items: (state) => state.groupUsers.items,
      lstUser: (state) => state.groupUsers.lstUser,
    }),
    headerGroup() {
      return Constants.System.User.headerGroupIndex
    },
    headerPage() {
      return Constants.System.User.headerPageIndex
    },
    headerFunc() {
      return Constants.System.User.headerFuncIndex
    },
    headerUser() {
      return Constants.System.User.headerUser
    },

    showCurrentRolePage() {
      let str = ''
      this.selectedPages.forEach((p) => {
        let roles = this.selectedFuncs.filter((r) => r.page_id === p.page_id)

        roles.forEach((r0) => {
          str += r0.page_id + '-' + r0.role_id + ','
        })
      })
      return str.substr(0, str.length - 1)
    },
  },
  created() {
    if (!this.$isServer) this.initialize()
  },

  methods: {
    initialize() {
      this.$store.dispatch('groupUsers/setNewItem').then((res) => {})
      this.$store.dispatch('groupUsers/getListItems').then((res) => {})
    },
    checkPageNoRole() {
      let pageNoRole = []
      this.selectedPages.forEach((p) => {
        let roles = this.selectedFuncs.filter((r) => r.page_id === p.page_id)
        if (roles.length == 0) {
          pageNoRole.push(p.page_name)
        }
      })
      return pageNoRole
    },
    change(value, field) {
      this.$store.dispatch('groupUsers/changeValue', { value, field })
    },
    setNewItem() {
      this.$store.dispatch('groupUsers/setNewItem')
      this.selectedId = -5
      this.openEditDialog = true
      this.isInsert = true
    },

    clickPageRow(row, isClick = false) {
      this.lstSelectedRoles = []
      let roles = this.lstRoles.filter((i) => i.page_id === row.page_id)
      roles.forEach((r) => {
        this.lstSelectedRoles.push(r)
      })
      let lstRoleSelected = this.selectedItem.groupPages.filter(
        (i) => i.page_id == row.page_id
      )
      //neu da co role roi thi lam the nay
      //nguoc lai thi chon het cac role trong trang do
      let isHasExistRoleInPage = false
      lstRoleSelected.forEach((r) => {
        let temp = this.selectedFuncs.find(
          (a) => a.page_id == r.page_id && a.role_id == r.role_id
        )
        let tempNameRole = this.lstSelectedRoles.find(
          (b) => b.role_id == r.role_id
        )
        if (tempNameRole != undefined) tempNameRole = tempNameRole.role_name
        //neu chua ton tai role trong selectedFuncs va tim thay
        if (temp == undefined && tempNameRole != undefined && isClick) {
          isHasExistRoleInPage = true
          this.selectedFuncs.push({
            role_id: r.role_id,
            page_id: r.page_id,
            role_name: tempNameRole,
          })
        }
      })
      if (!isHasExistRoleInPage && isClick) {
        roles.forEach((r) => {
          let temp = this.selectedFuncs.find(
            (a) => a.page_id == r.page_id && a.role_id == r.role_id
          )
          if (temp == undefined)
            this.selectedFuncs.push({
              role_id: r.role_id,
              page_id: r.page_id,
              role_name: r.role_name,
            })
        })
      }
    },
    //check chon select all or uncheck all
    selectAllPageRows(row) {
      let pages = []
      let roles = []
      if (row.value) {
        this.lstPages.forEach((p) => {
          pages.push({
            page_name: p.page_name,
            page_id: p.page_id,
          })
        })
        this.lstRoles.forEach((r) => {
          roles.push({
            role_id: r.role_id,
            page_id: r.page_id,
            role_name: r.role_name,
          })
        })
      }

      this.selectedFuncs = roles
      this.selectedPages = pages
    },
    //Neu page duoc chon, thi co the show ra cac role cua no
    //neu page KO duoc chon thi xoa het cac role da co cua no
    selectedPageRow(row) {
      this.clickPageRow(row.item, row.value)
      if (row.value == true) {
      } else {
        //remove het role da chon
        let rolesInPage = this.selectedFuncs.filter(
          (a) => a.page_id == row.item.page_id
        )
        rolesInPage.forEach((r) => {
          let index = this.selectedFuncs.indexOf(r)
          this.selectedFuncs.splice(index, 1)
        })
      }
    },
    //check chon select all or uncheck all cua bang chuc nang
    selectAllFuncRows(row) {
      if (row.items.length <= 0) {
        return
      }
      let page_id = row.items[0].page_id

      let page = this.selectedPages.find((p) => p.page_id == page_id)
      if (!row.value) {
        if (page !== undefined) {
          let idx = this.selectedPages.indexOf(page)
          this.selectedPages.splice(idx, 1)
        }
      } else {
        if (page == undefined) {
          this.selectedPages.push({
            page_id: row.items[0].page_id,
            page_name: row.items[0].page_name,
          })
        }
      }
    },
    //Neu 1 role duoc chon thi check xem page co duoc chon
    //hay ko? Neu ko thi page do duoc them vao selectedPages
    selectedRoleRow(row) {
      if (row.value == true) {
        let page = this.selectedPages.find((p) => p.page_id == row.item.page_id)
        if (page == undefined) {
          this.selectedPages.push({
            page_id: row.item.page_id,
            page_name: this.selectedItem.groupPages.find(
              (p) => p.page_id == row.item.page_id
            ),
          })
        }
      }
    },
    clickRoleRow(row) {
      if (row.role_id != undefined) {
        let func = this.selectedFuncs.find((p) => p.role_id == row.role_id)
        if (func == undefined) {
          //select role
          this.selectedFuncs.push({
            role_id: row.role_id,
            page_id: row.page_id,
            role_name: row.role_name,
          })
          //select role xong phai check page
          let page = this.selectedPages.find((p) => p.page_id == row.page_id)
          if (page == undefined) {
            this.selectedPages.push({
              page_id: row.page_id,
              page_name: this.selectedItem.groupPages.find(
                (p) => p.page_id == row.page_id
              ),
            })
          }
        } else {
          let index = this.selectedFuncs.indexOf(func)
          this.selectedFuncs.splice(index, 1)

          func = this.selectedFuncs.find((p) => p.page_id == row.page_id)
          if (func == undefined) {
            let page = this.selectedPages.find((p) => p.page_id == row.page_id)
            index = this.selectedPages.indexOf(page)
            this.selectedPages.splice(index, 1)
          }
        }
      }
    },
    setSelectedItem(item) {
      this.itemGroup = item
      this.isInsert = false
      this.$store.dispatch('groupUsers/resetValid')
      this.selectedId = item.id
      this.$store
        .dispatch('groupUsers/getGroupUser', item)
        .then((res) => {
          if (res === 1) {
            this.selectedPages = []
            this.selectedFuncs = []
            let pages = this.selectedItem.groupPages

            pages.forEach((p) => {
              if (
                this.selectedPages.find((c) => c.page_id === p.id) == undefined
              )
                this.selectedPages.push({
                  page_id: p.id,
                  page_name: p.pageName,
                })
              //get role da chon truoc

              let arr = p.roles.split(',')
              for (let item = 0; item < arr.length; item++) {
                let tempNameRole = this.lstRoles.find(
                  (b) => b.role_id == arr[item]
                )
                if (tempNameRole != undefined)
                  tempNameRole = tempNameRole.role_name
                if (tempNameRole != null)
                  this.selectedFuncs.push({
                    role_id: arr[item],
                    page_id: p.id,
                    role_name: tempNameRole,
                  })
              }
            }) //end foreach
            this.openEditDialog = true
          }
        })
        .catch((errors) => {})
    },
    saveItem() {
      let pageRole = []
      let pageNoRole = this.checkPageNoRole()
      pageRole = this.showCurrentRolePage.split(',')
      let arr = []
      for (let i = 0; i < pageRole.length; i++) {
        let isPageRole = pageRole[i].split('-')
        arr.push({ id: isPageRole[0], roles: isPageRole[1] })
      }
      this.$store
        .dispatch('groupUsers/saveItem', arr)
        .then((res) => {
          if (res === 1) {
            this.$store.dispatch('app/GetRole', { menuId: 1 })
            if (this.selectedIndex == -1) this.openEditDialog = false
          }
        })
        .catch((errors) => {})
    },
    deleteItem() {
      this.$store
        .dispatch('groupUsers/deleteItem')
        .then((res) => {
          if (res === undefined || res == 0) {
            this.openEditDialog = false
            this.selectedId = -5
          }
        })
        .catch((errors) => {})
    },

    toggleEditDialog() {
      this.selectedId = -5
      this.openEditDialog = !this.openEditDialog
      if (!this.openEditDialog) this.$store.dispatch('groupUsers/unsetItem')
    },
    toggleDeleteDialog() {
      this.openDeleteDialog = !this.openDeleteDialog

      if (this.openDeleteDialog)
        this.deleteMessage = `Bạn có chắc chắn muốn xóa nhóm "${this.selectedItem.group_name.value}" này không?`
    },

    changePageSize(pageSizes) {
      if (pageSizes !== this.itemsPerPage) {
        this.itemsPerPage = pageSizes
        this.page = 1
        this.$refs.dsndPagination.reset()
      }
    },
    changePage(value) {
      this.page = value
    },
  },
}
</script>
<style lang="scss">
#action-close {
  position: absolute;
  top: 0;
  right: 0;
}

.row-active {
  background-color: #3ba8e7 !important;
  td {
    color: white;
  }
}

.scroll {
  overflow-y: auto;
}

.custom-scroll-table-group-user {
  .v-data-table__wrapper {
    max-height: calc(80vh - 208px);
    overflow-y: auto;
  }
}

.custom-scroll-table-group-user-info {
  .v-data-table__wrapper {
    max-height: calc(80vh - 280px);
    overflow-y: auto;
  }
}
</style>
