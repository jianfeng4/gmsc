import type { IProps as IDetail } from '../home/components/card'
import { Unite } from '@antmjs/unite'
import { View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Button, Form, FormItem, Dialog, Icon } from '@antmjs/vantui'
import Container from '@/components/container'
import { addNewSupply } from '@/actions/simple/profile'
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
      console.log(this.location.params, '!!!!!')
    },
    async submit(value: any) {
      // const { params } = router
      const param = {
        ...value,
        fromSource: 'social_user',
        supplierType: this.state.selectSupplierTypeKey,
      }

      const data = (await addNewSupply(param)) as any
      if (data) {
        console.log('🚀 ~ submit ~ 成功文案:')
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
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
      supplierTypeList,
      supplierTypeNameList,
      pickerShow,
      selectSupplierTypeKey,
      selectSupplierTypeName,
    } = state
    const { setState, submit } = events
    const formIt = Form.useForm()
    const handleClick = async () => {
      formIt.validateFields((errorMessage, fieldValues) => {
        console.log('🚀 ~ formIt.validateFields ~ fieldValues:', fieldValues)
        if (!selectSupplierTypeKey) {
          Taro.showToast({
            title: '请选择企业类型',
            icon: 'none',
            duration: 2000,
          })
        }
        submit(fieldValues)
      })
    }
    return (
      <Container navTitle="添加企业" className="pages-pagination-index">
        <>
          <Form
            initialValues={{
              userName: '我是初始值',
              singleSelect: '1',
              rate: 2,
              slider: '50',
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
              提交
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
