const app = getApp()

Page({
  data: {
    total: -1,
    topicList: [],
    container: null,
  },
  onLoad: function (query) {
    console.log(query.subscription_id)
    this.featchTopics(query.subscription_id)
  },
  onPullDownRefresh: function() {

  },
  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container'),
    });
  },
  featchTopics: function (subscriptionID, page = app.globalData.defaultPage, pageSize = app.globalData.defaultPageSize) {
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/topics?subscription_id=' + subscriptionID + '&page=' + page + '&page_size=' + pageSize,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        this.setData({
          'total': res.data.total,
          'topicList': res.data.topics
        })
      }
    })
  }
})