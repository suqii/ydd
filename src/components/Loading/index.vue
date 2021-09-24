<!--loading-->
<template>
  <div v-show="showloading" class="main">
    <div id="loading" class="loading" />
  </div>
</template>

<script>
import lottie from 'lottie-web'
import datajson from '@/assets/Loading/loading_3.json'
export default {
  name : 'Loading',
  components: {},
  data: () => ({
    showloading: true,
  }),
  computed: {},
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const icon = document.getElementById('loading')
      lottie.loadAnimation({
        container: icon, // 包含动画的dom元素
        renderer: 'svg', // 渲染出来的是什么格式
        loop: true, // 循环播放
        autoplay: true, // 自动播放
        animationData: datajson, // 动画json的路径
      })
    },
    show() {
      this.showloading = true
      lottie.play()
    },
    hidden() {
      this.showloading = false
      lottie.stop()
    },
  },
}
</script>

<style scoped>
.main{
  height: 80vh;
 
  /* border: 1px red solid; */
  display: flex;
  justify-content: center;
  align-content: center;
}
.loading{
  width: 50%;
  
}
</style>