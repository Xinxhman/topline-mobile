
import axios from 'axios'
// 分装request
const request = axios.create({
  baseURL: ' http://ttapi.research.itcast.cn'

})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data

  // 更方便的让外面获得响应中的数据
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
