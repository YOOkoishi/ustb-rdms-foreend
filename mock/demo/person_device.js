const personDeviceRelations = [
  {
    id: 1,
    person_idx: 1,
    person_name: '张三',
    device_idx: 1,
    device_name: 'X光机 XR-100',
    responsibility: '主要负责人'
  },
  {
    id: 2,
    person_idx: 2,
    person_name: '李四',
    device_idx: 1,
    device_name: 'X光机 XR-100',
    responsibility: '副负责人'
  },
  {
    id: 3,
    person_idx: 2,
    person_name: '李四',
    device_idx: 2,
    device_name: 'CT扫描仪 CT-200',
    responsibility: '主要负责人'
  },
  {
    id: 4,
    person_idx: 3,
    person_name: '王五',
    device_idx: 2,
    device_name: 'CT扫描仪 CT-200',
    responsibility: '操作员'
  },
  {
    id: 5,
    person_idx: 1,
    person_name: '张三',
    device_idx: 3,
    device_name: '电子束光刻机 EBL-500',
    responsibility: '主要负责人'
  },
  {
    id: 6,
    person_idx: 3,
    person_name: '王五',
    device_idx: 4,
    device_name: '质谱仪 MS-1000',
    responsibility: '主要负责人'
  },
  {
    id: 7,
    person_idx: 1,
    person_name: '张三',
    device_idx: 5,
    device_name: '加速器 ACC-300',
    responsibility: '主要负责人'
  },
  {
    id: 8,
    person_idx: 2,
    person_name: '李四',
    device_idx: 5,
    device_name: '加速器 ACC-300',
    responsibility: '副负责人'
  },
  {
    id: 9,
    person_idx: 3,
    person_name: '王五',
    device_idx: 5,
    device_name: '加速器 ACC-300',
    responsibility: '操作员'
  }
];

export default [
  // get person-device relations
  {
    url: '/person_device/relations',
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: personDeviceRelations
      };
    }
  },

  // add relation
  {
    url: '/person_device/relations/',
    method: 'post',
    response: config => {
      const newRelation = config.body;
      newRelation.id = personDeviceRelations.length + 1;
      personDeviceRelations.push(newRelation);
      return {
        code: 20000,
        data: newRelation
      };
    }
  },

  // delete relation
  {
    url: '/person_device/relations/:id',
    method: 'delete',
    response: config => {
      const { id } = config.query;
      const index = personDeviceRelations.findIndex(r => r.id == id);
      if (index > -1) {
        personDeviceRelations.splice(index, 1);
        return {
          code: 20000,
          data: 'success'
        };
      }
      return {
        code: 50001,
        message: 'Relation not found'
      };
    }
  }
];
