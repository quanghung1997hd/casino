const Rules = {
  System: {
    // Trang chủ
    Home: {
      id: 1,
      actions: {},
    },
    // start
    // nhóm vấn đề
    problemGroup: {
      id: 3,
      actions: {
        show_list: 30,
        show_detail: 31,
        add: 32,
        update: 33,
        delete: 34,
      },
    },
    // lĩnh vực
    field: {
      id: 10,
      actions: {
        show_list: 100,
        update: 103,
      },
    },
    // đơn vị
    unit: {
      id: 11,
      actions: {
        show_list: 110,
        show_detail: 111,
        update: 113,
      },
    },
    leader: {
      id: 12,
      actions: {
        show_list: 120,
        add: 122,
        update: 123,
        delete: 124,
      },
    },
    history: {
      id: 18,
      actions: {
        show_list: 180,
        show_detail: 181,
      },
    },
    banner: {
      id: 23,
      actions: {
        show_list: 194,
        add: 195,
        update: 196,
        delete: 197,
      },
    },
    hotProblem: {
      id: 24,
      actions: {
        show_list: 198,
        add: 211,
        update: 212,
        delete: 213,
      },
    },
    policyProblem: {
      id: 25,
      actions: {
        show_list: 199,
      },
    },
    requestObj: {
      id: 26,
      actions: {
        show_list: 200,
        update: 202,
        add: 201,
        delete: 203,
      },
    },
    session: {
      id: 27,
      actions: {
        show_list: 204,
        add: 205,
        update: 206,
        updateStatus: 207,
      },
    },
    tutorial: {
      id: 19,
      actions: {
        show_list: 190,
        update: 215,
        add: 214,
        delete: 216,
        down: 217,
      },
    },
    RequestManage: {
      id: 32,
      actions: {
        // 229,230,231,232,
        viewList: 229,
        addRequest: 230,
        updateRequest: 231,
        deleteRequest: 232,
        updateAnswer: 248,
        updateClarify: 249,
      },
    },
    //     240	Tải xuống thông tin kiến nghị quá hạn	36
    // 36 là kiến nghị quá hạn
    // 241	Tải xuống thông tin danh sách kiến nghị	2
    // 242	Tải xuống thông tin kiến nghị chưa trả lời	4
    // 243	Tải xuống thông tin kiến nghị đã trả lời đã xem	5
    // 244	Tải xuống thông tin kiến nghị đã trả lời thỏa đáng	6
    // 245	Tải xuống thông tin kiến nghị đã trả lời cần làm rõ	28
    // 246	Tải xuống thông tin chi tiết kiến nghị	29
    // 247	Tải xuống thông tin kiến nghị đã trả lời sở chưa xem	30
    // 73 Tải xuống thông tin kiến nghị đã trả lời chưa xem 7
    // Danh sách kiến nghị
    ListRequestOver: {
      id: 36,
      actions: {
        view: 237,
        export_file: 240,
      },
    },
    ListRequest: {
      id: 2,
      actions: {
        xem: 20, //Xem danh sách kiến nghị
        chitiet: 21, //Xem chi tiết kiến nghị
        them_moi: 22, //Thêm mới kiến nghị
        cap_nhat: 23, //Cập nhật kiến nghị
        xoa: 24, //Xóa kiến nghị
        them_toi_nhom: 25, //Thêm kiến nghị tới nhóm vấn đề
        duyet_kien_nghi: 222,
        export_file: 241,
      },
    },
    //chi tiết kiến nghị
    detailRequest: {
      id: 29,
      actions: {
        updateReply: 227, //Cập nhật câu trả lời	29
        deleteReply: 228, //Xóa câu trả lời	29
        export_file: 246,
      },
    },
    //  Danh sách kiến nghị chưa trả lời
    ListRequestNotReply: {
      id: 4,
      actions: {
        xem: 40, //Xem danh sách kiến nghị
        chi_tiet: 41, //Xem chi tiết kiến nghị
        cap_nhat: 42, //Cập nhật kiến nghị
        export_file: 242,
      },
    },
    //  Danh sách kiến nghị chưa chưa duyệt
    ListRequestPending: {
      id: 5,
      actions: {
        xem: 50, //Xem danh sách kiến nghị
        chi_tiet: 51, //Xem chi tiết kiến nghị
        cap_nhat: 52, //Cập nhật kiến nghị
        export_file: 243,
      },
    },
    //  Danh sách kiến nghị có phản hồi
    ListRequestReply: {
      id: 6,
      actions: {
        xem: 60, //Xem danh sách kiến nghị
        chi_tiet: 61, //Xem chi tiết kiến nghị
        cap_nhat: 62, //Cập nhật kiến nghị
        export_file: 244,
      },
    },
    //  Danh sách kiến nghị đã duyệt
    TermsOfUse: {
      id: 34,
      actions: {
        xem: 234, //Xem danh sách kiến nghị
        cap_nhat: 235, //Cập nhật kiến nghị
      },
    },
    //  Danh sách kiến nghị đã duyệt
    ListRequestApproved: {
      id: 7,
      actions: {
        xem: 70, //Xem danh sách kiến nghị
        chi_tiet: 71, //Xem chi tiết kiến nghị
        cap_nhat: 72, //Cập nhật kiến nghị
        export_file: 73,
      },
    },
    //Hệ thống
    system: {
      id: 18,
      actions: {},
    },
    //Tài khoản
    account: {
      id: 19,
      actions: {},
    },
    //Nhóm tài khoản
    account_group: {
      id: 20,
      actions: {
        VIEW: 53,
        ADD: 54,
        UPDATE: 55,
        DELETE: 56,
        AUTHENTICATE: 57,
        VIEW_ACCOUNT: 58,
      },
    },
  },
}

export default Rules
