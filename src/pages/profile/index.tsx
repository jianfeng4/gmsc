import type { IProps as IDetail } from '../home/components/card'
import { Unite } from '@antmjs/unite'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useEffect } from 'react'
import { Row, Col, Tag, Divider, Button } from '@antmjs/vantui'
import { useRouter } from '@/hooks'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import { getMyCard } from '@/actions/simple/profile'

import './index.less'

const PAGE_SIZE = 10

export default Unite(
  {
    state: {
      detail: {} as IDetail,
    },
    async onLoad() {
      await this.fetchMyCard()
    },
    async fetchMyCard() {
      const data = (await getMyCard({})) as any
      console.log('🚀 ~ fetchDataWithId ~ data:', data)
      this.setState({ detail: data })
    },
  },
  function ({ state, events, loading }) {
    const { detail } = state
    console.log('🚀 ~ detail:', detail)
    const { setState } = events

    // const { params } = useRouter()
    // setState({ id: params[id] })
    const handleClick = () => {
      Taro.navigateTo({
        url: `/pages/offer/index?packageId=${detail.packageId}&id=${detail.id}`,
      })
    }
    return (
      <Container navTitle="采购详情" className="pages-pagination-index">
        <View>{detail?.['itemName']}</View>
        <Divider />

        <View>基本信息</View>
        <View>
          <Row>
            <Col span={6}>
              <View>采购数量</View>
            </Col>
            <Col span={18}>
              <View>{detail['itemNumber']}</View>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <View>采购类目</View>
            </Col>
            <Col span={18}>
              <View>{detail.packageGranularity}</View>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <View>有效期</View>
            </Col>
            <Col span={18}>
              <View>{detail.createdTime}</View>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <View>规格说明</View>
            </Col>
            <Col span={18}>
              <View>{detail.itemSpecs}</View>
            </Col>
          </Row>
        </View>
        <Divider />
        <View>样例图片</View>
        {detail?.appendix?.map((item, index) => {
          console.log('🚀 ~ {detail?.appendix?.map ~ item:', item)
          return (
            <View key={index}>
              <Image src={item?.path} mode="widthFix" />
            </View>
          )
        })}
        <Divider />
        <Row>
          <Col span={12}>
            <Button>分享</Button>
          </Col>
          <Col span={12}>
            <Button type="primary" onClick={handleClick}>
              我要报价
            </Button>
          </Col>
        </Row>
      </Container>
    )
  },
  { page: true },
)

definePageConfig({
  // 这里不要设置标题，在Container组件上面设置
  navigationBarTitleText: '',
})
