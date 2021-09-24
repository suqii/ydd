<template>
  <div class="peisonal">
    <div class="header">
      <div class="userHead">
        <img :src="$store.state.user.userHead" alt="" />
      </div>
      <input type="file" name="file" value="上传头像" @change="handleToUpload" class="upload">

      <div class="userInf">
        <div class="userName">{{ $store.state.user.name }}</div>
        <div class="userTag">
          <div class="identity">
            <i class="iconfont">&#xe619;</i>
            <p v-if="$store.state.user.isAdmin">管理员</p>
            <p v-else>普通用户</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的订单 -->
    <div class="order">
      <div class="orderTitle">
        <div class="titleName">我的订单</div>
        <div class="allOrder">全部订单></div>
      </div>
      <div class="orderItem">
        <div class="itemList">
          <div class="quareBtn">
            <i class="iconfont">&#xe7a2;</i>
          </div>

          <p>待付款</p>
        </div>
        <div class="itemList">
          <div class="quareBtn">
            <i class="iconfont">&#xe603;</i>
          </div>

          <p>待审核</p>
        </div>
        <div class="itemList">
          <div class="quareBtn">
            <i class="iconfont">&#xe6c2;</i>
          </div>

          <p>未完成</p>
        </div>
        <div class="itemList">
          <div class="quareBtn">
            <i class="iconfont">&#xe6cf;</i>
          </div>

          <p>已完成</p>
        </div>
      </div>
    </div>

    <div class="func">
      <!-- 功能 -->
      <a
        v-if="$store.state.user.isAdmin"
        href="/admin"
        target="_blank"
        class="neumorphism ht"
      >
        <div class="left">
          <div class="quareBtn">
            <i class="iconfont">&#xe665;</i>
          </div>
          <div class="text">后台管理</div>
        </div>
        <div class="moreBtn">
          <i class="iconfont">&#xe611;</i>
        </div>
      </a>

      <!-- 功能 -->
      <div class="neumorphism">
        <div class="left">
          <div class="quareBtn">
            <i class="iconfont">&#xe619;</i>
          </div>
          <div class="text">账户</div>
        </div>
        <div class="moreBtn">
          <i class="iconfont">&#xe611;</i>
        </div>
      </div>
      


      <!-- 功能 -->
      <div class="neumorphism">
        <div class="left">
          <div class="quareBtn">
            <i class="iconfont">&#xe629;</i>
          </div>
          <div class="text">我的收藏</div>
        </div>
        <div class="moreBtn">
          <i class="iconfont">&#xe611;</i>
        </div>
      </div>

      <!-- 功能 -->
      <div class="neumorphism">
        <div class="left">
          <div class="quareBtn">
            <i class="iconfont">&#xe615;</i>
          </div>
          <div class="text">帮助</div>
        </div>
        <div class="moreBtn">
          <i class="iconfont">&#xe611;</i>
        </div>
      </div>

      <!-- 功能 -->
      <div class="neumorphism">
        <div class="left">
          <div class="quareBtn">
            <i class="iconfont">&#xe618;</i>
          </div>
          <div class="text">设置</div>
        </div>
        <div class="moreBtn">
          <i class="iconfont">&#xe611;</i>
        </div>
      </div>

      <!-- 退出 -->
      <div class="logout" @touchstart="handleToLogout">
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { messageBox } from '@/components/JS'
export default {
  name: 'center',
  methods: {
    handleToLogout() {
      this.axios.get('/api/users/logout').then((res) => {
        var status = res.data.status
        if (status === 0) {
          localStorage.removeItem('name')
          localStorage.removeItem('isAdmin')
          localStorage.removeItem('email')
          this.$store.commit('user/USER_NAME', {
            name: '',
            isAdmin: false,
            userHead: '',
          })
          this.$router.push('/mine/login')
        }
      })
    },
    handleToUpload(ev) {
      console.log('点击了修改头像')
      var file = ev.target.files[0]
      var param = new FormData()
      param.append('file', file, file.name)
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      this.axios
        .post('/api/users/uploadUserHead', param, config)
        .then((res) => {
          var status = res.data.status
          var This = this
          if (status === 0) {
            messageBox({
              title: '信息',
              content: '上传头像成功',
              ok: '确定',
              handleOk() {
                This.$store.commit('user/USER_NAME', {
                  name: This.$store.state.user.name,
                  isAdmin: This.$store.state.user.isAdmin,
                  userHead: res.data.data.userHead + '?' + Math.random(),
                })
              },
            })
          } else {
            messageBox({
              title: '信息',
              content: '上传头像失败',
              ok: '确定',
            })
          }
        })
    },
  },
  beforeRouteEnter(to, from, next) {
    axios.get('/api/users/getUser').then((res) => {
      var status = res.data.status
      console.log(res.data)
      if (status === 0) {
        next((vm) => {
          localStorage.setItem('name', res.data.data.username)
          localStorage.setItem('isAdmin', res.data.data.isAdmin)
          localStorage.setItem('email', res.data.data.email)

          vm.$store.commit('user/USER_NAME', {
            name: res.data.data.username,
            isAdmin: res.data.data.isAdmin,
            userHead: res.data.data.userHead,
          })
        })
      } else {
        next('/mine/login')
      }
    })
  },
}
</script>

