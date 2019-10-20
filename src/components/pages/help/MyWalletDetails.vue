<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>提现大概多久到账?</nav>
      <section>
        <p>
          区块链资产转账分为提出—区块确认—入账三个步骤。
        </p>
        <p>
          1.提出：转账成功代表提币的平台进行了转账操作；
        </p>
        <p>
          2.区块确认：完成对应的区块确认。若当时区块发生拥堵、延迟等情况，会导致数字资产迟迟未完成完全确认；
        </p>
        <p>
          3.入账：完全确认后，平台即会尽快完成入账。
        </p>
        <p>
          若区块未完全确认，请你耐心等待，只有确认完毕，平台才能为你入账。
        </p>
        <p>
          若区块已完全确认，但个人账户却一直没有到账，请联系客服进行处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>提现失败是什么原因?</nav>
      <section>
        <p>
          请确认是否输入正确提币地址，及支付密码，如果无法查明具体失败原因，请联系客服进行处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>收益何时能进行提现?</nav>
      <section>
        <p>
          全天24小时皆可发起提币申请，可进入手机APP端选择【我的钱包】进行提现操作。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '3'">
      <nav>提现金额是否有限制?</nav>
      <section>
        <p>
          因数字资产转入转出需要支付矿工费用，所以将限制最小提币数量为10USDT。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '4'">
      <nav>每天提现次数限制是多少?</nav>
      <section>
        <p>
          没有限制。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '5'">
      <nav>如何绑定交易所?</nav>
      <section>
        <p>
          进入手机APP端进入【我的】界面。选择【绑定交易所】进行操作。
        </p>
      </section>
    </div>
  </div>
</template>

<script>
	export default {
		name: "introduceDetails",
    computed: {
			item: function(){
				let hs = window.location.hash;
				let pos = hs.indexOf('?');
				return hs.substr(pos).split('=')[1]
      }
    },
    methods: {
			goBack(){
				this.$router.push('/myWallet')
			},
    }
	}
</script>

<style scoped lang="less">
  .block{
    color: rgb(22,26,55);
    padding: 0 20px;

    header{
      height: 45px;
      display: flex;
      padding: 0 20px;
      align-items: center;
      margin: 0 -20px;
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
    nav{
      color: rgb(146,157,183);
      margin-top: 10px;
    }
    section p{
      margin-top: 20px;
    }

  }


</style>
