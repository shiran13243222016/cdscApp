<template>
    <div class="block">
        <header>
            <span @click="goBack" class="arrow">←</span><span>提币</span>
        </header>
        <div class="back">
            <div class="back_box"></div>
        </div>
        <section>
            <span></span>
            <p><span>最小提币数量：{{outgoFeeMin}} USDT</span><br/> <span>注：提币申请需要1～2个工作日完成审核</span></p>
            <div class="section_top">
                <span>小白交易所 </span>
                <!--        <popup-picker :title="title" :data="list1" @on-change="onChange" placeholder="选择交易所"></popup-picker>-->
            </div>
            <div class="section_block">
                <div class="left_block">
                    <div style="margin-top:10px;">数量 &nbsp;&nbsp;可用 {{ balances?balances:0}} USDT</div>
                    <div class="label_block">
                      <x-input :max="balances" :show-clear="false" class="x_number" keyboard="number" placeholder="输入数量"
                               ref="amount" required type="number" v-model="amount_number"></x-input>
                    </div>
                </div>
                <div class="right_block cursor" @click="whole">
                    全部
                </div>
            </div>
            <div class="section_block">
                <div>
                    <p>到账数量</p>
                    <p>{{accounmount}} USDT</p>
                </div>
            </div>
            <div class="section_block">
                <div>
                    <p>手续费</p>
                    <p>{{poundage}} USDT</p>
                </div>
            </div>
          <div @click="takeCoin" class="submit">提币</div>
        </section>

    </div>
</template>
<script>
    import {PopupPicker,XInput,numberComma} from 'vux';

    export default {
        name: "TakeCoin",
        components: {
            // eslint-disable-next-line vue/no-unused-components
            PopupPicker,XInput
        },
        computed:{
            accounmount () {
                let am_numbers=this.amount_number;
                let accountMOunt=0;
                if(am_numbers){
                    accountMOunt=am_numbers-this.poundage
                };
                return numberComma(accountMOunt)
            },
            poundage (){
                let am_numbers=this.amount_number;
                let outgoFeeRate=this.walletinfo.outgoFeeRate;
                let formalities=0;
                if(am_numbers){
                   formalities=am_numbers*outgoFeeRate
                }
                return formalities
            },
        },
        data() {
            return {
                list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
                title: '小白交易所',
                amount_number: '',
                walletinfo:{
                    balance: 0 ,
                    outgoFeeRate:''
                },
                balances:0,
							onfocus: true
            }
        },
        created(){
          this.getcoinfo();
          this.getAllbalance();
        },
        methods: {
            //返回上一页
            goBack() {
              this.$router.push('/wallet')
            },
            //选择交易所
            onChange(val) {
                this.title = val[0];
            },
            // 点击全部，获取全部金额
            whole() {
                this.amount_number = this.balances;
            },
            getAllbalance(){
                this.RestClient('GET_MANY_REFERENCE', '/wallet/detail').then((res) => {
                    if (res.data.code == 200) {
                        this.walletinfo.balance = parseFloat(res.data.data.balance);
                        this.balances=parseFloat(res.data.data.balance)
                    }
                })
            },
            getcoinfo(){
                this.RestClient('GET_MANY_REFERENCE', '/wallet/outgo/config').then((res) => {
                    if (res.data.code == 200) {
                        this.walletinfo = {
                            outgoFeeRate: parseFloat(res.data.data.outgoFeeRate),
                        };
                        this.outgoFeeMin = res.data.data.outgoFeeMin
                    }
                })
            },
            // 提币
            takeCoin() {
                if(!this.amount_number){
                  this.$vux.toast.text('请输入提币数量', 'middle')
                    return
                }
                let params = {
                    amount:this.amount_number
                };
                this.RestClient('CREATE', '/wallet/outgo', params).then((res) => {
                    if (res.data.code == 200) {
                      this.$vux.toast.show({
                        type: 'success',
                        text: '提币成功'
                      });
                      this.$router.push('/wallet')
                    }
                })
            }
        }
    }
</script>
<style scoped>

    .block {
        padding-top: 45px;
    }

    .x_number{
        width:235px;
    }

    header {
        color: #fff;
        height: 47px;
        display: flex;
        padding: 0 20px;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgb(22, 26, 55);
    }
    header .arrow{
      font-weight: bolder;
      font-size: 24px;
      margin-top: -5px;
    }
    header span {
      font-size: 17px;
      margin-right: 14px;
    }

    .back {
        height: 100px;
        background: rgb(22, 26, 55);
        position: relative;
        z-index: -1;
    }

    .back .back_box {
        width: 90%;
        background: #cccccc;
        margin: 0 auto;
        height: 40px;
        position: absolute;
        left: 5%;
        top: 0;
        border-radius: 20px;
    }

    .section_block {
        background: #fff;
        height: 60px;
        margin: 20px -20px 0;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
      color: #999999;
    }

    .section_block .left_block {
        display: inline-block;
    }

    .section_block .right_block {
        background: rgb(255, 196, 0);
        height: 60px;
        width: 68px;
        text-align: center;
        line-height: 60px;
        color: #fff;
        margin-right: -20px;
        touch-action: none;
    }

    .section_block .label_block {
        color: rgb(10, 36, 99);
      margin-left: -13px;
    }

    .section_block input {
        color: rgb(10, 36, 99);
    }

    section {
        margin-top: -88px;
        background: rgb(245, 246, 246);
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        padding: 10px 20px 40px;
        display: flex;
        flex-direction: column;
    }

    .section_top {
        background: #fff;
        height: 60px;
        line-height: 60px;
        margin: 0 -20px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
    }

    .section_top .vux-cell-box {
        width: 100%;
        display: flex;
        align-items: center;
    }

    .section_top >>> .weui-cell_access {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .section_top .weui-cell {
        padding: 0;
    }

    .submit {
        color: #fff;
        background-color: rgb(255, 196, 0);
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
        touch-action: none;
        border:none;
      margin-top: 50px;
    }


    section > p {
        background: rgb(246, 228, 204);
        padding: 10px 0 10px 20px;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    section > span {
        margin: 0 auto 20px;
        border-radius: 3px;
        display: block;
        width: 15%;
        height: 5px;
        background: rgb(229, 229, 229);
    }
</style>
