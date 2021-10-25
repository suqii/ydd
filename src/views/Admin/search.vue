<template>
  <div class="container">
    <el-input
      placeholder="请输入搜索内容"
      v-model="message"
      suffix-icon="el-icon-search"
      @keyup.enter.native="search"
    ></el-input>
    <div
      
      class="con"
      v-for="item in moviesList"
      :key="item.id"
      @click="handleToDetail(item.id)"
    >
      <div class="card">
        <img :src="item.img.replace('/w.h/', '/')" alt="" />
        <div>
          <span>{{ item.nm }}</span>
        </div>
      </div>
      <div class="conTxt">
        <div class="act">演员： {{ item.act }}</div>
        <div class="cat">类型： {{ item.cat }}</div>
        <div class="pubDesc">上映时间： {{ item.pubDesc }}</div>
        <div class="src">发源地： {{ item.src }}</div>
      </div>
    </div>
    <div v-if="!moviesList.length">nothing</div>
  </div>
</template>

<script>
export default {
  name: 'cinema',
  data() {
    return {
      movieList: [],
      message: '',
      moviesList: [],
    }
  },
  mounted() {
    // this.axios.get('/api/api/comingList?ci=10&token=&limit=20').then((res) => {
    //   console.log(res.data.coming)
    //   this.movieList = res.data.coming
    // })
  },

  methods: {
    cancelRequest() {
      if (typeof this.source === 'function') {
        this.source('终止请求')
      }
    },
    search() {
      console.log('search')
      var that = this
      var cityId = this.$store.state.city.id
      this.cancelRequest()
      this.axios
        .get('/api/api/search?cityId=' + cityId + '&kw=' + this.searchCon, {
          cancelToken: new this.axios.CancelToken(function(c) {
            that.source = c
          }),
        })
        .then((res) => {
          console.log(res.data.movies.list)
          this.moviesList = res.data.movies.list
          // var msg = res.data.msg;
          // var movies = res.data.data.movies;
          // if(msg && movies){
          //     this.moviesList = res.data.movies.list;
          // }
        })
        .catch((err) => {
          if (this.axios.isCancel(err)) {
            console.log('Rquest canceled', err.message) //请求如果被取消，这里是返回取消的message
          } else {
            //handle error
            console.log(err)
          }
        })
    },
  },
  watch: {
    message(newVal) {
      var that = this
      var cityId = this.$store.state.city.id
      this.cancelRequest()
      this.axios
        .get('/api/api/search?cityId=' + cityId + '&kw=' + newVal, {
          cancelToken: new this.axios.CancelToken(function(c) {
            that.source = c
          }),
        })
        .then((res) => {
          this.moviesList = res.data.movies.list
          // var msg = res.data.msg;
          // var movies = res.data.data.movies;
          // if(msg && movies){
          //     this.moviesList = res.data.movies.list;
          // }
          console.log(this.moviesList)
        })
        .catch((err) => {
          if (this.axios.isCancel(err)) {
            console.log('Rquest canceled', err.message) //请求如果被取消，这里是返回取消的message
          } else {
            //handle error
            console.log(err)
          }
        })
    },
  },
}
</script>

<style>
.card img {
  width: 100%;
}
.card {
  /* margin-top:5px ; */
  /* height: 270px; */
  width: 260px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  /* display: inline-block; */
  /* margin-left: 18px; */
  /* vertical-align: top; */
  transform: scale(0.8);
}
.con {
  height: 380px;
  /* background: #000; */
  margin: 10px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.conTxt {
  /* background: #000; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card span {
  font-size: 16px;
  color: #bfbfbf;
  display: block;
  letter-spacing: 2px;
  padding: 30px 20px;
}
</style>
