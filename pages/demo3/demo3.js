// pages/demo3/demo3.js
let app = getApp();
let pageNo = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    girlData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGankGirlData();
  },

  loadGankGirlData(){
    app.getRequestInfo("http://gank.io/api/data/福利/10/"+ pageNo,(res)=>{
      console.log(res.data.results);
      this.setData({
        girlData: this.data.girlData == [] ? res.data.results : this.data.girlData.concat(res.data.results)
      })
    })
  },

  onBindscrolltolower(){
    pageNo++;
    this.loadGankGirlData();
  },

  onBannerPicClick(e){
    if(e.currentTarget.dataset["url"]){
      wx.navigateTo({
        url: "/pages/showPic/showPic?pic="+ e.currentTarget.dataset["url"],
      })
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

  }
})