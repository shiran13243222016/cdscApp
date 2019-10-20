<template>
  <div class="block">
    <div class="title">
      <h1>注册新用户</h1>
      <span>目前我们只开放邀请码用户注册</span>
    </div>
    <x-input :max="11" :show-clear="false" class="register_input" placeholder="手机号" ref="phone" type="tel"
             v-model="phone"></x-input>
    <x-input :show-clear="false" class="weui-vcode register_input" placeholder="验证码" v-model="captcha">
      <x-button @click.native="send" mini slot="right" type="primary">{{timeoState}} {{timeo}}</x-button>
    </x-input>
    <x-input :min="6" :show-clear="false" class="register_input" placeholder="6-16位密码，不能是纯数字或纯字母"
             ref='pass' type="password"
             v-model="password"></x-input>
    <x-input :show-clear="false" class="register_input" placeholder="邀请码" type="text" v-model="inviteCode"></x-input>
    <p :class="[orClick ? 'submit' : 'orSubmit', 'common']" @click="register">创建</p>
    <router-link to='/login' v-show="onfocus">返回登录</router-link>
  </div>
</template>

<script>
  import {XInput,XButton} from 'vux';
	export default {
    components: {
      XInput,XButton
    },
		name: "Register",
    data(){
      return {
        phone: '',
        captcha: '',
        inviteCode: '',
				password: '',
        onfocus: true,
        timeo: '',
        timeoState: '发送'
      }
    },
    computed: {
			orClick(){
      	if(this.phone && this.captcha && this.inviteCode && this.password){
      		return true;
        }else{
      		return false;
        }
      }
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

      // 注册
      register() {
      	if(!this.orClick){
					this.$vux.toast.text('请输入正确的手机号或密码', 'middle');
          return false;
        }
        if (this.phone.length != 11) {
          this.$vux.toast.text('请输入正确的手机号', 'middle');
          return false
        }
        let res = this.checkPwd(this.password);
        if (!res) {
          this.$vux.toast.text('密码必须是6-16位数字加字母组合', 'middle');
          return false
        }
        let params = {
          mobile: this.phone,
          inviteCode: this.inviteCode,
          captcha: this.captcha,
					password: this.password
        };
        this.RestClient('UPDATE', '/user/register', params).then((res) => {
          console.log(res);
          if(res.data.code == 200) {
            this.$vux.toast.show({
              text: res.data.message
            });
            this.$router.push('/login')
          }
        })
      },

      // 发送手机验证码
      send() {
        if(!this.$refs.phone.valid) {
					this.$vux.toast.text('请输入正确的手机号', 'middle');
					return false;
        }
				let params = {
					mobile: this.phone,
					type: '1'
				};
				this.RestClient('GET_ONE', '/user/sendCaptcha', params).then((res) => {
					console.log(res);
					if(res.data.code == 200) {
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
      }
    }
	}
</script>

<style scoped lang="less">
  .block{
    padding: 20px;
    background: #fff;
    position: absolute;
    left: 0;right: 0;bottom: 0;top: 0;
    .title{
      margin-bottom: 20px;
      h1{
        font-size: 22px;
        font-weight: normal;
        color: rgb(30,49,102);
      }
      span{
        color: rgb(214,218,229);
      }
    }

    .register_input{
      height: 54px;
      background: rgb(246,247,247);
      margin-bottom: 10px;
      border-radius: 5px;
    }

    h1{
      color: rgb(10,36,99);
      font-weight: normal;
      font-size: 28px;
    }
    span{
      color: rgba(106,106,106);
      font-size: 13px;
    }

    .common{
      line-height: 50px;
      text-align: center;
      height: 50px;
      border-radius: 4px;
    }
    .submit{
      color: #fff;
      background: rgb(255,196,0);
    }
    .orSubmit{
      color: rgb(230,232,232);
      background: rgb(192,192,192);
    }
    a{
      display: block;
      text-align: center;
      position: fixed;
      left: 50%;
      transform: translate(-50%);
      bottom: 10px;
    }

  }

  .weui-cell{
      box-sizing: border-box;
  }
  .weui-cell:before{
      position: unset;
  }
  .weui-btn ,.weui-btn_mini, .weui-btn_primary{
    background: rgb(255,196,0);
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    border-radius: 0;
  }
  .weui-btn:after{
    border: 0 none;
  }
</style>
