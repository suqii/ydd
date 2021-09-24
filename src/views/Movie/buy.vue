<template>
  <div class="cinema_body">
    
  </div>
</template>

<script>
export default {
  name: 'Buy',
  data() {
    return {
      cinemaList: [],
      isLoading: true,
      prevCityId: -1,
    }
  },
  props: ['movieId'],
}
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .nm {
  
  /* border: 1px red solid; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cinema_body .q {
  font-size: 11px;
  color: #7219d6;
  
  /* text-align: right; */
}
.cinema_body .price {
  font-size: 18px;
  
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
.cinema_body .cardPromotionTag {
  /* border: 1px solid #589daf; */
  margin-top:-1em ;
  margin-bottom: 1.3em;
  /* font-weight: inherit; */
  color: gray;
  font-size: small;
}
.cinema_body .cardPromotionTag .ka{
  border: 1px solid #589daf;
  color: white;
  padding:0 0.2em;
  /* font-size: 0.01em; */
  font-weight: lighter;
  background: #589daf;
  border-radius: 10%;
  
}
.cinema_body .showTimes {
  /* border: 1px solid #589daf; */
  margin-top:-1em ;
  /* font-weight: inherit; */
  color: gray;
  font-size: small;
}
</style>
