<template>
  <div class="block">
    <header class="vux-1px-b">
      <span @click="goBack" class="arrow">←</span><span>介绍与注册</span>
    </header>
    <section>
      <group>
        <cell is-link title="什么是云链?" link="/IntroduceDetails?n=0"></cell>
      </group>
      <group>
        <cell is-link title="云链盈利模式是什么?" link="/IntroduceDetails?n=1"></cell>
      </group>
      <group>
        <cell is-link title="如何通过云链获得收益?" link="/IntroduceDetails?n=2"></cell>
      </group>
      <group>
        <cell is-link title="手机无法接收到验证码?" link="/IntroduceDetails?n=3"></cell>
      </group>
      <group>
        <cell is-link title="如何组装设备?" link="/IntroduceDetails?n=4"></cell>
      </group>
      <group>
        <cell is-link title="收益计算公式是什么?" link="/IntroduceDetails?n=5"></cell>
      </group>
      <group>
        <cell is-link title="登录账号如何注销?" link="/IntroduceDetails?n=6"></cell>
      </group>
      <group>
        <cell is-link title="是否支持不同设备同时登录?" link="/IntroduceDetails?n=7"></cell>
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
    height: 100%;
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

