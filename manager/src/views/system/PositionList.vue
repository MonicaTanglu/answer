<template>
  <a-card :bordered='false'>
    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter='searchQuery'>
        <a-row :gutter='24'>
          <a-col :md='8' :sm='8'>
            <a-form-item label='职务编码'>
              <a-input placeholder='输入职务编码' v-model='queryParam.code'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='8' :sm='8'>
            <a-form-item label='职务名称'>
              <a-input placeholder='请输入职务名称' v-model='queryParam.name'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='8' :sm='8'>
            <span style='float: left;overflow: hidden;' class='table-page-search-submitButtons'>
              <a-button type='primary' @click='searchQuery'>
                <template #icon>
                  <SearchOutlined />
                </template>
                查询
              </a-button>
              <a-button type='primary' @click='searchReset' style='margin-left: 8px'>
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
    <div class='table-operator' style='border-top: 5px'>
      <!-- <button v-permission="{ action: 'user:add' }">测试</button> -->
      <a-button @click='handleAdd' type='primary'>
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>

      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <template #overlay>
          <a-menu @click='handleMenuClick'>
            <a-menu-item key='1'>
              <a-icon type='delete' @click='batchDel' />删除
            </a-menu-item>
          </a-menu>
        </template>

        <a-button style='margin-left: 8px'>
          批量操作
          <a-icon type='down' />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
        <i class='anticon anticon-info-circle ant-alert-icon'></i>已选择&nbsp;
        <a style='font-weight: 600'>{{selectedRowKeys.length}}</a>项&nbsp;&nbsp;
        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
      </div>

      <a-table
        ref='table'
        bordered
        size='middle'
        rowKey='id'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :rowSelection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
        @change='handleTableChange'
      >
        <template #avatar='{text}'>
          <a-avatar :src='text'></a-avatar>
        </template>
        <template #action='{record}'>
          <a @click='handleEdit(record)'>编辑</a>
          <a-divider type='vertical' />
          <a-dropdown>
            <a class='ant-dropdown-link'>
              更多
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
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
import { DownOutlined, PlusOutlined, HddOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { reactive, toRefs, defineComponent } from 'vue'
export default defineComponent({
  name: 'UserList',
  components: {
    DownOutlined,
    PlusOutlined,
    HddOutlined,
    SearchOutlined,
    ReloadOutlined
  },
  setup() {
    const datap = reactive({
      url: {
        list: 'sys/positionlist',
      },
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t) {
            return t.index + 1
          }
        },
        {
          title: '职务编码',
          align: 'center',
          dataIndex: 'code'
        },
        {
          title: '职务名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '职级',
          align: 'center',
          dataIndex: 'postRank_dictText'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          slots: { customRender: 'action' },
        }
      ],
      description: '这是用户管理页面',
      queryParam: {},
      recycleBinVisible: false,
    })
    const { data, getListF, handleToggleSearch, handleTableChange, onSelectChange } = getList({
      url: datap.url,
      columns: datap.columns,
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
  }
}) 
</script>
<style lang="scss" scoped>
@import '../../assets/sass/common.scss';
</style>

