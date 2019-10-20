<template>
  <div class="profit">
    <template v-if="profit_list.length">
      <pull-to @infinite-scroll="getMoreList" class="file-lists">
        <div :key="item.id" class="prifit_list vux-1px-b" v-for="item in profit_list">
          <div class="list_left">
            <h4>收入</h4>
            <h3 style="color:rgb(0,155,32)" v-if="item.amount>0">{{'+'+item.amount |
              toThousands}}&nbsp;<span>USDT</span></h3>
            <h3 style="color:rgb(196,24,24)" v-if="item.amount<0">{{item.amount | toThousands}}&nbsp;<span>USDT</span>
            </h3>
          </div>
          <div class="list_right">
            <h4>日期</h4>
            <h3>{{item.settleDate}}</h3>
          </div>
        </div>
      </pull-to>

    </template>
    <div class="empty" v-else>
      <img src="@/assets/img/empty.png" alt="无记录">
      <p>暂无收益</p>
    </div>
  </div>
</template>
<script>
  import PullTo from 'vue-pull-to'
	export default {
		name: "profit",
    components: {
      PullTo
    },
    data(){
			return {
        profit_list: [],
        pageNo: 1
      }
    },
    created() {
		  this.profitList()
    },
    methods: {
      getMoreList() {
        this.pageNo++;
        let params = {
          pageNo: this.pageNo,
          pageSize: '10'
        };
        this.RestClient('GET_LIST', '/device/income', params).then((res) => {
          if (res.data.code === 200) {
            let pageData = [];
            pageData = res.data.data.data;
            this.profit_list = this.profit_list.concat(pageData)
          }
        })
      },

		  // 获取收益列表
      profitList() {
        let params = {
          pageNo: this.pageNo,
          pageSize: '10',
          minerId: this.$route.query.item.id
        };
        this.RestClient('GET_LIST', '/device/income', params).then((res) => {
          this.profit_list = res.data.data.data
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .profit{
    height: 400px;
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
    .prifit_list{
      font-size: 12px;
      display: flex;
      padding: 10px 0;
      justify-content: space-between;
      h3{
        color: rgb(10,36,99);
      }
    }
    .list_left, .list_right{
      color: rgba(10,36,99,0.3);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    .list_left h3 span{
      color: rgb(191,197,210);
    }
    .profit .list_right{
      text-align: right;
    }
  }

</style>
