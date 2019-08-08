<template>
  <div id="app">
    <div id="nav">
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
    <div class="navdiv"></div>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
.navdiv{
  width:750px;
  height: 60px;
  background-color: red;
}
</style>
