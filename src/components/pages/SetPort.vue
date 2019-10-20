<template>
  <div class="block">
    <header>
      <span @click="goBack" class="arrow">←</span><span>端口</span>
    </header>
    <div class="back">
      <div class="back_box"></div>
    </div>
    <div class="content">
      <span></span>
      <p>外网IP仅在路由器未开通UPNP时才需手动设置，如没有外网ip，即使设置也不会增加收益。</p>
      <div class="port">
        <label for="port">端口设置</label>
        <input id="port" placeholder="请输入">
      </div>
      <div class="submit">确定</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "SetPort",
    methods: {
			goBack(){
				this.$router.push({path:'/detail',query:{curIndex:2}})
			},
    }
	}
</script>

<style scoped lang="less">
  .block{
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
      background: #161A37;
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
  .content{
    margin-top: -88px;
    background: rgb(245,246,246);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: 10px 20px 40px;
    display: flex;
    flex-direction: column;

    p{
      background: rgb(246,228,204);
      padding: 10px;border-radius: 5px;
      text-align: center;margin-bottom: 20px;
    }
    span{
      margin: 0 auto 20px;border-radius: 3px;
      display: block;
      width: 15%;height: 5px;
      background: rgb(229,229,229);
    }
    .port{
      background: #fff;
      height: 60px;line-height: 60px;
      margin: 0 -20px;padding: 0 20px;
      display: flex;justify-content: space-between;
      input{
        border: 0 none;
      }
    }
    .submit{
      color: #fff;
      background-color: rgb(255,196,0);
      height: 50px;
      border-radius: 4px;
      text-align: center;
      line-height: 50px;
      position: fixed;
      bottom: 20px;
      right: 20px;
      left: 20px;
    }
  }
</style>
