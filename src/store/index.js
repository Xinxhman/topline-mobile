import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, setUser } from '@/utils/auth'
// import *as auth from '@/utils/auth'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 初始化的时候直接从本地存乎中获得登录状态 防止刷新丢失 token
    user: getUser()
  },
  mutation: {
    setUser (state, user) {
      state.user = user
      // 存储到本地存储中
      setUser(user)
    }
  },
  actions: {

  }
})
