<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>同一环境下，相同的设备和硬盘，为何收益不同?</nav>
      <section>
        <p>
          同一网络环境下，导致收益不同的因素有以下原因：
        </p>
        <p>
          1、在同一带宽下，网络出口之间会存在带宽资源互抢的情况；
        </p>
        <p>
          2、系统缓存数据和访问数据的随机性，还有调度策略的不均衡都会影响收益不同。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>为什么前期会出现零收益或低收益的情况?</nav>
      <section>
        <p>
          新上线设备或更换设备，在初期会有2～5天的缓存部署期，待缓存部署完成后，贡献的上行流量会逐渐提高，收益也会逐渐提高至平稳阶段。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>收益与那些因素有关?</nav>
      <section>
        <p>
          收益与实际贡献的上行流量正相关，上行最低流量与上行带宽（运营商网络波动，特别是晚高峰）、磁盘容量和性能（同型号性能有差异）、UPNP是否打开、NAT类型、缓存大小（与下行网络、磁盘容量自量相关）等相关，如遇到异常情况，可联系客服处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '3'">
      <nav>收益将如何更新?</nav>
      <section>
        <p>
          每天北京时间早上12:00点更新前一天0点到24点的收益。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '4'">
      <nav>如何查看已发放和未发放收益?</nav>
      <section>
        <p>
          进入手机APP端首页，即可查看余额及昨日收益，可点击【我的钱包】查看详细资产变更情况。如需查看单个设备收益，可点击该设备，进入设备详情页，查看该设备每日收益详情。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '5'">
      <nav>如何将收益转出?</nav>
      <section>
        <p>
          进入手机APP端选择【我的钱包】发起提币申请，将获得的USDT提现至交易所挂单卖出。
        </p>
        <p>
          注：请先绑定交易所，再发起提币申请。
        </p>
      </section>
    </div>
  </div>
</template>

<script>
	export default {
		name: "bindReletaDetails",
		computed: {
			item: function(){
				let hs = window.location.hash;
				let pos = hs.indexOf('?');
				return hs.substr(pos).split('=')[1]
			}
		},
		methods: {
			goBack(){
				this.$router.push('/helpProfit');
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
