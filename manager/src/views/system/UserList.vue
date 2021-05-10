<template>
  <a-card :bordered='false'>
    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter='searchQuery'>
        <a-row :gutter='24'>
          <a-col :md='6' :sm='12'>
            <a-form-item label='账号'>
              <a-input placeholder='输入账号模糊查询' v-model='queryParam.username'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='8'>
            <a-form-item label='性别'>
              <a-select v-model='queryParam.sex' placeholder='请选择性别'>
                <!-- <a-select-option value>请选择</a-select-option> -->
                <a-select-option value='1'>男性</a-select-option>
                <a-select-option value='2'>女性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md='6' :sm='8'>
            <a-form-item label='真实名字'>
              <a-input placeholder='请输入真实名字' v-model='queryParam.realname'></a-input>
            </a-form-item>
          </a-col>

          <template v-if='toggleSearchStatus'>
            <a-col :md='6' :sm='8'>
              <a-form-item label='用户状态'>
                <a-select v-model='queryParam.status' placeholder='请选择'>
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option value='1'>正常</a-select-option>
                  <a-select-option value='2'>冻结</a-select-option>
                </a-select>
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
      <!-- <button v-permission="{ action: 'user:add' }">测试</button> -->
      <a-button @click='handleAdd' type='primary'>
        <template #icon>
          <PlusOutlined />
        </template>
        添加用户
      </a-button>
      <a-button type='primary' @click='recycleBinVisible = true'>
        <template #icon>
          <HddOutlined />
        </template>
        回收站
      </a-button>
      <a-dropdown v-if='selectedRowKeys.length > 0'>
        <template #overlay>
          <a-menu @click='handleMenuClick'>
            <a-menu-item key='1'>
              <a-icon type='delete' @click='batchDel' />删除
            </a-menu-item>
            <a-menu-item key='2'>
              <a-icon type='lock' @click='batchFrozen(2)' />冻结
            </a-menu-item>
            <a-menu-item key='3'>
              <a-icon type='unlock' @click='batchFrozen(1)' />解冻
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
                  <a href='javascript:;' @click='handleDetail(record)'>详情</a>
                </a-menu-item>

                <a-menu-item>
                  <a href='javascript:;' @click='handleChangePassword(record.username)'>密码</a>
                </a-menu-item>

                <a-menu-item>
                  <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>

                <a-menu-item v-if='record.status == 1'>
                  <a-popconfirm title='确定冻结吗?' @confirm='() => handleFrozen(record.id, 2, record.username)'>
                    <a>冻结</a>
                  </a-popconfirm>
                </a-menu-item>

                <a-menu-item v-if='record.status == 2'>
                  <a-popconfirm title='确定解冻吗?' @confirm='() => handleFrozen(record.id, 1, record.username)'>
                    <a>解冻</a>
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
        list: 'sys/userlist',
      },
      columns: [
        {
          title: '用户账号',
          align: 'center',
          dataIndex: 'username',
          width: 120,
          sorter: true,
        },
        {
          title: '用户姓名',
          align: 'center',
          width: 100,
          dataIndex: 'realname',
        },
        {
          title: '头像',
          align: 'center',
          width: 120,
          dataIndex: 'avatar',
          slots: { customRender: 'avatar' },
        },

        {
          title: '性别',
          align: 'center',
          width: 80,
          dataIndex: 'sex_dictText',
          sorter: true,
        },
        {
          title: '生日',
          align: 'center',
          width: 180,
          dataIndex: 'birthday',
        },
        {
          title: '部门',
          align: 'center',
          width: 180,
          dataIndex: 'departIds_dictText',
        },
        {
          title: '状态',
          align: 'center',
          width: 80,
          dataIndex: 'status_dictText',
        },
        {
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          align: 'center',
          width: 150,
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
  }
}) 
</script>
<style lang="scss" scoped>
@import '../../assets/sass/common.scss';
</style>

