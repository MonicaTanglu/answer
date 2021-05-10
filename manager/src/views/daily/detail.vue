<template>
  <a-row :gutter='[8, 0]'>
    <a-col :span='leftSpan'>
      <a-card class='scroll'>
        <h1>不动产籍调查结果审核表</h1>

        <table class='check-table'>
          <tr>
            <td class='label'>申请人</td>
            <td></td>

            <td class='label'>权籍调查目的</td>
            <td></td>
          </tr>
          <tr>
            <td class='label'>不动产坐落</td>
            <td colspan='3'></td>
          </tr>

          <tr>
            <td class='label'>不动产单元号</td>
            <td colspan='3'></td>
          </tr>

          <tr>
            <td class='label'>调查机构</td>
            <td colspan='3'></td>
          </tr>

          <tr>
            <td class='label'>权集调查表</td>
            <td colspan='3'>
              <div>
                <a-checkbox @change='onChange(1)'>
                  <label @click.stop='showInfo("djdcb")'>地籍调查表</label>
                </a-checkbox>
                <a-checkbox @change='onChange(2)'>
                  <label @click.stop='showInfo("syqdcb")'>土地承包经营权、农用地其他使用权调查表</label>
                </a-checkbox>
                <a-checkbox @change='onChange(3)'>
                  <label @click.stop='showInfo("fwdcb")'>房屋调查表</label>
                </a-checkbox>
                <a-checkbox @change='onChange(4)'>集体土地所有权宗地分类面积调查表</a-checkbox>
                <a-checkbox @change='onChange(5)'>林权调查表</a-checkbox>
                <a-checkbox @change='onChange(6)'>建（构）筑物调查表</a-checkbox>
              </div>
            </td>
          </tr>

          <tr>
            <td class='label'>外业抽检情况</td>
            <td colspan='3'>
              <p>
                已于
                <input class='bottom-line-input' />年
                <input class='bottom-line-input' />月
                <input class='bottom-line-input' />日 对本宗
                调查情况进行了实地抽检，调查表中所填写内容基本与实际一致
              </p>
            </td>
          </tr>

          <tr>
            <td class='label' rowspan='8'>内页审核情况</td>
            <td colspan='3'>
              <div>
                <a-checkbox @change='onChange(7)'>调查结果完成</a-checkbox>
                <a-checkbox @change='onChange(8)'>调查机构有相应资质</a-checkbox>
                <a-checkbox @change='onChange(9)'>调查成功格式符合规定要求</a-checkbox>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a-checkbox @change='onChange(10)'>不动产位置、用途、四至、性质、面积等属性状况正确</a-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a-checkbox @change='onChange(11)'>
                <label @click.stop='showInfo("arcgis")'>不动产测量的范围与规划报建或验收的范围一致</label>
              </a-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a-checkbox @change='onChange(12)'>宗地的使用状况与《土地出让合同》或《划拨决定书》等约定条款相符</a-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a-checkbox @change='onChange(13)'>权籍调查界址确认符合相关规定</a-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a-checkbox @change='onChange(14)'>存量不动产信息与档案资料记载的内容相符</a-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a-checkbox @change='onChange(15)'>调查结果正确保持宗地及其房屋、林木等定着物之间的内在联系</a-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a-checkbox @change='onChange(16)'>经审查，宗地图和分户房产图的空间要素与相邻的界址、地物、地貌不存在空间位置矛盾</a-checkbox>
            </td>
          </tr>
          <tr>
            <td class='label'>初审意见</td>
            <td colspan='3'>
              <div>
                <p>
                  <label>意见：</label>
                  <span>通过</span>
                </p>
                <div style='display:flex;'>
                  <label>理由：</label>
                  <span>符合要求</span>
                </div>
              </div>
              <p class='resolve-check'>
                <label></label>
                <label>经办人：王丽丽</label>
                <label>2021 年 2 月 2 日</label>
              </p>
            </td>
          </tr>
          <tr>
            <td class='label'>审核意见</td>
            <td colspan='3'>
              <div>
                <p>
                  <label>意见：</label>
                  <a-select v-model:value='form.pass' style='width: 120px'>
                    <a-select-option :value='true'>通过</a-select-option>
                    <a-select-option :value='false'>驳回</a-select-option>
                  </a-select>
                </p>
                <div style='display:flex;'>
                  <label>理由：</label>
                  <a-textarea style='width: 400px' :rows='2' />
                </div>
              </div>
              <p class='resolve-check'>
                <label></label>
                <label>经办人：{{ currentUser.realname }}</label>
                <label>{{ stime.year }} 年 {{ stime.month }} 月 {{ stime.day }} 日</label>
              </p>
            </td>
          </tr>
        </table>

        <div class='m-t-20 m-b-20 center'>
          <a-button type='primary' ghost class='m-r-10'>保存</a-button>
          <a-button type='primary'>提交流程</a-button>
        </div>
      </a-card>
    </a-col>

    <a-col :span='rightSpan' class='right-table' v-if='rightSpan === 12'>
      <a-card>
        <p style='text-align:right'>
          <label style='display:inline-block;cursor:pointer;margin-bottom: 10px' @click='closeRight'>
            <CloseCircleOutlined />
          </label>
        </p>
        <div class='scroll-right'>
          <check-material ref='material'></check-material>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { createStorage } from '@/utils/storage'
import CheckMaterial from '@/components/CheckMaterial.vue'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
const storage = createStorage()
const currentTime = new Date()
export default {
  components: {
    CloseCircleOutlined,
    CheckMaterial,
  },
  data() {
    return {
      rightSpan: 0,
      leftSpan: 24,
      currentUser: storage.get('userInfo'),
      stime: {
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() + 1,
        day: currentTime.getDate(),
      },
      form: {
        pass: true,
      },
    }
  },
  methods: {
    showInfo(domId) {
      this.leftSpan = 12
      this.rightSpan = 12
      setTimeout(() => {
        this.$refs.material.toPosition(domId)
      }, 500)
    },
    closeRight() {
      this.rightSpan = 0
      this.leftSpan = 24
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  padding: 20px 0;
  font-size: 24px;
  text-align: center;
  font-weight: bolder;
}
table.check-table {
  width: 100%;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}
table.check-table td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
}
table.check-table td.label {
  width: 140px;
  background: #fafafa;
  text-align: center;
  font-weight: bold;
}
.resolve-check {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.scroll {
  max-height: 800px;
  overflow: scroll;
}
.scroll-right {
  max-height: 705px;
  overflow: scroll;
}
a-checkbox {
  label {
    cursor: pointer;
  }
}
</style>
