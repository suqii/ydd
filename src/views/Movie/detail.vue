<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>

    <Loading v-if="isLoading" />

    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <div
          class="detail_list_bg"
          :style="{
            'background-image':
              'url(' + detailMovie.img.replace(/w\.h/, '148.208') + ')',
          }"
        ></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.img | setWH('148.208')" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.nm }}</h2>
            <p>{{ detailMovie.enm }}</p>
            <p>{{ detailMovie.sc }}</p>
            <p>{{ detailMovie.cat }}</p>
            <p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
            <p>{{ detailMovie.pubDesc }}</p>
            <div class="collect">
              <div class="collectMovie iconfont" @touchstart="collectMovie">
                &#xe642;收藏
              </div>
              <div class="collectMovie iconfont" @touchstart="collectMovie">
                &#xe642;看过
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="movieScore">
        <div class="title">
          <div class="titleName"></div>
          <div class="watch">
            <div class="wantWatch">{{ wishNum }}人想看</div>
            <div class="watched">{{ watchedNum }}人看过 ></div>
          </div>
        </div>
        <div class="score">
          <div class="scoreNum">
            <div class="num">{{ detailMovie.sc }}</div>
            <div class="pNum">149555人评</div>
          </div>
          <div class="scoreBar">
            <ul>
              <li>
                <div class="start">
                  <div class="iconfont iconfontA">
                    &#xe642;&#xe642;&#xe642;&#xe642;&#xe642;
                  </div>
                </div>
                <div class="a">
                  <div class="b fiveStart"></div>
                </div>
              </li>
              <li>
                <div class="start">
                  <div class="iconfont iconfontB">&#xe642;</div>
                  <div class="iconfont iconfontA">
                    &#xe642;&#xe642;&#xe642;&#xe642;
                  </div>
                </div>
                <div class="a">
                  <div class="b fourStart"></div>
                </div>
              </li>
              <li>
                <div class="start">
                  <div class="iconfont iconfontB">&#xe642;&#xe642;</div>
                  <div class="iconfont iconfontA">&#xe642;&#xe642;&#xe642;</div>
                </div>
                <div class="a">
                  <div class="b threeStart"></div>
                </div>
              </li>
              <li>
                <div class="start">
                  <div class="iconfont iconfontB">&#xe642;&#xe642;&#xe642;</div>
                  <div class="iconfont iconfontA">&#xe642;&#xe642;</div>
                </div>
                <div class="a">
                  <div class="b twoStart"></div>
                </div>
              </li>
              <li>
                <div class="start">
                  <div class="iconfont iconfontB">
                    &#xe642;&#xe642;&#xe642;&#xe642;
                  </div>
                  <div class="iconfont iconfontA">&#xe642;</div>
                </div>
                <div class="a">
                  <div class="b oneStart"></div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="scoreText">当前口碑第一</div> -->
        </div>
      </div>
      <!-- <div class="collectMovie" @touchstart="collectMovie">收藏电影</div> -->
      <div class="title">
        <div class="titleName">简介</div>
        <div class="titleInfo">
          展开 >
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{ detailMovie.dra }}
        </p>
      </div>
      <!-- 剧照轮播 -->
      <div class="title">
        <div class="titleName">剧照</div>
        <div class="titleInfo">全部{{ moviePhNum }}张 ></div>
      </div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(item, index) in detailMovie.photos"
            :key="index"
            class="swiper-slide"
          >
            <div class="slide-inner">
              <img :src="item | setWH('')" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="title">
            影评
        </div>
        <div class="emo_line_01"></div>
        <div class="commentsInfo">
            <!-- <ul 
            v-for="(item, index) in movieCon"
            :key="index"
            > -->
            <ul>
                <li>
                    <div class="userInfo">
                        <div class="headImg">
                            <img src="https://img.meituan.net/avatar/f47f0c51d93e46515813b7fd6a21f67511344.jpg" alt="">
                        </div>
                        <div class="nickName">岛川梦奈子</div>
                        <div class="share">分享</div>
                    </div>
                    <div class="userCon">
                        <pre>一部脑洞大开的作品，刚开始剧情略显平淡，很快就进入了精彩的追逐戏，接下来开始反转，到最后，又出现反转，关键是彩蛋环节，留下了各种猜想。\n特效方面，不得不说在巨幕厅看，确实很过瘾！\n建议电影可以做成电脑游戏，手机游戏，应该能吸引不少玩家！\n\n\n🌟 推荐\n有些剧情节奏快，可以二刷一下！\n\n\n🌅 画面\n特效不错！\n\n\n🎉闪光点\n反转比较多！\n\n🥚 彩蛋\n观影到最后！</pre>
                        </div>
                    <div class="conIn">
                      <div class="replay">
                        18 回复
                      </div>
                      <div class="publishTime">
                        5小时前
                      </div>
                      <div class="like">4</div>
                    </div>
                </li>
                <li>
                    <div class="userInfo">
                        <div class="headImg">
                            <img src="https://img.meituan.net/avatar/f47f0c51d93e46515813b7fd6a21f67511344.jpg" alt="">
                        </div>
                        <div class="nickName">岛川梦奈子</div>
                        <div class="share">分享</div>
                    </div>
                    <div class="userCon">
                        <pre>一部脑洞大开的作品，刚开始剧情略显平淡，很快就进入了精彩的追逐戏，接下来开始反转，到最后，又出现反转，关键是彩蛋环节，留下了各种猜想。\n特效方面，不得不说在巨幕厅看，确实很过瘾！\n建议电影可以做成电脑游戏，手机游戏，应该能吸引不少玩家！\n\n\n🌟 推荐\n有些剧情节奏快，可以二刷一下！\n\n\n🌅 画面\n特效不错！\n\n\n🎉闪光点\n反转比较多！\n\n🥚 彩蛋\n观影到最后！</pre>
                        </div>
                    <div class="conIn">
                      <div class="replay">
                        18 回复
                      </div>
                      <div class="publishTime">
                        5小时前
                      </div>
                      <div class="like">4</div>
                    </div>
                </li>
                <!-- <li>
                    <div class="userInfo">
                        <div class="headImg">
                            <img src="https://img.meituan.net/avatar/f47f0c51d93e46515813b7fd6a21f67511344.jpg" alt="">
                        </div>
                        <div class="nickName">{{item.nickName}}</div>
                        <div class="share">分享</div>
                    </div>
                    <div class="userCon">
                        <pre>{{item.content}}</pre>
                        </div>
                    <div class="conIn">
                      <div class="replay">
                        {{item.reply}} 回复
                      </div>
                      <div class="publishTime">
                        {{item.time}}小时前
                      </div>
                      <div class="like">4</div>
                    </div>
                </li> -->
                
                
                <!-- <li>a</li> -->
            </ul>
        </div>
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
      detailMovie: {},
      movieCon: {},
      isLoading: true,
      moviePhNum: 0,
      wishNum: 0,
      watchedNum: 0,
    }
  },
  components: {
    Header,
    swiper,
  },
  props: ['movieId'],
  methods: {
    handleToBack() {
      this.$router.back()
    },
    carouselScroll() {
      var interleaveOffset = 0.5
      new Swiper('.swiper-container', {
        loop: true,
        speed: 2000,
        autoplay: {
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay （没有加入之前轮播图设置 autoplay：true无效）
          delay: 3000, // 自动切换的时间间隔（单位ms）
          // waitForTransition: false,
        },
        observeParents: false, //必须加入
        observer: true, //必须加入
        on: {
          progress: function() {
            var swiper = this
            for (var i = 0; i < swiper.slides.length; i++) {
              var slideProgress = swiper.slides[i].progress
              var innerOffset = swiper.width * interleaveOffset
              var innerTranslate = slideProgress * innerOffset
              swiper.slides[i].querySelector('.slide-inner').style.transform =
                'translate3d(' + innerTranslate + 'px, 0, 0)'
            }
          },
          touchStart: function() {
            var swiper = this
            for (var i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = ''
            }
          },
          setTransition: function(speed) {
            var swiper = this
            for (var i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = speed + 'ms'
              swiper.slides[i].querySelector('.slide-inner').style.transition =
                speed + 'ms'
            }
          },
        },
      })
    },

    collectMovie() {
      var email = localStorage.getItem('email');
                    console.log(email);
      //  console.log(this.detailMovie.rt);
      // var email = '166218286@qq.com'

      this.axios
        .post('/api/users/pushMovieList', {
          email: email,
          movieId: this.detailMovie.id,
          movieName: this.detailMovie.nm,
          movieImg: this.detailMovie.img,
          movieCat: this.detailMovie.cat,
          movieDir: this.detailMovie.dir,
          movieOriLang: this.detailMovie.oriLang,
          movieEnm: this.detailMovie.enm,
          movieRt: this.detailMovie.rt,
        })
        .then((res) => {
          var status = res.data.status

          if (status == 0) {
            messageBox({
              title: '收藏',
              content: '收藏成功',
              ok: '确定',
            })
          } else {
            messageBox({
              title: '收藏',
              content: '您已收藏该电影',
              ok: '确定',
              handleOk() {},
            })
          }
        })
    },
    wishNumAnim(num) {
      // console.log(num)
      var addNum = Math.round(num / 4)

      this.timer = setInterval(() => {
        this.wishNum += addNum
        if (this.wishNum >= num) {
          this.wishNum = num
          clearInterval(this.timer)
        }
      }, 250)
    },
    watchedNumAnim(num) {
      // console.log(num)
      var addNum = Math.round(num / 6)

      this.timer = setInterval(() => {
        this.watchedNum += addNum
        if (this.watchedNum >= num) {
          this.watchedNum = num
          clearInterval(this.timer)
        }
      }, 350)
    },
  },

  mounted() {
    // console.log( this.movieId );
    // this.axios.get('http://localhost:3000/api/detailmovie?movieId='+ this.movieId).then((res)=>{
    this.axios
      .get('/api/api/detailmovie?movieId=' + this.movieId)
      .then((res) => {
        console.log(res.data);
        var msg = res.data.msg
        // if( msg === 'ok' ){

        this.isLoading = false
        this.detailMovie = res.data.detailMovie
        // console.log(this.detailMovie.photos.length)
        this.moviePhNum = this.detailMovie.photos.length
        this.wishNumAnim(res.data.detailMovie.wish)
        this.watchedNumAnim(res.data.detailMovie.watched)
        this.$nextTick(() => {
          this.carouselScroll()
        })
        // }
      })

       this.axios
      .get('http://localhost:3000/api2/mmdb/comments/movie/248566.json?_v_=yes&offset=1')
      .then((res) => {
        console.log(res.data)
        this.movieCon = res.data.cmt;
        // }
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
  background-color: #40454d;
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
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
  color: white;
}
#content .detail_player {
  margin: 20px;
}

.swiper-container {
  /* height: calc(100vh - 120px); */
  height: 10em;
  /* margin: 60px; */
  margin: 0 0.7em;
  border-radius: 1em;
}

.swiper-slide {
  overflow: hidden;
}

.slide-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-size: cover;
  background-position: center;
}
.slide-inner img {
  width: 100%;
}
/* title */
.title {
  margin: 0.5em;
  display: flex;
  justify-content: space-between;
}
.title .titleName {
  color: white;
  font-size: 1.2em;
  font-weight: lighter;
}
.title .titleInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85em;
  font-weight: lighter;
}
.collect {
  /* background: red; */
  /* border: 1px red solid; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.collectMovie {
  height: 2.5em;
  width: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: small;
  color: rgba(255, 255, 255, 0.8);
  background: rgb(124, 124, 124);
  border-radius: 0.8em;
}
@font-face {
  font-family: 'iconfont'; /* Project id 2535496 */
  src: url('//at.alicdn.com/t/font_2535496_9or2w1k1gof.woff2?t=1623305009258')
      format('woff2'),
    url('//at.alicdn.com/t/font_2535496_9or2w1k1gof.woff?t=1623305009258')
      format('woff'),
    url('//at.alicdn.com/t/font_2535496_9or2w1k1gof.ttf?t=1623305009258')
      format('truetype');
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: xx-small;
}
.iconfontA {
  color: rgb(113, 113, 113);
}
.iconfontB {
  color: rgb(51, 51, 51);
}
body {
  background: rgb(48, 48, 48);
}
.movieScore {
  background: rgb(39, 39, 39);
  height: 8em;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* justify-content: center; */
  border-radius: 1em;
  transform: scale(0.93, 0.85);
  /* border: 1px red solid; */
}
.scoreBar {
  margin-left: -em;
}
.scoreBar > ul {
  width: 12em;
  display: flex;
  flex-direction: column;
  list-style: none;
  /* border: 1px red solid; */
  transform: scale(0.8);
}
.scoreBar > ul > li {
  display: flex;
  list-style: none;
  align-items: center;
  height: 1em;
  width: 14em;
  margin-left: -2.4em;
  /* border: 1px red solid; */
}
.scoreBar > ul > li > .start {
  display: flex;
}

