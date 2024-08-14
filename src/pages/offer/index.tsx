import type { IProps as IDetail } from '../home/components/card'
import { Unite } from '@antmjs/unite'
import { View, Text, ScrollView, Image, Input } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import { useEffect } from 'react'
import {
  Row,
  Col,
  Tag,
  Divider,
  Button,
  Form,
  FormItem,
  Switch,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Slider,
  Rate,
  Stepper,
  Dialog,
  Icon,
  Uploader,
} from '@antmjs/vantui'

import { useRouter } from '@/hooks'
import Container from '@/components/container'
import Pagination from '@/components/pagination'
import { getSupplyList, submitOffer } from '@/actions/simple/common'
import Picker from '@/components/picker'

import './index.less'
import { supplierTypeMap } from '@/config'

const PAGE_SIZE = 10
export default Unite(
  {
    state: {
      detail: {} as IDetail,
      supplyList: [],
      supplyNameList: [],
      selectSupplierId: '',
      selectSupplierType: '',
      selectSupplierName: '',
      pickerShow: false,
      fileList: [],
    },
    async onLoad() {
      await this.fetchDataWithId()
    },
    async fetchDataWithId() {
      console.log(this.location.params, 'qqqqqqqqq')
      const data = (await getSupplyList({})) as any
      this.setState({
        supplyList: data,
        supplyNameList: data.map((item) => item.supplierName),
      })
    },
    async submit(value: any) {
      // const { params } = router
      const { id, packageId } = this.location.params // 获取路由参数中的id
      const param = {
        ...value,
        supplierId: this.state.selectSupplierId,
        itemId: id,
        packageId,
      }
      // TODO 删掉这行
      delete param.itemBasedOn
      console.log('🚀 ~ submit ~ param:', param)

      const data = (await submitOffer(param)) as any
      if (data) {
        console.log('🚀 ~ submit ~ 成功文案:')
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        }).then(() => {
          setTimeout(() => {
            Taro.navigateBack()
          }, 2000)
        })
      } else {
        console.log('🚀 ~ submit ~ 失败文案:')
        Taro.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000,
        })
      }
      this.setState({})
    },
  },
  function ({ state, events, loading }) {
    const {
      supplyList,
      supplyNameList,
      pickerShow,
      selectSupplierId,
      selectSupplierType,
      selectSupplierName,
      fileList,
    } = state
    const { setState, submit } = events
    const formIt = Form.useForm()
    const handleClick = async () => {
      formIt.validateFields((errorMessage, fieldValues) => {
        console.log('🚀 ~ formIt.validateFields ~ fieldValues:', fieldValues)
        submit(fieldValues)
      })
    }
    return (
      <Container navTitle="采购详情" className="pages-pagination-index">
        <>
          <Form form={formIt} onFinish={(errs, res) => console.info(errs, res)}>
            <FormItem
              label="供应企业"
              name="itemOfferPrice"
              required
              trigger="onInput"
              validateTrigger="onBlur"
              valueFormat={(e) => e.detail.value}
            >
              <View>{selectSupplierName}</View>
              <Icon
                name="arrow"
                size="16px"
                onClick={() => setState({ pickerShow: true })}
              />
            </FormItem>
            <FormItem
              label="企业类型"
              name="supplierType"
              required
              valueFormat={(e) => e.detail.value}
            >
              <Input
                placeholder={supplierTypeMap[selectSupplierType]}
                value={supplierTypeMap[selectSupplierType]}
                type="text"
                disabled
              />
            </FormItem>
            <FormItem
              label="供应单价"
              name="itemOfferPrice"
              required
              rules={{
                rule: /^\d+(\.\d{1,2})?$/,
                message: '请输入正确的供应金额数字',
              }}
              trigger="onInput"
              validateTrigger="onBlur"
              valueFormat={(e) => e.detail.value}
            >
              <Input placeholder="请输入供应单价" type="numberpad" />
            </FormItem>
            <FormItem
              label="供应数量"
              name="itemNumber"
              required
              rules={{
                rule: /^\d+$/,
                message: '请输入正确的数字',
              }}
              trigger="onInput"
              validateTrigger="onBlur"
              valueFormat={(e) => e.detail.value}
            >
              <Input placeholder="请输入供应数量" type="numberpad" />
            </FormItem>
            <FormItem label="报价因素" name="itemBasedOn" required>
              <CheckboxGroup direction="horizontal">
                <Checkbox name="tax" shape="square" checkedColor="#2196f3">
                  含税价
                </Checkbox>
                <Checkbox name="freight" shape="square" checkedColor="#2196f3">
                  含运费价
                </Checkbox>
                <Divider />
                <Checkbox
                  name="insurance"
                  shape="square"
                  checkedColor="#2196f3"
                >
                  含保险价
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem
              label="服务费"
              name="itemMatchingFee"
              required
              valueFormat={(e) => e.detail.value}
              rules={{
                rule: /^\d+(\.\d{1,2})?$/,
                message: '请输入正确的供应金额数字',
              }}
              trigger="onInput"
            >
              <Input placeholder="请输入服务费" type="numberpad" />
            </FormItem>

            <FormItem label="样例图片" name="itemMatchingFee">
              <Uploader
                fileList={fileList}
                onAfterRead={() => {
                  // 上传带到云
                }}
                onDelete={() => {}}
                deletable
                accept="image"
                showUpload={true}
              />
            </FormItem>
            <Button
              className="button primary"
              onClick={handleClick}
              formType="submit"
            >
              确认提交
            </Button>
          </Form>
          <Dialog id="form-demo11" />
        </>

        <Picker
          show={pickerShow}
          columns={supplyNameList}
          onConfirm={(e) => {
            const target = supplyList.find(
              (item) => item.supplierName === e.detail.value,
            )

            setState({
              pickerShow: false,
              selectSupplierName: e.detail.value,
              selectSupplierId: target.id,
              selectSupplierType: target.supplierType,
            })
          }}
          onCancel={() => {
            setState({ pickerShow: false })
          }}
        />
      </Container>
    )
  },
  { page: true },
)

definePageConfig({
  // 这里不要设置标题，在Container组件上面设置
  navigationBarTitleText: '',
})
