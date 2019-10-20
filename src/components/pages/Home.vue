<template>
  <div class="wrapper">
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>

    <tabbar>
      <tabbar-item link="/first" @on-item-click="firstClick">
        <img slot="icon" :src="firstSrc" alt="first">
        <span slot="label" :class="{'active':frLight}">首页</span>
      </tabbar-item>
      <tabbar-item link="/my" @on-item-click="myClick">
        <img slot="icon" :src="mySrc" alt="my">
        <span slot="label" :class="{'active':myLight}">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
	import { Tabbar,TabbarItem } from 'vux'
	export default {
		components: {
			Tabbar, TabbarItem,
		},
		data () {
			return {
				firstSrc: require('@/assets/img/firstlight.png'),
				mySrc: require('@/assets/img/myash.png'),
				frLight: '',
				myLight: ''
			}
		},
    created(){
			if(document.location.hash.indexOf("/my")>-1){
				this.myClick();
      }
			if(document.location.hash.indexOf('/first')>-1){
				this.firstClick();
			}
    },
		methods: {
			firstClick(){
				this.firstSrc = require('@/assets/img/firstlight.png');
				this.mySrc = require('@/assets/img/myash.png');
				this.frLight = true;
				this.myLight = false;
			},
			myClick(){
				this.mySrc = require('@/assets/img/mylight.png');
				this.firstSrc = require('@/assets/img/firstash.png');
				this.frLight = false;
				this.myLight = true;
			},
			goAddDevice(){
				this.$router.push({path:'/addDevice'});
			}
		}
	}
</script>

<style scoped lang="less">
  .active{
    color: #000;
  }
  div.weui-tabbar{
    position: fixed;
    bottom: 0;left: 0;right: 0;
  }
  .weui-tabbar img{
    width: 20px;height: 20px;
  }
  .weui-bar__item_on span{
    color: #000;
  }
</style>
