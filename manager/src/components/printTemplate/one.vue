<template>
  <a-card>
    <p style='text-align:right;'>
      <a-button type='primary' @click='print' ghost>
        <PrinterOutlined />打印
      </a-button>
    </p>
    <div id='printOne'>
      <h1>不动产籍调查结果审核补正材料告知书</h1>

      <div>
        <p>
          <input style='width:140px;' class='bottom-line-input text-left' />：
        </p>
        <p class='p-indent'>
          你（单位）于
          <input class='bottom-line-input' />年
          <input class='bottom-line-input' />月
          <input class='bottom-line-input' />日 申请对坐落于
          <input style='width:auto;min-width:300px' class='bottom-line-input text-left' />
          的不动产进行权籍调查成果审核。
        </p>
        <p>
          <label style='width:30px;display:inline-block;'></label>
          经审核，你（单位）提交的材料存在：
          <a-checkbox>材料不齐全</a-checkbox>；
          <a-checkbox>部分材料不符合法定形式</a-checkbox>；
          <a-checkbox>
            <input class='bottom-line-input text-left' style='width:250px;' />
          </a-checkbox>； 因此应向我中心补充以下材料：
        </p>
        <p class='p-indent'>
          1、
          <input class='bottom-line-input text-left' style='width:250px;' />；
        </p>
        <p class='p-indent'>
          2、
          <input class='bottom-line-input text-left' style='width:250px;' />；
        </p>
        <p class='p-indent'>
          3、
          <input class='bottom-line-input text-left' style='width:250px;' />；
        </p>
        <p class='p-indent'>
          4、
          <input class='bottom-line-input text-left' style='width:250px;' />；
        </p>
        <p>请你（单位）自收到本告知书之日起5个工作日内向我中心补齐上述材料；逾期未补交的，我中心将不予办理权籍调查结果审核，并退还申请材料。</p>
        <p class='p-indent flex'>
          <label>联系人：{{ currentUser.realname }}</label>
          <label>联系电话：18358581212</label>
        </p>
      </div>
      <div class='remark'>
        <p>办公单位（ 盖章 ）</p>
        <p></p>
        <p>
          <label>{{ stime.year }} 年 {{ stime.month }} 月 {{ stime.day }} 日</label>
        </p>
      </div>
    </div>
  </a-card>
</template>

<script>
// import printJS from 'print-js'
import { createStorage } from '@/utils/storage'
import { PrinterOutlined } from '@ant-design/icons-vue'
// import canvasImage from './print.js'
const storage = createStorage()
const currentTime = new Date()
export default {
  components: {
    PrinterOutlined,
  },
  data() {
    return {
      currentUser: storage.get('userInfo'),
      stime: {
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() + 1,
        day: currentTime.getDate(),
      },
    }
  },
  methods: {
    print() {
      // canvasImage.getImage('printOne', (image) => {
      //   printJS(image, 'image')
      // })
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
.text-left {
  text-align: left;
}
.p-indent {
  text-indent: 30px;
}
p.flex {
  display: flex;
  justify-content: space-between;
  width: 50%;
}
.remark {
  text-align: right;
  padding: 100px 60px 60px 60px;
}
</style>
