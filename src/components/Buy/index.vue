<template>
    <div class="cinema_body">
        {{movieId}}
    </div>
</template>

<script>
export default {
    name : 'Buy',
    data(){
        return {
            cinemaList : [],
            isLoading : true,
            prevCityId : -1
        };
    },
    props: ['movieId'],
   
}
    

</script>

<style scoped>

</style>
