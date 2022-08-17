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
        text: 'Đối tượng kiến nghị',
        sortable: false,
        align: 'center',
        width: '12%',
      },
      {
        text: 'Nội dung hỏi',
        sortable: false,
        align: 'center',
        width: '30%',
      },
      {
        text: 'Lĩnh vực',
        sortable: false,
        align: 'center',
        width: '12%',
      },
      {
        text: 'Loại kiến nghị',
        sortable: false,
        align: 'center',
        width: '12%',
      },
      {
        text: 'Đơn vị thuộc bộ trả lời',
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
        text: 'Đối tượng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Tên đối tượng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Nội dung hỏi',
        sortable: false,
        align: 'center',
        width: 300,
      },
      {
        text: 'Ngày hỏi',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Tháng hỏi',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'năm hỏi',
        sortable: false,
        align: 'center',
        width: 120,
      },

      {
        text: 'Hạn hoàn thành',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Lĩnh vực',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Chủ đề trong lĩnh vực',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Loại kiến nghị',
        sortable: false,
        align: 'center',
        width: 170,
      },
      {
        text: 'Nội dung trả lời',
        sortable: false,
        align: 'center',
        width: 300,
      },

      {
        text: 'Đơn vị thuộc bộ trả lời',
        sortable: false,
        align: 'center',
        width: 140,
      },
      {
        text: 'số văn bản trả lời',
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
        text: 'Đối tượng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Tên đối tượng K.N',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Nội dung hỏi',
        sortable: false,
        align: 'center',
        width: 300,
      },
      {
        text: 'Ngày hỏi',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Tháng hỏi',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'năm hỏi',
        sortable: false,
        align: 'center',
        width: 120,
      },

      {
        text: 'Hạn hoàn thành',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Lĩnh vực',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Chủ đề trong lĩnh vực',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 'Loại kiến nghị',
        sortable: false,
        align: 'center',
        width: 150,
      },
      {
        text: 'Nội dung trả lời',
        sortable: false,
        align: 'center',
        width: 300,
      },

      {
        text: 'Đơn vị thuộc bộ trả lời',
        sortable: false,
        align: 'center',
        width: 140,
      },
      {
        text: 'số văn bản trả lời',
        sortable: false,
        align: 'center',
        width: 120,
      },
      {
        text: 't.t duyệt',
        sortable: false,
        align: 'center',
        width: 80,
      },
      {
        text: 't.t trả lời',
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