<style scoped>

.peisonal {
  background-color: #eee;
  font-family: 'Roboto', sans-serif;
  /* font-size: 24px;
        font-weight: 700; */
  color: #404040;
  display: flex;
  flex-direction: column;
}
@font-face {
  font-family: 'iconfont'; /* Project id 2535496 */
  src: url('//at.alicdn.com/t/font_2535496_xn2thwmhkwd.woff2?t=1621846752736')
      format('woff2'),
    url('//at.alicdn.com/t/font_2535496_xn2thwmhkwd.woff?t=1621846752736')
      format('woff'),
    url('//at.alicdn.com/t/font_2535496_xn2thwmhkwd.ttf?t=1621846752736')
      format('truetype');
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.neumorphism {
  /* border: 1px red solid; */
  margin: 0.5em auto;
  width: 90%;
  height: 70px;
  padding: 0 1em;
  background: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1em;
  box-shadow: 7px 7px 9px rgba(0, 0, 0, 0.15),
    -7px -7px 9px rgba(255, 255, 255, 0.65);
}

.moreBtn {
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.15),
    -3px -3px 5px rgba(255, 255, 255, 0.65);
}
.quareBtn {
  width: 1.5em;
  height: 1.5em;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.15),
    -3px -3px 5px rgba(255, 255, 255, 0.65);
}

.text {
  /* border: 1px red solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.8em;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: dimgray;
  /* font-weight: 900; */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px white;
}
.left {
  display: flex;
}
.func {
  /* border: 1px red solid; */
  width: 100%;
  /* height: 50%; */
}
.header {
  display: flex;
  /* border: 1px red solid; */
  padding-left: 1em;
  display: flex;
  justify-content: left;
  align-items: center;
}
.userHead img {
  /* border: 1px red solid; */
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.upload{
  /* border: 1px red solid; */
  position:absolute;
  width: 100px;
  height: 100px;
  opacity: 0;
}
.userInf {
  /* border: 1px red solid; */
  margin-left: 8%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
}
.userInf .userName {
  font-size: 24px;
  font-weight: 700;
}
.identity {
  /* font-size: 1em; */

  width: 5.5em;
  height: 2em;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2em 0.1em;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.15),
    -3px -3px 5px rgba(255, 255, 255, 0.65);
}
.identity .iconfont {
  color: #63c8ff;
}
.identity p {
  /* color: #63c8ff; */
  font-weight: bold;
  margin-left: 0.2em;
}
/* 我的订单 */
.order {
  /* border: 1px red solid; */
  margin-top: 0.5em;
  height: 8em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.orderTitle {
  display: flex;
  padding: 0 1em;
  justify-content: space-between;
}
.titleName {
  font-weight: bold;
}
.orderItem {
  /* border: 1px red solid; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.orderItem .itemList .quareBtn .iconfont {
  font-size: 1.2em;
  color: rgb(6, 167, 247);
}
/* .quareBtn .iconfont {
        font-size: .8em;
        color: rgb(6, 167, 247);
      } */
.orderItem .itemList p {
  font-size: 0.5em;
  font-weight: lighter;
  text-align: center;
  /* border: 1px red solid; */
}
.logout {
  /* border: 1px red solid; */

  font-size: larger;
  font-weight: bold;
  margin: 0.4em auto;
  width: 70%;
  height: 50px;
  padding: 0 1em;
  background: rgb(228, 77, 38);
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  box-shadow: 7px 7px 9px rgba(0, 0, 0, 0.15),
    -7px -7px 9px rgba(255, 255, 255, 0.65);
}
.ht {
  text-decoration: none;
  color: red;
}
.ht .left .text {
  color: red;
}
</style>
