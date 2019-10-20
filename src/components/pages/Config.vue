<template>
  <div class="block">
    <div class="disk" @click="selectDisk">
      <p>
        <img alt="硬盘" src="@/assets/img/manage.png">
        <span>硬盘</span>
      </p>
      <p class="disk_are">
        <span :class="{active: seletBor}">{{currentDisks}}</span>
        <span><x-icon type="ios-arrow-right" size="22" style="margin-top: 6px;"></x-icon></span>
      </p>
    </div>

    <div class="extranet">
      <p>
        <img src="@/assets/img/waiwang.png" alt="外网">
        <span>外网IP及端口</span>
      </p>
      <p>
        <span>{{ip}}:{{port}}</span>
        <span></span>
      </p>
    </div>

    <div class="key">
      <x-icon size="22" type="ios-information"></x-icon>
      <span>Key Store</span>
    </div>

    <div class="store">
      <span v-if="!bzzaccount">请生成key</span>
      <em :class="{active: seletKey}">{{bzzaccount}}</em>
      <div class="refresh" @click="createKey">
        <img src="@/assets/img/refresh.png" alt="refresh">
      </div>
    </div>
    <div class="handle">
      <button class="submit" @click="submitConfig">提交</button>
    </div>
  </div>
</template>
<script>
  import {XProgress,XTextarea} from 'vux';
  import P from 'bluebird';
  import _ from 'lodash';
  import { randomBytes ,createCipher, createDecipher} from 'crypto'
  import {secp256k1,privateToAddress} from 'ethereumjs-util'
	export default {
		name: "Config",
    components: {
			XProgress,XTextarea
    },
    data() {
		  return {
		    ind: '',
        seletBor: false,
        seletKey: false,
		    keyStore: '',
        newDisk: [],
        encryptKey: ''
      }
    },

    watch: {
      currentConfig: {
        handler(newQues, oldQues) {
          if(newQues.bzzaccount != oldQues.bzzaccount) {
            this.miners[this.suuid].bzzaccount = newQues.bzzaccount;
            this.$store.dispatch("upMiner", this.miners);
          }
        }
      }
    },

    computed: {
      miners() {
        return this.$store.state.miners;
      },
      eswarm(){
        return  this.$store.state.gateway.eSwarm || {};
      },
      currentConfig(){
        let config = this.$store.state.gateway.eSwarm && this.$store.state.gateway.eSwarm.config;
        let obj = config || {};
        return _.cloneDeep(obj)
      },
      port() {
        return 	this.$store.state.gateway.eSwarm.config.port || '40000';
      },
      ip(){
        let ip = this.$store.state.gateway.eSwarm.config.ip || '0.0.0.0';
        let ipArr = ip.split('-');
        return ipArr.toString() ;
      },
      currentDisks(){
        return (this.newDisk && this.newDisk.name) || (this.currentConfig.diskInfo && this.currentConfig.diskInfo.name) || '未选择'
      },
      bzzaccount(){
        return this.keyStore || this.currentConfig.bzzaccount;
      },
      disks() {
		    return this.$route.query.disks
      },
      sysInfo() {
        return this.$store.state.gateway.sysInfo || {};
      },
    },

    created() {
      if(this.$route.query.disks) {
        this.newDisk = this.$route.query.disks;
        this.seletBor = true;
        this.ind = this.$route.query.ind;
      }
      // console.log(this.$route.query.localIp)

      if(!this.bzzaccount) {
        let privKey;
        do {
          privKey = randomBytes(32)
        } while (!secp256k1.privateKeyVerify(privKey));
        this.keyStore = privateToAddress(privKey).toString('hex');
        this.encryptKey = this.aesEncrypt(privKey,'123');
        this.seletKey = true;
      }
    },

    methods: {
		  // 选择硬盘
			selectDisk(){
				this.$router.push({
          path:'/selectDisk',
          query: {
            disksOn: this.newDisk,
            ind: this.ind,
            disksed: this.currentConfig.diskInfo,
            item: this.$route.query.item
          }
				})
      },

      // 生成账号 || key
      createKey(){
			  if(this.bzzaccount) {
          this.$vux.confirm.show({
            title: '提示',
            content: '生成新的账号会使已激活的状态失效 确认继续生成',
            onCancel : () => {
              console.log('取消') //当前 vm
            },
            onConfirm : () => {
              let privKey;
              do {
                privKey = randomBytes(32)
              } while (!secp256k1.privateKeyVerify(privKey));

              this.keyStore = privateToAddress(privKey).toString('hex');
              this.encryptKey = this.aesEncrypt(privKey,'123');
              this.seletKey = true;
            }
          })
        }else {
          let privKey;
          do {
            privKey = randomBytes(32)
          } while (!secp256k1.privateKeyVerify(privKey));

          this.keyStore = privateToAddress(privKey).toString('hex');
          this.encryptKey = this.aesEncrypt(privKey,'123');
          this.seletKey = true;
        }

      },

      // 提交配置
      submitConfig() {
        if(_.isEmpty(this.keyStore) || _.isEmpty(this.newDisk)) {
          this.$vux.toast.text('请选择硬盘并生成keyStore', 'middle')
        }else {
          this.$vux.confirm.show({
            title: '提示',
            content: '提交后立即生效，是否继续？',
            onCancel : () => {
              console.log('取消');
            },
            onConfirm : () => {
              let msg = {
                iotId: "eSwarm",
                attribute: "setConfig",
                act: 'w',
                value: {
                  password: '123',
                  encryptKey: this.encryptKey,
                  diskInfo: this.disks,
                  ip: this.ip,
                  port: this.port
                }
              };
              this.wsClinet.sendRequest(msg).then((res)=>{
                this.editDevice();
                this.$vux.toast.show({
                  text: '提交成功'
                })
                this.seletBor = false;
                this.seletKey = false;
              }).catch((e)=>{
                console.log(e);
                this.$vux.toast.text('请求超时', 'middle')
              })
            }
          })
        }
      },

      // 修改设备
      editDevice: function () {
        let arr = this.$store.state.deviceDetails;
        let params = {
          minerDeviceId: arr.minerDeviceId,
          diskInfo: this.newDisk.size,
          cpuInfo: arr.cpuInfo,
          memoryInfo: arr.memoryInfo,
          diskUsage: this.sysInfo.diskUse,
          ip: this.ip,
          port: this.port,
          localIp: this.$route.query.localIp,
          localPort: this.$route.query.localPort,
          account: this.bzzaccount
        };
        this.RestClient('UPDATE', '/device/save', params).then((res) => {
          if (res.data.code == 200) {
            console.log('修改成功')
          }
        })
      },

      // 加密
      aesEncrypt(data, key) {
        const cipher = createCipher('aes192', key);
        let crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
      },

      // 解密
      aesDecrypt: function (encrypted, key) {
        let decrypted;
        try {
          const decipher = createDecipher('aes192', key);
          decrypted = decipher.update(encrypted, 'hex');
          decrypted = Buffer.concat([decrypted, decipher.final()]);
        } catch (e) {
          decrypted = undefined
        }
        return decrypted;
      },

			setPort(){
				this.$router.push({path:'/setPort'})
      },

      setIp(){
				this.$router.push({path:'/setIp'})
      }
    }

	}
