<template>
  <div class="container">
    
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

  methods: {
   
  },
}
</script>

<style>

</style>
