# wxProject
许贤杰的微信小程序

## 初始化微信小程序

## 配置app.json
  + pages (页面路由)
  + 配置"tabBar"
    - 路由地址
    - "text"
    - iconPath
    - 高亮iconPath
    
## 完成首页Home页面编写
### Wxml页面布局编写
  + 轮播图组件
  + 九宫格
    - 使用navigitor标签, url地址传值'cat'
    - 底部两个图片
### wxss样式编写
  + 轮播图图片高宽百分百
  + 九宫格使用flex,flex-wrap换行
### js (设置微信小程序合法域名)
  + 轮播图data数据
  + 边生活list页面

## 商铺列表 list页面 
### 编写wxml和wxss(felx布局)
  + 搜索框
  + 商户数据渲染
  +  底部 下拉刷新提示
### 通过API利用传入的cat值获取商户数据
  + 拿到onLoad中的options.cat
  + 使用Promise封装fetch方法(wx.request)
  + 获取数据并绑定在data中
  + 通过wx.setNavigationBarTitle设置title值
### 搜索
  + 绑定freshSearch方法,通过e.datail.value获取搜索框值,并setData 
  + fetch方法传值data,获取数据并渲染

### 下拉加载
   由于是下拉刷新, 因此先修改之前获取的数据传入值 {_limit,_page},限制获取数据数量与分页
   + 封装"加载"方法loadmore,
      - data中设置 hasmore(判断是否加载的节流阀) page(页数) limit(加载数量)
      - fetch获取数据并传值data {_limit:limit,_page:++page,q}
      - 获取数据总长度 res.header['X-Total-Count'],赋值hasmore
      - 绑定数据 setData
   + 改装之前的获取数据渲染,使用loadmore
   + onReachBottom 方法下拉加载
### 上拉刷新
  + setData hasmore,page,q 
  + loadmore()
## 商铺详情与用户点评 detail页面
###  wxml页面编写
   + 轮播图
   + 店铺详情
   + 用户点评
###  wxss布局
  + 使用flex布局
### js业务逻辑
  + fetch方法获取API数据并渲染
  + API中的用户点评图片 需要做调整
        // 这里不支持一些新特性
      module.exports = {
        size: function (input) {
          return input.replace('w.h', '100.100')
        }
      }
## tabBar-商城 store页面
### 编写wxml 整体使用felx布局 (为了展示图更美观, 留部分空白)
  + 商品列表 使用 nivigitor 传值 id
### 业务逻辑编写
  + 通过API获取商城列表数据
  + 下拉加载
    - 与list相似的loadmore方法封装
    - API不同 封装也略有不同 hasmore判定改为 每次加载是否为指定数量10是则true 
    

## 商品详情 goods页面
### wxml页面布局
  + 还是有flex布局
  + 由于是子页面, 没有tabBar,手动编写一个tabBar
    - tabBar页面无法通过navigitor 或navigitor/redirect方法跳转
    - 使用switchBar方法跳转 (当处于该goods页面 只需要商城图标高亮,因此商城图标会高亮图标)
### 业务逻辑
  + 封装load方法加载 
    - 由于需要多个异步操作, 这里使用Promise.then()方法执行多个异步操作
    - 1.获取轮播图数据
    - 2.获取商品详情数据
    - 3.获取商品介绍数据(该Api返回值是html文本字符串,wx这里无法解析,因此没有进行渲染)
  + 通过options.id 获取值,并通过该值获取Api数据并渲染
  + 加入购物车方法
    - 在查找相关资料,具备子页面共享数据的方法只能通过框架实现,除此之外
      就是通过wx本地缓存实现不同页面间的数据传递
    - 通过shops=wx.getStorageSync('shops')获取 如果没有则赋值[]
    - 遍历shops 判断是否存在指定id(遍历中需要加入标志符);若有,则count++;若没有,则push于shops中
    - 通过 wx.setStorageSync('shops',shops) 本地缓存数据

## tabBar-购物车 car页面
### 布局和样式
  + flex布局
  + 选中按钮根据data数据显示图标
  + 删除按钮
  + 底部结算模块
### 业务逻辑 
  + 获取购物车数据
  + 删除商品
    - 从本地缓存中slice这一个id的商品
      this.data.carlist.splice(e.target.dataset.index, 1)
      this.setData({ shops: this.data.shops})
      wx.setStorageSync('shops', this.data.carlist)
    业务逻辑我写成这样,也是误打误撞,暂时还不清楚原因 
  + 全选功能按钮
    - 修改this.allSelected 再遍历shops赋值
  + 总金额
    - 封装allPrice方法 遍历shops,根据selected,count,price计算
    - 在页面加载,删除商品,切换选中时都调用allPrice方法
    - 页面显示该金额
## 问题
  + 当第一次加载完car页面时,再去商城增加商品入购物车,返回car页面,car页面不会重新渲染
  ------解决方法:调用 onTabItemTap方法 ,每次进入该页面就执行方法
  + 下拉刷新有三秒时间
  ------解决方法:加载结束后立即调用wx.stopPullDownFresh(),由于加载是异步操作,用.then()调用
  + 子页面无tabbar 
  ------解决方法: 手写一个tabBar模块,利用switchTab方法跳转到指定页面
  + 购物车与商城共享数据
  ------解决方法: 利用wx本地缓存
  + 商铺列表中的图标 没有统一大小
  ------解决方法: image标签增加父元素view,flex布局
  + 用户点评图片不显示
  ------解决方法: 这个是美团外卖API,通过查找问题,发现是高宽未设定,需要进行高宽替换  size: function (input) {
                   return input.replace('w.h', '100.100')
                }
  + 页面美观优化
  + 还有部分为整理