<template>
  <div class="monitor">
    <div class="monitor_header vux-1px-b">
      <div class="upload">
        <img src="@/assets/img/upload.png" alt="上传">
        <div class="mpl-8">
          <h3>上传 Mbps</h3>
          <h2>{{((sysInfo.netTx)/1024).toFixed(2)}}</h2>
        </div>
      </div>
      <div class="download">
        <img src="@/assets/img/download.png" alt="下载">
        <div class="mpl-8">
          <h3>下载 Mbps</h3>
          <h2>{{((sysInfo.netRx)/1024).toFixed(2)}}</h2>
        </div>
      </div>
    </div>
    <div class="monitor_nav vux-1px-b">
      <p><span>IP地址</span><span>{{ip}}</span></p>
      <p><span>归属地</span><span>{{country}}{{city}}</span></p>
      <p><span>运营商</span><span>{{isp}}</span></p>
    </div>
    <div class="monitor_section monitor_memory">
      <img src="@/assets/img/memory.png" alt="内存">
      <div>
        <p class="total"><span>内存总量</span><span style="font-size: 16px">{{sysInfo.totalMem}}GB</span></p>
        <p class="ratio"><span>使用率</span><span>{{parseInt(ramUse)}}%</span></p>
        <x-progress :percent="ramUse" :show-cancel="false"></x-progress>
      </div>
    </div>
    <div class="monitor_section monitor_cpu">
      <img src="@/assets/img/cpu.png" alt="cpu">
      <div>
        <p class="total"><span>CPU</span><span style="font-size: 16px">{{miner.cpuInfo}}</span></p>
        <p class="ratio"><span>使用率</span><span>{{sysInfo.cpuLoad}}%</span></p>
        <x-progress :percent="parseInt(sysInfo.cpuLoad)" :show-cancel="false"></x-progress>
      </div>
    </div>
    <div class="monitor_section monitor_disk">
      <img src="@/assets/img/disk.png" alt="硬盘">
      <div>
        <p class="total"><span>硬盘总量</span><span style="font-size: 16px">{{sysInfo.diskSize}}GB</span></p>
        <p class="ratio"><span>使用率</span><span>{{sysInfo.diskUse}}%</span></p>
        <x-progress :percent="parseInt(sysInfo.diskUse)" :show-cancel="false"></x-progress>
      </div>
    </div>
  </div>
</template>

<script>
	import {XProgress} from 'vux';
	import axios from 'axios'
	export default {
		name: "Monitor",
    components: {
			XProgress
    },
    data() {
		  return {
        country: '',
        city: '',
        ip: '',
        isp: ''
      }
    },
    computed: {
      miner() {
        return this.$route.query.item;
      },
      sysInfo() {
        return this.$store.state.gateway.sysInfo || {};
      },
      ramUse() {
        return  (this.sysInfo.totalMem - this.sysInfo.freeMen) / this.sysInfo.totalMem * 100
      }
    },
    created() {
      this.getIp()
      axios.get('http://ip-api.com/json/' + this.ip + '?lang=zh-CN').then((res) => {
        this.country = res.data.country;
        this.city = res.data.city;
        this.isp = res.data.isp;
      }).catch(() => {
        this.$vux.toast.text('获取归属地失败', 'middle')
      });
    },
    methods: {
      getIp() {
        let ip = this.$store.state.gateway.eSwarm.config.ip || '0.0.0.0';
        let ipArr = ip.split('-');
        this.ip = ipArr.toString();
      }
    }
  }
</script>

<style scoped>
  .monitor_memory>>> .weui-progress__inner-bar{
    background: rgb(255,196,144);
  }
  .monitor_cpu>>> .weui-progress__inner-bar{
    background: rgb(255,119,122);
  }
  .monitor_disk>>> .weui-progress__inner-bar{
    background: rgb(31,121,155);
  }
  h2{
    font-size: 18px;
  }
  h3{
    font-size: 14px;
    color: rgb(122,134,154);
  }
  .monitor{
    height: 100%;

  }
  .monitor_header{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .monitor_header img{
    display: inline-block;
    width: 48px;height: 48px;
  }
  .monitor_header .upload div, .monitor_header .download div{
    display: inline-block;
  }

  .mpl-8 {
    margin-left: 8px
  }
  .monitor_nav{
    padding-bottom: 10px;
  }
  .monitor_nav p{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .monitor_section{
    padding: 20px 0;
  }
  .monitor_section>img{
    width: 50px;height: 50px;
  }
  .monitor_section>div{
    display: inline-block;
    float: right;
    width: calc(100% - 60px);
  }
  .monitor_section .total, .monitor_section .ratio{
    display: flex;
    justify-content: space-between;
  }
  .monitor_section .ratio{
    color: rgb(122,134,154);
    font-size: 13px;
  }
</style>
