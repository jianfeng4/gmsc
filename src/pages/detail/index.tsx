import type { IProps as IDetail } from '../home/components/card'
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
        <Text className="title">{detail?.['itemName']}</Text>
        <Divider className="divider" />
        <View className="sub-title">基本信息</View>

        <View className="base-info">
          <Row className="custom-row">
            <Col span={6}>
              <Text>采购数量</Text>
            </Col>
            <Col span={18}>
              <Text>{detail['itemNumber']}</Text>
            </Col>
          </Row>
          <Row className="custom-row">
            <Col span={6}>
              <View>采购类目</View>
            </Col>
            <Col span={18}>
              <View>{detail.packageGranularity}</View>
            </Col>
          </Row>
          <Row className="custom-row">
            <Col span={6}>
              <View>有效期</View>
            </Col>
            <Col span={18}>
              <View>{detail.createdTime}</View>
            </Col>
          </Row>
          <Row className="custom-row">
            <Col span={6}>
              <View>规格说明</View>
            </Col>
            <Col span={18}>
              <View>{detail.itemSpecs}</View>
            </Col>
          </Row>
        </View>

        <View className="sub-title">样例图片</View>
        <View className="image-preview">
          {/* {detail?.appendix?.map((item, index) => {
            return (
              <View key={index} className="image-item">
                <Image src={item?.path} mode="widthFix" />
              </View>
            )
          })} */}
          {[
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.WaaF9IEA0F4wG6SVGqvQ3QHaHa?rs=1&pid=ImgDetMain',
            'https://cbu01.alicdn.com/img/ibank/2018/039/658/9096856930_1461188323.jpg',
          ].map((item, index) => {
            return (
              <View key={index} className="image-item">
                <Image src={item} mode="widthFix" />
              </View>
            )
          })}
        </View>

        <Divider className="divider" />
        <Row>
          <View className="button-wrapper">
            <Button className="button share">分享</Button>
            <Button className="button primary" onClick={handleClick}>
              我要报价
            </Button>
          </View>
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
