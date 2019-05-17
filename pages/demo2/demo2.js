// pages/demo2/demo2.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendHistoryData:[],
    currentTime: '',
    bannerPicUrl: '',
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGankRecommendHistoryData((res)=>{
      let latestDate = new Date(res.data.results[0])
      this.loadGankRecommendData(latestDate.getFullYear(), latestDate.getMonth() + 1, latestDate.getDate(), (bannerPicUrl, results) => {
        this.setData({
          bannerPicUrl: bannerPicUrl,
          recommendData: results,
          loadingHidden: true
        })
      });
    });
  },

  onSelRecommendTimeChange(e){
    let curDate = new Date(this.data.recommendHistoryData[e.detail.value]); 
    wx.showNavigationBarLoading();
    this.loadGankRecommendData(curDate.getFullYear(),curDate.getMonth()+1,curDate.getDate(),(bannerPicUrl,results) => {
      this.setData({
        bannerPicUrl: bannerPicUrl,
        recommendData: results,
      })
    });
  },


  loadGankRecommendHistoryData(cb) {
    let that = this;
    app.getRequestInfo("http://gank.io/api/day/history", function (res) {
      that.setData({
        recommendHistoryData: res.data.results
      })
      cb && cb(res);
    })
  },

  loadGankRecommendData(y,m,d,cb){
    let url = "http://gank.io/api/day/" + y +"/"+ m +"/"+ d;
    let that = this;
    app.getRequestInfo(url,function(res){
      console.log(res);
      that.setData({
        currentTime: "日期：" + y + "/"+ m + "/" + d
      })
      let category = res.data.category;
      category.sort();
      let categoryInfos = [];
      let bannerPicUrl;
      category.map( categoryName =>{
        if(categoryName == "福利"){
          bannerPicUrl = res.data.results["福利"][0]["url"];
          bannerPicUrl = bannerPicUrl.replace('http://ww', 'http://ws')
        }
        categoryInfos.push({
          categoryName: categoryName,
          list: res.data.results[categoryName]
        })
      })
      console.log(categoryInfos)
      cb && cb(bannerPicUrl,categoryInfos);
      wx.hideNavigationBarLoading()
    })
  },

  onBannerPicClick(){
    if(!this.data.bannerPicUrl) return;
    wx.navigateTo({
      url: "/pages/showPic/showPic?pic=" + this.data.bannerPicUrl
    })
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