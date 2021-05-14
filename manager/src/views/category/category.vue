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
      >
        <template #action="{record}">
          <a-button type="primary" size="small" @click="edit(record)">编辑</a-button>
          <a-button type="danger" size="small" class="m-l-10" @click="remove(record)">删除</a-button>
        </template>
      </a-table>
    </div>

    <a-modal v-model:visible="modalVisible" title="类别" :closable="true" :footer="null" @cancel="closeModal">
      <custom-form ref="customForm" :formArr="categoryArr" :actionShow="true"></custom-form>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { defineComponent, toRefs } from 'vue'
import getList from '@/mixins/mixin.ts'
import category from './category.ts'
import CustomForm from '@/components/form/CustomForm.vue'
export default defineComponent({
  name: 'category',
  components: {
    SearchOutlined,
    ReloadOutlined,
    CustomForm
  },
  data() {
    return {
      queryParam: {},
      categoryArr: category.formCategory,
      modalVisible: false,
      columns: category.columns
    }
  },
  setup() {
    const { data, getListF } = getList({
      url: { list: 'category' },
      columns: category.columns,
    })
    getListF()
    const params = data
    return {
      ...toRefs(params),
      getListF
    }
  },
  methods: {
    searchQuery() {
      console.log('searchQuery')
    },
    edit(obj) {
      this.modalVisible = true
      const that = this
      setTimeout(() => {
        const dom = that.$refs.customForm as InstanceType<typeof CustomForm>;
        dom.setForm(obj)
      }, 500);
    },
    closeModal() {
      const dom = this.$refs.customForm as InstanceType<typeof CustomForm>;
      dom.resetForm()

    }
  }
})
</script>

<style>
</style>
