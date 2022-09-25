export default {
  namespaced: true,
  state: () => ({
    loginState: 0,
    proInfo: { name: '', picImg: '' }
  }),
  mutations: {
    updateLoginState(state, loginState) {
      state.loginState = loginState
    },
    updateProInfo(state, info) {
      state.proInfo = info
    }
  },
  getters: {}
}
