<template>
  <div>
    <van-nav-bar title="黑马头条" fixed />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 绑定当前频道 -->
      <van-tabs v-model="activeChannelIndex" swipeable>
        <van-tab

         v-for="item in channels"
          :title="item.name"
          :key="item.id"
          >
          <!-- 列表 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in item.articles" :key="item.art_id" :title="item.title">
              <!-- 自定义label内容区域使用插槽 -->
              <div slot="label">
                <!-- 图片区域 -->
                <van-grid :border="false" :column-num="3" v-if='item.cover.type'>
                  <van-grid-item  v-for="(item,index) in item.cover.images" :key='index'>
                    <!-- 实现图片懒加载 -->
                    <van-image lazy-load :src='item' />
                  </van-grid-item>

                </van-grid>
                <p>
                  <span>{{item.aut_name}}</span>
                  <span>{{item.comm_count}}评论</span>
                  <!-- //使用过滤器改变时间格式 -->
                  <span>{{item.pubdate|fmtDate}}</span>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel.js'
import { getArticle } from '@/api/article.js'
export default {
  data () {
    return {
      // 当前频道索引
      activeChannelIndex: 0,
      list: [],
      // 下拉刷新
      loading: false,
      finished: false,
      isLoading: '',
      channels: []
      // 动态给每个频道都设置了时间戳,所以不再公用一个时间戳
      // timestamp: Date.now()
    }
  },
  created () {
    this.getchannel()
    // console.log(this)
    // console.log(this.channels)
  },
  methods: {

    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 加载频道列表
    async getchannel () {
      try {
        // 从store中获得登录信息
        // console.log(this.$store.state.user)
        const user = this.$store.state.user
        // 如果user有token和refresh,说明用户已经登陆
        if (user) {
          // 获取频道列表
          const data = await getUserChannels()
          // console.log(data)
          this.channels = data.channels
          // console.log(this.channels)
        } else {
          // 如果没有登录先从本地存储获取数据,
          // 如果没有载发送请求,然后再把请求到的数据存储到本地
          this.channels =
            JSON.parse(window.localStorage.getItem('channels')) || []
          if (this.channels.length === 0) {
            const data = await getUserChannels()
            this.channels = data.channels
            window.localStorage.setItem(
              'channels',
              JSON.stringify(this.channels)
            )
          }
        }
        this.channels.forEach(item => {
          // 这里动态添加的文章不是响应式的
          // item.articles = []
          // 使用$set可以解决这一问题
          // 1给谁添加  2 添加什么属性  3 添加什么
          // 这样动态添加的数据就是响应式的
          this.$set(item, 'articles', [])
          // 这里动态给每个频道加一个时间戳,以便于显示数据时,用自己的时间戳
          item.timestamp = Date.now()
        })
      } catch (err) {
        this.$store.fail('获取频道列表失败' + err)
      }
    },
    // 获取文章列表
    async onLoad () {
      // 设置一个延时使得再次请求数据时,有一个延时效果
      await this.$sleep(1000)
      // 加载数据之前this.loading=true
      //   // 获取频道id
      console.log(this.channels)
      const activechannel = this.channels[this.activeChannelIndex]
      //   //   id为

      // console.log(activechannel)
      const id = activechannel.id
      const data = await getArticle({
        channelId: id,
        timestamp: activechannel.timestamp
      })
      console.log(data)
      activechannel.articles.push(...data.results)
      // this.timestamp = data.pre_timestamp
      // 这里如果把this.loading=false注释掉,页面数据就不会显示,但是频道中的文章数据实际是有的
      // 这是因为动态添加的数据不是响应式的,通过$set,即使注释也会显示数据
      // 这里如果加上this.loading=false ,上面添加属性即使不用$set,里面的数据也会显示在页面,
      // 这是因为在第一次请求10条数据没有填满屏幕就会请求第二次,这时已经把数据变成了响应式的,这我们是看不到的
      // 所以,为了更好的显示数据,以后直接使用$set来设置动态生成的数据
      this.loading = false
      // 判断请求的数据是否有数据,如果没有,就把finished设置为true
      if (data.results.length === 0) {
        this.finished = true
      }
      // this.finished = true
      // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }
      //     // 加载状态结束
      //     this.loading = false

      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 1000)
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
span {
  padding: 0 20px;
}
</style>
