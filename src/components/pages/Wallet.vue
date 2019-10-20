<template>
  <div class="block">
    <header>
      <span @click="goBack" class="arrow">←</span><span>钱包</span>
      <img src="../../assets/img/note.png" alt="note" @click="goTakeRecord">
    </header>
    <nav>
      <img src="../../assets/img/walletb.png" alt="wallet">
      <span>账户余额</span>
      <h3>{{walletinfo.balance?walletinfo.balance:0 | toThousands}}</h3>
      <div class="nav_content">
        <div class="left_content">
          <span>累计收益(USDT)</span>
          <h4>{{walletinfo.commision?walletinfo.commision:0 | toThousands}}</h4>
        </div>
        <div class="right_content">
          <div>
            <span>已提收益(USDT)</span>
            <h4>{{walletinfo.transfered?walletinfo.transfered:0 | toThousands}}</h4>
          </div>
        </div>
      </div>
      <p></p>
    </nav>
    <div class="empty"  v-if="list.length===0">
      <img src="../../assets/img/empty.png" alt="无记录">
      <p>暂无记录</p>
    </div>
    <section v-else>

      <pull-to @infinite-scroll="getMoreList" class="file-lists">
        <div :key="index" class="section_content vux-1px-b" v-for="(item,index) in list">
          <div>
            <h3>收支</h3>
            <p style="color:rgb(0,155,32)" v-if="item.amount>0">+{{item.amount | toThousands}}</p>
            <p style="color:rgb(196,24,24)" v-if="item.amount<0">{{item.amount | toThousands}}</p>
          </div>
          <div>
            <h3>类型</h3>
            <p v-if="item.recordType===1">挖矿收益</p>
            <p v-if="item.recordType===2">系统补币</p>
            <p v-if="item.recordType===3">返佣</p>
            <p v-if="item.recordType===4">提币</p>
          </div>
          <div class="item_time">
            <h3>时间</h3>
            <p>{{item.createDate | formatime}}</p>
          </div>
        </div>
      </pull-to>

    </section>
    <div class="submit" @click="copySymbolsIn">提币</div>

    <div class="dialog" v-if="bindShow">
      <div class="content">
        <div><p>为保障资金安全，你需要在【我的】页面</p>
          <p>授权绑定小白交易所。</p></div>
        <div @click="dialogCli" class="confirm">立即绑定</div>
      </div>
    </div>
  </div>
</template>
<script>
  import PullTo from 'vue-pull-to'
	export default {
		name: "Wallet",
    components: {
      PullTo
    },
		data(){
			return {
				list: [],
        walletinfo: {
          balance: 0,
          commision: 0,
          transfered: 0
        },
        pageSize: 10,
        currentPage: 1,
        bindStatus: '',
        bindShow: false
			}
		},
      created(){
        this.getinfo();
        this.getoutgolist();
        this.getUserInfo();
      },
		methods: {
			goBack(){
        this.$router.push('/my')
			},

			goTakeRecord(){
        this.$router.push({
          path: '/takeRecord'
        })
			},

      copySymbolsIn(){
        if (this.bindStatus == 0) {
          this.bindShow = true;
        } else {
          this.$router.push({path: '/TakeCoin', query: {amount: this.walletinfo}})
        }
      },

      // 获取资产详情
      getinfo(){
        this.RestClient('GET_MANY_REFERENCE', '/wallet/detail').then((res) => {
          if (res.data.code === 200) {
            this.walletinfo = {
              balance: res.data.data.balance,
              commision: res.data.data.commision,
              transfered: res.data.data.transfered
            }
          }
        })
      },

      getoutgolist(){
        let params={
          currentPage:this.currentPage,
          pageSize:this.pageSize
        };
        this.RestClient('GET_LIST','/wallet/records',params).then((res)=>{
          if(res.data.code===200){
            console.log(res)
            this.list = [...res.data.data.data]
          }
        })
      },

      getMoreList() {
        this.currentPage++;
        let params = {
          pageNo: this.currentPage,
          pageSize: '10'
        };
        this.RestClient('GET_LIST', '/wallet/records', params).then((res) => {
          if (res.data.code === 200) {
            let pageData = [];
            pageData = res.data.data.data;
            this.list = this.list.concat(pageData)
          }
        })
      },

      // 关闭绑定交易所弹窗
			dialogCli(){
        this.bindShow = false;
        this.$router.push('/my');
      },

      // 获取用户信息
      getUserInfo() {
        this.RestClient('GET_ONE', '/user/info').then((res) => {
          if(res.data.code = 200) {
            this.bindStatus = res.data.data.bindStatus;
            if (res.data.data.bindStatus === 0) {
              this.bindShow = true
            }
          }
        })
      }
		}
  }
</script>

<style scoped lang="less">
  .block{
    padding: 20px 20px;
    header{
      color: #fff;
      height: 45px;
      position: fixed;z-index: 9;
      left: 0;top: 0;right: 0;
      display: flex;
      padding: 0 20px;
      align-items: center;
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
      img{
        width: 24px;height: 24px;
        margin-left: auto;
      }
    }
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
    nav>img{
      display: block;
      width: 36px;height: 36px;
    }
    nav{
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #fff;z-index: 9;
      background: rgb(22,26,55);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      padding: 10px 20px;
      position: fixed;left: 0;top: 45px;right: 0;
      .nav_content{
        display: flex;
        width: 90%;
        justify-content: space-between;
        padding: 10px 0;
        .left_content{
          flex: 1;
        }
        .right_content{
          border-left: 1px solid #ccc;
          text-align: right;
          flex: 1;
          div{
            float: right;
            text-align: left;
          }
        }
      }
      p{
        margin: 10px auto 0;
        border-radius: 5px;
        width: 20%;height: 5px;
        background: rgb(229,229,229);
      }
      i{
        width: 36px;height: 36px;
      }
      span{
        font-size: 12px;
        color: #ccc;
      }
      h3{
        font-size: 30px;
      }
      h4{
        font-size: 18px;
      }
    }
    section{
      height: 400px;
      margin-top: 240px;
    }
    .section_content{
      height: 300px;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      height: 60px;box-sizing: border-box;
      h3{
        font-size: 12px;
        margin: 5px 0;
        color: rgb(180,186,196);
      }
      .item_time{
        text-align: right;
      }
    }
    .section_content div{
      flex: 1;
    }
    .submit{
      color: #fff;
      background-color: rgb(255,196,0);
      height: 50px;line-height: 50px;
      text-align: center;
      border-radius: 4px;
      position: fixed;
      bottom: 15px;
      left: 20px;
      right: 20px;
    }
  }
</style>
