const files = [
  {
    file_idx: 1,
    file_name: '设备购置合同.pdf',
    file_type: 'pdf',
    file_size: 1024000,
    file_ownership_idx: 1,
    file_download_url: '/files/device1_contract.pdf',
    file_remark: 'X光机购置合同'
  },
  {
    file_idx: 2,
    file_name: '设备维护记录.docx',
    file_type: 'docx',
    file_size: 512000,
    file_ownership_idx: 1,
    file_download_url: '/files/device1_maintenance.docx',
    file_remark: 'X光机定期维护记录'
  },
  {
    file_idx: 3,
    file_name: 'CT安全操作规程.pdf',
    file_type: 'pdf',
    file_size: 2048000,
    file_ownership_idx: 2,
    file_download_url: '/files/device2_manual.pdf',
    file_remark: 'CT扫描仪安全操作手册'
  },
  {
    file_idx: 4,
    file_name: '校准证书.pdf',
    file_type: 'pdf',
    file_size: 512000,
    file_ownership_idx: 2,
    file_download_url: '/files/device2_calibration.pdf',
    file_remark: 'CT扫描仪校准证书'
  },
  {
    file_idx: 5,
    file_name: '光刻工艺流程.xlsx',
    file_type: 'xlsx',
    file_size: 256000,
    file_ownership_idx: 3,
    file_download_url: '/files/device3_process.xlsx',
    file_remark: '电子束光刻工艺参数表'
  },
  {
    file_idx: 6,
    file_name: '质谱仪使用指南.pdf',
    file_type: 'pdf',
    file_size: 3072000,
    file_ownership_idx: 4,
    file_download_url: '/files/device4_guide.pdf',
    file_remark: '质谱仪详细使用指南'
  },
  {
    file_idx: 7,
    file_name: '加速器运行日志.xlsx',
    file_type: 'xlsx',
    file_size: 512000,
    file_ownership_idx: 5,
    file_download_url: '/files/device5_log.xlsx',
    file_remark: '加速器每日运行记录'
  },
  {
    file_idx: 8,
    file_name: '安全检查报告.docx',
    file_type: 'docx',
    file_size: 768000,
    file_ownership_idx: 5,
    file_download_url: '/files/device5_safety.docx',
    file_remark: '加速器安全检查报告'
  }
];

export default [
  // get file list
  {
    url: '/file/files/',
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: files
      };
    }
  },

  // add file
  {
    url: '/file/upload/',
    method: 'post',
    response: config => {
      const newFile = config.body;
      newFile.file_idx = files.length + 1;
      files.push(newFile);
      return {
        code: 20000,
        data: newFile
      };
    }
  },

  // update file
  {
    url: '/file/files/:id',
    method: 'put',
    response: config => {
      const { id } = config.query;
      const file = files.find(f => f.file_idx == id);
      if (file) {
        Object.assign(file, config.body);
        return {
          code: 20000,
          data: file
        };
      }
      return {
        code: 50001,
        message: 'File not found'
      };
    }
  },

  // patch file (update single field)
  {
    url: '/file/files/:id',
    method: 'patch',
    response: config => {
      const { id } = config.query;
      const file = files.find(f => f.file_idx == id);
      if (file) {
        Object.assign(file, config.body);
        return {
          code: 20000,
          data: file
        };
      }
      return {
        code: 50001,
        message: 'File not found'
      };
    }
  },

  // delete file
  {
    url: '/file/files/:id',
    method: 'delete',
    response: config => {
      const { id } = config.query;
      const index = files.findIndex(f => f.file_idx == id);
      if (index > -1) {
        files.splice(index, 1);
        return {
          code: 20000,
          data: 'success'
        };
      }
      return {
        code: 50001,
        message: 'File not found'
      };
    }
  },

  // download file
  {
    url: '/file/:path(.*)',
    method: 'get',
    response: config => {
      return {
        code: 20000,
        data: 'file content'
      };
    }
  }
];
