import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import TabsView from './modules/tabs-view'

export default createStore({
  modules: {
    app,
    user,
    TabsView
  }
})
