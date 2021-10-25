<template>
  <div class="hello">
    <div id="monthorder" ></div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')

require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/timeline')
require('echarts/lib/component/visualMap')
require('echarts/lib/component/calendar')


// import { VisualMapComponent } from 'echarts/components';

export default {
  name: 'HelloWorld',
  data() {
    return {
      buyData: [4,10,1,9,4,7,4,5,4,6,],
      collectData: [2.0, 4.9, 7.0, 3],
      hotData: [2.0, 2.2, 3.3, 4.5,2.0, 2.2, 3.3, 4.5,3.3, 4.5],
      nameData: ['电影1', '电影2', '电影3', '电影4'],
     them:"dark"
    }
  },

  created() {
    
  },
 mounted(){
   this.axios
        .get('/api/users/rangeMovieList')
        
        .then((res) => {
          // console.log("我是1")
          for (var i = 0; i < res.data.data.rangeMovieList.length; i++) {
            
            this.nameData[i] = res.data.data.rangeMovieList[i].name
            this.hotData[i] = res.data.data.rangeMovieList[i].count
            this.collectData[i] = res.data.data.rangeMovieList[i].count
            
          }
          console.log(this.nameData)
          console.log(this.hotData)
          console.log(this.collectData)
          this.montheahcrt()
        })
        
        this.$nextTick(function() {
      
      
    })
 },
  methods: {
    montheahcrt() {
     
      
      var myechart = echarts.init(document.getElementById('monthorder'))
      myechart.setOption({
        
        title: {
        text: '当前上映电影数据'
    },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
            // myTool : {
            //     show : true,
            //     title : '自定义扩展方法',
            //     icon : 'image://http://echarts.baidu.com/images/favicon.png',
            //     onclick : function (){
            //       console.log("点击了自定义方法")
            //        this.them = ''
            //     }
            //  },
          },
        },
        legend: {
          data: ['收藏量', '购买量', '平均热度'],
        },
        xAxis: [
          {
            type: 'category',
            data: this.nameData,
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '收藏量',
            min: 0,
            max: 60,
            interval: 50,
            axisLabel: {
              formatter: '{value} 人',
            },
          },
          {
            type: 'value',
            name: '热度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} w',
            },
          },
        ],
        series: [
          {
            name: '收藏量',
            type: 'bar',
            data: this.collectData,
          },
          {
            name: '购买量',
            type: 'bar',
            data: this.buyData,
          },
          {
            name: '平均热度',
            type: 'line',
            yAxisIndex: 0,
            // data: [2.0, 2.2, 3.3, 4.5,2.0, 2.2, 3.3, 4.5,3.3, 4.5],
            data: this.hotData,
          },
        ],
      })
    },
    
  },
}
</script>
<style scoped>
.indexs {
  width: 100%;
  
}
.hello{
   /* border: 1px red solid; */
}
#monthorder{
  width:100%;
  height:800px;
  /* border: 1px red solid; */
}
</style>
