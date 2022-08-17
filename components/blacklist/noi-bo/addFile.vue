<template>
  <div>
    <v-dialog
      :value="open"
      :max-width="1300"
      @click:outside="toggle"
      @keydown="$event.key === 'Escape' && toggle()"
    >
      <v-card>
        <v-card-title class="border-title-dialog">
          Chèn file
          <v-btn
            @click="toggle"
            icon
            style="position: absolute; top: 0; right: 0"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text
          style="max-height: 700px; overflow: auto"
          class="pb-0 pt-4"
        >
          <v-row class="ma-0" no-gutters>
            <a
              :href="`/fileSample/fileMauBlacklist.xlsx`"
              target="_blank"
              download
              >FileMauBlacklist.xlsx</a
            >
          </v-row>
          <v-row class="ma-0" no-gutters>
            <v-col cols="12" class="px-0 py-0">
              <v-row class="ma-0" align="center">
                <v-col cols="12">
                  <InsertFile
                    @uploadSuccess="uploadSuccess"
                    :isMultiple="true"
                    :label="'Tài liệu đính kèm '"
                    :idInputFile="`input-file-CTLV`"
                    ref="resetvalue"
                  ></InsertFile>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer />

          <v-btn text height="30px" class="secondary" @click="toggle">
            <div class="font_size text-none">Đóng</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import InsertFile from './InsertFile.vue'
const date = new Date()
const now = new Date()

export default {
  components: {
    InsertFile,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      array_file_name: [],
    }
  },
  methods: {
    mounted() {
      this.getListBlacklist()
    },
    uploadSuccess(value) {
      value.map((item) => {
        this.array_file_name.push(item.name)
      })
    },
    toggle() {
      this.$emit('toggle')
      this.$emit('success')
      this.getListBlacklist
    },
  },

  watch: {
    open(value) {
      if (value) {
        setTimeout(() => {
          if (this.$refs.resetvalue != undefined) {
            this.$refs.resetvalue.reset1value()
          }
        }, 10)
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

.required {
  color: red;
}
</style>
