<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header title="购票">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>

    <Loading v-if="isLoading" />

   <div v-else id="content">
      <div class="ry-content">
        <div class="swiper-container ry-swiper" id="rySwiper">
          <div class="filter" :style="{
            'background-image':
              'url(' + bgImg.replace(/w\.h/, '148.208') + ')',
          }"></div>
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in movieList"
              :key="index"
            >
              <a href="javascript:;" class="ry-item">
                <dl>
                  <dt>
                    <img :src="item.img | setWH('')" alt="" class="ry-cert" />
                  </dt>
                  <div class="info">
                    <div class="infoTop">
                      <div class="movieName">{{ item.nm }}</div>
                      <div class="movieScore">{{ item.sc }}分</div>
                    </div>
                    <div class="infoBottom">
                      {{ item.desc }}
                    </div>
                  </div>
                </dl>
              </a>
            </div>
          </div>

          <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div> -->
        </div>
      </div>

      <ul class="showsList" v-for="(item, index) in movieShowList" :key="index">
        
        <li>
          
          <div class="col">
            <span class="startTime">{{ item.tm }}</span>
            <span class="endTime">{{ endTime }}散场</span>
          </div>
          <div class="col">
            <span class="lang">{{ item.lang }}{{ item.tp }}</span>
            <span class="pos">{{ item.th }}</span>
          </div>
          <div class="null"></div>
          <div class="baseSellPrice">
            <span class=""
              ><span class="money">￥</span>{{ item.baseSellPrice }}</span
            >
            <div class="vip">
              <div class="discount">折扣卡</div>
              <div class="vipPrice">
                <span class="money">￥</span>{{ item.vipPrice }}
              </div>
            </div>
          </div>
          <div class="buy">
            购票
          </div>
        </li>
        
      </ul>
      <div v-if="infoFlag" class="nothing">
        <img src="https://suqiqi.oss-cn-beijing.aliyuncs.com/test/headImg/nothing.png" alt="">
        <p>今日场次已放映完</p>
        </div>
    </div>
 
  </div>
</template>

<script>
import { messageBox } from '@/components/JS'
import Header from '@/components/Header'
import swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.min.js'
export default {
  name: 'Detail',
  data() {
    return {
      movieList: [],
      startTime:'',
      endTime:'',
      lang:'',
      pos:'',
      price:'',
      vipPrice:'',
      nothingFlag: true,
      movieShowList:[],
      isLoading:true,
      infoFlag:false,
      bgImg:'',
    }
  },
  components: {
    Header,
    swiper,
  },
 props: ['CId'],
  methods: {
    handleToBack() {
      this.$router.back()
    },
  showInfo(index) {
    console.log(this.movieList)
      this.movieShowList = this.movieList[index].shows[0].plist
      console.log(this.movieList[index].img)
      this.bgImg = this.movieList[index-3].img
      this.infoFlag = false
      if(this.movieShowList[0]==null){
        // console.log("空")
        this.infoFlag = true
      }
    },
    carouselScroll() {
      var that = this
      new Swiper('.swiper-container', {
        loop: true,
         slidesPerView: 3,
        centeredSlides: true,
        on: {
          slideChangeTransitionEnd: function() {
            // console.log(that.movieList[0].shows[0].plist)
            // that.startTime = that.movieList[0].shows[0].plist[0].tm
            // console.log(this.activeIndex)
            that.showInfo(this.activeIndex);
          },
        },
      })
    },


  },
  
  mounted() {
    console.log(this.CId)
     this.axios
      .get(
        'http://47.108.192.147:3000/api2/mtrade/cinema/cinema/shows.json?cinemaId='+this.CId+'&ci=1&userid=&channelId=4',
        {}
      )
      .then((res) => {
        // console.log(res)
        if (res.data.success) {
          this.isLoading = false
          this.movieList = res.data.data.movies
          // this.carouselScroll()
          this.$nextTick(() => {
            //在这个函数里面，因为数据改变导致页面生成新的真实dom，全部渲染完成了
            //   new Swiper(".swiper-container",{
            //              loop:true,

            //  })
            this.carouselScroll()
          })
        }
        // console.log(this.movieList)
      })
  },
  
}
</script>

