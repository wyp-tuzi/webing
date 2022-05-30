<template>
  <div class = 'home-page'>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="列表" name="first">
        <UserTable v-if="myTableData.length>0" :tableData="myTableData" :recordTel="recordTel"/>
      </el-tab-pane>
      <el-tab-pane label="图表" name="second">
        <UserChart v-if="myTableData.length>0" :tableData="myTableData"  @editActiveName="editActiveName" />
      </el-tab-pane>
      <el-tab-pane label="地图" name="third">
        <UserMap v-if="myTableData.length>0" :tableData="myTableData" />
      </el-tab-pane>
      <el-tab-pane label="实时状态" name="fourth" >
        这里是实时状态
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import UserTable from '@/components/UserTable';
import UserChart from '@/components/UserChart';
import UserMap from '@/components/UserMap';
import axios from 'axios';
export default {
    components:{
        UserTable,
        UserChart,
        UserMap
    },
    data(){
        return{
            activeName: 'first',
            myTableData:[],
            recordTel:''
        };
    },
    methods:{
        editActiveName(name,tel){
            this.activeName = name;
            this.recordTel = tel;
        },
        getInfo () {
            axios.get('person.json')
                .then(response => {
                    this.myTableData = response.data.tableData;
                    console.log('response:', this.myTableData);
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        }
    },
    mounted () {
        console.log('父组件的mounted开始');
        this.getInfo();
        console.log('父组件的mounted结束');
    }

};
</script>

<style lang="less">
.home-page{
  width:100%;
  height:100%;
}
</style>
