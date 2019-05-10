module.exports = (url) =>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `http://www.liulongbin.top:3005/api/${url}`,
      success: resolve,
      fail:reject
    })
  })
}