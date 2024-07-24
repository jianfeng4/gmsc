export type TProxy = 'warning' | 'info'
export type IPrefix = keyof typeof domain.real

export type IPathName<
  T extends string,
  K extends string,
> = T extends `/${K}${infer R}` ? `/${K}${R}` : never

export type IHref<T extends string> = T extends `https://${infer R}`
  ? `https://${R}`
  : T extends `http://${infer R}`
  ? `http://${R}`
  : never

/************************************************** */
/** 上半部分类型，下半部分逻辑 */
/************************************************** */

const domain = {
  real: 'http://47.101.42.99',
  pre: 'http://47.101.42.99',
  stable: 'http://47.101.42.99',
  dev: 'http://47.101.42.99',
}

export default domain
