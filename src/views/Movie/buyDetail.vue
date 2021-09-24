<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header title="影院选择">
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
          </div>
        </div>
      </div>
    </div>
    <div class="cinema">
      <ul>
            <!-- <li>
                <div>
                    <span>大地影院(澳东世纪店)</span>
                    <span class="q"><span class="price">22.9</span> 元起</span>
                </div>
                <div class="address">
                    <span>金州区大连经济技术开发区澳东世纪3层</span>
                    <span>1763.5km</span>
                </div>
                <div class="card">
                    <div>小吃</div>
                    <div>折扣卡</div>
                </div>
            </li> -->
            <li v-for="item in cinemaList" :key="item.id" @click="handleToBuy(item.id)">
                <div>
                    <span>{{ item.nm }}</span>
                    <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{ item.addr }}</span>
                    <span>{{ item.distance }}</span>
                </div>
                <div class="card">
                    <div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
                </div>
            </li>
        </ul>
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
      isLoading: true,
      moviePhNum: 0,
      cinemaList : [],
      prevCityId : -1
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
  handleToBuy(CId){
            console.log(CId);
            this.$router.push('/movie/Cbuy/' + CId);
        }


  },
  filters : {
        formatCard(key){
            var card = [
                { key : 'allowRefund' , value : '改签' },
                { key : 'endorse' , value : '退' },
                { key : 'sell' , value : '折扣卡' },
                { key : 'snack' , value : '小吃'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        },
        classCard(key){
            var card = [
                { key : 'allowRefund' , value : 'bl' },
                { key : 'endorse' , value : 'bl' },
                { key : 'sell' , value : 'or' },
                { key : 'snack' , value : 'or'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        }
    },
  mounted() {
     var cityId = this.$store.state.city.id;
     

    // console.log( this.movieId );
    // console.log( this.cityId);
    // this.axios.get('http://localhost:3000/api/detailmovie?movieId='+ this.movieId).then((res)=>{
    this.axios
      .get('/api/api/detailmovie?movieId=' + this.movieId)
      .then((res) => {
        var msg = res.data.msg
        // if( msg === 'ok' ){

        this.isLoading = false
        this.detailMovie = res.data.detailMovie
        // console.log(this.detailMovie.photos.length)
        this.moviePhNum = this.detailMovie.photos.length
      
      })

       this.axios.get('/api/api4/limit=20&channelId=4&movieId='+this.movieId+'&cityId='+cityId).then((res)=>{
           
            this.cinemaList = res.data.data.cinemas;
            this.isLoading = false;
           
          
        });
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
.cinema ul{ padding:20px; background: rgb(255, 255, 255);}
.cinema li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema div{ margin-bottom: 10px;}
.cinema .q{ font-size: 11px; color:#7219d6}
.cinema .price{ font-size: 18px;}
.cinema .address{ font-size: 13px; color:#666;}
.cinema .address span:nth-of-type(2){ float:right; }
.cinema .card{ display: flex;}
.cinema .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema .card div.bl{ color: #589daf; border: 1px solid #589daf;}



</style>
