const app = getApp()

Page({
  data: {
    total: 0,
    subscriptionList: [],
  },
  onLoad: function () {
    this.fetchSubscriptions()
    console.log(this.subscriptionList)
  },
  onPullDownRefresh: function () {
    console.log("pullDownRefresh")
  },
  // Request: 获取订阅列表
  fetchSubscriptions: function(page = app.globalData.defaultPage, pageSize = app.globalData.defaultPageSize) {
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/subscriptions?page=' + page + '&page_size=' + pageSize,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        this.setData({
          'total': res.data.total,
          'subscriptionList': res.data.subscriptions
        });
      }
    })
  }
})