<template>
  <a-card>
    <div>
      <h1>不动产籍调查结果审核受理</h1>
      <label style='float:right;margin-bottom:10px'>
        <a-button type='primary' ghost @click='printVisible = true'>
          <PrinterOutlined />打印材料
        </a-button>
      </label>
    </div>
    <a-steps :current='current'>
      <a-step v-for='item in steps' :key='item.title' :title='item.title' />
    </a-steps>
    <div class='steps-content'>
      <div v-if='current === 0'>
        <a-form :model='form' :label-col='labelCol' :wrapper-col='wrapperCol'>
          <a-form-item label='申请人'>
            <a-input v-model:value='form.acceptUser' />
          </a-form-item>
          <a-form-item label='代理人'>
            <a-input v-model:value='form.agentUser' />
          </a-form-item>
          <a-form-item label='联系人'>
            <a-input v-model:value='form.contactUser' />
          </a-form-item>
          <a-form-item label='联系电话'>
            <a-input v-model:value='form.contactPhone' />
          </a-form-item>
          <a-form-item label='坐落'>
            <a-input v-model:value='form.acceptAddress' />
          </a-form-item>
        </a-form>
      </div>
      <div v-if='current === 1'>
        <h2>材料收件</h2>
        <p style='margin-bottom:10px;'>
          <a-button @click='add' type='primary'>
            <template #icon>
              <PlusOutlined />
            </template>新增材料清单
          </a-button>
        </p>

        <a-table
          ref='table'
          bordered
          size='middle'
          rowKey='id'
          :columns='columns'
          :dataSource='dataSource'
          :pagination='false'
          :loading='loading'
          :rowSelection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
          @change='handleTableChange'
        >
          <template #action='{record}'>
            <a-button type='primary' @click='handleEdit(record)'>
              <ScanOutlined />扫描
            </a-button>
            <a-divider type='vertical' />
            <a-button type='primary' @click='handleEdit(record)'>
              <UploadOutlined />上传
            </a-button>
            <a-divider type='vertical' />
            <a-button type='default' @click='preview(record)'>预览</a-button>
            <a-divider type='vertical' />
            <a-button type='danger' ghost @click='handleEdit(record)'>删除</a-button>
          </template>
        </a-table>
      </div>
      <div v-if='current === 2'>
        <div class='success'>
          <label class='right-icon'>
            <CheckCircleOutlined />
          </label>
          <h1>操作成功</h1>
          <div>受理单号：5858566258QT545</div>
        </div>
      </div>
    </div>
    <div class='steps-action'>
      <a-button v-if='current > 0' @click='prev'>上一步</a-button>
      <a-button v-if='current < steps.length - 1' style='margin-left: 8px' type='primary' @click='next'>下一步</a-button>
      <a-button
        v-if='current == steps.length - 1'
        style='margin-left: 8px'
        type='primary'
        @click='$message.success("Processing complete!")'
      >提交审核</a-button>
    </div>
  </a-card>
  <a-modal v-model:visible='materialVisible'>
    <a-form :model='form' :label-col='labelCol' :wrapper-col='wrapperCol'>
      <a-form-item label='材料名称'>
        <a-input v-model:value='materialForm.name' />
      </a-form-item>
      <a-form-item label='材料类型'>
        <a-select v-model:value='materialForm.type'>
          <a-select-option value='copy'>正本复印件</a-select-option>
          <a-select-option value='copy'>原件</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label='份数'>
        <a-input v-model:value='materialForm.copies' />
      </a-form-item>
      <a-form-item label='页数'>
        <a-input v-model:value='materialForm.pages' />
      </a-form-item>
      <a-form-item label='单位'>
        <a-input v-model:value='materialForm.unit' />
      </a-form-item>
      <a-form-item label='材料'>
        <custom-upload :pictures='materialForm.pictures'></custom-upload>
        <label style='margin-left:10px'>
          <a-button type='primary' @click='handleEdit(record)'>
            <ScanOutlined />扫描
          </a-button>
        </label>
      </a-form-item>
    </a-form>
  </a-modal>
  <a-modal v-model:visible='printVisible' width='100%' style='top: 0px;height:100vh;background:#fff;' :footer='null'>
    <div>
      <a-tabs @change='callback'>
        <a-tab-pane key='1' tab='审核补正材料告知书'>
          <print-one></print-one>
        </a-tab-pane>
        <a-tab-pane key='2' tab='审核受理通知书' force-render>审核补正材料告知书</a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script>
import { UploadOutlined } from '@ant-design/icons-vue'
import CustomUpload from '@/components/CustomUpload.vue'
import { Modal } from 'ant-design-vue'
import PrintOne from '@/components/printTemplate/one.vue'
import {
  ExclamationCircleOutlined,
  ScanOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
} from '@ant-design/icons-vue'
import { createVNode } from 'vue'
export default {
  components: {
    UploadOutlined,
    CustomUpload,
    ScanOutlined,
    CheckCircleOutlined,
    PrinterOutlined,
    PrintOne,
  },
  data() {
    return {
      materialVisible: false,
      printVisible: false,
      current: 0,
      steps: [
        {
          title: '受理申请',
          content: 'First-content',
        },
        {
          title: '材料收件',
          content: 'Second-content',
        },
        {
          title: '完成',
          content: 'Last-content',
        },
      ],
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t) {
            return t.index + 1
          },
        },
        {
          title: '材料名称',
          align: 'center',
          dataIndex: 'name',
        },
        {
          title: '材料类型',
          align: 'center',
          dataIndex: 'type',
        },
        {
          title: '份数',
          dataIndex: 'copies',
          align: 'center',
        },
        {
          title: '页数',
          dataIndex: 'pages',
          align: 'center',
        },
        {
          title: '单位',
          dataIndex: 'unit',
          align: 'center',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          slots: { customRender: 'action' },
        },
      ],
      dataSource: [
        {
          name: '权籍调查结果审核申请表',
          type: '原件',
          copies: 1,
          pages: 4,
          id: 1,
          unit: '份',
          pictures: [
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2447624986,3856869935&fm=26&gp=0.jpg',
          ],
        },
        {
          name: '身份证明',
          type: '复印件',
          copies: 1,
          pages: 4,
          id: 1,
          pictures: [
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2447624986,3856869935&fm=26&gp=0.jpg',
          ],
          unit: '份',
        },
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        acceptUser: '',
        agentUser: '',
        contactUser: '',
        contactPhone: '',
        address: '',
        qjdcshsqb: '',
        sfzm: '',
        qjdcjg: '',
        wtdlcl: '',
        bdcqlzs: '',
      },
      materialForm: {
        name: '',
        type: '',
        copies: 1,
        pages: 1,
        pictures: [],
      },
    }
  },
  methods: {
    materialUpdate() {
      Modal.confirm({
        icon: createVNode(ExclamationCircleOutlined),
        title: '是否保存并打印补正材料告知书？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          return
        },
      })
    },
    next() {
      this.current++
    },
    prev() {
      this.current--
    },
    preview(obj) {
      this.materialForm = obj
      this.materialVisible = true
    },
    add() {
      this.materialVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
}
.attach-upload {
  display: flex;
  label {
    margin-left: 10px;
  }
}
.steps-content {
  padding: 20px;
  .success {
    text-align: center;
    padding: 20px 0 60px;
    .right-icon {
      font-size: 50px;
      color: #52c41a;
      font-weight: bold;
    }
  }
}
.steps-action {
  text-align: center;
}
v-deep .ant-modal-content {
  box-shadow: unset;
}
</style>
