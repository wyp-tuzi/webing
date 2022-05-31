<template>
  <div class="user-chart">
    <ul id="chart">
      <li >
        <div id="main1" ref="main1" style="width: 500px; height: 450px">
        </div>
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    props:{
        tableData:{
            type:Array,
            default() {
                return undefined;
            }
        }
    },
    data(){
        return {
            localTableData: this.tableData //从person.json中拿到的数据
        };
    },
    methods:{
        initChart() {
            let myChart = echarts.init(this.$refs.main1),
                names = [],
                salaries = [],
                option ={
                    title:{
                        text:'毕业生薪资'
                    },
                    tooltip: {},
                    xAxis: {
                        data: names
                    },
                    yAxis: {},
                    series: [{
                        name:'薪资',
                        data: salaries,
                        type: 'bar'
                    }]
                };
            const arr = this.localTableData,
                _this = this;

            arr.forEach(function (item,index){
                names.push(item.name);
                salaries.push({value:item.salary, tel:item.tel});
            });
            myChart.setOption(option);
            myChart.on('click',function (params){
                // myChart.off('click');
                const result = arr.filter(item => item.tel === params.data.tel);

                _this.$emit('editActiveName','first',result[0].tel); //跳转到列表页。 注意this指向问题。用 _this = this;解决
            });
            //随着屏幕大小调节图表
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        }
    },
    mounted () {
        console.log('chart的mounted开始');
        this.initChart();
        console.log('chart的mounted结束');
    }
};
</script>

<style lang="less">
.user-chart{
  width: 100%;
  height: 100%;
}
#chart{
  width: 95%;
  height: 100%;
  margin: auto;
  text-align: center;
}
#chart li{
  float: left;
  box-sizing: border-box;
  width: 49.8%;
  height: 49%;
  margin-left: -1px;
  margin-bottom: -1px;
  border: 1px solid white;
  list-style-type: none;
}
#chart #main1{
  width: 400px;
  height: 400px;
  margin:auto;
}
.home-page .el-tabs--border-card>.el-tabs__content{
  padding: 0;
}
</style>