/* eslint-disable @typescript-eslint/ban-ts-comment */
export default defineAppConfig({
  // 打开H5路由动画
  animation: true,
  pages: [
    'pages/login/index',
    'pages/recommend/index',

    'pages/home/index',
    'pages/contact/index',
    'pages/addContact/index',
    'pages/contactDetail/index',

    'pages/index/index',
    'pages/offer/index',
    'pages/need/index',
    'pages/supply/index',
    'pages/profile/index',
    'pages/detail/index',
    'pages/tabAndSearchPagination/index',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './resources/images/tab_icon/home.png',
        selectedIconPath: './resources/images/tab_icon/home_active.png',
      },

      {
        pagePath: 'pages/need/index',
        text: '求购',
        iconPath: './resources/images/tab_icon/shop.png',
        selectedIconPath: './resources/images/tab_icon/shop_active.png',
      },
      {
        pagePath: 'pages/supply/index',
        text: '供应',
        iconPath: './resources/images/tab_icon/file.png',
        selectedIconPath: './resources/images/tab_icon/file_active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: './resources/images/tab_icon/my.png',
        selectedIconPath: './resources/images/tab_icon/my_active.png',
      },
    ],
    color: '#000',
    selectedColor: '#56abe4',
    backgroundColor: '#fff',
    borderStyle: 'white',
  },
  window: {
    // @ts-ignore
    titleBarColor: '#ededed',
    backgroundColor: '#ededed',
    backgroundColorTop: '#ededed',
    backgroundColorBottom: '#ededed',
    backgroundImageColor: '#ededed',
    // 微信全局设置自定义导航栏
    navigationStyle: 'custom',
    // 支付宝全局设置自定义导航栏
    transparentTitle: 'always',
    titlePenetrate: 'YES',
  },
})
