<template>
  <v-row>
    <v-col cols="4" sm="4" md="4" align="center" justify="center">
      <v-card raised class="mx-auto" height="100%">
        <v-card-title outlined class="d-flex">
          <span class="v-toolbar__title">Nhóm tài khoản</span>
          <v-spacer></v-spacer>
          <client-only>
            <v-btn
              color="primary"
              v-if="checkRole(Rules.System.GroupUser.actions.add)"
              @click="setNewItem"
              >Thêm mới</v-btn
            >
          </client-only>
        </v-card-title>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                dense
                label="Tìm kiếm"
                single-line
                v-model="search"
                outlined
                hide-details
                placeholder="Tìm kiếm"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <client-only>
                <v-data-table
                  :headers="headerGroup"
                  :loading="$wait.is('loadingGroupUser')"
                  :items="$store.state.groupUsers1.groupList"
                  :search="search"
                  :item-per-page="$store.state.groupUsers1.groupList.length"
                  no-data-text="Không có nhóm nào"
                  no-results-text="Không có kết quả phù hợp"
                  loading-text="Xin chờ"
                  disable-pagination
                  sort-by="group_name"
                  class="elevation-1"
                  hide-default-header
                  hide-default-footer
                  light
                >
                  <template v-slot:item="{ item }">
                    <template>
                      <tr
                        :class="{
                          'row-active white--text font-weight-bold':
                            item.group_id === selectedId,
                        }"
                      >
                        <td class="text-left" @click="setSelectedItem(item)">
                          {{ item.group_name }}
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
  </v-row>
</template>
<script>
import Rules from '~/assets/configurations/Rules'
import Constants from '~/assets/configurations/constant'

export default {
  transition: 'slide-x-reverse-transition',
  data: () => ({
    Rules,
    headerGroup: Constants.System.User.headerGroup,
    headerPage: Constants.System.User.headerPage,
    headerFunc: Constants.System.User.headerFunc,
    itemPerPage: 100,
    search: '',
    singleSelect: false,
  }),

  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.GroupUser.id,
        actionId
      )
      return isAllowed
    },
  },
}
</script>
<style>
#action-close {
  position: absolute;
  top: 0;
  right: 0;
}
.row-active {
  background-color: #46a9ff !important;
}
.scroll {
  overflow-y: auto;
}
</style>
