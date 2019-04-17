import http from 'axios'
import qs from 'qs'
import Vue from 'vue'
//请求带上cookie
// http.defaults.withCredentials = true;

let base = 'http://47.107.246.94/';
Vue.prototype.base = 'http://47.107.246.94/';    //正式服地址

// let base = 'http://120.27.21.136:2798/';
// Vue.prototype.base = 'http://120.27.21.136:2798/';  //测试服地址

const doPost = function (url) {
  return function (params) {
    return params ? http.post(`${base}/${url}`, qs.stringify(params)) : http.post(`${base}/${url}`);
  }
}
const doGet = function (url) {
  return function (params) {
    return params ? http.get(`${base}/${url}`, { params: params }) : http.get(`${base}/${url}`);
  }
}


//返回拦截器
http.interceptors.response.use(function (res) {
  // if (res.data.code == 200) {

  // }
  return res.data;
});


let api = {
  // 获取数据
  shareHouseType:doGet('user/project/shareHouseType'),
  // getHouseType: doGet('user/project/getHouseType'),
}

export default api; 
