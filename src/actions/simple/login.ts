import { createFetch } from '@/utils/request'
import { IResponseData } from './commonTypes/response.d'

export const weChatLogin = createFetch(
  '/anyTenant/auth/weixin-mini-app-login',
  'POST',
)
