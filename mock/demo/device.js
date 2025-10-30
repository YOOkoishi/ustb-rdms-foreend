const devices = [
  {
    device_idx: 1,
    device_name: 'X光机 XR-100',
    device_type: 'X光机',
    device_manager_idx: [1, 2],
    location_name: '材料楼301',
    location_address: '北京市海淀区学院路30号-材料楼301',
    max_tube_voltage_kv: 100,
    max_tube_current_ma: 5,
    device_QR_code: 'QR001',
    device_remark: '主要用于材料表征',
    device_img: ''
  },
  {
    device_idx: 2,
    device_name: 'CT扫描仪 CT-200',
    device_type: 'CT机',
    device_manager_idx: [2, 3],
    location_name: '能源楼201',
    location_address: '北京市海淀区学院路30号-能源楼201',
    max_tube_voltage_kv: 120,
    max_tube_current_ma: 10,
    device_QR_code: 'QR002',
    device_remark: '用于样品三维成像',
    device_img: ''
  },
  {
    device_idx: 3,
    device_name: '电子束光刻机 EBL-500',
    device_type: '电子束光刻',
    device_manager_idx: [1],
    location_name: '微电子楼101',
    location_address: '北京市海淀区学院路30号-微电子楼101',
    max_tube_voltage_kv: 50,
    max_tube_current_ma: 2,
    device_QR_code: 'QR003',
    device_remark: '纳米工艺加工设备',
    device_img: ''
  },
  {
    device_idx: 4,
    device_name: '质谱仪 MS-1000',
    device_type: '质谱分析',
    device_manager_idx: [3],
    location_name: '化学楼401',
    location_address: '北京市海淀区学院路30号-化学楼401',
    max_tube_voltage_kv: 80,
    max_tube_current_ma: 3,
    device_QR_code: 'QR004',
    device_remark: '元素成分分析',
    device_img: ''
  },
  {
    device_idx: 5,
    device_name: '加速器 ACC-300',
    device_type: '粒子加速',
    device_manager_idx: [1, 2, 3],
    location_name: '加速器中心',
    location_address: '北京市海淀区学院路30号-加速器中心',
    max_tube_voltage_kv: 300,
    max_tube_current_ma: 20,
    device_QR_code: 'QR005',
    device_remark: '离子束加速',
    device_img: ''
  }
];

export default [
  // get device list
  {
    url: '/device/devices/',
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: devices
      };
    }
  },

  // add device
  {
    url: '/device/devices/',
    method: 'post',
    response: config => {
      const newDevice = config.body;
      newDevice.device_idx = devices.length + 1;
      devices.push(newDevice);
      return {
        code: 20000,
        data: newDevice
      };
    }
  },

  // update device
  {
    url: '/device/devices/:id',
    method: 'put',
    response: config => {
      const { id } = config.query;
      const device = devices.find(d => d.device_idx == id);
      if (device) {
        Object.assign(device, config.body);
        return {
          code: 20000,
          data: device
        };
      }
      return {
        code: 50001,
        message: 'Device not found'
      };
    }
  },

  // delete device
  {
    url: '/device/devices/:id',
    method: 'delete',
    response: config => {
      const { id } = config.query;
      const index = devices.findIndex(d => d.device_idx == id);
      if (index > -1) {
        devices.splice(index, 1);
        return {
          code: 20000,
          data: 'success'
        };
      }
      return {
        code: 50001,
        message: 'Device not found'
      };
    }
  },

  // get responsible device (person_device)
  {
    url: '/device/persondevice',
    method: 'get',
    response: () => {
      const personDeviceList = [
        { pd_idx: 1, person_idx: 1, device_idx: 1, responsibility: '主要负责人' },
        { pd_idx: 2, person_idx: 2, device_idx: 1, responsibility: '副负责人' },
        { pd_idx: 3, person_idx: 2, device_idx: 2, responsibility: '主要负责人' },
        { pd_idx: 4, person_idx: 3, device_idx: 2, responsibility: '操作员' },
        { pd_idx: 5, person_idx: 1, device_idx: 3, responsibility: '主要负责人' },
        { pd_idx: 6, person_idx: 3, device_idx: 4, responsibility: '主要负责人' },
        { pd_idx: 7, person_idx: 1, device_idx: 5, responsibility: '主要负责人' },
        { pd_idx: 8, person_idx: 2, device_idx: 5, responsibility: '副负责人' },
        { pd_idx: 9, person_idx: 3, device_idx: 5, responsibility: '操作员' }
      ];
      return {
        code: 20000,
        data: personDeviceList
      };
    }
  }
];
