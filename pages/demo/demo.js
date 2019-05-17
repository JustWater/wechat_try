// pages/demo/demo.js
const common = require("../../utils/common.js")
const common1 = require("common1.js");
const app = getApp()
app.globalMes++;
console.log(app.globalMes)
/* 数据缓存
  wx.setStorage({
    key: 'key3',
    data: 11,
  })
  wx.setStorageSync("key2", "data2")
  wx.getStorage({
    key:"key",
    success(res){
      console.log(res.data); // value
    }
  })
  try{
    const value = wx.getStorageSync("key1");
    console.log(`key1value:${value}`)
    if(value){
      //...
    }
  } catch(e){
    console.log(`err`)
  }
  wx.removeStorage({
    key: 'key1',
    success: function(res) {
      console.log(res);
    },
  })
  wx.clearStorage();
*/
//一些异步处理的任务可以放置与worker中运行，待运行结束后，再把结果返回到小程序主线程，
wx.getSystemInfo({
  success: function(res) {
    console.log(res);
  },
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "",
    latitude: "",
    message: "Hello,MINA",
    array: [1,2,3,4,5,56],
    view: 'MINA',
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' },
    a:1,
    b:2,
    c:3,
    firstName: "aa",
    lastName: "bb",
    objectArray: [
      { id: 0, unique: 'unique_0' },
      { id: 1, unique: 'unique_1' },
      { id: 2, unique: 'unique_2' },
      { id: 3, unique: 'unique_3' },
      { id: 4, unique: 'unique_4' },
      { id: 5, unique: 'unique_5' },
    ],
    numberArray: [1, 2, 3, 4,4],
    array1:[{
      message:'foo',
      key: "key_1"
    },{
      message:'bar',
      key: "key_2"
    }]
  },

  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length);
      const y = Math.floor(Math.random() * length);
      const temp = this.data.objectArray[x];
      this.data.objectArray[x] = this.data.objectArray[y];
      this.data.objectArray[y] = temp;
    }
    //此时的this.data.objectArray 已经是最新的状态了，但是他无法改变页面的状态，可能会造成数据不一致
    //setData函数用于将数据从逻辑层发送到视图层，同时改变对应的this.data的值
    this.setData({   //setData
      objectArray: this.data.objectArray
    })
   
  },
  addToFront: function (e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },


  clickMi(){
    common1.sayGoodBye("cc")
    // wx.navigateTo({
    //   url: '../demo1/demo1',
    // })
    var version = wx.getSystemInfoSync().SDKVersion;
    if(common.compareVersion(version , '2.4.4') < 0){
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  clickToHome(){
    common.sayHello("aa");
    var pages = getCurrentPages();
    wx.navigateBack({
      delta: pages.length
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("监听页面加载");
    var pages = getCurrentPages();
    console.log(pages);
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        const latitude = res.latitude // 纬度
        const longitude = res.longitude // 经度
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })

    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("监听页面初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("监听页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("监听页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("监听页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("监听用户下拉动作");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("用户点击右上角分享");
  }
})