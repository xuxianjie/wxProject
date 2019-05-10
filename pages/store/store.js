// pages/store/store.js
const getShops = require('../../utils/getShops.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageIndex:0,
    hasmore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadmore(){
    var hasmore = this.data.hasmore
    var pageIndex = this.data.pageIndex
    console.log(hasmore)
    if (!hasmore) return
   return  getShops(`getgoods?pageindex=${++pageIndex}`).then(res => {
        hasmore = res.data.message.length ==10
        var list = [...this.data.list, ...res.data.message]
        this.setData({ list ,pageIndex,hasmore})
    })
  }
  ,
  onLoad: function (options) {
    this.loadmore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadmore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})