<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>帮助中心</span>
    </header>
    <section>
      <group>
        <cell is-link title="同一环境下，相同的设备和硬盘，为何收益不同?" link="/HelpProfitDetails?n=0"></cell>
      </group>
      <group>
        <cell is-link title="为什么前期会出现零收益或低收益的情况?" link="/HelpProfitDetails?n=1"></cell>
      </group>
      <group>
        <cell is-link title="收益与那些因素有关?" link="/HelpProfitDetails?n=2"></cell>
      </group>
      <group>
        <cell is-link title="收益将如何更新?" link="/HelpProfitDetails?n=3"></cell>
      </group>
      <group>
        <cell is-link title="如何查看已发放和未发放收益?" link="/HelpProfitDetails?n=4"></cell>
      </group>
      <group>
        <cell is-link title="如何将收益转出?" link="/HelpProfitDetails?n=5"></cell>
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
				this.$router.push('/help');
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

