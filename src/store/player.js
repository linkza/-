export default {
  namespaced: true,
  state: () => ({
    musiclist: [],
    activeMusic: {},
    total: 0,
    activeIndex: 0
  }),
  mutations: {
    updateMusiclist(state, music) {
      const findResult = state.musiclist.find((x) => x.id === music.id)
      if (!findResult) {
        state.musiclist.push(music)
        state.total++
      }
      this.commit('m_player/changeActiveMusic', music)
    },
    changeActiveMusic(state, active) {
      state.activeIndex = state.musiclist.findIndex((x) => x.id === active.id)
      state.activeMusic = active
    },
    changeActiveIndex(state, index) {
      state.activeIndex = index
    },
    preSong(state) {
      let index = 0
      if (state.activeIndex === 0) {
        index = state.total - 1
      } else {
        index = state.activeIndex - 1
      }
      state.activeMusic = state.musiclist[index]
      this.commit('m_player/changeActiveIndex', index)
    },
    nextSong(state) {
      let index = 0
      if (state.activeIndex !== state.total - 1) {
        index = state.activeIndex + 1
      }
      state.activeMusic = state.musiclist[index]
      this.commit('m_player/changeActiveIndex', index)
    }
  },
  getters: {}
}
