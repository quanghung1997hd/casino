<template>
  <v-row class="ma-0">
    <v-col cols="12" class="py-0 px-0">
      <div class="mb-1 d-flex">
        <span class="black--text" style="font-weight: 500">{{ label }}</span>
      </div>
    </v-col>
    <v-col cols="12" md="2" class="py-0 px-0">
      <div style="border: 2px dashed rgb(152, 157, 255); border-radius: 10px">
        <v-row
          class="ma-0"
          justify="center"
          align="center"
          style="height: 47px"
        >
          <v-col cols="12" class="d-flex justify-center py-0">
            <v-btn icon @click="selectFileOpen">
              <v-icon size="40" color="primary"> mdi-plus-circle </v-icon>
            </v-btn>
          </v-col>
          <v-file-input
            :multiple="isMultiple"
            :value="file"
            @change="inputFile($event)"
            :id="idInputFile"
            class="d-none"
          ></v-file-input>
        </v-row>
      </div>
    </v-col>

    <v-col cols="12" md="10" class="pt-0">
      <div>
        <v-row class="ma-0" v-if="listFileArr.length > 0">
          <v-col cols="8" class="py-0">
            <v-data-table
              :headers="headers"
              :items="listFileArr"
              :items-per-page="itemsPerPage"
              hide-default-footer
              loading-text="Xin chờ"
              sort-by="stt"
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              class="elevation-0 custom_header_table"
              fixed-header
              light
            >
              <template v-slot:item="data">
                <tr>
                  <td>
                    {{ data.item.name }}
                  </td>
                  <td class="text-center icon-ss" v-if="data.item.file != null">
                    <span class="ml-1"
                      ><v-btn icon small @click="uploadFile(data.index)">
                        <v-icon size="20" color="primary" @click="resetvalue"
                          >mdi-cloud-upload</v-icon
                        ></v-btn
                      ></span
                    >
                    <span class="ml-1"
                      ><v-btn
                        icon
                        small
                        @click="deteFileArr(data.index, data.item.name)"
                      >
                        <v-icon size="20" color="red">mdi-delete</v-icon></v-btn
                      ></span
                    >
                  </td>

                  <td class="text-center">
                    <span class="ml-1" v-if="data.item.linkFile != null"
                      ><v-btn
                        icon
                        small
                        @click="downloadFile(data.item.linkFile)"
                      >
                        <v-icon size="20" color="primary" @click="toggle"
                          >mdi-download</v-icon
                        ></v-btn
                      ></span
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row class="ma-0" style="max-height: 115px" v-else>
          <v-col
            cols="12"
            class="py-0 d-flex align-center"
            style="font-style: italic"
          >
            Chưa có file nào tải lên
          </v-col>
        </v-row>
      </div>
    </v-col>
    <yes-no-alert
      :open="openDeleteFile"
      alert-msg="Bạn có muốn xóa file này không?"
      @toggle="openDeleteFile = !openDeleteFile"
      @OK="deleteFile"
    >
    </yes-no-alert>
  </v-row>
</template>
<script>
import URL from '~/assets/configurations/BASE_URL'
import Constants from '~/assets/configurations/constant'
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    idInputFile: {
      type: String,
      default: null,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },

    propListFile: {
      type: Array,
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.propListFile) {
        this.propListFile.map((item) => {
          if (item.missionContentId) {
            this.listFileArr.push({
              name: item.url.name,
              type: null,
            })
            this.attachFileUrlArr.push({
              url: item.url.url,
              data: null,
              name: item.name,
            })
          } else {
            this.listFileArr.push({
              name: item.name,
              type: null,
            })
            this.attachFileUrlArr.push({
              url: item.url,
              data: null,
              name: item.name,
            })
          }
        })
      }
    }, 500)
  },
  watch: {},
  data() {
    return {
      URL,
      headers: Constants.System.Blacklist.headerFile,
      Listitem: [],
      itemsPerPage: 1000,
      listFile: [],
      file: null,
      openDeleteFile: false,
      listFileArr: [],
      attachFileUrlArr: [],
      indexArr: null,
      arrSuccess: [],
      nameFile: null,
      name: null,
    }
  },
  methods: {
    reset2value() {
      this.listFileArr = []
    },
    resetvalue() {},
    toggle() {
      this.$emit('toggle')
    },
    deleteFile() {
      this.listFileArr.splice(this.indexArr, 1)
      this.attachFileUrlArr.splice(this.indexArr, 1)
      let index = this.arrSuccess.findIndex(
        (item) => item.name == this.nameFile
      )
      if (index != -1) {
        this.arrSuccess.splice(index, 1)
        this.$emit('uploadSuccess', this.arrSuccess)
      }
    },
    deteFileArr(index, name) {
      this.openDeleteFile = true
      this.indexArr = index
      this.nameFile = name
    },
    uploadFile(index) {
      let formData = new FormData()
      formData.append('file', this.listFileArr[index].file)
      let data = {
        data: formData,
      }
      this.$store
        .dispatch('blacklist/upLoadFileCus', data)
        .then((res) => {
          this.listFileArr[index].linkFile =
            URL.BASE + '/downloadFile/excel?link=' + res.data.data.linkFile

          this.$showSuccess(this, 'Import file thành công')
          this.toggle()
          this.$emit('success')
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
    },
    downloadFile(link) {
      window.location.href = link
    },
    inputFile(e) {
      this.file = null
      for (let i = 0; i < e.length; i++) {
        this.listFileArr.push({
          name: e[i].name,
          file: e[i],
          linkFile: null,
        })
      }
    },
    selectFileOpen() {
      return window.document.getElementById(this.idInputFile).click()
    },

    deteFile() {
      this.file = null
      this.openDeleteFile = true
    },
  },
}
</script>
