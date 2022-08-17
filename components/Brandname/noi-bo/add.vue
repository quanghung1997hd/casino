<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="1000px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Thêm mới Brandname
      </v-card-title>
      <v-card-text style="max-height: calc(100vh - 14rem); overflow-x: hidden">
        <v-container class="pt-8 pb-3" fluid>
          <v-row>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-text-field
                v-model="brandName"
                label="Tên Brandname *"
                outlined
                dense
                light
                clearable
                @input="brandNameErrors = []"
                :error-messages="brandNameErrors"
                @keydown.space="preventLeadingSpace"
              />
            </v-col>

            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-autocomplete
                v-model="partner"
                :items="Listcutomers"
                :error-messages="partnerErrors"
                label="Khách hàng sở hữu Brandname *"
                class="fs-14"
                no-data-text="Không có dữ liệu"
                outlined
                dense
                light
                @input="partnerErrors = []"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-select
                v-model="status"
                :items="listStatus"
                label="Trạng thái "
                dense
                class="fs-14"
                light
                outlined
                readonly
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="4" class="py-0">
              <v-text-field
                v-model="unitRequest"
                label="Đơn vị yêu cầu khai báo"
                outlined
                dense
                light
                clearable
                @keydown.space="preventLeadingSpace"
              />
            </v-col>
          </v-row>

          <!-- Loại tin nhắn -->
          <div class="mt-5 mb-2 black--text fs-16">
            Loại tin nhắn <span class="red--text">*</span>
          </div>
          <v-row class="ma-0" align="center" justify="center">
            <v-col
              cols="12"
              class="pt-0"
              v-for="(i, index) in listTypeSms"
              :key="`${i.name}--${i.id}--${index}`"
            >
              <v-checkbox
                hide-details
                class="ma-0"
                :input-value="i.isSelect"
                :true-value="1"
                :false-value="0"
                @change="checkTypeSms(i)"
              >
                <template v-slot:label>
                  <div class="black--text fs-14">{{ i.name }}</div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <div
            v-if="typeSmsError"
            class="v-messages theme--light error--text mt-1"
            role="alert"
          >
            <div class="v-messages__wrapper">
              <div class="v-messages__message">Vui lòng chọn loại tin nhắn</div>
            </div>
          </div>

          <!-- lĩnh vực kinh doanh -->
          <div class="mt-5 mb-2 black--text fs-16">
            Lĩnh vực kinh doanh <span class="red--text">*</span>
          </div>
          <v-row class="ma-0" align="center" justify="center">
            <v-col
              cols="12"
              class="pt-0"
              v-for="(item, index) in listBusiness"
              :key="`${item.name}--${index}`"
            >
              <v-checkbox
                hide-details
                class="ma-0"
                :input-value="item.isSelect"
                :true-value="1"
                :false-value="0"
                @change="checkBusiness(item)"
              >
                <template v-slot:label>
                  <div class="black--text fs-14">{{ item.name }}</div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <div
            v-if="businessError"
            class="v-messages theme--light error--text mt-1"
            role="alert"
          >
            <div class="v-messages__wrapper">
              <div class="v-messages__message">
                Vui lòng chọn lĩnh vực kinh doanh
              </div>
            </div>
          </div>
          <!-- nhà mạng -->
          <div class="mt-5 mb-2 black--text fs-16">
            Nhà mạng <span class="red--text">*</span>
          </div>
          <v-row class="ma-0" align="center" justify="center">
            <v-col
              cols="12"
              class="pt-0"
              v-for="(item, index) in listNetwork"
              :key="`${item.name}--${index}`"
            >
              <v-checkbox
                hide-details
                class="ma-0"
                :input-value="item.isSelect"
                :true-value="1"
                :false-value="0"
                @change="checkNetwork(item)"
              >
                <template v-slot:label>
                  <div class="black--text fs-14">{{ item.name }}</div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
          <div
            v-if="networkError"
            class="v-messages theme--light error--text mt-1"
            role="alert"
          >
            <div class="v-messages__wrapper">
              <div class="v-messages__message">Vui lòng chọn nhà mạng</div>
            </div>
          </div>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary" @click="checkValidate">
          <div class="text-none">Lưu</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="reset">
          <div class="text-none">Nhập lại</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Hủy bỏ</div>
        </v-btn>
      </v-card-actions>
      <loading :open="openLoading"></loading>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import loading from '~/components/Loading.global'
