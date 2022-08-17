import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'app_state',
    paths: ['AppBase.token'],
    // ...
  })(store)
}
