const app = getApp()
import Toast from '@vant/weapp/toast/toast'

Page({
  data: {
    inputValue: null,
    groupName: '',
    groupID: '',
    keyword: '',
  },
  onLoad: function(query) {
    this.setData({
      'groupName': query.group_name,
      'groupID': query.group_id
    })
  },
  formSubmit: function(event) {
    // console.log(event.detail)
    console.log(event)
    var groupID = event.detail.value.groupID
    var groupName = event.detail.value.groupName
    var keyword = event.detail.value.keyword
    this.addSubscription(groupID, groupName, keyword)
  },
  onCancel: function() {
    console.log('cancel')
  },
  // onChange: function(event) {
    
  // },
  // 添加订阅
  addSubscription: function(groupID, groupName, keyword) {
    wx.request({
      url: app.globalData.baseUrl + '/api/v1/subscriptions',
      method: 'POST',
      data: {
        group_id: groupID,
        group_name: groupName,
        search_keyword: keyword
      },
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        Toast.success('添加成功');
        wx.reLaunch({
          url: '/pages/subscriptions/subscriptions',
        })
      }
    })
  }
})