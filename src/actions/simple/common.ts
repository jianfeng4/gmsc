import { createFetch } from '@/utils/request'
import { IResponseData } from './commonTypes/response.d'

export const getRoleListCommon = createFetch<any, IResponseData<any>>(
  '/gmscPackageItem/page',
  'POST',
)

export const getCosKeyCommon = createFetch<any, IResponseData<any>>(
  '/gmscPackageItem/detail',
  'GET',
)

export const loginCommon = createFetch<any, IResponseData<any>>(
  '/box/common/1.0/login',
  'POST',
)

export const getSupplyList = createFetch<any, IResponseData<any>>(
  '/gmscSupplier/query',
  'POST',
)
