// 操作本地存储,把读写用户封装

// 设置用户
export const setUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

// 读取
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem('user'))
}
// 移除
export const removeUser = () => {
  return JSON.parse(window.localStorage.getItem('user'))
}