.scoreBar > ul > li > .a {
  margin-left: 0.5em;
}
.a {
  height: 0.3em;
  width: 13em;
  background-color: rgb(51, 51, 51);
  border-radius: 1em;
}
.b {
  height: 0.3em;
  /* width: 65%; */
  background-color: rgb(113, 113, 113);
  /* animation: fiveStart 1.6s ease-in-out; */
  border-radius: 1em;
}
.oneStart {
  width: 4%;
  animation: oneStart 1.6s ease-in-out;
}
.twoStart {
  width: 8%;
  animation: twoStart 1.6s ease-in-out;
}
.threeStart {
  width: 15%;
  animation: threeStart 1.6s ease-in-out;
}
.fourStart {
  width: 10%;
  animation: fourStart 1.6s ease-in-out;
}
.fiveStart {
  width: 65%;
  animation: fiveStart 1.6s ease-in-out;
}

@keyframes fiveStart {
  0% {
    width: 0;
  }
  25% {
    width: 20%;
  }
  50% {
    width: 45%;
  }
  100% {
    width: 65%;
  }
}
@keyframes fourStart {
  0% {
    width: 0;
  }
  25% {
    width: 2%;
  }
  50% {
    width: 5%;
  }
  100% {
    width: 10%;
  }
}
@keyframes threeStart {
  0% {
    width: 0;
  }
  25% {
    width: 4%;
  }
  50% {
    width: 10%;
  }
  100% {
    width: 15%;
  }
}
@keyframes twoStart {
  0% {
    width: 0;
  }
  25% {
    width: 1%;
  }
  50% {
    width: 5%;
  }
  100% {
    width: 8%;
  }
}
@keyframes oneStart {
  0% {
    width: 0;
  }
  25% {
    width: 1%;
  }
  50% {
    width: 2%;
  }
  100% {
    width: 4%;
  }
}

