<template>
  <div :class='className'>
    <div id='viewDiv' class='map-content'></div>
  </div>
</template>
<script>
import { importEsri } from './common'
import config from '@/defaultSettings'
export default {
  props: {
    className: {
      type: String,
      default: 'map-default',
    },
    currentArea: {
      type: String,
      default: '江西省',
    },
  },
  watch: {
    currentArea: function (newVal, oldVal) {
      if (this.esri) this.taskQuery()
    },
  },
  name: 'BaseMap',
  data() {
    return {
      view: null,
      // mapBaseUrl: config.mapBaseUrl
      mapServerURL: '',
      esri: null,
      jxCenter: { x: 39403341.5076, y: 3020335.7095 }, // 江西中心点
      jxCenterPoint: null,
    }
  },
  methods: {
    initMap(mapType) {
      this.mapServerURL = `${config.mapBaseUrl}JXS_${mapType}/MapServer`
      const esri = this.$store.state.app.esri
      if (esri) {
        this.loadEsri(esri)
      } else {
        importEsri(this.loadEsri)
      }
    },
    loadEsri(esri) {
      this.esri = esri
      const map = new esri.Map()
      const xzqLayer = new esri.TileLayer({
        url: this.mapServerURL,
      })
      const jxCenterPoint = new esri.Point({
        x: this.jxCenter.x,
        y: this.jxCenter.y,
      })
      this.jxCenterPoint = jxCenterPoint
      map.add(xzqLayer)
      this.view = new esri.MapView({
        container: 'viewDiv',
        map: map,
        center: jxCenterPoint,
        zoom: 0,
      })
      this.view.when(() => {
        const featureLayer = xzqLayer.sublayers.getItemAt(0)
        featureLayer.legendEnabled = true
        const legend = new esri.Legend({
          view: this.view,
        })
        xzqLayer.allSublayers.getItemAt(1).legendEnabled = false
        this.view.ui.add(legend, 'bottom-right')
        this.taskQuery(esri)
      })
    },
    taskQuery() {
      const esri = this.esri
      this.view.graphics.removeAll()
      if (this.currentArea === '江西省') {
        this.view.zoom = 0
        this.view.goTo({ center: this.jxCenterPoint }, { duration: 1000 })
        return
      }
      const params = new esri.FindParameters({
        layerIds: [0],
        searchFields: ['name'],
        returnGeometry: true,
        searchText: this.currentArea,
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
    rejectPromise(error) {
      console.error("promise didn't resolve:", error.message)
    },
  },
}
</script>
<style lang="less" scoped>
.map-default {
  height: calc(100% - 40px);
}
.map-content {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 500px;
  ::v-deep .esri-ui-top-left {
    display: none;
  }
  ::v-deep .esri-ui-manual-container > .esri-component {
    display: none;
  }
  ::v-deep .esri-view-surface:focus {
    outline: none !important;
  }
  ::v-deep .esri-legend {
    max-height: 450px !important;
    box-shadow: unset;
  }
  ::v-deep .esri-legend__service {
    .esri-legend__layer-caption,
    .esri-widget__heading {
      display: none;
    }
  }
  ::v-deep .esri-widget {
    color: #fff;
    background-color: transparent;
    width: 120px !important;
    .esri-legend__service {
      padding: 0;
    }
  }
}
.btn-fullextent {
  position: relative;
  top: 40px;
  left: 60px;
}

#tree {
  background-color: #fff;
  padding-right: 10px;
}
</style>
