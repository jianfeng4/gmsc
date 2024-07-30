import type { IProps as IDetail } from '../home/components/card'
import { Unite } from '@antmjs/unite'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useEffect } from 'react'
import {
  Row,
  Col,
  Tag,
  Divider,
  Button,
  CellGroup,
  Cell,
  Image,
} from '@antmjs/vantui'
import { useRouter } from '@/hooks'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import { getMyCard, type IUserCardData } from '@/actions/simple/profile'

import './index.less'
import { cacheGet } from '@/cache'

const PAGE_SIZE = 10

export default Unite(
  {
    state: {
      detail: {} as IUserCardData,
    },
    async onLoad() {
      await this.fetchMyCard()
    },
    async fetchMyCard() {
      const data = await getMyCard({})
      this.setState({ detail: data })
    },
  },
  function ({ state, events, loading }) {
    const { detail } = state
    console.log('🚀 ~ detail:', detail)
    const { setState } = events

    const handleClick = () => {
      // Taro.navigateTo({
      //   url: `/pages/offer/index?packageId=${detail.packageId}&id=${detail.id}`,
      // })
    }
    return (
      <Container navTitle="推荐明细" className="pages-pagination-index">
        <View>
          <CellGroup>
            <View className="info-title">名片</View>
            <Image
              round
              width="50px"
              height="50px"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <View>姓名：{detail.userName}</View>
            <View>电话：{detail.mobile}</View>
            <View>职务：{detail.workDescribe}</View>
            <View>就职企业：{detail.supplierName}</View>
          </CellGroup>

          <CellGroup>
            <View className="info-title">成绩</View>
            <View>收益：</View>
            <View>积分：</View>
          </CellGroup>

          <CellGroup>
            <View className="info-title">常用功能</View>
            <Cell
              isLink
              title="企业通信录"
              linkType="navigateTo"
              url="/pages/dashboard/index"
            />
          </CellGroup>
        </View>
      </Container>
    )
  },
  { page: true },
)

definePageConfig({
  // 这里不要设置标题，在Container组件上面设置
  navigationBarTitleText: '',
})
