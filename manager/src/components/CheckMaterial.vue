<template>
  <a-card>
    <template #title>
      <h2 id='djdcb'>地籍调查表</h2>
    </template>
    <table class='material-table'>
      <tr>
        <td class='label'>所有权</td>
        <td>集体</td>
        <td class='label'>土地使用期限</td>
        <td>长期</td>
      </tr>
      <tr>
        <td class='label'>权利类型</td>
        <td>城镇住宅用地</td>
        <td class='label'>权利性质</td>
        <td>批准拨用</td>
      </tr>
      <tr>
        <td class='label'>坐落</td>
        <td colspan='3'>富山大道以南，桃新大道以西</td>
      </tr>
      <tr>
        <td class='label'>宗地代码</td>
        <td>360121002002JB00002</td>
        <td class='label'>不动产单元号</td>
        <td>360121002002JB0000W00000</td>
      </tr>
      <tr>
        <td class='label' rowspan='4'>宗地四至</td>
        <td colspan='3'>北：富山大道</td>
      </tr>
      <tr>
        <td colspan='3'>东：私宅</td>
      </tr>
      <tr>
        <td colspan='3'>南：私宅</td>
      </tr>
      <tr>
        <td colspan='3'>西：空地</td>
      </tr>
      <tr>
        <td class='label' rowspan='2'>批准用途</td>
        <td>城镇住宅用地</td>
        <td class='label' rowspan='2'>实际用途</td>
        <td>城镇住宅用地</td>
      </tr>
      <tr>
        <td>地类编码：0701</td>
        <td>地类编码：0701</td>
      </tr>
      <tr>
        <td class='label'>批准面积（m²）</td>
        <td>20005.00</td>
        <td class='label'>宗地面积（m²）</td>
        <td>20005.00</td>
      </tr>
      <tr>
        <td class='label'>使用权</td>
        <td colspan='3'>南昌小蓝经济技术开发区金湖管理处唐村村名委员会</td>
      </tr>
    </table>
  </a-card>
  <!-- <a-divider /> -->
  <a-card class='m-t-10'>
    <template #title>
      <h2 id='fwdcb'>房屋调查表</h2>
    </template>
    <h3>基本信息</h3>
    <table class='material-table'>
      <tr>
        <td class='label'>市区名称或代码</td>
        <td>360121</td>
        <td class='label'>地籍区</td>
        <td>002</td>
      </tr>
      <tr>
        <td class='label'>地籍子区</td>
        <td>017</td>
        <td class='label'>宗地号</td>
        <td>00044</td>
      </tr>
      <tr>
        <td class='label'>房屋坐落</td>
        <td colspan='3'>富山大道以南，桃新大道以西</td>
      </tr>
      <tr>
        <td class='label'>定着物（房屋）代码</td>
        <td>F</td>
        <td class='label'>房屋所有权人</td>
        <td>江西省思邦</td>
      </tr>
      <tr>
        <td class='label'>房屋权界线示意图</td>
        <td>详见测绘报告</td>
        <td class='label'>附加说明</td>
        <td></td>
      </tr>
      <tr>
        <td class='label'>调查意见</td>
        <td></td>
        <td class='label'>调查者</td>
        <td></td>
      </tr>
    </table>

    <h3>房屋状况</h3>
    <table class='material-table'>
      <tr>
        <td class='label'>幢号</td>
        <td>1#2#3#厂房</td>
        <td class='label'>权号</td>
        <td></td>
      </tr>
      <tr>
        <td class='label'>户号</td>
        <td></td>
        <td class='label'>总套数</td>
        <td></td>
      </tr>
      <tr>
        <td class='label'>层数</td>
        <td></td>
        <td class='label'>所在层</td>
        <td></td>
      </tr>
      <tr>
        <td class='label'>房屋结构</td>
        <td></td>
        <td class='label'>竣工时间</td>
        <td>2020年8月22日</td>
      </tr>
      <tr>
        <td class='label'>建筑面积㎡</td>
        <td></td>
        <td class='label'>专有建筑面积㎡</td>
        <td></td>
      </tr>

      <tr>
        <td class='label'>分摊建筑面积㎡</td>
        <td></td>
        <td class='label'>分摊用地面积㎡</td>
        <td></td>
      </tr>
      <tr>
        <td class='label'>占地面积㎡</td>
        <td></td>
        <td class='label'>使用面积㎡</td>
        <td></td>
      </tr>
      <tr>
        <td class='label'>产权来源</td>
        <td></td>
        <td class='label'>墙体归属</td>
        <td></td>
      </tr>
    </table>
  </a-card>

  <a-card class='m-t-10'>
    <template #title>
      <h2 id='arcgis'>不动产测量范围与规划报建或验收范围</h2>
    </template>
    <div class='arcgis'>
      <div class='map-index' id='viewDiv'></div>
    </div>
  </a-card>
