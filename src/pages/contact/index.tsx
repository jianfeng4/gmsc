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
import {
  getSupplyContact,
  type ISupplierContactData,
} from '@/actions/simple/profile'

import './index.less'
import { cacheGet, cacheSet, cacheSetSync } from '@/cache'

const PAGE_SIZE = 10

export default Unite(
  {
    state: {
      supplyContactList: [] as ISupplierContactData[],
    },
    async onLoad() {
      try {
        const data = await getSupplyContact({})
        console.log('🚀 ~ onLoad ~ data:', data)
        this.setState({ supplyContactList: data })
      } catch (error) {
        console.log('🚀 ~ onLoad ~ error:', error)
      }
    },
  },
  function ({ state, events, loading }) {
    const { supplyContactList } = state
    console.log('🚀 ~ supplyContactList:', supplyContactList)
    const { setState } = events

    const handleClick = () => {
      // Taro.navigateTo({
      //   url: `/pages/offer/index?packageId=${detail.packageId}&id=${detail.id}`,
      // })
    }
    return (
      <Container navTitle="企业通信录" className="pages-pagination-index">
        <View>
          <CellGroup>
            {supplyContactList?.map((item) => (
              <Cell
                isLink
                title={item.supplierName}
                key={item.id}
                url={`/pages/contactDetail/index?supplierName=${
                  item.supplierName
                }&supplierType=${item.supplierType}&supplierIntroduction=${
                  item.supplierIntroduction
                }&supplierProductKeywords=${
                  item.supplierProductKeywords
                }&supplierOutputValue=${
                  item.supplierOutputValue
                }&supplierLicense=${item.supplierLicense}&fromSource=${
                  item.fromSource
                }&fromUserId=${item.fromUserId}&addressCode=${
                  item.addressCode
                }&addressName=${item.addressName}&addressShotName=${
                  item.addressShotName
                }&addressDetail=${item.addressDetail}&contactUserName=${
                  item.contactUserName
                }&contactUserPhone=${item.contactUserPhone}&active=${
                  item.active
                }&detail=${JSON.stringify(item)}`}
              />
            ))}
            <Cell
              isLink
              title="添加企业"
              linkType="navigateTo"
              url="/pages/addContact/index"
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
