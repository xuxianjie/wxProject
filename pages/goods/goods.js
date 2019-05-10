// pages/goods/goods.js
const getShops = require('../../utils/getShops.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    slideImages:[],
    goodsinfo:[],
    comments:[],
    quantity:0,
    shop:{id:0,count:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadmore(){
    return getShops(`getthumimages/${this.data.id}`).then(res=>{
       this.setData({slideImages:res.data.message})
       console.log(res.data.message)
       return getShops(`goods/getinfo/${this.data.id}`)
    }).then(res =>{
      this.setData({goodsinfo:res.data.message[0]})
      console.log(res.data.message)
      return getShops(`goods/getdesc/${this.data.id}`)
    }).then(res =>{
      var comments = res.data.message[0]
      comments.content.replace(/p/g,'text')
      this.setData({comments})
      console.log(comments.content)
    })
  }
  ,
// 加入购物车
  addCar:function (e){
    var shop = this.data.shop
    shop.id = e.target.dataset.id
    shop.count++
    this.data.goodsinfo.stock_quantity--
    // 节流阀
    var flag = true
    var shops = (wx.getStorageSync('shops')||[])
    shops.forEach((item,index)=>{
      if(item.id == shop.id){
        // 若在shops内找到id为shop的id,则直接添加该元素的count
        item.count++
        flag = false
        return
      }
    })
    if(flag){
      shops.push(shop)
    }
    wx.setStorageSync('shops', shops)
    this.setData({shop,goodsinfo:this.data.goodsinfo})
  }
  ,
  onLoad: function (options) {
    this.setData({id:options.id})
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})