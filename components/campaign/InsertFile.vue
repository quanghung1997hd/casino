<template>
  <v-row class="ma-0">
    <v-col cols="12" class="py-0 px-0">
      <div class="mb-1 d-flex">
        <span class="black--text" style="font-weight: 500"
          >{{ label }} <span class="red--text">*</span></span
        >
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
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
                  <td class="text-center">
                    {{ data.item.totalPhone }}
                  </td>
                  <td class="text-center">
                    <span class="ml-1" v-if="data.item.file != null"
                      ><v-btn icon small @click="uploadFile(data.index)">
                        <v-icon size="20" color="primary"
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
import Constants from '~/assets/configurations/constant'

export default {
  props: {
    arr_file: {
      type: Array,
    },
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
  watch: {},
  data() {
    return {
      headers: Constants.System.Campaign.headerFile,
      Listitem: [],
      itemsPerPage: 1000,
      listFile: [],
      file: [],
      openDeleteFile: false,
      listFileArr: [],
      attachFileUrlArr: [],
      indexArr: null,
      arrSuccess: [],
      nameFile: null,
    }
  },
  methods: {
    pushArrFile(arrFile) {
      this.listFileArr = []
      if (arrFile != null && arrFile.length > 0) {
        arrFile.map((item) => {
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
              totalPhone: item.totalPhone,
            })
            this.attachFileUrlArr.push({
              url: item.url,
              data: null,
              name: item.name,
            })

            this.arrSuccess.push(item.name)
          }
        })
      } else {
        this.listFileArr = []
      }
    },
    deleteFile() {
      this.file = []
      this.listFileArr.splice(this.indexArr, 1)

      this.attachFileUrlArr.splice(this.indexArr, 1)

      this.arrSuccess = []
      for (var i = 0; i < this.listFileArr.length; i++) {
        this.arrSuccess.push(this.listFileArr[i].name)
      }

      this.$emit('uploadSuccess', this.arrSuccess)
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
        .dispatch('campaign/upLoadFile', data)
        .then((res) => {
          if (!res.error) {
            this.listFileArr[index].name = res.data.data.name
            this.listFileArr[index].totalPhone = res.data.data.totalPhone
            this.listFileArr[index].file = null
            this.$showSuccess(this, 'Tải file thành công')
          }
        })
        .catch((errors) => {
          // Exceptions
          // this.app.wait.end('loadingGroupUser')
        })
      this.arrSuccess.push(this.listFileArr[index].name)
      this.$emit('uploadSuccess', this.arrSuccess)
    },
    inputFile(e) {
      this.file = []
      if (this.listFileArr.length > 4) {
        this.$showError(this, 'Upload tối đa 5 file')
        return
      }
      if (
        !e[e.length - 1].name.endsWith('xls') &&
        !e[e.length - 1].name.endsWith('xlsx')
      ) {
        this.$showError(this, 'Sai định dạng file .xls hoặc .xlsx')
        return
      }

      for (let i = 0; i < e.length; i++) {
        if (e[i].size > 3145728) {
          this.$showError(
            this,
            'File ' + e[i].name + ' không được vượt quá 3MB'
          )
          continue
        }
        this.listFileArr.push({
          name: e[i].name,
          file: e[i],
          totalPhone: null,
        })
      }
    },
    selectFileOpen() {
      return window.document.getElementById(this.idInputFile).click()
    },

    deteFile() {
      this.file = []
      this.openDeleteFile = true
    },

    setEmptyFile() {
      this.arrSuccess = []
    },
  },
}
</script>
