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
import { getRecommendList, type IRecomUser } from '@/actions/simple/profile'

import './index.less'

export default Unite(
  {
    state: {
      recomUserList: [] as IRecomUser[],
    },
    async onLoad() {
      try {
        const data = await getRecommendList({})
        this.setState({ recomUserList: data })
      } catch (error) {
        console.log('🚀 ~ onLoad ~ error:', error)
      }
    },
  },
  function ({ state, events, loading }) {
    const { recomUserList } = state

    return (
      <Container navTitle="推荐明细" className="pages-pagination-index">
        <View>
          <CellGroup>
            {recomUserList?.map((item) => (
              <Cell title={item?.username} key={item?.id} />
            ))}
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
