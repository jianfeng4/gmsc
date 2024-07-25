import type { IProps as IDetail } from '../pagination/components/card'
import { Unite } from '@antmjs/unite'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useEffect } from 'react'
import { Row, Col, Tag, Divider, Button } from '@antmjs/vantui'
import { useRouter } from '@/hooks'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import { getCosKeyCommon } from '@/actions/simple/common'

import './index.less'

const PAGE_SIZE = 10

export default Unite(
  {
    state: {
      detail: {} as IDetail,
    },
    async onLoad() {
      await this.fetchDataWithId()
    },
    async fetchDataWithId() {
      console.log(this.location.params)
      // const { params } = router
      const { id } = this.location.params // 获取路由参数中的id
      const data = (await getCosKeyCommon({ id })) as any
      console.log('🚀 ~ fetchDataWithId ~ data:', data)
      this.setState({ detail: data })
      // console.log('🚀 ~ fetchDataWithId ~ id:', id)
      // this.setState({ id }) // 更新状态中的id
      // 如果需要根据id重新加载列表，可以在这里调用loadList或其他相关函数
      // this.loadList();
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
