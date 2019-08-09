<template>
  <div>
    <van-nav-bar title="黑马头条" fixed />
    <van-pull-refresh v-model="isLoading">
      <van-tabs v-model="active" swipeable>
        <van-tab fixed v-for="item in channels" :title="item.name" :key="item.id"></van-tab>
      </van-tabs>
      <!-- 列表 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel.js'
export default {
  data () {
    return {
      active: '',
      list: [],
      loading: false,
      finished: false,
      isLoading: '',
      channels: []
    }
  },
  created () {
    this.getchannel()
    // console.log(this.channels)
  },
  methods: {
    async getchannel () {
      // 从store中获得登录信息
      const data = await getUserChannels()
      console.log(data)
      this.channels = data.channels
    },
    onLoad () {
    // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }

}
</script>

<style lang='less' scoped>
.van-tabs {
  margin-top: 100px;
}
.van-pull-refresh {
  /deep/.van-pull-refresh__track {
    margin-bottom: 100px;
  }
}
</style>
