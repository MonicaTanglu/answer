import Mock from 'mockjs'
const Random = Mock.Random

function getArr(obj, length) {
  let arr = []
  while (length > 0) {
    arr.push(obj)
    length--
  }
}
Mock.mock(RegExp('/sys/departlist' + '.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    'result|10-10': [
      {
        'children|1-4': [
          {
            key: Random.id,
            departName: Random.cword(3, 5),
            key: Random.id,
            orgType: Random.cword(3, 5),
            orgCode: Random.integer(1000, 9999),
            address: Random.county(true),
            departOrder: Random.integer(1, 20)
          }
        ],
        key: Random.id,
        departName: Random.cword(3, 5),
        key: Random.id,
        orgType: Random.cword(3, 5),
        orgCode: Random.integer(1000, 9999),
        address: Random.county(true),
        departOrder: Random.integer(1, 20)
      }
    ]
  }
})

Mock.mock(RegExp('/sys/menulist.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    'result|10-10': [
      {
        'children|1-4': [
          {
            icon: Random.word(7),
            isLeaf: Random.boolean,
            key: Random.id,
            parentId: Random.id,
            label: Random.cword(3, 5),
            title: Random.cword(3, 5),
            value: Random.id,
            name: Random.cword(3, 5),
            key: Random.id,
            menuType: Random.pick(['菜单', '按钮/权限']),
            component: 'dashboard/index',
            url: '/app/index',
            sortNo: Random.integer(1, 20)
          }
        ],
        icon: Random.word(7),
        isLeaf: Random.boolean,
        key: Random.id,
        parentId: Random.id,
        label: Random.cword(3, 5),
        title: Random.cword(3, 5),
        value: Random.id,
        name: Random.cword(3, 5),
        key: Random.id,
        menuType: Random.pick(['菜单', '按钮/权限']),
        component: 'dashboard/index',
        url: '/app/index',
        sortNo: Random.integer(1, 20)
      }
    ]
  }
})

Mock.mock(RegExp('/sys/positionlist.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: {
      current: 1,
      orders: [],
      page: 1,
      total: 16,
      size: 5,
      searchCount: true,
      'records|10-10': [
        {
          createBy: Random.cname,
          createTime: Random.datetime,
          postRank_dictText: Random.csentence(5, 10),
          id: Random.id,
          code: Random.word(7),
          name: Random.cword(3, 5)
        }
      ]
    }
  }
})

Mock.mock(RegExp('/sys/randomImage' + '.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: Random.image('105x35', '#50B347', '#FFF', 'ab12')
  }
})

Mock.mock(RegExp('/sys/rolelist' + '.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: {
      current: 1,
      orders: [],
      page: 1,
      total: 16,
      size: 5,
      searchCount: true,
      'records|10-10': [
        {
          createBy: Random.cname,
          createTime: Random.datetime,
          description: Random.csentence(5, 10),
          id: Random.id,
          roleCode: Random.word(7),
          roleName: Random.cword(3, 5),
          createBy: Random.cname,
          createTime: Random.datetime
        }
      ]
    }
  }
})

Mock.mock(RegExp('/sys/userlist' + '.*'), 'get', () => {
  const list = {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: {
      current: 1,
      orders: [],
      page: 1,
      total: 16,
      size: 5,
      searchCount: true,
      'records|10-10': [
        {
          activitiSync: 1,
          avatar: Random.image('200x100', '#50B347', '#FFF', 'ZS'),
          realname: Random.cname,
          birthday: Random.datetime,
          createTime: Random.datetime,
          departIds: Random.id,
          departIds_dictText: '技术部',
          email: Random.email,
          post: '普通员工',
          sex: Random.integer(1, 2),
          sex_dictText: Random.cword('男女', 1, 1),
          status: Random.integer(1, 2),
          status_dictText: Random.pick(['正常', '冻结']),
          username: Random.word(3, 5),
          workNo: Random.integer(1000, 10000),
          templateName: Random.cword(4, 7),
          templateImage: Random.image('200x400', '#50B347', '#FFF', '模板')
        }
      ]
    }
  }
  return Mock.toJSONSchema(list)
})

Mock.mock(RegExp('/sys/login' + '.*'), 'post', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: {
      token: Random.string(7, 20),
      userInfo: {
        avatar: Random.image('200x100', '#50B347', '#FFF', 'ZS'),
        realname: Random.cname
      }
    }
  }
})

Mock.mock(RegExp('/business/list' + '.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: {
      current: 1,
      orders: [],
      page: 1,
      total: 16,
      size: 5,
      searchCount: true,
      'records|10-10': [
        {
          createBy: Random.cname,
          createTime: Random.datetime,
          applyUser: Random.cname,
          contactUser: Random.cname,
          contactPhone: Random.integer(10000, 99999),
          id: Random.id,
          address: Random.region,
          status: Random.pick(['处理中', '材料补齐中']),
          updateTime: Random.datetime
        }
      ]
    }
  }
})

Mock.mock(RegExp('/daily/list' + '.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: {
      current: 1,
      orders: [],
      page: 1,
      total: 16,
      size: 5,
      searchCount: true,
      'records|10-10': [
        {
          number: Random.integer(10000, 99999),
          overtime: Random.cword(3, 5),
          power: Random.cname,
          powerIdCard: Random.guid,
          applyer: Random.cname,
          address: Random.region,
          area: Random.integer(60, 100),
          qlxz: Random.cword(4, 7),
          uses: Random.cword(5, 7),
          id: Random.id,
          bdcqdyh: Random.word(8, 12),
          currentNode: Random.pick(['受理', '初审', '审核']),
          flowStatus: Random.pick(['待领取', '待提交'])
        }
      ]
    }
  }
})

Mock.mock(RegExp('/process/list' + '.*'), 'get', () => {
  return {
    success: true,
    message: '操作成功',
    timestamp: 16116,
    code: 200,
    result: {
      current: 1,
      orders: [],
      page: 1,
      total: 16,
      size: 5,
      searchCount: true,
      'records|10-10': [
        {
          createBy: Random.cname,
          createTime: Random.datetime,
          id: Random.id,
          processKey: Random.word(7),
          processName: Random.cword(3, 5)
        }
      ]
    }
  }
})
