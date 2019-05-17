// pages/demo1/demo1.js
const common = require("../../utils/common.js")
console.log(444)
const utils = require("../../utils/util.js")
const app = getApp();
let tabInitState = [false,false,false]
let curPageIndex = [1,1,1];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gankData:{},
    loadingHidden: false,
    curSelClassifyIndex: 0,
    tabName: ["Android", "IOS", "前端"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkInitLoadGankData();
  },

  loadGankData(pageNo,cb){
    let that = this;
    let curClassifyName = that.getClassifyName(true);
    app.getRequestInfo("http://gank.io/api/data/" + curClassifyName + "/10/"+pageNo, function(res){
      res.data.results.map(results => {
        results.publishedAt = utils.formatSimpleTime(results.publishedAt);
      })
      let curName = that.getClassifyName();
      curPageIndex[that.data.curSelClassifyIndex]++;
      that.data.gankData[curName] = that.data.gankData[curName] ? that.data.gankData[curName].concat(res.data.results) :                    res.data.results;
      cb && cb(res.data.results);
    })
  },
  
  checkInitLoadGankData(){
    this.loadGankData(1,results => {
      this.setData({
        loadingHidden: true,
        gankData: this.data.gankData
      })
    })
    
  },

  getClassifyName(isApiName) {
    switch (this.data.curSelClassifyIndex) {
      case 0:
        return isApiName ? 'Android' : 'android'
      case 1:
        return isApiName ? 'iOS' : 'ios'
      case 2:
        return isApiName ? '前端' : 'web'
    }
  },
  
  onBindscrolltolower(){
    this.loadGankData(curPageIndex[this.data.curSelClassifyIndex],res=>{
      this.setData({
        gankData: this.data.gankData
      })
    })
  },

  onBindchange(e){
    /* 清空当前的数据 */
    curPageIndex[e.detail.current] = 1;
    this.setData({
      curSelClassifyIndex: e.detail.current,
      gankData: {},
    })
    this.checkInitLoadGankData();
  },

  onTitleBarsClick(e){
    this.setData({
      curSelClassifyIndex: e.currentTarget.dataset['idx']
    })
  },












  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data);
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
  clickMe() {
    common.sayHello("bb");
    let pages = getCurrentPages();
    wx.navigateBack({
      delta: pages.length
    })
  }
})