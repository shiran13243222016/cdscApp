<template>
  <div class="help">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>帮助中心</span>
    </header>
    <section>
      <group>
        <cell is-link title="介绍与注册" link="/introduce"></cell>
      </group>
      <group>
        <cell is-link title="绑定与关联" link="/bindRelate"></cell>
      </group>
      <group>
        <cell is-link title="收益" link="/helpProfit"></cell>
      </group>
      <group>
        <cell is-link title="设备信息" link="/deviceInfo"></cell>
      </group>
      <group>
        <cell is-link title="我的钱包" link="/myWallet"></cell>
      </group>
      <group>
        <cell is-link title="硬件设备" link="/hardDevice"></cell>
      </group>
      <group>
        <cell is-link title="网络带宽" link="/netHard"></cell>
      </group>
      <group>
        <cell is-link title="硬盘" link="/helpDisk"></cell>
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
        this.$router.push('/my')
			},
    }
	}
</script>

<style scoped>
  .help{
    height: 100%;
    color: rgb(22,26,55);

  }
  header{
    height: 47px;
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
