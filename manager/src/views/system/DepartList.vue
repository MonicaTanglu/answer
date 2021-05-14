<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="12" :sm="8">
            <a-form-item label="部门名称">
              <a-input placeholder="输入部门名称" v-model="queryParam.departName"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary">
                <template #icon>
                  <SearchOutlined />
                </template>
                查询
              </a-button>
              <a-button type="primary" style="margin-left: 8px">
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
        新增
      </a-button>
      <a-button @click="batchDel" v-if="selectedRowKeys.length > 0" ghost type="primary">
        <template #icon>
          <DeleteOutlined />
        </template>批量删除
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
        bordered
        size="middle"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @expandedRowsChange="handleExpandedRowsChange"
      >
        <template #action="{record}">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="handleDetail(record)">详情</a>
                </a-menu-item>

                <a-menu-item>
                  <a href="javascript:;" @click="handleChangePassword(record.username)">添加下级</a>
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
</template>

<script lang="ts">
import getList from '@/mixins/mixin.ts'
import api from '@/api/api.ts'
import {
  DownOutlined,
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
import { reactive, toRefs, defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'RoleList',
  components: {
    DownOutlined,
    PlusOutlined,
    DeleteOutlined,
    ReloadOutlined,
    SearchOutlined
  },
  setup() {
    const datap = reactive({
      expandedRowKeys: [],
      url: {
        list: 'sys/departlist'
      },
      columns: [
        {
          title: '机构名称',
          dataIndex: 'departName'
        },
        {
          title: '机构类型',
          align: 'center',
          dataIndex: 'orgType'
        },
        {
          title: '机构编码',
          dataIndex: 'orgCode'
        },
        {
          title: '地址',
          dataIndex: 'address'
        },
        {
          title: '排序',
          align: 'center',
          dataIndex: 'departOrder'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          key: 'action',
          slots: { customRender: 'action' }
        }
      ],
      description: '这是部门管理页面',
      queryParam: {},
      recycleBinVisible: false
    })
    const { data, handleToggleSearch, handleTableChange, onSelectChange } = getList({
      url: datap.url,
      columns: datap.columns
    })
    const params = { ...data, ...datap }
    return {
      ...toRefs(params),
      // getListF,
      handleToggleSearch,
      handleTableChange,
      onSelectChange
      // dataParams
    }
  },
  mounted() {
    this.getDepatList()
  },
  methods: {
    async getDepatList() {
      this.loading = ref(true)
      const res: any = await api.get(this.url.list)
      if (res.success) {
        const result = res.result
        for (let i = 0, l = result.length; i < l; i++) {
          const key = (i + 1).toString()
          result[i].key = key
          const children = result[i].children
          for (let j = 0, cl = children.length; j < cl; j++) {
            const cKey = key + (j + 1).toString()
            result[i].children[j].key = cKey
          }
        }
        this.loading = ref(false)
        this.dataSource = result
      }
    },
    expandSubmenu(expand, record) {
      const children = record.children
      if (expand) {
        record.children = children
        console.log('expandSubmenu', record, children)
      }
    },
    handleExpandedRowsChange(expandedRows) {
      this.expandedRowKeys = expandedRows
      console.log('expandRow', this.expandedRowKeys)
    },
    batchDel() {
      console.log('del')
    },
    handleAdd() {
      console.log('add')
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../../assets/sass/common.scss";
</style>
