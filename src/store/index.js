import { createStore } from 'vuex'
import moduleplayer from '@/store/player'

export default createStore({
  modules: {
    m_player: moduleplayer
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
