<template>
  <div class="adddevice">
    <header>
      <span @click="goBack" class="arrow">←</span><span>添加设备</span>
    </header>
    <nav>
      已连接同 Wi-Fi 设备（共 <span>{{foundList.length}}</span> 台）
    </nav>
    <div class="box" @click="selected(item, index)" v-for="(item, index) in found" :key="index" :class="{'active': ind === index}" >
      <div class="box_con">
        <span class="box_con_icon" :class="{'box_con_icon_active': ind === index}">
           <img alt="" src="../../assets/img/light.png">
        </span>
        <p>设备号: <span> {{item.sUUID.slice(0,6)}}</span></p>
      </div>
      <div class="box_state">
        <span v-if="ind === index">已选</span>
        <span v-else>未选</span>
        <div class="proper" v-if="ind === index">
          <icon type="success-no-circle" class="icon"></icon>
        </div>
      </div>
    </div>
    <div class="empty" v-if="nofound">
      <img src="../../assets/img/empty.png" alt="无记录">
      <p>未发现新设备</p>
    </div>
    <div class="footer">
      <button class="submit" @click="addDevice">添加</button>
    </div>4

  </div>
</template>

<script>
  import {CheckIcon,XHeader, Icon} from 'vux';
  import _ from 'lodash';
  import udp from '../../lib/udpSocketClient'
	export default {
		name: "addDevice",
		components: {
			CheckIcon, XHeader, Icon,
		},
    computed: {
      found(){
        return this.$store.state.found;
      },
      miners(){
        return this.$store.state.miners;
      },
			foundList (){
      	return Object.keys(this.found);
      }
    },
    data(){
			return {
        ind: Number,
        arr: [],
        nofound: false,
      }
    },
    created() {
		  this.getData();
    },
    methods: {
		  // 选中的设备
      // selected(item) {
      //   console.log(item)
      //   if(item.isActive) {
      //     this.arr.pop(item)
      //   }else {
      //     this.arr.push(item)
      //   }
      //   item.isActive =! item.isActive;
      // },
      selected(item, index) {
        this.ind = index;
        this.arr = item;
      },

      // 添加设备
      addDevice() {
        if (this.arr == false) {
          this.$vux.toast.text('你还没选择设备', 'middle')
        } else {
          let params = {
            minerDeviceId: this.arr.sUUID,
            cpuInfo: this.arr.cpuInfo,
            memoryInfo: this.arr.memoryInfo,
            localIp: this.arr.ip,
            localPort: this.arr.port,
            account: this.arr.bzzaccount
          };
          this.RestClient('UPDATE', '/device/save', params).then((res) => {
            if (res.data.code == 200) {
              let miners = {};
              miners[this.ind] = this.arr;
              this.$vux.toast.show({
                type: 'success',
                text: res.data.message
              });
              this.arr = [];
              this.$router.push('/')
            }
          }).catch((e) => {
            this.$vux.toast.text('添加设备失败', 'top')
          })
        }
      },

      // 获取矿机
      getData(){
        this.$vux.loading.show({
          text: 'Loading'
        });
        this.$store.commit("updateState",{found:{}});
        udp.findMine({cmd: "findMiner"}, 60009).then((foundObj) => {
          let diffObj = {};
          _.each(foundObj,(value,key)=>{
            if(!this.miners[key]){
            	value.isActive = false;
              diffObj[key] = value
            }
          });
          if(_.isEmpty(diffObj)){
            this.nofound = true;
          }
          this.$store.commit("updateState",{found: diffObj });
          console.log('新发现', diffObj)
        }).catch(e=>{
          console.log(e)
        }).finally(()=>{
          this.$vux.loading.hide()
        })
      },

      // 返回上一页
      goBack() {
        this.$router.push('/')
      },

      // 数组去重
      dedupe(array) {
        return Array.from(new Set(array));
      }
    }
	}
</script>

<style scoped lang="less">
  .adddevice{
    padding: 0 20px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .empty {
      position: absolute;
      background: #fff;
      left: 0;right: 0;bottom: 0;top: 110px;
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
    .active {
      border: 1px solid rgb(254,185,7) !important;
    }
    .box {
      margin-bottom: 20px;
      height: 60px;
      background: rgb(245,247,247);
      border: 1px solid rgb(224,224,224);
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      position: relative;
      .box_con {
        display: flex;
        .box_con_icon {
          line-height: 55px;
          text-align: center;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: rgb(215,219,226);

          img {
            width: 60%;
            margin-top: 15px;
          }
        }
        .box_con_icon_active {
          background: rgb(254,185,7);
        }
        p{
          line-height: 58px;
          margin-left: 20px;
        }
      }
      .box_state {
        line-height: 60px;
        span {
          color: rgb(13,110,220);
        }
        .proper {
          width: 22px;
          height: 22px;
          border-radius: 0 5px 0 0;
          background: rgb(254,185,7);
          position: absolute;
          top: 0;
          right: 0;
          .icon {
            color: #fff;
            position: absolute;
            top: 2px;
            right: 0;
            font-size: 15px;
          }
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 50px;
      left: 0;
      right: 0;
      text-align: center;
      .submit {
        width: 80%;
        background: rgb(255,196,0);
        color: #fff;border-radius: 4px;
        height: 50px;
        border: 0 none;
        outline: none;
      }
    }
  }
  nav{
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: rgb(255,237,218);
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 6px;
    span{
      color: rgb(0,133,227);
      font-size: 18px;
    }
  }
  header{
    height: 47px;
    display: flex;
    align-items: center;

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
</style>
