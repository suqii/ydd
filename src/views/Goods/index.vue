<template>
    <div id="main">
      goods jhhj
      
      {{tableData}}
      {{tableData[0].productId}}
    </div>
</template>

<script>

export default {
    name : 'goodss',
    data(){
        return {
            tableData : [],
            
        }
    },
    mounted(){
        this.axios.get('/api2/goods/goodsList').then((res)=>{
           var status = res.data.status;
           if(status === 0){
               this.tableData = res.data.data.goodsList;
           }
        });
    },
}
</script>

<style>

</style>
