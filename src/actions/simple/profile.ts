import { createFetch } from '@/utils/request'
import { IResponseData } from './commonTypes/response'

// 我的名片
export const getMyCard = createFetch<any, IResponseData<any>>(
  '/gmsc/wxUser/user/card',
  'GET',
)
// 企业通讯录列表
export const getSupplyContact = createFetch<any, IResponseData<any>>(
  '/gmsc/wxUser/supplier/list',
  'GET',
)

// 新增企业
export const addNewSupply = createFetch<any, IResponseData<any>>(
  '/gmsc/wxUser/supplier/add',
  'POST',
)
// 修改企业信息
export const updateSupply = createFetch<any, IResponseData<any>>(
  '/gmsc/wxUser/supplier/update',
  'POST',
)

// 设置为用户就职企业
export const setUserSupply = createFetch<any, IResponseData<any>>(
  '/gmsc/wxUser/supplier/active',
  'GET',
)
// 删除用户企业
export const deleteUserSupply = createFetch<any, IResponseData<any>>(
  '/gmsc/wxUser/supplier/delete',
  'GET',
)
// 推荐人列表
export const getRecommendList = createFetch<any, IResponseData<any>>(
  '/gmsc/wxUser/recommend/list',
  'GET',
)
