import http from './http'
import { apiModule } from './module'

export default {
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  get: (url, params = {}, module = 'empty') => {
    return http.get(`${apiModule[module]}/${url}`, { params: params })
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  post: (url, params = {}, module = 'empty') => {
    return http.post(`${apiModule[module]}/${url}`, params)
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  delete: (url, params = {}, module = 'empty') => {
    return http.delete(`${apiModule[module]}/${url}`, { params: params })
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  put: (url, params = {}, module = 'empty') => {
    return http.put(`${apiModule[module]}/${url}`, params)
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  patch: (url, params, module = 'empty') => {
    return http.patch(`${apiModule[module]}/${url}`, params)
  }
}
