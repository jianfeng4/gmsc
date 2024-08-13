import type { IProps as IDetail } from '../home/components/card'
import { Unite } from '@antmjs/unite'
import { View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Button, Form, FormItem, Dialog, Icon } from '@antmjs/vantui'
import { useRef } from 'react'
import Container from '@/components/container'
import {
  addNewSupply,
  updateSupply,
  setUserSupply,
  deleteUserSupply,
} from '@/actions/simple/profile'
import Picker from '@/components/picker'
import { supplierTypeList } from '@/config'

import './index.less'

export default Unite(
  {
    state: {
      detail: {} as IDetail,
      supplierTypeList: supplierTypeList,
      supplierTypeNameList: supplierTypeList.map((item) => item.value),
      selectSupplierTypeKey: '',
      selectSupplierTypeName: '',
      pickerShow: false,
    },
    async onLoad() {
      const detail = this.location.params['detail']
      console.log('🚀 ~ onLoad ~ detail:', detail)
      const supplierType = this.location.params['supplierType']
      const supplierName = supplierTypeList.find(
        (item) => item.key == supplierType,
      )?.value
      console.log('🚀 ~ onLoad ~ supplierName:', supplierName)
      this.setState({
        selectSupplierTypeKey: supplierType,
        selectSupplierTypeName: supplierName,
        detail: detail as any,
      })
    },
    async submit(value: any) {
      // const { params } = router
      const param = {
        ...this.state.detail,
        fromSource: 'social_user',
        supplierType: this.state.selectSupplierTypeKey,
        ...value,
      }

      const data = (await updateSupply(param)) as any
      if (data) {
        console.log('🚀 ~ submit ~ 成功文案:')
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
        }).then(() => {
          Taro.navigateTo({
            url: `/pages/contact/index`,
          })
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

    // 设置用户就职该企业
    async setUser() {
      const data = (await setUserSupply({
        id: this.state.detail.id,
      })) as any
      if (data) {
        console.log('🚀 ~ setUserSupply ~ 成功文案:')
        Taro.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 2000,
        }).then(() => {})
      } else {
        console.log('🚀 ~ setUserSupply ~ 失败文案:')
        Taro.showToast({
          title: '设置失败',
          icon: 'none',
          duration: 2000,
        })
      }
      this.setState({})
    },

    // 删除用户所在企业
    async deleteUser() {
      const data = (await deleteUserSupply({
        id: this.state.detail.id,
      })) as any
      if (data) {
        console.log('🚀 ~ deleteUserSupply ~ 成功文案:')
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000,
        }).then(() => {
          Taro.navigateTo({
            url: `/pages/contact/index`,
          })
        })
      } else {
        console.log('🚀 ~ deleteUserSupply ~ 失败文案:')
        Taro.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000,
        })
      }
      this.setState({})
    },
  },
  function ({ state, events, loading }) {
    const {
      supplierTypeList,
      supplierTypeNameList,
      pickerShow,
      selectSupplierTypeKey,
      selectSupplierTypeName,
    } = state
    const formInstance = useRef(null)
    const { setState, submit, setUser, deleteUser } = events
    const formIt = Form.useForm()
    const handleClick = async () => {
      formIt.validateFields((errorMessage, fieldValues) => {
        console.log('🚀 ~ formIt.validateFields ~ fieldValues:', fieldValues)
        if (!selectSupplierTypeKey) {
          Taro.showToast({
            title: '请选择企业类型',
            icon: 'none',
            duration: 2000,
          }).then(() => {
            return
          })
          return
        }
        submit(fieldValues)
      })
    }
    return (
      <Container navTitle="添加企业" className="pages-pagination-index">
        <>
          <Form
            initialValues={{
              supplierName: decodeURIComponent(
                location.search
                  .split('supplierName=')[1]
                  ?.split('&')[0] as string,
              ),
              supplierType: location.search
                .split('supplierType=')[1]
                ?.split('&')[0],
              contactUserName: location.search
                .split('contactUserName=')[1]
                ?.split('&')[0],
              contactUserPhone: location.search
                .split('contactUserPhone=')[1]
                ?.split('&')[0],
              supplierProductKeywords: location.search
                .split('supplierProductKeywords=')[1]
                ?.split('&')[0],
            }}
            form={formIt}
            onFinish={(errs, res) => console.info(errs, res)}
          >
            <FormItem
              label="企业名称"
              name="supplierName"
              required
              trigger="onInput"
              validateTrigger="onBlur"
              // taro的input的onInput事件返回对应表单的最终值为e.detail.value
              valueFormat={(e) => e.detail.value}
            >
              <Input placeholder="请输入企业名称" />
            </FormItem>
            <FormItem
              label="企业类型"
              name="supplierType"
              trigger="onInput"
              validateTrigger="onBlur"
              valueFormat={(e) => e.detail.value}
            >
              <View>{selectSupplierTypeName}</View>
              <Icon
                name="arrow"
                size="20px"
                onClick={() => setState({ pickerShow: true })}
              />
            </FormItem>
            <FormItem
              label="联系人"
              name="contactUserName"
              required
              trigger="onInput"
              validateTrigger="onBlur"
              // taro的input的onInput事件返回对应表单的最终值为e.detail.value
              valueFormat={(e) => e.detail.value}
            >
              <Input placeholder="请输入联系人" />
            </FormItem>
            <FormItem
              label="联系电话"
              name="contactUserPhone"
              required
              rules={{
                rule: /^\d+$/,
                message: '请输入正确的数字',
              }}
              trigger="onInput"
              validateTrigger="onBlur"
              valueFormat={(e) => e.detail.value}
            >
              <Input placeholder="请输入联系电话" type="numberpad" />
            </FormItem>
            <FormItem
              label="产品关键字"
              name="supplierProductKeywords"
              required
              trigger="onInput"
              validateTrigger="onBlur"
              // taro的input的onInput事件返回对应表单的最终值为e.detail.value
              valueFormat={(e) => e.detail.value}
            >
              <Input placeholder="请输入产品关键字" />
            </FormItem>

            <Button
              type="primary"
              className="van-button-submit"
              onClick={handleClick}
              formType="submit"
            >
              修改
            </Button>
            <Button
              className="van-button-submit"
              onClick={setUser}
              formType="submit"
            >
              就职
            </Button>
            <Button
              type="danger"
              className="van-button-submit"
              onClick={deleteUser}
              formType="submit"
            >
              删除
            </Button>
          </Form>
          <Dialog id="form-demo11" />
        </>

        <Picker
          show={pickerShow}
          columns={supplierTypeNameList}
          onConfirm={(e) => {
            const targetId = supplierTypeList.find(
              (item) => item.value === e.detail.value,
            )?.key
            setState({
              pickerShow: false,
              selectSupplierTypeName: e.detail.value,
              selectSupplierTypeKey: targetId,
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
