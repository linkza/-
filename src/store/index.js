import { createStore } from 'vuex'
import moduleplayer from '@/store/player'
import moduleuser from '@/store/user'

export default createStore({
  modules: {
    m_player: moduleplayer,
    m_user: moduleuser
  },
  state: {
    loginflag: 0,
    active: { url: '', img: '', index: 0, duration: 0 },
    plflag: 0,
    similarlist: []
  },
  getters: {},
  mutations: {},
  actions: {}
})
