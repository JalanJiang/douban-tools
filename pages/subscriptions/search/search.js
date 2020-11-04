const app = getApp()

Page({
  data: {
    inputValue: null,
    groupList: []
  },
  onSearch: function(event) {
    console.log('search')
    var inputValue = event.detail
    console.log(inputValue)
    if (inputValue) {
      this.featchGroups(inputValue)
    }
  },
  onCancel: function() {
    console.log('cancel')
  },
  // onChange: function(event) {
    
  // },
  featchGroups: function(group_name) {
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/groups?group_name=' + group_name,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)
        this.setData({
          'groupList': res.data
        });
      }
    })
  }
})