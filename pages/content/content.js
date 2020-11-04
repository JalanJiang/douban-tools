const app = getApp()

Page({
  data: {},
  onLoad: function () {

  },
  onPullDownRefresh: function () {

  },
  featchTopic: function (topicID) {
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/topics/' + topicID,
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