// pages/list/list.js
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    shops:[],
    hasmore:true,
    page:0,
    limit:20,
    question:''
  },
  loadmore: function(){
    if(!this.data.hasmore) return
    let {page,limit} = this.data
    let q = this.data.question
    return fetch(`categories/${this.data.categories.id}/shops`,{_page:++page,_limit:limit,q}).then(res => {
      // if(!res.data){
      //   var hasmore =false
      //   return
      // }
      
      var totalCount = parseInt(res.header['X-Total-Count'])
      var hasmore = page*limit < totalCount
      var shops = this.data.shops.concat(res.data)
      this.setData({shops,page,hasmore})
    })
  },
  freshSearch:function (e){
    this.setData({question:e.detail.value,page:0,shops:[]})
    let q = this.data.question
    let { page, limit } = this.data
    fetch(`categories/${this.data.categories.id}/shops`,{_page:++page,_limit:limit,q}).then(res =>{
      let hasmore = this.data.hasmore
      if(res.data.length == 0){
        hasmore = !hasmore
      }     
      this.setData({shops:res.data,page,hasmore})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://www.liulongbin.top:3005/api/getthumimages/87',
      success:res => {
        console.log(res.data)
      }
    })
    fetch(`categories/${options.cat}`).then(res => {
      this.setData({categories:res.data})
      wx.setNavigationBarTitle({
         title: this.data.categories.name
      })
      return this.loadmore()
    }).then()
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
    // 下拉刷新
    this.setData({
      page:0,
      shops:[],
      hasmore:true,
      question:''
    })
    this.loadmore().then(res=>{
      wx.stopPullDownRefresh()
    })
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