const files = [
  {
    file_idx: 1,
    file_name: '设备购置合同.pdf',
    file_type: 'pdf',
    file_size: 1024000,
    file_ownership_idx: 1,
    file_download_url: '/files/device1_contract.pdf',
    file_content: 'PDF预览内容 - 这是一份设备购置合同的示例内容。本合同由北京科技大学与设备供应商签订，用于购置X光机设备。合同包括设备型号、技术规格、价格、交付时间等详细信息。',
    file_remark: 'X光机购置合同'
  },
  {
    file_idx: 2,
    file_name: '设备维护记录.txt',
    file_type: 'txt',
    file_size: 512000,
    file_ownership_idx: 1,
    file_download_url: '/files/device1_maintenance.txt',
    file_content: '设备维护记录\n=====================================\n\n设备名称：X光机 XR-100\n维护日期：2025-10-20\n维护内容：日常检查、清洁、校准\n维护人员：张三\n维护状态：正常\n\n上次维护：2025-10-15\n下次维护预计：2025-10-25\n\n注意事项：\n1. 定期检查设备状态\n2. 及时更新维护记录\n3. 发现异常立即上报',
    file_remark: 'X光机定期维护记录'
  },
  {
    file_idx: 3,
    file_name: 'CT操作规程.txt',
    file_type: 'txt',
    file_size: 2048000,
    file_ownership_idx: 2,
    file_download_url: '/files/device2_manual.txt',
    file_content: 'CT扫描仪安全操作规程\n=====================================\n\n一、开机前检查\n1. 检查电源是否连接\n2. 检查冷却液是否充足\n3. 检查所有连接线路\n\n二、开机步骤\n1. 按下主电源开关\n2. 等待系统自检（约5分钟）\n3. 进入操作界面\n\n三、扫描参数设置\n- 电压：120kV\n- 电流：100mA\n- 扫描时间：10秒\n\n四、安全注意事项\n1. 操作时务必穿戴防护装备\n2. 样品放置要牢固\n3. 不要在运行中打开腔体门\n\n五、关机步骤\n1. 等待当前扫描完成\n2. 按下关机按钮\n3. 等待系统完全关闭',
    file_remark: 'CT扫描仪安全操作手册'
  },
  {
    file_idx: 4,
    file_name: '校准证书.txt',
    file_type: 'txt',
    file_size: 512000,
    file_ownership_idx: 2,
    file_download_url: '/files/device2_calibration.txt',
    file_content: 'CT扫描仪校准证书\n=====================================\n\n设备名称：CT扫描仪 CT-200\n校准日期：2025-10-01\n校准有效期：2025-10-01 至 2026-10-01\n\n校准项目：\n1. 空间分辨率：通过 ✓\n2. 对比度分辨率：通过 ✓\n3. 线性度：通过 ✓\n4. 剂量准确性：通过 ✓\n5. 辐射泄漏：通过 ✓\n\n校准单位：北京科技大学质检中心\n校准人员：李四（证号：QC-2025-001）\n\n证书编号：CAL-2025-100012\n下次校准日期：2026-10-01',
    file_remark: 'CT扫描仪校准证书'
  },
  {
    file_idx: 5,
    file_name: '工艺参数表.txt',
    file_type: 'txt',
    file_size: 256000,
    file_ownership_idx: 3,
    file_download_url: '/files/device3_process.txt',
    file_content: '电子束光刻工艺参数表\n=====================================\n\n工艺名称：100nm线宽光刻\n工艺编号：EBL-100nm-001\n\n关键参数：\n- 电子束能量：50keV\n- 束流：1nA\n- 扫描速度：100μm/s\n- 步长：10nm\n- 光刻胶：PMMA AR-P 679\n\n工艺流程：\n1. 衬底清洗和烘烤\n2. 光刻胶旋涂\n3. 电子束曝光\n4. 显影\n5. 蚀刻\n6. 光刻胶去除\n\n工艺参数调整建议：\n- 温度范围：18-25°C\n- 湿度范围：30-50%\n- 曝光能量：10-15μC/cm²',
    file_remark: '电子束光刻工艺参数表'
  },
  {
    file_idx: 6,
    file_name: '质谱仪使用指南.txt',
    file_type: 'txt',
    file_size: 3072000,
    file_ownership_idx: 4,
    file_download_url: '/files/device4_guide.txt',
    file_content: '质谱仪详细使用指南\n=====================================\n\n第一章 设备介绍\n质谱仪型号：MS-1000\n工作原理：电离喷雾质谱（ESI-MS）\n质量范围：50-2000 m/z\n\n第二章 样品准备\n1. 样品溶解在50%甲醇/水中\n2. 浓度：1-10 μM\n3. 过0.2μm膜过滤\n4. 储存在4°C冰箱中\n\n第三章 分析方法\n流动相：\n- A液：0.1% FA / H2O\n- B液：0.1% FA / ACN\n梯度：\n- 0-2分钟：5% B\n- 2-10分钟：5%-95% B\n- 10-12分钟：95% B\n\n第四章 数据处理\n1. 用MassLynx软件采集数据\n2. 用Waters UNIFI处理数据\n3. 导出结果为CSV格式\n\n第五章 故障排查\n常见问题及解决方案已列在附件中',
    file_remark: '质谱仪详细使用指南'
  },
  {
    file_idx: 7,
    file_name: '加速器运行日志.txt',
    file_type: 'txt',
    file_size: 512000,
    file_ownership_idx: 5,
    file_download_url: '/files/device5_log.txt',
    file_content: '加速器每日运行记录\n=====================================\n\n记录日期：2025-10-30\n操作员：王五\n\n运行情况：\n08:00 - 系统启动成功\n08:30 - 进行每日自检，所有参数正常\n09:00 - 高压系统校准\n10:00 - 束流微调\n10:30 - 样品1照射完成\n11:30 - 样品2照射完成\n12:00 - 午间维护停机\n\n参数监控：\n- 高压：300kV（正常）\n- 束流：15mA（正常）\n- 真空度：1×10⁻⁵Pa（正常）\n- 温度：35°C（正常）\n\n运行时长：5小时\n照射样品数：2个\n故障记录：无\n\n下班前状态：系统关闭，所有参数记录完毕',
    file_remark: '加速器每日运行记录'
  },
  {
    file_idx: 8,
    file_name: '安全检查报告.txt',
    file_type: 'txt',
    file_size: 768000,
    file_ownership_idx: 5,
    file_download_url: '/files/device5_safety.txt',
    file_content: '加速器安全检查报告\n=====================================\n\n检查日期：2025-10-25\n检查人员：赵六（安全负责人）\n\n一、辐射安全检查\n✓ 警告标志完整清晰\n✓ 防护门正常运行\n✓ 辐射监测仪工作正常\n✓ 辐射水平在安全范围内\n\n二、设备安全检查\n✓ 高压系统绝缘良好\n✓ 冷却系统运行正常\n✓ 真空系统密封良好\n✓ 电气连接安全可靠\n\n三、操作安全检查\n✓ 操作规程齐全\n✓ 人员培训记录完整\n✓ 应急预案已制订\n✓ 应急设备配备完善\n\n四、卫生安全检查\n✓ 工作环境清洁\n✓ 通风系统工作正常\n✓ 防护设备齐全\n\n检查结论：各项安全指标均符合要求，设备可继续安全使用。\n下次检查预期：2025-11-25',
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
