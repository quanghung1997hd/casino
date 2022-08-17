<template>
  <!--    font-family: Roboto, -apple-system, Helvetica Neue, Helvetica, Arial,
        sans-serif;-->
  <v-app
    style="
    font-family: Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
      background: #e8e8e89c;
    "
    :class="
      !showNav && this.$vuetify.breakpoint.width > 1263
        ? 'active'
        : this.$vuetify.breakpoint.width > 1263
        ? 'in-active'
        : ''
    "
  >
    <client-only>
      <notifications
        group="main"
        :duration="7000"
        position="top right"
        :max="5"
      />
      <alert group="main" :duration="7000" position="top center" :max="5" />
    </client-only>
    <!-- {{topmenu}} -->

    <client-only>
      <v-navigation-drawer
        v-if="this.$vuetify.breakpoint.width > 1263"
        :clipped="clipped"
        fixed
        id="menuLeft"
        :width="showNav ? '55px' : '280px'"
        app
        light
        style="background-size: cover"
        :style="
          this.$vuetify.breakpoint.width <= 1263
            ? `background-image: url(${background});z-index:1001`
            : `background-image: url(${background});`
        "
        class="denser-nav"
      >
        <v-row class="ma-0">
          <v-col
            cols="12"
            class="d-flex align-cente justify-center"
            :class="{
              'py-1': !showNav,
              'py-0': showNav,
            }"
          >
            <nuxt-link to="/">
              <v-img
                @click="fullPath = '/'"
                :max-width="showNav ? 40 : 220"
                :min-width="showNav ? 40 : 220"
                :height="showNav ? 62 : 53"
                contain
                :src="showNav ? '/logo/chip.png' : '/logo/chip.png'"
              ></v-img
            ></nuxt-link>
          </v-col>
        </v-row>
        <v-divider color="white" class="mx-4"></v-divider>
        <v-list
          v-if="!showNav"
          nav
          dense
          expand
          class="disabled-active pr-0 pl-4"
        >
          <template v-for="(item, index) in topmenu">
            <v-list-group
              v-if="getMenuByParent(item.id).length > 0"
              :key="index"
              no-action
              :disabled="showNav"
              :value="true"
              @click="show(item)"
              class="white--text"
            >
              <template v-slot:appendIcon v-if="!showNav">
                <v-icon
                  size="16"
                  class="white--text"
                  style="margin-right: 4px"
                  v-if="!item.showMenu"
                  >mdi-minus</v-icon
                >
                <v-icon
                  size="16"
                  class="white--text"
                  style="margin-right: 4px"
                  v-else
                  >mdi-plus</v-icon
                >
              </template>
              <template v-slot:activator>
                <v-list-item-icon class="mr-2">
                  <v-icon color="white" v-text="item.pageIcon" />
                </v-list-item-icon>
                <v-list-item-content v-if="!showNav">
                  <v-list-item-title class="white--text" style="line-height: 2"
                    >{{ item.pageName }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(child1, i) in getMenuByParent(item.id)"
                :key="i"
                :to="child1.pageUrl"
                @click="clickItem(child1.pageUrl)"
                router
                active-class="style-active-menu"
                class="style-menu-item"
                :class="{
                  'style-active-menu':
                    $route.fullPath.split('/')[1] ===
                      child1.pageUrl.split('/')[1] &&
                    fullPath === child1.pageUrl,
                }"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon color="white" v-text="child1.pageIcon" />
                </v-list-item-icon>
                <v-list-item-title v-if="!showNav" class="pt-1 white--text">{{
                  child1.pageName
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              :key="index"
              :to="item.pageUrl"
              @click="fullPath = item.pageUrl"
              :class="{
                'style-active-menu':
                  ($route.fullPath.split('/').length == 3 &&
                    $route.fullPath.split('/')[2] ===
                      item.pageUrl.split('/')[2]) ||
                  ($route.fullPath.split('/').length == 2 &&
                    $route.fullPath.split('/')[1] ===
                      item.pageUrl.split('/')[1]),
              }"
              router
              active-class="style-active-menu"
              class="style-menu-item"
            >
              <v-list-item-icon class="mr-2">
                <v-icon color="white" v-text="item.pageIcon" />
              </v-list-item-icon>
              <v-list-item-title class="white--text" v-text="item.pageName" />
            </v-list-item>
          </template>
        </v-list>

        <v-list v-else nav dense expand class="disabled-active">
          <template v-for="(item, index) in topmenu">
            <!--    -->
            <v-menu
              v-if="getMenuByParent(item.id).length > 0"
              :key="index"
              offset-x
              open-on-hover
              transition="slide-x-transition"
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="pl-2 py-2"
                  flat
                  v-bind="attrs"
                  v-on="on"
                  :color="
                    checkRoute(getMenuByParent(item.id)) ? 'primary' : 'white'
                  "
                  v-text="item.pageIcon"
                >
                </v-icon>
              </template>

              <v-card style="border-radius: 8px">
                <div class="py-2 pl-2 fs-16">
                  {{ item.pageName }}
                </div>
                <v-divider></v-divider>
                <v-list
                  max-width="500"
                  min-width="250"
                  class="py-0"
                  max-height="1000"
                >
                  <v-list-item
                    v-for="(child1, i) in getMenuByParent(item.id)"
                    :key="i"
                    :to="child1.pageUrl"
                    @click="clickItem(child1.pageUrl)"
                    router
                    active-class="style-active-menu-small"
                    class="style-menu-small-item px-0 d-flex align-center"
                  >
                    <v-list-item
                      class="px-0"
                      :key="index"
                      :to="child1.pageUrl"
                      router
                    >
                      <v-icon
                        color="black"
                        class="ml-8"
                        v-text="child1.pageIcon"
                      />

                      <v-list-item-title
                        class="ml-4 mr-2 black--text"
                        v-text="child1.pageName"
                      />
                    </v-list-item>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
            <v-menu
              v-else
              :key="index"
              open-on-hover
              offset-x
              transition="slide-x-transition"
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="pl-2 py-2"
                  flat
                  v-bind="attrs"
                  v-on="on"
                  :color="
                    ($route.fullPath.split('/').length == 3 &&
                      $route.fullPath.split('/')[2] ===
                        item.pageUrl.split('/')[2]) ||
                    ($route.fullPath.split('/').length == 2 &&
                      $route.fullPath.split('/')[1] ===
                        item.pageUrl.split('/')[1])
                      ? '#26c0fe'
                      : 'white'
                  "
                  v-text="item.pageIcon"
                  @click="clickItemNotShowMenu(item.pageUrl)"
                  :to="item.pageUrl"
                >
                </v-icon>
              </template>
            </v-menu>
          </template>
        </v-list>
        <!-- </PerfectScrollbar> -->
      </v-navigation-drawer>
      <v-navigation-drawer
        v-else
        :clipped="clipped"
        fixed
        id="menuLeft"
        v-model="leftDrawer"
        :width="'280px'"
        app
        light
        :style="
          this.$vuetify.breakpoint.width <= 1263
            ? `background-image: url(${background});z-index:1001`
            : `background-image: url(${background});`
        "
        style="background-size: cover"
        class="denser-nav"
      >
        <v-row class="ma-0">
          <v-col cols="12" class="d-flex align-cente justify-center py-1">
            <nuxt-link to="/">
              <v-img
                :max-width="220"
                :min-width="220"
                max-height="53"
                contain
                :src="'/logo/namviet.png'"
              ></v-img
            ></nuxt-link>
          </v-col>
        </v-row>
        <v-divider color="white" class="mx-4"></v-divider>
        <v-list nav dense expand class="disabled-active pr-0 pl-4">
          <template v-for="(item, index) in topmenu">
            <v-list-group
              v-if="getMenuByParent(item.id).length > 0"
              :key="index"
              no-action
              :value="true"
              @click="show(item)"
              class="white--text"
            >
              <template v-slot:appendIcon>
                <v-icon
                  size="16"
                  class="white--text"
                  style="margin-right: 4px"
                  v-if="!item.showMenu"
                  >mdi-minus</v-icon
                >
                <v-icon
                  size="16"
                  class="white--text"
                  style="margin-right: 4px"
                  v-else
                  >mdi-plus</v-icon
                >
              </template>
              <template v-slot:activator>
                <v-list-item-icon class="mr-2">
                  <v-icon color="white" v-text="item.pageIcon" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >{{ item.pageName }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(child1, i) in getMenuByParent(item.id)"
                :key="i"
                :to="child1.pageUrl"
                @click="clickItem(child1.pageUrl)"
                router
                active-class="style-active-menu"
                class="style-menu-item"
                :class="{
                  'style-active-menu':
                    $route.fullPath.split('/')[1] ===
                      child1.pageUrl.split('/')[1] &&
                    fullPath === child1.pageUrl,
                }"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon color="white" v-text="child1.pageIcon" />
                </v-list-item-icon>
                <v-list-item-title class="pt-1 white--text">{{
                  child1.pageName
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-item
              v-else
              :key="index"
              :to="item.pageUrl"
              @click="fullPath = item.pageUrl"
              :class="{
                'style-active-menu':
                  ($route.fullPath.split('/').length == 3 &&
                    $route.fullPath.split('/')[2] ===
                      item.pageUrl.split('/')[2]) ||
                  ($route.fullPath.split('/').length == 2 &&
                    $route.fullPath.split('/')[1] ===
                      item.pageUrl.split('/')[1]),
              }"
              router
              active-class="style-active-menu"
              class="style-menu-item"
            >
              <v-list-item-icon class="mr-2">
                <v-icon color="white" v-text="item.pageIcon" />
              </v-list-item-icon>
              <v-list-item-title class="white--text" v-text="item.pageName" />
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
    </client-only>
    <v-main>
      <v-row
        id="header"
        class="ma-0"
        no-gutters
        :style="
          leftDrawer && this.$vuetify.breakpoint.width > 1263
            ? `width: calc(100% - ${menuLeftWidth}px);`
            : `width: 100%;`
        "
        style="position: fixed; z-index: 13"
        align="center"
      >
        <v-col cols="12">
          <v-card
            flat
            style="border-bottom: 1px solid #b1b0b096; border-radius: 0"
            class="d-flex align-center"
          >
            <v-app-bar-nav-icon
              class="ml-2"
              v-if="this.$vuetify.breakpoint.width > 1263"
              @click.stop="showNavigation"
            />
            <v-app-bar-nav-icon
              class="ml-2"
              v-else
              @click.stop="leftDrawer = !leftDrawer"
            />

            <v-row class="ma-0" align="center" style="width: 100% !important">
              <v-spacer></v-spacer>
              <v-col
                class="col-auto d-flex align-center"
                v-if="breakpoint !== 'desktop'"
              >
                <v-app-bar-nav-icon @click.stop="rightDrawer = !rightDrawer" />
              </v-col>
              <v-col
                class="col-auto d-flex align-center"
                v-if="breakpoint === 'desktop'"
              >
                <v-avatar size="38">
                  <v-img v-if="avatar !== null" :src="avatar"></v-img>

                  <v-img src="/images/login-success.png"></v-img>
                </v-avatar>
              </v-col>
              <v-col
                class="col-auto mr-7 pl-0 d-flex align-center"
                v-if="breakpoint === 'desktop'"
              >
                <div>
                  <div class="d-flex align-center" style="font-weight: 500">
                    <span
                      class="fs-14"
                      style="color: #645f5f"
                      v-if="$store.state.app.requestObjectType"
                    >
                      {{ $store.state.app.requestObjectType.name }}
                    </span>
                    <span>
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <div
                            v-bind="attrs"
                            v-on="on"
                            class="d-flex align-center"
                          >
                            <v-icon color="primary2">mdi-menu-down</v-icon>
                          </div>
                        </template>
                        <v-list dense style="min-width: 250px !important">
                          <v-row class="mx-3 my-0">
                            <v-col cols="12" class="pb-1"
                              ><div class="black--text fs-13">
                                Tài khoản
                              </div></v-col
                            >
                            <v-col cols="12" class="pt-0">
                              <div class="primary--text fs-16">
                                <nuxt-link
                                  v-if="typeCustomer.includes(',CUSTOMER,')"
                                  to="/thong-tin-ca-nhan"
                                  style="text-decoration: none"
                                >
                                  {{ username }}</nuxt-link
                                >
                                <template v-else>{{ username }}</template>
                              </div>
                            </v-col>
                          </v-row>
                          <v-divider class="primary"></v-divider>

                          <v-list-item
                            class="d-flex align-center"
                            v-if="typeCustomer.includes(',CUSTOMER,')"
                          >
                            <v-list-item-icon class="mx-0">
                              <v-icon size="23">mdi-account-eye</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="ml-1">
                              <nuxt-link
                                to="/thong-tin-ca-nhan"
                                style="text-decoration: none"
                                >Thông tin tài khoản</nuxt-link
                              >
                            </v-list-item-title>
                          </v-list-item>

                          <v-list-item
                            @click="toggleChangePass"
                            class="d-flex align-center"
                          >
                            <v-list-item-icon class="mx-0">
                              <v-icon size="23">mdi-lock-reset</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="ml-1"
                              >Đổi mật khẩu</v-list-item-title
                            >
                          </v-list-item>
                          <v-list-item
                            @click="logout"
                            class="d-flex align-center"
                          >
                            <v-list-item-icon class="mx-0">
                              <v-icon size="23">mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="ml-1"
                              >Đăng xuất</v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </span>
                  </div>
                  <div class="fs-12" v-if="$store.state.app.requestObjectType">
                    {{ fullname }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-container
        fluid
        :style="
          breakpoint === 'desktop'
            ? 'margin-top:70px'
            : `margin-top:${offsetHeightHeader}px`
        "
        class="px-0 pt-1 pb-4 pb-md-0"
        style="max-width: 99%; margin-bottom: 40px"
      >
        <nuxt />
      </v-container>
      <v-row
        id="header"
        class="ma-0"
        no-gutters
        style="position: absolute; z-index: 13; width: 100%; bottom: 0px"
        align="center"
      >
        <v-col cols="12">
          <v-card
            flat
            style="border-bottom: 1px solid #b1b0b096; border-radius: 0"
            :style="`background-size: cover;background-position: center;`"
            class="d-flex align-center justify-center"
          >
            <div class="text--center py-1 fs-13 pl-2 pl-md-0"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-main>

    <v-navigation-drawer
      style="z-index: 1001"
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <template v-slot:prepend>
        <v-list dense style="min-width: 250px !important">
          <v-row class="mx-3 my-0">
            <v-col cols="12" class="pb-1"
              ><div class="black--text fs-13">Chào ông / bà</div></v-col
            >
            <v-col cols="12" class="pt-0">
              <div class="primary--text fs-16">
                {{ username }}
              </div>
            </v-col>
          </v-row>
          <v-divider class="primary"></v-divider>
          <v-list-item @click="toggleChangePass" class="d-flex align-center">
            <v-list-item-icon class="mx-0">
              <v-icon size="23">mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-1">Đổi mật khẩu</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout" class="d-flex align-center">
            <v-list-item-icon class="mx-0">
              <v-icon size="23">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-1">Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <Dialog
      :open="openChangePass"
      :CRUD="allowAccess"
      dialogName="Đổi mật khẩu tài khoản"
      max_width="600px"
      @toggle="toggleChangePass"
      @actionsUser="changePass"
      :success="!openChangePass"
    >
      <v-container fluid class="pb-0">
        <v-col>
          <v-text-field
            :value="selectedItem.password.value"
            @input="change($event, 'password')"
            :error="selectedItem.password.invalid"
            :error-messages="selectedItem.password.invalidMsg"
            dense
            outlined
            class="mt-3"
            ref="password"
            label="Mật khẩu cũ *"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            :value="selectedItem.newPass.value"
            @input="change($event, 'newPass')"
            :error="selectedItem.newPass.invalid"
            :error-messages="selectedItem.newPass.invalidMsg"
            dense
            outlined
            ref="password"
            label="Mật khẩu mới *"
            :type="showNewPassword ? 'text' : 'password'"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showNewPassword = !showNewPassword"
          />
          <v-text-field
            :value="selectedItem.reNewPass.value"
            @input="change($event, 'reNewPass')"
            :error="selectedItem.reNewPass.invalid"
            :error-messages="selectedItem.reNewPass.invalidMsg"
            dense
            outlined
            ref="password"
            label="Nhập lại mật khẩu mới *"
            :type="showReNewPassword ? 'text' : 'password'"
            :append-icon="showReNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showReNewPassword = !showReNewPassword"
          />
        </v-col>
      </v-container>
    </Dialog>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie'
import utility from '~/store/utility'

import commonController from '~/store/commonController'
import moment from 'moment'
import Rules from '~/assets/configurations/Rules'

export default {
  //middleware: 'auth',
  components: {},
  data() {
    return {
      openChangePass: false,
      Rules,

      showNav: true,
      background: '/background/anh_bg.jpg',
      backgroundFT: '/background/FT.png',
      Button: this.$route.fullPath,
      fullname: null,
      requestObjectTypeName: null,
      showInput: false,
      drawer: false,
      indexPage: null,
      clipped: true,
      rightDrawer: false,
      checkLogin: false,
      right: true,
      leftDrawer: true,
      offsetHeightHeader: null,
      menuLeftWidth: null,
      token: null,
      avatar: null,
      positionName: null,
      fullPath: this.$route.fullPath,
      title: null,
      style: null,
      typeCustomer: `${Cookies.get('strListGroup')}`,
      username: `${Cookies.get('username')}`,
      selectedItem: {
        password: {
          value: '',
          invalid: false,
          invalidMsg: '',
        },
        newPass: {
          value: '',
          invalid: false,
          invalidMsg: '',
        },
        reNewPass: {
          value: '',
          invalid: false,
          invalidMsg: '',
        },
      },
      allowAccess: true,
      showPassword: false,
      showNewPassword: false,
      showReNewPassword: false,
    }
  },
  created() {
    // users/get_detail
    if (!Cookies.get('token')) {
      if (this.$route.query.token) {
        Cookies.set('token', this.$route.query.token)
      }
    }

    this.getDetailUser()
    this.$store.dispatch('app/GetRole', {
      menuId: 1,
      showOnMobile: null,
    })
  },

  computed: {
    breakpoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mobile'
        case 'sm':
          return 'mobile'
        case 'md':
          return 'mobile'
        case 'lg':
          return 'desktop'
        case 'xl':
          return 'desktop'
      }
    },

    topmenu() {
      return this.getMenuByParent(0)
    },
    checkButton: {
      get() {
        return this.Button
      },
      set() {
        this.Button = this.$route.fullPath
      },
    },
  },
  mounted() {
    this.commonRequestObjectType()
    this.offsetHeightHeader = document.getElementById('header').offsetHeight

    this.menuLeftWidth = 55
    if (!this.$isServer) {
      if (Cookies.get('token')) {
        this.checkLogin = true
      }
    }
  },

  methods: {
    toggleChangePass() {
      this.selectedItem = {
        password: {
          value: '',
          invalid: false,
          invalidMsg: '',
        },
        newPass: {
          value: '',
          invalid: false,
          invalidMsg: '',
        },
        reNewPass: {
          value: '',
          invalid: false,
          invalidMsg: '',
        },
      }
      this.openChangePass = !this.openChangePass
      this.rightDrawer = false
      this.showPassword = false
      this.showNewPassword = false
      this.showReNewPassword = false
    },
    change(value, field) {
      this.selectedItem[field] = {
        ...this.selectedItem[field],
        value,
        invalid: false,
        invalidMsg: '',
      }
    },
    setInvalid(payload) {
      this.selectedItem[payload.field] = {
        ...this.selectedItem[payload.field],
        invalid: true,
        invalidMsg: payload.message,
      }
    },
    async changePass() {
      let error = false
      if (this.selectedItem.password.value === '') {
        error = true
        this.setInvalid({
          field: 'password',
          message: 'Vui lòng nhập mật khẩu cũ',
        })
      }
      if (this.selectedItem.newPass.value === '') {
        error = true
        this.setInvalid({
          field: 'newPass',
          message: 'Vui lòng nhập mật khẩu mới',
        })
      } else if (this.selectedItem.newPass.value.length < 6) {
        error = true
        this.setInvalid({
          field: 'newPass',
          message: 'Không được ít hơn 6 ký tự',
        })
      }
      if (this.selectedItem.reNewPass.value === '') {
        error = true
        this.setInvalid({
          field: 'reNewPass',
          message: 'Vui lòng nhập lại mật khẩu mới',
        })
      } else if (
        this.selectedItem.reNewPass.value !== this.selectedItem.newPass.value
      ) {
        error = true
        this.setInvalid({
          field: 'reNewPass',
          message: 'Mật khẩu không khớp',
        })
      } else if (
        this.selectedItem.reNewPass.value === this.selectedItem.password.value
      ) {
        error = true
        this.setInvalid({
          field: 'newPass',
          message: 'Mật khẩu mới không được trùng với mật khẩu cũ',
        })
      }
      if (!error) {
        const DATA = {
          // userId: Cookies.get('userId'),
          passwordOld: this.selectedItem.password.value,
          passwordNew: this.selectedItem.newPass.value,
        }
        try {
          this.$store.dispatch('app/changePass', DATA).then((res) => {
            if (!res.error) {
              if (res.data.data.resultCode == 0) {
                this.$showWarnNotify(this, res.data.data.message)
              } else {
                this.toggleChangePass()
                this.$showSuccess(this, res.data.data.message)
              }
            }
          })
        } catch (errors) {}
      }
    },

    commonRequestObjectType() {},
    clickItemNotShowMenu(value) {
      this.fullPath = value
      if (
        !this.$isNullOrEmpty(window.document.getElementById(`resetFillter`))
      ) {
        window.document.getElementById(`resetFillter`).click()
      }
      this.$router.push(value)
    },
    clickItem(value) {
      this.fullPath = value
      if (
        !this.$isNullOrEmpty(window.document.getElementById(`resetFillter`))
      ) {
        window.document.getElementById(`resetFillter`).click()
      }
    },
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.TermsOfUse.id,
        actionId
      )
      return isAllowed
    },

    checkRoute(listItem) {
      for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].pageUrl === this.$route.fullPath) {
          return true
        }
      }
    },
    clickPage(value) {
      this.dataPage = value
    },
    showNavigation() {
      let isMobile = false
      if (this.$vuetify.breakpoint.width > 1300) {
        isMobile = true
      }
      this.showNav = !this.showNav
      if (this.menuLeftWidth === 280) {
        this.menuLeftWidth = 55
      } else {
        this.menuLeftWidth = 280
      }
    },
    show(item) {
      item.showMenu = !item.showMenu
    },
    getDetailUser(value) {},
    getEmployeeDetail(value) {
      this.$store
        .dispatch('employee/getEmployeeDetail', { id: value })
        .then((res) => {
          this.positionName = res.data.data.positionName
          let arr = []
          res.data.data.employeeDepartments.map((item) => {
            if (!this.$isNullOrEmpty(item.department)) {
              arr.push(item.department.id)
            }
          })
          Cookies.set('departmentId', arr.join())
        })
    },
    getListDefaultBanner() {
      this.$store.dispatch('banner/getListDefaultBanner').then((res) => {
        let arr = []
        if (res.data.error.code == 0) {
          for (let index = 0; index < res.data.data.length; index++) {
            const element = res.data.data[index]
            arr.push(element.imageUrl.url)
          }
        }

        this.$store.commit('dataConfig/setBanner', arr)
      })
    },
    login() {
      this.$router.push('/dang-nhap')
    },

    setPageIndex(index) {
      this.indexPage = index
    },
    showMore() {
      this.showInput = !this.showInput
    },
    logout() {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName)
      })
      this.$store.commit('login/setIsLogin', false)
      this.$store.commit('login/setPath', null)
      this.fullname = null

      this.$router.push('/dang-nhap')
    },
    getMenuByParent(parentId) {
      if (!this.$isServer) {
        let lstAccessMenu = []
        let pages = this.$store.state.app.roles
        Array.from(pages).forEach((m) => {
          if (m.parentId === parentId)
            lstAccessMenu.push({ ...m, showMenu: false })
        })
        return lstAccessMenu
      }
    },
    setColor(value) {},
  },
}
</script>
<style lang="scss">
.activeButton {
  color: #e26105 !important;
}
.border-list-item-active {
  border-radius: 6px;
}

