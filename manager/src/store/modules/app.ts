// state: 储存初始化数据，取值：store.state.xxx
import { createStorage } from '@/utils/storage'
const storage = createStorage()
const state = {
  isCollapse: JSON.parse(storage.get('isCollapse')) || false,
  allAuth: [],
  auth: [],
  esri: null
}
// getter： 对state里的数据进行二次处理,类似于computed,取值：store.getters.xxx
const getters = {}
// 对数据进行计算的方法，在页面中触发时使用,调用：store.commit('方法名',value)，同步，不能回调
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse
    // 将状态存储到本地
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  SET_AUTH: (state, authObj) => {
    state.allAuth = authObj.allAuth
    state.auth = authObj.auth
  },
  INIT_ESRI_MAP(state, esri) {
    state.esri = esri
  }
}
// 处理mutations中已经写好的方法,处理异步操作,可以回调
const actions = {
  InitEsriMap({ commit }, esri) {
    commit('INIT_ESRI_MAP', esri)
  }
  // login({ commit }, userInfo) {},
  // getPermissionList({ commit }) {}
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