.movieScore > .title {
  /* margin-top: 2em; */
  /* border: 1px red solid; */
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.movieScore > .title > .watch {
  /* border: 1px red solid; */
  display: flex;
  font-size: small;
  font-weight: lighter;
  justify-content: space-between;
  align-items: center;
}
.movieScore > .title > .watch > .wantWatch {
  margin-right: 2em;
}
.movieScore > .score {
  /* margin-right: 2em; */
  margin-top: -1em;
  /* border: 1px red solid; */
  display: flex;
  width: 85%;
  justify-content: space-between;
  align-items: center;
  height: 5em;
}
.movieScore > .score > .scoreNum {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px red solid; */
}
.movieScore > .score > .scoreNum > .num {
  font-size: x-large;
  color: rgb(230, 178, 49);
  /* border: 1px red solid; */
}
.movieScore > .score > .scoreNum > .pNum {
  font-size: x-small;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.5);
  /* border: 1px red solid; */
}
.movieScore > .score > .scoreText {
  width: 5em;
  height: 3em;
  background: #000;
  /* border: 1px red solid; */
}
.movieScore > .title > .titleName {
  background: url(https://suqiqi.oss-cn-beijing.aliyuncs.com/test/headImg/title.jpg);
  /* border: 1px red solid; */
  background-size: cover;
  width: 6em;
  height: 2em;
}
.comments {
  margin-top: 2em;
  width: 100%;
  /* height: 400px; */
  background: white;
  border-radius: 2em 2em 0 0;
}
.comments > .title {
  position: sticky;
  background: white;
  border-radius: 2em 2em 0 0;
  top: 0;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px rgba(189, 189, 189, 1) solid;
  margin-bottom: 1em;
}
.comments > .commentsInfo {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* border: 1px red solid; */
}
.comments > .commentsInfo > ul {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* border: 1px red solid; */
}
.comments > .commentsInfo > ul > li {
  margin-top: 1em;
  border-bottom: 1px rgba(189, 189, 189, 1) solid;
  /* border: 1px red solid; */
}
.comments > .commentsInfo > ul > li > .userInfo {
  display: flex;
  margin: 0 1em 0 1em;
  /* border: 1px red solid; */
}
.userInfo > .headImg > img {
  /* margin: 0 1em; */
  height: 4em;
  border-radius: 50%;
}
.userInfo > .nickName {
  /* border: 1px red solid; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.userInfo > .share {
  /* border: 1px red solid; */
  display: flex;
  /* text-align: right; */
  /* align-self: flex-end; */
  justify-content: center;
  align-items: center;
  margin-left: auto;
}
.userCon {
  margin: 0 2em 0 5em;
  white-space: pre-line;

  /* border: 1px red solid; */
}
.userCon pre {
  /* margin: -1em 0; */
  margin-bottom: 2em;
  /* border: 1px red solid; */
  white-space: pre-wrap;
  /* white-space: pre-line; */
}
.conIn {
  /* border: 1px red solid; */
  display: flex;
  align-items: center;
  margin: 0 2em 1em 5em;
}

.conIn > .replay {
  width: 5em;
  height: 2em;
  font-size: small;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(238, 241, 246);
  border-radius: 1em;
  color: rgb(123, 133, 153);
  /* border: 1px red solid; */
}
.conIn > .publishTime {
  margin-left: 1em;
  color: rgb(189, 189, 189);
  font-size: small;
  display: flex;
  justify-content: center;
  align-items: center;
}
.conIn > .like {
  height: 2em;
  width: 5em;
  display: flex;
  color: rgb(189, 189, 189);
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  border: 1px rgba(189, 189, 189, 1) solid;
  margin-left: auto;
}
</style>