.no-background:before {
  background-color: unset;
}
.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 32px;
}
.input123.v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
  min-height: 30px !important;
}
.v-toolbar__content {
  height: 64px !important;
}
.max-width-78 {
  max-width: 78%;
}
.max-width-100 {
  max-width: 100%;
}
.style-active-menu {
  background: #3ba7e6;
  color: white !important;
  width: 99.8%;
  border-radius: 10px 0px 0px 10px !important;
}
i.v-icon.notranslate.mdi.mdi-chevron-down.theme--light {
  color: white;
}
.v-application--is-ltr
  .v-list--dense.v-list--nav
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 30px !important;
}
.active {
  main.v-main {
    padding: 0px 0px 0px 280px !important;
  }
}
.in-active {
  main.v-main {
    padding: 0px 0px 0px 55px !important;
  }
}
a.style-menu-small-item.px-0.style-active-menu-small.v-list-item--active.v-list-item.v-list-item--link.theme--light {
  height: 30px !important;
}
a.style-menu-small-item.px-0.v-list-item.v-list-item--link.theme--light {
  height: 30px !important;
}
.style-active-menu-small {
  background: #3ba7e6;
  color: white !important;
}
.style-menu-small-item {
}

.header-full {
  div {
    table {
      width: 160% !important;
      border-spacing: 0;
    }
  }
}
.v-icon.v-icon::after {
  background: transparent !important;
}
.style-tag-new {
  background: red;
  width: 65px;
  border-radius: 6px;
  color: white !important;
  font-size: 0.8rem;
}
.style-tag-over {
  background: #ef7004;
  width: 65px;
  border-radius: 6px;
  color: white !important;
  font-size: 0.8rem;
}
</style>
