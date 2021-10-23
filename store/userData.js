import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, userData) {
            state.user = userData
        },
        setToken(state, userToken) {
            state.token = userToken
        },
        getToken(state) {
            return state.token
        }
    }
})

export default store