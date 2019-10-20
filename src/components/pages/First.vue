<template>
  <div class="block">
    <vheader></vheader>
    <div class="first_nav">
      <p></p>
      <div class="first_title">
        <div class="first_balance">
          <h5>余额&nbsp;&nbsp;USDT</h5>
          <h2>{{walletinfo.balance?walletinfo.balance:0 | toThousands}}</h2>
        </div>
        <div class="first_profit">
          <h5>昨日收益&nbsp;&nbsp;USDT</h5>
          <h3>{{walletinfo.yesterdayIncome | toThousands}}</h3>
        </div>
      </div>
    </div>
    <div class="wrapper_list" v-if='list.length'>
      <ul class="first_list">
        <li v-for="item in list" :key="item.id">
          <swipeout>
            <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
              <div slot="right-menu">
                <!--<swipeout-button @click.native="onButtonClick('fav')" type="primary">编辑</swipeout-button>-->
                <swipeout-button @click.native="delDevice(item)" type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="demo-content" @click="goDetail(item)">
                <div class="list_left">
                  <img src="../../assets/img/manage.png" alt="云链">
                  <span>{{item.minerDeviceId.slice(0,6)}}</span>
                </div>
                <div class="list_right">
                  <h4>{{item.localIp}}</h4>
                  <x-icon type="ios-arrow-right" size="22"></x-icon>
                </div>
              </div>
            </swipeout-item>
          </swipeout>
        </li>
      </ul>
    </div>
    <div class="empty" v-else>
      <img src="../../assets/img/empty.png">
      <p>暂无添加设备</p>
    </div>
  </div>
