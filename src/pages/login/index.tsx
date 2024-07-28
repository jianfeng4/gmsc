/* eslint-disable react/jsx-no-undef */
import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image } from '@tarojs/components'
import { weChatLogin } from '@/actions/simple/login' // 导入封装的登录服务
import { cacheSet, cacheGet } from '@/cache'
import './index.less'
// 引入样式文件
export default function Login() {
  const handleWeChatLogin = () => {
    Taro.login({
      success: function (res) {
        console.log('WeChat login successful', res)
        if (res.code) {
          console.log('🚀 ~ handleWeChatLogin ~ res.code:', res.code)
          const data = {
            loginCode: res.code,
            state: 'aaaaaaaa-7425-4155-9894-9d5c08541d62',
            phoneCode: '13026883820',
          }

          weChatLogin(data)
            .then((response) => {
              console.log('Login successful', response)
              const { accessToken } = response
              if (accessToken) {
                cacheSet({
                  key: 'token',
                  data: accessToken,
                }).then(() => {
                  cacheGet({
                    key: 'token',
                  }).then((res) => {
                    console.log('🚀 ~ .then ~ res111!!!!!!!:', res)
                  })
                })
              }
              console.log('🚀 ~ .then ~ token:', accessToken, response)
              Taro.switchTab({
                url: '/pages/home/index',
              })
            })
            .catch((error) => {
              console.error('Request failed', error)
            })
        } else {
          console.log('WeChat login did not return code.')
        }
      },
    })
  }

  return (
    <View>
      <View className="logo-container">
        <Image
          src="https://img.yzcdn.cn/vant/logo.png"
          className="logo"
        ></Image>
      </View>
      <Button className="button" onClick={handleWeChatLogin}>
        微信一键登录
      </Button>
    </View>
  )
}
