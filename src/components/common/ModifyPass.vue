<template>
  <div class="block">
    <header>
      <span @click="goBack" class="arrow">←</span><span>我的</span>
    </header>
    <div class="back">
      <div class="back_box"></div>
    </div>
    <section>
      <span></span>
      <div>
        <h1>修改密码</h1>
        <span style="color:rgba(10,36,99,0.4)">确保你的手机在身边</span>
      </div>

      <div class="iphone">
        <span>手机号</span>
        <span>{{loginName}}</span>
      </div>
      <x-input v-model="captcha" ref="captcha" class="weui-vcode register_input" placeholder="验证码">
        <x-button @click.native="send" mini slot="right" type="primary">{{timeoState}} {{timeo}}</x-button>
      </x-input>
      <x-input :min="6" :show-clear="false" class="register_input" placeholder="6-16位密码，不能是纯数字或纯字母"
               ref="pass" required
               type="password" v-model="pass"></x-input>
      <x-input :min="6" :show-clear="false" class="register_input" placeholder="确认新密码" ref="conPass" required
               type="password" v-model="conPass"></x-input>
      <p class="submit cursor" @click="editPassWord">提交</p>

    </section>
  </div>
</template>
<script>
	import {XInput,XButton} from 'vux';
	export default {
		name: "ModifyPass",
    components: {
			XInput,XButton
    },
    data(){
			return {
				pass: '',
        conPass: '',
				captcha: '',
        loginName: '',
        timeo: '',
        timeoState: '发送'
      }
    },
    created() {
		  this.getUserInfo()
    },
		methods: {
      //判断是否是数字或字母组成的6-16位密码，是则返回true
      checkPwd(pwd) {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        let re = new RegExp(reg)
        if (re.test(pwd)) {
          return true;
        } else {
          return false;
        }
      },
			// 返回上一页
			goBack(){
        this.$router.push('/my')
			},

      // 给手机发送验证码
      send(){
        let params = { mobile: this.loginName, type: '2'};
        this.RestClient('GET_ONE', '/user/sendCaptcha', params).then((res) => {
          if (res.data.code === 200) {
            this.$vux.toast.text(res.data.message, 'middle')
            this.timeo = '60';
            let timeStop = setInterval(() => {
              this.timeo--;
              if (this.timeo > 0) {
                this.timeoState = '已发送'
              } else {
                this.timeo = '';
                this.timeoState = '重新发送'
                clearInterval(timeStop);//清除定时器
              }
            }, 1000)
          }
        })
      },

      // 修改密码
      editPassWord() {
        if (this.pass !== this.conPass) {
          this.$vux.toast.text('两次密码不一样', 'middle');
          return false;
        }
        let res = this.checkPwd(this.pass);
        if (!res) {
          this.$vux.toast.text('密码必须是6-16位数字加字母组合', 'middle');
          return false
        }
			  let params = {
          captcha: this.captcha,
          newPassword: this.pass
        };
			  this.RestClient('UPDATE', '/user/updatePasswordByCaptcha', params).then((res) => {
          if (res.data.code === 200) {
            this.$vux.toast.text(res.data.message);
            this.$router.push('/login')
          }
        })
      },

      // 获取用户信息
      getUserInfo() {
        this.RestClient('GET_ONE', '/user/info').then((res) => {
          if (res.data.code === 200) {
            this.loginName = res.data.data.loginName;
          }
        })
      }
		}
	}
</script>

<style scoped lang="less">
  .block{
    padding-top: 45px;

    header{
      color: #fff;
      height: 47px;
      display: flex;
      padding: 0 20px;
      align-items: center;
      position: fixed;
      left: 0;right: 0;top: 0;
      background: rgb(22,26,55);
      .arrow{
        font-weight: bolder;
        font-size: 24px;
        margin-top: -5px;
      }
      span {
        font-size: 17px;
        margin-right: 14px;
      }
    }
    .back {
      height: 100px;
      background: #000;
      position: relative;
      z-index: -1;
      .back_box {
        width: 90%;
        background: #cccccc;
        margin: 0 auto;
        height: 40px;
        position: absolute;
        left: 5%;
        top: 0;
        border-radius: 20px;
      }
    }

    section{
      background: rgb(246,247,247);
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      padding: 10px 20px 40px;
      display: flex;
      flex-direction: column;
      margin-top: -88px;
      .iphone {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        font-size: 16px;
      }
      p{
        height: 50px;
        color: #fff;
        border-radius: 4px;
        text-align: center;
        line-height: 50px;
        margin-top: 20px;
        background: rgb(255,196,0);
      }
      .register_input{
        margin-top: 10px;
        background: #fff;
      }
    }
  }
  section>span{
    margin: 0 auto 20px;border-radius: 3px;
    display: block;
    width: 15%;height: 5px;
    background: rgb(229,229,229);
  }
  .weui-cell{
    box-sizing: border-box;
    padding: 16px 15px;
  }
  .weui-cell:before{
    position: unset;
  }
  .weui-btn ,.weui-btn_mini, .weui-btn_primary{
    background: rgb(255,196,0);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
