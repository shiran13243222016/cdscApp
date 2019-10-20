<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>缓存写入的方式有哪几种?</nav>
      <section>
        <p>
          缓存写入有两种方式（预占后写和直接写入），请耐心等待时机缓存上涨，收益会逐渐提高至平稳阶段。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>缓存系统会自动删除吗?</nav>
      <section>
        <p>
          缓存资源由系统调度分配，会根据资源的冷热门程度进行调整。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>我的硬盘会不会存在内存空间被用完的情况?</nav>
      <section>
        <p>
          在云链设备代码程序内有自动部署、自动删除缓存的功能，最大存储空间值默认为硬盘总容量的90%。
        </p>
        <p>
          磁盘在写满后，会严重降速，尤其是SSD硬盘，从而跑不起来流量。系统会预留10%的磁盘空间，以免磁盘写满降速，若磁盘长期处于写满状态，属于设备异常，可联系客服反馈处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '3'">
      <nav>云链设备是否需要外挂硬盘?</nav>
      <section>
        <p>
          我们已经将硬盘组装进云链设备内，无需再外挂其他硬盘。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '4'">
      <nav>云链设备的功耗是多少?</nav>
      <section>
        <p>
          100M带宽类型云链设备功耗为25W,200M带宽类型云链设备功耗为30W。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '5'">
      <nav>路由器的选择对收益有影响吗?</nav>
      <section>
        <p>
          通过技术人员测试，软路由和部分路由器的系统可能会对数据包有限制、或者是PPS能力不足，导致跑不起量的现象。若存在跑不起量的情况，建议通过以下方式进行排查：
        </p>
        <p>
          1、在路由器上开启UPNP；
        </p>
        <p>
          2、与正常跑量的设备互换网络尝试观察一段时间；
        </p>
        <p>
          3、若使用软路由，可以更换硬路由尝试；
        </p>
        <p>
          4、以上排查无效，可以检测路由器是否有特殊设置，比如限制UDP数据包、数据转发能力（PPS）等，一些路由器的每秒转发数据包能力很差，会导致跑不起量，可以更换路由器尝试；
        </p>
        <p>
          5、合理分配带宽与设备。规避带宽资源互抢情况发生。
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
				this.$router.push('/hardDevice');
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
