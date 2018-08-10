//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    logged: false,
    display: false,
    takeSession: false,
    iconSize: 20
  },
  info: function () {
    wx.navigateTo({
      url: '/pages/user-info/user-info'
    })
  },
  // 用户登录
  login: function () {

    var that = this;
    util.showBusy('正在登录')
    qcloud.login({
      success: function (userInfo) {
        util.showSuccess('登录成功');
        that.setData({
          userInfo,
          logged: true,
          display: true
        });

      },
      fail: function (err) {
        util.showModel('登录失败');
        console.log('登录失败', err);
      }
    });
  }
})