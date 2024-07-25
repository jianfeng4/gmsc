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
      console.log(this.location.params, 'qqqqqqqqq')
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

    return (
      <Container navTitle="采购详情" className="pages-pagination-index">
        <View>1111</View>
      </Container>
    )
  },
  { page: true },
)

definePageConfig({
  // 这里不要设置标题，在Container组件上面设置
  navigationBarTitleText: '',
})
