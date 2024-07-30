import type { IPathName, IHref, TProxy } from './constants'
import { hideLoading } from '@tarojs/taro'
import { EMlf } from '@antmjs/trace'
import { monitor } from '@/trace'
import { cacheGetSync } from '@/cache'
import DOMAIN from './constants'
// 注意：下面三个方法的调用不需要处理reject的场景，内部对请求做了封装，统一抛出到resolve内
import _request from './innerRequest'
import _thirdRequest from './thirdRequest'
// import _tencentUpload from './tencentUpload'

function sendMonitor(option: any, res: any) {
  const params = {
    d1: option.url,
    d2: JSON.stringify(option),
    d3: res.status,
    d4: res.code,
    d5: JSON.stringify(res),
  }
  if (process.env.NODE_ENV === 'development') {
    console.error('development:requestCatch', option, res)
  }
  monitor(EMlf.api, params)
}

function url(option: Taro.request.Option) {
  const domain = DOMAIN[process.env.API_ENV]
  // 暂时先不支持缓存，优化的时候再处理吧
  option.url =
    domain +
    option.url +
    (option.url.indexOf('?') > -1 ? `&t=${+new Date()}` : `?t=${+new Date()}`)
}

function header(option: Taro.request.Option) {
  const header = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'X-M-VERSION': process.env.DEPLOY_VERSION,
    'X-M-TYPE': process.env.TARO_ENV,
    'x-m-app': 'custom',
    'x-m-token': cacheGetSync('token') || '',
    Token: cacheGetSync('token') || '',
    // Token:
    //   'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJDdXJyZW50Q29tcGFueUlkIjoiMTgwNzI0MDMzMzEzMDQ2NTQwIiwiQ3VycmVudERlcHRJZCI6IiIsIlV1aWQiOiIxNzg1MDI3MC1lMTZmLTQzZTAtOWM1MC0xYTBhZTg1ZTEwMzEiLCJVc2VySWQiOiI1MjEyMjU4NDUwODQ0MzIzODkiLCJ3eE9wZW5JZCI6Im9MZFdUNl9BSkI1VnZnbEdlVzA3d2J1UXc2cjgiLCJDdXJyZW50VG9wQ29tcGFueUlkIjoiMTQ1MTUzMjY2NzY1NTgxNTE2OCIsIkVtcGxveWVlSWQiOiI1MjEyMjU4NDUwODQ0MzIzOTAiLCJpYXQiOjE3MjIxNjE4ODIsIm5iZiI6MTcyMjE2MTg4MiwiZXhwIjoxNzUzNjk3ODgyfQ.IvD-zpxpDEHP-t7Ctb50B-b2wf7JRnfbdo977s6oS4s',
  }
  option.header = header
}

function request<
  T extends Omit<Taro.request.Option, 'success' | 'fail' | 'header'>,
  M extends TProxy,
>(
  query: {
    [K in keyof T]: K extends 'url' ? IPathName<T[K], string> : T[K]
  },
  type?: M,
): Promise<M extends 'info' ? CreateFetchResponse<any> : any> {
  // warning: 直接内部帮你做了toast
  // info：直接把整个数据返回给请求的await结果
  url(query)
  header(query)
  return _request(query).then((res) => {
    if (res.code !== '200') {
      sendMonitor(query, res)
    }

    if (res.code === '200') {
      if (type === 'info') {
        return res
      } else {
        return res.data
      }
    } else {
      if (type === 'info') {
        return res
      } else {
        try {
          hideLoading()
        } catch {}
        throw res
      }
    }
  })
}

// 只处理response.data为json的情况,其他返回都属于异常
// 自动化使用的方法
export function createFetch<
  REQ extends Record<string, any>,
  RES extends Record<string, any>,
>(url: any, method: any) {
  return <T extends TProxy = 'warning'>(
    data: REQ,
    type?: T,
  ): Promise<
    T extends 'info' ? CreateFetchResponse<RES['data']> : RES['data']
  > => {
    return request(
      {
        url,
        method,
        data: data,
      },
      type,
    )
  }
}

export function thirdRequest<
  T extends Omit<Taro.request.Option, 'success' | 'fail'>,
>(query: {
  [K in keyof T]: K extends 'url' ? IHref<T[K]> : T[K]
}) {
  return _thirdRequest(query).then((res) => {
    if (res.code !== '200') {
      sendMonitor(query, res)
    }
    return res
  })
}

// 暂时只支持微信小程序环境
// export function tencentUpload(filePath: any, filename: string, index?: number) {
//   return _tencentUpload(filePath, filename, index).then((res) => {
//     if (res.code !== '200') {
//       sendMonitor(filePath + '_' + filename, res)
//     }
//     return res
//   })
// }
