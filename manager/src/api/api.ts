import http from './http'
import { apiModule } from './module'

export const api = {
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  get: (url, module, params = {}) => {
    return http.get(`${apiModule[module]}/${url}`, params)
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  post: (url, module, params = {}) => {
    return http.post(`${apiModule[module]}/${url}`, params)
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  delete: (url, module, params = {}) => {
    return http.delete(`${apiModule[module]}/${url}`, params)
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  put: (url, module, params = {}) => {
    return http.put(`${apiModule[module]}/${url}`, params)
  },
  /**
   *
   * @param url
   * @param module
   * @param params
   */
  patch: (url, module, params) => {
    return http.patch(`${apiModule[module]}/${url}`, params)
  }
}
