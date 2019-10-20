<template>
  <div class="block">
    <div class="header">我的</div>
    <pull-to>
      <div class="group">
        <div class="group_item">
          <div>
            <img alt="iphone" src="@/assets/img/phone.png">
            <span>{{loginName}}</span>
          </div>
          <img alt="avatar" src="@/assets/img/avatar.png" style="width:32px;height:32px;">
          <!--<div><x-icon type="ios-arrow-right" size="22"></x-icon></div>-->
        </div>
      </div>

      <div class="group mt20">
        <router-link class="group_item" tag="div" to="/modifyInfo">
          <div>
            <img alt="modify" src="@/assets/img/mylight.png">
            <span>昵称</span>
          </div>
          <div>
            <span>{{nickname}}</span>
            <x-icon size="22" type="ios-arrow-right"></x-icon>
          </div>
        </router-link>
      </div>

      <div class="group mt20">
        <router-link class="group_item" tag="div" to="/wallet">
          <div>
            <img alt="wallet" src="@/assets/img/wallet.png">
            <span>我的钱包</span>
          </div>
          <div>
            <x-icon size="22" type="ios-arrow-right"></x-icon>
          </div>
        </router-link>
        <div class="group_item">
          <div>
            <img alt="bind" src="@/assets/img/calendar.png">
            <span>绑定交易所</span>
          </div>
          <div @click="openIfrom" class="group_item_flex">
            <span v-if="bindStatus == 0">未绑定</span>
            <span v-if="bindStatus == 1">已绑定</span>
            <x-icon size="22" type="ios-arrow-right" v-if="!bindStatus == 1"></x-icon>
          </div>
        </div>
      </div>

      <div class="group mt20">
        <router-link class="group_item" tag="div" to="/modifyPass">
          <div>
            <img alt="modify" src="@/assets/img/password.png">
            <span>修改密码</span>
          </div>
          <div>
            <x-icon size="22" type="ios-arrow-right"></x-icon>
          </div>
        </router-link>
        <router-link class="group_item" tag="div" to="/help">
          <div>
            <img alt="help" src="@/assets/img/about.png">
            <span>帮助中心</span>
          </div>
          <div class="group_item_flex">
            <x-icon size="22" type="ios-arrow-right"></x-icon>
          </div>
        </router-link>
        <div class="group_item">
          <div>
            <img alt="current" src="@/assets/img/vison.png">
            <span>当前版本</span>
          </div>
          <div class="group_item_flex">
            <span>{{upVersion}}<span style="color: #999999">({{releaseTime}})</span> </span>
          </div>
        </div>
      </div>

      <div @click="exitLogin" class="group out mt20">
        <span style="color: #AAA">切换账号</span>
      </div>
    </pull-to>

  </div>
</template>

<script>
	import {XDialog} from 'vux';
  import {BASE_TIME} from '../../config'
  import PullTo from 'vue-pull-to'
	export default {
		name: "My",
    components: {
      XDialog,
      PullTo
		},
		data() {
			return {
        loginName: '',
        bindStatus: '',
        bindUrl: this.$store.state.userInfo.bindUrl,
        version: '',
        nickname: ''
			}
		},
    computed: {
      upVersion() {
        return this.$store.state.version || '1.0.3'
      },
      releaseTime() {
        return BASE_TIME
      }
    },
    created() {
      this.getUserInfo();
    },
		methods: {
		  // 退出登录
			exitLogin(){
				this.$vux.confirm.show({
					title: '提示',
          content: '确定要退出账号吗?',
					onCancel : () => {
						console.log('取消') //当前 vm
					},
					onConfirm : () => {
						this.RestClient('GET_ONE', '/user/logout').then((res) => {
							if(res.data.code == 200) {
                // localStorage.setItem("token", '');
                localStorage.removeItem("token");
								this.$router.push({path:'/login'});
							}
						})
          }
				})
      },

      // 获取用户信息
      getUserInfo() {
			  this.RestClient('GET_ONE', '/user/info').then((res) => {
          console.log(res);
          if(res.data.code = 200) {
            this.bindStatus = res.data.data.bindStatus;
            this.loginName = res.data.data.loginName;
            this.nickname = res.data.data.nickname;
          }
        })
      },

      openIfrom() {
        if (this.bindStatus == 1) {
          return false
        }
        this.$router.push('/bindExchange')
      }

    }
	}
</script>

<style lang="less" scoped>
  .mt20{
    margin-top: 20px;
  }
  .block{
    font-size: 14px;
    padding-top: 45px;
    .out {
      background: #ffffff;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }
    .header {
      border-bottom: 1px solid rgb(248,250,250);
      font-size: 16px;
      text-align: center;
      line-height: 44px;
      height: 44px;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .group {
      .group_item {
        padding: 18px 10px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(248,250,250);
        align-items: center;
        div {
          height: 24px;
          display: flex;
          line-height: 24px;
          img{
            width: 20px;
            height: 20px;
            margin-right: 12px;
          }
        }
        .group_item_flex {
          display: flex;
        }
      }

    }
  }

</style>
