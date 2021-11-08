<template>
    <div>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="用户名" value="1"></el-option>
                    <el-option label="邮箱/手机" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
            <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </div>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="60%">
            <el-form :model="form" label-width="70px">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
           
            </el-form>
          
               
        </el-dialog>
        <el-table
        
            :data="nowTableData"
            border
           
            style="width: 100%">
            <el-table-column
            prop="userHead"
            label="用户头像">
                 <template slot-scope="scope">
                     <img class="userHead" :src="scope.row.userHead">
                 </template>
            </el-table-column>
            <el-table-column
            prop="date"
            label="注册日期">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户姓名">
            </el-table-column>
            <el-table-column
            prop="email"
            label="绑定邮箱/手机">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleToFreeze(scope.$index, scope.row)">{{ scope.row.isFreeze ? '已冻结' : '未冻结' }}</el-button>
                    <el-button size="small" @click="handleToDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                    <el-button size="small" @click="getUerINfo(scope.$index, scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name : 'users',
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        var checkEmail = (rule, value, cb) => {
            const regEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if (regEmail.test(value)) {
                // 合法邮箱
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        };
        return {
            tableData : [],
            tableData3 : [],
            currentPage : 1,
            pageSize : 12,
            input3: '',
            select: '',
            dialogFormVisible: false,
            currentPage4: 4,
            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            // 添加用户的表单数据
            addForm: {
                id: '',
                username: '',
                password: '',
                email: '',
                phone: ''
            },
            formLabelWidth: '120px',
            ruleForm: {
                pass: '',
                checkPass: '',
                email: '',
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    mounted(){
        this.axios.get('/api/admin/usersList').then((res)=>{
           var status = res.data.status;
           if(status === 0){
               this.tableData = res.data.data.usersList;
               this.tableData3 = this.tableData;
           }
        });
    },
    computed : {
        nowTableData(){
            return this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize ) || [];
        }
    },
    methods : {
        handleToFreeze(index,row){
            this.axios.post('/api/admin/updateFreeze',{
                email : row.email,
                isFreeze : !row.isFreeze
            }).then((res)=>{
                var status = res.data.status;
                if(status === 0){
                    this.$alert('冻结操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData[index].isFreeze = !row.isFreeze;
                        }
                    });
                }
                else{
                    this.$alert('冻结操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            });
        },
        handleToDelete(index,row){
            this.axios.post('/api/admin/deleteUser',{
                email : row.email
            }).then((res)=>{
                var status = res.data.status;
                if(status === 0){
                     this.$alert('删除操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.tableData.splice(index,1);
                        }
                    });
                }
                else{
                     this.$alert('删除操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            });
        },
        searchUser(){
          var parm = ''
          if(this.select == 1){
            parm = 'username'
          }else {
            parm = 'email'
          }
          const tempTableData = [];
          this.tableData3.forEach((item)=>{
            if(item[parm].indexOf(this.input3) >= 0){
               tempTableData.push(item);
            }
          });
          this.tableData = tempTableData;
          if(this.input3 === ''){
            this.tableData = this.tableData3;
          }
        },
        getUerINfo(index,row){
          console.log("当前后台点击用户"+row.email)
          // this.$router.push('/admin/c'+row.email);
        },
        open() {
            this.$prompt('请输入邮箱', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的邮箱是: ' + value
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });       
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }

    }
}
</script>

<style scoped>
.page{ margin-top:20px;}
.userHead{ width:50px; height:50px; border-radius: 50%; overflow:hidden;}
 .el-select{
    width: 130px;
}
 .el-input {
    width: 600px;
}
 .input-with-select, .el-input-group__prepend {
background-color: #fff;
}
</style>