<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  /* background: white; */
  /* background-color: #40454d; */
   background: rgb(255, 255, 255);
}
#detailContrainer.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
a {
  text-decoration: none;
}

.ry-content {
  /* border: 1px red solid; */

  /* background: url(http://p0.meituan.net/movie/cc08f286aea37c3355fb4bb2441aef3f3457731.jpg); */
}

.ry-swiper {
  width: 100%;
  cursor: pointer;
  padding: 20px 0 60px;
  /* border: 1px red solid; */
}

.ry-swiper .swiper-slide {
  /* border: 1px red solid; */
  width: 12em;
  
  opacity: 0.7;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -webkit-transition: transform 1s;
  -moz-transition: transform 1s;
}

.ry-swiper .swiper-slide-active {
  transform: scale(1);
  opacity: 1;
  z-index: 10;
  /* border: 1px red solid; */
}

.ry-swiper .swiper-slide.swiper-slide-prev {
  transform: scale(0.8);
}

.ry-swiper .swiper-slide.swiper-slide-next {
  transform: scale(0.8);
}

.ry-item {
  
  display: block;
  width: 9em;
  overflow: hidden;
  text-align: center;
  color: #505050;
  font-size: 16px;
}

.ry-swiper .swiper-slide-active .ry-item {
  box-shadow: 0 6px 18px rgba(55, 139, 236, 0.29);
}

.ry-item dt {
  /* border: 1px red solid; */
  display: block;
  overflow: hidden;
  margin: 0 auto;
}

.ry-item img {
  width: 9em;
  border-radius: 1em 1em 0 0;
}

.ry-item dd {
  margin-top: 22px;
}
.filter {
  position: absolute;
  height: 110%;
  width: 100%;
  top: -1em;
  background: url(http://p0.meituan.net/movie/cc08f286aea37c3355fb4bb2441aef3f3457731.jpg);
 
  filter: blur(20px);
  background-size: cover;

  left: 0;
  top: 0;
}
.showsList {
  /* border: 1px red solid; */
}
.info {
  width: 100%;
  border-radius: 0 0 1em 1em; 
  background-color: #fff;
  /* border: 1px red solid; */
}
.info .infoTop {
  display: flex;
  justify-content: center;
}
.info .infoTop .movieName {
  font-weight: bold;
  padding-right: 1em;
  white-space: nowrap;
}
.info .infoTop .movieScore {
  font-weight: lighter;
  padding-right: 1em;
}
.info .infoBottom {
  display: flex;
  justify-content: space-around;
  font-weight: lighter;
  font-size: small;
}
.showsList{
  background: rgb(255, 255, 255);
}
.showsList > li {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px rgba(0, 0, 0, 0.5) dotted;
  padding: 0.8em 0;
  
}
.showsList > li > div {
  /* border: 1px red solid; */
}
.showsList > li > .null {
  background: #000;
  width: 4em;
}
.showsList > li > .col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.showsList > li > .col > .startTime {
  font-weight: bold;
  font-size: large;
}
.showsList > li > .col > .endTime,
.showsList > li > .col > .pos {
  font-weight: lighter;
  font-size: small;
}
.showsList > li > .buy {
  /* background: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  border-radius: 10%;
  color: rgb(255, 153, 0);
  font-size: small;
  width: 4em;
  height: 2em;
  border-radius: 1em;
  border:1px rgb(255, 153, 0) solid;
}
.showsList > li > .baseSellPrice {
  /* background: red; */
  display: flex;
  justify-content: center;
  align-items: center;

  /* font-size: small; */
}
.showsList > li > .baseSellPrice > .vip {
  display: flex;
  border: 1px rgb(255, 153, 0) solid;
  font-size: xx-small;
  border-radius: 10%;
}
.showsList > li > .baseSellPrice > .vip > .discount {
  background: rgb(255, 153, 0);
  color: white;
}
.money {
  color: red;
  font-size: xx-small;
}
.nothing{
  /* border: 1px red solid; */
  height: 16em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nothing img{
  /* border: 1px red solid; */
  height: 13em;
}
.nothing p{
  /* border: 1px red solid; */
  font-size: large;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
}

</style>
