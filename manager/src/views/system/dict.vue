<template>
  <a-row :gutter="[8, 0]">
    <a-col :span="leftSpan">
      <a-card :bordered="false">
        <!-- 查询区域 -->

        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter="searchQuery">
            <a-row :gutter="24">
              <a-col :md="8" :sm="8">
                <a-form-item label="字典名称">
                  <a-input placeholder="输入字典名称" v-model="queryParam.roleName"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="8">
                <a-form-item label="字典编码">
                  <a-input placeholder="输入字典编码" v-model="queryParam.roleName"></a-input>
                </a-form-item>
              </a-col>

              <a-col :md="8" :sm="24">
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
          <a-button @click="addDict" type="primary" class="m-r-10">
            <template #icon>
              <PlusOutlined />
            </template>
            添加字典
          </a-button>
          <a-button v-if="selectedRowKeys.length > 0" type="danger" ghost>批量删除</a-button>
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
              <a @click="getList(record)">
                <SettingOutlined />字典项
              </a>
              <a-divider type="vertical" />
              <a @click="edit(record)">
                <EditOutlined />编辑
              </a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a type="link">
                  <DeleteOutlined />删除
                </a>
              </a-popconfirm>
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
        <div class="scroll-right">
          <div class="table-page-search-wrapper">
            <a-form layout="inline" @keyup.enter="searchQuery">
              <a-row :gutter="24">
                <a-col :md="8" :sm="8">
                  <a-form-item label="字典项名称">
                    <a-input placeholder="输入字典项名称" v-model="queryParam.roleName"></a-input>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="8">
                  <a-form-item label="字典项编码">
                    <a-input placeholder="输入字典项编码" v-model="queryParam.roleName"></a-input>
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
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
            <a-button @click="addDictItem" type="primary" class="m-r-10">
              <template #icon>
                <PlusOutlined />
              </template>
              添加字典项
            </a-button>
          </div>
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
              <template #action="{record}">
                <a @click="dictItemEdit(record)">
                  <EditOutlined />编辑
                </a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a type="link">
                    <DeleteOutlined />删除
                  </a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
  <a-modal v-model:visible="dictShow" :footer="null" :title="modalTitle">
    <custom-form ref="dictForm" :formArr="dictFormArr"></custom-form>
  </a-modal>

  <a-modal v-model:visible="dictItemShow" :footer="null" :title="modalTitle">
    <custom-form ref="dictItemForm" :formArr="dictItemFormArr"></custom-form>
  </a-modal>
</template>

<script lang="ts">
import getList from '@/mixins/mixin.ts'
import {
  DownOutlined,
  PlusOutlined,
  HddOutlined,
  SearchOutlined,
  ReloadOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import { reactive, toRefs, defineComponent } from 'vue'
import api from '@/api/api.ts'
import dictObj from './config'
import CustomForm from '@/components/CustomForm.vue'
export default defineComponent({
  name: 'RoleList',
  components: {
    DownOutlined,
    PlusOutlined,
    HddOutlined,
    SearchOutlined,
    ReloadOutlined,
    CloseCircleOutlined,
    SettingOutlined,
    EditOutlined,
    DeleteOutlined,
    CustomForm
  },
  data() {
    return {
      modalTitle: '新增',
      userLoading: false,
      rightSpan: 0,
      leftSpan: 24,
      dictShow: false,
      dictItemShow: false,
      userColumns: [
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
          title: '字典项名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '字典项值',
          align: 'center',
          dataIndex: 'key'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          slots: { customRender: 'action' }
        }
      ],
      userDataSource: [],
      dictFormArr: dictObj.dictFormArr,
      dictItemFormArr: dictObj.dictItemFormArr
    }
  },
  setup() {
    const datap = reactive({
      url: {
        list: 'sys/dictlist',
        dictItem: 'sys/dictItemlist'
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
          title: '字典名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '字典编码',
          align: 'center',
          dataIndex: 'key'
        },
        {
          title: '描述',
          align: 'center',
          dataIndex: 'remark'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          slots: { customRender: 'action' }
        }
      ],
      description: '这是字典管理页面',
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
    // this.getUserList()
  },
  methods: {
    async getDictItemList() {
      this.userLoading = true
      const res: any = await api.get(this.url.dictItem)
      if (res.success) {
        const result = res.result
        this.userLoading = false
        this.userDataSource = result.records
      }
    },
    edit(record: Record<string, any>) {
      this.modalTitle = '编辑'
      for (let i = 0, l = this.dictFormArr.length; i < l; i++) {
        if (record.hasOwnProperty(this.dictFormArr[i].key))
          this.dictFormArr[i].value = record[this.dictFormArr[i].key]
      }
      const domForm = this.$refs.dictForm as any
      if (domForm) domForm.setForm(this.dictFormArr)
      this.dictShow = true
    },
    dictItemEdit(record: Record<string, any>) {
      this.modalTitle = '编辑'
      for (let i = 0, l = this.dictItemFormArr.length; i < l; i++) {
        if (record.hasOwnProperty(this.dictItemFormArr[i].key))
          this.dictItemFormArr[i].value = record[this.dictItemFormArr[i].key]
      }
      const domForm = this.$refs.dictItemForm as any
      if (domForm) domForm.setForm(this.dictItemFormArr)
      this.dictItemShow = true
    },
    getList() {
      this.leftSpan = 12
      this.rightSpan = 12
      this.getDictItemList()
    },
    closeRight() {
      this.leftSpan = 24
      this.rightSpan = 0
    },
    addDict() {
      this.modalTitle = '新增'
      this.dictFormArr = dictObj.reset(this.dictFormArr)
      const domForm = this.$refs.dictForm as any
      domForm.setForm(this.dictFormArr)
      this.dictShow = true
    },
    addDictItem() {
      this.modalTitle = '新增'
      this.dictItemFormArr = dictObj.reset(this.dictItemFormArr)
      const domForm = this.$refs.dictItemForm as any
      domForm.setForm(this.dictItemFormArr)
      this.dictItemShow = true
    }
  }
})
</script>
<style lang="scss" scoped>
@import "../../assets/sass/common.scss";
</style>
