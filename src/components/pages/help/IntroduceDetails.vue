<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>什么是云链?</nav>
      <section>
        <p>
          云链是一个去中心化的P2P数字资源分发和交易网络。将数字资源的生产者、消费者、存储者组成了一个分布式的，不依赖于任何单一个人或实体存在的，
          具有自我修复能力的网络；通过云链搭载的分片存储、按授权访问和点对点传输架构，将数字资源(影视、音乐、其它数字出版物)部署在云链上。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>云链盈利模式是什么?</nav>
      <section>
        <p>
          云链将用户贡献的带宽、存储资源打包成标的，通过云链撮合系统分别提供各大数字资源媒体流服务商。以提供CDN分布式存储及P2P数字传输技术支持。
        </p>
        <p>
          比如：将数字资源媒体流服务商旗下数字资源，以16K字节作为一个片段分布式存储在云链用户硬盘内，用户观赏数字资源时，将从云链上物理距离最近的多个节点同时下载，可以节省近60%的带宽。
          相比没有云链情况下，用户将耗费巨额流量，同时忍受着跨地域传输的网络延迟观赏数字资源。
        </p>
        <p>
          一方面数字资源媒体流服务商将节省带宽成本及服务器存储成本，另一方面节约数字资源媒体流服务商使用用户的使用成本,更利于留存用户。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>如何通过云链获得收益？</nav>
      <section>
        <p>
          已有设备，可前往云链github网址：<a href="https://github.com/CSDCFund/csdc">https://github.com/CSDCFund/csdc</a><br/>
          <span>将矿机设备配置成linux系统；安装云链挖矿软件安装包。</span>
        </p>
        <p>
          无设备情况下，可前往官方合作设备渠道淘宝店铺地址：<a href="https://shop68048034.taobao.com/">https://shop68048034.taobao.com/</a><br/>
          <span>自行购买已配置好代码包的设备。</span>
        </p>
        <p>
          将云链设备连接硬盘、宽带线，下载手机端APP，进入首页矿机管理，搜索我们刚刚配置好的矿机设备。在搜索矿机设备过程中，请确保矿机设备与云链手机端app在同一wifi网络内。
        </p>
        <p>
          云链设备工作环境下，将自动贡献带宽资源及存储资源。并将奖励发放至个人账户内。奖励额度将根据用户实际贡献的带宽流量进行结算。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '3'">
      <nav>手机无法接收到验证码?</nav>
      <section>
        <p>
          1、	核实手机是否安装了拦截软件；
        </p>
        <p>
          2、	更换时间段操作；
        </p>
        <p>
          3、	咨询运营商是否屏蔽了SP商短信下发接收端口；
        </p>
        <p>
          4、	如以上都未能解决，请记录“手机型号、版本、手机号码”，联系客服进行处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '4'">
      <nav>如何组装设备?</nav>
      <section>
        <p>
          1、	接通电源线将设备通过电源线接通电源。建议保持24小时在线；
        </p>
        <p>
          2、	连接硬盘使用性能较好的存储硬盘，将硬盘通过USB数据线连接设备；
        </p>
        <p>
          3、	连接宽带线根据贡献的实际流量进行结算；
        </p>
        <p>
          4、	下载手机端APP，搜索矿机请确保手机端APP、设备在同一Wi-Fi情况下进行搜索，并完成绑定。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '5'">
      <nav>收益计算公式是什么?</nav>
      <section>
        <p>
          <img src="../../../assets/img/formula.png" alt="formula">

        </p>
      </section>
    </div>
    <div class="content" v-if="item === '6'">
      <nav>登录账户如何注销?</nav>
      <section>
        <p>
          暂不支持注销个人账户；如想弃用该账号，可将设备先行解绑。另行绑定其他个人账户。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '7'">
      <nav>是否支持不同设备同时登录?</nav>
      <section>
        <p>
          暂不支持多台设备同时登录。
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
				this.$router.push('/introduce')
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
      img{
        width: 100%;
        height: 100%;
      }
    }

  }


</style>
