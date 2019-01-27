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
    username: '',//姓名
    phone: '',//电话
    sex: '1',//性别
    company: '',//所在单位
    card: '',//身份证号
    school: '',//所报学校
    professional: '',//所报专业
    type: '1',//形式
    weichat: '',//微信号
    remark: '',//备注
    iconSize: 20,
    sexRadio: [{
      id: 1,
      name: '男',
      checked: true
    }, {
      id: 2,
      name: '女'
    }],
    btype: [{
      id: 1,
      name: '函授',
      checked: true
    }, {
      id: 2,
      name: '业余'
    }, {
      id: 3,
      name: '脱产'
    }],
    current: '男',
    position: 'left'
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
  },//姓名
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.detail.value
    });
  },//电话
  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.detail.value
    });
  },//性别
  sexChange: function (e) {
    this.setData({
      sex: e.detail.value
    });

  },//所在单位
  bindCompanyInput: function (e) {
    this.setData({
      company: e.detail.detail.value
    });
  },//身份证号
  bindCardInput: function (e) {
    this.setData({
      card: e.detail.detail.value
    });
  },//所报学校
  bindSchoolInput: function (e) {
    this.setData({
      school: e.detail.detail.value
    });
  },//所报专业
  bindProfessionalInput: function (e) {
    this.setData({
      professional: e.detail.detail.value
    });
  },//形式
  typeChange: function (e) {
    this.setData({
      type: e.detail.value
    });
  },//微信
  bindWeichatInput: function (e) {
    this.setData({
      weichat: e.detail.detail.value
    });
  },//备注
  bindRemarkInput: function (e) {
    this.setData({
      remark: e.detail.detail.value
    });
    console.log(this.data);
  },
  handleClick: function () {
    // 确认按钮
    var that = this;

    if (!that.data.userInfo) {
      util.showModel('请求先进行登录', error);
      return false;
    }

    if (that.data.userInfo) {
      that.data.userInfo.nickName = that.data.username;//用户名
      that.data.userInfo["phone"] = that.data.phone;//性别
      that.data.userInfo["sex"] = that.data.sex;//性别
      that.data.userInfo["company"] = that.data.company;//所在单位
      that.data.userInfo["card"] = that.data.card;//身份证号
      that.data.userInfo["school"] = that.data.school;//所报学校
      that.data.userInfo["professional"] = that.data.professional;//所报专业
      that.data.userInfo["type"] = that.data.type;//形式
      that.data.userInfo["weichat"] = that.data.weichat;//微信号
      that.data.userInfo["remark"] = that.data.remark;//备注 
    }

    console.log(JSON.stringify(that.data.userInfo));


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