import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，
import Vue from 'vue'
import { Message } from 'element-ui' // element-ui 
const BASE_URL = process.env.VUE_APP_API_URL // 第二节配置的url 可以读取 一定要VUE_APP_A为前缀
// 创建axios实例
const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000 // 请求超时时间                                   
})

function startLoading() {
  // 开始加载
  // Loading.service({});
}

function endLoading() {
  // 结束加载
  // Vue.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
  //   loadingInstance.close();
  // });
}

// 添加request拦截器 
http.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
// 添加respone拦截器
http.interceptors.response.use(
  response => {
    if (response.data.code != 0) {
      Message.error(response.data.message);
      // Message.error({
      //   message: response.data.message,
      //   duration: 10000000000
      // });
      return Promise.reject(response)
    }
    return Promise.resolve(response.data.data)
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log(401)
          break;
        case 403:
          console.log(403)
          break;
        case 404:
          console.log(404)
          break;
        case 500:
          console.log(500)
          break;
      }
    }
    Message.error('请求失败!');
    return Promise.reject(error.response)
  }
)

function get(url, params = {}) {
  return http({
    url,
    method: 'GET',
    headers: {},
    params
  })
}

//封装post请求
function post(url, data = {}) {
  return http({
    url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
export default {
  get, post
}