// pages/car/car.js
const getShops = require('../../utils/getShops.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops:[],
    carlist:[],
    allSelect:false,
    total:0,
    totalCount:0
  },
  removeShop:function(e){
    this.data.carlist.splice(e.target.dataset.index, 1)
    this.setData({ shops: this.data.shops})
    console.log(this.data.shops,this.data.carlist)
    wx.setStorageSync('shops', this.data.carlist)
    // var carlist = wx.getStorageSync('shops')
    // carlist.splice(e.target.dataset.index, 1)
    // wx.setStorageSync('shops', carlist)
    // this.setData({carlist,shops:this.data.shops})
    this.allPrice()
  },
  traggleSelected:function(e){
      this.data.shops[e.target.dataset.index].selected = !this.data.shops[e.target.dataset.index].selected
      this.setData({shops:this.data.shops})
      this.allPrice()
    }
  ,
  traggleAll:function (){
    var allSelect = this.data.allSelect
    var shops = this.data.shops
    allSelect = !allSelect
    shops.forEach(item=>{
      item.selected = allSelect
    })
    this.setData({allSelect,shops})
    this.allPrice()
  },
  // 计算总额
  allPrice:function(){
    var shops = this.data.shops
    var total=0;
    shops.forEach((item,index)=>{
      if(item.selected ==true){
        total += parseInt(item.count) * parseInt(item.sell_price)
      }
    })
 
    this.setData({total})
  }
,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /** 设置监听器 */
  this.data.carlist = wx.getStorageSync("shops")||[]
  this.setData({shops:this.data.carlist})
  var shops=this.data.carlist
      shops.forEach((item, index) => {
        item.selected = false
        getShops(`goods/getshopcarlist/${item.id}`).then(res => {
          var {title,sell_price,thumb_path} = res.data.message[0]
          item.title = title
          item.sell_price = sell_price
          item.thumb_path = thumb_path
          
        }).then(res=> {
          this.setData({ shops: shops })
          console.log(shops)
          this.allPrice()
        })
      })
   
  },
  watch:{
    carlist: function (){
    }
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

  },
  onTabItemTap:function(){
    this.data.carlist = wx.getStorageSync("shops") || []
    this.setData({ shops: this.data.carlist })
    var shops = this.data.carlist
    shops.forEach((item, index) => {
      item.selected = false
      getShops(`goods/getshopcarlist/${item.id}`).then(res => {
        var { title, sell_price, thumb_path } = res.data.message[0]
        item.title = title
        item.sell_price = sell_price
        item.thumb_path = thumb_path

      }).then(res => {
        this.setData({ shops: shops })
        console.log(shops)
        this.allPrice()
      })
    })
  }
})