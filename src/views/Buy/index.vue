<template>
  <div id="main">
    <div id="content">
      <div class="ry-content">
        <div class="swiper-container ry-swiper" id="rySwiper">
          <div class="filter"></div>
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
    </div>

    <!-- <TabBar /> -->
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import CiList from '@/components/CiList'
import swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.min.js'
import 'swiper/swiper.min.css'
// import 'swiper'

export default {
  name: 'Buy',
  components: {
    Header,
    TabBar,
    CiList,
    swiper,
  },
  props: ['CId'],
  data() {
    return {
      movieList: [],
      startTime: '',
      endTime: '',
      lang: '',
      pos: '',
      price: '',
      vipPrice: '',
      nothingFlag: true,
      movieShowList: [],
    }
  },

  mounted() {
    this.axios
      .get(
        '/api/api2/mtrade/cinema/cinema/shows.json?cinemaId=' +
          this.CId,
        {}
      )
      .then((res) => {
        if (res.data.success) {
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
  methods: {
    showInfo(index) {
      this.movieShowList = this.movieList[index].shows[0].plist
      // console.log(this.startTime[0].tm)
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
            that.showInfo(this.activeIndex)
          },
        },
      })
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.ry-content {
  border: 1px red solid;
  /* background: url(http://p0.meituan.net/movie/cc08f286aea37c3355fb4bb2441aef3f3457731.jpg); */
}

.ry-swiper {
  width: 100%;
  cursor: pointer;
  padding: 20px 0 60px;
}

.ry-swiper .swiper-slide {
  /* border: 1px red solid; */
  width: 10em;
  background-color: #fff;
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
  /* border: 1px red solid; */
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
  display: block;
  overflow: hidden;
  margin: 0 auto;
}

.ry-item img {
  width: 9em;
}

.ry-item dd {
  margin-top: 22px;
}
.filter {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url(http://p0.meituan.net/movie/cc08f286aea37c3355fb4bb2441aef3f3457731.jpg);
  filter: blur(20px);
}
.showsList {
  /* border: 1px red solid; */
}
.info {
  width: 100%;
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
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  border-radius: 10%;
  color: white;
  font-size: small;
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
</style>
