import request from '@/utils/request'

export const getArticle = ({
  channelId,
  timestamp = Date.now(),
  withTop = 1
}) => {
  return request.get('/app/v1_1/articles', {
    // 这里的params 其实不是真正的params数据,真实的是query数据,在这里只是这么写了,看接口文档可以判断是什么数据
    // params 实在路径后面直接'/123'这种写法,而query是在路径后面加'?123'这种写法
    params: {
      channel_id: channelId,
      timestamp: timestamp,
      with_top: withTop
    }
  })
}
