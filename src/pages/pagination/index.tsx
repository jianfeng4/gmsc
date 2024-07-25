import { Unite } from '@antmjs/unite'
import { View, Text, ScrollView, Image } from '@tarojs/components'

import { useReachBottom } from '@tarojs/taro'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import { getRoleListCommon } from '@/actions/simple/common'
import Card from './components/card'
import './index.less'

const PAGE_SIZE = 10

export default Unite(
  {
    state: {
      list: null,
      complete: false,
    },
    async onLoad() {
      await this.loadList(true)
    },
    async loadList(refresh = false) {
      const { records: list } = await getRoleListCommon({
        model: {},
        size: 10,
        current: 2,
        sort: 'id',
        order: 'descending',
        extra: {},
      })

      this.setState({
        list: refresh ? list : [].concat(this.state.list).concat(list as any),
        complete: list.length === 0,
      })
    },
  },
  function ({ state, events, loading }) {
    const { list, complete } = state
    const { loadList } = events
    useReachBottom(() => {
      if (!loading.loadList && !complete) {
        loadList()
      }
    })
    return (
      <Container
        navTitle="下拉上滑列表页面"
        enablePagePullDownRefresh={true}
        loading={!list}
        className="pages-pagination-index"
      >
        <Pagination complete={complete} size={PAGE_SIZE} data={list}>
          {list?.map((item) => (
            <Card info={item} key={item.id} />
          ))}
        </Pagination>
      </Container>
    )
  },
  { page: true },
)

definePageConfig({
  // 这里不要设置标题，在Container组件上面设置
  navigationBarTitleText: '',
})
