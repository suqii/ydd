<template>
  <div id="main">
    <Header title="我的收藏" />
    
    <div class="collect" v-if="nothingFlag">
      <div class="movieInfo">
        <div class="info">
          <div class="left textStyleOne">电影名称</div>
          <div class="right textStyleGreen">{{ mName }}</div>
        </div>
        <div class="info">
          <div class="left textStyleTwo">电影英文名</div>
          <div class="right">{{ mEname }}</div>
        </div>
        <div class="info">
          <div class="left">电影语言</div>
          <div class="right">{{ mOriLang }}</div>
        </div>
      </div>
      <!-- Slider main container -->
      <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div
            v-for="(item, index) in movieList.movieList"
            :key="index"
            class="swiper-slide"
            @click="handleToDetail(item.movieId)"
          >
            <div class="picture">
              <img :src="item.movieImg | setWH('')" alt="" />
            </div>
            <div class="detail">
              <h3>{{ item.movieName }}</h3>
              <span>{{ item.movieDir }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="buttonItem">
        <div class="remind"><i class="iconfont icon">&#xe62a;</i>提醒</div>
        <div class="buy"><i class="iconfont icon">&#xe7d3;</i>购买</div>
      </div>
    </div>
    <div class="nothing" v-else>
      <NotFind />
    </div>
    <TabBar />
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import NotFind from '@/components/NotFind'
import swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.min.js'

export default {
  name: 'Collect',
  components: {
    Header,
    TabBar,
    NotFind,
    swiper,
  },
  data() {
    return {
      movieList: [],
      mName: '电影名称',
      mEname: '电影英文名称',
      mOriLang: '电影语言',
      isLoading : true,
      nothingFlag:false,
    }
  },
  //     watch:{
  //      movieList(val, oldVal){//普通的watch监听
  //          console.log("movieList: "+val, oldVal);
  //      },

  //  },
  methods: {
     handleToDetail(movieId){
      
            this.$router.push('/movie/detail/1/' + movieId);
        },
    movieInfo(index) {
      this.mName = this.movieList.movieList[index].movieName
      this.mEname = this.movieList.movieList[index].movieEnm
      this.mOriLang = this.movieList.movieList[index].movieOriLang
    },
    carouselScroll() {
      var that = this
      new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 350,
          modifier: 1,
          slideShadows: true,
        },
        on: {
          slideChangeTransitionEnd: function() {
            that.movieInfo(this.activeIndex)
          },
        },
      })
    },
  },
  activated() {
    // console.log(this.$store.state.user.isAdmin)
    if (this.$store.state.user.isAdmin){
      var email = localStorage.getItem('email')
      this.axios
      .get('/api/users/usermovieList', {
        params: { email: email },
      })
      .then((res) => {
        var status = res.data.status
        // console.log(res.data.data.movieList.length)
        console.log(res.data.data.movieList[0].movieList.length)
        this.isLoading = false;
        if(res.data.data.movieList[0].movieList.length == 0 && res.data.data.movieList[0].movieList.length == null){
          console.log("没有收藏电影数据");
          // this.nothingFlag = false;
        }else{
          if (status === 0 ) {
            this.nothingFlag = true;
          this.movieList = res.data.data.movieList[0]
          //  console.log(this.movieList.movieList[0].movieName)
        }
          this.$nextTick(() => {
          this.movieInfo(0)
          this.carouselScroll()
        })
        }
        
      })
    }else{
      var email = null
    }
    console.log(email)
    this.isLoading = true;
    // console.log(email)
    
  },
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont'; /* Project id 2535496 */
  src: url('//at.alicdn.com/t/font_2535496_weoiy7f2gx.woff2?t=1622448268614')
      format('woff2'),
    url('//at.alicdn.com/t/font_2535496_weoiy7f2gx.woff?t=1622448268614')
      format('woff'),
    url('//at.alicdn.com/t/font_2535496_weoiy7f2gx.ttf?t=1622448268614')
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
.collect {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* color: white;
  background: rgb(20, 20, 20); */
  /* background: rgb(); */
  margin: 0;
  padding: 0;
  height: 85%;

  /* border: 1px red solid; */
}
.movieInfo {
  width: 100%;
  height: 20%;
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.movieInfo .info {
  display: flex;
  width: 94%;

  justify-content: space-between;

  /* border: 1px red solid; */
}
.textStyleOne {
  font-weight: bold;
  font-size: x-large;
}
.textStyleTwo {
  font-weight: bolder;
  font-size: large;
}
.textStyleGreen {
  font-weight: bolder;
  font-size: large;
  color: rgb(89, 135, 103);
}
.movieInfo .info > div {
  /* border: 1px red solid; */
}
.swiper-container {
  width: 100%;
  /* padding-top: 50px;
        padding-bottom: 50px; */
  /* border: 1px red solid; */
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  /* width: 320px; */
  width: 70%;
  height: 99%;
  background-color: #fff;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* border: 1px red solid; */
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
}

.picture {
  width: 100%;
  height: 320px;
  overflow: hidden;
  /* border: 1px red solid; */
}
.picture img {
  display: block;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.detail {
  padding: 25px 20px;
  font-weight: 600;
  text-align: center;
}
.detail h3 {
  margin: 0;
  font-size: 20px;
}
.detail span {
  display: block;
  font-size: 16px;
  color: #f44336;
}

.buttonItem {
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  /* border: 1px red solid; */
}
.buttonItem .remind,
.buttonItem .buy {
  /* border: 1px white solid; */
  width: 9em;
  height: 2.5em;
  border-radius: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgb(255, 163, 104);
}
.icon {
  font-size: 1.5em;
  padding: 0 0.5em;
}
</style>
