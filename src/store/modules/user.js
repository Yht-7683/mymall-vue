export default {
  namespaced: true,
  state: {
    id: 0,
    username: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.username = name
    }
  }
}
