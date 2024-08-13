import { createFetch } from '@/utils/request'
import { IResponseData } from './commonTypes/response'
export interface IUserCardData {
  userId: string
  userName: string
  userAvatar: null | string // 用户头像可能是null或字符串
  mobile: string
  workDescribe: string
  supplierId: string
  supplierName: string
}
export interface ISupplierContactData {
  [x: string]: string
  id: string
  supplierName: string
  supplierType: string
  supplierIntroduction: string
  supplierProductKeywords: string
  supplierOutputValue: string
  supplierLicense: string
  fromSource: string
  fromUserId: string
  addressCode: null
  addressName: null
  addressShotName: null
  addressDetail: null
  contactUserName: null
  contactUserPhone: null
  active: 'true' | 'false' // 布尔字符串，只接受 'true' 或 'false'
}

export interface IRecomUser {
  id: string // 假设id是字符串类型
  username: string
  workDescribe: string | null // 假设workDescribe是字符串或者null
}

// 使用接口类型定义数组
type IRecomUserList = IRecomUser[]
// 我的名片
export const getMyCard = createFetch<any, IResponseData<IUserCardData>>(
  '/gmsc/wxUser/user/card',
  'GET',
)
// 企业通讯录列表
export const getSupplyContact = createFetch<
  any,
  IResponseData<ISupplierContactData[]>
>('/gmsc/wxUser/supplier/list', 'GET')

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
export const getRecommendList = createFetch<any, IResponseData<IRecomUserList>>(
  '/gmsc/wxUser/recommend/list',
  'GET',
)