import Constants from '~/assets/configurations/constant'

const today = moment(new Date()).format('YYYY-MM-DD')
export default {
  props: ['open'],
  components: {
    loading,
  },
  data: () => ({
    brandName: null,
    brandNameErrors: [],
    openLoading: false,
    partner: null,
    unitRequest: null,
    partnerErrors: [],
    unitRequestErrors: [],

    status: 0,
    listStatus: Constants.System.Brandname.listStatus,
    Listcutomers: [],

    valueCheckTypeSms: [],
    valuecheckBusiness: [],
    valuecheckNetwork: [],
    listTypeSms: [],
    listNetwork: [],
    listBusiness: [],
    typeSmsError: false,
    networkError: false,
    businessError: false,
    isNetWork: {},
  }),
  watch: {
    open(value) {
      if (value) {
        this.getListCustomers()
        this.getListNetwork()
        this.getListBusiness()
        this.getListTypeSms()
      }
    },
  },
  methods: {
    getListNetwork() {
      this.$store.dispatch('brandname/listNetworkActive', {}).then((res) => {
        if (res.data.error.code === 0) {
          this.listNetwork = []
          res.data.data.map((item) => {
            this.listNetwork.push({
              id: item.id,
              name: item.name,
              isSelect: 0,
            })
          })
        }
      })
    },
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault()
      else if (e.target.value[0] == ' ')
        e.target.value = e.target.value.replace(/^\s*/, '')
    },

    checkNetwork(item) {
      if (item.isSelect == 1) {
        item.isSelect = 0
      } else {
        item.isSelect = 1
      }
      if (item.isSelect == 1) {
        this.valuecheckNetwork.push(item.id)
        this.networkError = false
      } else {
        let index = this.valuecheckNetwork.findIndex((i) => i == item.id)
        this.valuecheckNetwork.splice(index, 1)
      }
    },

    getListBusiness() {
      this.$store
        .dispatch('configPrice/businessSelectDataActive', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listBusiness = []
            res.data.data.map((item) => {
              this.listBusiness.push({
                id: item.id,
                name: item.name,
                isSelect: 0,
              })
            })
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    checkBusiness(item) {
      if (item.isSelect == 1) {
        item.isSelect = 0
      } else {
        item.isSelect = 1
      }
      if (item.isSelect == 1) {
        this.valuecheckBusiness.push(item.id)
        this.businessError = false
      } else {
        let index = this.valuecheckBusiness.findIndex((i) => i == item.id)
        this.valuecheckBusiness.splice(index, 1)
      }

      if ((this.valuecheckBusiness || []).length === 0) {
        this.businessError = true
      }
    },
    getListTypeSms() {
      this.$store
        .dispatch('configPrice/typeSmsSelectDataActive', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            this.listTypeSms = []
            res.data.data.map((item) => {
              this.listTypeSms.push({
                id: item.id,
                name: item.name,
                isSelect: 0,
              })
            })
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    // check loại tin nhắn
    checkTypeSms(item) {
      if (item.isSelect == 1) {
        item.isSelect = 0
      } else {
        item.isSelect = 1
      }
      if (item.isSelect == 1) {
        this.valueCheckTypeSms.push(item.id)
        this.typeSmsError = false
      } else {
        let index = this.valueCheckTypeSms.findIndex((i) => i == item.id)
        this.valueCheckTypeSms.splice(index, 1)
      }
      if ((this.valueCheckTypeSms || []).length === 0) {
        this.typeSmsError = true
      }
    },
    getListCustomers() {
      this.$store
        .dispatch('campaign/customerDataSelect', {})
        .then((res) => {
          if (res.data.error.code === 0) {
            res.data.data.map((item) => {
              if (item.customerName !== null) {
                this.Listcutomers.push({
                  text: item.customerName,
                  value: item.id,
                })
              }
            })
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.brandName = null
      this.partner = null
      this.unitRequest = null
      this.status = 0
      this.brandNameErrors = []
      this.partnerErrors = []
      this.valuecheckNetwork = []
      this.valuecheckBusiness = []
      this.valueCheckTypeSms = []
      this.getListCustomers()
      this.getListNetwork()
      this.getListBusiness()
      this.getListTypeSms()
      this.typeSmsError = false
      this.networkError = false
      this.businessError = false
    },

    checkValidate() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.brandName)) {
        hasErrors = true
        this.brandNameErrors = ['Tên BrandName không được để trống']
      } else if (this.brandName.trim() == '') {
        hasErrors = true
        this.brandNameErrors = ['Không được để trống']
      }
      if (this.$isNullOrEmpty(this.partner)) {
        hasErrors = true
        this.partnerErrors = ['Vui lòng chọn Tên khách hàng ']
      }
      if ((this.valueCheckTypeSms || []).length === 0) {
        hasErrors = true
        this.typeSmsError = true
      }
      if ((this.valuecheckBusiness || []).length === 0) {
        hasErrors = true
        this.businessError = true
      }
      if ((this.valuecheckNetwork || []).length === 0) {
        hasErrors = true
        this.networkError = true
      }

      if (!hasErrors) {
        let strNetworkIdList = []
        strNetworkIdList = this.valuecheckNetwork

        let data = {
          brandnameName: this.brandName,
          strNetworkIdList: strNetworkIdList.join(),
        }
        this.$store
          .dispatch('brandname/checkValidBrandname', data)
          .then((res) => {
            if (res.data.error.code === 0) {
              if (res.data.data.resultCode === 0) {
                this.brandNameErrors = [`${res.data.data.message}`]
                hasErrors = true
              } else {
                hasErrors = false
                this.add()
              }
            }
          })
          .catch((errors) => {
            // Exceptions
            // this.app.wait.end('loadingGroupUser')
          })
      }
    },
    add() {
      this.openLoading = true
      const networkId = []
      const businessId = []
      const smsId = []
      for (let i = 0; i < this.valuecheckNetwork.length; i++) {
        networkId.push(this.valuecheckNetwork[i])
      }
      for (let i = 0; i < this.valuecheckBusiness.length; i++) {
        businessId.push(this.valuecheckBusiness[i])
      }
      for (let i = 0; i < this.valueCheckTypeSms.length; i++) {
        smsId.push(this.valueCheckTypeSms[i])
      }
      setTimeout(() => {
        this.$store
          .dispatch('brandname/addBrandname', {
            name: this.brandName,
            customer_id: this.partner,
            status: this.status,
            unitRequest: this.unitRequest,
            smsId,
            businessId,
            networkId,
          })
          .then((response) => {
            this.openLoading = false
            if (response.data.error.code === 0) {
              if (response.data.data.resultCode === 1) {
                this.$showSuccess(this, 'Thêm mới brandname thành công')
                this.toggle()
                this.$emit('success')
              } else if (response.data.data.resultCode === 0) {
                this.$showWarnNotify(this, 'Đối tác đã có Brandname')
              }
            }
          })
          .catch(() => {
            // Exceptions
            // this.app.wait.end('loadingGroupUser')
            this.openLoading = false
          })
          .catch((e) => {
            this.$log.debug(e)
          })
          .finally(() => {})
      }, 1000)
    },
  },
}
</script>
