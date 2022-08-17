import campaign from '~/store/campaign'

const Constants = {
  System: {
    Report: {
      contractTypeSelect: [
        { text: 'Tất cả', value: null },
        { text: 'Trả trước', value: 0 },
        { text: 'Trả sau', value: 1 },
      ],
      paymentStatusSelect: [
        { text: 'Tất cả', value: null },
        { text: 'Chưa thanh toán', value: 0 },
        { text: 'Đang thanh toán', value: 1 },
        { text: 'Đã thanh toán', value: 2 },
        { text: 'Quá hạn thanh toán', value: 3 },
      ],
      headerRevenue: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên khách hàng',
          sortable: false,
          value: 'fullName',
          width: '10%',
        },
        {
          text: 'Mã khách hàng',
          sortable: false,
          value: 'userName',
          width: '10%',
        },
        {
          text: 'Tên brandname',
          sortable: false,
          value: 'fullName',
          width: '10%',
        },
        {
          text: 'Loại hợp đồng',
          sortable: false,
          value: '',
          width: '10%',
        },
        {
          text: 'Số tiền',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'Nguồn thu',
          sortable: false,
          value: '',
          width: '15%',
        },
        {
          text: 'Thời gian',
          sortable: false,
          value: '',
          width: '10%',
        },
      ],
      headerSms: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên khách hàng',
          sortable: false,
          value: 'fullName',
          width: '10%',
        },
        {
          text: 'Mã khách hàng',
          sortable: false,
          value: 'fullName',
          width: '10%',
        },
        {
          text: 'Loại tin nhắn',
          sortable: false,
          value: 'typeSmsName',
          width: '10%',
        },
        {
          text: 'Tên brandname',
          sortable: false,
          value: 'userName',
          width: '11%',
        },
        {
          text: 'Ngày gửi',
          sortable: false,
          value: '',
          width: '10%',
        },
        {
          text: 'Tổng số tin nhắn',
          sortable: false,
          value: '',
          width: '10%',
        },
        {
          text: 'Tổng số tin nhắn thành công',
          sortable: false,
          value: '',
          width: '15%',
        },
        {
          text: 'Tổng số tin nhắn thất bại',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'Tổng số tin nhắn chưa gửi',
          sortable: false,
          value: '',
          width: '14%',
        },
      ],
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Chờ phê duyệt',
          value: 1,
        },
        {
          text: 'Đã phê duyệt',
          value: 2,
        },
        {
          text: 'Bị từ chối',
          value: 3,
        },
        {
          text: 'Hủy chương trình',
          value: -1,
        },
        {
          text: 'Đang chạy',
          value: 21,
        },
        {
          text: 'Đã hoàn thành',
          value: 23,
        },
      ],
      headerCampaign: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Thông tin khách hàng',
          sortable: false,
          value: 'fullName',
          width: '13%',
        },
        {
          text: 'Tên Chương trình',
          sortable: false,
          value: 'userName',
          width: '13%',
        },
        {
          text: 'Tên Brandname',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'Ngày gửi Chương trình nhắn tin  ',
          sortable: false,
          value: '',
          width: '13%',
        },
        {
          text: 'lĩnh vực kinh doanh',
          sortable: false,
          value: 'businessName',
          width: '13%',
        },
        {
          text: 'loại tin nhắn',
          sortable: false,
          value: 'adsName',
          width: '13%',
        },
        {
          text: 'tổng số tin nhắn',
          sortable: false,
          value: 'totalSms',
          width: '13%',
        },
        {
          text: 'tổng số tin nhắn thành công',
          sortable: false,
          value: 'totalSmsSuccess',
          width: '13%',
        },

        {
          text: 'tổng số tin nhắn thất bại',
          value: 'totalSmsFail',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'tổng số tin nhắn chưa gửi ',
          sortable: false,
          value: 'totalSmsUnsent',
          width: '13%',
        },

        {
          text: 'trạng thái',
          sortable: false,
          value: 'status',
          width: '13%',
        },
      ],
    },
    Blacklist: {
      title: {
        title: 'Danh sách blacklist',
      },
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },

        {
          text: 'Hoạt động',
          value: 1,
        },
      ],
      listStatusAdd: [
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },

        {
          text: 'Hoạt động',
          value: 1,
        },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Số điện thoại',
          sortable: false,
          value: 'phoneNumber',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'status',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'createdAt',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Ngày sửa',
          sortable: false,
          value: 'updatedAt',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
      headerFile: [
        {
          text: 'Tên file',
          sortable: false,
          value: 'stt',
          width: '50%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          value: 'action',
          width: '20%',
        },
        {
          text: 'Tải file',
          sortable: false,
          value: 'userName',
          width: '20%',
        },
      ],
    },
    Brandname: {
      title: {
        title: 'Danh sách bradname',
      },
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Ngừng hoạt động',
          value: -1,
        },
        {
          text: 'Chờ phê duyệt',
          value: 0,
        },
        {
          text: 'Đã phê duyệt',
          value: 1,
        },
        {
          text: 'Bị từ chối',
          value: -2,
        },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên Brandname',
          sortable: false,
          value: 'name',
          width: '13%',
        },
        {
          text: 'Khách hàng',
          sortable: false,
          value: 'customerName',
          width: '13%',
        },
        {
          text: 'Đơn vị yêu cầu khai báo',
          sortable: false,
          value: 'unitRequest',
          width: '13%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'createdAt',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'createdBy',
          width: '13%',
        },
        {
          text: 'Trạng thái ',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '11%',
        },

        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
    },
    ConfigPrice: {
      statusSearchOptions: [
        { text: 'Tất cả', value: null },
        {
          text: 'Đang hoạt động',
          value: 1,
        },
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
      ],
      listStatus: [
        { text: 'Ngừng hoạt động', value: 0 },
        { text: 'Hoạt động', value: 1 },
      ],
    },
    TPS: {
      title: {
        title: 'Quản lý TPS',
      },
      listStatus: [
        { text: 'Tất cả', value: null },
        { text: 'Ngừng hoạt động', value: 0 },
        { text: 'Hoạt động', value: 1 },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên khách hàng',
          sortable: false,
          value: 'customerName',
          width: 200,
        },
        {
          text: 'Số tps(s)',
          sortable: false,
          value: 'limitTps',
          align: 'center',
          width: 200,
        },
        {
          text: 'Thời gian cập nhật cuối',
          value: 'lateUpdateTime',
          sortable: false,
          align: 'center',
          width: 200,
        },
        {
          text: 'Trạng thái ',
          value: 'status',
          sortable: false,
          align: 'center',
          width: 200,
        },
        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: 150,
        },
      ],
    },
    Discount: {
      title: {
        title: 'Danh sách chiết khấu khách hàng',
      },
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Hoạt động',
          value: 1,
        },
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
      ],
      listStatusAdd: [
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
        {
          text: 'Hoạt động',
          value: 1,
        }
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Thông tin khách hàng',
          sortable: false,
          value: 'fullName',
          width: '13%',
        },
        {
          text: 'Chiết khấu',
          sortable: false,
          value: 'discount',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Hạn mức',
          sortable: false,
          value: 'discountLimit',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Áp dụng từ ngày đến ngày',
          sortable: false,
          value: 'fullDate',
          width: '15%',
          align: 'center',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'status',
          width: '15%',
          align: 'center',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'createAt',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'username',
          width: '13%',
        },
        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
      ListdiscountCustomer: [
        {
          text: 'Cho tất cả khách hàng',
          value: null,
        },
        {
          text: 'chọn từng khách hàng',
          value: '0',
        },
      ],
    },
    Campaign: {
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Thông tin khác hàng',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Mã số thuế',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Mã chương trình',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Lĩnh vực kinh doanh',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Loại quảng cáo',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tên BrandName',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Thời gian gửi duyệt',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Số tiền tạm tính',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Số tiền thực tế',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tổng số thuê bao thành công',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Hành động',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
      ],
      list_status: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Lưu nháp',
          value: 0,
        },
        {
          text: 'Chờ phê duyệt',
          value: 1,
        },
        {
          text: 'Đã phê duyệt',
          value: 2,
        },
        {
          text: 'Từ chối phê duyệt',
          value: 3,
        },
      ],
      headersCustomer: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Mã chương trình',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Lĩnh vực kinh doanh',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Loại quảng cáo',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tên BrandName',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Thời gian gửi duyệt',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Gửi từ ngày',
          sortable: false,
          value: 'startTime',
          width: '5%',
        },
        {
          text: 'Gửi đến ngày',
          sortable: false,
          value: 'endTime',
          width: '5%',
        },
        {
          text: 'Số tiền tạm tính',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Số tiền thực tế',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tổng số thuê bao thành công',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Hành động',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
      ],
      headerSms: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Số thuê bao',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Nhà mạng',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Chi phí/Thuê bao',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Thời gian gửi',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Trạng thái gửi tin',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Trạng thái thanh toán',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Ghi chú',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
      ],
      headerPrice: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Mạng',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tổng thuê bao',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Chi phí lúc gửi duyệt/Sms',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Chi phí lúc phê duyệt/Sms',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Chi phí',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
      ],
      headerPrice1: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '1%',
        },
        {
          text: 'Mạng',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Chi phí lúc gửi duyệt/Sms',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
      ],
      headerResults: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Mạng',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tổng thuê bao',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tổng thuê bao test',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Thành công',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Thất bại',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Chưa gửi',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Phải thu',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Đã thu',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Đã hoàn',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Cần hoàn',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
      ],
      campaignCode: 'Hệ thống sẽ tự sinh sau khi thêm mới thành công',
      list_source: [
        {
          value: 1,
          text: 'Dữ liệu thuê bao',
        },
      ],
      listsLanguage: [
        {
          name: 'Tiếng việt có dấu',
          value: 0,
          isSelect: 1,
        },
        {
          name: 'Tiếng việt không dấu',
          value: 1,
          isSelect: 0,
        },
      ],
      data_file: [
        {
          id: 1,
          file_name: 'Danhsachthuebao1.xlsx',
          count: 1200,
        },
        {
          id: 2,
          file_name: 'Danhsachthuebao2.xlsx',
          count: 1300,
        },
      ],
      headerFile: [
        {
          text: 'Tên file',
          sortable: false,
          value: 'stt',
          width: '50%',
        },
        {
          text: 'Số lượng bản ghi',
          sortable: false,
          value: 'fullName',
          width: '30%',
        },
        {
          text: 'Chức năng',
          sortable: false,
          value: 'userName',
          width: '20%',
        },
      ],
      headerTablePrice: [
        {
          text: 'Nhà mạng',
          sortable: false,
          value: 'stt',
          width: 200,
        },
        {
          text: 'Giá',
          sortable: false,
          value: 'stt',
          width: 200,
        },
      ],
    },
    Transition: {
      title: {
        title: 'Danh sách giao dịch',
      },
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Thông tin khách hàng',
          sortable: false,
          value: 'customerName',
          width: '13%',
        },
        {
          text: 'Loại giao dịch',
          sortable: false,
          value: 'type',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Nội dung giao dịch',
          sortable: false,
          value: 'reason',
          width: '13%',
        },
        {
          text: 'Số tiền giao dịch',
          sortable: false,
          value: 'realMoney',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Số dư khả dụng ',
          value: 'balanceMoney',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'Thời gian thực hiện',
          value: 'createdAt',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
      headersCustomer: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Loại giao dịch',
          sortable: false,
          value: 'type',
          width: '13%',
          align: 'center',
        },
        {
          text: 'Nội dung giao dịch',
          sortable: false,
          value: 'reason',
          width: '13%',
        },
        {
          text: 'Số tiền giao dịch',
          sortable: false,
          value: 'realMoney',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Số dư khả dụng ',
          value: 'balanceMoney',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'Thời gian thực hiện',
          value: 'createdAt',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
    },
    Debt: {
      title: {
        title: 'Danh sách công nợ',
      },
      Listmoth: [
        { text: 'Tất cả', value: null },
        { text: 'Tháng 1', value: '01' },
        { text: 'Tháng 2', value: '02' },
        { text: 'Tháng 3', value: '03' },
        { text: 'Tháng 4', value: '04' },
        { text: 'Tháng 5', value: '05' },
        { text: 'Tháng 6', value: '06' },
        { text: 'Tháng 7', value: '07' },
        { text: 'Tháng 8', value: '08' },
        { text: 'Tháng 9', value: '09' },
        { text: 'Tháng 10', value: '10' },
        { text: 'Tháng 11', value: '11' },
        { text: 'Tháng 12', value: '12' },
      ],
      listStatus: [
        { text: 'Tất cả', value: null },
        { text: 'Chưa thanh toán', value: 0 },
        { text: 'Đang thanh toán', value: 1 },
        { text: 'Đã thanh toán', value: 2 },
        { text: 'Qúa hạn thanh toán', value: 3 },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Khách hàng',
          sortable: false,
          value: 'customerName',
          width: '13%',
        },
        {
          text: 'Tổng tiền cần thanh toán',
          sortable: false,
          value: 'totalAmountPaid',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Đã thanh toán',
          sortable: false,
          value: 'moneyPaid',
          align: 'center',
          width: '13%',
        },
        {
          text: 'tháng',
          sortable: false,
          value: 'monthYear',
          align: 'center',
          width: '11%',
        },
        {
          text: 'trạng thái',
          sortable: false,
          value: 'status',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Hạn thanh toán',
          sortable: false,
          value: 'paymentExpiration',
          align: 'center',
          width: '13%',
        },
        {
          text: 'ngày cập nhật',
          sortable: false,
          value: 'updateAt',
          align: 'center',
          width: '13%',
        },
        {
          text: 'người cập nhật ',
          value: 'updater',
          sortable: false,
          align: 'center',
          width: '11%',
        },

        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: 120,
        },
      ],
      headersDetails: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: 50,
        },
        {
          text: 'Nội dung nợ',
          sortable: false,
          value: 'reason',
          width: 200,
        },
        {
          text: 'Tháng',
          sortable: false,
          value: 'monthYear',
          align: 'center',
          width: 120,
        },
        {
          text: 'Tổng nợ ',
          sortable: false,
          value: 'totalDebt',
          align: 'center',
          width: 200,
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'status',
          align: 'center',
          width: 150,
        },
        {
          text: 'Ngày chuyển khoản',
          sortable: false,
          value: 'tradingDate',
          align: 'center',
          width: 200,
        },
        {
          text: 'Mã ref',
          sortable: false,
          value: 'refCode',
          align: 'center',
          width: 150,
        },
        {
          text: 'Ngân hàng',
          sortable: false,
          value: 'bankName',
          width: 180,
        },
        {
          text: 'Ngày cập nhật',
          sortable: false,
          value: 'updatedAt',
          align: 'center',
          width: 150,
        },
        {
          text: 'Người cập nhật',
          sortable: false,
          value: 'updater',
          align: 'center',
          width: 150,
        },
      ],
    },
    Orders: {
      title: {
        title: 'Danh sách bradname',
      },
      listRechargeform: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Chuyển khoản',
          value: 1,
        },
      ],
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Chờ phê duyệt',
          value: 0,
        },
        {
          text: 'Đã phê duyệt',
          value: 1,
        },
        {
          text: 'Bị từ chối',
          value: -1,
        },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên khách hàng',
          sortable: false,
          value: 'customerName',
          width: '13%',
        },
        {
          text: 'Mã khách hàng',
          sortable: false,
          value: 'customerCode',
          width: '13%',
        },
        {
          text: 'Mã đơn hàng',
          sortable: false,
          value: 'orderCode',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Mã số thuế',
          sortable: false,
          value: 'taxCode',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Giá trị đơn hàng',
          sortable: false,
          value: 'orderPrice',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Hình thức nạp tiền',
          value: 'transfer',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'Thông tin chuyển khoản',
          value: 'infoTransfer',
          sortable: false,
          width: 250,
        },
        {
          text: ' Thời gian',
          value: 'createdAt',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'Trạng thái',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: 120,
        },
      ],
      headersCustomer: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Mã đơn hàng',
          sortable: false,
          value: 'orderCode',
          align: 'center',
          width: '15%',
        },
        {
          text: 'Giá trị đơn hàng',
          sortable: false,
          value: 'orderPrice',
          align: 'center',
          width: '15%',
        },
        {
          text: 'Hình thức nạp tiền',
          value: 'transfer',
          sortable: false,
          align: 'center',
          width: '15%',
        },
        {
          text: 'Thông tin chuyển khoản',
          value: 'infoTransfer',
          sortable: false,
          width: '15%',
        },
        {
          text: ' Thời gian',
          value: 'createdAt',
          sortable: false,
          align: 'center',
          width: '15%',
        },
        {
          text: 'Trạng thái',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '11%',
        },
        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '15%',
        },
      ],
      listbankTransfer: [
        {
          text: 'Chuyển khoản',
          value: 1,
        },
      ],
    },
    Networks: {
      title: {
        title: 'Danh mục nhà mạng',
      },
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
        {
          text: 'Hoạt động',
          value: 1,
        },
      ],
      listStatusAdd: [
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
        {
          text: 'Hoạt động',
          value: 1,
        },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên nhà mạng',
          sortable: false,
          value: 'name',
          width: '13%',
        },
        {
          text: 'Mã viết tắt',
          sortable: false,
          value: 'abbreviationCode',
          width: '13%',
        },
        {
          text: 'Tên đầy đủ',
          sortable: false,
          value: 'fullName',
          width: '13%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'createdAt',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'createdBy',
          width: '13%',
        },
        {
          text: 'Trạng thái ',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '11%',
        },

        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
    },
    DeclareBrandname: {
      title: {
        title: 'Danh sách phí khai báo, duy trì BrandName',
      },
      listStatus: [
        { text: 'Tất cả', value: null },
        { text: 'Ngừng hoạt động', value: 0 },
        { text: 'Hoạt động', value: 1 },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên Khách hàng',
          sortable: false,
          value: 'customerName',
          width: '13%',
        },
        {
          text: 'Nhà mạng',
          sortable: false,
          value: 'networkName',
          width: '13%',
        },
        {
          text: 'Phí khai báo',
          sortable: false,
          value: 'declarationFee',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Phí duy trì',
          sortable: false,
          value: 'maintainingFee',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Thời gian áp dụng từ ngày',
          sortable: false,
          value: 'timeApplication',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'createdAt',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'createdBy',
          width: '13%',
        },
        {
          text: 'Trạng thái ',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '11%',
        },

        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: 120,
        },
      ],
      listPolicy: [
        {
          text: 'Cho tất cả khách hàng',
          value: 0,
        },
        {
          text: 'Cho từng khách hàng',
          value: 1,
        },
      ],
      listStatusAdd: [
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
        {
          text: 'Hoạt động',
          value: 1,
        },
      ],
      headerAdd: [
        {
          text: 'Nhà mạng',
          sortable: false,
          value: 'name',
          width: '13%',
        },
        {
          text: 'Phí khai báo',
          sortable: false,
          value: 'declarationFee',
          align: 'center',
          width: '13%',
          class: 'addRequire ',
        },
        {
          text: 'Phí duy trì',
          sortable: false,
          value: 'maintainingFee',
          align: 'center',
          width: '13%',
          class: 'addRequire ',
        },
      ],
    },
    Profile: {
      listsMaketting: [
        {
          name: 'Quảng cáo SMS',
          value: 1,
          isSelect: 0,
        },
        {
          name: 'Quảng cáo kênh sóng truyền hình',
          value: 2,
          isSelect: 0,
        },
        {
          name: 'Quảng cáo kênh app',
          value: 3,
          isSelect: 0,
        },
      ],
      listType: [
        {
          text: 'Trả trước',
          value: 0,
        },
        {
          text: 'Trả sau',
          value: 1,
        },
      ],
    },
    TypeBusiness: {
      itemStatus: [
        { text: 'Tất cả', value: null },
        {
          text: 'Hoạt động',
          value: 1,
        },
        {
          text: 'Dừng hoạt động',
          value: 2,
        },
      ],
      itemStatusAdd: [
        {
          text: 'Hoạt động',
          value: 1,
        },
        {
          text: 'Dừng hoạt động',
          value: 2,
        },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Mã lĩnh vực kinh doanh',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Tên lĩnh vực kinh doanh',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
        {
          text: 'Hành động',
          sortable: false,
          value: 'stt',
          width: '5%',
        },
      ],
    },
    TypeSms: {
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
        {
          text: 'Hoạt động',
          value: 1,
        },
      ],
      listStatusAdd: [
        {
          text: 'Ngừng hoạt động',
          value: 0,
        },
        {
          text: 'Hoạt động',
          value: 1,
        },
      ],
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên loại tin nhắn',
          sortable: false,
          value: 'name',
          width: '13%',
        },
        {
          text: 'Mã loại tin nhắn',
          sortable: false,
          value: 'code',
          width: '13%',
        },
        {
          text: 'Tiền tố',
          sortable: false,
          value: 'prefix',
          width: '13%',
        },
        {
          text: 'Hậu tố',
          sortable: false,
          value: 'suffixes',
          width: '13%',
        },
        {
          text: 'Ngày tạo',
          sortable: false,
          value: 'createdAt',
          align: 'center',
          width: '13%',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'createdBy',
          width: '13%',
        },
        {
          text: 'Trạng thái ',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '11%',
        },

        {
          text: 'Hành động',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
    },
    Customer: {
      listItemsContractType: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Trả trước',
          value: 0,
        },
        {
          text: 'Trả sau',
          value: 1,
        },
      ],
      sexs: [
        { value: 0, text: 'Chọn giới tính' },
        { value: 1, text: 'Nam' },
        { value: 2, text: 'Nữ' },
      ],
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Lưu tạm',
          value: 0,
        },
        {
          text: 'Chờ phê duyệt',
          value: 1,
        },
        {
          text: 'Đã phê duyệt',
          value: 2,
        },
        {
          text: 'Bị từ chối',
          value: 3,
        },
        {
          text: 'Ngừng hoạt động',
          value: 4,
        },
      ],
      header: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '1%',
        },
        {
          text: 'Tên khách hàng',
          sortable: false,
          value: 'fullName',
          width: 250,
        },
        {
          text: 'Mã khách hàng',
          sortable: false,
          value: 'customerCode',
          width: 150,
        },
        {
          text: 'Tên tài khoản',
          sortable: false,
          value: 'userName',
          width: 150,
        },
        {
          text: 'Loại hợp đồng',
          sortable: false,
          value: 'contractType',
          width: 100,
          align: 'center',
        },
        {
          text: 'Số hợp đồng',
          sortable: false,
          value: 'contractNumber',
          width: 150,
          align: 'center',
        },
        {
          text: 'Số dư tài khoản',
          sortable: false,
          value: 'balanceMoney',
          width: 120,
          align: 'center',
        },
        {
          text: 'Trạng thái duyệt',
          value: 'status',
          sortable: false,
          align: 'center',
          width: 150,
        },
        {
          text: 'Ngày tạo ',
          sortable: false,
          value: 'createdAt',
          width: 100,
          align: 'center',
        },
        {
          text: 'Người tạo',
          sortable: false,
          value: 'createdBy',
          width: 100,
        },

        {
          text: 'Chức năng',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
    },
    User: {
      headerGroup: [
        {
          text: 'Nhóm',
          align: 'left',
          sortable: false,
          value: 'group_name',
        },
      ],
      headerPage: [
        {
          text: 'Trang',
          align: 'left',
          class: 'body-2',
          sortable: false,
          value: 'page_name',
        },
      ],
      headerFunc: [
        {
          text: 'Chức năng',
          align: 'left',
          sortable: false,
          class: 'body-2',
          value: 'role_name',
        },
      ],
      headerGroupIndex: [
        {
          text: 'Nhóm',
          align: 'left',
          sortable: false,
          value: 'groupName',
        },
      ],
      headerPageIndex: [
        {
          text: 'Trang',
          align: 'left',
          class: 'body-2',
          sortable: false,
          value: 'page_name',
        },
      ],
      headerFuncIndex: [
        {
          text: 'Chức năng',
          align: 'left',
          sortable: false,
          class: 'body-2',
          value: 'role_name',
        },
      ],
      headerUser: [
        // { text: 'STT', sortable: false, value: 'stt', width: '50px' },
        { text: 'Họ tên', value: 'fullName', width: '120px' },
        { text: 'Tên đăng nhập', value: 'userName', width: '120px' },
        { text: 'SĐT', value: 'mobileNumber', width: '90px' },
        { text: 'Email', value: 'email', width: '120px' },
      ],
      listStatus: [
        {
          text: 'Tất cả',
          value: null,
        },
        {
          text: 'Không hoạt động',
          value: 0,
        },
        {
          text: 'Đang hoạt động',
          value: 1,
        },
      ],
      headerAcc: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tên đăng nhập',
          sortable: false,
          value: 'userName',
          width: 100,
        },
        {
          text: 'Họ tên',
          sortable: false,
          value: 'fullName',
          width: 250,
        },
        {
          text: 'Nhóm tài khoản',
          sortable: false,
          value: 'groupRole',
          width: 150,
        },
        {
          text: 'Trạng thái',
          sortable: false,
          value: 'status',
          width: 150,
          align: 'center',
        },

        {
          text: 'Chức năng',
          value: 'action',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
      list_sex: [
        {
          value: 0,
          text: 'Nam',
        },
        {
          value: 1,
          text: 'Nữ',
        },
        {
          value: 3,
          text: 'Không xác định',
        },
      ],
      list_status: [
        {
          value: 1,
          text: 'Hoạt động',
        },
        {
          value: 0,
          text: 'Không hoạt động',
        },
      ],
      headerAccG: [
        {
          text: 'Họ tên',
          align: 'center',
          sortable: false,
          width: 130,
        },
        {
          text: 'Email',
          align: 'center',
          sortable: false,
          width: 120,
        },
        {
          text: 'Số điện thoại',
          align: 'center',
          sortable: false,
          width: 120,
        },
        {
          text: 'Tài khoản đăng nhập',

          align: 'center',
          sortable: false,
          width: 100,
        },

        {
          align: 'center',
          sortable: false,
          width: 40,
        },
      ],
    },
    Process : {
      headers: [
        {
          text: 'STT',
          sortable: false,
          value: 'stt',
          width: '2%',
        },
        {
          text: 'Tiến trình',
          sortable: false,
          value: 'description',
          width: '13%',
        },

        {
          text: 'Khách hàng',
          sortable: false,
          value: 'customerName',
          width: '13%',
        },
        {
          text: 'TPS Khách hàng đang chạy',
          sortable: false,
          value: 'limitTps',
          width: '13%',
        },
        {
          text: 'Chương trình nhắn tin',
          sortable: false,
          value: 'campaignName',
          width: '13%',
        },
        {
          text: 'Queue chờ gửi sms',
          sortable: false,
          value: 'queueSize',
          width: '13%',
        },
        {
          text: 'Tổng số tiến trình',
          sortable: false,
          value: 'totalProcess',
          width: '13%',
        },
        {
          text: 'Thông tin server',
          sortable: false,
          value: 'infoHA',
          width: '13%',
        },
        {
          text: 'Trạng thái ',
          value: 'status',
          sortable: false,
          align: 'center',
          width: '11%',
        },
      ],
    }
  },
}

export default Constants
