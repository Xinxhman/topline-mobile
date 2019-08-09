import request from '@/utils/request'

export const getUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}
