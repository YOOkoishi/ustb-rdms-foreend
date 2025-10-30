const persons = [
  {
    person_idx: 1,
    person_name: '张三',
    person_phone: '13800138000',
    person_email: 'zhangsan@ustb.edu.cn',
    person_department: '材料学院',
    person_remark: '主要从事X光衍射研究'
  },
  {
    person_idx: 2,
    person_name: '李四',
    person_phone: '13800138001',
    person_email: 'lisi@ustb.edu.cn',
    person_department: '能源与环保学院',
    person_remark: 'CT成像与分析专家'
  },
  {
    person_idx: 3,
    person_name: '王五',
    person_phone: '13800138002',
    person_email: 'wangwu@ustb.edu.cn',
    person_department: '微电子学院',
    person_remark: '纳米加工技术负责人'
  },
  {
    person_idx: 4,
    person_name: '赵六',
    person_phone: '13800138003',
    person_email: 'zhaoliu@ustb.edu.cn',
    person_department: '化学系',
    person_remark: '质谱分析操作员'
  },
  {
    person_idx: 5,
    person_name: '周七',
    person_phone: '13800138004',
    person_email: 'zhouqi@ustb.edu.cn',
    person_department: '加速器中心',
    person_remark: '加速器运维负责人'
  },
  {
    person_idx: 6,
    person_name: '吴八',
    person_phone: '13800138005',
    person_email: 'wuba@ustb.edu.cn',
    person_department: '科研仪器中心',
    person_remark: '仪器管理员'
  }
];

export default [
  // get person list
  {
    url: '/person/persons',
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: persons
      };
    }
  },

  // add person
  {
    url: '/person/persons/',
    method: 'post',
    response: config => {
      const newPerson = config.body;
      newPerson.person_idx = persons.length + 1;
      persons.push(newPerson);
      return {
        code: 20000,
        data: newPerson
      };
    }
  },

  // update person
  {
    url: '/person/persons/:id',
    method: 'put',
    response: config => {
      const { id } = config.query;
      const person = persons.find(p => p.person_idx == id);
      if (person) {
        Object.assign(person, config.body);
        return {
          code: 20000,
          data: person
        };
      }
      return {
        code: 50001,
        message: 'Person not found'
      };
    }
  },

  // delete person
  {
    url: '/person/persons/:id',
    method: 'delete',
    response: config => {
      const { id } = config.query;
      const index = persons.findIndex(p => p.person_idx == id);
      if (index > -1) {
        persons.splice(index, 1);
        return {
          code: 20000,
          data: 'success'
        };
      }
      return {
        code: 50001,
        message: 'Person not found'
      };
    }
  }
];
