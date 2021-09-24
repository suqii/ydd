<template>
    <div class="messageBox">
      
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div class="buttons">
            <div class="button" v-if="cancel" @click="handleCancel">{{ cancel }}</div>
            <div class="button button-primary" v-if="ok" @click="handleOk">{{ ok }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'MessageBox'
}
</script>

<style scoped>
    .messageBox {
        width: 200px;
        /* height: 120px; */
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0 0.4px 3.6px rgba(0, 0, 0, 0.004),
          0 1px 8.5px rgba(0, 0, 0, 0.01), 0 1.9px 15.7px rgba(0, 0, 0, 0.019),
          0 3.4px 28.2px rgba(0, 0, 0, 0.03),
          0 6.3px 54.4px rgba(0, 0, 0, 0.047), 0 15px 137px rgba(0, 0, 0, 0.07);
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -60px 0 0 -100px;
        padding: 15px 10px;
        z-index: 99999;
      }
      .messageBox h2 {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
      }
      .messageBox p {
        text-align: center;
        line-height: 40px;
      }

      .buttons {
        display: flex;
        /* margin-top: 8px; */
        justify-content: center;
        align-items: center;
        width: 100%;
        /* border: 1px red solid; */
      }
      .button {
        align-items: center;
        background: #edf1f7;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        height: 50px;
        justify-content: center;
        margin: 10px 10px 10px 10px;
        width: 100%;
      }

      .button-primary {
        background-color: #0060f6;
        color: #fff;
      }
</style>
