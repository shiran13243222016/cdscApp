<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>帮助中心</span>
    </header>
    <section>
      <group>
        <cell is-link title="如何关联云链设备?" link="/BindRelateDetails?n=0"></cell>
      </group>
      <group>
        <cell is-link title="【添加】按钮无法点击?" link="/BindRelateDetails?n=1"></cell>
      </group>
      <group>
        <cell is-link title="如何批量添加设备?" link="/BindRelateDetails?n=2"></cell>
      </group>
      <group>
        <cell is-link title="一个账号最多可关联几台终端设备?" link="/BindRelateDetails?n=3"></cell>
      </group>
      <group>
        <cell is-link title="如何解绑设备?" link="/BindRelateDetails?n=4"></cell>
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