</script>

<style scoped>
  .block .store{
    background: #fff;
    color: rgba(10,36,99,0.4);
    word-break:break-all;
    text-align: left;
  }
  .block .disk,.block .extranet {
    background: #fff;
    border-bottom: 1px solid rgb(244, 245, 245);
  }
  .disk_are {
    color: #999999;
  }
  .handle{
    background: rgb(246,247,247);
    flex-direction: column;
    display: inline-block;
    margin-bottom: -40px;
  }
  .submit,.record{
    border: 0 none;
    display: inline-block;
    margin-bottom: 20px;
    outline: none;
  }
  .handle .submit{
    color: #fff;
    background: rgb(255,188,3);
    height: 50px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 30px;
  }
  .handle .record{
    color: rgb(156,120,0);
    background: rgb(247,231,175);
    height: 50px;
  }
  .store{
    padding: 10px 15px !important;
    position: relative;
  }
  .store .refresh{
    display: block;
    position: absolute;
    top: 0;bottom: 0;right: 0;
    width: 60px;
    background: rgb(255, 188, 3);
    text-align: center;

  }
  .store .refresh img{
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

  }

  .store em {
    color: #999999;
    width: 70%;
    margin: 0 auto;
  }
  .active {
    color: #222222 !important;
  }
  .block{
    margin: 0 -20px;
  }
  .block img{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .block>div{
    display: flex;
    padding: 15px 20px;
    justify-content: space-between;
  }
  .block>div span{
    margin-left: 12px;
  }
  .block>div>p{
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .block .key{
    padding-left: 20px;
    background: rgb(246,247,247);
    align-items: center;
  }
  .block .key span{
    margin-right: auto;
  }
</style>
