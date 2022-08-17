<template>
  <div>
    <v-dialog
      :value="open"
      @keydown="$event.key === 'Escape' && toggle()"
      max-width="1000px"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title
          >Thêm mới tài khoản
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
            <v-col cols="12" class="px-0 px-md-3 py-md-0">
              <v-row class="ma-0">
                <v-col cols="12" class="pa-0">
                  <div
                    style="color: #0077ff"
                    class="information font-weight-medium fs-16 py-1 pl-2 pl-md-10"
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
                        ></v-text-field>
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
            <div class="font_size text-none">Thêm</div>
          </v-btn>
          <v-btn text height="30px" class="secondary" @click="toggle">
            <div class="font_size text-none">Hủy</div>
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
  },
  components: {
    loading,
  },
  computed: {
    SelectDate() {
      return moment(this.date).format('DD/MM/YYYY')
    },
  },
  data() {
    return {
      listGroupUser: [],
      groupUser: null,
      userNameErrors: [],
      userName: null,
      address: null,
      approvalStatus: 0,
      activeSatatus: 0,
      openLoading: false,
      Room: null,
      menu: false,
      date: firstDate,
      list_position: [],
      list_getPositionTitles: [],
      List_department: [],
      showPass: false,
      showreTypePass: false,
      email: null,
      emailErrors: [],
      positionType: null,

      name: null,
      nameErrors: [],
      position: null,
      positionErrors: [],
      pass: null,
      passErrors: [],
      retypePass: null,
      retypePassErrors: [],
      positionTitles: null,
      department: null,
      phone: null,
      phoneErrors: [],
      officePhone: null,
      checkShow: false,
      information: null,
      avatar: null,
      file: null,
      avatarError: false,
      sex: 0,
      list_sex: Constants.System.User.list_sex,
      listDepartment: [],
      attaches: [],
      check_save: null,
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
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
      if (this.$isNullOrEmpty(this.userName)) {
        hasError = true
        this.userNameErrors = ['Vui lòng nhập tên đăng nhập']
      } else if (this.userName.length <= 4) {
        hasError = true
        this.userNameErrors = ['Tên đăng nhập không được ít hơn 5 kí tự']
      }
      if (this.$isNullOrEmpty(this.name)) {
        hasError = true
        this.nameErrors = ['Vui lòng nhập họ và tên']
      }

      if (this.$isNullOrEmpty(this.pass)) {
        hasError = true
        this.passErrors = ['Vui lòng nhập mật khẩu']
      } else if (this.pass.length <= 4) {
        hasError = true
        this.passErrors = ['Mật khẩu không được ít hơn 5 kí tự']
      }
      if (!hasError) {
        this.add_user()
      }
    },
    reset() {
      this.userName = null
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
    add_user() {
      this.openLoading = true
      var listGroupId = ''
      if (this.groupUser != null && this.groupUser.length > 0) {
        for (var i = 0; i < this.groupUser.length; i++) {
          var groupId = this.groupUser[i].id
          if (i == 0) {
            listGroupId += groupId
          } else {
            listGroupId += ',' + groupId
          }
        }
      }
      const data = {
        userName: this.userName,
        password: this.pass,
        fullName: this.name,
        groupIdList: listGroupId,
      }
      setTimeout(() => {
        this.$store
          .dispatch('users/addByManager', data)
          .then((res) => {
            this.openLoading = false
            if (!res.error) {
              if (res.data.data.resultCode == 0) {
                this.$showWarnNotify(this, res.data.data.message)
              } else {
                this.$showSuccess(this, res.data.data.message)
                this.toggle()
                this.$emit('success')
              }
            }
          })
          .catch((errors) => {})
      }, 1000)
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.approvalStatus = 0
        this.activeSatatus = 0
        this.Room = null
        this.menu = false
        this.date = firstDate
        this.list_position = []
        this.list_getPositionTitles = []
        this.List_department = []
        this.showPass = false
        this.showreTypePass = false
        this.email = null
        this.emailErrors = []
        this.positionType = null
        this.userNameErrors = []
        this.userName = null
        this.name = null
        this.nameErrors = []
        this.position = null
        this.positionErrors = []
        this.pass = null
        this.passErrors = []
        this.retypePass = null
        this.retypePassErrors = []
        this.positionTitles = null
        this.sex = 0
        this.department = null
        this.phone = null
        this.phoneErrors = []
        this.officePhone = null
        this.checkShow = false
        this.information = null
        this.avatar = null
        this.file = null
        this.avatarError = false
        this.listDepartment = []
        this.attaches = []
        this.check_save = null
        this.groupUser = null
        this.getListGroupUser()
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
