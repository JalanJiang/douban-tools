Component({
  data: {
    // 选中的 tab 
    active: null,
    // 菜单列表
    list: [
      {
        pagePath: '/pages/subscriptions/subscriptions',
        text: '订阅',
        name: 'subscriptions',
        icon: 'bullhorn-o'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        name: 'profile',
        icon: 'user-o'
      }
    ]
  },
  methods: {
    // 标签切换
    onChange: function (event) {
      this.setData({ active: event.detail })
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    }
  }
})