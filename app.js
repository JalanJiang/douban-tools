//app.js
App({
  // 全局常量
  globalData: {
    // 用户信息
    userInfo: null,
    // URL 前缀
    baseUrl: "http://127.0.0.1:8000",
    // 用户登录 token
    token: null,
    defaultPage: 1,
    defaultPageSize: 20,
  },
  // 开启
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        // TODO 过期时间校验
        // if (!wx.getStorageSync('token')) {
        //   this.getToken(res.code)
        // }
        this.getToken(res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 请求 Token
  getToken: function (code) {
    wx.request({
      url: this.globalData.baseUrl + '/users/login',
      data: {
        'wx_code': code
      },
      method: 'POST',
      success (res) {
        // 获取返回的 token 值
        // TODO: 错误处理
        wx.setStorageSync('token', res.data.token)
        console.log(res.data.token)
      }
    })
  }
})