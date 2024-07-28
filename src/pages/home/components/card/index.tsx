import { ReactNode } from 'react'
import { View, Image } from '@tarojs/components'
import { Row, Col, Tag, Divider } from '@antmjs/vantui'

import './index.less'
import Taro from '@tarojs/taro'
type Appendix = {
  bizId: string
  bizType: string
  fileType: string
  bucket: string
  path: string
  originalFileName: string
  contentType: string
  size: number
  id: string
  createdTime: string
}

export type IProps = {
  id: string
  createdTime: string
  createdBy: string | null
  updatedTime: string
  updatedBy: string | null
  echoMap: Record<string, any>
  packageId: string
  packageNo: string
  packageType: string
  userId: string | null
  fromUserId: string
  categoryId: string
  itemName: string
  itemNumber: string
  itemSpecs: string
  itemStatus: string
  effectTime: string
  addressCode: string
  addressName: string | null
  addressShotName: string | null
  addressDetail: string
  contactUserName: string
  contactUserPhone: string
  suggest: string
  suggestSort: string | null
  deleted: boolean
  packageGranularity: string | null
  appendix: Appendix[]
}

export default function Index({ info }: { info: IProps }) {
  const { itemName, itemNumber, effectTime, addressDetail, appendix, id } = info
  console.log('🚀 ~ Index ~ appendix:', appendix)
  const handleItemClick = (id: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    })
  }
  return (
    <View
      onClick={() => {
        handleItemClick(id)
      }}
    >
      <Row gutter="20">
        <Col span="8" className="dark">
          <Image
            src={appendix?.[0]?.path as string}
            className="card-image"
          ></Image>
        </Col>
        <Col span="16" className="dark">
          <Row>
            <Col span="16" className="dark">
              <View className="card-name">{itemName}</View>
            </Col>
            <Col span="8" className="dark">
              <View>
                <Tag type="primary" size="large">
                  询价中
                </Tag>
              </View>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <View className="card-text">数量</View>
            </Col>
            <Col span="16">
              <View className="card-text">{itemNumber}</View>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <View className="card-text">有效期</View>
            </Col>
            <Col span="16">
              <View className="card-text">{effectTime}</View>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <View className="card-text">地址</View>
            </Col>
            <Col span="16">
              <View className="card-text">{addressDetail}</View>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
    </View>
  )
}
