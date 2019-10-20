<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>帮助中心</span>
    </header>
    <section>
      <group>
        <cell is-link title="提现大概多久到账?" link="/myWalletDetails?n=0"></cell>
      </group>
      <group>
        <cell is-link title="提现失败是什么原因?" link="/myWalletDetails?n=1"></cell>
      </group>
      <group>
        <cell is-link title="收益何时能进行提现?" link="/myWalletDetails?n=2"></cell>
      </group>
      <group>
        <cell is-link title="提现金额是否有限制?" link="/myWalletDetails?n=3"></cell>
      </group>
      <group>
        <cell is-link title="每天提现次数限制是多少?" link="/myWalletDetails?n=4"></cell>
      </group>
      <group>
        <cell is-link title="如何绑定交易所?" link="/myWalletDetails?n=5"></cell>
      </group>
    </section>
  </div>
</template>

<script>
	import { Group, Cell } from 'vux'
	export default {
		name: "Help",
		components: {
			Cell,Group
		},
		methods: {
			goBack(){
				this.$router.push('/help')
			},
		}
	}
</script>

<style scoped>
  .block{
    color: rgb(22,26,55);

  }
  header{
    height: 45px;
    display: flex;
    padding: 0 20px;
    align-items: center;
  }
  header .arrow{
    font-weight: bolder;
    font-size: 24px;
    margin-top: -5px;
  }
  header>span {
    font-size: 17px;
    margin-right: 14px;
  }
  section{
    font-size: 12px;
  }
  >>>.weui-cells{
    margin: 0;font-size: 14px;
  }
  >>>.weui-cell{
    padding: 20px 15px;
  }
  >>>.weui-cells:before{
    border-top: 0 none;
  }
</style>

