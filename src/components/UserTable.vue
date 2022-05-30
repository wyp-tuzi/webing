<template>
  <div class="user-table">
    <div class="top">
      <div class="top-left">
        <el-input placeholder="请输入电话号码" v-model="searchTel" />
        <el-button @click="handleSearch">查询</el-button>
      </div>
      <div class="top-right">
        <el-button
            @click="handleAdd">新增</el-button>
        <el-button
            type="danger"
            @click="handleDelete">删除</el-button>
      </div>
    </div>
    <el-table
        :data="showTable"
        style="width: 100%"
        :row-style="isRed"
        @row-click="rowClickEv"
        @row-dblclick="rowDoubleClickEv">
      <el-table-column
          type="index"
          label="序号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="grade"
          label="年级">
      </el-table-column>
      <el-table-column
          prop="department"
          label="学院">
      </el-table-column>
      <el-table-column
          prop="major"
          label="专业">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="workPlace"
          label="工作地点">
      </el-table-column>
      <el-table-column
          prop="tel"
          label="电话">
      </el-table-column>
      <el-table-column
          prop="salary"
          label="工资">
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="25%" center>
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" :label-width="formLabelWidth">
          <el-input v-model="form.grade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-select v-model="form.department" placeholder="请选择学院">
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="经管学院" value="经管学院"></el-option>
            <el-option label="汉语学院" value="汉语学院"></el-option>
            <el-option label="数计学院" value="数计学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" :label-width="formLabelWidth">
          <el-input v-model="form.major" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="工作地点" :label-width="formLabelWidth">
          <el-input v-model="form.workPlace" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工资" :label-width="formLabelWidth">
          <el-input v-model="form.salary" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickButtonConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

export default {
    props:{
        tableData:{
            type:Array,
            default() {
                return undefined;
            }
        },
        recordTel:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            searchTel:'', //通过电话号码查询
            selectedTel: '', // 记录点击行的电话号码
            localTableData: this.tableData, //从person.json中拿到的数据，增、删、改会改变它
            showTable:[],
            dialogFormVisible: false,
            dialogTitle:'',
            form: {
                name: '',
                grade:'',
                department: '',
                major:'',
                sex: '男',
                workPlace:'',
                tel:'',
                salary:''

            },
            formLabelWidth: '120px'

        };
    },
    watch:{
        recordTel:{
            // deep: true,
            handler(newValue, oldValue) {
                console.log('handler被调用');
                console.log('修改后的值：' + newValue + ',修改前的值：' + oldValue);
            }
        }
    },
    methods:{
        //通过电话号码查询
        handleSearch(){
            this.showTable = this.localTableData.filter(item => item.tel === this.searchTel);
        },
        //删除按钮
        handleDelete(){
            this.localTableData = this.localTableData.filter(item => item.tel !== this.selectedTel);
            this.showTable = this.localTableData;
        },
        //记录点击行的电话号码
        rowClickEv(item) {
            // console.log('rowClickEv',row); //Object
            this.selectedTel = item.tel;
        },
        //设置点击行后的样式
        isRed(tr) {
            // console.log('tr',tr); //tr对象中包括row和rowndex两个属性
            // console.log('tr.row.tel',tr.row.tel);
            if (tr.row.tel === this.selectedTel || tr.row.tel === this.recordTel) {
                return {
                    backgroundColor: '#DE6',
                    color: 'red'
                };
            }
        },
        //新增按钮
        handleAdd(){
            this.form= {};
            this.dialogFormVisible = true;
            this.dialogTitle= '新增';
        },
        //双击行事件
        rowDoubleClickEv(row,column,event){
            this.dialogFormVisible = true;
            this.dialogTitle= '修改';
            this.form = row;
        },
        //点击确认按钮
        clickButtonConfirm(){
            if(this.dialogTitle === '新增'){
                this.localTableData.unshift(this.form);
            }
            this.showTable = this.localTableData;
            this.dialogFormVisible = false;
        }

    },
    mounted() {
        this.showTable = this.localTableData;
    }
};
</script>

<style lang="less">
.user-table{
  margin-top: 20px;
}
.user-table{
  .el-table{
    font-size: 18px;
  }
}
 .user-table{
   .el-input {
     width: 200px;
   }
 }
 .user-table {
   .el-button {
     margin-left: 10px;
   }
 }
 .user-table {
   .top-right{
     float: right;
   }
 }
 .user-table {
   .top-left{
     float: left;
   }
 }
//去掉el-table的hover变色效果
 .el-table tbody tr:hover>td {
   background-color: transparent !important;
 }

 .el-form{
   .el-form-item{
    margin-bottom: 10px;
   }
 }
 .el-form{
   .el-form-item__label{
     padding-right: 20px;
   }
 }
 .el-dialog__header{
   .el-dialog__title{
     font-size: 24px;
   }
 }
 .el-dialog__wrapper{
   .el-dialog {
     .el-dialog__body{
       padding-top: 5px;
       padding-bottom: 5px;
     }
   }
 }


</style>