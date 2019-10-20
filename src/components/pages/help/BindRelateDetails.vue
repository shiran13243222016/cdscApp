<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>详情</span>
    </header>
    <div class="content" v-if="item === '0'">
      <nav>如何关联云链设备?</nav>
      <section>
        <p>
          进入手机APP端首页，确保手机APP端与终端设备在同一WI-FI网络下。

        </p>
        <p>
          点击右上角【+】-【添加】勾选设备进行添加。（目前仅允许单次添加一台设备。后续版本迭代将增加批量添加、分组功能）
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '1'">
      <nav>【添加】按钮无法点击?</nav>
      <section>
        <p>存在原因：</p>
        <p>
          1、手机APP端与终端设备不在同一WI-FI网络下；
        </p>
        <p>
          2、添加设备加载中，等待加载即可。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '2'">
      <nav>如何批量添加设备?</nav>
      <section>
        <p>
          目前仅允许单次添加一台设备。后续版本迭代将增加批量添加、分组功能。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '3'">
      <nav>一个账号最多可关联几台终端设备?</nav>
      <section>
        <p>
          目前一个账号支持绑定1万台云链设备。一台云链设备仅支持被一个账号绑定。
        </p>
      </section>
    </div>
    <div class="content" v-if="item === '4'">
      <nav>如何解绑设备?</nav>
      <section>
        <p>
          进入手机APP端首页，向左滑动需解绑设备，出现【删除】，点击【删除】完成设备解绑操作。
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
				this.$router.push('/bindRelate')
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
