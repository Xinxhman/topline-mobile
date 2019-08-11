import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 汉化
import 'dayjs/locale/zh-cn' // 按需加载

dayjs.locale('zh-cn') // 全局使用西班牙语
dayjs.extend(relativeTime)

Vue.filter('fmtDate', (value) => {
  return dayjs().to(dayjs())
})
