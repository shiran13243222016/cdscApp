<template>
  <div class="block">
    <header>
      <span @click="goBack" class="arrow">←</span><span>硬盘</span>
    </header>

    <div class="back">
      <div class="back_box"></div>
    </div>
    <div class="content">
      <div class="select_item" v-for="(item, index) in diskInfo.disks" :class="{'active':ind === index, 'styleObject': item.state < 2}" @click="selected(item,index)" >
        <div class="item_left2" v-if="ind === index">
          <p></p>
        </div>
        <div class="item_left" v-else></div>
        <div class="item_right">
          <p>{{item.name}}</p>
          <span>总共 {{(item.size /1000/1000/1000).toFixed(2)}}GB</span>
        </div>
      </div>
      <div class="footer cursot" @click="submit">确定</div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    data() {
      return {
        ind: Number,
        disks: [],
        disable: true
      }
    },
    computed:{
      diskInfo() {
        return this.$store.state.gateway.diskInfo || {};
      }
    },
    created(){
      let disksOn = this.$route.query.disksOn;
      let disksed = this.$route.query.disksed;
      _.each(this.diskInfo.disks, (value,key)=>{
      	console.log(value,key)
        if(value.uuid == disksOn.uuid){
					this.ind = parseInt(key);
					this.disks = disksOn;
        }
				if(value.uuid == disksed.uuid) {
					this.ind = parseInt(key);
					this.disks = disksed;
				}
      });
    },
    methods: {
      // 选中磁盘
      selected(item, index){
        if (item.state == 2 && item.mount != '') {
          this.ind = index;
          this.disks = item;
          this.disable = false;
        }else if(item.state == 1) {
          this.$vux.confirm.show({
            title: '该硬盘未挂载',
            content: '请先挂载',
            onCancel : () => {
              console.log('取消') //当前 vm
            },
            onConfirm : () => {
              this.$vux.loading.show({
                text: 'Loading'
              });
              let msg = {
                iotId: "diskInfo",
                attribute: "importFs",
                act: 'w',
                value: item.name,
                options:{
                  timeout:20000
                }
              };
              this.wsClinet.sendRequest(msg).then((res)=>{
                this.$vux.loading.hide();
                this.$vux.toast.show({
                  text: '挂载成功'
                });
                this.ind = index;
                this.disks = item;
              }).catch((e)=>{
                this.$vux.loading.hide();
                console.log(e)
              })
            }
          })
        }else if(item.state == 0) {
          this.$vux.confirm.show({
            title: '该硬盘未格式化',
            content: '请先格式化后使用',
            onCancel : () => {
              console.log('取消') //当前 vm
            },
            onConfirm : () => {
              this.$vux.loading.show({
                text: 'Loading'
              });
              let msg = {
                iotId: "diskInfo",
                attribute: "createFs",
                act: 'w',
                value: item.device,
                options:{
                  timeout: 90000
                }
              };
              this.wsClinet.sendRequest(msg).then((res)=>{
                this.$vux.loading.hide();
                this.$vux.toast.show({
                  text: '格式化成功'
                });
                this.ind = index;
                this.disks = item;
              }).catch((e)=>{
                this.$vux.loading.hide();
                console.log('格式化失败')
              })
            }
          })
        }
      },

      // 提交选中
      submit() {
        if(this.disks == false) {
          this.$vux.toast.text('请先选中磁盘', 'middle')
        }else {
          this.$router.push({
            path:'/detail',
            query:{
              curIndex: 2,
              disks: this.disks,
              ind: this.ind,
              item: this.$route.query.item
            }
          });
        }
      },


      goBack(){
        this.$router.push({
          path:'/detail',
          query:{
            curIndex: 2 ,
            item: this.$route.query.item,
            // disks: this.$route.query.disksOn
          }
        })
      }
    }

  }
</script>

<style lang="less" scoped>
.block {
  padding-top: 45px;
  header{
    color: #fff;
    height: 45px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 0 20px;
    background: #161A37;
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
  .back {
    height: 100px;
    background: #161A37;
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
  .content {
    min-height: 580px;
    box-sizing: border-box;
    padding: 15px;
    margin-top: -88px;
    border-radius: 20px;
    background: rgb(244,245,245);
    .active{
      border: 1px solid rgb(255,193,22) !important;
    }
    .styleObject {
      color: #999999;
    }
    .select_item{
      height: 68px;
      border: 1px solid rgb(224,224,224);
      box-sizing: border-box;
      border-radius: 5px;margin-bottom: 20px;
      display: flex;
      align-items: center;
      .item_left{
        border: 1px solid rgb(227,230,238);
      }
      .item_left,.item_left2{
        width: 24px;height: 24px;
        display: inline-block;
        border-radius: 50%;
        margin-left: 20px;
      }
      .item_left2{
        border: 1px solid rgb(255,193,22);
        padding: 1px;
        box-sizing: border-box;
        p{
          width: 20px;height: 20px;
          border-radius: 50%;
          background: rgb(255,193,22);
        }
      }
      .item_right{
        display: inline-block;
        margin-left: 20px;
        p{
          font-size: 14px;
        }
        span{
          font-size: 13px;
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: rgb(255,196,0);
      color: #fff;border-radius: 4px;
      height: 50px;
      text-align: center;
      line-height: 50px;

    }

  }
}
</style>
