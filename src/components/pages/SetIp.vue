<template>
  <div class="block">
    <header>
      <span @click="goBack" class="arrow">←</span><span>外网ip及端口</span>
    </header>

    <div class="back">
      <div class="back_box"></div>
    </div>
    <div class="content">
      <p class="title">外网IP仅在路由器未开通UPNP时才需手动设置，如
        没有外网ip，即使设置也不会增加收益。</p>
<!--      <group>-->
<!--        <x-switch title="switch" v-model="value"></x-switch>-->
<!--      </group>-->
    </div>
  </div>
</template>

<script>
  import { InlineXSwitch ,XSwitch, Group } from 'vux'
  export default {
    components: {
      InlineXSwitch, XSwitch, Group
    },
    data() {
      return {
        value: false
      }
    },
    methods: {
      goBack() {
        this.$router.push({
          path:'/detail',
          query:{
            curIndex: 2 ,
            id: this.$route.query.id
          }
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  .block {
    padding-top: 45px;
    header{
      color: #fff;
      height: 45px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      padding: 0 20px;
      background: #000;
      align-items: center;

      .arrow{
        font-weight: bolder;
        font-size: 24px;
        margin-top: -5px;
      }
      span {
        font-size: 17px;
        margin-right: 14px;
      }
    }
    .back {
      height: 100px;
      background: #000;
      position: relative;
      z-index: -1;
      .back_box {
        width: 90%;
        background: #cccccc;
        margin: 0 auto;
        height: 40px;
        position: absolute;
        left: 5%;
        top: 0;
        border-radius: 20px;
      }
    }
    .content {
      min-height: 580px;
      box-sizing: border-box;
      padding: 15px;
      margin-top: -88px;
      border-radius: 20px;
      background: rgb(244,245,245);
      .active{
        border: 1px solid rgb(255,193,22) !important;
      }
      .title {
        background: rgb(245,226,200);
        padding: 10px;
        border-radius: 6px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .card_item {
        padding: 10px 10px;
        background: #fff;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