</template>

<script>
import { importEsri } from '@/components/arcgis/common.js'
import config from '@/defaultSetting.ts'
export default {
  data() {
    return {
      esri: null,
      myMap: {},
      view: null,
      mapServerURL: null,
      layerDict: {},
      jxCenter: { x: 39403341.5076, y: 3020335.7095 }, // 江西中心点
      jxCenterPoint: null,
    }
  },
  async mounted() {
    this.mapServerURL = `${config.mapBaseUrl}ncxqjsp/MapServer`
    console.log(this.mapServerURL)
    const esri = this.$store.state.app.esri
    if (esri) {
      this.loadEsri(esri)
    } else importEsri(this.loadEsri)
  },
  methods: {
    toPosition(domId) {
      document.getElementById(domId).scrollIntoView({ behavior: 'smooth' })
    },
    loadEsri(esri) {
      console.log(esri, 'esri')
      this.esri = esri
      this.esri = esri
      const map = new esri.Map()
      const xzqLayer = new esri.MapImageLayer({
        url: this.mapServerURL,
      })
      const jxCenterPoint = new esri.Point({
        x: this.jxCenter.x,
        y: this.jxCenter.y,
      })
      this.jxCenterPoint = jxCenterPoint
      map.add(xzqLayer)
      this.view = new esri.MapView({
        container: 'viewDiv1',
        map: map,
        center: jxCenterPoint,
        zoom: 0,
      })
    },
    taskQuery(currentArea, layerIndex = 0) {
      const esri = this.esri
      this.view.graphics.removeAll()

      const params = new esri.FindParameters({
        layerIds: [layerIndex],
        searchFields: ['name'],
        returnGeometry: true,
        searchText: currentArea,
      })
      const findTask = new esri.FindTask({ url: this.mapServerURL })
      findTask
        .execute(params)
        .then((res) => this.showResult(res, esri))
        .catch(this.rejectPromise)
    },
    showResult(featureSet, esri) {
      const lineColor = new esri.Color([16, 195, 252])
      const symbol = new esri.SimpleLineSymbol({
        color: lineColor,
        width: '4px',
      })
      const resultFeatures = featureSet.results
      for (let i = 0, il = resultFeatures.length; i < il; i++) {
        const graphic = resultFeatures[i].feature
        const geometry = graphic.geometry
        graphic.symbol = symbol
        this.view.graphics.add(graphic)
        this.view.goTo({ target: geometry }, { duration: 1000 })
        // this.view.zoom = 1
        break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 20px;
  font-weight: bolder;
  margin: 0px;
}
table.material-table {
  width: 100%;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}
table.material-table td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
}
table.material-table td.label {
  width: 140px;
  background: #e6f7ff;
  text-align: center;
  font-weight: bold;
}
.map-index {
  position: relative;
  height: 400px;
  width: 100%;
  min-height: 400px;
  position: relative;
  background: #fff;
  ::v-deep .esri-view-surface:focus {
    outline: none !important;
  }
  ::v-deep .esri-attribution__powered-by {
    display: none;
  }
}
</style>
