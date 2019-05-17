const utils = require('./utils.js');
console.log('hello worker');
//接收数据   worker响应代码
worker.onMessage(function(res){
  console.log(res);
})