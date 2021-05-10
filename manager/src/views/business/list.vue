<template>
  <a-card :bordered='false'>
    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter='searchQuery'>
        <a-row :gutter='24'>
          <a-col :md='6' :sm='6'>
            <a-form-item label='申请人'>
              <a-input placeholder='输入申请人' v-model='queryParam.applyUser'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='6'>
            <a-form-item label='联系人'>
              <a-input placeholder='请输入联系人' v-model='queryParam.contactUser'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='6'>
            <a-form-item label='联系电话'>
              <a-input placeholder='请输入联系电话' v-model='queryParam.contactPhone'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='6'>
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
      <!-- <a-button @click='handleAdd' type='primary'>
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>-->

      <!-- <a-dropdown v-if='selectedRowKeys.length > 0'>
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
      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- <div class='ant-alert ant-alert-info' style='margin-bottom: 16px;'>
        <i class='anticon anticon-info-circle ant-alert-icon'></i>已选择&nbsp;
        <a style='font-weight: 600'>{{selectedRowKeys.length}}</a>项&nbsp;&nbsp;
        <a style='margin-left: 24px' @click='onClearSelected'>清空</a>
      </div>-->

      <a-table
        ref='table'
        bordered
        size='middle'
        rowKey='id'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        @change='handleTableChange'
      >
        <template #action='{record}'>
          <a @click='edit(record)'>去处理</a>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script lang="ts">
import getList from '@/mixins/mixin.ts'
import { DownOutlined, PlusOutlined, HddOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { reactive, toRefs, defineComponent } from 'vue'
import router from '@/router/index'
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
        list: 'business/list',
      },
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t) {
            return t.index + 1
          }
        },
        {
          title: '申请人',
          align: 'center',
          dataIndex: 'applyUser'
        },
        {
          title: '联系人',
          align: 'center',
          dataIndex: 'contactUser'
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'contactPhone'
        },
        {
          title: '坐落',
          align: 'center',
          dataIndex: 'address'
        },
        {
          title: '上次处理时间',
          align: 'center',
          dataIndex: 'updateTime'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          slots: { customRender: 'action' },
        }
      ],
      description: '这是受理管理页面',
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
  },
  methods: {
    edit() {
      router.push({ name: 'business-accept' })
    }
  }
}) 
</script>
<style lang="scss" scoped>
@import '../../assets/sass/common.scss';
</style>

