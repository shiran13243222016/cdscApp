<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>帮助中心</span>
    </header>
    <section>
      <group>
        <cell is-link title="设备未跑满上行带宽正常吗?" link="/netHardDetails?n=0"></cell>
      </group>
      <group>
        <cell is-link title="为什么有一段时间没有流量?" link="/netHardDetails?n=1"></cell>
      </group>
      <group>
        <cell is-link title="网络的 NAT 类型是什么意思?" link="/netHardDetails?n=2"></cell>
      </group>
      <group>
        <cell is-link title="如何获取公网IP?" link="/netHardDetails?n=3"></cell>
      </group>
      <group>
        <cell is-link title="同一IP下是否可以接入多台云链设备?" link="/netHardDetails?n=4"></cell>
      </group>
      <group>
        <cell is-link title="如何手动配置端口?" link="/netHardDetails?n=5"></cell>
      </group>
      <group>
        <cell is-link title="设备连不上应该怎么处理?" link="/netHardDetails?n=6"></cell>
      </group>
      <group>
        <cell is-link title="路由器等监控统计的流量与云链统计的流量为何有差异?" link="/netHardDetails?n=7"></cell>
      </group>
      <group>
        <cell is-link title="使用云链会影响家庭网络吗?" link="/netHardDetails?n=8"></cell>
      </group>
      <group>
        <cell is-link title="使用云链对环境/网络/设备有要求吗?" link="/netHardDetails?n=9"></cell>
      </group>
      <group>
        <cell is-link title="如何合理分配带宽资源，路由器或设备应该怎么设置?" link="/netHardDetails?n=10"></cell>
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

