<template>
  <a-card :bordered='false'>
    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter='searchQuery'>
        <a-row :gutter='24'>
          <a-col :md='6' :sm='12'>
            <a-form-item label='权利人名称'>
              <a-input placeholder='输入申请人名称' v-model='queryParam.power'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='12'>
            <a-form-item label='权利人证件号'>
              <a-input placeholder='输入权利人证件号' v-model='queryParam.powerIdCard'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='12'>
            <a-form-item label='业务号'>
              <a-input placeholder='业务号' v-model='queryParam.number'></a-input>
            </a-form-item>
          </a-col>

          <template v-if='toggleSearchStatus'>
            <a-col :md='6' :sm='12'>
              <a-form-item label='申请人'>
                <a-input placeholder='申请人' v-model='queryParam.applyer'></a-input>
              </a-form-item>
            </a-col>

            <a-col :md='6' :sm='12'>
              <a-form-item label='坐落'>
                <a-input placeholder='坐落' v-model='queryParam.address'></a-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md='6' :sm='8'>
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
              <a @click='handleToggleSearch' style='margin-left: 8px'>
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type='toggleSearchStatus ? "up" : "down"' />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator' style='border-top: 5px'>
      <a-button type='primary'>批量审核</a-button>
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
        :scroll='{ x: 1500, y: 550 }'
      >
        <template #avatar='{text}'>
          <a-avatar :src='text'></a-avatar>
        </template>
        <template #action='{record}'>
          <a-button type='primary' size='small' @click='getTask(record)'>初审</a-button>
          <a-button type='primary' size='small' class='m-l-10' @click='getTask(record)'>审核</a-button>
          <!-- <a-button type='primary' @click='getTask(record)'>初审</a-button> -->
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
        list: 'daily/list',
      },
      columns: [
        {
          title: '业务号',
          align: 'center',
          dataIndex: 'number',
          width: 80,
        },
        {
          title: '超时预警',
          align: 'center',
          width: 100,
          dataIndex: 'overtime',
        },
        {
          title: '权利人',
          align: 'center',
          width: 100,
          dataIndex: 'power',
        },
        {
          title: '权利人证件号',
          align: 'center',
          dataIndex: 'powerIdCard',
        },
        {
          title: '申请人 ',
          align: 'center',
          width: 100,
          dataIndex: 'applyer',
        },
        {
          title: '不动产单元号 ',
          align: 'center',
          width: 100,
          dataIndex: 'bdcqdyh'
        },
        {
          title: '坐落',
          align: 'center',
          width: 150,
          dataIndex: 'address'
        },
        {
          title: '面积',
          align: 'center',
          width: 80,
          dataIndex: 'area'
        },
        {
          title: '权利性质',
          align: 'center',
          width: 120,
          dataIndex: 'qlxz',
        },
        {
          title: '用途',
          align: 'center',
          width: 110,
          dataIndex: 'uses',
        },
        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 180,
          slots: { customRender: 'action' },
          align: 'center'
        },
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
  },
  methods: {
    getTask() {
      router.push({ name: 'daily-detail' })
    }
  }
}) 
</script>
<style lang="scss" scoped>
@import '../../assets/sass/common.scss';
</style>

