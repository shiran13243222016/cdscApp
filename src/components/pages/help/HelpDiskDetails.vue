<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>格式化硬盘后收益会提高吗?</nav>
      <section>
        <p>
          格式化硬盘收益上涨属于小部分设备，大部分设备由于损失缓存文件，存在收益不稳定且波动大的现象。经技术测试分析，格式化硬盘后，小部分设备收益上涨原因如下：
        </p>
        <p>
          1、业务文件随机部署的概率性问题
        </p>
        <p>
          由于磁盘中的业务文件是系统随机部署的，跑量高低受到文件热度的影响，因此会出现偶尔跑低、偶尔跑高的情况。
        </p>
        <p>
          2、	磁盘读写性能差
        </p>
        <p>
          由于磁盘读写性能差，在缓存逐渐增加以后，由于读写的频繁增加，IO利用率也逐步提高，相对应的会暴露出读写性能差的弊端，会过度消耗系统资源，从而导致跑量降低。而在格式化硬盘以后，会短暂的释放部分IO资源，因为调度快速响应IO优的设备，跑量会暂时性提高。随着缓存逐渐增加，依然会出现IO跑高的现象。格式化磁盘对磁盘本身也是一种消耗，建议结合个人情况，更换读写性能更好、品质优良的磁盘使用。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>为什么硬盘无法识别?</nav>
      <section>
        <p>
          情况一：外接多个硬盘
        </p>
        <p>
          两个USB接口提供给外接硬盘的电流输出总和为3A，可以满足大多数的两个硬盘同时使用。如果同时使用两个硬盘无法识别，请先拔下其中一个硬盘查看是否可以识别，两个硬盘中的任意一个都可以识别，那可能就是由于输出电流过高造成的无法识别。
        </p>
        <p>
          情况二：外接单个硬盘
        </p>
        <p>
          1、请确认硬盘在电脑上可以使用；
        </p>
        <p>
          2、请确保硬盘电流输出要求小于3A与云链连线正常；
        </p>
        <p>
          3、确保硬盘的文件系统上NTFS、EXT4或者MAC的HFS+中的一种；
        </p>
        <p>
          4、更换USB接口尝试，如果可以正常识别，说明原先的USB接口可能存在硬件故障；
        </p>
        <p>
          5、更换其他硬盘尝试，如果其他硬盘可以识别，说明愿硬盘可能存在异常需要修复，可以百度HDTunePro、DiskGenius等开源软件尝试修复，必要时可以考虑格式化硬盘，格式化请先备份硬盘中的重要数据。如以上方法均无法解决，可以联系客服进行处理。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>同时挂载多个硬盘，如何进行选择或删除硬盘?</nav>
      <section>
        <p>
          进入手机APP端首页，选择查看的设备，进入设备详情页，点击【配置】-【硬盘】，选择挂载硬盘。亦可进行对硬盘格式化操作。
        </p>
      </section>
    </div>
  </div>
</template>

<script>
	export default {
		name: "helpDiskDetails",
    computed: {
			item: function(){
				let hs = window.location.hash;
				let pos = hs.indexOf('?');
				return hs.substr(pos).split('=')[1]
      }
    },
    methods: {
			goBack(){
				this.$router.push('/helpDisk');
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
