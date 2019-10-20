<template>
  <div class="detail">
    <vHead :msg="header_title"></vHead>
    <div class="detail_div">
      <p></p>
      <nav>
        <span></span>
        <div class="nav_content">
          <p><img src="@/assets/img/grand.png" alt="grand"><span>累计收益</span></p>
          <h2>{{deviceDetails.totalIncome+' USDT'}}</h2>

          <div class="left_content">
            <p>
              <span>编号: {{deviceCode}}</span>
            </p>
            <p>创建: <span>{{device_info.createDate | formatime}}</span></p>
          </div>
          <div class="right_content">
            <span>状态: </span>
            <span class="font-15" v-if="eswarm.state=='start'"><img src="@/assets/img/running.png">运行中</span>
            <span class="font-15" v-if="eswarm.state=='stop'"><img src="@/assets/img/stoping.png">已停止</span>
            <span class="font-15" v-if="eswarm.state=='init'">配置中...</span>
            <span v-if="!connected">失联</span>
          </div>
        </div>
      </nav>
    </div>
    <div class="tabbar">
      <button-tab v-model='curIndex' :height="40">
        <button-tab-item  class="vux-center"  v-for="(item, index) in list" :key="item" @on-item-click="onTab(index)">{{item}}</button-tab-item>
      </button-tab>
    </div>
    <section>
      <transition name="component-fade" mode="out-in">
        <component :key="curIndex" :is='names[curIndex]'></component>
      </transition>
    </section>
  </div>
</template>
<script>
	import vHead from '../common/Head'
	import {ButtonTab, ButtonTabItem} from 'vux'
	import Profit from '@/components/pages/Profit.vue';
	import Monitor from '@/components/pages/Monitor.vue';
	import Config from '@/components/pages/Config.vue';
	export default {
		name: "Detail",
		components: {
			ButtonTab, ButtonTabItem,Profit,Monitor,Config,vHead
		},
		data(){
			return {
				list:['收益','监控','配置'],
				names: [Profit, Monitor, Config],
				curIndex: 0,
				device_info: [],
        header_title: '设备详情',
        join: false
			}
		},
    computed: {
      eswarm(){
        return this.$store.state.gateway.eSwarm || {};
      },
      deviceCode() {
        if(this.device_info.minerDeviceId) {
          return this.device_info.minerDeviceId.slice(0,6);
        }
      },
      connected() {
        return this.$store.state.connected;
      },
			deviceDetails(){
      	return this.$store.state.deviceDetails;
      }
    },
		created(){
			this.curIndex = this.$route.query.curIndex || 0 ;
		},
    mounted() {
      this.getDeviceDetails();
      if (!this.$store.state.connected) {
        this.list = ['收益']
      }
    },
		methods: {
      onTab(index) {
        if (index != 0) {
          let res = this.isWifi();
          if (!res) {
            this.curIndex = 0
          }
        }
      },

      // 是否链接wifi
      isWifi(){
        const connection = navigator&&navigator.connection;
        if (connection.type != 'wifi') {
          this.$vux.alert.show({
            title: '提示',
            content: '当前非Wi-Fi环境，请先连接Wi-Fi!',
            onShow () {},
            onHide () {}
          });
          return false;
        }
        return true;
      },

			goBack(){
				this.$router.push('/')
			},

			// 获取设备详情
			getDeviceDetails() {
				let params = {
          id: this.$route.query.item.id
				};
				this.RestClient('GET_ONE', '/device/get', params).then((res) => {
					if(res.data.code == 200) {
						this.device_info = res.data.data;
            this.$store.commit("updateState",{deviceDetails: res.data.data});
					}
				})
			}
		}
	}
</script>

<style scoped>
  .detail{
    padding-top: 45px;
  }
  .detail_div{
    position: relative;
    height: 186px;
    background: rgb(22,26,55);
    z-index: -1;
  }
  .detail_div>p{
    width: 90%;
    background: rgb(229,238,232);
    margin: 0 auto;
    height: 40px;
    position: absolute;
    left: 5%;
    top: 0;
    border-radius: 20px;
  }
  .detail_div>nav{
    position: absolute;
    top: 13px;left: 0;right: 0;
    height: 173px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 30px 20px;
    box-sizing: border-box;
    background: rgb(255,196,0);
  }
  nav>span{
    width: 20%;
    height: 5px;
    background: #fff;
    border-radius: 3px;
    display: block;
    margin: 0 auto 5px;
  }
  .detail .tabbar{
    height: 60px;background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 15px;
  }
  .detail .vux-button-group{
    background: rgb(235,235,235);
    height: 40px;
    border-radius: 30px;
  }
   .detail .vux-button-group .vux-button-tab-item{
     color: rgba(10,36,99,0.3);
   }
  .vux-x-icon {
    fill: rgba(10,36,99,0.3);
  }
  .nav_content>p{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgb(160,129,31);
  }
  .nav_content>p img{
    display: inline-block;
    width: 15px;height: 15px;margin: 0 2px;
  }
  .nav_content h2{
    font-size: 25px;
    margin: 7px 0;
  }
  .nav_content .left_content{
    float: left;
    color: rgb(160,129,31);
  }
  .nav_content .left_content p {
    margin-bottom: 7px;
  }
  .nav_content .right_content{
    float: right;
    color: rgb(160,129,31);
  }

  .nav_content .right_content .font-15 {
    font-size: 15px;
  }
  .nav_content .right_content img{
    display: inline-block;
    width: 15px;
    height: 18px;
    margin: 0 3px;
  }
  .detail section{
    box-sizing: border-box;
    padding: 0 20px;
  }
  .vux-button-group > a.vux-button-tab-item-first:after,.vux-button-group > a.vux-button-tab-item-middle:after,.vux-button-group > a.vux-button-tab-item-last:after{
    border: 0 none;
  }
  .vux-button-group > a{
    border-radius: 30px;
    background: rgb(235,235,235);
  }
  .vux-button-group > a.vux-button-group-current{
    background: rgb(255,196,0);
  }
  section>>>.vux-slider,.vux-slider>>>.vux-swiper{
    /*height: 100% !important;*/
    /*overflow-y: auto;*/
  }
  .detail h3, .detail h4{
    color:rgba(10,36,99,0.3);
    font-size: 14px;
    margin-top: 10px;
  }
  .component-fade-enter-active, .component-fade-leave-active{
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to{
    opacity: 0;
  }
</style>
