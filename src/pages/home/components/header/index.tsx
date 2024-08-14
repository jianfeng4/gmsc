import { ReactNode } from 'react'
import { View, Image } from '@tarojs/components'
import { Row, Col, Tag, Divider } from '@antmjs/vantui'

import './index.less'
import Taro from '@tarojs/taro'
import things from '@/resources/images/supply_type/things.png'
import tech from '@/resources/images/supply_type/tech.png'
import engineer from '@/resources/images/supply_type/engineer.png' // 注意这里文件名应该是 engineer.png 而不是 engeer.png
import service from '@/resources/images/supply_type/service.png' // 同样，这里应该是 service.png 而不是 serve.png

const supplyTypeList = [
  {
    icon: things,
    text: '货品',
  },
  {
    icon: engineer, // 修正了变量名
    text: '工程',
  },
  {
    icon: tech,
    text: '技术',
  },
  {
    icon: service, // 修正了变量名
    text: '服务',
  },
]

export default function Index({}) {
  return (
    <View>
      <Row gutter={20}>
        {supplyTypeList.map((item) => (
          <Col span={6} key={item.text}>
            <View className="supply-type-wrapper">
              <Image src={item.icon} mode="aspectFit" className="type-image" />
              {/* 添加了mode属性以适应图片大小 */}
              <View className="text">{item.text}采购</View>
            </View>
          </Col>
        ))}
      </Row>
    </View>
  )
}
