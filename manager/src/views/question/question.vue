<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter="searchQuery">
        <!-- <a-col :span='12'> -->
        <a-form-item label="名称">
          <a-input placeholder="输入名称" v-model="queryParam.name"></a-input>
        </a-form-item>
        <!-- </a-col> -->

        <a-form-item>
          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-button type="primary" @click="searchQuery">
              <template #icon>
                <SearchOutlined />
              </template>
              查询
            </a-button>
            <!-- <a-button type='primary' @click='searchReset' style='margin-left: 8px'>
              <template #icon>
                <ReloadOutlined />
              </template>
              重置
            </a-button>-->
          </span>
        </a-form-item>
      </a-form>
    </div>
    <!-- <a-divider /> -->
    <!-- 操作按钮区域 -->
    <div class="table-operator text-right" style="border-top: 5px">
      <a-button type="primary" @click="add">
        <PlusOutlined />新增
      </a-button>
    </div>

    <div class="m-t-10">
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
        <template #title="{record}">{{$filters.ellipsis(record.title,30)}}</template>
        <template #action="{record}">
          <a-button type="primary" size="small" @click="edit(record)">编辑</a-button>
          <a-button type="danger" size="small" class="m-l-10" @click="remove(record)">删除</a-button>
        </template>
      </a-table>
    </div>

    <a-modal
      v-model:visible="modalVisible"
      title="问题"
      :closable="true"
      :footer="null"
      :maskClosable="false"
      @cancel="closeModal"
      @afterClose="resetForm"
    >
      <a-form :model="qsForm" ref="formRef" :rules="rules" :label-col="{span: 4}" :wrapper-col="{span: 18}">
        <a-form-item label="标题" name="title">
          <a-textarea :rows="3" v-model:value="qsForm.title" :placeholder="rules.title.message" />
        </a-form-item>
        <a-form-item label="题型" name="type">
          <a-select v-model:value="qsForm.type" :placeholder="rules.type.message" @change="typeChange">
            <a-select-option value="single">单选</a-select-option>
            <a-select-option value="multiple">多选</a-select-option>
            <a-select-option value="judge">判断</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="类型" name="category">
          <a-select v-model:value="qsForm.category" :placeholder="rules.category.message">
            <a-select-option v-for="(item,index) of categoryList" :key="index" :value="item.key">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选项" name="options">
          <a-checkbox-group v-if="qsForm.type === 'multiple'" v-model:value="qsForm.answer">
            <!-- <template v-if="options.length > 0"> -->
            <div style="display:flex" class="m-t-10" v-for="(item,index) of options" :key="index">
              <a-checkbox :value="item.key"></a-checkbox>
              <a-textarea class="m-l-10" :rows="2" v-model:value="item.value" placeholder="请填写选项" />
              <a-button type="primary" class="m-l-10" @click="addOptions">新增</a-button>
              <a-button type="danger" class="m-l-10" v-if="options.length > 1">删除</a-button>
            </div>
          </a-checkbox-group>
          <a-radio-group v-else-if="qsForm.type === 'single'" v-model:value="qsForm.answer">
            <!-- <template v-if="options.length > 0"> -->
            <div style="display:flex" class="m-t-10" v-for="(item,index) of options" :key="index">
              <a-radio :value="item.key"></a-radio>
              <a-textarea class="m-l-10" :rows="2" v-model:value="item.value" placeholder="请填写选项" />
              <a-button type="primary" class="m-l-10" @click="addOptions">新增</a-button>
              <a-button type="danger" class="m-l-10" v-if="options.length > 1">删除</a-button>
            </div>
          </a-radio-group>
          <a-radio-group v-else-if="qsForm.type === 'judge'" v-model:value="qsForm.answer">
            <!-- <template v-if="options.length > 0"> -->
            <div style="display:flex" class="m-t-10" v-for="(item,index) of options" :key="index">
              <a-radio :value="item.key"></a-radio>
              <a-input readonly class="m-l-10" :rows="2" v-model:value="item.value" placeholder="请填写选项" />
              <a-button type="primary" class="m-l-10" @click="addOptions">新增</a-button>
              <a-button type="danger" class="m-l-10" v-if="options.length > 1">删除</a-button>
            </div>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">确定</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, toRefs } from 'vue'
import getList from '@/mixins/mixin.ts'
import question from './question.ts'
import CustomForm from '@/components/form/CustomForm.vue'
import api from '@/api/api.ts'
import Template from '../config/template.vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  name: 'category',
  components: {
    SearchOutlined,
    ReloadOutlined,
    CustomForm,
    Template,
    PlusOutlined
  },
  data() {
    return {
      queryParam: {},
      modalVisible: false,
      columns: question.columns,
      categoryList: [],
      handleType: 'add',
      options: [{ key: 1, value: '' }],
      qsForm: {
        title: '',
        options: '',
        id: '',
        answer: '',
        type: 'single',
        category: null,
      },
      rules: {
        title: { required: true, message: '请填写标题', trigger: 'blur' },
        type: { required: true, message: '请选择题型', trigger: 'blur' },
        category: { required: true, message: '请选择类型', trigger: 'blur', type: 'integer' }
      }
    }
  },
  setup() {
    const { data, getListF, handleToggleSearch, handleTableChange, onSelectChange } = getList({
      url: { list: 'question' },
      columns: question.columns,
    })
    getListF()
    const params = data
    return {
      ...toRefs(params),
      getListF,
      handleToggleSearch,
      handleTableChange,
      onSelectChange
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    searchQuery() {
      console.log('searchQuery')
    },
    edit(obj) {
      this.handleType = 'edit'
      const options = JSON.parse(obj.options)
      this.options = options
      for (const key in obj) {
        if (this.qsForm.hasOwnProperty(key)) {
          this.qsForm[key] = obj[key]
        }
      }
      this.modalVisible = true
    },
    add() {
      this.modalVisible = true
    },

    async getCategoryList() {
      const res = await api.get('category/all')
      this.categoryList = res.data
    },
    closeModal() {
      // const dom = this.$refs.customForm as InstanceType<typeof CustomForm>;
      // dom.resetForm()

    },
    typeChange(v) {
      if (v === 'single') {
        return
      } else if (v === 'multiple') {
        return
      } else {
        this.options = [{ key: 1, value: '正确' }, { key: 1, value: '错误' }]
      }
    },
    addOptions() {
      const obj = { key: this.options.length + 1, value: '' }
      this.options.push(obj)
    },
    onSubmit() {
      for (const item of this.options) {
        const value = item.value.replace(/\s+/, '');
        if (value === '') {
          message.warning('选项不能为空')
          return
        }
      }
      if (!this.qsForm.answer) {
        message.warning('请选择答案')
        return
      }
      this.qsForm.options = JSON.stringify(this.options);
      (this.$refs.formRef as InstanceType<typeof HTMLFormElement>).validate().then(async (validRes) => {
        if (validRes) {
          let res;
          if (this.handleType === 'add') {
            res = await api.post('question', this.qsForm)
          } else {
            res = await api.put('question', this.qsForm)
          }
          console.log('res', res)
        }
      })

    },
    resetForm() {
      this.options = [{ key: 1, value: '' }]
      this.qsForm.title = ''
      this.qsForm.options = ''
      this.qsForm.id = ''
      this.qsForm.answer = ''
      this.qsForm.type = 'single'
      this.qsForm.category = null
    }
  }
})
</script>

<style>
</style>
