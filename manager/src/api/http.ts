import axios from 'axios'
import { Modal, notification, message } from 'ant-design-vue'
import store from '@/store'
import setting from '@/defaultSetting'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { createStorage } from '@/utils/storage'

const baseUrl = setting.serverUrlPrefix
// const baseUrl = '/'
const storage = createStorage()
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 9000
})

instance.interceptors.request.use(
  (config) => {
    const token = storage.get(ACCESS_TOKEN)
    if (token) {
      config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    if (config.method === 'get') {
      config.params = {
        _t: new Date().getTime() / 1000,
        ...config.params
      }
    }
    return config
  },
  (error) => {
    console.warn(error)
  }
)
const resultJudge = (data) => {
  if (data.code === 500) {
    message.error(data.message);
    // notification.error({
    //     message: "系统提示",
    //     description: data.message,
    //     duration: 4,
    // });
    return false;
  } else {
    return true;
  }
};
instance.interceptors.response.use(
  (res) => {
    if (resultJudge(res.data)) return res.data;
    else return false;
  },
  (error) => {
    let errMsg = ''
    if (error.response) {
      const data = error.response.data
      const token = storage.get(ACCESS_TOKEN)
      switch (error.response.status) {
        case 403:
          errMsg = '拒绝访问'
          break
        case 500:
          if (token && data.message === 'Token失效，请重新登录') {
            Modal.error({
              title: '登录已过期',
              content: '很抱歉，登录已过期，请重新登录',
              okText: '重新登录',
              mask: false,
              onOk: () => {
                store.dispatch('Logout').then(() => {
                  storage.remove(ACCESS_TOKEN)
                  window.location.reload()
                })
              }
            })
          }
          break
        case 404:
          errMsg = '很抱歉，资源未找到!'
          break
        case 504:
          errMsg = '网络超时'
          break
        case 401:
          errMsg = '未授权，请重新登录'
          if (token) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1500)
            })
          }
          break
        default:
          errMsg = data.message
          break
      }
    } else {
      errMsg = '未知错误'
    }
    notification.error({
      message: '系统提示',
      description: errMsg,
      duration: 4
    })
    return Promise.reject(error)
  }
)

export default instance
