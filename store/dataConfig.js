// import { values } from 'core-js/core/dict'

const state = () => {
  return {
    listCarouselImg: [
      { url: '/banner/banner1.png' },
      // { url: '/background/banner_2.jpg' },
      //  { url:'/background/banner3.png',}
    ],
    editorConfig: {
      toolbar: [
        {
          name: 'document',
          items: [
            'Source',
            '-',
            'Save',
            'NewPage',
            'ExportPdf',
            'Preview',
            'Print',
            '-',
            'Templates',
          ],
        },
        {
          name: 'clipboard',
          items: [
            'Cut',
            'Copy',
            'Paste',
            'PasteText',
            'PasteFromWord',
            '-',
            'Undo',
            'Redo',
          ],
        },
        {
          name: 'editing',
          items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
        },
        {
          name: 'forms',
          items: [
            'Form',
            'Checkbox',
            'Radio',
            'TextField',
            'Textarea',
            'Select',
            'Button',
            'ImageButton',
            'HiddenField',
          ],
        },

        {
          name: 'basicstyles',
          items: [
            'Bold',
            'Italic',
            'Underline',
            'Strike',
            'Subscript',
            'Superscript',
            '-',
            'CopyFormatting',
            'RemoveFormat',
          ],
        },
        {
          name: 'paragraph',
          items: [
            'NumberedList',
            'BulletedList',
            '-',
            'Outdent',
            'Indent',
            '-',
            'Blockquote',
            'CreateDiv',
            '-',
            'JustifyLeft',
            'JustifyCenter',
            'JustifyRight',
            'JustifyBlock',
            '-',
            'BidiLtr',
            'BidiRtl',
            'Language',
          ],
        },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        {
          name: 'insert',
          items: [
            'Flash',
            'Table',
            'HorizontalRule',
            'Smiley',
            'SpecialChar',
            'PageBreak',
            'Iframe',
          ],
        },

        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        { name: 'about', items: ['About'] },
      ],
      // fullPage: true,
      // allowedContent: true,
      height: '200px',
    },
    urlUpdateRequest: null,
    HeadersDefault: [
      {
        text: 'Stt',
        sortable: false,
        align: 'center',
        width: '2%',
      },
      {
        text: '?????i t?????ng ki???n ngh???',
        sortable: false,
        align: 'center',
        width: '12%',
      },
      {
        text: 'N???i dung h???i',
        sortable: false,
        align: 'center',
        width: '30%',
      },
      {
        text: 'L??nh v???c',
        sortable: false,
        align: 'center',
        width: '12%',
      },
      {
        text: 'Lo???i ki???n ngh???',
        sortable: false,
        align: 'center',
        width: '12%',
      },
      {
        text: '????n v??? thu???c b??? tr??? l???i',
        sortable: false,
        align: 'center',
        width: '12%',
      },

      {
        sortable: false,
        align: 'center',
        width: '6%',
      },
    ],
    HeadersFull: [
      {
        text: 'Stt',
        sortable: false,
        align: 'center',
        width: 40,
      },
      {
        text: '?????i t?????ng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'T??n ?????i t?????ng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'N???i dung h???i',
        sortable: false,
        align: 'center',
        width: 300,
      },
      {
        text: 'Ng??y h???i',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Th??ng h???i',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'n??m h???i',
        sortable: false,
        align: 'center',
        width: 120,
      },

      {
        text: 'H???n ho??n th??nh',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'L??nh v???c',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Ch??? ????? trong l??nh v???c',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Lo???i ki???n ngh???',
        sortable: false,
        align: 'center',
        width: 170,
      },
      {
        text: 'N???i dung tr??? l???i',
        sortable: false,
        align: 'center',
        width: 300,
      },

      {
        text: '????n v??? thu???c b??? tr??? l???i',
        sortable: false,
        align: 'center',
        width: 140,
      },
      {
        text: 's??? v??n b???n tr??? l???i',
        sortable: false,
        align: 'center',
        width: 120,
      },

      {
        sortable: false,
        align: 'center',
        width: 120,
      },
    ],
    HeadersFullQH: [
      {
        text: 'Stt',
        sortable: false,
        align: 'center',
        width: 40,
      },
      {
        text: '?????i t?????ng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'T??n ?????i t?????ng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'N???i dung h???i',
        sortable: false,
        align: 'center',
        width: 300,
      },
      {
        text: 'Ng??y h???i',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Th??ng h???i',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'n??m h???i',
        sortable: false,
        align: 'center',
        width: 120,
      },

      {
        text: 'H???n ho??n th??nh',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'L??nh v???c',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Ch??? ????? trong l??nh v???c',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Lo???i ki???n ngh???',
        sortable: false,
        align: 'center',
        width: 150,
      },
      {
        text: 'N???i dung tr??? l???i',
        sortable: false,
        align: 'center',
        width: 300,
      },

      {
        text: '????n v??? thu???c b??? tr??? l???i',
        sortable: false,
        align: 'center',
        width: 140,
      },
      {
        text: 's??? v??n b???n tr??? l???i',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 't.t duy???t',
        sortable: false,
        align: 'center',
        width: 80,
      },
      {
        text: 't.t tr??? l???i',
        sortable: false,
        align: 'center',
        width: 80,
      },
      {
        sortable: false,
        align: 'center',
        width: 120,
      },
    ],
    editorConfig2: {
      toolbar: [
        {
          name: 'document',
          items: [
            'Source',
            '-',
            'Save',
            'NewPage',
            'ExportPdf',
            'Preview',
            'Print',
            '-',
            'Templates',
          ],
        },
        {
          name: 'clipboard',
          items: [
            'Cut',
            'Copy',
            'Paste',
            'PasteText',
            'PasteFromWord',
            '-',
            'Undo',
            'Redo',
          ],
        },
        {
          name: 'editing',
          items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
        },
        {
          name: 'forms',
          items: [
            'Form',
            'Checkbox',
            'Radio',
            'TextField',
            'Textarea',
            'Select',
            'Button',
            'ImageButton',
            'HiddenField',
          ],
        },

        {
          name: 'basicstyles',
          items: [
            'Bold',
            'Italic',
            'Underline',
            'Strike',
            'Subscript',
            'Superscript',
            '-',
            'CopyFormatting',
            'RemoveFormat',
          ],
        },
        {
          name: 'paragraph',
          items: [
            'NumberedList',
            'BulletedList',
            '-',
            'Outdent',
            'Indent',
            '-',
            'Blockquote',
            'CreateDiv',
            '-',
            'JustifyLeft',
            'JustifyCenter',
            'JustifyRight',
            'JustifyBlock',
            '-',
            'BidiLtr',
            'BidiRtl',
            'Language',
          ],
        },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        {
          name: 'insert',
          items: [
            'Flash',
            'Table',
            'HorizontalRule',
            'Smiley',
            'SpecialChar',
            'PageBreak',
            'Iframe',
          ],
        },

        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        { name: 'about', items: ['About'] },
      ],
      // fullPage: true,
      // allowedContent: true,
      height: '80px',
    },
    editorConfigheight700: {
      toolbar: [
        {
          name: 'document',
          items: [
            'Source',
            '-',
            'Save',
            'NewPage',
            'ExportPdf',
            'Preview',
            'Print',
            '-',
            'Templates',
          ],
        },
        {
          name: 'clipboard',
          items: [
            'Cut',
            'Copy',
            'Paste',
            'PasteText',
            'PasteFromWord',
            '-',
            'Undo',
            'Redo',
          ],
        },
        {
          name: 'editing',
          items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
        },
        {
          name: 'forms',
          items: [
            'Form',
            'Checkbox',
            'Radio',
            'TextField',
            'Textarea',
            'Select',
            'Button',
            'ImageButton',
            'HiddenField',
          ],
        },

        {
          name: 'basicstyles',
          items: [
            'Bold',
            'Italic',
            'Underline',
            'Strike',
            'Subscript',
            'Superscript',
            '-',
            'CopyFormatting',
            'RemoveFormat',
          ],
        },
        {
          name: 'paragraph',
          items: [
            'NumberedList',
            'BulletedList',
            '-',
            'Outdent',
            'Indent',
            '-',
            'Blockquote',
            'CreateDiv',
            '-',
            'JustifyLeft',
            'JustifyCenter',
            'JustifyRight',
            'JustifyBlock',
            '-',
            'BidiLtr',
            'BidiRtl',
            'Language',
          ],
        },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        {
          name: 'insert',
          items: [
            'Flash',
            'Table',
            'HorizontalRule',
            'Smiley',
            'SpecialChar',
            'PageBreak',
            'Iframe',
          ],
        },

        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
        { name: 'about', items: ['About'] },
      ],
      // fullPage: true,
      // allowedContent: true,
      height: '600px',
    },
    dateSelect: [],
  }
}

const actions = {}
const mutations = {
  setDate(state, payload) {
    state.dateSelect = payload
  },
  setUrlUpdateRequest(state, payload) {
    state.urlUpdateRequest = payload
  },
  setBanner(state, payload) {
    state.listCarouselImg = payload
  },
}
export default {
  state,
  actions,
  mutations,
}
