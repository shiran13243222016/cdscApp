<template>
  <div class="blcok">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>帮助中心</span>
    </header>
    <section>
      <group>
        <cell is-link title="格式化硬盘后收益会提高吗?" link="/helpDiskDetails?n=0"></cell>
      </group>
      <group>
        <cell is-link title="为什么硬盘无法识别?" link="/helpDiskDetails?n=1"></cell>
      </group>
      <group>
        <cell is-link title="同时挂载多个硬盘，如何进行选择或删除硬盘?" link="/helpDiskDetails?n=2"></cell>
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
  .blcok{
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

