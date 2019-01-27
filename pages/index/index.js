Page({
  data: {
    imgUrls: [
      'https://bdhanbang.top/images/tooopen_sy_143912755726.jpg',
      'https://bdhanbang.top/images/tooopen_sy_175866434296.jpg',
      'https://bdhanbang.top/images/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
});