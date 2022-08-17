<template>
  <div>
    <v-dialog :value="open" :max-width="1000" @click:outside="toggle">
      <v-card>
        <v-card-title
          >Cập nhật tài khoản
          <v-btn
            @click="toggle"
            icon
            style="position: absolute; top: 0; right: 0"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pb-0" style="max-height: 700px; overflow: auto">
          <v-row class="ma-0" justify="center">
            <v-col cols="12" class="px-0 py-md-0">
              <v-row class="ma-0">
                <v-col cols="12" class="pa-0">
                  <div
                    style="color: #0077ff"
                    class="information font-weight-medium fs-16 py-1 pl-2 pl-md-2"
                  >
                    Thông tin tài khoản
                  </div>
                  <div class="px-md-10 px-2 py-3">
                    <v-row>
                      <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
                        <div class="fs-13 pb-1 font-weight-medium">
                          Tên đăng nhập <span class="red--text">*</span>
                        </div>
                        <v-text-field
                          v-model="userName"
                          outlined
                          dense
                          light
                          :error-messages="userNameErrors"
                          @input="userNameErrors = []"
                          readonly
                        ></v-text-field>
                        <!--  -->
                      </v-col>
                      <v-col cols="12" md="6" class="pb-0 pt-0 pt-md-3">
                        <div class="fs-13 pb-1 font-weight-medium">
                          Mật khẩu <span class="red--text">*</span>
                        </div>
                        <v-text-field
                          outlined
                          dense
                          light
                          v-model="pass"
                          :error-messages="passErrors"
                          @input="passErrors = []"
                          prepend-inner-icon="mdi-lock "
                          @click:append="showPass = !showPass"
                          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPass ? 'text' : 'password'"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <div
                    style="color: #0077ff"
                    class="information font-weight-medium fs-16 py-1 pl-2 pl-md-10"
                  >
                    Thông tin cá nhân
                  </div>
                  <div class="px-md-10 px-2 py-3">
                    <v-row>
                      <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
                        <div class="fs-13 pb-1 font-weight-medium">
                          Họ và tên <span class="red--text">*</span>
                        </div>
                        <v-text-field
                          outlined
                          dense
                          light
                          v-model="name"
                          :error-messages="nameErrors"
                          @input="nameErrors = []"
                          label="Nhập họ và tên"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
                        <div class="fs-13 pb-1 font-weight-medium">
                          Trạng thái
                        </div>
                        <v-select
                          class="fs-14"
                          outlined
                          dense
                          light
                          :items="list_status"
                          v-model="status"
                          no-data-text="Không có dữ liệu"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <div
                    style="color: #0077ff"
                    class="information font-weight-medium fs-16 py-1 pl-2 pl-md-10"
                  >
                    Nhóm tài khoản
                  </div>
                  <div class="px-md-10 px-2 py-3">
                    <v-row>
                      <v-col cols="12" md="6" class="pb-0 pt-6 pt-md-3">
                        <v-select
                          solo
                          dense
                          :items="listGroupUser"
                          v-model="groupUser"
                          return-object
                          item-text="groupName"
                          item-value="id"
                          chips
                          deletable-chips
                          small-chips
                          multiple
                          flat
                          no-data-text="Không có dữ liệu"
                          class="border-input-1 fs-13 border-radius-5"
                          label=" Nhóm tài khoản"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />
          <v-btn text height="30px" class="primary" @click="submit">
            <div class="font_size text-none">Cập nhật</div>
          </v-btn>
          <v-btn text height="30px" class="secondary" @click="toggle">
            <div class="font_size text-none">Đóng</div>
          </v-btn>
        </v-card-actions>
        <loading :open="openLoading"></loading>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'

