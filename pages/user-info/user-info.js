//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    logged: false,
    display: false,
    takeSession: false,
    today: util.formatDate(new Date()),
    username: '',
    requestResult: '',
    switch1: true,
    iconSize: 20,
    value1: '',
    value2: '',
    value3: '',
    value4: '输入框已禁用'
  },
  onLoad() {
    let session = qcloud.getSession();
    let userInfo = session.userInfo;
    this.setData({
      userInfo,
      username: userInfo.nickName
    });

  },
  onChange(event) {
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })
  },
  // 用户登录示例
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
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-bookname':
        this.setData({
          bookname: ''
        });
        break;
      case 'clear-readsecond':
        this.setData({
          readsecond: ''
        });
        break;
    }
  },
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.detail.value
    });
  },
  handleClick: function () {
    // 确认按钮
    var that = this;

    if (!that.data.userInfo) {
      util.showModel('请求先进行登录', error);
      return false;
    }

    if (that.data.userInfo) {
      that.data.userInfo.nickName = that.data.username;
    }

    qcloud.request({
      url: `${config.service.host}/weapp/userinfo`,
      method: 'PUT',
      data: that.data.userInfo,
      success(result) {
        that.setData({
          display: false,
          userInfo: result.data.data
        });

        let session = qcloud.getSession();
        session.userInfo.nickName = that.data.userInfo.nickName;
        qcloud.setSession(session);
        util.showSuccess('保存成功');

      },
      fail(error) {
        util.showModel('请求失败', error);
      }
    })
  },
  choose: function () {
    //切换显示功能
    var that = this;
    that.setData({
      display: !that.data.display
    });
  },
  sureRead: function () {
    // 确认按钮
  },//事件处理函数
  change: function (e) {
    console.log(e);
  },
  bindReplaceInput: function (e) {
    console.log(e);
  }
})