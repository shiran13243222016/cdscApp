<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>设备未跑满上行带宽正常吗?</nav>
      <section>
        <p>
          磁盘中的业务文件是系统随机部署的，跑量高低受到文件热度的影响，可能会出现偶尔跑低、偶尔跑高的情况。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>为什么有一段时间没有流量?</nav>
      <section>
        <p>
          目前云链流量调度策略尚不够成熟，会存在小部分设备流量分配不合理的现象。我们会持续不断优化调度策略，把流量使用情况分布更为均衡。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>网络的 NAT 类型是什么意思?</nav>
      <section>
        <p>
          当在专用网内部的一些主机本来已经分配到了本地IP地址（即仅在本专用网内使用的专用地址），但现在又想和因特网上的主机通讯时，可使用NAT方法，以下为跑量排名：
        </p>
        <p>
          【公网】
        </p>
        <p>
          【全锥NAT】
        </p>
        <p>
          【IP限制NAT】
        </p>
        <p>
          【端口限制NAT】
        </p>
        <p>
          【对称性NAT】
        </p>
        <p>
          按是否有利于跑量，排名依次为1>2>3>4>5，可联系运营商查询网络的NAT类型，尝试修改排名更为靠前的NAT类型。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '3'">
      <nav>如何获取公网IP?</nav>
      <section>
        <p>
          很多用户不能跑慢流量，在这种情况下宝盒的网络是被限制的，主要的原因是由于运营商没有分配公网IP给用户，大家可以通过以下步聚去改变NAT类型。
        </p>
        <p>
          1、确定自己的宽带IP是不是公网IP，因宽带运营商的IP资源有限，所以给很多用户分配的不是独立的公网IP，而是通过服务器中转的共享IP，这样就会对云链设备有限制，所以当发现NAT类型非0时，要电话联系宽带客服要求他们把宽带IP改为公网IP；
        </p>
        <p>
          中国电信宽带客服电话：10000
        </p>
        <p>
          中国移动宽带客服电话：10086
        </p>
        <p>
          中国联通宽带客服电话：10010
        </p>
        <p>
          2，宽带运营商若已经答复修改成了公网IP后，重启光猫及路由，进入光猫和路由打开UPNP.无需设置DMZ，已设置的请清除；
        </p>
        <p>
          3，重启云链设备，再查看系统检测确认NAT类型是否变为0。
          还可以通过http://www.ipip.net/ip.html这个网站查询自己的IP是不是公网IP，如果IP是100.开头的侧说明是共享IP。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '4'">
      <nav>同一IP下是否可以接入多台云链设备?</nav>
      <section>
        <p>
          同IP地址下挂多台设备，会出现带宽资源互抢的情况，建议合理分配带宽资源。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '5'">
      <nav>如何手动配置端口?</nav>
      <section>
        <p>
          暂不支持, 下一个版本更新将增加手动配置端口功能，下个版本可进行以下操作：
        </p>
        <p>
          进入手机APP端首页，选择查看的设备，进入设备详情页，点击【配置】-【端口】，手动配置端口。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '6'">
      <nav>设备连不上应该怎么处理?</nav>
      <section>
        <p>
          问题一：路由器长时间待机情况下，会丢失”组拨数据包“，这种情况下，需要重启路由器，加载”组拨“数据
        </p>
        <p>
          问题二：有些路由器天然缺失“组拨”功能，需要更换路由器。
        </p>
        <p>
          问题三：云链设备接入过程中，需要等待5～10分钟，进行初始化匹配。
        </p>
        <p>
          建议收到设备进行以下操作：
          1、重启路由器
          2、接入电源线、网线
          3、打开手机APP，搜索云链设备，等待5～10分钟。
          4、若仍无法搜索成功，更换路由器重新进行以上操作。
          5、如以上皆为正常状态，仍然出现连不上设备情况请联系客服进行处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '7'">
      <nav>路由器等监控统计的流量与云链统计的流量为何有差异?</nav>
      <section>
        <p>
          云链的流量统计是根据实际的云计算业务流量情况而定的，和用户自己通过路由器或者其他上层网络设备所作的网卡流量统计存在一定差距。例如：
        </p>
        <p>
          无效流量：由于网络传输协议的不可靠性，存在部分因数据重传、广播发现等机制而产生的无法被业务使用的流量；
        </p>
        <p>
          其他流量：用户在使用其他网络应用的过程产生的和云链业务无关的流量，也不会被统计在内。
        </p>
        <p>
          因此，业务流量和网卡流量存在一定的差值，但具体的大小根据每个用户的网络环境有所差异，需要进一步测试才能确定，如对此有疑问，可联系客服反馈情况，我们将对接技术来进行处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '8'">
      <nav>使用云链会影响家庭网络吗?</nav>
      <section>
        <p>
          一般家庭网主要用到的是下行带宽，而云链多数情况下使用的是上行带宽，可以结合个人用网需求进行购买。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '9'">
      <nav>使用云链对环境/网络/设备有要求吗?</nav>
      <section>
        <p>
          云链使用没有门槛，但是由于奖励额度是根据用户实际贡献的流量质量进行结算的，会因为运营商、在线时长等因素而波动，因此推荐用户使用电信、联通、移动30M及以上的上行带宽，同时使用该宽带类型推荐设备保持每日在线24小时。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '10'">
      <nav>如何合理分配带宽资源，路由器或设备应该怎么设置?</nav>
      <section>
        <p>
          按照自身带宽类型使用该带宽类型推荐的云链设备。
        </p>
      </section>
    </div>
  </div>
</template>

<script>
	export default {
		name: "netHardDetails",
    computed: {
			item: function(){
				let hs = window.location.hash;
				let pos = hs.indexOf('?');
				return hs.substr(pos).split('=')[1]
      }
    },
    methods: {
			goBack(){
				this.$router.push('/netHard');
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
