const fileViewData = [
  {
    file_idx: 1,
    file_name: '设备购置合同.pdf',
    file_type: 'pdf',
    file_size: 1024000,
    file_ownership_idx: 1,
    file_download_url: '/files/device1_contract.pdf',
    file_content: 'PDF Preview Content - 设备购置合同',
    file_remark: 'X光机购置合同'
  },
  {
    file_idx: 2,
    file_name: '设备维护记录.docx',
    file_type: 'docx',
    file_size: 512000,
    file_ownership_idx: 1,
    file_download_url: '/files/device1_maintenance.docx',
    file_content: 'Document Preview Content - 设备维护记录',
    file_remark: 'X光机定期维护记录'
  },
  {
    file_idx: 3,
    file_name: 'CT安全操作规程.pdf',
    file_type: 'pdf',
    file_size: 2048000,
    file_ownership_idx: 2,
    file_download_url: '/files/device2_manual.pdf',
    file_content: 'PDF Preview Content - CT安全操作规程',
    file_remark: 'CT扫描仪安全操作手册'
  },
  {
    file_idx: 4,
    file_name: '校准证书.pdf',
    file_type: 'pdf',
    file_size: 512000,
    file_ownership_idx: 2,
    file_download_url: '/files/device2_calibration.pdf',
    file_content: 'PDF Preview Content - 校准证书',
    file_remark: 'CT扫描仪校准证书'
  },
  {
    file_idx: 5,
    file_name: '光刻工艺流程.xlsx',
    file_type: 'xlsx',
    file_size: 256000,
    file_ownership_idx: 3,
    file_download_url: '/files/device3_process.xlsx',
    file_content: 'Spreadsheet Preview Content - 光刻工艺流程',
    file_remark: '电子束光刻工艺参数表'
  },
  {
    file_idx: 6,
    file_name: '质谱仪使用指南.pdf',
    file_type: 'pdf',
    file_size: 3072000,
    file_ownership_idx: 4,
    file_download_url: '/files/device4_guide.pdf',
    file_content: 'PDF Preview Content - 质谱仪使用指南',
    file_remark: '质谱仪详细使用指南'
  },
  {
    file_idx: 7,
    file_name: '加速器运行日志.xlsx',
    file_type: 'xlsx',
    file_size: 512000,
    file_ownership_idx: 5,
    file_download_url: '/files/device5_log.xlsx',
    file_content: 'Spreadsheet Preview Content - 加速器运行日志',
    file_remark: '加速器每日运行记录'
  },
  {
    file_idx: 8,
    file_name: '安全检查报告.docx',
    file_type: 'docx',
    file_size: 768000,
    file_ownership_idx: 5,
    file_download_url: '/files/device5_safety.docx',
    file_content: 'Document Preview Content - 安全检查报告',
    file_remark: '加速器安全检查报告'
  }
];

export default [
  // get file view list
  {
    url: '/file/filelist',
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: fileViewData
      };
    }
  },

  // get file content
  {
    url: '/file/fileview/:id',
    method: 'get',
    response: config => {
      const { id } = config.query;
      const file = fileViewData.find(f => f.file_idx == id);
      if (file) {
        return {
          code: 20000,
          data: {
            file_name: file.file_name,
            file_type: file.file_type,
            file_content: file.file_content
          }
        };
      }
      return {
        code: 50001,
        message: 'File not found'
      };
    }
  }
];
