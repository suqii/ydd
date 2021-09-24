<template>
  <footer id="footer">
    <ul>
      <router-link tag="li" to="/movie">
        <i class="iconfont icon-dianying"></i>
        <p>电影</p>
      </router-link>
      <router-link tag="li" to="/cinema">
        <i class="iconfont icon-yingyuan"></i>
        <p>影院</p>
      </router-link>
      <router-link tag="li" to="/collect">
        <i class="iconfont ">&#xe61a;</i>
        <p>收藏</p>
      </router-link>
      <router-link tag="li" to="/mine">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped>
#footer {
  width: 100%;
  height: 4em;
  
  background: white;
  border-top: 2px #ebe8e3 solid;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
#footer ul {
  display: flex;
  text-align: center;
  height: 4em;
  /* border: 1px red solid; */
  align-items: center;
}
#footer ul li {
  flex: 1;
  height: 40px;
}
#footer ul li.active {
  color: #7219d6;
  
  /* transition: 1s; */

}
#footer ul li.router-link-active {
  color: #7219d6;
  /* border: 1px red solid; */
  /* width: 200%; */
  /* transition: 1s; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(228, 242, 255);
  border-radius: .5em;
}
/* #footer ul li.router-link-active p{
  opacity: 1;
} */
#footer ul i {
  font-size: 20px;
}
#footer ul p {
  font-size: 12px;
  line-height: 18px;
  /* opacity: 0; */
}
</style>
