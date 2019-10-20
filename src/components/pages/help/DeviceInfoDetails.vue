<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>如何修改设备备注?</nav>
      <section>
        <p>
          暂不支持，下一个版本更新将增加修改设备备注功能，下个版本可进行以下操作：
        </p>
        <p>
          进入手机APP端首页，选择需要更改备注的设备，进入设备详情页，点击右上角按钮，完成更改备注操作。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>如何查看设备带宽状态?</nav>
      <section>
        <p>
          进入手机APP端首页，选择查看的设备，进入设备详情页，选择【监控】可查看以下参数：【PING值】、【IP地址】、【归属地】。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>如何查看硬盘使用状态?</nav>
      <section>
        <p>
          进入手机APP端首页，选择查看的设备，进入设备详情页，选择【监控】可查看以下参数：【内存总量】、【CPU使用率】、【硬盘总量】。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '3'">
      <nav>如何配置设备IP?</nav>
      <section>
        <p>
          暂不支持,下一个版本更新将增加配置设备IP功能。
        </p>
        <p>
          下一个版本可进行以下操作:
        </p>
        <p>
          进入手机APP端首页，选择查看的设备，进入设备详情页，选择【配置】，选择【外网IP】勾选自动获取外网IP，如需自己设置相关参数，可取消勾选，手动填写。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '4'">
      <nav>KeyStore是什么?为什么要备份KeyStore?</nav>
      <section>
        <p>
          Keystore 文件是以太坊钱包存储私钥的一种文件格式 (JSON)。它使用用户自定义密码加密，以起到一定程度上的保护作用，而保护的程度取决于用户加密该钱包的密码强度，如果类似于 123456 这样的密码，是极为不安全的。
        </p>
        <p>
          1、一定要备份好Keystore，一旦忘记Keystore，那么就失去了 Keystore 的使用权，并且云链无法帮你找回Keystore。所以一定要妥善备份好 Keystore 。
        </p>
        <p>
          2、Keystore 是唯一提取收益的凭证。所以不要透露给其他人。如果Keystore被他人获得，可以生成新的Keystore。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '5'">
      <nav>最多可建多少个分组?每个分组最多多少台设备?</nav>
      <section>
        <p>
          暂不支持，下一个版本更新将增加分组功能。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '6'">
      <nav>如何将设备从一个分组移动至另一个分组?</nav>
      <section>
        <p>
          暂不支持。下一个版本更新将上线此功能板块。
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
				this.$router.push('/deviceInfo')
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
