<template>
  <a-row :gutter="[8, 0]">
    <a-col :span="leftSpan">
      <a-card :bordered="false">
        <!-- 查询区域 -->

        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter="searchQuery">
            <a-row :gutter="24">
              <a-col :md="12" :sm="8">
                <a-form-item label="角色名称">
                  <a-input placeholder="输入角色名称" v-model="queryParam.roleName"></a-input>
                </a-form-item>
              </a-col>

              <a-col :md="12" :sm="24">
                <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery">
                    <template #icon>
                      <SearchOutlined />
                    </template>
                    查询
                  </a-button>
                  <a-button type="primary" @click="searchReset" style="margin-left: 8px">
                    <template #icon>
                      <ReloadOutlined />
                    </template>
                    重置
                  </a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class="table-operator" style="border-top: 5px">
          <!-- <button v-permission="{ action: 'user:add' }">测试</button> -->
          <a-button @click="handleAdd" type="primary">
            <template #icon>
              <PlusOutlined />
            </template>
            新建角色
          </a-button>
        </div>

        <!-- table区域-begin -->
        <div>
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;
            <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          </div>

          <a-table
            ref="table"
            bordered
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            @change="handleTableChange"
          >
            <template #avatar="{text}">
              <a-avatar :src="text"></a-avatar>
            </template>
            <template #action="{record}">
              <a @click="getUser(record)">用户</a>
              <a-divider type="vertical" />
              <a-dropdown>
                <a class="ant-dropdown-link">
                  更多
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a href="javascript:;" @click="setAuth(record)">授权</a>
                    </a-menu-item>

                    <a-menu-item>
                      <a href="javascript:;" @click="handleChangePassword(record.username)">编辑</a>
                    </a-menu-item>

                    <a-menu-item>
                      <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                        <a>删除</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </a-table>
        </div>
      </a-card>
    </a-col>

    <a-col :span="rightSpan" class="right-table" v-if="rightSpan === 12">
      <a-card>
        <p style="text-align:right">
          <label style="display:inline-block;cursor:pointer;margin-bottom: 10px" @click="closeRight">
            <CloseCircleOutlined />
          </label>
        </p>
        <div>
          <a-table
            bordered
            size="middle"
            rowKey="id"
            :columns="userColumns"
            :dataSource="userDataSource"
            :pagination="false"
            :loading="userLoading"
          >
            <template #avatar="{text}">
              <a-avatar :src="text"></a-avatar>
            </template>
          </a-table>
        </div>
      </a-card>
    </a-col>
  </a-row>

  <a-drawer
    :title="drawerTitle + '角色权限配置'"
    width="500"
    placement="right"
    :closable="true"
    v-model:visible="drawerVisible"
  >
    <a-tree
      v-model:checkedKeys="checkedKeys"
      checkable
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="treeData"
      @expand="onExpand"
    />
    <div class="drawer-bottom">
      <a-button style="marginRight: 8px" @click="drawerVisible = false">取消</a-button>
      <a-button type="primary" @click="drawerVisible = false">保存</a-button>
    </div>
  </a-drawer>
</template>

<script lang="ts">
import getList from '@/mixins/mixin.ts'
import {
  DownOutlined,
  PlusOutlined,
  HddOutlined,
  SearchOutlined,
  ReloadOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'
import { reactive, toRefs, defineComponent } from 'vue'
import api from '@/api/api.ts'
import { routes } from '@/router/index'
export default defineComponent({
  name: 'RoleList',
  components: {
    DownOutlined,
    PlusOutlined,
    HddOutlined,
    SearchOutlined,
    ReloadOutlined,
    CloseCircleOutlined
  },
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],

      drawerTitle: '',
      userLoading: false,
      rightSpan: 0,
      leftSpan: 24,
      drawerVisible: false,
      treeData: [],
      userColumns: [
        {
          title: '用户账号',
          align: 'center',
          dataIndex: 'username',
          width: 120
        },
        {
          title: '用户姓名',
          align: 'center',
          width: 100,
          dataIndex: 'realname'
        },
        {
          title: '头像',
          align: 'center',
          width: 120,
          dataIndex: 'avatar',
          slots: { customRender: 'avatar' }
        },

        {
          title: '性别',
          align: 'center',
          width: 80,
          dataIndex: 'sex_dictText'
        },
        {
          title: '生日',
          align: 'center',
          width: 180,
          dataIndex: 'birthday'
        },
        {
          title: '部门',
          align: 'center',
          width: 180,
          dataIndex: 'departIds_dictText'
        },
        {
          title: '状态',
          align: 'center',
          width: 80,
          dataIndex: 'status_dictText'
        }
      ],
      userDataSource: []
    }
  },
  setup() {
    const datap = reactive({
      url: {
        list: 'sys/rolelist',
        user: 'sys/userlist'
      },
      columns: [
        {
          title: '角色编码',
          align: 'center',
          dataIndex: 'roleCode'
        },
        {
          title: '角色名称',
          align: 'center',
          dataIndex: 'roleName'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          slots: { customRender: 'action' }
        }
      ],
      description: '这是角色管理页面',
      queryParam: {},
      recycleBinVisible: false
    })
    const { data, getListF, handleToggleSearch, handleTableChange, onSelectChange } = getList({
      url: datap.url,
      columns: datap.columns
    })
    getListF()
    const params = { ...data, ...datap }
    return {
      ...toRefs(params),
      getListF,
      handleToggleSearch,
      handleTableChange,
      onSelectChange
      // dataParams
    }
  },
  mounted() {
    this.getTreeData()
    // this.getUserList()
  },
  methods: {
    getTreeData() {
      const menus = routes.find((item) => item.name === 'home').children
      const arr = this.setTreeData(menus, [])
      this.treeData = arr
      console.log(arr, 'treeData')
    },
    setTreeData(list, arr) {
      for (let i = 0, l = list.length; i < l; i++) {
        if (list[i].hidden) continue
        const obj = { title: '', key: '' }
        obj['title'] = list[i].meta.title
        obj['key'] = list[i].name
        arr.push(obj)
        if (list[i].children) {
          obj['children'] = []
          this.setTreeData(list[i].children, obj['children'])
        }
      }
      return arr
    },
    async getUserList() {
      this.userLoading = true
      const res: any = await api.get(this.url.user)
      if (res.success) {
        const result = res.result
        this.userLoading = false
        this.userDataSource = result.records
      }
    },
    getUser() {
      this.leftSpan = 12
      this.rightSpan = 12
      this.getUserList()
    },
    closeRight() {
      this.leftSpan = 24
      this.rightSpan = 0
      console.log('close')
    },
    setAuth(obj) {
      this.drawerTitle = obj.roleName
      this.drawerVisible = true
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../../assets/sass/common.scss";
</style>
