<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>帮助中心</span>
    </header>
    <section>
      <group>
        <cell is-link title="缓存写入的方式有哪几种?" link="/hardDeviceDetails?n=0"></cell>
      </group>
      <group>
        <cell is-link title="缓存系统会自动删除吗?" link="/hardDeviceDetails?n=1"></cell>
      </group>
      <group>
        <cell is-link title="我的硬盘会不会存在内存空间被用完的情况?" link="/hardDeviceDetails?n=2"></cell>
      </group>
      <group>
        <cell is-link title="云链设备是否需要外挂硬盘?" link="/hardDeviceDetails?n=3"></cell>
      </group>
      <group>
        <cell is-link title="云链设备的功耗是多少?" link="/hardDeviceDetails?n=4"></cell>
      </group>
      <group>
        <cell is-link title="路由器的选择对收益有影响吗?" link="/hardDeviceDetails?n=5"></cell>
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

