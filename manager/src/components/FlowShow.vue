<template>
  <div id='wrap'>
    <div id='chart-wrap'></div>
  </div>
</template>
<script>
import go from 'gojs'
const MAKE = go.GraphObject.make
export default {
  data() {
    return {
      formInline: {
        processName: '',
      },
    }
  },
  mounted() {
    const mySelf = this
    mySelf.myDiagram = MAKE(go.Diagram, 'chart-wrap', {
      initialContentAlignment: go.Spot.Center, // 居中显示
      'undoManager.isEnabled': true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
      'toolManager.hoverDelay': 100, //tooltip提示显示延时
      'toolManager.toolTipDuration': 10000, //tooltip持续显示时间
      isReadOnly: true, //只读
      'grid.visible': false, //显示网格
      allowMove: false, //允许拖动
      allowDrop: false,
      allowZoom: false,
      allowVerticalScroll: false,
      allowHorizontalScroll: false,
      layout: MAKE(go.TreeLayout, {
        angle: 0,
        layerSpacing: 35,
      }),
    }) //构建gojs对象

    mySelf.myDiagram.linkTemplate = MAKE(
      go.Link,
      {
        curve: go.Link.Bezier,
      }, // 贝塞尔曲线
      {
        routing: go.Link.Orthogonal,
        corner: 15,
      },
      MAKE(go.Shape, {
        strokeWidth: 2,
        stroke: '#585858',
      }),
      MAKE(go.Shape, {
        toArrow: 'Standard',
        // fill: 'red',
        stroke: '#585858',
      }), //箭头
      MAKE(
        go.TextBlock,
        {
          margin: 20,
          // stroke: 'blue',
          font: '14px sans-serif',
          width: 50,
          wrap: go.TextBlock.WrapDesiredSize,
        },
        new go.Binding('text', 'linktext')
      ),
      {
        toolTip: MAKE(
          go.Adornment,
          'Auto',
          MAKE(go.Shape, {
            fill: '#000000',
          }),
          MAKE(
            go.TextBlock,
            {
              margin: 4,
            },
            new go.Binding('text', 'name1')
          )
        ), // end of Adornment
      }
    )
    const lightText = '#000000'
    const myModel = MAKE(go.GraphLinksModel) //也可以创建link model;需要配置myModel.linkDataArray 如下
    myModel.nodeDataArray = [
      { category: 'Start', text: '开始', key: -2, borderColor: '#0D4F8C' },
      { category: 'Next', text: '受理', key: -1, borderColor: '#0D4F8C' },
      { category: 'Next', text: '初审', key: -4, borderColor: 'red' },
      { category: 'Next', text: '审核', key: -5, borderColor: lightText },
      { category: 'End', text: '结束', key: -3, borderColor: lightText },
    ]
    myModel.linkDataArray = [
      { from: -2, to: -1 },
      { from: -1, to: -4 },
      { from: -4, to: -5 },
      { from: -5, to: -3 },
    ]

    //Node连接线
    function makePort(name, spot, output, input) {
      return MAKE(go.Shape, 'Circle', {
        fill: 'transparent',
        stroke: null, // this is changed to "white" in the showPorts function
        desiredSize: new go.Size(10, 10),
        alignment: spot,
        alignmentFocus: spot, // align the port on the main Shape
        portId: name, // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: 'pointer', // show a different cursor to indicate potential link point
      })
    }

    mySelf.myDiagram.nodeTemplateMap.add(
      'Next',
      MAKE(
        go.Node,
        'Spot',
        // nodeStyle(),
        MAKE(
          //声明创建一个新的面板对象,自定义方式可参考mySelf.myDiagram.nodeTemplate
          go.Panel, //表明需要创建一个panel面板对象
          'Auto', //页面布局为自动
          MAKE(
            //声明构建一个圆角矩形
            go.Shape,
            'RoundedRectangle',
            {
              fill: 'transparent',
              strokeWidth: 1,
              angle: 0,
            },
            new go.Binding('stroke', 'borderColor'),
            new go.Binding('figure', 'figure') //声明并创建一个新的图形
          ),
          MAKE(
            //声明一个可编辑文本域
            go.TextBlock,
            {
              font: '12pt Helvetica, Arial, sans-serif',
              stroke: lightText,
              width: 125,
              maxSize: new go.Size(360, NaN),
              wrap: go.TextBlock.WrapFit, //文本域换行
              editable: true, //是否可编辑
              margin: 12,
              // wrap: go.TextBlock.WrapDesiredSize,
            },
            new go.Binding('text').makeTwoWay()
          )
        ),
        // four named ports, one on each side:
        makePort('T', go.Spot.Top, false, true),
        makePort('L', go.Spot.Left, true, true),
        makePort('R', go.Spot.Right, true, true),
        makePort('B', go.Spot.Bottom, true, false)
      )
    )

    mySelf.myDiagram.nodeTemplateMap.add(
      'Start',
      MAKE(
        go.Node,
        'Spot',
        // nodeStyle(),
        MAKE(
          //声明创建一个新的面板对象,自定义方式可参考mySelf.myDiagram.nodeTemplate
          go.Panel, //表明需要创建一个panel面板对象
          'Auto', //页面布局为自动
          MAKE(
            //声明构建一个圆角矩形
            go.Shape,
            'Circle',
            {
              desiredSize: new go.Size(70, 70),
              fill: 'transparent',
              stroke: 'lightText',
              strokeWidth: 1,
              angle: 0,
            },
            new go.Binding('stroke', 'borderColor'),
            new go.Binding('figure', 'figure') //声明并创建一个新的图形
          ),
          MAKE(
            //声明一个可编辑文本域
            go.TextBlock,
            {
              font: '12pt Helvetica, Arial, sans-serif',
              stroke: lightText,
              width: 125,
              maxSize: new go.Size(360, NaN),
              wrap: go.TextBlock.WrapFit, //文本域换行
              editable: true, //是否可编辑
              margin: 12,
              // wrap: go.TextBlock.WrapDesiredSize,
            },
            new go.Binding('text').makeTwoWay()
          )
        ),
        makePort('L', go.Spot.Left, true, false),
        makePort('R', go.Spot.Right, true, false),
        makePort('B', go.Spot.Bottom, true, false)
      )
    )

    mySelf.myDiagram.nodeTemplateMap.add(
      'End',
      MAKE(
        go.Node,
        'Spot',
        // nodeStyle(),
        MAKE(
          //声明创建一个新的面板对象,自定义方式可参考mySelf.myDiagram.nodeTemplate
          go.Panel, //表明需要创建一个panel面板对象
          'Auto', //页面布局为自动
          MAKE(
            //声明构建一个圆角矩形
            go.Shape,
            'Circle',
            {
              desiredSize: new go.Size(70, 70),
              fill: 'transparent',
              stroke: 'lightText',
              strokeWidth: 1,
              angle: 0,
            },
            new go.Binding('stroke', 'borderColor'),
            new go.Binding('figure', 'figure') //声明并创建一个新的图形
          ),
          MAKE(
            //声明一个可编辑文本域
            go.TextBlock,
            {
              font: '12pt Helvetica, Arial, sans-serif',
              stroke: lightText,
              width: 125,
              maxSize: new go.Size(360, NaN),
              wrap: go.TextBlock.WrapFit, //文本域换行
              editable: true, //是否可编辑
              margin: 12,
              // wrap: go.TextBlock.WrapDesiredSize,
            },
            new go.Binding('text').makeTwoWay()
          )
        ),
        makePort('T', go.Spot.Top, false, true),
        makePort('L', go.Spot.Left, false, true),
        makePort('R', go.Spot.Right, false, true)
      )
    )

    mySelf.myDiagram.model = myModel
    // mySelf.init()
  },
  methods: {
    handleSubmit() {
      console.log(this.myDiagram.model.toJson(), 'myDiagram')
      console.log('onSubmit')
    },
    init() {
      // const mySelf = this
      // window.myPalette = MAKE(
      //   go.Palette,
      //   'chart-palette', // must name or refer to the DIV HTML element
      //   {
      //     scrollsPageOnFocus: false,
      //     nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap, // share the templates used by myDiagram
      //     model: new go.GraphLinksModel([
      //       // specify the contents of the Palette
      //       {
      //         category: 'Next',
      //         text: '节点'
      //       },
      //       {
      //         category: 'Start',
      //         text: '开始'
      //       },
      //       {
      //         category: 'End',
      //         text: '结束'
      //       }
      //     ])
      //   }
      // )
    },
  },
}
</script>
<style lang="scss" scoped>
#wrap {
  &:focus {
    outline: none;
  }
}

#submit {
  width: 102px;
  height: 40px;
  float: right;
  margin: 20px 5px 16px 0;
}

#chart-wrap {
  width: 100%;
  margin-bottom: 22px;
  height: 520px;
  background-color: white;
  // border: solid 1px rgb(244, 244, 244);
}

#lateEntry {
  clear: both;
  background-color: rgb(255, 255, 255);
  // border: solid 1px rgb(244, 244, 244);

  > span {
    display: inline-block;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-indent: 30px;
    letter-spacing: 0.8px;
    text-align: left;
    color: rgb(35, 35, 35);
    // border-bottom: 1px solid rgb(234, 234, 234);
  }
}
</style>