const date = new Date()
const firstDate = new Date(
  date.getFullYear() - 21,
  date.getMonth(),
  date.getDate() + 1
)
  .toISOString()
  .substr(0, 10)

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    dataItem: {
      type: Object,
      required: false,
    },
  },
  computed: {
    SelectDate() {
      return moment(this.date).format('DD/MM/YYYY')
    },
  },
  components: {
    loading,
  },
  data() {
    return {
      listGroupUser: [],
      openLoading: false,
      checkApprovalStatus: false,
      groupUser: null,
      address: null,
      approvalStatus: 0,
      activeSatatus: 0,
      Room: null,
      menu: false,
      date: firstDate,
      list_position: [],
      list_getPositionTitles: [],
      List_department: [],
      showPass: false,
      showreTypePass: false,
      email: null,
      userName: null,
      emailErrors: [],
      positionType: [],
      userNameErrors: [],
      name: null,
      nameErrors: [],
      position: null,
      positionErrors: [],
      pass: null,
      passErrors: [],
      retypePass: null,
      retypePassErrors: [],
      positionTitles: null,
      sex: null,
      department: null,
      phone: null,
      phoneErrors: [],
      officePhone: null,
      checkShow: false,
      information: null,
      avatar: null,
      file: null,
      avatarError: false,
      listDepartment: [],
      attaches: [],
      check_save: null,
      list_status: Constants.System.User.list_status,
      status: 1,
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },

    inputFile(e) {
      this.avatarError = false
      this.getBase64(e).then((data) => {
        this.avatar = {
          url: null,
          data: data,
        }
      })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    selectFileOpen() {
      return window.document.getElementById('input_file').click()
    },
    submit() {
      let hasError = false

      if (!hasError) {
        this.add_user()
      }
    },
    reset() {
      this.pass = null
      this.phone = null
      this.officePhone = null
      this.email = null
      this.check_save = 0
      this.name = null
      this.department = null
      this.position = null
      this.positionTitles = null

      this.date = moment().format('YYYY-MM-DD')
    },
    isjQuery(obj) {
      return obj && (obj instanceof jQuery || obj.constructor.prototype.jquery)
    },
    add_user() {
      this.openLoading = true
      var groupUser = this.groupUser
      var listGroupId = ''
      for (var i = 0; i < groupUser.length; i++) {
        var groupId =
          typeof groupUser[i] === 'object' ? groupUser[i].id : groupUser[i]
        if (i == 0) {
          listGroupId += groupId
        } else {
          listGroupId += ',' + groupId
        }
      }

      const data = {
        groupIdList: listGroupId,
        accountId: this.dataItem.user.id,
        passwordNew: this.pass,
        nameNew: this.name,
        status: this.status,
      }
      setTimeout(() => {
        this.$store
          .dispatch('users/updateGroupForAccount', data)
          .then((res) => {
            this.openLoading = false
            if (!res.error) {
              this.$showSuccess(this, 'Cập nhật tài khoản thành công')
              this.toggle()
              this.$emit('success')
            }
          })
          .catch((errors) => {})
      }, 1000)
    },
    detailsAccount() {
      this.$store
        .dispatch('users/get_detail', { userId: this.dataItem.id })
        .then((res) => {
          if (res.data.error.code === 0) {
            this.groupUser = res.data.data.groups
          }
        })
        .catch((errors) => {})
    },
    getListGroupUser() {
      this.$store
        .dispatch('users/groupsOfSystem')
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listGroupUser = res.data.data
          }
        })
        .catch((errors) => {})
    },
    convertLstGroup(dataGroups) {
      if (dataGroups.length > 0) {
        for (let i = 0; i < dataGroups.length; i++) {
          this.groupUser.push(dataGroups[i].id)
        }
      }
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.groupUser = []
        if (this.dataItem.approvalStatus === 1) {
          this.checkApprovalStatus = true
        } else {
          this.checkApprovalStatus = false
        }
        this.approvalStatus = this.dataItem.approvalStatus
        this.activeSatatus = this.dataItem.status
        this.Room = null
        this.address = this.dataItem.address
        this.menu = false
        if (!this.$isNullOrEmpty(this.dataItem.birthday)) {
          this.date = moment(
            this.dataItem.birthday,
            'DD/MM/YYYY HH:mm:ss'
          ).format('YYYY-MM-DD')
        }
        this.getListGroupUser()

        this.list_position = []
        this.list_getPositionTitles = []
        this.List_department = []
        this.showPass = false
        this.showreTypePass = false
        this.email = this.dataItem.email
        this.emailErrors = []
        this.positionType = []
        this.userNameErrors = []
        this.nameErrors = []
        this.positionErrors = []
        this.pass = null
        this.passErrors = []
        this.retypePass = null
        this.retypePassErrors = []
        this.sex = this.dataItem.gender
        this.department = null
        this.phone = this.dataItem.workPhoneNumber
        this.phoneErrors = []
        this.officePhone = this.dataItem.personLandlineNumber
        this.checkShow = false
        this.information = this.dataItem.description
        this.avatar = this.dataItem.avatar
        this.file = null
        this.avatarError = false
        this.listDepartment = []
        this.attaches = []
        this.check_save = null
        this.userName = this.dataItem.user.userName
        this.name = this.dataItem.user.fullName
        this.status = this.dataItem.user.status
        this.convertLstGroup(this.dataItem.groups)
      }
    },
  },
}
</script>
<style lang="scss">
.information {
  background-color: #f6f9fd;
  border: 1px solid #eaeaea;
}
</style>
