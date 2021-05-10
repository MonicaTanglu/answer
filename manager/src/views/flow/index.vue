<template>
  <a-card :bordered='false'>
    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter='searchQuery'>
        <a-row :gutter='24'>
          <a-col :md='8' :sm='8'>
            <a-form-item label='流程名称'>
              <a-input placeholder='输入流程名称' v-model='queryParam.code'></a-input>
            </a-form-item>
          </a-col>

          <!-- <a-col :md='8' :sm='8'>
            <a-form-item label='创建人'>
              <a-input placeholder='请输入流程编码' v-model='queryParam.name'></a-input>
            </a-form-item>
          </a-col>-->

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
      <a-button @click='addProcess' type='primary'>
        <template #icon>
          <PlusOutlined />
        </template>
        新建流程
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
          <a @click='addProcess(record)'>编辑</a>
          <a-divider type='vertical' />
          <a @click='flowNodevisible = true'>流程配置</a>
          <a-divider type='vertical' />
          <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
            <a>删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </a-card>
  <a-modal v-model:visible='visible' :footer='null' width='1000px' @cancel='closeModal'>
    <go-flow></go-flow>
  </a-modal>
  <a-modal v-model:visible='flowNodevisible' :footer='null' width='700px' @cancel='closeModal'>
    <a-table size='middle' rowKey='id' bordered :data-source='dataNode' :columns='flowNodeColumns'>
      <template #person='{ text,record }'>
        <editable-cell :text='text' @change='val => onCellChange(record, "realname", val)' />
      </template>
    </a-table>
  </a-modal>
</template>



<script lang="ts">
import getList from '@/mixins/mixin.ts'
import { DownOutlined, PlusOutlined, HddOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { reactive, toRefs, defineComponent } from 'vue'
import GoFlow from '@/components/GoFlow.vue'
import EditableCell from '@/components/EditableCell.vue'


export default defineComponent({
  name: 'flowlist',
  components: {
    DownOutlined,
    PlusOutlined,
    HddOutlined,
    SearchOutlined,
    ReloadOutlined,
    GoFlow,
    EditableCell
  },
  data() {
    return {
      visible: false,
      flowNodevisible: false,
      flowNodeColumns: [
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
          title: '节点名称',
          align: 'center',
          dataIndex: 'nodeName'
        }, {
          title: '受理人',
          align: 'center',
          dataIndex: 'realname',
          slots: { customRender: 'person' }
        }
      ],
      dataNode: [{
        id: 1,
        nodeName: '受理',
        realname: '孔杰'
      },
      {
        id: 2,
        nodeName: '初审',
        realname: '邓丽'
      },
      {
        id: 4,
        nodeName: '审核',
        realname: '唐伟'
      }]
    }
  },
  setup() {
    const datap = reactive({
      url: {
        list: 'process/list',
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
          title: '流程名称',
          align: 'center',
          dataIndex: 'processName'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '创建人',
          align: 'center',
          dataIndex: 'createBy'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          slots: { customRender: 'action' },
        }
      ],
      description: '这是流程管理',
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
    closeModal() {
      this.visible = false
      this.flowNodevisible = false
    },
    addProcess() {
      this.visible = true
      console.log('visible', this.visible)
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataNode];
      const target = dataSource.find(item => item.id === key.id);
      if (target) {
        target[dataIndex] = value;
        this.dataNode = dataSource;
      }
    }
  }
}) 
</script>
<style lang="scss" scoped>
@import '../../assets/sass/common.scss';
</style>
