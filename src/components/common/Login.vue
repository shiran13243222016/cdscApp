<template>
  <div class="login">
    <div class="login_header">
      <h1>欢迎回来</h1>
      <span>登录后可全面体验"云链"给你带来的收益快感！</span>
    </div>
    <div class="login_content">
      <tab :line-width=2 active-color='rgb(255,196,0)' v-model="index">
        <tab-item class="vux-center" :selected="demo === item" v-for="(item, index) in list" @click="demo = item" :key="index">{{item}}</tab-item>
      </tab>
      <group>
        <x-input :max="11" :show-clear="false" class="login_input" placeholder="手机号" ref="mobile" type="tel"
                 v-model="mobile"></x-input>
      </group>
      <group>
        <x-input :min="6" :show-clear="false" class="login_input" placeholder="6-16位密码，不能是纯数字或纯字母" type="password"
                 v-model="password"></x-input>
      </group>
      <span :class="[orClick ? 'submit' : 'orSubmit', 'common']" @click="submit">登录</span>
    </div>
    <router-link to='/register' v-show="onfocus">注册新用户</router-link>
  </div>
</template>

<script>
  import { Tab, TabItem,XInput, Group} from 'vux';
  export default {
    name: "login",
    components: { Tab, Group, TabItem, XInput },
    data(){
      return {
        demo: '密码登录',
        list: ['密码登录'],
        index: 0,
        mobile: localStorage.getItem("mobile") || '',
        password:'',
				onfocus: true
      }
    },
		computed: {
      orClick: function () {
        return this.mobile && this.password;
      }
    },
    methods: {
      // 登录
      submit() {
        if(!this.orClick ){
          return false;
        }
        if (this.mobile.length != 11) {
          this.$vux.toast.text('请输入正确的手机号', 'middle');
          return false
        }
				let params = {
					loginName: this.mobile,
					password: this.password
				};
        this.RestClient('UPDATE', '/user/login', params).then((res) => {
        	console.log(res);
          if (res.data.code === 200) {
            if (res.data.data.roleType != 8) {
              this.$vux.toast.text('此账号无权登录', 'middle');
              this.exitLogin();
            } else {
              this.$store.commit('updateState', {userInfo: res.data.data});
              localStorage.setItem("mobile", this.mobile);
              localStorage.setItem("token", res.headers.authorization);
              this.$router.push('/')
            }
          }
        });
      },

      // 退出登录
      exitLogin() {
        this.RestClient('GET_ONE', '/user/logout').then((res) => {
          if (res.data.code == 200) {
            localStorage.removeItem("token")
          }
        })
      }

    }
  }
</script>

<style scoped>
  .login{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .login> a{
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-25px,0);
  }
  .login_header h1{
    font-size: 22px;
    font-weight: normal;
    color: rgb(30,49,102);
  }
  .login_header{
    margin-bottom: 20px;
  }
  .login_header span{
    color: rgb(214,218,229);
    font-size: 13px;
  }
  .login_content{
    max-height: 500px;
    overflow: hidden;
  }
  .common {
    height: 50px;
    display: block;
    line-height: 50px;
    margin-top: 20px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    touch-action: none;
  }

  .submit {
    color: #fff;
    background: rgb(255, 196, 0);
  }

  .orSubmit {
    color: rgb(230, 232, 232);
    background: rgb(192, 192, 192);
  }
</style>
