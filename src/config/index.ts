export const supplierTypeMap = {
  '1': '制造商',
  '2': '批发商',
  '3': '服务供应商',
  '4': '原材料供应商',
  '5': '外包供应商',
  '6': '跨国供应商',
}

export const supplierTypeList = Object.keys(supplierTypeMap).map((key) => ({
  key,
  value: supplierTypeMap[key],
}))
