<template>
  <div id="app-box">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    if (window.history && window.history.pushState) {
      window.addEventListener('popstate', function () {
        window.history.pushState('forward', null, '#');
        window.history.forward(1);
      });
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import "./assets/css/main.css";

body {
  background: rgb(246,247,247);
  font-size: 13px;
}
.weui-cells {
  background: rgb(246,247,247) !important;
}

.vux-button-group > a.vux-button-group-current {
  color: #fff !important;
}
.vux-check-icon, .weui-icon-success:before, .vux-check-icon, .weui-icon-success-circle:before{
  color: rgb(254,185,7) !important;
}
</style>
