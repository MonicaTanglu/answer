// state: 储存初始化数据，取值：store.state.xxx
import { createStorage } from '@/utils/storage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { apiModule } from '@/api/module'
import { api } from '@/api/api'
const storage = createStorage()
const state = {
  token: storage.get(ACCESS_TOKEN)
}
// getter： 对state里的数据进行二次处理,类似于computed,取值：store.getters.xxx
const getters = {}
// 对数据进行计算的方法，在页面中触发时使用,调用：store.commit('方法名',value)，同步，不能回调
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}
// 处理mutations中已经写好的方法,处理异步操作,可以回调
const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      api
        .post('login', apiModule.sys, userInfo)
        .then((loginRes: any) => {
          if (loginRes.success) {
            commit('SET_TOKEN', loginRes.result.token)
            storage.set('userInfo', loginRes.result.userInfo)
            storage.set(ACCESS_TOKEN, loginRes.result.token)
            resolve(loginRes)
          }
          resolve(loginRes)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  // getPermissionList({ commit }) {}
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
