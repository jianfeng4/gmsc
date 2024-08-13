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
      <Container navTitle="我的名片" className="pages-pagination-index">
        <View>
          <CellGroup title="名片">
            <Image
              round
              width="50px"
              height="50px"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <Cell title={'姓名：' + detail.userName} />
            <Cell title={'电话：' + detail.mobile} />
            <Cell title={'职务：' + detail.workDescribe} />
            <Cell title={'就职企业：' + detail.supplierName} />
          </CellGroup>

          <CellGroup title="常用功能">
            <Cell
              isLink
              title="企业通信录"
              linkType="navigateTo"
              url="/pages/contact/index"
            />
            <Cell
              isLink
              title="推荐明细"
              linkType="navigateTo"
              url="/pages/recommend/index"
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
