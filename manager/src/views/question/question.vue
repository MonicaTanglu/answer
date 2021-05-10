<template>
  <a-card :bordered='false'>
    <!-- 查询区域 -->
    <div class='table-page-search-wrapper'>
      <a-form layout='inline' @keyup.enter='searchQuery'>
        <a-row :gutter='24'>
          <a-col :md='6' :sm='12'>
            <a-form-item label='题目名称'>
              <a-input placeholder='输入题目名称' v-model='queryParam.power'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='12'>
            <a-form-item label='题目类型'>
              <a-input placeholder='题目类型' v-model='queryParam.powerIdCard'></a-input>
            </a-form-item>
          </a-col>

          <a-col :md='6' :sm='12'>
            <a-form-item label='业务号'>
              <a-input placeholder='业务号' v-model='queryParam.number'></a-input>
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
        <template #action='{record}'>
          <a-button type='primary' size='small' @click='getTask(record)'>编辑</a-button>
          <a-button type='primary' size='small' class='m-l-10' @click='getTask(record)'>删除</a-button>
          <!-- <a-button type='primary' @click='getTask(record)'>初审</a-button> -->
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script lang="ts">
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import getList from '@/mixins/mixin.ts'
import question from './question.ts'
export default defineComponent({
  name: 'question',
  components: {
    SearchOutlined,
    ReloadOutlined
  },
  setup() {
    const { getListF } = getList({
      url: '/question/list',
      coloumns: question.columns,
    })
  }
})
</script>

<style>
</style>
