<template>
  <a-card>
    <div class='wrap p-t-20'>
      <h2>今日答题</h2>
      <div class='text-right'>
        <label class='answered'>12/</label>
        <span class='total'>458人</span>
      </div>
    </div>
    <div class='wrap yesterday p-t-20 m-l-20'>
      <h2>昨日答题</h2>
      <div class='text-right'>
        <label class='answered'>12/</label>
        <span class='total'>458人</span>
      </div>
    </div>
    <!-- <div class='map-index' id='viewDiv1'></div> -->
  </a-card>
</template>

<script>
export default {
  data() {
    return {}
  },
  async mounted() {
    // this.mapServerURL = `${config.mapBaseUrl}ncxqjsp/MapServer`
    // console.log(this.mapServerURL)
    // const esri = this.$store.state.app.esri
    // if (esri) {
    //   this.loadEsri(esri)
    // } else importEsri(this.loadEsri)
  },
  methods: {},
}
</script>
<style lang="scss">
.wrap {
  display: inline-block;
  width: 120px;
  height: 100px;
  border-radius: 8px;
  background: #1890ff;
  color: #fff;
  padding: 8px;
  h2 {
    color: #fff;
    font-size: 20px;
  }
  .answered {
    font-size: 28px;
  }
}
.yesterday {
  background: #159f5c;
}
</style>
