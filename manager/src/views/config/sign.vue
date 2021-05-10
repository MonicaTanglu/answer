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
            <a-form-item label='真实名字'>
              <a-input placeholder='请输入真实名字' v-model='queryParam.realname'></a-input>
            </a-form-item>
          </a-col>

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
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class='table-operator' style='border-top: 5px'>
      <!-- <button v-permission="{ action: 'user:add' }">测试</button> -->
      <a-button @click='add' type='primary'>
        <template #icon>
          <PlusOutlined />
        </template>
        添加用户签章
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
        rowKey='departIds'
        :columns='columns'
        :dataSource='dataSource'
        :pagination='ipagination'
        :loading='loading'
        :rowSelection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
        @change='handleTableChange'
      >
        <template #avatar='{text}'>
          <a-image :width='60' :src='text' />
        </template>
        <template #action='{record}'>
          <a @click='operateVisible = true'>编辑</a>
          <a-divider type='vertical' />
          <a-popconfirm title='确定删除吗?' @confirm='() => handleDelete(record.id)'>
            <a>删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </a-card>
  <a-modal
    v-model:visible='operateVisible'
    @ok='ok'
    @cancel='operateVisible = false'
    width='600px'
    cancelText='取消'
    okText='确定'
  >
    <a-form name='custom-validation' ref='ruleForm' :label-col='labelCol' :wrapper-col='wrapperCol' :model='ruleForm'>
      <a-form-item required has-feedback label='用户名' name='username'>
        <a-select v-model:value='ruleForm.username' placeholder='请选择用户'>
          <a-select-option value='zhangsan'>张三</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item has-feedback label='签章' name='signImage'>
        <a-upload
          v-model:fileList='fileList'
          name='avatar'
          list-type='picture-card'
          class='avatar-uploader'
          :show-upload-list='false'
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          :before-upload='beforeUpload'
          @change='handleChange'
        >
          <img v-if='imageUrl' :src='imageUrl' alt='avatar' />
          <div v-else>
            <loading-outlined v-if='imageLoading' />
            <plus-outlined v-else />
            <div class='ant-upload-text'>上传</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import getList from '@/mixins/mixin.ts'
import { DownOutlined, PlusOutlined, HddOutlined, SearchOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { reactive, toRefs, defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      operateVisible: false
    }
  },
  name: 'UserList',
  components: {
    DownOutlined,
    PlusOutlined,
    HddOutlined,
    SearchOutlined,
    ReloadOutlined,
    LoadingOutlined
  },
  setup() {
    const datap = reactive({
      url: {
        list: 'sys/userlist',
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ruleForm: {
        username: '',
        signImage: ''
      },
      fileList: [],
      imageLoading: false,
      imageUrl: '',
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
          title: '签章',
          align: 'center',
          width: 120,
          dataIndex: 'avatar',
          slots: { customRender: 'avatar' },
        },
        {
          title: '创建时间',
          align: 'center',
          width: 80,
          dataIndex: 'createTime',
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
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.imageLoading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.imageLoading = false;
        });
      }
      if (info.file.status === 'error') {
        this.imageLoading = false;
      }
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    add() {
      this.operateVisible = true
    },
    ok() {
      console.log('ok')
    }
  }
}) 
</script>
<style lang="scss" scoped>
@import '../../assets/sass/common.scss';
</style>

