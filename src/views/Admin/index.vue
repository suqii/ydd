<template>
    <el-container>
      
        <el-header style="display:flex;align-items: center;margin-left:-20px; "> 
          <div style="display:flex;align-items: center;">
            <img style="height:50px;width:50px;" src="https://suqiqi.oss-cn-beijing.aliyuncs.com/freeFind/logo.png" alt="" />
          影多多后台
          </div>
          <!-- 退出登录 -->
          <div style="display:flex;align-items: center;justify-content: center;">
            <div style="margin-right:20px; font-size: 20px;">{{$store.state.user.name}}</div>
            <el-button type="text" @click="logout">退出登录</el-button>
          </div>
          </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1" active-text-color="rgb(191, 203, 217)">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <router-link to="/admin/users" tag="span" slot="title">用户管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document"></i>
                        <router-link to="/admin/movie" tag="span" slot="title">电影管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <router-link to="/admin/cinema" tag="span" slot="title">影院管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-search"></i>
                        <router-link to="/admin/search" tag="span" slot="title">影视搜索</router-link>
                    </el-menu-item>
                </el-menu>    
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import axios from 'axios';
export default {
    name : 'admin',
    beforeRouteEnter (to, from, next) {
        axios.get('/api/admin').then((res)=>{
            var status = res.data.status;
            if(status === 0){
                next();
            }
            else{
                next('/mine/MLogin');
            }
        });
    },
    mounted(){
      // console.log("a")
      console.log(this.$store.state.user.userHead)
      console.log(this.$store.state.user.name)
    },
     methods : {
       logout(){
         console.log('退出登录');
         this.$router.replace('/mine/MLogin')
        //  next('/mine/MLogin');
       }
     }
}
</script>

<style scoped>
.el-header, .el-footer {
background-color: rgb(48, 65, 86);
background-color: rgb(43, 47, 58);
color: white;
padding-left:60px;
line-height: 60px;
justify-content: space-between;
}
.el-container{
  /* border: 1px red solid; */
  height: 100%;
  /* background: #000; */
}
.el-menu-item{
  color: white;
  background-color: rgb(48, 65, 86);
}
.el-aside {
background-color: rgb(48, 65, 86);
color: #333;
text-align: center;
line-height: 200px;

}

.el-main {
/* background-color: rgb(48, 65, 86); */
color: #333;
text-align: center;
}

body > .el-container {
margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
line-height: 320px;
}
.el-menu-item.is-active {
      background-color: rgb(38, 52, 69) !important;
      /* color: #fff; */
    }
</style>
