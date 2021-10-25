<template>
  <div class="container">
    <div class="card" v-for="(item, index) in movieList" :key="index">
      <!-- 背景 -->
      <div
        class="img"
        :style="{ 'backgroundImage':'url('+ (item.img.replace('/w.h/', '/')) +')' }"
        style="
                height:250px;
                background-size:100% auto;"
      ></div>
      <!-- 文字 -->
      <div class="con">
        <div class="title" style="font-size: 20px;font-weight: 600;">{{item.nm}}</div>
        <div
          class="creater"
          style="font-size: 16px;font-weight: 600;color: #f44336;"
        >
          {{item.star}}
        </div>
        <div
          class="creater"
          style="font-size: 16px;font-weight: 600;"
        >
          {{item.showInfo}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cinema',
  data() {
    return {
      movieList : [],
    }
  },
  mounted() {
    this.axios.get('/api/api/comingList?ci=10&token=&limit=20').then((res) => {
      console.log(res.data.coming)
      this.movieList = res.data.coming
    })
  },

  methods: {},
}
</script>

<style>
.container{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* background: #000; */
}
.card {
  /* background: #000; */
  /* border:1px red solid  ; */
  margin: 30px;
  height: 350px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
}
.img {
  /* height: 100px; */
  border-radius: 10px 10px 0 0;
}
.con {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: red; */
  border-radius: 0 0 10px 10px;
}
</style>