</template>
<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  import _ from 'lodash'
  import P from 'bluebird'
  import vheader from '../common/Header'
  import udp from '../../lib/udpSocketClient'
	export default {
		name: "First",
    components: {
		  vheader,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    data(){
      return {
        list: [],
        yesterday_income: 0,
        totalIncome: 0,
        dialog: true,
        walletinfo: {
          balance: 0,
          commision: 0,
          transfered: 0,
					yesterdayIncome: 0
        }
      }
    },
    created(){
      if (window.navigator.onLine == false) {
        this.$vux.toast.text('网络似乎出现问题～请检查网络', 'middle')
      }
      this.getDevice();
      this.getinfo();
    },
    computed: {
      config(){
        return this.$store.state.gateway.eSwarm.config || {};
      }
    },
    methods: {

		  // 是否链接wifi
      isWifi(){
        const connection = navigator&&navigator.connection;
        if (connection.type !== 'wifi') {
					this.$vux.alert.show({
						title: '提示',
						content: '当前网络环境不是Wi-Fi,请连接Wi-Fi以便搜索到相关的主机设备!',
						onShow () {},
						onHide () {}
					});
					return false;
        }
        return true;
      },

      goDetail(item) {
        this.$vux.loading.show({
          text: 'Loading'
        });
        udp.findMine({cmd: "findMiner"}, 60009, 800).then((foundObj) => {

          if (foundObj[item.minerDeviceId] && item.localIp != foundObj[item.minerDeviceId].ip) {
            item.localIp = foundObj[item.minerDeviceId].ip;
            let params = {
              minerDeviceId: foundObj[item.minerDeviceId].sUUID,
              localIp: foundObj[item.minerDeviceId].ip
            };
            return this.RestClient('UPDATE', '/device/save', params)
          }
          return P.resolve();
        }).catch(() => {
          this.$vux.toast.text('更新信息失败', 'top');
          return P.resolve();
        }).finally(() => {
          let wsUrl = "https://" + item.localIp + ":" + (item.localPort || 8080);
          this.wsClinet.startUp(wsUrl).then(() => {
            console.log('连接成功');
            this.$store.commit('updateState', {connected: true});
          }).catch(() => {
            this.$store.commit('updateState', {connected: false});
          }).finally(() => {
            this.$vux.loading.hide();
            this.$router.push({
              path: '/detail',
              query: {
                item: item
              }
            });
          });
        })
      },

      // 获取资产详情
      getinfo() {
        this.RestClient('GET_MANY_REFERENCE', '/wallet/detail').then((res) => {
          if (res.data.code === 200) {
          	console.log('data',res.data.data);
            this.walletinfo = {
              balance: res.data.data.balance,
              commision: res.data.data.commision,
              transfered: res.data.data.transfered,
							yesterdayIncome: res.data.data.yesterdayIncome
            }
          }
        })
      },

      // 滑动菜单
      handleEvents (type) {
       // console.log('event: ', type)
      },

      // 获取设备列表
      getDevice() {
        let params = {
          pageNo: 1,
          pageSize: 20
        };
        this.RestClient('GET_ONE', '/device/list', params).then((res) => {
          if(res.data.code === 200) {
            this.list = res.data.data.data;
            // console.log(this.list)
            let obj = {};
            _.each(this.list,(item)=>{
            	obj[item.minerDeviceId] = item;
							console.log(item);
							this.yesterday_income += item.yesterdayIncome;
							this.totalIncome += item.totalIncome;
            });
            this.$store.commit('updateState', {miners: obj});
          }
        })
      },

      // 删除设备
      delDevice(item) {
        this.$vux.confirm.show({
          title: '确定要删除吗？',
          onCancel : () => {
            // console.log('取消') //当前 vm
          },
          onConfirm : () => {
						let params = {
							id: item.id
						};
            this.RestClient('DELETE', '/device', params).then((res) => {
              if(res.data.code === 200) {
                this.$vux.toast.show({
                  type: 'success',
                  text: '已删除设备'
                });
                this.getDevice()
              }
            });
          }
        })
      },
			dialogCli(){
				this.dialog = false;
			}
    }
	}
</script>

<style scoped lang="less">
  .block{
    padding-top: 45px;
    .empty {
      img {
        display: block;
        width: 250px;
        height: 200px;
        margin: 0 auto;
      }
      p {
        color: rgb(139, 139, 139);
        text-align: center;
      }
    }

    h2{
      color: #fff;
      font-size: 30px;
    }
    h3{
      color: #fff;
      font-size: 18px;
      font-weight: normal;
    }
    h4{
      color: rgba(10,36,99,0.31);
      font-size: 14px;
      font-weight: normal;
    }
    h5{
      color: #ccc;
      font-size: 12px;
      font-weight: normal;
    }
    .wrapper_list{
      background: rgb(16,18,38);
    }
    .dialog{
      position: fixed;
      left: 0;top: 0;bottom: 0;right: 0;
      background: rgba(22,26,55,0.5);
      z-index: 999;

      .content{
        position: relative;
        top: 50%;left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        padding: 40px 5px 20px;
        width: 80%;
        border-radius: 20px;
        box-sizing: border-box;
        background: #fff;
        p{
          font-size: 13px;
          margin-bottom: 10px;
        }
        .confirm{
          background-color: rgb(255,196,0);
          width: 70%;
          height: 45px;
          font-size: 15px;
          margin: 30px auto 0;
          text-align: center;
          line-height: 45px;
          border-radius: 30px;
          color: #fff;
        }
      }
    }
  }
  .first_nav{
    padding: 14px 14px 14px 14px;
    box-sizing: border-box;
    background: rgb(16,18,38);
    p{
      height: 15px;
      width: 96%;
      margin: 0 auto;
      background: rgb(38,49,86);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

    }
    .first_title{
      .first_balance{
        padding: 20px 0 0 20px;
        box-sizing: border-box;
        background: rgb(63,84,152);
        height: 100px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .first_profit{
        padding: 5px 0 0 20px;
        box-sizing: border-box;
        background: rgb(73,94,161);
        height: 55px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
  .first_list{
    padding: 14px;box-sizing: border-box;
    background: rgb(246,247,247);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin-bottom: 60px;
    li{
      background: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 16px 5px;
      height: 30px;
    }
    .list_left{
      display: flex;
      align-items: center;
      img{
        display: inline-block;
        width: 24px;height: 24px;
        margin-right: 10px;
      }
      span{
        color: rgb(10,36,99);
        font-size: 18px;
      }
    }
    .list_left:before{
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: absolute;
      left: 13px;top: 1.5px;
      background: rgb(0,234,78);
    }
    .list_right{
      display: flex;
      align-items: center;
    }
  }
  .demo-content {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }

</style>
